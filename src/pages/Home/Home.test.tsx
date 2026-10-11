import { render, screen } from "@testing-library/react";
import { Home } from "./index.tsx";

vi.mock("../../assets/imagination.svg?react", () => ({
	default: (props: Record<string, unknown>) => (
		<svg data-testid="imagination-svg" {...props} />
	),
}));

describe("Home (Hero section)", () => {
	it("renders the eyebrow text", () => {
		render(<Home />);

		expect(screen.getByText("FOSTER THE PEOPLE / 2019")).toBeInTheDocument();
	});

	it("renders IMAGINATION as h1", () => {
		render(<Home />);

		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toHaveTextContent("IMAGINATION");
	});

	it("renders the tagline", () => {
		render(<Home />);

		expect(screen.getByText(/real places live in/i)).toBeInTheDocument();
		expect(screen.getByText(/your imagination/i)).toBeInTheDocument();
	});

	it("renders the LISTEN NOW CTA", () => {
		render(<Home />);

		expect(
			screen.getByRole("button", { name: /listen now/i }),
		).toBeInTheDocument();
	});

	it("renders the scroll cue", () => {
		render(<Home />);

		expect(screen.getByText(/scroll to explore/i)).toBeInTheDocument();
	});

	it("renders the SVG animation", () => {
		render(<Home />);

		expect(screen.getByTestId("imagination-svg")).toBeInTheDocument();
	});
});
