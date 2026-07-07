import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import slugify from 'slugify';

// ------------------------------------------------------------------
// Sub-document interfaces
// ------------------------------------------------------------------
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

export interface IUsageLocation {
  name: string;
  description?: string;
  images?: IMedia[];
}

export type ProductStatus = 'active' | 'draft' | 'archived';

// ------------------------------------------------------------------
// BaseProduct interface
// ------------------------------------------------------------------
export interface IBaseProduct extends Document {
  title: string;
  slug: string;
  description?: string;
  thumbnail: IMedia;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ------------------------------------------------------------------
// ProductItem interface
// ------------------------------------------------------------------
export interface IProductItem extends Document {
  baseProduct: Types.ObjectId;
  title: string;
  slug: string;
  description?: string;
  thumbnail: IMedia;
  gallery?: IMedia[];
  featureList?: IBulletList[];
  points?: IFeaturePoint[];
  usedIn?: IUsageLocation[];
  price?: number;
  purchaseCount: number;
  featuredOrder: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ------------------------------------------------------------------
// Sub-schemas
// ------------------------------------------------------------------
const MediaSchema = new Schema<IMedia>(
  {
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
    publicId: { type: String }, // add this line
  },
  { _id: false }
);

// Feature cards (title + description) — for detailed feature explanations
const FeaturePointSchema = new Schema<IFeaturePoint>(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { _id: false }
);

// Simple bullet list section — e.g. "Features": ["Waterproof", "5-year warranty", ...]
const BulletListSchema = new Schema<IBulletList>(
  {
    heading: { type: String, required: true },
    items: [{ type: String, required: true }],
  },
  { _id: false }
);

// Where this product has been used/deployed
const UsageLocationSchema = new Schema<IUsageLocation>(
  {
    name: { type: String, required: true },
    description: { type: String },
    images: [MediaSchema],
  },
  { _id: false }
);

// ------------------------------------------------------------------
// BaseProduct schema
// ------------------------------------------------------------------
const BaseProductSchema = new Schema<IBaseProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      unique: true, // DB-level guarantee (index)
      lowercase: true,
      trim: true,
      index: true,
    },
    description: { type: String },
    thumbnail: { type: MediaSchema, required: true },
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// ------------------------------------------------------------------
// ProductItem schema
// ------------------------------------------------------------------
const ProductItemSchema = new Schema<IProductItem>(
  {
    baseProduct: {
      type: Schema.Types.ObjectId,
      ref: 'BaseProduct',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: { type: String },
    thumbnail: { type: MediaSchema, required: true },

    gallery: [MediaSchema],              // extra images/videos for this item
    featureList: [BulletListSchema],     // e.g. { heading: "Features", items: [...] }
    points: [FeaturePointSchema],        // detailed feature cards (title + description)
    usedIn: [UsageLocationSchema],       // "used in Dubai" style entries

    price: { type: Number },             // optional, no `required`
    purchaseCount: { type: Number, default: 0, min: 0 },  // social proof / bestseller sort
    featuredOrder: { type: Number, default: 0 },          // optional manual override for display order

    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active',
    },
  },
  { timestamps: true }
);

ProductItemSchema.index({ baseProduct: 1, purchaseCount: -1 });

// ------------------------------------------------------------------
// Shared slug generation + guaranteed uniqueness
// ------------------------------------------------------------------
// Strategy:
// 1. Only auto-generate the slug when it's missing, OR when the title changed
//    and the slug was never manually customized (adjust to your needs).
// 2. Before saving, check the DB for collisions and append -1, -2, -3...
//    until we find a free slug. This protects against races better than
//    relying on the unique index alone (the index is still kept as a
//    hard safety net in case two requests slip through simultaneously).
// NOTE: Mongoose 9 removed the next() callback from regular pre/post
// middleware. Just use a plain async function — return to proceed,
// throw to abort the save with an error.
function attachSlugMiddleware<T extends Document & { title: string; slug: string }>(
  schema: Schema<T>
) {
  schema.pre('save', async function () {
    const doc = this as T;

    const shouldGenerateSlug = doc.isNew || doc.isModified('title') || !doc.slug;

    if (!shouldGenerateSlug) {
      return;
    }

    const baseSlug = slugify(doc.slug || doc.title, {
      lower: true,
      strict: true, // strips special characters
      trim: true,
    });

    let candidateSlug = baseSlug;
    let suffix = 1;

    const DocModel = doc.constructor as Model<T>;

    // Loop until we find a slug that doesn't belong to another document
    // (excluding this document itself, in case of updates)
    while (
      await DocModel.exists({
        slug: candidateSlug,
        _id: { $ne: doc._id },
      })
    ) {
      candidateSlug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    doc.slug = candidateSlug;
  });

  // ------------------------------------------------------------------
  // Handle duplicate key errors gracefully (extra safety net)
  // ------------------------------------------------------------------
  schema.post('save', function (error: any, doc: T, next: (err?: Error) => void) {
    if (error.name === 'MongoServerError' && error.code === 11000 && error.keyPattern?.slug) {
      next(new Error('A record with this slug already exists. Please try again.'));
    } else {
      next(error);
    }
  });
}

attachSlugMiddleware(BaseProductSchema);
attachSlugMiddleware(ProductItemSchema);

// If you ever do bulk inserts (insertMany) or direct updates that bypass
// .save(), the pre-save hooks above won't run. Handle those separately
// in the controller/service layer, or generate slugs there before calling
// insertMany.

// ------------------------------------------------------------------
// Model exports
// ------------------------------------------------------------------
export const BaseProduct: Model<IBaseProduct> = mongoose.model<IBaseProduct>(
  'BaseProduct',
  BaseProductSchema
);

export const ProductItem: Model<IProductItem> = mongoose.model<IProductItem>(
  'ProductItem',
  ProductItemSchema
);