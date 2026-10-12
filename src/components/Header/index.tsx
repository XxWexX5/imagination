import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { HEADER_HEIGHT, scrollToSection } from "../../lib/scroll-to-section.ts";
import { useActiveSection } from "../../lib/use-active-section.ts";
import { ListenPopover } from "../ListenPopover/index.tsx";

const NAV_LINKS = [
	{ label: "HOME", href: "#home" },
	{ label: "ALBUM", href: "#album" },
	{ label: "TRACKS", href: "#tracks" },
	{ label: "ARTWORK", href: "#artwork" },
	{ label: "ABOUT", href: "#about" },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const activeLink = `#${useActiveSection(SECTION_IDS, HEADER_HEIGHT)}`;
	const lenis = useLenis();
	const menuButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const main = document.getElementById("main");
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		main?.toggleAttribute("inert", mobileOpen);

		if (!mobileOpen) return;

		function handleEscape(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setMobileOpen(false);
				menuButtonRef.current?.focus();
			}
		}

		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
			main?.removeAttribute("inert");
		};
	}, [mobileOpen]);

	const closeMobile = useCallback(() => setMobileOpen(false), []);

	const handleLinkClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
			e.preventDefault();
			closeMobile();
			scrollToSection(lenis, href);
		},
		[closeMobile, lenis],
	);

	return (
		<header className="fixed top-0 right-0 left-0 z-50 border-b border-lavender/20 bg-[#120E1F]">
			<nav
				className="mx-auto flex h-[66px] max-w-[1440px] items-center justify-between px-6 md:px-16 lg:px-[84px]"
				aria-label="Main navigation"
			>
				<a
					href="#home"
					className="font-body text-[12px] font-bold tracking-[2.4px] text-ivory transition-colors hover:text-turquoise"
				>
					FOSTER THE PEOPLE
				</a>

				<ul className="hidden items-center gap-16 md:flex">
					{NAV_LINKS.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								onClick={(e) => handleLinkClick(e, link.href)}
								aria-current={activeLink === link.href ? "location" : undefined}
								className={`relative font-body text-[10px] font-semibold tracking-[1.7px] transition-colors ${
									activeLink === link.href
										? "text-turquoise"
										: "text-ivory hover:text-turquoise"
								}`}
							>
								{link.label}
								{activeLink === link.href && (
									<span className="absolute -bottom-2 left-0 h-px w-[29px] bg-turquoise" />
								)}
							</a>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-4">
					<div className="hidden md:block">
						<ListenPopover direction="down" size="compact" />
					</div>

					<button
						ref={menuButtonRef}
						type="button"
						className="text-ivory md:hidden"
						onClick={() => setMobileOpen((prev) => !prev)}
						aria-expanded={mobileOpen}
						aria-controls="mobile-menu"
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
					>
						{mobileOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</nav>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						id="mobile-menu"
						className="fixed inset-0 top-[66px] z-40 bg-navy md:hidden"
						initial={{ opacity: 0, y: -16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -16 }}
						transition={{ duration: 0.2 }}
					>
						<ul className="flex flex-col items-center gap-10 pt-16">
							{NAV_LINKS.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										onClick={(e) => handleLinkClick(e, link.href)}
										aria-current={
											activeLink === link.href ? "location" : undefined
										}
										className={`font-body text-sm font-semibold tracking-[1.7px] transition-colors ${
											activeLink === link.href
												? "text-turquoise"
												: "text-ivory hover:text-turquoise"
										}`}
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
