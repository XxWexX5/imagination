import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import helenaBeatSrc from "../../assets/audio/Helena Beat.mp3";
import houdiniSrc from "../../assets/audio/Houdini.mp3";
import imaginationSrc from "../../assets/audio/Imagination.mp3";
import pumpedUpKicksSrc from "../../assets/audio/Pumped Up Kicks.mp3";
import styleSrc from "../../assets/audio/Style.mp3";
import type { Track } from "../../components/TrackRow/index.tsx";
import { TrackRow } from "../../components/TrackRow/index.tsx";
import { claimAudio, releaseAudio } from "../../lib/audio-lock.ts";

function formatDuration(seconds: number): string {
	const min = Math.floor(seconds / 60);
	const sec = Math.floor(seconds % 60);
	return `${min}:${String(sec).padStart(2, "0")}`;
}

const trackSources = [
	{ title: "HELENA BEAT", src: helenaBeatSrc },
	{ title: "HOUDINI", src: houdiniSrc },
	{ title: "IMAGINATION", src: imaginationSrc },
	{ title: "PUMPED UP KICKS", src: pumpedUpKicksSrc },
	{ title: "STYLE", src: styleSrc },
];

const viewport = { once: true, amount: 0.3 };

export function Tracks() {
	const [tracks, setTracks] = useState<Track[]>(() =>
		trackSources.map((t, i) => ({
			number: String(i + 1).padStart(2, "0"),
			title: t.title,
			duration: "--:--",
			src: t.src,
		})),
	);
	const [playingIndex, setPlayingIndex] = useState<number | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const stopRef = useRef<(() => void) | null>(null);

	useEffect(() => {
		for (const [i, source] of trackSources.entries()) {
			const audio = new Audio(source.src);
			audio.addEventListener("loadedmetadata", () => {
				setTracks((prev) =>
					prev.map((t, idx) =>
						idx === i ? { ...t, duration: formatDuration(audio.duration) } : t,
					),
				);
			});
		}
	}, []);

	const handleToggle = useCallback(
		(index: number) => {
			if (playingIndex === index) {
				audioRef.current?.pause();
				if (stopRef.current) releaseAudio(stopRef.current);
				stopRef.current = null;
				setPlayingIndex(null);
				return;
			}

			if (audioRef.current) {
				audioRef.current.pause();
			}

			const track = tracks[index];
			if (track?.src) {
				const audio = new Audio(track.src);
				const stop = () => {
					audio.pause();
					setPlayingIndex(null);
					stopRef.current = null;
				};
				stopRef.current = stop;
				claimAudio(stop);
				audio.addEventListener("ended", () => {
					releaseAudio(stop);
					stopRef.current = null;
					setPlayingIndex(null);
				});
				audio.play();
				audioRef.current = audio;
			}

			setPlayingIndex(index);
		},
		[playingIndex, tracks],
	);

	return (
		<section id="tracks" className="scroll-mt-[66px] bg-navy">
			<div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-20 md:px-16 lg:grid-cols-[minmax(0,1fr)_610px] lg:gap-10 lg:px-[84px]">
				<motion.div
					className="flex flex-col items-start"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewport}
				>
					<span
						aria-hidden="true"
						className="font-display text-[84px] leading-none font-bold text-yellow lg:text-[110px]"
					>
						02
					</span>
					<p className="mt-1 font-body text-[10px] font-bold tracking-[2.8px] text-turquoise">
						THE SOUNDTRACK
					</p>
					<h2 className="mt-8 max-w-[460px] font-display text-4xl leading-[0.95] font-bold text-ivory lg:text-[52px]">
						FIVE WAYS TO
						<br />
						GET LOST
					</h2>
					<p className="mt-16 font-body text-[9px] font-semibold tracking-[1.6px] text-lavender">
						A SIDEWAYS ROUTE THROUGH THE INNER WORLD
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewport}
					transition={{ delay: 0.15 }}
				>
					<ol aria-label="Tracklist" className="list-none">
						{tracks.map((track, index) => (
							<li key={track.number}>
								<TrackRow
									track={track}
									isPlaying={playingIndex === index}
									onToggle={() => handleToggle(index)}
								/>
							</li>
						))}
					</ol>
				</motion.div>
			</div>
		</section>
	);
}
