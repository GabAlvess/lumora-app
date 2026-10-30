import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, relative, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' };

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname === '/' ? '/examples/design-system.html' : url.pathname);
    // Only expose the gallery and built assets, never Git metadata or dependencies.
    if (!/^\/(examples|dist)\//.test(pathname)) { response.writeHead(404).end(); return; }
    const path = resolve(root, '.' + pathname);
    if (!path.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    if (!['examples', 'dist'].includes(relative(root, path).split(sep)[0])) { response.writeHead(404).end(); return; }
    const data = await readFile(path);
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(data);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 400).end();
  }
}).listen(port, host, () => console.log(`Lumora component gallery listening on ${host}:${port}`));
