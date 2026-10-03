# Deploying to Vercel

This repository supports two build targets. The Sites preview uses Vinext/Cloudflare; Vercel uses native Next.js. They must not share build output settings.

## Website build

Import `chaitu4765/Vizagchambers`, branch `main`, with the repository root as the Root Directory. The committed `vercel.json` configures:

- Framework: Next.js
- Install command: `npm ci`
- Build command: `npm run build:vercel`
- Output directory: `.next`
- Node.js: 22.x (from `package.json`)

If the dashboard has old overrides, reset them to these values. A push to the connected production branch triggers a new deployment. The build now generates `.next/routes-manifest.json`; changing the output directory to `dist` is not a fix for a Next.js project.

For a local Vercel-equivalent check, run `npm run build:vercel`, then `npm run start:vercel`.

## Membership applications

Cloudflare D1 bindings exist only on the Sites/Cloudflare deployment. Vercel uses a separate Neon Postgres adapter. Connecting this database does not migrate existing Sites submissions.

1. In the Vercel project's Storage tab, connect a Neon database. Ensure its `DATABASE_URL` environment variable is assigned to the appropriate environments.
2. Run the schema in `db/postgres/0001_enquiries.sql` once using the database SQL editor. Alternatively, with `DATABASE_URL` set in the shell or an ignored `.env.local`, run `npm run db:migrate:vercel`.
3. Redeploy after adding environment variables.

The website can build before a database is connected. Form submissions will return a recoverable error until storage and the schema are configured; they never display a false success or fall back to temporary server files. Application records are private, and there is no public list endpoint. Retries keep the same submission ID and do not create duplicate records.

The existing Sites build continues using `npm run build` outside Vercel and the original D1 migration in `drizzle/`.
