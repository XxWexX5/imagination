import { Header } from "./components/Header/index.tsx";
import { Album } from "./pages/Album/index.tsx";
import { Home } from "./pages/Home/index.tsx";

export function App() {
	return (
		<>
			<Header />
			<main className="pt-[66px]">
				<Home />
				<Album />
			</main>
		</>
	);
}
