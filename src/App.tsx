import { useMemo } from "react";
import comingAge from "./assets/images/coming-age.webp";
import foster from "./assets/images/foster.webp";
import fosterThePeople from "./assets/images/foster-the-people.webp";
import hug from "./assets/images/hug.webp";
import people from "./assets/images/people.webp";
import sometimes from "./assets/images/sometimes.webp";
import supermodel from "./assets/images/supermodel.webp";
import torches from "./assets/images/torches.webp";
import { Header } from "./components/Header/index.tsx";
import { MusicToggle } from "./components/MusicToggle/index.tsx";
import { usePreloadImages } from "./lib/use-preload-images.ts";
import { About } from "./pages/About/index.tsx";
import { Album } from "./pages/Album/index.tsx";
import { Home } from "./pages/Home/index.tsx";
import { Tracks } from "./pages/Tracks/index.tsx";
import { VisualUniverse } from "./pages/VisualUniverse/index.tsx";

const allImages = [
	fosterThePeople,
	comingAge,
	supermodel,
	torches,
	foster,
	hug,
	people,
	sometimes,
];

export function App() {
	usePreloadImages(useMemo(() => allImages, []));

	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ivory focus:px-5 focus:py-3 focus:font-body focus:text-xs focus:font-bold focus:tracking-[1.2px] focus:text-navy"
			>
				SKIP TO MAIN CONTENT
			</a>
			<Header />
			<MusicToggle />
			<main id="main" tabIndex={-1} className="pt-[66px]">
				<Home />
				<Album />
				<Tracks />
				<VisualUniverse />
				<About />
			</main>
		</>
	);
}
