import { Header } from "./components/Header/index.tsx";
import { MusicToggle } from "./components/MusicToggle/index.tsx";
import { Album } from "./pages/Album/index.tsx";
import { Home } from "./pages/Home/index.tsx";
import { Tracks } from "./pages/Tracks/index.tsx";

export function App() {
	return (
		<>
			<Header />
			<main className="pt-[66px]">
				<Home />
				<Album />
				<Tracks />
			</main>
			<MusicToggle />
		</>
	);
}
