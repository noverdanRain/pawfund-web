"use client";

import { EthereumRoundedIcon } from "@/assets/icons/EthereumRoundedIcon";
import { Button } from "@/components/ui/button";
import { Input, InputWrapper } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Calendar, Goal, HandHeart, Heart, Share } from "lucide-react";
import { useState } from "react";

export default function DonationField(props: React.HTMLAttributes<HTMLDivElement>) {
	const [donationAmount, setDonationAmount] = useState<string>();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Only allow numbers, one decimal point, and only one zero before decimal
		const regex = /^0(\.\d*)?$|^[1-9]\d*(\.\d*)?$|^$/;
		if (regex.test(value)) {
			setDonationAmount(value);
		}
	};
	const handleDonate = () => {
		alert(`Thank you for your donation of ${donationAmount} ETH!`);
		setDonationAmount("");
	};

	return (
		<div {...props} className="sticky top-28 w-full rounded-3xl bg-gray-100 p-6">
			<div className="flex items-center gap-2">
				<EthereumRoundedIcon fill="#3B82F6" className="size-6" />
				<p className="text-xl font-medium">1.62 ETH Raised</p>
			</div>
			<div className="mt-4 flex items-center gap-4">
				<Progress
					className="h-2.5 bg-gray-200"
					value={20}
					indicatorClassName="bg-green-500 rounded-full"
				/>
				<p className="font-medium">20%</p>
			</div>
			<div className="mt-2 flex gap-4">
				<div className="flex items-center gap-1.5">
					<Goal size={14} />
					<p className="text-sm font-medium text-nowrap">5 ETH Goal</p>
				</div>
				<div className="flex items-center gap-1.5">
					<Heart size={14} />
					<p className="text-sm font-medium text-nowrap">103 Donations</p>
				</div>
				<div className="flex items-center gap-1.5">
					<Calendar size={13} />
					<p className="text-sm font-medium text-nowrap">19 Days Left</p>
				</div>
			</div>
			<div className="mt-4">
				<Label htmlFor="input-donation" className="text-base font-medium">
					Enter your donation
				</Label>
				<div className="mt-2 grid grid-cols-4 gap-2">
					<ButtonSelectAmount
						amount="0.1"
						selected={donationAmount == "0.1"}
						onSelected={(amount) => setDonationAmount(amount)}
					/>
					<ButtonSelectAmount
						amount="0.2"
						selected={donationAmount == "0.2"}
						onSelected={(amount) => setDonationAmount(amount)}
					/>
					<ButtonSelectAmount
						amount="0.4"
						selected={donationAmount == "0.4"}
						onSelected={(amount) => setDonationAmount(amount)}
					/>
					<ButtonSelectAmount
						amount="0.5"
						selected={donationAmount == "0.5"}
						onSelected={(amount) => setDonationAmount(amount)}
					/>
				</div>
				<InputWrapper className="mt-3 h-12 gap-2 rounded-full border-gray-300 bg-transparent px-4 shadow-none">
					<EthereumRoundedIcon fill="#424242" />
					<Input
						id="input-donation"
						type="text"
						inputMode="decimal"
						placeholder="0.00"
						variant={"lg"}
						value={donationAmount}
						onChange={handleInputChange}
					/>
				</InputWrapper>
			</div>
			<Button onClick={handleDonate} size={"lg"} className="mt-4 h-12 w-full" shape={"circle"}>
				<HandHeart />
				Donate
			</Button>
			<Button
				variant={"secondary"}
				size={"lg"}
				className="mt-2 h-12 w-full bg-gray-200 shadow-none hover:bg-gray-200/80"
				shape={"circle"}
			>
				<Share />
				Share
			</Button>
		</div>
	);
}

function ButtonSelectAmount(
	props: {
		amount: string;
		selected?: boolean;
		onSelected?: (amount: string) => void;
	} & React.HTMLAttributes<HTMLButtonElement>,
) {
	const { amount, selected, onSelected, ...restProps } = props;
	return (
		<Button
			variant={"outline"}
			shape={"circle"}
			className={cn(
				"w-full border-gray-300 bg-transparent px-4 shadow-none hover:bg-gray-200/50",
				selected && "ring-2 ring-gray-300",
			)}
			onClick={() => onSelected?.(amount)}
			{...restProps}
		>
			{amount} ETH
		</Button>
	);
}
