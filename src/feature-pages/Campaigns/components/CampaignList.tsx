"use client";

import { trpc } from "@/app/_trpc/client";
import CampaignCard from "@/components/CampaignCard";

export default function CampaignList() {
	// const { data: campaigns } = trpc.campaignsRouter.getCampaigns.useQuery({});
	// console.log({ campaigns });

	return (
		<div className="mt-4 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:grid-cols-4">
			{Array.from({ length: 12 }).map((_, idx) => (
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
					address={"0x1234567890abcdef1234567890abcdef12345678"}
				/>
			))}
		</div>
	);
}
