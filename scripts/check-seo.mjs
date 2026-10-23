/** Run against a built server: npm run check:seo -- http://127.0.0.1:3102 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const origin = process.argv[2] ?? 'http://127.0.0.1:3102';
async function get(path) {
  return fetch(new URL(path, origin), { redirect: 'manual' });
}
async function html(path) {
  const response = await get(path);
  assert.equal(response.status, 200, path);
  return response.text();
}
function schemas(page) {
  return [...page.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .map((match) => JSON.parse(match[1]));
}
function meta(page, name) {
  const tag = [...page.matchAll(/<meta\s[^>]*>/g)]
    .map(([tag]) => tag).find((tag) => tag.includes(`="${name}"`));
  return tag?.match(/content="([^"]*)"/)?.[1];
}

const hub = await html('/guides');
const list = schemas(hub).find((data) => data['@type'] === 'ItemList');
assert.ok(list?.numberOfItems > 0, 'hub ItemList');
assert.equal(list.numberOfItems, list.itemListElement.length);
const visibleOrder = [...hub.matchAll(/<a[^>]*href="(\/guides\/[^"?#]+)"/g)].map((m) => m[1]);
assert.deepEqual(list.itemListElement.map((item) => new URL(item.url).pathname), visibleOrder);
assert.match(hub, /type="application\/rss\+xml"/);
assert.equal(meta(hub, 'twitter:title'), 'Guides | TimeSince');

const imageHashes = new Set();
const articles = [];
async function checkImage(path) {
  const response = await get(path);
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get('content-type'), /^image\/png/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(bytes.readUInt32BE(16), 1200);
  assert.equal(bytes.readUInt32BE(20), 630);
  imageHashes.add(createHash('sha256').update(bytes).digest('hex'));
}
await checkImage('/opengraph-image');
await checkImage('/guides/opengraph-image');
for (const item of list.itemListElement) {
  const path = new URL(item.url).pathname;
  const page = await html(path);
  const data = schemas(page);
  const article = data.find((s) => s['@type'] === 'Article');
  assert.equal(article?.headline, item.name);
  articles.push({ url: item.url, date: article.datePublished });
  assert.equal(article.author['@type'], 'Person');
  assert.ok(article.dateModified >= article.datePublished);
  assert.equal(article.mainEntityOfPage['@id'], item.url);
  assert.equal(article.image, `${item.url}/opengraph-image`);
  assert.ok(data.some((s) => s['@type'] === 'BreadcrumbList'));
  assert.equal(meta(page, 'twitter:title'), meta(page, 'og:title'));
  assert.ok(meta(page, 'og:image').includes(`${path}/opengraph-image`));
  assert.ok(meta(page, 'twitter:image').includes(`${path}/opengraph-image`));
  assert.match(page, /type="application\/rss\+xml"/);
  await checkImage(`${path}/opengraph-image`);
}
assert.equal(imageHashes.size, list.numberOfItems + 2, 'each share card has distinct content');

const feedResponse = await get('/feed.xml');
assert.equal(feedResponse.status, 200);
assert.match(feedResponse.headers.get('content-type'), /application\/rss\+xml/);
const feed = await feedResponse.text();
const expectedFeed = articles.sort((a, b) => b.date.localeCompare(a.date) || a.url.localeCompare(b.url)).slice(0, 50);
assert.equal([...feed.matchAll(/<item>/g)].length, expectedFeed.length);
for (const item of expectedFeed) assert.ok(feed.includes(`<link>${item.url}</link>`));

for (const path of ['/does-not-exist', '/guides/does-not-exist']) {
  const response = await get(path);
  assert.equal(response.status, 404, path);
  const page = await response.text();
  assert.match(page, /This page does not exist/);
  assert.match(page, /content="[^"]*noindex/);
}
assert.equal((await get('/guides/does-not-exist/opengraph-image')).status, 404);
for (const [query, campaign] of [
  ['', 'offsite_shortlink'], ['?ct=qr', 'offsite_qr'], ['?ct=discord', 'offsite_discord'],
  ['?ct=directory', 'offsite_directory'], ['?ct=https%3A%2F%2Fexample.org', 'offsite_shortlink'],
]) {
  const response = await get(`/go/app-store${query}`);
  assert.equal(response.status, 307);
  const target = new URL(response.headers.get('location'));
  assert.equal(target.hostname, 'apps.apple.com');
  assert.equal(target.searchParams.get('ct'), campaign);
  assert.equal(target.searchParams.get('mt'), '8');
  assert.equal(response.headers.get('cache-control'), 'no-store');
}
const robots = await html('/robots.txt');
for (const agent of ['*', 'Googlebot', 'Applebot', 'GPTBot', 'ClaudeBot', 'PerplexityBot']) {
  assert.ok(robots.includes(`User-Agent: ${agent}\n`));
}
for (const block of robots.split('\n\n').filter((b) => b.startsWith('User-Agent:'))) {
  assert.ok(block.includes('Disallow: /go/'));
}
const home = await html('/');
for (const campaign of ['web_home_hero', 'web_home_footer', 'web_header']) {
  assert.ok(home.includes(`ct=${campaign}`));
}
console.log(`SEO checks passed: ${list.numberOfItems} guides, ${imageHashes.size} PNGs, schemas, RSS, 404s, campaign redirects and robots.`);
