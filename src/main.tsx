import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactLenis } from "lenis/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { createQueryClient } from "./lib/query-client.ts";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element #root not found");
}

const queryClient = createQueryClient();

createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactLenis root />
			<App />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</StrictMode>,
);
