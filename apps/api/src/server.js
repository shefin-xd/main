import app from './app.js'; import { connectDatabase } from './config/database.js'; import { env } from './config/env.js';
connectDatabase().catch((error) => { console.error('Database connection failed', error); process.exit(1); });
if (!process.env.VERCEL) app.listen(env.port, () => console.info(`API listening on ${env.port}`));
export default app;
