// lib/auth.js
import jwt from 'jsonwebtoken';
import { connectDB } from './db';
import User from '../app/models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Create a JWT
export function signToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
}

// Get logged-in user (for API routes or getServerSideProps)
export async function getMe(req) {
  // Handle client-side calls without request object
  if (!req) {
    // If running on client side, try to get token from document.cookie
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});
      
      const token = cookies.token;
      if (!token) return null;
      
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // For client-side, we'll need to make an API call to get the user
        return fetch('/api/me').then(res => res.json()).catch(() => null);
      } catch {
        return null;
      }
    }
    return null;
  }

  const token = req.cookies?.token; // Read from request cookies

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    await connectDB();
    const user = await User.findById(decoded.id).select('-password');
    return user || null;
  } catch {
    return null;
  }
}

// Set JWT token in cookies
export function setToken(res, token) {
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`);
}

// Clear JWT token
export function logout() {
  // If on client side, we can clear the cookie directly
  if (typeof window !== 'undefined') {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return Promise.resolve();
  }
  return Promise.resolve();
}
export function logoutUser(res) {
  res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0`);
}
