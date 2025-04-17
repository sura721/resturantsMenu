 import express from 'express';
import { login, logout, getMe, register } from '../controllers/auth.controller.js'; 
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);

 
router.post('/register', protect, register);

export default router;