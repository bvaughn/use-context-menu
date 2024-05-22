import { Page, expect, test } from "@playwright/test";

async function openPage(page: Page) {
  await page.goto("http://localhost:1234/examples/right-click-menu");
}

async function showContextMenu(page: Page) {
  const target = page.locator('[data-test-name="click-target"]');
  await target.click({ button: "right" });
}

test("right-click should display a context menu", async ({ page }) => {
  await openPage(page);

  const contextMenu = page.locator('[data-test-name="ContextMenu"]');
  await expect(contextMenu).not.toBeVisible();

  await showContextMenu(page);

  await expect(contextMenu).toBeVisible();
});

test("context should contain the correct options", async ({ page }) => {
  await openPage(page);
  await showContextMenu(page);

  const contextMenuItems = page.locator("[data-context-menu-item]");
  await expect(contextMenuItems.count()).resolves.toBe(3);
  await expect(contextMenuItems.allTextContents()).resolves.toContain(
    "Select all"
  );
  await expect(contextMenuItems.allTextContents()).resolves.toContain(
    "Copy text"
  );
  await expect(contextMenuItems.allTextContents()).resolves.toContain(
    "View source"
  );

  const contextMenuCategories = page.locator("[data-context-menu-category]");
  await expect(contextMenuCategories.count()).resolves.toBe(2);
  await expect(contextMenuCategories.allTextContents()).resolves.toContain(
    "Inline options"
  );
  await expect(contextMenuCategories.allTextContents()).resolves.toContain(
    "External options"
  );
});

test("clicking a context menu item should dismiss the context menu", async ({
  page,
}) => {
  await openPage(page);
  await showContextMenu(page);

  const contextMenuItems = page.locator("[data-context-menu-item]");
  await contextMenuItems.first().click();

  const contextMenu = page.locator('[data-test-name="ContextMenu"]');
  await expect(contextMenu).not.toBeVisible();
});

test("clicking outside of the context menu should dismiss it", async ({
  page,
}) => {
  await openPage(page);
  await showContextMenu(page);

  const target = page.locator('[data-test-name="click-target"]');
  await target.click();

  const contextMenu = page.locator('[data-test-name="ContextMenu"]');
  await expect(contextMenu).not.toBeVisible();
});

test("typing Escape should dismiss the context menu", async ({ page }) => {
  await openPage(page);
  await showContextMenu(page);

  await page.keyboard.press("Escape");

  const contextMenu = page.locator('[data-test-name="ContextMenu"]');
  await expect(contextMenu).not.toBeVisible();
});
