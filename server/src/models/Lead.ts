import mongoose, { Document, Schema } from 'mongoose';

export interface IEnquiryItem {
  id: string;
  type: 'product' | 'franchise' | 'project' | 'general' | 'roi-report';
  title: string;
  metadata?: Record<string, any>;
}

export interface ICTAEvent {
  label: string;
  timestamp: string;
  path: string;
}

export interface ILead extends Document {
  // Contact
  name: string;
  phone: string;
  email?: string;
  city?: string;
  businessDetails?: string;

  // Tracking
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  behavior: {
    isReturningVisitor: boolean;
    eventLog: ICTAEvent[];
  };

  device?: {
    isMobile?: boolean;
    os?: string;
    browser?: string;
  };

  location?: {
    ip?: string;
    country?: string;
    region?: string;
    city?: string;
  };

  // Enquiry Data
  enquiryItems: IEnquiryItem[];

  // CRM State
  status: 'New' | 'Contacted' | 'Closed' | 'Abandoned';
  isPartial: boolean; // True if it's just an abandoned/autosaved form
  sessionId?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    name: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    city: { type: String, required: false },
    businessDetails: { type: String, required: false },

    utm: {
      source: { type: String },
      medium: { type: String },
      campaign: { type: String },
    },

    behavior: {
      isReturningVisitor: { type: Boolean, default: false },
      eventLog: [
        {
          label: { type: String },
          timestamp: { type: String },
          path: { type: String },
        },
      ],
    },

    device: {
      isMobile: { type: Boolean },
      os: { type: String },
      browser: { type: String },
    },

    location: {
      ip: { type: String },
      country: { type: String },
      region: { type: String },
      city: { type: String },
    },

    enquiryItems: [
      {
        id: { type: String },
        type: { type: String, enum: ['product', 'franchise', 'project', 'general', 'roi-report'] },
        title: { type: String },
        metadata: { type: Schema.Types.Mixed },
      },
    ],

    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed', 'Abandoned'],
      default: 'New',
    },
    
    isPartial: { type: Boolean, default: false },
    // SECURITY: unique prevents race-condition duplicates; sparse allows multiple null values
    sessionId: { type: String, required: false, index: true, unique: true, sparse: true },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

export default mongoose.model<ILead>('Lead', LeadSchema);
