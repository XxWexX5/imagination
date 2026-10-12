import { useLenis } from "lenis/react";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { scrollToSection } from "../../lib/scroll-to-section.ts";

const LISTEN_OPTIONS = [
	{
		label: "Spotify",
		href: "https://open.spotify.com/track/2flxduIqEbsicdmPyj1WVW?si=d1e9ad86d6354c55",
		external: true,
		icon: (
			<svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
				<path
					fill="currentColor"
					d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34a.75.75 0 01-1.03.25c-2.82-1.72-6.37-2.11-10.56-1.16a.749.749 0 11-.33-1.46c4.56-1.04 8.49-.59 11.66 1.34a.749.749 0 01.26 1.03zm1.47-3.27a.934.934 0 01-1.28.31c-3.22-1.98-8.14-2.56-11.95-1.4a.934.934 0 11-.54-1.79c4.36-1.32 9.78-.68 13.46 1.6a.935.935 0 01.31 1.28zm.13-3.4C15.68 8.54 9.11 8.33 5.32 9.51a1.12 1.12 0 11-.65-2.14c4.36-1.32 11.59-1.07 16.16 1.65a1.12 1.12 0 01-.39 2.05 1.12 1.12 0 01-.99-.4z"
				/>
			</svg>
		),
	},
	{
		label: "YouTube",
		href: "https://www.youtube.com/watch?v=NE6pANWJGuU",
		external: true,
		icon: (
			<svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
				<path
					fill="currentColor"
					d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
				/>
			</svg>
		),
	},
	{
		label: "Play Now",
		href: "#tracks",
		external: false,
		icon: <Play size={18} />,
	},
] as const;

interface ListenPopoverProps {
	direction?: "up" | "down";
	size?: "default" | "compact";
}

export function ListenPopover({
	direction = "up",
	size = "default",
}: ListenPopoverProps) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const menuId = useId();
	const lenis = useLenis();

	const close = useCallback(() => setOpen(false), []);

	useEffect(() => {
		if (!open) return;

		function handleClickOutside(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				close();
			}
		}

		function handleEscape(e: KeyboardEvent) {
			if (e.key === "Escape") {
				close();
				buttonRef.current?.focus();
			}
		}

		menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open, close]);

	function handleMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		const items = Array.from(
			e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'),
		);
		const index = items.indexOf(document.activeElement as HTMLElement);
		const last = items.length - 1;
		let next: number;

		switch (e.key) {
			case "ArrowDown":
				next = index === last ? 0 : index + 1;
				break;
			case "ArrowUp":
				next = index <= 0 ? last : index - 1;
				break;
			case "Home":
				next = 0;
				break;
			case "End":
				next = last;
				break;
			case "Tab":
				close();
				return;
			default:
				return;
		}

		e.preventDefault();
		items[next]?.focus();
	}

	return (
		<div ref={containerRef} className="relative inline-block">
			<button
				ref={buttonRef}
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={open ? menuId : undefined}
				className={
					size === "compact"
						? "flex h-[42px] w-[144px] items-center gap-2 rounded-full border border-ivory px-4 transition-colors hover:bg-ivory/10"
						: "flex h-[48px] w-[180px] items-center gap-3 rounded-full border border-ivory px-5 transition-colors hover:bg-ivory/10"
				}
			>
				<Play
					size={size === "compact" ? 14 : 16}
					className={
						size === "compact"
							? "fill-yellow text-yellow"
							: "fill-ivory text-ivory"
					}
				/>
				<span
					className={
						size === "compact"
							? "font-body text-[10px] font-bold tracking-[1.1px] text-ivory"
							: "font-body text-[10px] font-bold tracking-[1.5px] text-ivory"
					}
				>
					LISTEN NOW
				</span>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						ref={menuRef}
						id={menuId}
						role="menu"
						aria-label="Listen options"
						onKeyDown={handleMenuKeyDown}
						initial={{ opacity: 0, y: direction === "down" ? -8 : 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: direction === "down" ? -8 : 8 }}
						transition={{ duration: 0.15 }}
						className={`absolute left-0 w-[200px] overflow-hidden rounded-xl border border-lavender/20 bg-[#1a1630] shadow-lg ${
							direction === "down" ? "top-full mt-2" : "bottom-full mb-2"
						}`}
					>
						{LISTEN_OPTIONS.map((option) => (
							<a
								key={option.label}
								href={option.href}
								role="menuitem"
								tabIndex={-1}
								onClick={(e) => {
									if (!option.external) {
										e.preventDefault();
										scrollToSection(lenis, option.href);
									}
									close();
								}}
								{...(option.external
									? { target: "_blank", rel: "noopener noreferrer" }
									: {})}
								className="flex items-center gap-3 px-4 py-3 text-ivory transition-colors hover:bg-ivory/10"
							>
								<span className="text-turquoise">{option.icon}</span>
								<span className="font-body text-xs font-semibold tracking-wide">
									{option.label}
									{option.external && (
										<span className="sr-only"> (opens in a new tab)</span>
									)}
								</span>
							</a>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
