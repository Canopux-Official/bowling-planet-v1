import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const clearDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing in .env');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Add a double-check confirmation warning
    console.warn('⚠️ WARNING: This will delete ALL data in the database.');
    
    // Check if the db exists before trying to drop collections
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }

    // Drop the entire database
    await mongoose.connection.db.dropDatabase();
    console.log('✅ Successfully cleared the entire database!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();
