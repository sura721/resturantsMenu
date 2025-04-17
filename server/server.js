
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import menuItemPublicRoutes from './routes/menuItemPublic.routes.js';
import menuItemAdminRoutes from './routes/menuItemAdmin.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminSettingsRoutes from './routes/adminSettings.routes.js';

import './scheduler.js';

dotenv.config();
connectDB().then(() => {
    const app = express();

    app.use(cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());

    app.get('/', (req, res) => {
      res.send('Digital Menu API Running...');
    });
    app.get('/api/health', (req, res) => {
      res.status(200).json({ status: 'OK', uptime: process.uptime() });
     
    });
    app.use('/api/menu', menuItemPublicRoutes);
    app.use('/api/admin/menu', menuItemAdminRoutes);
    app.use('/api/admin/settings', adminSettingsRoutes);
    app.use('/api/auth', authRoutes);

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT);

    process.on('unhandledRejection', (err, promise) => {
      server.close(() => process.exit(1));
    });

}).catch(err => {
    process.exit(1);
});