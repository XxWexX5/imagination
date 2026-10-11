import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Track } from "./index.tsx";
import { TrackRow } from "./index.tsx";

const track: Track = {
	number: "01",
	title: "CHASING LOWS",
	duration: "3:44",
};

describe("TrackRow", () => {
	it("renders the track number, title and duration", () => {
		render(<TrackRow track={track} isPlaying={false} onToggle={() => {}} />);

		expect(screen.getByText("01")).toBeInTheDocument();
		expect(screen.getByText("CHASING LOWS")).toBeInTheDocument();
		expect(screen.getByText("3:44")).toBeInTheDocument();
	});

	it("renders a play icon when not playing", () => {
		const { container } = render(
			<TrackRow track={track} isPlaying={false} onToggle={() => {}} />,
		);

		expect(container.querySelector(".lucide-play")).toBeInTheDocument();
	});

	it("renders a pause icon when playing", () => {
		const { container } = render(
			<TrackRow track={track} isPlaying={true} onToggle={() => {}} />,
		);

		expect(container.querySelector(".lucide-pause")).toBeInTheDocument();
	});

	it("calls onToggle when clicked", async () => {
		const onToggle = vi.fn();
		const user = userEvent.setup();
		render(<TrackRow track={track} isPlaying={false} onToggle={onToggle} />);

		await user.click(screen.getByRole("button"));
		expect(onToggle).toHaveBeenCalledOnce();
	});
});
