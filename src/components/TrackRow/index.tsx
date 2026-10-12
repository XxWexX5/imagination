import { Pause, Play } from "lucide-react";

export interface Track {
	number: string;
	title: string;
	duration: string;
	src?: string;
}

interface TrackRowProps {
	track: Track;
	isPlaying: boolean;
	onToggle: () => void;
}

export function TrackRow({ track, isPlaying, onToggle }: TrackRowProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="group flex w-full items-center border-b border-lavender/30 px-5 py-6 text-left transition-colors hover:bg-white/5"
		>
			<span className="sr-only">{isPlaying ? "Pause" : "Play"} track </span>
			<span className="w-[60px] shrink-0 font-body text-[10px] font-semibold tracking-[1.3px] text-lavender">
				{track.number}
			</span>

			<span className="flex flex-1 items-center gap-3">
				<span
					className={`flex size-8 items-center justify-center rounded-full border transition-colors ${
						isPlaying
							? "border-turquoise text-turquoise"
							: "border-lavender/50 text-lavender group-hover:border-ivory group-hover:text-ivory"
					}`}
				>
					{isPlaying ? (
						<Pause className="size-3" />
					) : (
						<Play className="size-3 translate-x-[1px]" />
					)}
				</span>
				<span
					className={`font-body text-base font-medium tracking-[0.8px] ${
						isPlaying ? "text-turquoise" : "text-ivory"
					}`}
				>
					{track.title}
				</span>
			</span>

			<span className="font-body text-[10px] font-normal tracking-[1px] text-lavender">
				{track.duration}
			</span>
		</button>
	);
}
