import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react(), tailwindcss(), svgr()],
	preview: {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	},
	build: {
		assetsInlineLimit: 0,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.test.{ts,tsx}"],
	},
});
