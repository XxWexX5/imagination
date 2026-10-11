import { Menu, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const NAV_LINKS = [
	{ label: "HOME", href: "#home" },
	{ label: "ALBUM", href: "#album" },
	{ label: "TRACKS", href: "#tracks" },
	{ label: "ARTWORK", href: "#artwork" },
	{ label: "ABOUT", href: "#about" },
] as const;

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeLink, setActiveLink] = useState("#home");

	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const closeMobile = useCallback(() => setMobileOpen(false), []);

	const handleLinkClick = useCallback(
		(href: string) => {
			setActiveLink(href);
			closeMobile();
		},
		[closeMobile],
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
								onClick={() => handleLinkClick(link.href)}
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
					<a
						href="#listen"
						className="flex h-[42px] w-[144px] items-center gap-2 rounded-full border border-ivory px-4 transition-colors hover:bg-ivory/10"
					>
						<Play size={14} className="fill-yellow text-yellow" />
						<span className="font-body text-[10px] font-bold tracking-[1.1px] text-ivory">
							LISTEN NOW
						</span>
					</a>

					<button
						type="button"
						className="text-ivory md:hidden"
						onClick={() => setMobileOpen((prev) => !prev)}
						aria-expanded={mobileOpen}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
					>
						{mobileOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</nav>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
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
										onClick={() => handleLinkClick(link.href)}
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
