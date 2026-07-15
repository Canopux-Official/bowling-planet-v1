import { z } from 'zod';

// --- Shared Sub-schemas -------------------------------------------------------

const UtmSchema = z.object({
  source:   z.string().max(100).optional(),
  medium:   z.string().max(100).optional(),
  campaign: z.string().max(100).optional(),
}).optional();

const DeviceSchema = z.object({
  isMobile: z.boolean().optional(),
  os:       z.string().max(50).optional(),
  browser:  z.string().max(50).optional(),
}).optional();

const CtaEventSchema = z.object({
  label:     z.string().max(200),
  timestamp: z.string().max(50),
  path:      z.string().max(500),
});

const BehaviorSchema = z.object({
  isReturningVisitor: z.boolean().optional(),
  eventLog:           z.array(CtaEventSchema).max(50).optional(),
}).optional();

const EnquiryItemSchema = z.object({
  id:    z.string().max(100),
  type:  z.enum(['product', 'franchise', 'project', 'general']),
  title: z.string().max(200),
});

// --- Full Lead Schema (POST /leads) ------------------------------------------
export const CreateLeadSchema = z.object({
  name:            z.string().min(1).max(200).optional(),
  phone:           z.string().max(25).optional(),
  email:           z.string().email().max(255).optional(),
  city:            z.string().max(100).optional(),
  businessDetails: z.string().max(2000).optional(),
  sessionId:       z.string().uuid('Invalid sessionId format').optional(),
  utm:             UtmSchema,
  device:          DeviceSchema,
  behavior:        BehaviorSchema,
  enquiryItems:    z.array(EnquiryItemSchema).max(20).optional(),
});

// --- Partial Lead Schema (POST /leads/partial) -------------------------------
export const PartialLeadSchema = CreateLeadSchema;

export type CreateLeadInput  = z.infer<typeof CreateLeadSchema>;
export type PartialLeadInput = z.infer<typeof PartialLeadSchema>;
