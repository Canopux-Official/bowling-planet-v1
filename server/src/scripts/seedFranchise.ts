import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { FranchisePage } from '../models/FranchisePage';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedFranchise = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/bowling-planet';
    console.log(`Connecting to MongoDB: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected successfully!');

    console.log('Seeding Franchise Page with original fallback content...');
    
    // Check if one exists
    const existing = await FranchisePage.findOne();
    
    const franchiseData = {
      valueProps: [
        { icon: '📈', label: 'Attractive ROI', sub: '32% avg. annual return' },
        { icon: '🚀', label: 'Fastest Growing Industry', sub: 'FEC market expanding rapidly' },
        { icon: '🎯', label: 'Flexible Business Model', sub: 'Economy to Deluxe tiers' },
        { icon: '🎮', label: '700+ Games', sub: 'Curated entertainment tech' },
        { icon: '💸', label: 'Zero Franchise Fees', sub: 'No entry barrier' },
        { icon: '🏆', label: '17+ Years Experience', sub: 'Proven partner since day one' },
        { icon: '👨‍👩‍👧‍👦', label: 'Youth & Family Appeal', sub: 'Universal audience, loyal repeat visits' },
        { icon: '🌐', label: 'Long-Term Business Model', sub: 'Built for scale & sustainability' },
      ],
      whyUs: [
        { title: 'Zero Franchise Fees.', subtitle: 'Keep your equity. We earn through results, not entry barriers.', image: {url: '/heroes/projects-hero-wireframe.png', public_id: ''} },
        { title: '32% Avg. Annual ROI.', subtitle: 'Proven, data-driven financial performance across 21+ premium projects.', image: {url: '/about/about_hero_fec.png', public_id: ''} },
        { title: '700+ Global Attractions.', subtitle: 'The largest, most diverse entertainment catalogue available in India.', image: {url: '/about/gallery_arcade.png', public_id: ''} },
        { title: '100% Turnkey Execution.', subtitle: 'From an empty site to your grand opening. We build it, you own it.', image: {url: '/heroes/blogs-hero-planning-studio.png', public_id: ''} }
      ],
      offerings: [
        { label: 'Bowling Infrastructure', desc: 'Professional lanes, string pinsetters, and premium ball returns. The ultimate anchor attraction.', image: {url: '/franchise/f_bowling.png', public_id: ''} },
        { label: 'Arcade & Simulators', desc: 'Next-gen video cabinets and multiplayer racing simulators.', image: {url: '/franchise/f_arcade.png', public_id: ''} },
        { label: 'Virtual Reality', desc: 'Immersive free-roam arenas and interactive VR pods.', image: {url: '/franchise/f_vr.png', public_id: ''} },
        { label: 'Redemption', desc: 'Ticket-based skill games driving high replay value.', image: {url: '/franchise/f_redemption.png', public_id: ''} },
        { label: 'Prize Vending', desc: 'High-ROI automated merchandisers.', image: {url: '/franchise/f_vending.png', public_id: ''} },
        { label: 'Toddler Zones', desc: 'Safe, engaging soft play and interactive kiddie rides.', image: {url: '/about/gallery_trampoline.png', public_id: ''} },
        { label: 'Carnival Attractions', desc: 'Classic midway games reimagined for modern FECs.', image: {url: '/about/gallery_lasertag.png', public_id: ''} },
        { label: 'Cashless Systems', desc: 'End-to-end facility management and debit card readers.', image: {url: '/about/gallery_arcade.png', public_id: ''} },
        { label: 'Pre-Owned Hardware', desc: 'Fully refurbished, certified premium machines.', image: {url: '/about/gallery_gokart.png', public_id: ''} },
        { label: 'Spares & Support', desc: 'Lifetime operational backing and technical parts.', image: {url: '/about/about_hero_fec.png', public_id: ''} }
      ],
      process: [
        { title: 'Inquiry & Intro', desc: 'Reach out to us. We\'ll schedule a detailed discovery call to understand your vision, location, and investment appetite.', image: {url: '/heroes/careers-hero-studio.png', public_id: ''} },
        { title: 'Registrations', desc: 'We guide you through company registrations, trade licenses, and all government approvals — hassle-free.', image: {url: '/about/founder_silhouette.png', public_id: ''} },
        { title: 'Sign LOI', desc: 'Sign the Letter of Intent to formalise the partnership and kickstart our full consulting engagement.', image: {url: '/heroes/projects-hero-wireframe.png', public_id: ''} },
        { title: 'Location & ROI', desc: 'Our experts analyse your site for foot traffic and deliver a detailed financial projection.', image: {url: '/heroes/blogs-hero-planning-studio.png', public_id: ''} },
        { title: 'Franchise Agreement', desc: 'Finalise the agreement and make the last fee installment. Your business is officially launched.', image: {url: '/heroes/careers-hero-studio.png', public_id: ''} },
        { title: 'Pre-Opening Prep', desc: 'Full onboarding: game operations, staff training, marketing setup, and a punch-list for a flawless launch.', image: {url: '/franchise/f_arcade.png', public_id: ''} },
        { title: 'Grand Opening', desc: 'Your entertainment destination opens its doors. We remain by your side for ongoing operations and growth.', image: {url: '/about/about_hero_fec.png', public_id: ''} }
      ],
      qualifications: [
        { title: 'Financial Readiness', desc: 'Demonstrated capacity to cover initial investment, ops expenses, and fees. You don\'t need to be a millionaire — just have a solid plan.' },
        { title: 'Brand Commitment', desc: 'Willingness to uphold our brand identity, customer service standards, and operational excellence. Your reputation becomes ours.' },
        { title: 'Location Access', desc: 'Ability to secure a high-traffic, accessible site. We analyse and evaluate — you finalise the deal.' },
        { title: 'Long-Term Vision', desc: 'Dedication to building a lasting, profitable entertainment destination. We\'re in this for years, not months.' },
        { title: 'Training Participation', desc: 'Our hands-on program covers game ops, customer service, and business management. No prior FEC experience needed.' },
        { title: 'Legal Compliance', desc: 'Adherence to local and national FEC regulations. We guide you through every license, NOC, and approval needed.' },
        { title: 'Local Marketing Drive', desc: 'Commitment to running local marketing initiatives. We provide proven playbooks, campaigns, and creative assets.' }
      ],
      investmentTiers: [
        {
          name: 'Economy', color: '#86868B', size: '1,500 sq ft',
          totalInvestment: '₹35 Lakhs', majorAttractions: 0, arcadeGames: 8,
          otherHorizons: '—', gamesCost: '₹28 Lakhs', interiorCost: '₹5 Lakhs',
          franchiseFee: '₹0', consultingFee: '₹2 Lakhs', ideal: 'Small town / kiosk format',
        },
        {
          name: 'Value', color: '#5FC1D1', size: '3,000 sq ft',
          totalInvestment: '₹65 Lakhs', majorAttractions: 1, arcadeGames: 10,
          otherHorizons: '—', gamesCost: '₹53.5 Lakhs', interiorCost: '₹9 Lakhs',
          franchiseFee: '₹0', consultingFee: '₹2.5 Lakhs', ideal: 'Tier-2 city neighbourhood',
        },
        {
          name: 'Basic', color: '#6DBD4E', size: '6,000 sq ft',
          totalInvestment: '₹2.5 Crore', majorAttractions: 2, arcadeGames: 14,
          otherHorizons: '—', gamesCost: '₹2 Crore', interiorCost: '₹45 Lakhs',
          franchiseFee: '₹0', consultingFee: '₹4 Lakhs', ideal: 'Standalone FEC, mid-city',
        },
        {
          name: 'Standard', color: '#FFAA33', size: '12,000 sq ft',
          totalInvestment: '₹7 Crore', majorAttractions: 5, arcadeGames: 32,
          otherHorizons: '1', gamesCost: '₹5.5 Crore', interiorCost: '₹1.4 Crore',
          franchiseFee: '₹0', consultingFee: '₹8 Lakhs', ideal: 'Mall or high-footfall location', popular: true,
        },
        {
          name: 'Premium', color: '#C084FC', size: '20,000 sq ft',
          totalInvestment: '₹12 Crore', majorAttractions: 8, arcadeGames: 45,
          otherHorizons: '3', gamesCost: '₹9.5 Crore', interiorCost: '₹2.4 Crore',
          franchiseFee: '₹0', consultingFee: '₹10.5 Lakhs', ideal: 'Metro city landmark destination',
        },
        {
          name: 'Deluxe', color: '#F5C542', size: '35,000 sq ft',
          totalInvestment: '₹20 Crore', majorAttractions: 12, arcadeGames: 55,
          otherHorizons: '5', gamesCost: '₹15.8 Crore', interiorCost: '₹4 Crore',
          franchiseFee: '₹0', consultingFee: '₹15 Lakhs', ideal: 'Mega-resort entertainment complex',
        },
      ],
      faqs: [
        { q: 'Why should I choose Bowling Planet for my FEC business?', a: 'You get a strong, proven partner with Bowling Planet. We bring 17+ years of industry expertise, turnkey delivery, and ₹0 franchise fees — so you keep more equity while we help you open and operate.' },
        { q: 'What kinds of games and entertainment are offered?', a: 'Over 700+ games across bowling, VR, arcade, redemption, toddler zones, and more — sourced, installed, and supported end to end.' },
        { q: 'What is the minimum investment required?', a: 'Our Economy tier starts from about ₹35 Lakhs for a neighbourhood game lounge. Higher tiers scale up to mega-complex programmes based on size and attractions.' },
        { q: 'Do I need prior FEC experience?', a: 'No. We guide registrations, site evaluation, training, and pre-opening prep so first-time operators can launch with confidence.' },
        { q: 'Is there a franchise fee?', a: 'No. Franchise fee is ₹0. Our model is built around consulting and delivery value, not entry barriers.' },
      ]
    };

    if (existing) {
      await FranchisePage.updateOne({}, { $set: franchiseData });
    } else {
      await FranchisePage.create(franchiseData);
    }
    
    console.log('✅ Franchise page seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during franchise page seed:', error);
    process.exit(1);
  }
};

seedFranchise();
