import mongoose, { Schema, Document, Model } from 'mongoose';
import slugify from 'slugify';

// ------------------------------------------------------------------
// Enums / constants
// ------------------------------------------------------------------
export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'] as const;
export const EXPERIENCE_LEVELS = ['Fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years'] as const;
export const WORK_MODE = ['On-site', 'Remote', 'Hybrid'] as const;
export const JOB_STATUS = ['open', 'closed', 'draft'] as const;

export type JobType = typeof JOB_TYPES[number];
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];
export type WorkMode = typeof WORK_MODE[number];
export type JobStatus = typeof JOB_STATUS[number];

// ------------------------------------------------------------------
// Main Job interface
// ------------------------------------------------------------------
export interface IJob extends Document {
  title: string;
  slug: string;
  description: string;

  location: string;
  workMode: WorkMode;
  jobType: JobType;
  experience: ExperienceLevel;

  eligibilityCriteria: string[];
  requirements: string[];
  keyResponsibilities: string[];
  skills: string[];
  tags: string[];

  department?: string;
  openings: number;
  applicationEmail: string; // shown to applicants for a manual mailto — no apply flow in the API

  applicationDeadline?: Date;
  status: JobStatus;

  createdAt: Date;
  updatedAt: Date;
}

// ------------------------------------------------------------------
// Schema
// ------------------------------------------------------------------
const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },

    location: { type: String, required: true },
    workMode: { type: String, enum: WORK_MODE, default: 'On-site' },
    jobType: { type: String, enum: JOB_TYPES, required: true },
    experience: { type: String, enum: EXPERIENCE_LEVELS, required: true },

    eligibilityCriteria: [{ type: String }],
    requirements: [{ type: String }],
    keyResponsibilities: [{ type: String }],
    skills: [{ type: String }],

    // Free-form tags for filtering/search, kept separate from `skills`.
    tags: {
      type: [String],
      default: [],
      set: (tags: string[]) => (tags || []).map((t) => t.trim().toLowerCase()).filter(Boolean),
    },

    department: { type: String },
    openings: { type: Number, default: 1 },
    // Purely informational — surfaced to the client so applicants can
    // email it directly (e.g. via a mailto: link). No apply endpoint,
    // no application storage.
    applicationEmail: { type: String, required: true },

    applicationDeadline: { type: Date },
    status: { type: String, enum: JOB_STATUS, default: 'open' },
  },
  { timestamps: true }
);

// ------------------------------------------------------------------
// Slug generation + guaranteed uniqueness
// ------------------------------------------------------------------
// Runs on pre('validate'), not pre('save'): `slug` is required, and
// Mongoose validates BEFORE 'save' middleware but AFTER 'validate'
// middleware. Generating the slug here ensures it exists before the
// required check runs. The DB unique index remains as a hard safety net.
JobSchema.pre('validate', async function () {
  const doc = this as IJob;

  if (!doc.isModified('title') && doc.slug) {
    return;
  }

  const baseSlug = slugify(doc.title, { lower: true, strict: true, trim: true });
  let candidateSlug = baseSlug;
  let suffix = 1;

  const JobModel = doc.constructor as Model<IJob>;
  while (
    await JobModel.exists({
      slug: candidateSlug,
      _id: { $ne: doc._id },
    })
  ) {
    candidateSlug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  doc.slug = candidateSlug;
});

// Extra safety net for the rare race where two requests both pass the
// pre-validate check before either has saved.
JobSchema.post('save', function (error: any, doc: IJob, next: (err?: Error) => void) {
  if (error?.name === 'MongoServerError' && error.code === 11000 && error.keyPattern?.slug) {
    next(new Error('A job with this slug already exists. Please try again.'));
  } else {
    next(error);
  }
});

const Job: Model<IJob> = mongoose.model<IJob>('Job', JobSchema);

export default Job;