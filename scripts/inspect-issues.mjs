import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./data/pages.json', 'utf8'));

console.log('--- 1. /join tabs ---');
const join = pages.find(p => p.route === '/join');
if (join) {
  console.log(join.tabs.map(t => ({ title: t.title, hasLorem: t.contentHtml.includes('Lorem') })));
  console.log('Join tabs html preview:');
  join.tabs.forEach(t => console.log(`[${t.title}]: ${t.contentHtml}`));
}

console.log('\n--- 2. /join/renewal links ---');
const renewal = pages.find(p => p.route === '/join/renewal');
if (renewal) {
  console.log('Renewal content:', renewal.contentHtml);
}

console.log('\n--- 3. /media headlines ---');
const media = pages.find(p => p.route === '/media');
if (media) {
  console.log('Media content length:', media.contentHtml.length);
  const matches = [...media.contentHtml.matchAll(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi)];
  console.log('Media links count:', matches.length);
  matches.forEach(m => console.log(m[1], '-->', m[2].replace(/<[^>]+>/g, '').trim()));
}

console.log('\n--- 6. /publications/october-2022 ---');
const oct22 = pages.find(p => p.route === '/publications/october-2022');
console.log('Oct 22:', oct22);
const allPubRoutes = pages.filter(p => p.route.includes('publication'));
console.log('All publication routes:', allPubRoutes.map(p => ({ route: p.route, status: p.status, title: p.title })));
