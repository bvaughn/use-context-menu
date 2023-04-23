import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    viewport: { height: 300, width: 400 },
  },
  webServer: {
    command: "npm run watch",
    reuseExistingServer: true,
    url: "http://localhost:1234",
  },
};

if (process.env.DEBUG) {
  config.use = {
    ...config.use,
    browserName: "chromium",
    headless: false,

    // Uncomment to slow down interactions if needed for visual debugging.
    // launchOptions: {
    //   slowMo: 100,
    // },
  };
}

export default config;
