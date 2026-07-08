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
  _id: string;
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