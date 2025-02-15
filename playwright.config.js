// @ts-check
import { defineConfig, devices } from "@playwright/test";
import process from "process";


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout: 30_000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: [["list"], ["html"], ["@currents/playwright"]],
  use: {
    trace: "on",
    screenshot: "on",
    video: "on",
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /*   {
         name: 'firefox',
         use: { ...devices['Desktop Firefox'] },
       },
   
       {
         name: 'webkit',
         use: { ...devices['Desktop Safari'] },
       },
   
       /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

