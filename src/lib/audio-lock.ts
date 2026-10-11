type StopFn = () => void;

let currentStop: StopFn | null = null;

export function claimAudio(stop: StopFn): void {
	if (currentStop) currentStop();
	currentStop = stop;
}

export function releaseAudio(stop: StopFn): void {
	if (currentStop === stop) currentStop = null;
}
