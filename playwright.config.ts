import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "http://127.0.0.1:8102",
    trace: "on-first-retry",
  },
  timeout: 3000,

  projects: [
    {
      name: "chromium",
    },
  ],

  webServer: {
    command: "pnpm dev -p 8102",
    url: "http://127.0.0.1:8102",
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});
