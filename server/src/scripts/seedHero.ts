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

const seedHero = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGO_URI is missing');

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const updated = await HomePage.findOneAndUpdate(
      {},
      { 'hero.rotatingActivities': ACTIVITIES },
      { new: true, upsert: true }
    );

    console.log('Successfully seeded rotatingActivities:', updated?.hero?.rotatingActivities);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

seedHero();
