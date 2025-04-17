 import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();
export const protect = async (req, res, next) => {
  let token;

  if (req.cookies.jwt && req.cookies.jwt !== 'loggedout' && req.cookies.jwt !== 'expired') {
    token = req.cookies.jwt;
  } else {
     return res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ success: false, error: 'User belonging to this token no longer exists.' });
    }

    req.user = currentUser;
    next();
  } catch (err) {
     if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, error: 'Not authorized, token invalid' });
     }
     const isProduction = process.env.NODE_ENV === 'production';
      if (err.name === 'TokenExpiredError') {
          res.cookie('jwt', 'expired', {
             expires: new Date(Date.now() + 5 * 1000),
             httpOnly: true,
             secure:isProduction,
             sameSite: isProduction ? 'nonde' :'lax',
             path: '/'
          });
         return res.status(401).json({ success: false, error: 'Not authorized, token expired' });
      }
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }
};