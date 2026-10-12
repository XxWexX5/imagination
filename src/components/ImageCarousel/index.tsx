import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { prefersReducedMotion } from "../../lib/scroll-to-section.ts";

interface CarouselImage {
	src: string;
	alt: string;
}

interface ImageCarouselProps {
	images: CarouselImage[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true },
		prefersReducedMotion()
			? []
			: [
					Autoplay({
						delay: 4000,
						stopOnInteraction: true,
						stopOnMouseEnter: true,
						stopOnFocusIn: true,
					}),
				],
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on("select", onSelect);
		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi, onSelect]);

	const scrollTo = useCallback(
		(index: number) => {
			emblaApi?.scrollTo(index);
		},
		[emblaApi],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				emblaApi?.scrollPrev();
			} else if (e.key === "ArrowRight") {
				emblaApi?.scrollNext();
			}
		},
		[emblaApi],
	);

	return (
		<section
			aria-label="Album artwork carousel"
			aria-roledescription="carousel"
			onKeyDown={handleKeyDown}
			className="ml-auto w-full max-w-[420px]"
		>
			<div ref={emblaRef} className="overflow-hidden rounded-lg">
				<div className="flex">
					{images.map((image, index) => (
						<fieldset
							key={image.src}
							className="min-w-0 flex-[0_0_100%] border-none p-0"
							aria-roledescription="slide"
							aria-label={`Slide ${index + 1} of ${images.length}`}
						>
							<div className="aspect-[7/8]">
								<AnimatePresence mode="wait">
									<motion.img
										key={image.src}
										src={image.src}
										alt={image.alt}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="h-full w-full object-cover"
									/>
								</AnimatePresence>
							</div>
						</fieldset>
					))}
				</div>
			</div>

			<div
				className="mt-3 flex justify-center gap-2"
				role="tablist"
				aria-label="Select artwork"
			>
				{images.map((image, index) => (
					<button
						key={image.src}
						type="button"
						role="tab"
						aria-selected={index === selectedIndex}
						aria-label={`Show artwork ${index + 1}`}
						onClick={() => scrollTo(index)}
						className={`overflow-hidden rounded border-2 transition-all ${
							index === selectedIndex
								? "border-turquoise opacity-100"
								: "border-transparent opacity-50 hover:opacity-75"
						}`}
					>
						<img
							src={image.src}
							alt=""
							loading="lazy"
							className="aspect-[7/8] h-[56px] object-cover"
						/>
					</button>
				))}
			</div>
		</section>
	);
}
