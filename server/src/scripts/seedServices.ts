import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { ServicesPage } from '../models/ServicesPage';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const DB_URI = process.env.MONGO_URI;

if (!DB_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

const seedData = {
  services: [
    {
      tag: 'Operations',
      title: 'Execute & Lead Business Operations',
      subtitle: 'End-to-end ops management that drives revenue, efficiency, and guest delight.',
      image: { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop', public_id: '' },
      accentColor: '#5FC1D1',
      stats: [
        { label: 'Revenue uplift', value: '32%' },
        { label: 'Efficiency gain', value: '55%' },
        { label: 'Guest satisfaction', value: '4.8★' },
      ],
      features: [
        'SOP & Financial Modelling',
        'HR & PMS Development',
        'ROI-Centric Analytics',
        'Industry Audits & Compliance',
        'Gold Standard Hospitality',
        'Real-Time P&L Reviews'
      ],
    },
    {
      tag: 'Pre-Opening',
      title: 'Pre-Opening Set-Up & Consultation',
      subtitle: 'From site selection to launch day — we set you up for a triumphant debut.',
      image: { url: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1600&auto=format&fit=crop', public_id: '' },
      accentColor: '#A78BFA',
      stats: [
        { label: 'Avg. launch time', value: '90 days' },
        { label: 'ROI projected', value: '3-5×' },
        { label: 'Cities served', value: '40+' },
      ],
      features: [
        'Location & Demographic Analysis',
        'Manpower Hiring & Planning',
        'ROI-Driven Game Selection',
        'Installation & Supervision',
        'Pricing & Promotions Design',
        'Arcade Layout & Center Design'
      ],
    },
  ],
  processSteps: [
    {
      num: '01',
      title: 'Discovery',
      desc: 'Market research, site analysis, and feasibility study.',
      image: { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', public_id: '' },
    },
    {
      num: '02',
      title: 'Strategy',
      desc: 'ROI modelling, layout design, and game selection blueprint.',
      image: { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', public_id: '' },
    },
    {
      num: '03',
      title: 'Execution',
      desc: 'Setup, staff training, vendor coordination, and soft launch.',
      image: { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', public_id: '' },
    },
    {
      num: '04',
      title: 'Growth',
      desc: 'Ongoing ops management, analytics, and performance tuning.',
      image: { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', public_id: '' },
    },
  ],
  galleryImages: [
    { image: { url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop', public_id: '' }, label: 'Arcade Zone' },
    { image: { url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=800&auto=format&fit=crop', public_id: '' }, label: 'Hospitality' },
    { image: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', public_id: '' }, label: 'Center Design' },
    { image: { url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop', public_id: '' }, label: 'Operations Hub' },
    { image: { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop', public_id: '' }, label: 'Marketing' },
    { image: { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop', public_id: '' }, label: 'Team Synergy' },
  ],
};

const runSeed = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB...");

    // Clear existing
    await ServicesPage.deleteMany({});
    console.log("Cleared existing ServicesPage data...");

    await ServicesPage.create(seedData);
    console.log("Successfully seeded ServicesPage data!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
};

runSeed();
