import HeroSection from "@/features/home/components/HeroSection";
import IntermezzoSection from "@/features/home/components/IntermezzoSection";
import OverviewSection from "@/features/home/components/OverviewSection";

export default function Home() {
	return (
		<main className="mx-auto w-[calc(100%-1.5rem)] max-w-6xl">
			<HeroSection />
			<IntermezzoSection />
			<OverviewSection />
		</main>
	);
}
