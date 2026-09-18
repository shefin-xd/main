import express from 'express'; import helmet from 'helmet'; import cors from 'cors'; import rateLimit from 'express-rate-limit'; import morgan from 'morgan';
import { env } from './config/env.js'; import authRouter from './routes/auth.js'; import contentRouter from './routes/content.js'; import formsRouter from './routes/forms.js'; import { errorHandler, notFound } from './middleware/errorHandler.js';
const app = express();
app.set('trust proxy', 1); app.use(helmet()); app.use(cors({ origin: (origin, callback) => callback(null, !origin || env.clientOrigins.includes(origin)), methods: ['GET', 'POST', 'PUT'], allowedHeaders: ['Content-Type', 'Authorization'] })); app.use(express.json({ limit: '32kb' })); app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
const apiLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }); const authLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'shefin-api' })); app.use('/api', apiLimit); app.use('/api/auth', authLimit, authRouter); app.use('/api/content', contentRouter); app.use('/api/forms', formsRouter); app.use(notFound); app.use(errorHandler);
export default app;
