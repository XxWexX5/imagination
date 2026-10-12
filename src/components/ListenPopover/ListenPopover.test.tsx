import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListenPopover } from "./index.tsx";

describe("ListenPopover", () => {
	it("renders the LISTEN NOW button", () => {
		render(<ListenPopover />);

		expect(
			screen.getByRole("button", { name: /listen now/i }),
		).toBeInTheDocument();
	});

	it("opens the popover on click", async () => {
		const user = userEvent.setup();
		render(<ListenPopover />);

		await user.click(screen.getByRole("button", { name: /listen now/i }));

		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	it("shows all three options when open", async () => {
		const user = userEvent.setup();
		render(<ListenPopover />);

		await user.click(screen.getByRole("button", { name: /listen now/i }));

		expect(
			screen.getByRole("menuitem", { name: /spotify/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("menuitem", { name: /youtube/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("menuitem", { name: /play now/i }),
		).toBeInTheDocument();
	});

	it("closes the popover on click outside", async () => {
		const user = userEvent.setup();
		render(<ListenPopover />);

		await user.click(screen.getByRole("button", { name: /listen now/i }));
		expect(screen.getByRole("menu")).toBeInTheDocument();

		await user.click(document.body);

		await waitFor(() => {
			expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		});
	});

	it("closes the popover on Escape", async () => {
		const user = userEvent.setup();
		render(<ListenPopover />);

		await user.click(screen.getByRole("button", { name: /listen now/i }));
		expect(screen.getByRole("menu")).toBeInTheDocument();

		await user.keyboard("{Escape}");

		await waitFor(() => {
			expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		});
	});

	it("reflects open state in aria-expanded", async () => {
		const user = userEvent.setup();
		render(<ListenPopover />);

		const button = screen.getByRole("button", { name: /listen now/i });
		expect(button).toHaveAttribute("aria-expanded", "false");

		await user.click(button);
		expect(button).toHaveAttribute("aria-expanded", "true");

		await user.click(button);
		expect(button).toHaveAttribute("aria-expanded", "false");
	});

	it("opens external links in new tab", async () => {
		const user = userEvent.setup();
		render(<ListenPopover />);

		await user.click(screen.getByRole("button", { name: /listen now/i }));

		const spotify = screen.getByRole("menuitem", { name: /spotify/i });
		expect(spotify).toHaveAttribute("target", "_blank");
		expect(spotify).toHaveAttribute("rel", "noopener noreferrer");

		const youtube = screen.getByRole("menuitem", { name: /youtube/i });
		expect(youtube).toHaveAttribute("target", "_blank");
		expect(youtube).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("does not open internal link in new tab", async () => {
		const user = userEvent.setup();
		render(<ListenPopover />);

		await user.click(screen.getByRole("button", { name: /listen now/i }));

		const playNow = screen.getByRole("menuitem", { name: /play now/i });
		expect(playNow).not.toHaveAttribute("target");
	});
});
