import { PawCircular } from "@/assets/icons/PawCircular";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";

export default function OverviewSection() {
	return (
		<section className="my-24 flex flex-col items-center">
			<div className="flex items-center justify-center gap-6">
				<PawCircular className="size-10" bgColor="#E5E7EB" fgColor="#9CA3AF" />
				<PawCircular bgColor="#E5E7EB" className="size-14" fgColor="#9CA3AF" />
				<PawCircular className="size-16" />
				<PawCircular bgColor="#E5E7EB" className="size-14" fgColor="#9CA3AF" />
				<PawCircular className="size-10" bgColor="#E5E7EB" fgColor="#9CA3AF" />
			</div>
			<h3 className="font-display mt-6 max-w-2xl text-center text-4xl">
				Find a campaign, make an impact, and change lives today!
			</h3>
			<div className="mt-8 grid grid-cols-1 gap-0.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 8 }).map((_, idx) => (
					<CampaignCard
						image="/placeholder-img.png"
						title="Provide 1,000 Nutritious Meals for Stray Animals and Rescue Operations in Need"
						description="Every year, thousands of stray cats are born into suffering. Spaying and the sterilization
				of these animals is crucial to reducing the population and preventing future suffering."
						receivedAmount={0.0134}
						targetAmount={1}
						donationCount={100}
						endDate="2024-12-31"
						fundraiserImage="/placeholder-logo.svg"
						key={idx}
						address="0x000"
					/>
				))}
			</div>
			<Button variant={"mono"} size={"lg"} className="mx-auto mt-8 px-6" shape={"circle"}>
				Find Other Campaign
			</Button>
		</section>
	);
}
