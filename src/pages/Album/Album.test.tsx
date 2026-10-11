import { render, screen } from "@testing-library/react";
import { Album } from "./index.tsx";

vi.mock("../../components/ImageCarousel/index.tsx", () => ({
	ImageCarousel: ({ images }: { images: { src: string; alt: string }[] }) => (
		<div data-testid="image-carousel">
			{images.map((img) => (
				<img key={img.src} src={img.src} alt={img.alt} />
			))}
		</div>
	),
}));

describe("Album section", () => {
	it("renders the section with the album anchor id", () => {
		const { container } = render(<Album />);

		expect(container.querySelector("section#album")).toBeInTheDocument();
	});

	it("renders the heading as h2", () => {
		render(<Album />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			/a journey through\s*your imagination/i,
		);
	});

	it("renders the section number and label", () => {
		render(<Album />);

		expect(screen.getByText("01")).toBeInTheDocument();
		expect(screen.getByText("THE ALBUM")).toBeInTheDocument();
	});

	it("renders the body copy", () => {
		render(<Album />);

		expect(
			screen.getByText(/takes you through a colorful landscape/i),
		).toBeInTheDocument();
	});

	it("renders the EXPLORE ARTWORK link pointing to Pinterest", () => {
		render(<Album />);

		const link = screen.getByRole("link", { name: /explore artwork/i });
		expect(link).toHaveAttribute(
			"href",
			"https://br.pinterest.com/search/pins/?q=foster%20the%20people%20art",
		);
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("renders the carousel with all artwork images", () => {
		render(<Album />);

		expect(screen.getByTestId("image-carousel")).toBeInTheDocument();
		expect(screen.getAllByRole("img")).toHaveLength(4);
	});

	it("renders artwork images with descriptive alt text", () => {
		render(<Album />);

		expect(
			screen.getByRole("img", { name: /foster the people band/i }),
		).toBeInTheDocument();
	});
});
