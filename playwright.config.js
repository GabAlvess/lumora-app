import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

const executablePath = process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:4174',
    viewport: { width: 1440, height: 1000 },
    launchOptions: { executablePath },
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'node scripts/serve.mjs',
    url: 'http://127.0.0.1:4174',
    env: { HOST: '127.0.0.1', PORT: '4174' },
    reuseExistingServer: !process.env.CI
  }
});
