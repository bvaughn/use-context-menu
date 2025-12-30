import { expect, test, type Page } from "@playwright/test";

async function openPage(page: Page) {
  await page.goto("http://localhost:3012/right-click-menu");
}

async function showContextMenu(page: Page) {
  const target = page.getByText("Click target");
  await target.click({ button: "right" });

  const contextMenu = page.getByText("Context Menu");
  await expect(contextMenu).toBeVisible();

  return contextMenu;
}

test("right-click should display a context menu", async ({ page }) => {
  await openPage(page);

  const contextMenu = page.getByText("Context Menu");
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
    "Item one"
  );
  await expect(contextMenuItems.allTextContents()).resolves.toContain(
    "Item two"
  );
  await expect(contextMenuItems.allTextContents()).resolves.toContain(
    "Item three"
  );

  const contextMenuCategories = page.locator("[data-context-menu-category]");
  await expect(contextMenuCategories.count()).resolves.toBe(2);
  await expect(contextMenuCategories.allTextContents()).resolves.toContain(
    "Category one"
  );
  await expect(contextMenuCategories.allTextContents()).resolves.toContain(
    "Category two"
  );
});

test("clicking a context menu item should dismiss the context menu", async ({
  page
}) => {
  await openPage(page);
  await showContextMenu(page);

  const contextMenuItems = page.locator("[data-context-menu-item]");
  await contextMenuItems.first().click();

  await expect(page.getByText("Context Menu")).not.toBeVisible();
});

test("clicking outside of the context menu should dismiss it", async ({
  page
}) => {
  await openPage(page);
  const contextMenu = await showContextMenu(page);

  await page.mouse.click(10, 10);

  await expect(contextMenu).not.toBeVisible();
});

test("typing Escape should dismiss the context menu", async ({ page }) => {
  await openPage(page);
  const contextMenu = await showContextMenu(page);

  await contextMenu.press("Escape");

  await expect(contextMenu).not.toBeVisible();
});
