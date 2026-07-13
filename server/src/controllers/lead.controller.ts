import { Request, Response } from 'express';
import Lead from '../models/Lead';

// @desc    Create a new Lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, email, city, businessDetails, utm, behavior, enquiryItems } = req.body;

    const lead = new Lead({
      name,
      phone,
      email,
      city,
      businessDetails,
      utm,
      behavior,
      enquiryItems,
      status: 'New',
      isPartial: false,
    });

    const savedLead = await lead.save();

    // TODO: Send email notification to Admin via Nodemailer here

    res.status(201).json({ success: true, data: savedLead });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create or update a partial/abandoned Lead
// @route   POST /api/leads/partial
// @access  Public
export const savePartialLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, email, city, businessDetails, utm, behavior, enquiryItems } = req.body;

    // We can try to find an existing partial lead by phone or email if they exist
    // But for a simple implementation, we'll just create a new partial lead.
    // If they submit the real form later, we don't strictly need to delete this, as the CRM will show it as abandoned.
    // A better way is to pass a session/temporary ID from frontend, but creating a new one is fine for now.

    const lead = new Lead({
      name,
      phone,
      email,
      city,
      businessDetails,
      utm,
      behavior,
      enquiryItems,
      status: 'Abandoned',
      isPartial: true,
    });

    await lead.save();

    res.status(201).json({ success: true, message: 'Partial lead saved' });
  } catch (error: any) {
    // Fail silently for partials so we don't spam the client console
    res.status(500).json({ success: false });
  }
};

// @desc    Log a lead behavioral event
// @route   POST /api/leads/event
// @access  Public
export const logLeadEvent = async (req: Request, res: Response): Promise<void> => {
  // In a full implementation with sessions, this would push an event to the active session.
  // Currently, the frontend aggregates events in LeadTrackerContext and sends them on submission.
  res.status(200).json({ success: true, message: 'Event logged' });
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private/Admin
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get a single lead by ID
// @route   GET /api/leads/:id
// @access  Private/Admin
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error: any) {
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
      { status, isPartial: false }, // If admin interacts, it's no longer just partial
      { returnDocument: 'after', runValidators: true }
    );

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error: any) {
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
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
