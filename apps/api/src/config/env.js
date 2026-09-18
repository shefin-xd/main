import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  adminEmail: process.env.ADMIN_EMAIL?.trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD,
  clientOrigins: (process.env.CLIENT_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim()),
};

export function requireJwtSecret() {
  if (!env.jwtSecret || env.jwtSecret.length < 32) {
    const error = new Error('JWT_SECRET must be configured with at least 32 characters.');
    error.statusCode = 503;
    throw error;
  }
}
