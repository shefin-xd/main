# Shefin Franklin — portfolio platform

A deliberately small, fast MERN portfolio platform with one API and host-based frontend deployments.

## Apps

| Host | Deployment | Purpose |
| --- | --- | --- |
| `www.shefin.dev` | `apps/web` | Portfolio landing page |
| `admin.shefin.dev` | `apps/web` (same build, `/admin`) | Secure editor sign-in |
| `form.shefin.dev` | `apps/web` (same build, `/f/:slug`) | Shareable custom-slug forms |
| `api.shefin.dev` | `apps/api` | Express/MongoDB API |

This keeps browser code in a single optimized deployment and avoids duplicating auth/form UI. Configure domain rewrites so `form.shefin.dev/:slug` rewrites to `/f/:slug` and `admin.shefin.dev/*` rewrites to `/admin`.

## Start locally

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
npm install
npm run dev:api # terminal 1
npm run dev:web # terminal 2
```

Open `http://localhost:5173`, `http://localhost:5173/admin`, or `http://localhost:5173/f/your-slug`.


## Project organization

- `apps/web/src/pages` contains route-level portfolio, admin, and public-form screens.
- `apps/web/src/components` contains reusable UI primitives and `services/api.js` centralizes browser API calls.
- `apps/api/src/controllers` owns request behavior; `routes` only defines endpoints.
- `apps/api/src/config`, `validators`, `middleware`, and `utils` isolate infrastructure, validation, error handling, and helpers.

## Production checklist

1. Add MongoDB Atlas URI and a 32+ byte random `JWT_SECRET` to the API project.
2. Set `CLIENT_ORIGINS` to all three production hosts. Use HTTPS-only custom domains.
3. Set `ADMIN_EMAIL` and a 12+ character `ADMIN_PASSWORD` before the first API start. The API creates (or safely promotes) that account as the initial administrator; do not expose these values in the browser.
4. Set `VITE_API_URL=https://api.shefin.dev/api` on the web project, then deploy API and web independently in Vercel.
5. In each Google Form integration, copy its `formResponse` URL and the numeric `entry.<id>` identifiers into the admin form configuration. The API forwards public submissions server-side, so visitors do not need a Google account or login.

## Security architecture

- Passwords are salted/hardened with bcrypt (12 rounds); signed JWTs expire after 7 days. A JWT secret shorter than 32 characters is rejected.
- Admin mutations require a valid bearer token with the `admin` role.
- Helmet, strict CORS allowlisting, request-size caps, request validation, and global/auth-specific rate limits are applied before routes.
- Form fields are allowlisted by the saved schema. Responses are relayed to Google without persisting sensitive submission contents in MongoDB.

> For production, use a managed Redis-backed rate limiter for globally consistent serverless throttling, rotate JWT secrets periodically, and add a transactional email provider for account verification/reset flows.
