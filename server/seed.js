import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config({ path: './server/.env' }); 
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    const adminUser = await User.create({
      username: 'Admin-Etern', 
      password: 'Sura@#721', 
    });

    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

importData();