import { PawCircular } from "@/assets/icons/PawCircular";
import CampaignCard from "@/components/common/CampaignCard";

export default function MoreCampaigns() {
	return (
		<>
			<div className="mt-6 flex items-center justify-center gap-6">
				<PawCircular className="size-8" bgColor="#E5E7EB" fgColor="#9CA3AF" />
				<PawCircular bgColor="#E5E7EB" className="size-12" fgColor="#9CA3AF" />
				<PawCircular className="size-14" />
				<PawCircular bgColor="#E5E7EB" className="size-12" fgColor="#9CA3AF" />
				<PawCircular className="size-8" bgColor="#E5E7EB" fgColor="#9CA3AF" />
			</div>
			<h6 className="mt-4 ml-2 text-2xl font-medium">
				More ways to make a difference. Find fundraisers inspired by what you care about.
			</h6>
			<div className="mt-2 mb-8 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, idx) => (
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
						address="0x0000000000000000000000000000000000000000"
					/>
				))}
			</div>
		</>
	);
}
