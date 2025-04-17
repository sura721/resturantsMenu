 import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

 router.use(protect);

router.route('/')
    .get(getSettings)
    .put(updateSettings); 

export default router;