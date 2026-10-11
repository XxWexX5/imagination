const cache = new Set<string>();

export function preloadImage(src: string): Promise<undefined> {
	if (cache.has(src)) return Promise.resolve(undefined);

	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			cache.add(src);
			resolve(undefined);
		};
		img.onerror = () => resolve(undefined);
		img.src = src;
	});
}

export function preloadImages(sources: string[]): Promise<undefined[]> {
	return Promise.all(sources.map(preloadImage));
}

export function prefetchOnIdle(sources: string[]): void {
	const load = () => {
		preloadImages(sources);
	};

	if ("requestIdleCallback" in window) {
		requestIdleCallback(load, { timeout: 3000 });
	} else {
		setTimeout(load, 200);
	}
}
