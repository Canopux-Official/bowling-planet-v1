import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import slugify from 'slugify';


export interface IMedia {
  type: 'image' | 'video';
  url: string;
  publicId?: string;
}

export interface IFeaturePoint {
  title: string;
  description?: string;
}

export interface IBulletList {
  heading: string;
  items: string[];
}

export interface ISetupStep {
  stepNumber: number;
  title: string;
  description?: string;
  points?: string[];
  image?: IMedia;
}

export interface ITestimonial {
  clientName: string;
  designation?: string;
  companyName?: string;
  message: string;
  rating?: number;
  clientImage?: IMedia;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IProject extends Document {
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  media?: IMedia[];
  featurePoints?: IFeaturePoint[];
  bulletList?: IBulletList[];
  setupSteps?: ISetupStep[];
  testimonials?: ITestimonial[];
  isPublished: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const MediaSchema = new Schema<IMedia>(
  {
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
    publicId: { type: String }, // add this line
  },
  { _id: false }
);

const FeaturePointSchema = new Schema<IFeaturePoint>(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { _id: false }
);

const BulletListSchema = new Schema<IBulletList>(
  {
    heading: { type: String, required: true },
    items: [{ type: String, required: true }],
  },
  { _id: false }
);

const SetupStepSchema = new Schema<ISetupStep>(
  {
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    points: [{ type: String }],
    image: MediaSchema,
  },
  { _id: false }
);

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    designation: { type: String },
    companyName: { type: String },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    clientImage: MediaSchema,
  },
  { timestamps: true, _id: true } 
);


const ProjectSchema = new Schema<IProject>(
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
    description: { type: String },
    tags: {
      type: [String],
      default: [],
      set: (tags: string[]) => tags.map((t) => t.trim().toLowerCase()),
    },
    media: [MediaSchema],
    featurePoints: [FeaturePointSchema],
    bulletList: [BulletListSchema],
    setupSteps: [SetupStepSchema],
    testimonials: [TestimonialSchema],
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


ProjectSchema.pre('save', async function () {
  const doc = this as IProject;

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

  const ProjectModel = doc.constructor as Model<IProject>;


  while (
    await ProjectModel.exists({
      slug: candidateSlug,
      _id: { $ne: doc._id },
    })
  ) {
    candidateSlug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  doc.slug = candidateSlug;
});


ProjectSchema.post('save', function (error: any, doc: IProject, next: (err?: Error) => void) {
  if (error.name === 'MongoServerError' && error.code === 11000 && error.keyPattern?.slug) {
    next(new Error('A project with this slug already exists. Please try again.'));
  } else {
    next(error);
  }
});


const Project: Model<IProject> = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
