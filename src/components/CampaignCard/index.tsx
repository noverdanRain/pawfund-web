import { cn } from "@/lib/utils";
import Image from "next/image";
import { Progress } from "../ui/progress";
import { Goal, Heart } from "lucide-react";
import { TooltipWrapper } from "../TooltipWrapper";
import Link from "next/link";

interface CampaignCardProps {
	image: string;
	title: string;
	description: string;
	receivedAmount: number;
	targetAmount: number;
	donationCount: number;
	endDate: string;
	fundraiserImage: string;
	address: string;
}

export default function CampaignCard(props: CampaignCardProps) {
	const receivedPercentage = () => {
		const percentage = (props.receivedAmount / props.targetAmount) * 100;
		return percentage.toPrecision(2);
	};
	return (
		<Link href={`/${props.address}`}>
			<div className="group min-w-60 cursor-pointer rounded-2xl p-2 transition-all">
				<div className="relative mx-auto aspect-[16/10] w-full overflow-clip rounded-2xl bg-gray-200">
					<Image
						src={props.image}
						alt="Card Image"
						width={512}
						height={512}
						className="h-full w-full bg-gray-200 object-cover transition-all group-hover:scale-110 group-hover:saturate-100 md:saturate-0"
					/>
					<>
						{/* Clipping Shape Seny */}
						<div className={"bg-background absolute bottom-0 left-0 size-14 rounded-tr-4xl"} />
						<div
							className={cn(
								"absolute bottom-14 left-0 z-10 size-7 rounded-bl-4xl bg-transparent shadow-[-3px_3px_var(--color-background)]",
								`before:bg-background before:absolute before:bottom-0 before:-left-0.5 before:h-3 before:w-2 before:-rotate-[20deg] before:content-[""]`,
								`after:bg-background after:absolute after:-bottom-0.5 after:left-0.5 after:h-1.5 after:w-2.5 after:content-[""]`,
							)}
						/>
						<div
							className={cn(
								"absolute bottom-0 left-14 z-10 size-7 rounded-bl-4xl bg-transparent shadow-[-3px_3px_var(--color-background)]",
								`before:bg-background before:absolute before:bottom-0 before:-left-0.5 before:h-3 before:w-2 before:-rotate-[20deg] before:content-[""]`,
								`after:bg-background after:absolute after:-bottom-0.5 after:left-0.5 after:h-1.5 after:w-2.5 after:content-[""]`,
							)}
						/>
					</>
					<Image
						src={props.fundraiserImage}
						width={44}
						height={44}
						alt="Fundraiser"
						className="absolute bottom-0 left-0 size-11 rounded-full bg-gray-200"
					/>
					<div className="absolute top-2 right-2 rounded-full bg-white/20 px-3 py-2 text-xs font-medium backdrop-blur-sm">
						28 Days Left
					</div>
				</div>
				<TooltipWrapper
					delayDuration={600}
					side="bottom"
					sideOffset={-1}
					content="Provide 1,000 Nutritious Meals for Stray Animals and Rescue Operations in Need"
				>
					<h6 className="mt-2 line-clamp-2 text-lg font-medium">{props.title}</h6>
				</TooltipWrapper>
				<p className="text- mt-1 line-clamp-2">{props.description}</p>
				<p className="mt-2 text-sm font-medium">{props.receivedAmount} ETH Raised</p>
				<div className="flex gap-2">
					<Progress
						value={Number(receivedPercentage())}
						className="mt-1.5 h-1.5 bg-gray-200"
						indicatorClassName="bg-green-600"
					/>
					<p className="text-xs font-medium">{receivedPercentage()}%</p>
				</div>
				<div className="mt-2 flex items-center gap-3">
					<div className="flex items-center gap-1.5">
						<Heart size={15} strokeWidth={2.1} />
						<p className="text-sm">{props.donationCount} Donation</p>
					</div>
					<div className="flex items-center gap-1.5">
						<Goal size={15} strokeWidth={2} />
						<p className="text-sm">{props.targetAmount} ETH Goal</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
