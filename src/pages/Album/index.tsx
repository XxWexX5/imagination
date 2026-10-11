import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import comingAge from "../../assets/images/coming-age.webp";
import fosterThePeople from "../../assets/images/foster-the-people.webp";
import supermodel from "../../assets/images/supermodel.webp";
import torches from "../../assets/images/torches.webp";
import { ImageCarousel } from "../../components/ImageCarousel/index.tsx";

const artworks = [
	{
		src: fosterThePeople,
		alt: "Foster the People band collage in red and blue tones",
	},
	{
		src: comingAge,
		alt: "Coming of Age single artwork with colorful creature under a crescent moon",
	},
	{
		src: supermodel,
		alt: "Supermodel album artwork with psychedelic figure and flowing text",
	},
	{
		src: torches,
		alt: "Torches album artwork with illustrated crowd of characters",
	},
];

const viewport = { once: true, amount: 0.3 };

export function Album() {
	return (
		<section id="album" className="scroll-mt-[66px] bg-[#08183B]">
			<div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-20 md:px-16 lg:grid-cols-[minmax(0,1fr)_502px] lg:gap-10 lg:px-[84px] lg:pr-[148px]">
				<motion.div
					className="flex flex-col items-start"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewport}
				>
					<span
						aria-hidden="true"
						className="font-display text-[84px] leading-none font-bold text-coral lg:text-[110px]"
					>
						01
					</span>
					<p className="mt-1 font-body text-[10px] font-bold tracking-[2.8px] text-turquoise">
						THE ALBUM
					</p>
					<h2 className="mt-8 max-w-[540px] font-display text-4xl leading-[0.98] font-bold text-ivory lg:text-5xl">
						A JOURNEY THROUGH
						<br />
						YOUR IMAGINATION
					</h2>
					<p className="mt-16 max-w-[370px] font-body text-[15px] leading-[1.6] text-lavender">
						Imagination takes you through a colorful landscape of feelings,
						dreams, and places that only exist inside your mind.
					</p>
					<a
						href="https://br.pinterest.com/search/pins/?q=foster%20the%20people%20art"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-12 inline-flex h-[46px] items-center gap-2 rounded-full border border-turquoise px-5 font-body text-[10px] font-bold tracking-[1.2px] text-turquoise transition-colors hover:bg-turquoise hover:text-navy lg:mt-32"
					>
						EXPLORE ARTWORK
						<ArrowUpRight aria-hidden="true" className="size-3" />
					</a>
				</motion.div>

				<motion.div
					className="flex items-center justify-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewport}
					transition={{ delay: 0.15 }}
				>
					<ImageCarousel images={artworks} />
				</motion.div>
			</div>
		</section>
	);
}
