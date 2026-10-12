import { render, screen } from "@testing-library/react";
import { About } from "./index.tsx";

describe("About section", () => {
	it("renders the section with the about anchor id", () => {
		const { container } = render(<About />);

		expect(container.querySelector("section#about")).toBeInTheDocument();
	});

	it("renders the eyebrow", () => {
		render(<About />);

		expect(screen.getByText(/04\s+\/\s+ABOUT THE ESCAPE/)).toBeInTheDocument();
	});

	it("renders the heading", () => {
		render(<About />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			/REAL PLACES LIVE IN\s*YOUR IMAGINATION/,
		);
	});

	it("renders the copy", () => {
		render(<About />);

		expect(
			screen.getByText(/Imagination is an invitation to escape/),
		).toBeInTheDocument();
	});

	it("renders the footer attribution", () => {
		render(<About />);

		expect(screen.getByText("FOSTER THE PEOPLE")).toBeInTheDocument();
	});

	it("renders the independent concept note", () => {
		render(<About />);

		expect(
			screen.getByText("INDEPENDENT FAN-MADE CONCEPT"),
		).toBeInTheDocument();
	});

	it("renders the wordmark", () => {
		render(<About />);

		expect(screen.getByText("IMAGINATION")).toBeInTheDocument();
	});
});
