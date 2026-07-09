import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import { hashPassword } from '../utils/hashUtils';

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing in .env');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const superAdminEmail = process.env.SUPERADMIN_EMAIL;
    const superAdminPassword = process.env.SUPERADMIN_PASSWORD;
    const superAdminName = process.env.SUPERADMIN_NAME || 'Super Admin';

    if (!superAdminEmail || !superAdminPassword) {
      throw new Error('SUPERADMIN_EMAIL or SUPERADMIN_PASSWORD is missing in .env');
    }

    const existingSuperAdmin = await User.findOne({ role: 'SuperAdmin' });

    if (existingSuperAdmin) {
      console.log('SuperAdmin already exists in the database. Seed aborted.');
      process.exit(0);
    }

    const passwordHash = await hashPassword(superAdminPassword);

    const superAdmin = new User({
      name: superAdminName,
      email: superAdminEmail,
      passwordHash,
      role: 'SuperAdmin',
      isVerified: true, // SuperAdmin is always verified automatically
    });

    await superAdmin.save();
    console.log('Successfully seeded SuperAdmin!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding SuperAdmin:', error);
    process.exit(1);
  }
};

seedSuperAdmin();
