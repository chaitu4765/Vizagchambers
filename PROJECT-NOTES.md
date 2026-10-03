# Vizag Chamber redesign

React 19, TypeScript, Tailwind CSS 4 and the supplied shadcn component structure, running with Vinext/Vite. Source content was captured from https://www.vizagchamber.com/ on 3 October 2026.

## Run locally

```powershell
npm ci
npm run dev
```

The development preview is http://127.0.0.1:5173. Build with `npm run build`. The portable Cloudflare output is `dist/server/index.js` plus `dist/client`.

## Included

- Complete homepage: three original hero photos, six chamber/service links, four promotional images, 14 executive profiles and biographies, all 13 news links, all 10 publications, membership and meeting photographs, six careers providers, social links and all footer navigation.
- 38 main internal pages, plus six gallery album routes.
- Searchable main directory (261 members), Women's Wing (55), Youth Wing (92), and the source's empty Alumni Forum directory.
- All original event listings remain accessible through the event and wing archives. Event detail links and PDFs open the original site.
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
- Membership, renewal and other submissions continue through official forms. The local conference enquiry prepares an email draft only; it explicitly states that nothing has been sent. No payment or backend submission is simulated.
- Original hidden placeholder venue cards are excluded; the two published venues remain.

Content capture and audit notes are in the adjacent `research` directory. This redesign does not change the original website or its data.
