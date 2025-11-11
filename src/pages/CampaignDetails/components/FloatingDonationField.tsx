import { Button } from "@/components/ui/button";
import { ProgressCircle } from "@/components/ui/progress";
import { Calendar, Goal, HandHeart, Heart, Share } from "lucide-react";
import InputDonationDialog from "./InputDonationDialog";

export default function FloatingDonationField() {
	return (
		<div className="sticky right-0 bottom-3 left-0 flex w-full flex-col justify-between gap-4 rounded-3xl border-2 border-gray-200 bg-gray-100 p-3 sm:flex-row sm:items-center sm:gap-10 lg:hidden">
			<div className="flex items-center gap-2">
				<ProgressCircle
					value={60}
					size={40}
					strokeWidth={6}
					className="text-emerald-500"
					indicatorClassName="text-emerald-500"
					trackClassName="text-gray-200"
				>
					<div className="text-center">
						<div className="text-foreground text-xs font-bold">{Math.round(54)}%</div>
					</div>
				</ProgressCircle>
				<div>
					<div className="flex items-center gap-2">
						<p className="font-bold">1.62 ETH Raised</p>
					</div>
					<div className="mt-2 flex gap-4">
						<div className="flex items-center gap-1.5">
							<Goal size={14} />
							<p className="text-xs font-medium text-nowrap">5 ETH Goal</p>
						</div>
						<div className="flex items-center gap-1.5">
							<Heart size={14} />
							<p className="text-xs font-medium text-nowrap">103 Donations</p>
						</div>
						<div className="flex items-center gap-1.5">
							<Calendar size={13} />
							<p className="text-xs font-medium text-nowrap">19 Days Left</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full gap-3">
				<Button
					variant={"secondary"}
					size={"lg"}
					className="h-10 bg-gray-200 px-8 shadow-none hover:bg-gray-200/80 sm:w-full sm:p-4"
					shape={"circle"}
				>
					<Share />
					Share
				</Button>
				<InputDonationDialog
					triggerButton={
						<Button size={"lg"} className="h-10 w-full" shape={"circle"}>
							<HandHeart />
							Donate
						</Button>
					}
				/>
			</div>
		</div>
	);
}
