import { Music, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import imaginationSrc from "../../assets/audio/Imagination.mp3";
import { claimAudio, releaseAudio } from "../../lib/audio-lock.ts";

export function MusicToggle() {
	const [playing, setPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const hasStarted = useRef(false);
	const stopRef = useRef<() => void>(() => {});

	useEffect(() => {
		const audio = new Audio(imaginationSrc);
		audioRef.current = audio;

		const stop = () => {
			audio.pause();
			setPlaying(false);
		};
		stopRef.current = stop;

		audio.addEventListener("ended", () => {
			releaseAudio(stop);
			setPlaying(false);
		});

		const tryPlay = () => {
			if (hasStarted.current) return;
			hasStarted.current = true;
			claimAudio(stop);
			audio.play().then(
				() => setPlaying(true),
				() => {
					hasStarted.current = false;
					releaseAudio(stop);
				},
			);
		};

		tryPlay();

		if (!hasStarted.current) {
			const events = ["click", "scroll", "keydown", "touchstart"] as const;
			const onInteraction = () => {
				tryPlay();
				for (const e of events) document.removeEventListener(e, onInteraction);
			};
			for (const e of events)
				document.addEventListener(e, onInteraction, { once: true });

			return () => {
				for (const e of events) document.removeEventListener(e, onInteraction);
				audio.pause();
				audio.removeAttribute("src");
			};
		}

		return () => {
			audio.pause();
			audio.removeAttribute("src");
		};
	}, []);

	const toggle = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (playing) {
			audio.pause();
			releaseAudio(stopRef.current);
			setPlaying(false);
		} else {
			audio.currentTime = 0;
			claimAudio(stopRef.current);
			audio.play().then(
				() => setPlaying(true),
				() => {
					releaseAudio(stopRef.current);
					setPlaying(false);
				},
			);
		}
	}, [playing]);

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={playing ? "Mute background music" : "Play background music"}
			className="fixed right-6 bottom-6 z-50 flex size-12 items-center justify-center rounded-full border border-lavender/40 bg-navy/80 text-ivory backdrop-blur-sm transition-colors hover:border-turquoise hover:text-turquoise"
		>
			{playing ? <Music className="size-5" /> : <VolumeX className="size-5" />}
		</button>
	);
}
