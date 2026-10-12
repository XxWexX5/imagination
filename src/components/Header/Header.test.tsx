import { render, screen, waitFor } from "@testing-library/react";
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
			screen.getByRole("button", { name: /listen now/i }),
		).toBeInTheDocument();
	});

	it("highlights the active link with turquoise color", () => {
		render(<Header />);

		const homeLink = screen.getByRole("link", { name: "HOME" });
		expect(homeLink.className).toContain("text-turquoise");
	});

	it("activates the link of the section in view while scrolling", async () => {
		const tops: Record<string, number> = {
			home: -900,
			album: 80,
			tracks: 900,
			artwork: 1800,
			about: 2700,
		};
		const sections = Object.keys(tops).map((id) => {
			const section = document.createElement("section");
			section.id = id;
			section.getBoundingClientRect = () => ({ top: tops[id] }) as DOMRect;
			document.body.append(section);
			return section;
		});

		render(<Header />);

		expect(screen.getByRole("link", { name: "ALBUM" })).toHaveAttribute(
			"aria-current",
			"location",
		);

		tops.album = -800;
		tops.tracks = 100;
		window.dispatchEvent(new Event("scroll"));

		await waitFor(() =>
			expect(screen.getByRole("link", { name: "TRACKS" })).toHaveAttribute(
				"aria-current",
				"location",
			),
		);
		expect(screen.getByRole("link", { name: "ALBUM" })).not.toHaveAttribute(
			"aria-current",
		);

		for (const section of sections) {
			section.remove();
		}
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
