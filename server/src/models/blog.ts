import mongoose, { Schema, Document, Model } from 'mongoose';
import slugify from 'slugify';


export interface IMedia {
  type: 'image' | 'video' | 'file';
  url: string;
  publicId: string;
}

export const MediaSchema = new Schema<IMedia>(
  {
    type: { type: String, enum: ['image', 'video', 'file'], required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);


export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: IMedia;
  author: string;
  tags: string[];
  isPublished: boolean;
  isDeleted: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: { type: String, maxlength: 300 },
    content: { type: String, required: true },
    coverImage: MediaSchema,
    author: { type: String, default: 'Bowling Planet Team' },
    tags: {
      type: [String],
      default: [],
      set: (tags: string[]) => tags.map((t) => t.trim().toLowerCase()),
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);


BlogSchema.pre('save', async function () {
  const doc = this as IBlog;

  const shouldGenerateSlug = doc.isNew || doc.isModified('title') || !doc.slug;

  if (!shouldGenerateSlug) {
    // Still handle first-time publish stamping even if slug isn't touched
    if (doc.isModified('isPublished') && doc.isPublished && !doc.publishedAt) {
      doc.publishedAt = new Date();
    }
    return;
  }

  const baseSlug = slugify(doc.slug || doc.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let candidateSlug = baseSlug;
  let suffix = 1;

  const BlogModel = doc.constructor as Model<IBlog>;

  while (
    await BlogModel.exists({
      slug: candidateSlug,
      _id: { $ne: doc._id },
    })
  ) {
    candidateSlug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  doc.slug = candidateSlug;

  if (doc.isModified('isPublished') && doc.isPublished && !doc.publishedAt) {
    doc.publishedAt = new Date();
  }
});

BlogSchema.post('save', function (error: any, doc: IBlog, next: (err?: Error) => void) {
  if (error.name === 'MongoServerError' && error.code === 11000 && error.keyPattern?.slug) {
    next(new Error('A blog with this slug already exists. Please try again.'));
  } else {
    next(error);
  }
});


const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;