import jwt from 'jsonwebtoken';
import { env, requireJwtSecret } from '../config/env.js';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'Authentication required.' });
  try { requireJwtSecret(); req.user = jwt.verify(token, env.jwtSecret); return next(); }
  catch (error) { return res.status(error.statusCode || 401).json({ message: error.statusCode ? error.message : 'Session expired. Please sign in again.' }); }
}
export function adminOnly(req, res, next) { return req.user?.role === 'admin' ? next() : res.status(403).json({ message: 'Admin access required.' }); }
