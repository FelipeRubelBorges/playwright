// @ts-check
import { defineConfig, devices } from "@playwright/test";
import process from "process";
import dotenv from "dotenv";

dotenv.config();


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //timeout: 30_000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 3,
  reporter: [["list"], ["html"]],
  use: {
  //  trace: "on",
    screenshot: "only-on-failure",
  //  video: "on",
  baseURL: "http://localhost:3000"
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

