import type Lenis from "lenis";

export const HEADER_HEIGHT = 66;

export function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToSection(lenis: Lenis | undefined, href: string): void {
	const target = document.querySelector<HTMLElement>(href);

	lenis?.scrollTo(href, {
		offset: -HEADER_HEIGHT,
		immediate: prefersReducedMotion(),
	});

	if (target) {
		target.tabIndex = -1;
		target.focus({ preventScroll: true });
	}
}
