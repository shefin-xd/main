import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'Authentication required.' });
  try { req.user = jwt.verify(token, env.jwtSecret); return next(); }
  catch { return res.status(401).json({ message: 'Session expired. Please sign in again.' }); }
}
export function adminOnly(req, res, next) { return req.user?.role === 'admin' ? next() : res.status(403).json({ message: 'Admin access required.' }); }
