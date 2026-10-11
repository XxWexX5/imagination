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
			<Header />
			<main className="pt-[66px]">
				<Home />
				<Album />
				<Tracks />
				<VisualUniverse />
			</main>
			<MusicToggle />
		</>
	);
}
