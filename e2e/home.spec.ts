import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
	test("renders the heading", async ({ page }) => {
		await page.goto("/");

		await expect(
			page.getByRole("heading", { level: 1, name: "Imagination" }),
		).toBeVisible();
	});

	test("renders the hello world text", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByText("hello world!")).toBeVisible();
	});

	test("has the correct page title", async ({ page }) => {
		await page.goto("/");

		await expect(page).toHaveTitle(/Imagination/);
	});

	test("heading animates in", async ({ page }) => {
		await page.goto("/");

		const heading = page.getByRole("heading", {
			level: 1,
			name: "Imagination",
		});
		await expect(heading).toBeVisible();
		await expect(heading).toHaveCSS("opacity", "1");
	});
});
