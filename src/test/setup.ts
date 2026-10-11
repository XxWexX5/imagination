import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./msw/server.ts";

class IntersectionObserverStub implements IntersectionObserver {
	readonly root = null;
	readonly rootMargin = "";
	readonly scrollMargin = "";
	readonly thresholds = [];
	observe() {}
	unobserve() {}
	disconnect() {}
	takeRecords() {
		return [];
	}
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

class ResizeObserverStub implements ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

vi.stubGlobal("ResizeObserver", ResizeObserverStub);

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	}),
});

class AudioStub extends EventTarget {
	src = "";
	currentTime = 0;
	duration = 0;
	paused = true;
	play() {
		this.paused = false;
		return Promise.resolve();
	}
	pause() {
		this.paused = true;
	}
	load() {}
	removeAttribute() {}
	addEventListener(type: string, listener: EventListener) {
		super.addEventListener(type, listener);
		if (type === "loadedmetadata") {
			this.duration = 180;
			setTimeout(() => this.dispatchEvent(new Event("loadedmetadata")), 0);
		}
	}
}

vi.stubGlobal("Audio", AudioStub);

beforeAll(() => server.listen({ onUnhandledFrame: "error" }));

afterEach(() => {
	cleanup();
	server.resetHandlers();
});

afterAll(() => server.close());
