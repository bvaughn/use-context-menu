import { expect, test } from "@playwright/test";

test("left-click should display a menu", async ({ page }) => {
  await page.goto("http://localhost:1234/examples/left-click-menu");

  const contextMenu = page.locator('[data-test-name="ContextMenu"]');
  await expect(contextMenu).not.toBeVisible();

  const target = page.locator('[data-test-name="click-target"]');
  await target.click();

  await expect(contextMenu).toBeVisible();
});
