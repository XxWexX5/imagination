import { render, screen } from "@testing-library/react";
import { VisualUniverse } from "./index.tsx";

describe("VisualUniverse section", () => {
	it("renders the section with the artwork anchor id", () => {
		const { container } = render(<VisualUniverse />);

		expect(container.querySelector("section#artwork")).toBeInTheDocument();
	});

	it("renders the section number 03", () => {
		const { container } = render(<VisualUniverse />);

		const number = container.querySelector("[aria-hidden='true']");
		expect(number).toHaveTextContent("03");
	});

	it("renders the label THE VISUAL UNIVERSE", () => {
		render(<VisualUniverse />);

		expect(screen.getByText("THE VISUAL UNIVERSE")).toBeInTheDocument();
	});

	it("renders the heading", () => {
		render(<VisualUniverse />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			/EVERYTHING\s*IS A LANDSCAPE/,
		);
	});

	it("renders all 8 gallery images", () => {
		render(<VisualUniverse />);

		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(8);
	});

	it("images have lazy loading", () => {
		render(<VisualUniverse />);

		const images = screen.getAllByRole("img");
		for (const img of images) {
			expect(img).toHaveAttribute("loading", "lazy");
		}
	});
});
