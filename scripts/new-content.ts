/**
 * Scaffolds a content file from content/_templates/.
 *
 *   npm run content:new -- guide "How to track an irregular chore on iPhone"
 *
 * A new page should be one new file plus prose. If anything else needs editing
 * to publish, that is a bug in the pipeline, not a step in the workflow.
 */
import fs from 'node:fs';
import path from 'node:path';

const [kind, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(' ').trim();

const COLLECTIONS: Record<string, string> = { guide: 'guides' };

if (!kind || !title) {
  console.error('usage: npm run content:new -- <guide> "<Title>"');
  process.exit(1);
}
const collection = COLLECTIONS[kind];
if (!collection) {
  console.error(`unknown type "${kind}" — expected one of: ${Object.keys(COLLECTIONS).join(', ')}`);
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/['’]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const dest = path.join(process.cwd(), 'content', 'en', collection, `${slug}.mdx`);
if (fs.existsSync(dest)) {
  console.error(`refusing to overwrite ${path.relative(process.cwd(), dest)}`);
  process.exit(1);
}

const template = fs.readFileSync(
  path.join(process.cwd(), 'content/_templates', `${kind}.mdx`),
  'utf8',
);

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(
  dest,
  template
    .replaceAll('{{TITLE}}', title.replace(/"/g, '\\"'))
    .replaceAll('{{DATE}}', new Date().toISOString().slice(0, 10)),
);

console.log(`created  ${path.relative(process.cwd(), dest)}`);
console.log(`preview  http://localhost:3000/${collection}/${slug}`);
console.log(`\nIt is marked draft: true — flip that when it is ready to publish.`);
