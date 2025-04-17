import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    expires: new Date(Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRES_IN_DAYS || '30', 10) * 24 * 60 * 60 * 1000)),
    httpOnly: true,
    secure: isProduction, 
    sameSite: isProduction ? 'none' : 'lax', 
    path: '/',
  };

  user.password = undefined;
  res.status(statusCode).cookie('jwt', token, cookieOptions).json({ success: true, data: { user } });
};

export const register = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, error: 'Please provide username and password' });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Username already exists' });
        }
        const newUser = await User.create({ username, password });
        newUser.password = undefined;
        res.status(201).json({
            success: true,
            message: `Admin user '${newUser.username}' created successfully.`
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages.join(', ') });
        }
        res.status(500).json({ success: false, error: 'User registration failed' });
    }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Please provide username and password' });
  }
  try {
    const user = await User.findOne({ username }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Incorrect username or password' });
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};

export const logout = (req, res, next) => {
   const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
    secure: isProduction, // Set Secure flag based on production environment
    sameSite: isProduction ? 'none' : 'lax', // Use None in prod, Lax in dev
    path: '/',
  });
  res.status(200).json({ success: true, data: {} });
};

export const getMe = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, error: 'Not authorized' });
    }
    res.status(200).json({ success: true, data: req.user });
};