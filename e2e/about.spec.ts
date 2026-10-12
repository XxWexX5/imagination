import { expect, test } from "@playwright/test";

test.describe("About section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.locator("#about").scrollIntoViewIfNeeded();
	});

	test("about section is visible", async ({ page }) => {
		await expect(page.locator("#about")).toBeVisible();
	});

	test("displays eyebrow and heading", async ({ page }) => {
		const section = page.locator("#about");

		await expect(section.getByText("ABOUT THE ESCAPE")).toBeVisible();
		await expect(
			section.getByRole("heading", {
				level: 2,
				name: /REAL PLACES LIVE IN\s*YOUR IMAGINATION/,
			}),
		).toBeVisible();
	});

	test("displays the copy", async ({ page }) => {
		const section = page.locator("#about");

		await expect(
			section.getByText(/Imagination is an invitation/),
		).toBeVisible();
	});

	test("displays footer attribution", async ({ page }) => {
		const section = page.locator("#about");

		await expect(section.getByText("FOSTER THE PEOPLE")).toBeVisible();
		await expect(
			section.getByText("INDEPENDENT FAN-MADE CONCEPT"),
		).toBeVisible();
	});

	test("displays the wordmark", async ({ page }) => {
		const section = page.locator("#about");

		await expect(
			section.getByText("IMAGINATION", { exact: true }),
		).toBeVisible();
	});

	test("header ABOUT link navigates to the section", async ({ page }) => {
		await page.goto("/");
		await page
			.getByRole("navigation")
			.getByRole("link", { name: "ABOUT" })
			.first()
			.click();

		await expect(
			page.locator("#about").getByRole("heading", { level: 2 }),
		).toBeInViewport();
	});
});

test.describe("About section — mobile", () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test("content is visible without horizontal scroll", async ({ page }) => {
		await page.goto("/");
		const section = page.locator("#about");
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
