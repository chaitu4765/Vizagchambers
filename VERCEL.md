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

## Membership enquiries

No database or database environment variables are required. Forms validate details in the browser and prepare an email draft addressed to vizagchamber@gmail.com. Visitors must review and send it in their email app; a copyable draft is also provided. Nothing is saved or sent automatically.

## Long archive URLs

On Vercel, URL segments longer than 200 bytes are rendered on demand instead of being prerendered. This preserves the original event URLs while avoiding Linux's filename limit when Vercel adds its prerender metadata suffixes.
