"use client";

import { PawCircular } from "@/assets/icons/PawCircular";
import { PawRawShape } from "@/assets/icons/PawRawShape";
import Image from "next/image";
import LendHand from "../assets/lend-hand.svg";
import SmileyCat from "../assets/smiley-cat.svg";
import AnimalRescue from "../assets/animal-rescue.svg";
import AnimalMeal from "../assets/animal-meal.svg";
import AnimalTreatment from "../assets/animal-treatment.png";
import { FlowerShape } from "@/assets/icons/FlowerShape";
import { Button } from "@/components/ui/button";

const IntermezzoSection = () => {
	return (
		<section className="flex flex-col items-center">
			<PawCircular className="mt-14 size-16" />
			<h3 className="font-display mt-3 text-4xl">Did You Know?</h3>
			<p className="mt-5 max-w-5xl text-center text-lg">{`Every year, millions of stray animals struggle to survive on the streets. Lack of food, disease, and abandonment make their lives incredibly difficult. Here's why your donation can make a life-changing difference.`}</p>

			<div className="mt-10 grid grid-cols-6 grid-rows-[auto_auto_auto_auto] gap-3">
				<div className="relative col-span-6 row-span-2 flex items-start overflow-clip rounded-4xl bg-gray-100 p-8 lg:col-span-3 lg:row-span-4">
					<div className="maxw z-10 lg:max-w-64">
						<h6 className="text-lg font-bold">The Hard Truth About Stray Animals</h6>
						<div className="mt-2 grid grid-cols-[auto_1fr] gap-2">
							<PawRawShape className="mt-1 size-4" />
							<p>70% of stray animals suffer from malnutrition & disease.</p>
							<PawRawShape className="mt-1 size-4" />
							<p>1 in 10 kittens survives their first year without help.</p>
							<PawRawShape className="mt-1 size-4" />
							<p>Every hour, hundreds of animals are abandoned.</p>
						</div>
					</div>
					<FlowerShape className="absolute -bottom-10 -left-10 z-0 size-28 rotate-[24deg]" />
					<Image
						className="absolute top-0 right-0 z-0 h-[calc(100%+0.5rem)] w-auto opacity-35 sm:opacity-100"
						src={LendHand.src}
						alt="Lend a Hand"
						width={300}
						height={300}
					/>
				</div>
				<div className="relative col-span-6 row-span-1 flex items-center gap-1 overflow-clip rounded-4xl bg-gray-100 p-8 lg:col-span-3 lg:row-span-3">
					<div className="z-10">
						<h6 className="text-lg font-bold">{"But There's Hope!"}</h6>
						<p className="mt-2">
							{
								"With Paw Fund, you can donate, sponsor meals, fund medical care, and giving them a second chance at life. Join us in making a difference!"
							}
						</p>
					</div>
					<Image
						src={SmileyCat.src}
						alt="Smiley Cat"
						width={300}
						height={300}
						className="size-24 sm:size-36"
					/>
					<FlowerShape className="absolute -right-10 -bottom-10 z-0 size-24" fill="#FECDD3" />
				</div>
				<div className="relative col-span-2 flex items-center justify-between gap-2 overflow-clip rounded-3xl bg-gray-100 p-4 sm:p-6 lg:col-span-1 lg:row-span-1">
					<div className="z-10">
						<h6 className="text-lg font-bold">5.5K+</h6>
						<p className="text-sm">Rescues</p>
					</div>
					<Image
						className="z-10 w-8 sm:w-10"
						src={AnimalRescue.src}
						alt="Animal Rescue"
						width={300}
						height={300}
					/>
					<FlowerShape className="absolute -top-5 -left-5 z-0 size-14" />
				</div>
				<div className="relative col-span-2 flex items-center justify-between gap-2 overflow-clip rounded-3xl bg-gray-100 p-4 sm:p-6 lg:col-span-1 lg:row-span-1">
					<div className="z-10">
						<h6 className="text-lg font-bold">50K+</h6>
						<p className="text-sm">Meals Served</p>
					</div>
					<Image
						className="z-10 w-6 sm:w-8"
						src={AnimalMeal.src}
						alt="Animal Meal"
						width={300}
						height={300}
					/>
					<FlowerShape className="absolute -top-5 -left-5 z-0 size-14" />
				</div>
				<div className="relative col-span-2 flex items-center justify-between gap-2 overflow-clip rounded-3xl bg-gray-100 p-4 sm:p-6 lg:col-span-1 lg:row-span-1">
					<div className="z-10 w-1/2 sm:w-auto">
						<h6 className="text-lg font-bold">10K+</h6>
						<p className="text-sm break-words">Treatments</p>
					</div>
					<Image
						className="z-10 w-9 sm:w-11"
						src={AnimalTreatment.src}
						alt="Animal Treatment"
						width={300}
						height={300}
					/>
					<FlowerShape className="absolute -top-5 -left-5 z-0 size-14" />
				</div>
			</div>

			<Button variant={"mono"} size={"lg"} className="mt-8 px-6" shape={"circle"}>
				Join Us & Be Their Hero
			</Button>
		</section>
	);
};

export default IntermezzoSection;
