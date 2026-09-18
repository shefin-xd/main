/**
 * Vercel catch-all serverless function.
 *
 * Vercel maps /api/* directly to this function and preserves the requested
 * path, allowing Express to receive /api/auth/login rather than /index.js.
 */
import app from '../src/app.js';
import { connectDatabase } from '../src/config/database.js';

await connectDatabase();
export default app;
