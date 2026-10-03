# Vizag Chamber redesign

React 19, TypeScript, Tailwind CSS 4 and the supplied shadcn component structure, running with Vinext/Vite. Source content was captured from https://www.vizagchamber.com/ on 3 October 2026.

## Run locally

```powershell
npm ci
npm run dev
```

The development preview is http://127.0.0.1:5173. Build with `npm run build`. The portable Cloudflare output is `dist/server/index.js` plus `dist/client`.

For Vercel, use the native Next.js target in `vercel.json`: `npm run build:vercel` produces `.next`, and `npm run start:vercel` previews it locally. See `VERCEL.md` for deployment and membership database setup. The Cloudflare and Vercel deployments use separate storage adapters.

## Included

- Complete homepage: three original hero photos, six chamber/service links, four promotional images, 14 executive profiles and biographies, all 13 news links, all 10 publications, membership and meeting photographs, six careers providers, social links and all footer navigation.
- 38 main internal pages, plus six gallery album routes.
- Searchable main directory (261 members), Women's Wing (55), Youth Wing (92), and the source's empty Alumni Forum directory.
- Original navigation labels and dropdowns: Home, Membership, CSR, AGM Notice, Services, Events, Media and Quick Links; About Us, Contact Us and Join are also directly accessible.
- All original event listings remain accessible through the event and wing archives, with 174 local event detail pages and their source photographs. Fourteen City Network detail pages retain their original information and tables.
- Sixteen original documents are hosted under `public/documents`. Chamber navigation stays within the redesigned site; independent news, careers, social and member websites retain their external destinations.
- Both requested advertising images are shown first in the homepage highlights carousel; the other two original promotions remain on the other slide.
- Membership and other enquiries are saved to the site's D1 `enquiries` table with a pending status and a reference. There is no payment processing, automatic membership approval or email delivery. Owners can inspect saved requests through the Sites database tools.
- Scroll-reactive hero, cinematic text entrances, reveal transitions, pointer-following highlights, cursor ring, image hover transitions, manually controlled carousels, gallery lightbox and keyboard-accessible dialogs/navigation.
- Responsive layouts, reduced-motion support, skip link and labelled controls.
- Decorative lines before text have been removed throughout, as requested.

## Editing

- `app/page.tsx`: homepage hero and six service links.
- `components/home-sections.tsx`: remaining homepage sections and leadership profiles.
- `components/site-shell.tsx`: navigation/footer.
- `components/content-page.tsx`: inner pages, directories, archives and booking enquiry.
- `components/ui/chamber-motion.tsx`: motion inspired by the two supplied component prompts. No scroll trapping or unrelated stock video is used.
- `app/globals.css` and `app/experience.css`: palette, typography, animation and responsive styling.
- `data/`: source content, directory records, gallery metadata and route inventory.
- `public/assets/`: 44 original homepage/brand/background images, resized where useful. Legacy archive/member images retain their original source URLs.

## Existing-source limitations

- The original Upcoming Events endpoint returned HTTP 500. Its recreated page explains the availability issue and links to the archive/contact page.
- Five original gallery albums have no published photos; their original covers are retained. AGM 2020 contains three original photographs.
- Historical news/publication dates are retained. Some source pages contain placeholder copy and the final IPEF article has a truncated source link.
- Two original publications return HTTP 403: Member Proud Moment (October 2022) and AP Global Investor Summit 2023 (April 2023). Their covers remain, with local unavailable-document pages and a contact form.
- Seven historical events have no source description or valid gallery photographs; available listing details are preserved with a brief availability notice.
- Original hidden placeholder venue cards are excluded; the two published venues remain.

Content capture and audit notes are in the adjacent `research` directory. This redesign does not change the original website or its data.

## Membership storage and verification

The logical D1 binding is `DB`; `drizzle/0000_next_purifiers.sql` creates the submissions table. Apply it once to a local preview as described by the starter. Production migrations are applied by Sites at publication. No public endpoint lists applicant details. The POST endpoint validates inputs, bounds request size and rejects cross-origin requests. Retrying the same submission ID is idempotent.

`node scripts/verify-enquiries.mjs` checks validation, consent, same-origin enforcement, size limits, successful storage, duplicate retries, conflicting retries and the absence of a public GET endpoint against localhost only. `node scripts/verify-routes.mjs` checks every captured page and rejects links to the old Chamber website.
