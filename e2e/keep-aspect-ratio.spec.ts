import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Keep Aspect Ratio", () => {
  test("should update the other size field correspondingly when width is changed and 'keep aspect ratio' is checked", async ({
    page,
  }) => {
    const width = page.getByLabel("Width:m");
    const height = page.getByLabel("Height:m");

    await width.click();
    await width.fill("2");
    await page.getByText("Width:mHeight:m").click();
    await expect(height).toHaveValue("2");
  });

  test("should not update the other size field when 'keep aspect ratio' is unchecked", async ({
    page,
  }) => {
    const width = page.getByLabel("Width:m");
    const height = page.getByLabel("Height:m");

    await page.getByText("Keep aspect ratio").click();
    await width.click();
    await width.fill("2");
    await page.getByText("Width:mHeight:m").click();
    await expect(height).toHaveValue("1");
  });
});
