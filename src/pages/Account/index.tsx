"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatAddress } from "@/lib/utils";
import { ArrowLeft, Copy, User } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { Card } from "./Card";
import { useAtomValue } from "jotai";
import { authedUserAtom } from "@/atom/auth";
import { toast } from "sonner";
import { AccountLoading } from "./Loading";

export default function AccountPage() {
	const authedUser = useAtomValue(authedUserAtom);
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};
	return (
		<main className="mx-auto max-w-3xl px-4 py-8">
			<header className="flex items-center gap-4">
				<button className="cursor-pointer" onClick={handleBack}>
					<ArrowLeft />
				</button>
				<h4 className="text-xl font-bold">Account</h4>
			</header>

			{authedUser === null && <AccountLoading />}
			{authedUser && (
				<div className="mt-8 space-y-4">
					<Card
						title="You are a supporter"
						description="Supporters are individuals who care about animal welfare and want to help. They can explore donation campaigns, contribute funds, and share rescue stories to spread awareness."
					>
						<Button
							onClick={() => {
								toast.error("This feature is not implemented yet. Please check back later.");
							}}
							className="mt-2"
							size={"lg"}
							variant={"outline"}
							shape={"circle"}
						>
							Change Into a Fundraiser
						</Button>
					</Card>
					{authedUser?.type === "fundraiser" && (
						<>
							<Card
								title="Fundraiser Avatar"
								description="An avatar is optional but strongly recommended. It helps to personalize your account and make it more recognizable."
							>
								<div className="mt-4 flex items-center gap-4">
									<Avatar className="size-24">
										<AvatarImage src="/media/avatars/14.png" alt="@reui" />
										<AvatarFallback className="!bg-amber-500/10 text-lg font-medium text-amber-600">
											<User size={28} />
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-sm text-gray-500">
											Click on the avatar to upload a custom one.
										</p>
										<Button
											disabled
											className="mt-2"
											size={"lg"}
											variant={"outline"}
											shape={"circle"}
										>
											Save
										</Button>
									</div>
								</div>
							</Card>
							<Card
								title="Fundraiser Name"
								description="This is your account's name displayed on PawFund."
							>
								<Input
									className="border border-gray-300 bg-transparent"
									variant={"lg"}
									placeholder="e.g. Albuquerque Animal Shelter"
								/>
								<Button className="mt-2" size={"lg"} variant={"outline"} shape={"circle"}>
									Save
								</Button>
							</Card>
							<Card title="Email" description="This is email used to public can contact you.">
								<Input
									className="border border-gray-300 bg-transparent"
									variant={"lg"}
									placeholder="e.g. animalshelter@example.com"
									type="email"
								/>
								<Button className="mt-2" size={"lg"} variant={"outline"} shape={"circle"}>
									Save
								</Button>
							</Card>
							<Card
								title="Website or Social Media"
								description="Add a link to your official website or profile (Instagram, Facebook, etc)."
							>
								<Input
									className="border border-gray-300 bg-transparent"
									variant={"lg"}
									placeholder="e.g. https://instagram.com/albuquerque_animalshelter"
									type="url"
								/>
								<Button className="mt-2" size={"lg"} variant={"outline"} shape={"circle"}>
									Save
								</Button>
							</Card>
							<Card
								title="Location"
								description="Let supporters know where your as fundraiser is based. This helps build transparency and trust."
							>
								<div className="flex flex-col gap-4 sm:flex-row">
									<div className="w-full space-y-2">
										<Label className="text-sm">Country</Label>
										<Input
											className="mt-1 border border-gray-300 bg-transparent"
											variant={"lg"}
											placeholder="e.g. United States"
										/>
									</div>
									<div className="w-full space-y-2">
										<Label className="text-sm">Zip Code</Label>
										<Input
											className="mt-1 border border-gray-300 bg-transparent"
											variant={"lg"}
											placeholder="e.g. 87102"
										/>
									</div>
								</div>
								<Button className="mt-2" size={"lg"} variant={"outline"} shape={"circle"}>
									Save
								</Button>
							</Card>
						</>
					)}
					<Card
						title="Linked Wallet"
						description="Wallet to access blockchain features like secure donations, on chain campaign tracking, and contribution history."
					>
						<div className="flex items-center gap-4">
							<p className="font-medium sm:hidden">
								{formatAddress("0xA7Dd557C3628e35D4CC9618F13Aa94D57FDb7E7C", 8)}
							</p>
							<p className="hidden font-medium sm:block">
								{"0xA7Dd557C3628e35D4CC9618F13Aa94D57FDb7E7C"}
							</p>

							<Copy size={12} />
						</div>
					</Card>
				</div>
			)}
		</main>
	);
}
