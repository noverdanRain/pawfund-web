import { ArrowDownShape } from "@/assets/icons/ArrowDownShape";
import { FlowerShape } from "@/assets/icons/FlowerShape";
import { FluentEmojiFlatGrinningCatWithSmilingEyes } from "@/assets/icons/GrinningCat";
import { HopeShape } from "@/assets/icons/HopeShape";
import { FluentEmojiFlatKissingCat } from "@/assets/icons/KissingCat";
import { PawHandShape } from "@/assets/icons/PawHandShape";
import { PortalShape } from "@/assets/icons/PortalShape";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PawCircPersp from "../assets/paw-circular-perspective.png";
import PawCircPersp2 from "../assets/paw-circular-perspective-2.png";

const HeroSection = () => {
	return (
		<>
			<section className="relative mx-auto mt-4 flex h-[calc(100svh-4rem)] min-h-[600px] w-[calc(100%-1.5rem)] max-w-6xl flex-col items-center justify-between gap-4 overflow-clip rounded-[40px] bg-gray-100 px-8 py-20">
				<FlowerShape className="absolute bottom-40 -left-20 sm:bottom-4" />
				<FlowerShape className="absolute -right-20 bottom-96 scale-x-[-1] sm:bottom-4" />

				<FluentEmojiFlatKissingCat className="absolute top-28 right-[78%] size-12 rotate-12 sm:top-40 sm:right-[86%] sm:size-16" />
				<PawHandShape className="absolute right-[65%] -bottom-72 sm:right-[70%] sm:-bottom-56 lg:-bottom-40" />
				<PawHandShape className="absolute -bottom-72 left-[65%] scale-x-[-1] sm:-bottom-56 sm:left-[70%] lg:-bottom-40" />
				<FluentEmojiFlatGrinningCatWithSmilingEyes className="absolute top-[332px] left-[80%] size-11 -rotate-16 sm:top-[300px] sm:left-[88%] sm:size-16" />

				<Image
					src={PawCircPersp.src}
					alt="Paw Circular Perspective"
					className="absolute top-[324px] right-[80%] size-10 sm:top-72 sm:right-[72%]"
					width={100}
					height={100}
				/>
				<Image
					src={PawCircPersp2.src}
					alt="Paw Circular Perspective"
					className="absolute top-28 left-[76%] size-12"
					width={100}
					height={100}
				/>

				<h1 className="font-display relative z-10 mt-5 max-w-xl text-center text-6xl leading-20 sm:mt-10 sm:text-7xl">
					They <br className="sm:hidden" /> Need Your Helping Hand!
					<PortalShape className="absolute right-4 bottom-32 size-6 sm:bottom-0" />
					<HopeShape className="absolute top-0 -left-6 hidden size-7 sm:block" />
				</h1>
				<p className="z-10 mb-6 max-w-lg text-center text-lg font-medium">
					Help stray cats and animals get a better life. Every donation brings new hope!
				</p>
				<Button
					className="z-10 mb-32 bg-blue-600 px-7 py-6 text-lg font-medium hover:bg-blue-600/90 sm:mb-0"
					size={"lg"}
					shape={"circle"}
				>
					Donate Now
				</Button>
			</section>
			<ArrowDownShape className="absolute left-1/2 z-10 -mt-6 -translate-x-1/2 transform" />
		</>
	);
};

export default HeroSection;
