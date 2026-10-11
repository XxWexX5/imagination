import { motion } from "motion/react";
import ImaginationSvg from "../../assets/imagination.svg?react";
import { ListenPopover } from "../../components/ListenPopover/index.tsx";
import "./hero-animation.css";

export function Home() {
	return (
		<section
			id="home"
			className="relative min-h-dvh overflow-hidden bg-[#120E1F]"
		>
			<div className="mx-auto flex h-dvh max-w-[1440px] items-center px-6 md:px-16 lg:px-[84px]">
				<div className="relative z-10 flex max-w-[620px] flex-col gap-8">
					<motion.span
						className="font-body text-[11px] font-bold tracking-[2.8px] text-turquoise"
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
					>
						FOSTER THE PEOPLE / 2019
					</motion.span>

					<motion.h1
						className="font-display text-5xl leading-[0.94] font-bold tracking-[0.6px] text-ivory md:text-7xl lg:text-[76px]"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						IMAGINATION
					</motion.h1>

					<motion.p
						className="font-body text-[13px] leading-[1.5] font-semibold tracking-[1.8px] text-yellow md:text-[15px]"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.35 }}
					>
						REAL PLACES LIVE IN
						<br />
						YOUR IMAGINATION
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
					>
						<ListenPopover />
					</motion.div>
				</div>

				<div className="pointer-events-none absolute inset-0 flex items-center justify-center md:pointer-events-auto md:relative md:flex-1 md:justify-center">
					<div className="container-animation opacity-20 md:opacity-100">
						<ImaginationSvg aria-hidden="true" />
					</div>
				</div>
			</div>

			<motion.span
				className="absolute bottom-8 left-6 font-body text-[9px] font-semibold tracking-[2px] text-lavender md:left-[84px]"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
			>
				SCROLL TO EXPLORE &nbsp;&nbsp; ↓
			</motion.span>
		</section>
	);
}
