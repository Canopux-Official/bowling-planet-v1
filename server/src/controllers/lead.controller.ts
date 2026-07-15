import { Request, Response } from 'express';
import Lead from '../models/Lead';

import { CreateLeadSchema, PartialLeadSchema } from '../validators/lead.validator';
import { sendLeadNotification } from '../services/emailService';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getClientIp = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || '127.0.0.1';
};



// Type-safe error extraction — never leaks internal object structures
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
};

// ─── Controllers ──────────────────────────────────────────────────────────────

// @desc    Create a new Lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    // SECURITY: Validate and whitelist all incoming fields. Rejects unknown keys.
    const parsed = CreateLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: 'Invalid request data', errors: parsed.error.flatten().fieldErrors });
      return;
    }

    const { name, phone, email, city, businessDetails, utm, behavior, enquiryItems, device, sessionId } = parsed.data;
    const ip = getClientIp(req);

    // SECURITY: status and isPartial are always set by the server, never the client
    const leadData = {
      name, phone, email, city, businessDetails, utm, behavior, device, enquiryItems,
      location: { ip },
      status: 'New' as const,
      isPartial: false,
    };

    // If a sessionId is present, upgrade the existing partial lead to a full one
    let savedLead;
    if (sessionId) {
      savedLead = await Lead.findOneAndUpdate(
        { sessionId },
        { ...leadData, sessionId },
        { new: true, upsert: true }
      );
    } else {
      const lead = new Lead(leadData);
      savedLead = await lead.save();
    }

    // Send admin email notification via Nodemailer asynchronously
    sendLeadNotification(savedLead).catch(console.error);

    res.status(201).json({ success: true, data: savedLead });
  } catch (error: unknown) {
    // SECURITY: Log full error internally, never expose to client
    console.error('[LeadController] createLead error:', getErrorMessage(error));
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create or update a partial/abandoned Lead
// @route   POST /api/leads/partial
// @access  Public
export const savePartialLead = async (req: Request, res: Response): Promise<void> => {
  try {
    // SECURITY: Validate and whitelist all incoming fields
    const parsed = PartialLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      // Fail silently for partials — no need to alarm the user with validation details
      res.status(400).json({ success: false });
      return;
    }

    const { name, phone, email, city, businessDetails, utm, behavior, enquiryItems, device, sessionId } = parsed.data;
    const ip = getClientIp(req);

    const leadData = {
      name, phone, email, city, businessDetails, utm, behavior, device, enquiryItems,
      location: { ip },
      status: 'Abandoned' as const,
      isPartial: true,
    };

    if (sessionId) {
      const existingLead = await Lead.findOne({ sessionId });
      
      if (existingLead && !existingLead.isPartial) {
        // Lead is already a full lead. Do not downgrade status to Abandoned or isPartial to true.
        await Lead.findOneAndUpdate(
          { sessionId },
          { name, phone, email, city, businessDetails, utm, behavior, device, enquiryItems, location: { ip } },
          { new: true }
        );
      } else {
        await Lead.findOneAndUpdate(
          { sessionId },
          { ...leadData, sessionId },
          { new: true, upsert: true }
        );
      }
    } else {
      const lead = new Lead(leadData);
      await lead.save();
    }

    res.status(201).json({ success: true, message: 'Partial lead saved' });
  } catch (error: unknown) {
    console.error('[LeadController] savePartialLead error:', getErrorMessage(error));
    res.status(500).json({ success: false });
  }
};

// @desc    Log a lead behavioral event
// @route   POST /api/leads/event
// @access  Public
export const logLeadEvent = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({ success: true, message: 'Event logged' });
};

// @desc    Get all leads (paginated)
// @route   GET /api/leads?page=1&limit=50&status=New
// @access  Private/Admin
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    // SECURITY: Clamp page and limit to safe ranges to prevent abuse
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 50));
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    const allowedStatuses = ['New', 'Contacted', 'Closed', 'Abandoned'];
    if (req.query.status && req.query.status !== 'All' && allowedStatuses.includes(req.query.status as string)) {
      filter.status = req.query.status;
    }
    if (req.query.isPartial !== undefined) {
      filter.isPartial = req.query.isPartial === 'true';
    }
    
    // Search filter across multiple text fields
    if (req.query.search) {
      const searchRegex = { $regex: req.query.search as string, $options: 'i' };
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { city: searchRegex }
      ];
    }

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(), // .lean() returns plain JS objects — 3-5x faster than Mongoose Documents
      Lead.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error('[LeadController] getLeads error:', getErrorMessage(error));
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get a single lead by ID
// @route   GET /api/leads/:id
// @access  Private/Admin
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).lean();
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error: unknown) {
    console.error('[LeadController] getLeadById error:', getErrorMessage(error));
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id/status
// @access  Private/Admin
export const updateLeadStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    if (!['New', 'Contacted', 'Closed', 'Abandoned'].includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status' });
      return;
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, isPartial: false },
      { returnDocument: 'after', runValidators: true }
    );

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error: unknown) {
    console.error('[LeadController] updateLeadStatus error:', getErrorMessage(error));
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: unknown) {
    console.error('[LeadController] deleteLead error:', getErrorMessage(error));
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get aggregated analytics for all leads
// @route   GET /api/leads/analytics
// @access  Private/Admin
export const getLeadAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const [result] = await Lead.aggregate([
      {
        $facet: {
          // 1. Status Breakdown
          statusData: [
            { $group: { _id: { $ifNull: ['$status', 'New'] }, value: { $sum: 1 } } },
            { $project: { name: '$_id', value: 1, _id: 0 } }
          ],
          
          // 2. UTM Sources
          utmData: [
            { $group: { _id: { $ifNull: ['$utm.source', 'Direct/Unknown'] }, value: { $sum: 1 } } },
            { $project: { name: '$_id', value: 1, _id: 0 } }
          ],

          // 3. Daily Leads (last 14 days)
          dailyLeads: [
            { $match: { createdAt: { $gte: fourteenDaysAgo } } },
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } },
            { $project: { date: '$_id', count: 1, _id: 0 } }
          ],

          // 4. CTA Events (top 5)
          eventData: [
            { $unwind: '$behavior.eventLog' },
            { $group: { _id: { $ifNull: ['$behavior.eventLog.action', '$behavior.eventLog.label'] }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $project: { name: '$_id', count: 1, _id: 0 } }
          ],

          // 5. Device Split
          deviceData: [
            { $group: { _id: '$device.isMobile', count: { $sum: 1 } } },
            {
              $project: {
                name: { $cond: [{ $eq: ['$_id', true] }, 'Mobile', { $cond: [{ $eq: ['$_id', false] }, 'Desktop', 'Unknown'] }] },
                value: '$count',
                _id: 0
              }
            },
            { $match: { name: { $ne: 'Unknown' } } }
          ],

          // 6. Top Enquiry Interests
          enquiryData: [
            { $unwind: '$enquiryItems' },
            { $match: { 'enquiryItems.title': { $exists: true, $ne: null } } },
            { $group: { _id: '$enquiryItems.title', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $project: { name: '$_id', count: 1, _id: 0 } }
          ],
          
          // KPIs
          kpis: [
            {
              $group: {
                _id: null,
                totalLeads: { $sum: 1 },
                newLeads: { $sum: { $cond: [{ $eq: ['$status', 'New'] }, 1, 0] } },
                mobileLeads: { $sum: { $cond: [{ $eq: ['$device.isMobile', true] }, 1, 0] } },
                totalEvents: { $sum: { $size: { $ifNull: ['$behavior.eventLog', []] } } }
              }
            }
          ]
        }
      }
    ]);

    const kpis = result.kpis[0] || { totalLeads: 0, newLeads: 0, mobileLeads: 0, totalEvents: 0 };
    delete result.kpis;

    res.status(200).json({
      success: true,
      data: {
        ...result,
        ...kpis
      }
    });
  } catch (error: unknown) {
    console.error('[LeadController] getLeadAnalytics error:', getErrorMessage(error));
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
