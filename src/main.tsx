import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { prefersReducedMotion } from "./lib/scroll-to-section.ts";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element #root not found");
}

createRoot(root).render(
	<StrictMode>
		<MotionConfig reducedMotion="user">
			<ReactLenis root options={{ smoothWheel: !prefersReducedMotion() }}>
				<App />
			</ReactLenis>
		</MotionConfig>
	</StrictMode>,
);
