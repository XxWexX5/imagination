import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function revealAllSections(page: import("@playwright/test").Page) {
	for (const id of ["album", "tracks", "artwork", "about"]) {
		await page.locator(`#${id}`).scrollIntoViewIfNeeded();
		await page.waitForTimeout(600);
	}
}

test.describe("Accessibility", () => {
	test("page has no WCAG A/AA violations", async ({ page }) => {
		await page.goto("/");
		await revealAllSections(page);

		const results = await new AxeBuilder({ page })
			.withTags(WCAG_TAGS)
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test("open Listen Now menu has no violations", async ({ page }) => {
		await page.goto("/");
		await page
			.locator("#home")
			.getByRole("button", { name: /LISTEN NOW/ })
			.click();
		await expect(page.getByRole("menu")).toBeVisible();

		const results = await new AxeBuilder({ page })
			.withTags(WCAG_TAGS)
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test("skip link is the first tab stop and moves focus to main", async ({
		page,
	}) => {
		await page.goto("/");
		await page.keyboard.press("Tab");

		const skipLink = page.getByRole("link", { name: "SKIP TO MAIN CONTENT" });
		await expect(skipLink).toBeFocused();
		await expect(skipLink).toBeVisible();

		await page.keyboard.press("Enter");
		await expect(page.locator("main")).toBeFocused();
	});

	test("Listen Now menu is operable with the keyboard", async ({ page }) => {
		await page.goto("/");
		const button = page
			.locator("#home")
			.getByRole("button", { name: /LISTEN NOW/ });

		await button.focus();
		await page.keyboard.press("Enter");
		await expect(page.getByRole("menuitem", { name: /Spotify/ })).toBeFocused();

		await page.keyboard.press("ArrowDown");
		await expect(page.getByRole("menuitem", { name: /YouTube/ })).toBeFocused();

		await page.keyboard.press("Escape");
		await expect(page.getByRole("menu")).not.toBeVisible();
		await expect(button).toBeFocused();
	});

	test("header link moves focus to its section", async ({ page }) => {
		await page.goto("/");
		await page
			.getByRole("navigation", { name: "Main navigation" })
			.getByRole("link", { name: "TRACKS" })
			.click();

		await expect(page.locator("#tracks")).toBeFocused();
	});
});

test.describe("Accessibility — reduced motion", () => {
	test("hero artwork is not animated", async ({ page }) => {
		await page.emulateMedia({ reducedMotion: "reduce" });
		await page.goto("/");

		const animationName = await page
			.locator("#hat")
			.evaluate((el) => getComputedStyle(el).animationName);

		expect(animationName).toBe("none");
	});
});

test.describe("Accessibility — mobile", () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test("open mobile menu has no violations and closes with Escape", async ({
		page,
	}) => {
		await page.goto("/");
		await page.getByRole("button", { name: "Open menu" }).click();
		await expect(page.locator("#mobile-menu")).toBeVisible();
		await expect(page.locator("main")).toHaveAttribute("inert", "");

		const results = await new AxeBuilder({ page })
			.withTags(WCAG_TAGS)
			.analyze();
		expect(results.violations).toEqual([]);

		await page.keyboard.press("Escape");
		await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
		await expect(page.locator("main")).not.toHaveAttribute("inert", "");
	});
});
