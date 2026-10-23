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

/**
 * Reads a hub's ItemList and checks it against the order the cards are
 * actually rendered in — a list that disagrees with the page is worse than no
 * list at all.
 *
 * `allowEmpty` is for a section whose content has not landed yet: an empty
 * ItemList is honest, a missing one is a bug.
 */
async function checkHub(basePath, twitterTitle, { allowEmpty = false } = {}) {
  const page = await html(basePath);
  const list = schemas(page).find((data) => data['@type'] === 'ItemList');
  assert.ok(list, `${basePath} ItemList`);
  assert.equal(list.numberOfItems, list.itemListElement.length, `${basePath} count`);
  if (!allowEmpty) assert.ok(list.numberOfItems > 0, `${basePath} ItemList is empty`);

  const escaped = basePath.replace(/\//g, '\\/');
  const linkPattern = new RegExp(`<a[^>]*href="(${escaped}\\/[^"?#]+)"`, 'g');
  const visibleOrder = [...new Set([...page.matchAll(linkPattern)].map((m) => m[1]))];
  assert.deepEqual(
    list.itemListElement.map((item) => new URL(item.url).pathname),
    visibleOrder,
    `${basePath} ItemList order matches the rendered cards`,
  );
  assert.equal(meta(page, 'twitter:title'), twitterTitle, `${basePath} twitter:title`);
  return list;
}

const hub = await html('/guides');
const list = await checkHub('/guides', 'Guides | TimeSince');
assert.match(hub, /type="application\/rss\+xml"/);

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
let expectedImages = list.numberOfItems + 2; // guides + their hub + home

// ── Features: product pages, so BreadcrumbList but deliberately no Article ──
const featureList = await checkHub('/features', 'Features | TimeSince');
await checkImage('/features/opengraph-image');
expectedImages += 1;
for (const item of featureList.itemListElement) {
  const path = new URL(item.url).pathname;
  const page = await html(path);
  const data = schemas(page);
  assert.ok(data.some((s) => s['@type'] === 'BreadcrumbList'), `${path} breadcrumbs`);
  assert.ok(
    !data.some((s) => s['@type'] === 'Article'),
    `${path} is a product page, not an Article`,
  );
  assert.ok(meta(page, 'og:image').includes(`${path}/opengraph-image`), `${path} og:image`);
  await checkImage(`${path}/opengraph-image`);
  expectedImages += 1;
}

// ── Scenarios: same contract as guides. Empty until content lands. ─────────
const scenarioList = await checkHub('/scenarios', 'Scenarios | TimeSince', { allowEmpty: true });
await checkImage('/scenarios/opengraph-image');
expectedImages += 1;
for (const item of scenarioList.itemListElement) {
  const path = new URL(item.url).pathname;
  const page = await html(path);
  const data = schemas(page);
  const scenarioArticle = data.find((s) => s['@type'] === 'Article');
  assert.equal(scenarioArticle?.headline, item.name, `${path} Article headline`);
  assert.equal(scenarioArticle.author['@type'], 'Person', `${path} author`);
  assert.equal(scenarioArticle.image, `${item.url}/opengraph-image`, `${path} Article image`);
  articles.push({ url: item.url, date: scenarioArticle.datePublished });
  assert.ok(data.some((s) => s['@type'] === 'BreadcrumbList'), `${path} breadcrumbs`);
  await checkImage(`${path}/opengraph-image`);
  expectedImages += 1;
}

assert.equal(imageHashes.size, expectedImages, 'each share card has distinct content');

const feedResponse = await get('/feed.xml');
assert.equal(feedResponse.status, 200);
assert.match(feedResponse.headers.get('content-type'), /application\/rss\+xml/);
const feed = await feedResponse.text();
const expectedFeed = articles.sort((a, b) => b.date.localeCompare(a.date) || a.url.localeCompare(b.url)).slice(0, 50);
assert.equal([...feed.matchAll(/<item>/g)].length, expectedFeed.length);
for (const item of expectedFeed) assert.ok(feed.includes(`<link>${item.url}</link>`));

for (const path of [
  '/does-not-exist',
  '/guides/does-not-exist',
  '/features/does-not-exist',
  '/scenarios/does-not-exist',
]) {
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
console.log(
  `SEO checks passed: ${list.numberOfItems} guides, ${featureList.numberOfItems} features, ` +
    `${scenarioList.numberOfItems} scenarios, ${imageHashes.size} PNGs, schemas, RSS, 404s, ` +
    'campaign redirects and robots.',
);
