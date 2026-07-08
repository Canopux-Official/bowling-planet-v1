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

export interface IUsageLocation {
  name: string;
  description?: string;
  images?: IMedia[];
}

export type ProductStatus = 'active' | 'draft' | 'archived';


export interface IBaseProduct extends Document {
  title: string;
  slug: string;
  description?: string;
  thumbnail: IMedia;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}


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


const UsageLocationSchema = new Schema<IUsageLocation>(
  {
    name: { type: String, required: true },
    description: { type: String },
    images: [MediaSchema],
  },
  { _id: false }
);



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

    gallery: [MediaSchema],              
    featureList: [BulletListSchema],     
    points: [FeaturePointSchema],        
    usedIn: [UsageLocationSchema],       

    price: { type: Number },             
    purchaseCount: { type: Number, default: 0, min: 0 },  
    featuredOrder: { type: Number, default: 0 },          

    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active',
    },
  },
  { timestamps: true }
);

ProductItemSchema.index({ baseProduct: 1, purchaseCount: -1 });


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
      strict: true, 
      trim: true,
    });

    let candidateSlug = baseSlug;
    let suffix = 1;

    const DocModel = doc.constructor as Model<T>;

    
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


export const BaseProduct: Model<IBaseProduct> = mongoose.model<IBaseProduct>(
  'BaseProduct',
  BaseProductSchema
);

export const ProductItem: Model<IProductItem> = mongoose.model<IProductItem>(
  'ProductItem',
  ProductItemSchema
);