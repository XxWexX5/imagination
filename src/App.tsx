import { motion } from "motion/react";

export function App() {
	return (
		<main className="grid min-h-dvh place-items-center">
			<motion.h1
				className="font-bold text-6xl tracking-tight"
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
			>
				Imagination
			</motion.h1>

			<p>hello world!</p>
		</main>
	);
}
