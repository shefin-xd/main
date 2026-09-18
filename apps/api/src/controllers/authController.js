import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env, requireJwtSecret } from '../config/env.js';
import { loginSchema, signupSchema } from '../validators/authValidator.js';

function sessionFor(user) {
  requireJwtSecret();
  return {
    token: jwt.sign({ id: user._id, role: user.role, name: user.name }, env.jwtSecret, { expiresIn: '7d' }),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
}

export async function signup(req, res) {
  const data = signupSchema.parse(req.body);
  const email = data.email.toLowerCase();
  if (await User.exists({ email })) return res.status(409).json({ message: 'An account already exists with this email.' });
  const user = await User.create({ ...data, email, password: await bcrypt.hash(data.password, 12) });
  return res.status(201).json(sessionFor(user));
}

export async function login(req, res) {
  const data = loginSchema.parse(req.body);
  const user = await User.findOne({ email: data.email.toLowerCase() }).select('+password');
  if (!user || !await bcrypt.compare(data.password, user.password)) return res.status(401).json({ message: 'Incorrect email or password.' });
  return res.json(sessionFor(user));
}

export function me(req, res) { return res.json({ user: req.user }); }
