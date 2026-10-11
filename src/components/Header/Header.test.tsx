import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./index.tsx";

describe("Header", () => {
	it("renders the wordmark", () => {
		render(<Header />);

		expect(screen.getByText("FOSTER THE PEOPLE")).toBeInTheDocument();
	});

	it("renders all navigation links", () => {
		render(<Header />);

		for (const label of ["HOME", "ALBUM", "TRACKS", "ARTWORK", "ABOUT"]) {
			expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
		}
	});

	it("renders the Listen Now CTA", () => {
		render(<Header />);

		expect(
			screen.getByRole("link", { name: /listen now/i }),
		).toBeInTheDocument();
	});

	it("highlights the active link with turquoise color", () => {
		render(<Header />);

		const homeLink = screen.getByRole("link", { name: "HOME" });
		expect(homeLink.className).toContain("text-turquoise");
	});

	it("changes active link on click", async () => {
		const user = userEvent.setup();
		render(<Header />);

		const albumLink = screen.getByRole("link", { name: "ALBUM" });
		await user.click(albumLink);

		expect(albumLink.className).toContain("text-turquoise");
		const homeClasses = screen.getByRole("link", { name: "HOME" }).className;
		expect(homeClasses).toContain("text-ivory");
		expect(homeClasses).not.toMatch(/(?<!\S)text-turquoise(?!\S)/);
	});

	it("renders the hamburger button for mobile", () => {
		render(<Header />);

		const menuButton = screen.getByRole("button", { name: "Open menu" });
		expect(menuButton).toBeInTheDocument();
		expect(menuButton).toHaveAttribute("aria-expanded", "false");
	});

	it("toggles mobile menu on hamburger click", async () => {
		const user = userEvent.setup();
		render(<Header />);

		const menuButton = screen.getByRole("button", { name: "Open menu" });
		await user.click(menuButton);

		expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
			"aria-expanded",
			"true",
		);
	});

	it("closes mobile menu when a link is clicked", async () => {
		const user = userEvent.setup();
		render(<Header />);

		await user.click(screen.getByRole("button", { name: "Open menu" }));

		const mobileLinks = screen.getAllByRole("link", { name: "ALBUM" });
		const lastLink = mobileLinks.at(-1) as HTMLElement;
		await user.click(lastLink);

		expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
			"aria-expanded",
			"false",
		);
	});

	it("has correct navigation landmark", () => {
		render(<Header />);

		expect(
			screen.getByRole("navigation", { name: "Main navigation" }),
		).toBeInTheDocument();
	});
});
