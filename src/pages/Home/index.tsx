import HeroSection from "./components/HeroSection";
import IntermezzoSection from "./components/IntermezzoSection";
import OverviewSection from "./components/OverviewSection";

export default function Home() {
	return (
		<main className="mx-auto w-[calc(100%-1.5rem)] max-w-6xl">
			<HeroSection />
			<IntermezzoSection />
			<OverviewSection />
		</main>
	);
}
