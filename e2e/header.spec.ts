import { expect, test } from "@playwright/test";

test.describe("Header", () => {
	test("is visible on page load", async ({ page }) => {
		await page.goto("/");

		const header = page.locator("header");
		await expect(header).toBeVisible();
	});

	test("displays the wordmark", async ({ page }) => {
		await page.goto("/");

		await expect(
			page.getByRole("link", { name: "FOSTER THE PEOPLE" }),
		).toBeVisible();
	});

	test("displays all navigation links on desktop", async ({ page }) => {
		await page.goto("/");

		for (const label of ["HOME", "ALBUM", "TRACKS", "ARTWORK", "ABOUT"]) {
			await expect(
				page.getByRole("link", { name: label }).first(),
			).toBeVisible();
		}
	});

	test("displays the Listen Now CTA", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByRole("link", { name: /listen now/i })).toBeVisible();
	});

	test("navigation links scroll to sections", async ({ page }) => {
		await page.goto("/");

		const homeLink = page.getByRole("link", { name: "HOME" }).first();
		await homeLink.click();

		expect(page.url()).toContain("#home");
	});
});

test.describe("Header — mobile", () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test("shows hamburger button", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
	});

	test("opens and closes mobile menu", async ({ page }) => {
		await page.goto("/");

		const menuButton = page.getByRole("button", { name: "Open menu" });
		await menuButton.click();

		await expect(
			page.getByRole("button", { name: "Close menu" }),
		).toBeVisible();

		const closeButton = page.getByRole("button", { name: "Close menu" });
		await closeButton.click();

		await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
	});

	test("mobile menu shows nav links and closes on link click", async ({
		page,
	}) => {
		await page.goto("/");

		await page.getByRole("button", { name: "Open menu" }).click();

		const albumLink = page.getByRole("link", { name: "ALBUM" }).last();
		await expect(albumLink).toBeVisible();
		await albumLink.click();

		await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
	});
});
