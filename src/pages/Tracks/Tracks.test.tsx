import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tracks } from "./index.tsx";

vi.mock("../../assets/audio/Helena Beat.mp3", () => ({
	default: "/helena-beat.mp3",
}));
vi.mock("../../assets/audio/Houdini.mp3", () => ({ default: "/houdini.mp3" }));
vi.mock("../../assets/audio/Imagination.mp3", () => ({
	default: "/imagination.mp3",
}));
vi.mock("../../assets/audio/Pumped Up Kicks.mp3", () => ({
	default: "/pumped-up-kicks.mp3",
}));
vi.mock("../../assets/audio/Style.mp3", () => ({ default: "/style.mp3" }));

describe("Tracks section", () => {
	it("renders the section with the tracks anchor id", () => {
		const { container } = render(<Tracks />);

		expect(container.querySelector("section#tracks")).toBeInTheDocument();
	});

	it("renders the section number 02", () => {
		const { container } = render(<Tracks />);

		const number = container.querySelector("[aria-hidden='true']");
		expect(number).toHaveTextContent("02");
	});

	it("renders the label THE SOUNDTRACK", () => {
		render(<Tracks />);

		expect(screen.getByText("THE SOUNDTRACK")).toBeInTheDocument();
	});

	it("renders the heading", () => {
		render(<Tracks />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			/FIVE WAYS TO\s*GET LOST/,
		);
	});

	it("renders the subtitle", () => {
		render(<Tracks />);

		expect(
			screen.getByText("A SIDEWAYS ROUTE THROUGH THE INNER WORLD"),
		).toBeInTheDocument();
	});

	it("renders all 5 tracks", () => {
		render(<Tracks />);

		expect(screen.getAllByRole("listitem")).toHaveLength(5);
	});

	it("renders track titles in uppercase", () => {
		render(<Tracks />);

		expect(screen.getByText("HELENA BEAT")).toBeInTheDocument();
		expect(screen.getByText("HOUDINI")).toBeInTheDocument();
		expect(screen.getByText("IMAGINATION")).toBeInTheDocument();
		expect(screen.getByText("PUMPED UP KICKS")).toBeInTheDocument();
		expect(screen.getByText("STYLE")).toBeInTheDocument();
	});

	it("toggles play state on track click", async () => {
		const user = userEvent.setup();
		render(<Tracks />);

		const buttons = screen.getAllByRole("button");
		await user.click(buttons[0] as HTMLElement);

		expect(
			(buttons[0] as HTMLElement).querySelector(".lucide-pause"),
		).toBeInTheDocument();
	});

	it("only one track plays at a time", async () => {
		const user = userEvent.setup();
		render(<Tracks />);

		const buttons = screen.getAllByRole("button");
		await user.click(buttons[0] as HTMLElement);
		await user.click(buttons[1] as HTMLElement);

		expect(
			(buttons[0] as HTMLElement).querySelector(".lucide-play"),
		).toBeInTheDocument();
		expect(
			(buttons[1] as HTMLElement).querySelector(".lucide-pause"),
		).toBeInTheDocument();
	});
});
