import { motion } from "motion/react";
import comingAgeSrc from "../../assets/images/coming-age.webp";
import fosterSrc from "../../assets/images/foster.webp";
import fosterThePeopleSrc from "../../assets/images/foster-the-people.webp";
import hugSrc from "../../assets/images/hug.webp";
import peopleSrc from "../../assets/images/people.webp";
import sometimesSrc from "../../assets/images/sometimes.webp";
import supermodelSrc from "../../assets/images/supermodel.webp";
import torchesSrc from "../../assets/images/torches.webp";

const artworks = [
	{ src: fosterSrc, alt: "Pumped Up Kicks single artwork", aspect: "1/1" },
	{ src: comingAgeSrc, alt: "Coming of Age artwork", aspect: "9/16" },
	{ src: peopleSrc, alt: "Call It What You Want artwork", aspect: "1/1" },
	{ src: sometimesSrc, alt: "Sometimes character illustration", aspect: "4/5" },
	{ src: supermodelSrc, alt: "Supermodel album artwork", aspect: "1/1" },
	{ src: hugSrc, alt: "Ruby single artwork", aspect: "1/1" },
	{ src: torchesSrc, alt: "Torches album artwork", aspect: "1/1" },
	{ src: fosterThePeopleSrc, alt: "Foster the People collage", aspect: "2/3" },
];

const viewport = { once: true, amount: 0.2 };

export function VisualUniverse() {
	return (
		<section id="artwork" className="scroll-mt-[66px] bg-navy">
			<div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-20 md:px-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10 lg:px-[84px]">
				<motion.div
					className="flex flex-col items-start"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewport}
				>
					<span
						aria-hidden="true"
						className="font-display text-[84px] leading-none font-bold text-orange lg:text-[110px]"
					>
						03
					</span>
					<p className="mt-1 font-body text-[10px] font-bold tracking-[2.8px] text-turquoise">
						THE VISUAL UNIVERSE
					</p>
					<h2 className="mt-8 max-w-[460px] font-display text-4xl leading-[0.95] font-bold text-ivory lg:text-[48px]">
						EVERYTHING
						<br />
						IS A LANDSCAPE
					</h2>
				</motion.div>

				<div className="columns-2 gap-4 md:columns-3">
					{artworks.map((art, i) => (
						<motion.div
							key={art.alt}
							className="mb-4 break-inside-avoid"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={viewport}
							transition={{ delay: i * 0.08 }}
						>
							<img
								src={art.src}
								alt={art.alt}
								className="w-full rounded-sm object-cover"
								style={{ aspectRatio: art.aspect }}
								loading="lazy"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
