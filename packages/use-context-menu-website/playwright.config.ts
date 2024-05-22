import { PlaywrightTestConfig, devices } from "@playwright/test";
import { devices as replayDevices } from "@replayio/playwright";

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: "replay-chromium",
      use: { ...replayDevices["Replay Chromium"] },
    },
  ],
  reporter: [
    [
      "@replayio/playwright/reporter",
      {
        apiKey: process.env.REPLAY_API_KEY,
        upload: true,
      },
    ],
    ["line"],
  ],
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
