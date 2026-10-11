import { expect, test } from "@playwright/test";

test.describe("Hero section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("hero section is visible", async ({ page }) => {
		await expect(page.locator("#home")).toBeVisible();
	});

	test("displays eyebrow text", async ({ page }) => {
		await expect(page.getByText("FOSTER THE PEOPLE / 2019")).toBeVisible();
	});

	test("displays title IMAGINATION", async ({ page }) => {
		await expect(
			page.getByRole("heading", { level: 1, name: "IMAGINATION" }),
		).toBeVisible();
	});

	test("displays tagline", async ({ page }) => {
		await expect(page.getByText(/REAL PLACES LIVE IN/)).toBeVisible();
		await expect(page.getByText(/YOUR IMAGINATION/)).toBeVisible();
	});

	test("displays LISTEN NOW button", async ({ page }) => {
		await expect(
			page.getByRole("button", { name: /LISTEN NOW/ }),
		).toBeVisible();
	});

	test("popover opens and closes on CTA click", async ({ page }) => {
		const button = page.getByRole("button", { name: /LISTEN NOW/ });

		await button.click();
		await expect(page.getByRole("menu")).toBeVisible();

		await button.click();
		await expect(page.getByRole("menu")).not.toBeVisible();
	});

	test("popover shows all options", async ({ page }) => {
		await page.getByRole("button", { name: /LISTEN NOW/ }).click();

		await expect(page.getByRole("menuitem", { name: /Spotify/ })).toBeVisible();
		await expect(page.getByRole("menuitem", { name: /YouTube/ })).toBeVisible();
		await expect(
			page.getByRole("menuitem", { name: /Na página/ }),
		).toBeVisible();
	});

	test("popover closes on click outside", async ({ page }) => {
		await page.getByRole("button", { name: /LISTEN NOW/ }).click();
		await expect(page.getByRole("menu")).toBeVisible();

		await page.locator("h1").click();
		await expect(page.getByRole("menu")).not.toBeVisible();
	});

	test("displays scroll cue", async ({ page }) => {
		await expect(page.getByText(/SCROLL TO EXPLORE/)).toBeVisible();
	});
});

test.describe("Hero section — mobile", () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("title is visible on mobile", async ({ page }) => {
		await expect(
			page.getByRole("heading", { level: 1, name: "IMAGINATION" }),
		).toBeVisible();
	});

	test("LISTEN NOW button is visible on mobile", async ({ page }) => {
		await expect(
			page.getByRole("button", { name: /LISTEN NOW/ }),
		).toBeVisible();
	});
});
