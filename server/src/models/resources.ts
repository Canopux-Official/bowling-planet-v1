
import mongoose, { Schema, Document, Model } from 'mongoose';
import slugify from 'slugify';


export interface IResource extends Document {
  title: string;
  slug: string;
  description: string;
  type: 'pdf' | 'video' | 'tool' | 'link' | 'guide';
  externalUrl: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}



const ResourceSchema = new Schema<IResource>(
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
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['pdf', 'video', 'tool', 'link', 'guide'],
      required: true,
    },
    externalUrl: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
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
  },
  { timestamps: true }
);

ResourceSchema.pre('save', async function () {
  const doc = this as IResource;

  const shouldGenerateSlug = doc.isNew || doc.isModified('title') || !doc.slug;

  if (!shouldGenerateSlug) {
    return;
  }

  const baseSlug = slugify(doc.slug || doc.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let candidateSlug = baseSlug;
  let suffix = 1;

  const ResourceModel = doc.constructor as Model<IResource>;

  while (
    await ResourceModel.exists({
      slug: candidateSlug,
      _id: { $ne: doc._id },
    })
  ) {
    candidateSlug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  doc.slug = candidateSlug;
});

ResourceSchema.post('save', function (error: any, doc: IResource, next: (err?: Error) => void) {
  if (error.name === 'MongoServerError' && error.code === 11000 && error.keyPattern?.slug) {
    next(new Error('A resource with this slug already exists. Please try again.'));
  } else {
    next(error);
  }
});

const Resource: Model<IResource> = mongoose.model<IResource>('Resource', ResourceSchema);

export default Resource;
