import { useEffect } from "react";
import { prefetchOnIdle } from "./preload-images.ts";

export function usePreloadImages(sources: string[]): void {
	useEffect(() => {
		prefetchOnIdle(sources);
	}, [sources]);
}
