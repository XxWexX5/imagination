import { motion } from "motion/react";

const viewport = { once: true, amount: 0.3 };

export function About() {
	return (
		<section
			id="about"
			className="relative scroll-mt-[66px] overflow-hidden bg-navy"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-1/2 -right-1/4 -bottom-1/2 -left-1/4"
				style={{
					background:
						"radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,116,56,0.16) 0%, transparent 100%)",
				}}
			/>

			<div className="relative mx-auto max-w-[1440px] px-6 pt-32 pb-20 md:px-16 lg:px-[84px]">
				<motion.p
					className="font-body text-[10px] font-bold tracking-[2.8px] text-turquoise"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewport}
				>
					04 / ABOUT THE ESCAPE
				</motion.p>

				<motion.h2
					className="mt-20 max-w-[900px] font-display text-4xl leading-[0.95] font-bold text-ivory lg:text-[66px]"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewport}
				>
					REAL PLACES LIVE IN
					<br />
					YOUR IMAGINATION
				</motion.h2>

				<motion.p
					className="mt-12 max-w-[600px] font-body text-base leading-relaxed text-lavender"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewport}
					transition={{ delay: 0.1 }}
				>
					Imagination is an invitation to escape the ordinary, explore the
					unknown, and discover the extraordinary worlds that live within us.
				</motion.p>

				<hr className="mt-20 border-t border-lavender/30" />

				<motion.footer
					className="mt-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={viewport}
					transition={{ delay: 0.15 }}
				>
					<div>
						<p className="font-body text-[10px] font-bold tracking-[1.3px] text-ivory">
							FOSTER THE PEOPLE
						</p>
						<p className="mt-1 font-body text-[9px] font-medium tracking-[1px] text-lavender">
							INDEPENDENT FAN-MADE CONCEPT
						</p>
					</div>
					<span className="font-display text-[22px] font-bold text-yellow">
						IMAGINATION
					</span>
				</motion.footer>
			</div>
		</section>
	);
}
