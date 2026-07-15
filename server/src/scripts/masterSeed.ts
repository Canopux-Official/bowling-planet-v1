import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Import all models
import { GlobalSettings } from '../models/GlobalSettings';
import { HomePage } from '../models/HomePage';
import { FranchisePage } from '../models/FranchisePage';
import Project from '../models/project';
import { BaseProduct, ProductItem } from '../models/product';
import Job from '../models/career';
import Blog from '../models/blog';
import Lead from '../models/Lead';
import User from '../models/User';
import Otp from '../models/Otp';
import RefreshToken from '../models/RefreshToken';
import { TeamMember } from '../models/team';
import Resource from '../models/resources';
import { hashPassword } from '../utils/hashUtils';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedAll = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/bowling-planet';
    console.log(`Connecting to MongoDB: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected successfully!');

    // ==========================================
    // 0. CLEAR EXISTING DATA
    // ==========================================
    console.log('Clearing existing data...');
    await GlobalSettings.deleteMany({});
    await HomePage.deleteMany({});
    await FranchisePage.deleteMany({});
    await Project.deleteMany({});
    await BaseProduct.deleteMany({});
    await ProductItem.deleteMany({});
    await Job.deleteMany({});
    await Blog.deleteMany({});
    await Lead.deleteMany({});
    await User.deleteMany({});
    await Otp.deleteMany({});
    await RefreshToken.deleteMany({});
    await TeamMember.deleteMany({});
    await Resource.deleteMany({});

    // ==========================================
    // 1. GLOBAL SETTINGS
    // ==========================================
    console.log('Seeding Global Settings...');
    await GlobalSettings.create({
      contact: {
        email: 'pr@bowlingplanet.co.in',
        phoneDisplay: '+91 95125 45959',
        location: 'Surat, Gujarat, India',
      },
      socials: {
        whatsappNumber: '919512545959',
        links: [
          { platform: 'Facebook', url: 'https://facebook.com/bowlingplanet' },
          { platform: 'Instagram', url: 'https://instagram.com/bowlingplanet' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/bowling-planet' }
        ]
      },
      company: {
        name: 'Bowling Planet',
        tagline: 'FEC consulting, equipment distribution, and franchise development. Based in Surat, Gujarat — building entertainment destinations across India and beyond.'
      }
    });

    // ==========================================
    // 2. HOME PAGE
    // ==========================================
    console.log('Seeding Home Page...');
    await HomePage.create({
      hero: {
        rotatingActivities: [
          'Bowling Lanes', 'VR Gaming', 'Mini Golf', 'Trampoline Parks',
          'Go-Kart Tracks', 'Cricket Simulators', 'Soft Play Areas',
          'Redemption Games', 'Laser Tag'
        ]
      },
      stats: {
        yearsOfExperience: '15+',
        productsAndEquip: '500+',
        projectsDelivered: '200+',
        citiesServed: '10+'
      },
      trustedBrands: [
        'Smaaash', 'Timezone', 'Fun City', 'PVR Cinemas',
        'INOX', 'Lulu Group', 'Landmark Group', 'Appu Ghar', 'Essel World'
      ],
      featuredProjects: {
        projectIds: [] 
      },
      productInventory: {
        arcadeGamesCount: '200+ Titles',
        majorAttractionsCount: '30+ Categories',
        redemptionGamesCount: '500+ SKUs'
      }
    });

    // ==========================================
    // 3. FRANCHISE PAGE
    // ==========================================
    console.log('Seeding Franchise Page...');
    await FranchisePage.create({
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
        { q: 'Why should I choose Bowling Planet for my FEC business?', a: 'You get a strong, proven partner with Bowling Planet! We bring 17+ years of industry expertise...' },
        { q: 'What kinds of games and entertainment are offered?', a: 'Over 700+ games across diverse segments — Bowling, VR, Arcade, Redemption...' },
        { q: 'What is the minimum investment required?', a: 'Our Economy tier starts from just ₹35 Lakhs for a 1,500 sq ft neighbourhood game lounge...' },
      ]
    });

    // ==========================================
    // 4. PROJECTS
    // ==========================================
    console.log('Seeding Projects...');
    const projectsData = [
      { 
        title: 'Dubai Entertainment Center', 
        description: 'State-of-the-art bowling lane installation in the heart of Dubai.', 
        tags: ['Bowling', 'International', 'Premium'],
        featurePoints: [
          { title: 'Premium Lanes', description: '8 professional-grade Brunswick bowling lanes.' },
          { title: 'Dynamic Lighting', description: 'Interactive RGB lighting synchronized with gameplay.' }
        ],
        bulletList: [
          { heading: 'Key Achievements', items: ['Completed 2 weeks ahead of schedule', 'Achieved 40% higher ROI in first quarter'] }
        ],
        setupSteps: [
          { stepNumber: 1, title: 'Consultation', description: 'Initial blueprinting.' },
          { stepNumber: 2, title: 'Installation', description: 'Full equipment setup.' }
        ],
        testimonials: [
          { clientName: 'Ahmed Al Maktoum', companyName: 'Dubai Leisure', message: 'Exceptional quality and timely delivery.' }
        ],
        isPublished: true, 
        media: [
          { type: 'image' as const, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', publicId: 'd1' },
          { type: 'image' as const, url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', publicId: 'd2' }
        ] 
      },
      { 
        title: 'Calicut Gaming Arena', 
        description: 'Comprehensive arcade setup featuring the latest redemption games.', 
        tags: ['Arcade', 'India', 'Value'],
        isPublished: true, 
        media: [{ type: 'image' as const, url: 'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=800', publicId: 'd3' }] 
      },
      { 
        title: 'Ahmedabad Kids Kingdom', 
        description: 'Massive indoor softplay area built for family entertainment.', 
        tags: ['Softplay', 'India', 'Family'],
        isPublished: true, 
        media: [{ type: 'image' as const, url: 'https://images.unsplash.com/photo-1566442539401-44754a6db240?w=800', publicId: 'd4' }] 
      },
      { 
        title: 'New Delhi Active Zone', 
        description: 'Modern indoor softplay area built with highest safety standards.', 
        tags: ['Softplay', 'India', 'Standard'],
        isPublished: true, 
        media: [{ type: 'image' as const, url: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?w=800', publicId: 'd5' }] 
      },
      { 
        title: 'Bangalore Cyber Hub', 
        description: 'Futuristic VR and eSports arena targeting Gen Z and Millennials.', 
        tags: ['VR', 'eSports', 'Premium'],
        isPublished: true, 
        featurePoints: [
          { title: 'Omni VR Treadmills', description: '6 state-of-the-art VR treadmills for immersive gaming.' }
        ],
        media: [{ type: 'image' as const, url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800', publicId: 'd6' }] 
      },
      { 
        title: 'Goa Beachside Resort FEC', 
        description: 'Integrated family entertainment center inside a luxury beach resort.', 
        tags: ['Resort', 'Bowling', 'Arcade'],
        isPublished: true, 
        testimonials: [
          { clientName: 'Sarah Fernandes', companyName: 'Ocean View Resorts', message: 'A fantastic addition to our amenities!' }
        ],
        media: [{ type: 'image' as const, url: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=800', publicId: 'd7' }] 
      }
    ];

    const insertedProjects = [];
    for (const p of projectsData) {
      insertedProjects.push(await Project.create(p));
    }
    
    // Update HomePage featured projects
    await HomePage.findOneAndUpdate({}, {
      $set: { 'featuredProjects.projectIds': insertedProjects.map(p => p._id.toString()) }
    });
    console.log(`Created ${projectsData.length} projects.`);

    // ==========================================
    // 5. PRODUCTS & PRODUCT ITEMS
    // ==========================================
    console.log('Seeding Products...');
    
    // Create Base Products
    const baseProductsData = [
      { title: 'Arcade & Video Games', slug: 'arcade-video-games', description: 'Latest-generation skill, racing, and video arcade machines. From classic redemption to immersive 4D experiences.', thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', publicId: 'b1' }, status: 'active' as const },
      { title: 'Major Attractions', slug: 'major-attractions', description: 'Headline centrepieces — bowling lanes, VR arenas, trampoline parks, mini golf, go-kart tracks.', thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=800', publicId: 'b2' }, status: 'active' as const },
      { title: 'Redemption Games', slug: 'redemption-games', description: 'High-engagement ticket-based games with proven repeat-visit ROI.', thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=800', publicId: 'b3' }, status: 'active' as const },
      { title: 'Soft Play & Kids Area', slug: 'soft-play', description: 'Safe, durable, and colorful indoor playgrounds designed for toddlers and children.', thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1566442539401-44754a6db240?w=800', publicId: 'b4' }, status: 'active' as const },
    ];
    const insertedBaseProducts = [];
    for (const p of baseProductsData) {
      insertedBaseProducts.push(await BaseProduct.create(p));
    }
    
    // Create Product Items
    const productItemsData = [
      {
        baseProduct: insertedBaseProducts[0]._id, // Arcade
        title: 'MotoGP Racing Simulator',
        slug: 'motogp-racing-simulator',
        description: 'Authentic MotoGP motorcycle racing simulator with lean physics, wind effects, and stunning 4K graphics.',
        thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', publicId: 'p1' },
        gallery: [
          { type: 'image' as const, url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200', publicId: 'p1g1' }
        ],
        price: 450000,
        purchaseCount: 24,
        featuredOrder: 1,
        status: 'active' as const,
        featureList: [{ heading: 'Key Features', items: ['Lean Physics', 'Wind Simulation', '4K Display'] }],
        points: [{ title: 'Power Requirements', description: '220V / 10A Dedicated Circuit' }],
        usedIn: [{ name: 'Arcade Zones', description: 'Perfect for high-footfall sports arcades' }]
      },
      {
        baseProduct: insertedBaseProducts[0]._id, // Arcade
        title: 'Jurassic Park Arcade',
        slug: 'jurassic-park-arcade',
        description: 'Action-packed enclosed cabinet shooter featuring dinosaurs and surround sound.',
        thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', publicId: 'p2' },
        gallery: [],
        price: 750000,
        purchaseCount: 15,
        featuredOrder: 2,
        status: 'active' as const,
        featureList: [{ heading: 'Gameplay', items: ['Enclosed cabinet', 'Surround sound', 'Interactive seat'] }]
      },
      {
        baseProduct: insertedBaseProducts[1]._id, // Major Attractions
        title: 'Brunswick Pro Lane',
        slug: 'brunswick-pro-lane',
        description: 'Tournament grade bowling lane featuring synthetic surface, automatic scoring, and LED pinsetters.',
        thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=800', publicId: 'p3' },
        gallery: [
          { type: 'image' as const, url: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=1200', publicId: 'p3g1' }
        ],
        price: 2500000,
        purchaseCount: 12,
        status: 'active' as const
      },
      {
        baseProduct: insertedBaseProducts[1]._id, // Major Attractions
        title: 'Omni Arena VR',
        slug: 'omni-arena-vr',
        description: 'Active esports VR attraction featuring omnidirectional treadmills for full-body movement.',
        thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800', publicId: 'p4' },
        price: 3200000,
        purchaseCount: 8,
        status: 'active' as const
      },
      {
        baseProduct: insertedBaseProducts[2]._id, // Redemption
        title: 'Monster Drop',
        slug: 'monster-drop',
        description: 'High earning, fast-paced ticket redemption game. Drop the ball, win the jackpot.',
        thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=800', publicId: 'p5' },
        price: 350000,
        purchaseCount: 56,
        status: 'active' as const
      },
      {
        baseProduct: insertedBaseProducts[3]._id, // Soft Play
        title: 'Jungle Explorer Maze',
        slug: 'jungle-explorer-maze',
        description: 'Multi-level softplay structure with slides, ball pits, and obstacle courses.',
        thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1566442539401-44754a6db240?w=800', publicId: 'p6' },
        price: 1500000,
        purchaseCount: 30,
        status: 'active' as const,
        featureList: [{ heading: 'Safety', items: ['Non-toxic foam', 'Fire-retardant materials', 'Impact-absorbing floors'] }]
      },
      {
        baseProduct: insertedBaseProducts[0]._id, // Arcade
        title: 'Dance Dance Revolution A20',
        slug: 'ddr-a20',
        description: 'The definitive rhythm arcade game. Features massive song library and responsive dance pads.',
        thumbnail: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1493225457124-a1a2a5fa36c4?w=800', publicId: 'p7' },
        price: 850000,
        purchaseCount: 42,
        status: 'active' as const
      }
    ];
    for (const item of productItemsData) {
      await ProductItem.create(item);
    }
    console.log(`Created ${baseProductsData.length} base products and ${productItemsData.length} product items.`);

    // ==========================================
    // 6. JOBS (Careers)
    // ==========================================
    console.log('Seeding Jobs...');
    const jobsData = [
      {
        title: 'Senior FEC Operations Manager',
        description: 'Looking for an experienced FEC operations manager to oversee new setups across India.',
        location: 'Surat, Gujarat', workMode: 'On-site' as const, jobType: 'Full-time' as const, experience: '5+ years' as const,
        department: 'Operations', applicationEmail: 'hr@bowlingplanet.co.in', status: 'open' as const,
        openings: 2, tags: ['Management', 'Operations', 'FEC'],
        eligibilityCriteria: ['Bachelor\'s degree in Business Administration or related field.', 'Proven experience in FEC or leisure industry.'],
        requirements: ['Willingness to travel across India.', 'Strong leadership and communication skills.'],
        keyResponsibilities: ['Oversee daily operations of multiple FEC sites.', 'Ensure customer satisfaction and safety standards.', 'Manage site budgets and P&L.'],
        skills: ['Operations Management', 'Budgeting', 'Team Leadership'],
        applicationDeadline: new Date(new Date().setMonth(new Date().getMonth() + 1))
      },
      {
        title: 'Arcade Technician',
        description: 'Skilled technician needed for maintenance and troubleshooting of arcade and redemption machines.',
        location: 'Mumbai, Maharashtra', workMode: 'On-site' as const, jobType: 'Full-time' as const, experience: '1-3 years' as const,
        department: 'Technical', applicationEmail: 'hr@bowlingplanet.co.in', status: 'open' as const,
        openings: 5, tags: ['Hardware', 'Maintenance', 'Technical'],
        eligibilityCriteria: ['Diploma in Electronics or related technical field.'],
        requirements: ['Experience with arcade machine repair.'],
        keyResponsibilities: ['Perform routine maintenance on all games.', 'Troubleshoot and repair hardware faults.', 'Manage spare parts inventory.'],
        skills: ['Electronics repair', 'Troubleshooting', 'Hardware maintenance']
      }
    ];
    for (const job of jobsData) {
      await Job.create(job);
    }
    console.log(`Created ${jobsData.length} jobs.`);

    // ==========================================
    // 7. BLOGS
    // ==========================================
    console.log('Seeding Blogs...');
    const blogsData = [
      {
        title: 'The Future of FEC: Trends to Watch in 2026',
        slug: 'future-of-fec-2026',
        excerpt: 'Explore the emerging technologies and trends that are reshaping family entertainment centers.',
        content: '<p>The Family Entertainment Center (FEC) landscape is evolving rapidly. With the advent of accessible VR, AI-driven personalization, and a renewed focus on competitive socializing, operators must adapt to stay relevant.</p><h2>Virtual Reality Goes Mainstream</h2><p>VR is no longer a gimmick; it is a core attraction.</p>',
        coverImage: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop', publicId: 'dummyblog1' },
        author: 'Bowling Planet Insights',
        tags: ['Trends', 'VR', 'Business'],
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: 'Maximizing ROI on Arcade Operations',
        slug: 'maximizing-roi-arcade',
        excerpt: 'Actionable strategies for optimizing game mix, pricing, and ticket payouts.',
        content: '<p>A successful arcade is a balancing act of science and art. Operators must carefully curate their game mix to appeal to demographics ranging from toddlers to young adults.</p>',
        coverImage: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', publicId: 'dummyblog2' },
        author: 'Bowling Planet Operations',
        tags: ['Operations', 'ROI', 'Arcade'],
        isPublished: true,
        publishedAt: new Date()
      }
    ];
    for (const blog of blogsData) {
      await Blog.create(blog);
    }
    console.log(`Created ${blogsData.length} blogs.`);

    // ==========================================
    // 8. LEADS (For CRM Visualization)
    // ==========================================
    console.log('Seeding Leads...');
    const leadsData = [
      {
        name: 'Rajesh Kumar',
        phone: '+919876543210',
        email: 'rajesh.k@example.com',
        city: 'Mumbai',
        businessDetails: 'Looking to open a 3000 sqft arcade in a mall.',
        utm: { source: 'google', medium: 'cpc', campaign: 'summer_promo' },
        behavior: { 
          isReturningVisitor: true, 
          eventLog: [
            { label: 'Landing: Explore Franchise', timestamp: new Date(Date.now() - 15 * 60000).toISOString(), path: '/' },
            { label: 'Nav: Contact Us', timestamp: new Date(Date.now() - 2 * 60000).toISOString(), path: '/franchise' }
          ] 
        },
        device: { isMobile: true, os: 'Android', browser: 'Chrome' },
        location: { ip: '114.143.194.21', country: 'IN', region: 'MH', city: 'Mumbai' },
        enquiryItems: [{ id: 'omni-arena-vr', type: 'product' as const, title: 'Omni Arena VR' }],
        status: 'New' as const,
        isPartial: false,
        sessionId: 'dummy-session-1'
      },
      {
        name: 'Aisha Singh',
        phone: '+919988776655',
        email: 'aisha.singh@example.com',
        city: 'Bangalore',
        businessDetails: 'Interested in the Standard Franchise package.',
        utm: { source: 'facebook', medium: 'social' },
        behavior: { 
          isReturningVisitor: false, 
          eventLog: [
            { label: 'Nav: Products', timestamp: new Date(Date.now() - 20 * 60000).toISOString(), path: '/' },
            { label: 'Landing: WhatsApp Us', timestamp: new Date(Date.now() - 5 * 60000).toISOString(), path: '/products' }
          ] 
        },
        device: { isMobile: false, os: 'Mac OS', browser: 'Safari' },
        location: { ip: '49.207.227.132', country: 'IN', region: 'KA', city: 'Bangalore' },
        enquiryItems: [{ id: 'franchise-standard', type: 'franchise' as const, title: 'Standard Franchise Tier' }],
        status: 'Contacted' as const,
        isPartial: false,
        sessionId: 'dummy-session-2'
      },
      {
        name: 'David Chen',
        phone: '+971501234567',
        email: 'david.c@leisuredubai.com',
        city: 'Dubai',
        businessDetails: 'Needs bowling equipment for a new resort project.',
        utm: { source: 'direct', medium: 'none' },
        behavior: { 
          isReturningVisitor: true, 
          eventLog: [
            { label: 'Floating WhatsApp: Opened', timestamp: new Date(Date.now() - 40 * 60000).toISOString(), path: '/projects' },
            { label: 'Contact Page: Email Sales', timestamp: new Date(Date.now() - 10 * 60000).toISOString(), path: '/contact' }
          ] 
        },
        device: { isMobile: true, os: 'iOS', browser: 'Safari' },
        location: { ip: '94.200.221.14', country: 'AE', region: 'DU', city: 'Dubai' },
        enquiryItems: [{ id: 'brunswick-pro-lane', type: 'product' as const, title: 'Brunswick Pro Lane' }],
        status: 'Closed' as const,
        isPartial: false,
        sessionId: 'dummy-session-3'
      },
      {
        phone: '+917766554433', // Partial lead
        status: 'Abandoned' as const,
        isPartial: true,
        behavior: { 
          isReturningVisitor: false, 
          eventLog: [
            { label: 'Landing: Start Your Project', timestamp: new Date(Date.now() - 5 * 60000).toISOString(), path: '/' }
          ] 
        },
        device: { isMobile: false, os: 'Windows', browser: 'Edge' },
        location: { ip: '122.161.49.2', country: 'IN', region: 'DL', city: 'New Delhi' },
        enquiryItems: [{ id: 'monster-drop', type: 'product' as const, title: 'Monster Drop' }],
        sessionId: 'dummy-session-4'
      }
    ];
    for (const lead of leadsData) {
      await Lead.create(lead);
    }
    console.log(`Created ${leadsData.length} leads.`);

    // ==========================================
    // 9. TEAM MEMBERS
    // ==========================================
    console.log('Seeding Team Members...');
    const teamData = [
      {
        name: 'Rahul Sharma',
        designation: 'Founder & CEO',
        experience: '20+ years in FEC industry',
        image: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop', publicId: 'team1' },
        order: 1,
        status: 'active' as const
      },
      {
        name: 'Priya Patel',
        designation: 'Operations Director',
        experience: '12+ years in leisure management',
        image: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop', publicId: 'team2' },
        order: 2,
        status: 'active' as const
      },
      {
        name: 'Vikram Singh',
        designation: 'Technical Head',
        experience: '15+ years in arcade tech',
        image: { type: 'image' as const, url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop', publicId: 'team3' },
        order: 3,
        status: 'active' as const
      }
    ];
    for (const member of teamData) {
      await TeamMember.create(member);
    }
    console.log(`Created ${teamData.length} team members.`);

    // ==========================================
    // 10. RESOURCES
    // ==========================================
    console.log('Seeding Resources...');
    const resourcesData = [
      {
        title: 'Complete Guide to Starting an FEC',
        description: 'A comprehensive 50-page guide covering everything from location selection to game mix and marketing.',
        type: 'guide' as const,
        externalUrl: 'https://example.com/guide.pdf',
        category: 'Business Guides',
        tags: ['FEC', 'Startup', 'Business Plan'],
        isPublished: true
      },
      {
        title: 'Arcade Maintenance Checklist',
        description: 'Daily, weekly, and monthly checklists to keep your arcade machines running at 100% uptime.',
        type: 'pdf' as const,
        externalUrl: 'https://example.com/checklist.pdf',
        category: 'Operations',
        tags: ['Maintenance', 'Operations', 'Checklist'],
        isPublished: true
      },
      {
        title: 'ROI Calculator',
        description: 'Excel tool to estimate your returns based on footfall, pricing, and game mix.',
        type: 'tool' as const,
        externalUrl: 'https://example.com/roi-calculator.xlsx',
        category: 'Tools',
        tags: ['Finance', 'ROI', 'Calculator'],
        isPublished: true
      }
    ];
    for (const resource of resourcesData) {
      await Resource.create(resource);
    }
    console.log(`Created ${resourcesData.length} resources.`);

    // ==========================================
    // 11. SUPER ADMIN
    // ==========================================
    console.log('Seeding Super Admin...');
    const superAdminEmail = process.env.SUPERADMIN_EMAIL || 'admin@bowlingplanet.com';
    const superAdminPassword = process.env.SUPERADMIN_PASSWORD || 'Admin123!';
    const superAdminName = process.env.SUPERADMIN_NAME || 'Super Admin';

    const existingAdmin = await User.findOne({ email: superAdminEmail });
    if (!existingAdmin) {
      const passwordHash = await hashPassword(superAdminPassword);
      await User.create({
        name: superAdminName,
        email: superAdminEmail,
        passwordHash,
        role: 'SuperAdmin',
        isVerified: true,
      });
      console.log(`Created Super Admin user (${superAdminEmail}).`);
    } else {
      console.log(`Super Admin (${superAdminEmail}) already exists, skipping...`);
    }

    console.log('\n✅ Master seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during master seed:', error);
    process.exit(1);
  }
};

seedAll();
