import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./data/pages.json', 'utf8'));
const details = JSON.parse(fs.readFileSync('./data/detail-pages.json', 'utf8'));
const media = pages.find(p => p.route === '/media');

const cards = media.contentHtml.split('<div class="source-card">').slice(1);
const items = [];

for (const card of cards) {
  const imgSrc = card.match(/<img src="([^"]+)"/)?.[1] || '';
  const title = card.match(/<h5>(?:<a[^>]*>)?([\s\S]*?)(?:<\/a>)?<\/h5>/)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
  const date = card.match(/<p>([^<]*)<\/p>/)?.[1]?.trim() || '';

  // Match detail page if exists
  const detail = details.find(d => 
    d.title.toLowerCase().includes(title.toLowerCase()) || 
    title.toLowerCase().includes(d.title.toLowerCase())
  );

  items.push({
    title,
    image: imgSrc,
    date,
    href: detail ? detail.route : undefined
  });
}

console.log('Parsed items count:', items.length);
console.log('Sample items:', JSON.stringify(items.slice(0, 8), null, 2));

// Save to data/media-items.json
fs.writeFileSync('./data/media-items.json', JSON.stringify(items, null, 2));
console.log('Saved to ./data/media-items.json');
