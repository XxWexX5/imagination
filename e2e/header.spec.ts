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

		await expect(
			page.getByRole("button", { name: /listen now/i }).first(),
		).toBeVisible();
	});

	test("navigation links scroll to sections", async ({ page }) => {
		await page.goto("/");

		const albumLink = page.getByRole("link", { name: "ALBUM" }).first();
		await albumLink.click();

		await expect(page.locator("#album")).toBeInViewport();
	});

	test("active link follows the section in view while scrolling", async ({
		page,
	}) => {
		await page.goto("/");
		const nav = page.getByRole("navigation", { name: "Main navigation" });
		const current = nav.locator('a[aria-current="location"]');

		await expect(current).toHaveText("HOME");

		for (const [id, label] of [
			["tracks", "TRACKS"],
			["about", "ABOUT"],
			["album", "ALBUM"],
		] as const) {
			await page.evaluate((sectionId) => {
				const top = document.getElementById(sectionId)?.offsetTop ?? 0;
				window.scrollTo(0, top);
			}, id);

			await expect(current).toHaveText(label);
		}

		await page.evaluate(() => window.scrollTo(0, 0));
		await expect(current).toHaveText("HOME");
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
