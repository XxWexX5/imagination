import { expect, test } from "@playwright/test";

test.describe("Album section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.locator("#album").scrollIntoViewIfNeeded();
	});

	test("album section is visible", async ({ page }) => {
		await expect(page.locator("#album")).toBeVisible();
	});

	test("displays heading, body copy and CTA", async ({ page }) => {
		const album = page.locator("#album");

		await expect(
			album.getByRole("heading", {
				level: 2,
				name: /A JOURNEY THROUGH\s*YOUR IMAGINATION/,
			}),
		).toBeVisible();
		await expect(
			album.getByText(/takes you through a colorful landscape/),
		).toBeVisible();
		await expect(
			album.getByRole("link", { name: /EXPLORE ARTWORK/ }),
		).toHaveAttribute(
			"href",
			"https://br.pinterest.com/search/pins/?q=foster%20the%20people%20art",
		);
	});

	test("EXPLORE ARTWORK opens in new tab", async ({ page }) => {
		const link = page
			.locator("#album")
			.getByRole("link", { name: /EXPLORE ARTWORK/ });
		await expect(link).toHaveAttribute("target", "_blank");
	});

	test("carousel displays main image", async ({ page }) => {
		const carousel = page.locator('[aria-roledescription="carousel"]');
		await expect(carousel).toBeVisible();

		const mainImage = carousel.locator('[aria-roledescription="slide"] img');
		await expect(mainImage.first()).toBeVisible();
	});

	test("carousel displays thumbnail tabs", async ({ page }) => {
		const tabs = page.locator("#album").getByRole("tablist").getByRole("tab");
		await expect(tabs).toHaveCount(4);
	});

	test("clicking a thumbnail changes the selected tab", async ({ page }) => {
		const tabs = page.locator("#album").getByRole("tablist").getByRole("tab");

		await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");

		await tabs.nth(2).click();
		await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
		await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "false");
	});

	test("header ALBUM link navigates to the section", async ({ page }) => {
		await page.goto("/");
		await page
			.getByRole("navigation")
			.getByRole("link", { name: "ALBUM" })
			.first()
			.click();

		await expect(
			page.locator("#album").getByRole("heading", { level: 2 }),
		).toBeInViewport();
	});
});

test.describe("Album section — mobile", () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test("content is visible without horizontal scroll", async ({ page }) => {
		await page.goto("/");
		const album = page.locator("#album");
		await album.scrollIntoViewIfNeeded();

		await expect(album.getByRole("heading", { level: 2 })).toBeVisible();
		await expect(
			album.getByRole("link", { name: /EXPLORE ARTWORK/ }),
		).toBeVisible();
		expect(
			await page.evaluate(
				() =>
					document.documentElement.scrollWidth <=
					document.documentElement.clientWidth,
			),
		).toBe(true);
	});
});
