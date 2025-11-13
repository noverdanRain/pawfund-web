// import { use } from "react";
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Flag, Telescope } from "lucide-react";
import Link from "next/link";
import Fundraiser from "./components/Fundraiser";
import CampaignStory from "./components/CampaignStory";
import Donors from "./components/Donors";
import CampaignImage from "./components/CampaignImage";
import MoreCampaigns from "./components/MoreCampaigns";
import DonationField from "./components/DonationField";
import { formatAddress } from "@/lib/utils";
import FloatingDonationField from "./components/FloatingDonationField";
import { useAtomValue } from "jotai";
import { authedUserAtom } from "@/atom/auth";

export default function CampaignDetails(props: { campaignId: string }) {
	const { campaignId } = props;
	const authedUser = useAtomValue(authedUserAtom);
	console.log({ authedUser });

	return (
		<main className="mx-auto mt-28 min-h-[calc(100dvh-7rem)] w-[calc(100%-1.5rem)] max-w-6xl">
			<h1 className="text-2xl font-semibold">Spay & Neuter Stray Cats to Prevent Overpopulation</h1>
			<div className="relative flex flex-col gap-6 lg:flex-row">
				<div className="mt-6 flex-2 space-y-2">
					<p className="text-sm text-gray-500">Created at 10 April 2025</p>

					<CampaignImage isLoading={false} imageUrl="/placeholder-img.png" />

					<div className="mt-4 flex items-center justify-between">
						<p className="text-sm text-gray-500 sm:hidden">
							{formatAddress("0xf436a2443eb5Dc420C2405399f42914A0DbD8AAA")}
						</p>
						<p className="hidden text-sm text-gray-500 sm:block">
							0xf436a2443eb5Dc420C2405399f42914A0DbD8AAA
						</p>
						<Link
							target="_blank"
							href={`https://eth-sepolia.blockscout.com/address/0x2771732DB7D76B749C4De8A8748AA46D9779F7fA`}
							className="flex items-center gap-1"
						>
							<Telescope size={16} />
							<p className="text-sm font-medium underline">View in Explorer</p>
						</Link>
					</div>
					<p>
						Providing care Provide a safe and comfortable space, Provide heating, Feed the kitten
						the right way, Stimulate the kitten to go to the bathroom, and Clean the kitten. Your
						support can empower these young minds, opening doors that poverty has closed.
					</p>

					<Fundraiser
						imageUrl="/placeholder-logo.svg"
						name="John Doe Inc."
						address={formatAddress("0xA7Dd557C3628e35D4CC9618F13Aa94D57FDb7E7C", 6)}
					/>
					<Separator className="my-4" />
					<CampaignStory />
					<Separator className="my-4" />
					<FloatingDonationField />
					<Separator className="my-4" />
					<Donors />
					<Separator className="mt-4" />
					<Button variant={"ghost"}>
						<Flag /> Report This Campaign
					</Button>
				</div>
				<div className="hidden flex-[1.4] lg:block">
					<DonationField />
				</div>
			</div>
			<MoreCampaigns />
		</main>
	);
}
