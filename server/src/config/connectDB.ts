import mongoose from 'mongoose';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var __mongoose_cache: MongooseCache | undefined;
}

// ------------------------------------------------------------------
// Initialise once per process
// ------------------------------------------------------------------
if (!global.__mongoose_cache) {
  global.__mongoose_cache = { conn: null, promise: null };
}

const cache = global.__mongoose_cache;

// ------------------------------------------------------------------
// Connection options tuned for serverless
// ------------------------------------------------------------------
const MONGO_OPTS = {
  bufferCommands: true,
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 60_000,
  serverSelectionTimeoutMS: 8_000,
  socketTimeoutMS: 45_000,
  heartbeatFrequencyMS: 10_000,
  connectTimeoutMS: 10_000,
  retryWrites: true,
  retryReads: true,
  family: 4,
} satisfies mongoose.ConnectOptions;

// ------------------------------------------------------------------
// connectDB — idempotent, cached, safe for concurrent lambda calls
// ------------------------------------------------------------------
const connectDB = async (): Promise<typeof mongoose> => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error('[DB] MONGO_URI environment variable is not defined.');
  }

  if (cache.conn && mongoose.connection.readyState === 1) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGO_URI, MONGO_OPTS)
      .then((mg) => {
        console.log('[DB] ✅ MongoDB connected');
        return mg;
      })
      .catch((err) => {
        cache.promise = null;
        cache.conn = null;
        console.error('[DB] ❌ MongoDB connection error:', err.message);
        throw err;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
};

// ------------------------------------------------------------------
// Attach lifecycle events once
// ------------------------------------------------------------------
mongoose.connection.on('disconnected', () => {
  console.warn('[DB] ⚠️  MongoDB disconnected — resetting cache');
  cache.conn = null;
  cache.promise = null;
});

mongoose.connection.on('error', (err) => {
  console.error('[DB] ❌ MongoDB error:', err.message);
  cache.conn = null;
  cache.promise = null;
});

mongoose.connection.on('reconnected', () => {
  console.log('[DB] ✅ MongoDB reconnected');
  cache.conn = mongoose;
});

export default connectDB;