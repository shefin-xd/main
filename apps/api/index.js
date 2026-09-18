// Local/server entrypoint. Vercel uses api/[...path].js so /api routes retain their path.
import app from './src/app.js';
import { connectDatabase } from './src/config/database.js';

await connectDatabase();
export default app;
