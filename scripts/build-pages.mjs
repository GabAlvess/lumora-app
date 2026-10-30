import { writeFile, copyFile, mkdir } from 'node:fs/promises';
import { renderAuthPage } from '../src/auth/layout.mjs';
import { loginPage } from '../src/auth/pages/login.mjs';
import { registerPage } from '../src/auth/pages/registro.mjs';

const dist = new URL('../dist/', import.meta.url);
await mkdir(dist, { recursive: true });
for (const page of [loginPage, registerPage]) {
  await writeFile(new URL(`${page.slug}.html`, dist), renderAuthPage(page));
}
await copyFile(new URL('../src/auth/auth.js', import.meta.url), new URL('auth.js', dist));
console.log('Built /login and /registro.');
