import mongoose from 'mongoose';
import { HomePage } from '../models/HomePage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ACTIVITIES = [
  'Bowling Lanes',
  'VR Gaming',
  'Mini Golf',
  'Trampoline Parks',
  'Go-Kart Tracks',
  'Cricket Simulators',
  'Ziplines',
  'Rope Courses',
  'Soft Play Areas',
  'Laser Tag',
  'Bumper Cars',
  'Rock Climbing',
];

const DEFAULT_STATS = {
  yearsOfExperience: '17+',
  productsAndEquip: '700+',
  projectsDelivered: '50+',
  citiesServed: '10+',
};

const DEFAULT_CATEGORIES = [
  {
    title: 'Arcade & Video',
    desc: 'Latest-generation skill, racing, and video arcade machines. From classic redemption to immersive 4D experiences.',
    icon: '🕹',
    count: '200+ Titles',
    color: '#5FC1D1',
    image: { url: '/products/Arcade_Games_Calicut.avif', public_id: 'local' },
  },
  {
    title: 'Major Attractions',
    desc: 'Headline centrepieces — bowling lanes, VR arenas, trampoline parks, mini golf, go-kart tracks, cricket simulators, and rope courses.',
    icon: '🎳',
    count: '30+ Categories',
    color: '#6DBD4E',
    image: { url: '/products/Bowling_Lane_Dubai.avif', public_id: 'local' },
  },
  {
    title: 'Redemption Games',
    desc: 'High-engagement ticket-based games with proven repeat-visit ROI. Data-backed selection to maximise in-venue spend.',
    icon: '🎫',
    count: '500+ SKUs',
    color: '#FFAA33',
    image: { url: '/products/Softplay_Ahemdabad.avif', public_id: 'local' },
  },
  {
    title: 'Outdoor & Adventure',
    desc: 'Large scale outdoor equipment, ziplines, and adventure park structural builds designed for high-throughput and safety.',
    icon: '🧗',
    count: '15+ Types',
    color: '#C084FC',
    image: { url: '/products/Softplay_New_Delhi.avif', public_id: 'local' },
  },
];

const DEFAULT_SERVICES = [
  {
    title: 'Consulting & Design',
    subtitle: 'Feasibility studies, master planning, and immersive FEC interior designs.',
  },
  {
    title: 'Equipment Supply',
    subtitle: 'Sourcing premium bowling lanes, VR setups, and arcade machines globally.',
  },
  {
    title: 'Turnkey Execution',
    subtitle: 'End-to-end installation, testing, and operational handover.',
  },
  {
    title: 'After-Sales Support',
    subtitle: '24/7 technical maintenance, spare parts, and staff training.',
  },
];

const DEFAULT_CASE_STUDIES = [
  {
    client: 'Woop! Entertainment',
    challenge: 'Optimizing floor layout for maximum throughput during peak weekend hours without compromising the premium guest experience.',
    solution: 'Redesigned the zone flow to separate high-energy arcade traffic from the premium bowling lanes, and introduced a centralized F&B hub.',
    result: 'Increased peak-hour capacity by 22% and boosted F&B attach rate.',
    metric: '+22% Capacity',
    image: { url: '/products/Bowling_Lane_Dubai.avif', public_id: 'local' },
  },
  {
    client: 'Shott India',
    challenge: 'Selecting a game mix that appealed to both corporate event crowds and weekend family demographics to maximize ROI.',
    solution: 'Data-driven curation of 80+ arcade titles, balancing high-turnover redemption games with immersive VR anchor attractions.',
    result: 'Achieved projected 18-month ROI target in just 14 months.',
    metric: '14mo ROI',
    image: { url: '/products/Arcade_Games_Calicut.avif', public_id: 'local' },
  },
  {
    client: 'Idea Crate',
    challenge: 'Setting up SOPs and training a green team for a massive 40,000 sq ft multi-attraction venue.',
    solution: 'Deployed our proprietary 4-week pre-opening training module, complete with shadow shifts and stress-test soft openings.',
    result: 'Zero operational downtime in the critical first 90 days of launch.',
    metric: 'Zero Downtime',
    image: { url: '/products/Softplay_Ahemdabad.avif', public_id: 'local' },
  },
];

const DEFAULT_BRANDS = [
  { name: 'Roongta Group' },
  { name: 'Woop' },
  { name: 'Shott' },
  { name: 'Idea Crate' },
  { name: 'Playaza' },
  { name: 'KidZania' },
  { name: 'Cinemax' },
  { name: 'Inox' },
  { name: 'Essel World' }
];

const seedHome = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGO_URI is missing');

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const updateData = {
      'hero.rotatingActivities': ACTIVITIES,
      stats: DEFAULT_STATS,
      productCategories: DEFAULT_CATEGORIES,
      services: DEFAULT_SERVICES,
      caseStudies: DEFAULT_CASE_STUDIES,
      trustedBrands: DEFAULT_BRANDS,
    };

    const updated = await HomePage.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true }
    );

    console.log('Successfully seeded HomePage default data!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

seedHome();
