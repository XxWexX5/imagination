import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageCarousel } from "./index.tsx";

const images = [
	{ src: "/img-1.webp", alt: "Image one" },
	{ src: "/img-2.webp", alt: "Image two" },
	{ src: "/img-3.webp", alt: "Image three" },
];

vi.mock("embla-carousel-react", () => {
	let selectedIndex = 0;
	const listeners = new Map<string, (() => void)[]>();

	const api = {
		selectedScrollSnap: () => selectedIndex,
		scrollTo: (index: number) => {
			selectedIndex = index;
			for (const cb of listeners.get("select") ?? []) cb();
		},
		scrollPrev: () => {
			selectedIndex = (selectedIndex - 1 + images.length) % images.length;
			for (const cb of listeners.get("select") ?? []) cb();
		},
		scrollNext: () => {
			selectedIndex = (selectedIndex + 1) % images.length;
			for (const cb of listeners.get("select") ?? []) cb();
		},
		on: (event: string, cb: () => void) => {
			listeners.set(event, [...(listeners.get(event) ?? []), cb]);
		},
		off: (event: string, cb: () => void) => {
			listeners.set(
				event,
				(listeners.get(event) ?? []).filter((fn) => fn !== cb),
			);
		},
	};

	return {
		default: () => [vi.fn(), api],
	};
});

describe("ImageCarousel", () => {
	it("renders the carousel region", () => {
		render(<ImageCarousel images={images} />);

		expect(
			screen.getByRole("region", { name: "Album artwork carousel" }),
		).toBeInTheDocument();
	});

	it("renders all slides", () => {
		render(<ImageCarousel images={images} />);

		const slides = screen.getAllByRole("group");
		expect(slides).toHaveLength(images.length);
	});

	it("renders all thumbnail tabs", () => {
		render(<ImageCarousel images={images} />);

		const tabs = screen.getAllByRole("tab");
		expect(tabs).toHaveLength(images.length);
	});

	it("marks the first thumbnail as selected by default", () => {
		render(<ImageCarousel images={images} />);

		const tabs = screen.getAllByRole("tab");
		expect(tabs[0]).toHaveAttribute("aria-selected", "true");
		expect(tabs[1]).toHaveAttribute("aria-selected", "false");
	});

	it("selects a thumbnail on click", async () => {
		const user = userEvent.setup();
		render(<ImageCarousel images={images} />);

		const tabs = screen.getAllByRole("tab");
		const secondTab = tabs[1] as HTMLElement;
		await user.click(secondTab);

		expect(secondTab).toHaveAttribute("aria-selected", "true");
		expect(tabs[0]).toHaveAttribute("aria-selected", "false");
	});

	it("displays images with correct alt text", () => {
		render(<ImageCarousel images={images} />);

		expect(screen.getByRole("img", { name: "Image one" })).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Image two" })).toBeInTheDocument();
		expect(
			screen.getByRole("img", { name: "Image three" }),
		).toBeInTheDocument();
	});
});
