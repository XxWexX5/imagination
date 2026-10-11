import { expect, test } from "@playwright/test";

test.describe("Tracks section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.locator("#tracks").scrollIntoViewIfNeeded();
	});

	test("tracks section is visible", async ({ page }) => {
		await expect(page.locator("#tracks")).toBeVisible();
	});

	test("displays heading and subtitle", async ({ page }) => {
		const tracks = page.locator("#tracks");

		await expect(
			tracks.getByRole("heading", {
				level: 2,
				name: /FIVE WAYS TO\s*GET LOST/,
			}),
		).toBeVisible();
		await expect(
			tracks.getByText("A SIDEWAYS ROUTE THROUGH THE INNER WORLD"),
		).toBeVisible();
	});

	test("displays section number and label", async ({ page }) => {
		const tracks = page.locator("#tracks");

		await expect(tracks.getByText("02").first()).toBeVisible();
		await expect(tracks.getByText("THE SOUNDTRACK")).toBeVisible();
	});

	test("displays all 5 tracks", async ({ page }) => {
		const items = page.locator("#tracks ol li");
		await expect(items).toHaveCount(5);
	});

	test("displays track titles and durations", async ({ page }) => {
		const tracks = page.locator("#tracks");

		await expect(tracks.getByText("HELENA BEAT")).toBeVisible();
		await expect(tracks.getByText("STYLE")).toBeVisible();
	});

	test("clicking a track toggles play state", async ({ page }) => {
		const firstTrack = page
			.locator("#tracks ol li")
			.first()
			.getByRole("button");
		await firstTrack.click();

		await expect(firstTrack.locator(".lucide-pause")).toBeVisible();

		await firstTrack.click();
		await expect(firstTrack.locator(".lucide-play")).toBeVisible();
	});

	test("header TRACKS link navigates to the section", async ({ page }) => {
		await page.goto("/");
		await page
			.getByRole("navigation")
			.getByRole("link", { name: "TRACKS" })
			.first()
			.click();

		await expect(
			page.locator("#tracks").getByRole("heading", { level: 2 }),
		).toBeInViewport();
	});
});

test.describe("Tracks section — mobile", () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test("content is visible without horizontal scroll", async ({ page }) => {
		await page.goto("/");
		const tracks = page.locator("#tracks");
		await tracks.scrollIntoViewIfNeeded();

		await expect(tracks.getByRole("heading", { level: 2 })).toBeVisible();
		await expect(tracks.getByText("HELENA BEAT")).toBeVisible();
		expect(
			await page.evaluate(
				() =>
					document.documentElement.scrollWidth <=
					document.documentElement.clientWidth,
			),
		).toBe(true);
	});
});
