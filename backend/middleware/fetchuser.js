import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library'
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const fetchuser = async (req, res, next) => {
  // CASE 1: Passport.js (Google Auth) — req.user already exists
  if (req.user) {
    console.log("Using passport session, req.user:", req.user);
    return next();
  }

  const token = req.header('auth-token');
  console.log("Received Token:", token);

  console.log("Received Token:", token);
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return res.status(401).json({ error: 'Access denied. Invalid or missing token.' });
  }

  try {
    if (token.startsWith('google_')) {
      // Handle Google token
      const googleToken = token.replace('google_', '');
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
       console.log("Google payload:", payload);

      req.user = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
      };
    } else {
      // Handle manual JWT
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("Decoded manual JWT:", decoded);
      req.user = decoded.user || decoded;
    }

    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token. Please log in again.' });
  }
};

export default fetchuser;
