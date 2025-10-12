import HeroSection from "@/features/home/components/HeroSection";
import IntermezzoSection from "@/features/home/components/IntermezzoSection";

export default function Home() {
	return (
		<main className="mx-auto w-[calc(100%-1.5rem)] max-w-6xl">
			<HeroSection />
			<IntermezzoSection />
			<div className="h-96 w-full" />
		</main>
	);
}
