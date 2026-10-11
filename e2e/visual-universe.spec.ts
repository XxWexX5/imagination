import { expect, test } from "@playwright/test";

test.describe("Visual Universe section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.locator("#artwork").scrollIntoViewIfNeeded();
	});

	test("artwork section is visible", async ({ page }) => {
		await expect(page.locator("#artwork")).toBeVisible();
	});

	test("displays heading and label", async ({ page }) => {
		const section = page.locator("#artwork");

		await expect(
			section.getByRole("heading", {
				level: 2,
				name: /EVERYTHING\s*IS A LANDSCAPE/,
			}),
		).toBeVisible();
		await expect(section.getByText("THE VISUAL UNIVERSE")).toBeVisible();
	});

	test("displays section number 03", async ({ page }) => {
		const section = page.locator("#artwork");

		await expect(section.getByText("03").first()).toBeVisible();
	});

	test("displays gallery images", async ({ page }) => {
		const images = page.locator("#artwork img");
		const count = await images.count();

		expect(count).toBeGreaterThanOrEqual(8);
	});

	test("header ARTWORK link navigates to the section", async ({ page }) => {
		await page.goto("/");
		await page
			.getByRole("navigation")
			.getByRole("link", { name: "ARTWORK" })
			.first()
			.click();

		await expect(
			page.locator("#artwork").getByRole("heading", { level: 2 }),
		).toBeInViewport();
	});
});

test.describe("Visual Universe section — mobile", () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test("content is visible without horizontal scroll", async ({ page }) => {
		await page.goto("/");
		const section = page.locator("#artwork");
		await section.scrollIntoViewIfNeeded();

		await expect(section.getByRole("heading", { level: 2 })).toBeVisible();
		expect(
			await page.evaluate(
				() =>
					document.documentElement.scrollWidth <=
					document.documentElement.clientWidth,
			),
		).toBe(true);
	});
});
