import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { icons } from './icons.mjs';
import { siGoogle, siDiscord, siApple } from 'simple-icons';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
await mkdir(new URL('fonts/', dist), { recursive: true });
await mkdir(new URL('licenses/', dist), { recursive: true });
await mkdir(new URL('images/', dist), { recursive: true });
await copyFile(new URL('scripts/player-phone.mjs', root), new URL('player-phone.mjs', dist));

const symbols = [];
for (const name of icons) {
  const svg = await readFile(new URL(`node_modules/lucide-static/icons/${name}.svg`, root), 'utf8');
  const body = svg.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/)?.[1];
  if (!body || /<script\b|\bon\w+=/i.test(body)) throw new Error(`Invalid icon: ${name}`);
  symbols.push(`<symbol id="lm-icon-${name}" viewBox="0 0 24 24">${body.trim()}</symbol>`);
}
await writeFile(new URL('lumora-icons.svg', dist), `<!-- Lucide icons, ISC license; see licenses/lucide.txt -->\n<svg xmlns="http://www.w3.org/2000/svg">\n${symbols.join('\n')}\n</svg>\n`);
await writeFile(new URL('icons.json', dist), JSON.stringify(icons, null, 2) + '\n');
await copyFile(new URL('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', root), new URL('fonts/manrope-latin-wght-normal.woff2', dist));
await copyFile(new URL('node_modules/@fontsource-variable/manrope/LICENSE', root), new URL('licenses/manrope.txt', dist));
await copyFile(new URL('node_modules/lucide-static/LICENSE', root), new URL('licenses/lucide.txt', dist));
const brands = [siGoogle, siDiscord, siApple].map(icon => `<symbol id="lm-brand-${icon.slug}" viewBox="0 0 24 24"><path d="${icon.path}"/></symbol>`);
await writeFile(new URL('brand-icons.svg', dist), `<svg xmlns="http://www.w3.org/2000/svg">${brands.join('')}</svg>\n`);
await copyFile(new URL('node_modules/simple-icons/LICENSE.md', root), new URL('licenses/simple-icons.txt', dist));
await copyFile(new URL('src/assets/lumora-plaza.png', root), new URL('images/lumora-plaza.png', dist));
const favicon = await readFile(new URL('node_modules/lucide-static/icons/leaf.svg', root), 'utf8');
await writeFile(new URL('favicon.svg', dist), favicon.replace('stroke="currentColor"', 'stroke="#244c3b"'));
console.log(`Built ${icons.length} icons and local Manrope font in ${fileURLToPath(dist)}`);
