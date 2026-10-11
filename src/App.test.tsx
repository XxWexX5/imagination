import { render, screen } from "@testing-library/react";
import { App } from "./App.tsx";

vi.mock("./assets/imagination.svg?react", () => ({
	default: (props: Record<string, unknown>) => (
		<svg data-testid="imagination-svg" {...props} />
	),
}));

describe("App", () => {
	it("renders the page heading", () => {
		render(<App />);

		expect(
			screen.getByRole("heading", { level: 1, name: "IMAGINATION" }),
		).toBeInTheDocument();
	});
});
