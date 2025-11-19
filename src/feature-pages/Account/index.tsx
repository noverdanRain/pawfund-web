"use client";

import { trpc } from "@/app/_trpc/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatAddress } from "@/lib/utils";
import { ArrowLeft, Copy, User } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { Card } from "./components/Card";
import { AccountLoading } from "./components/Loading";
import { useAlertDialog } from "@/hooks/useAlertDialog";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

const descs = {
	donor:
		"Donors are individuals who care about animal welfare and want to help. They can explore donation campaigns, contribute funds, and share rescue stories to spread awareness.",
	fundraiser:
		"A fundraiser is an organization or individual representing a shelter, rescue team, or animal focused foundation who creates a campaign to raise funds for medical care, food, sheltering, and animal rescue operations.",
};

export default function AccountPage() {
	const account = trpc.accountRouter.getAccount.useQuery();
	const copy = useCopyClipboard();
	const alertChangeRole = useAlertDialog({
		title: "Are you sure?",
		description: "This action cannot be undone.",
		variant: "destructive",
		onAction: () => console.log("Change account type action triggered"),
		onCancel: () => console.log("Change account type cancelled"),
	});
	const router = useRouter();
	const handleBack = () => {
		// alert("serius?");
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

			{(account.isLoading || account.isRefetching) && <AccountLoading />}
			{account.data && (
				<div className="mt-8 space-y-4">
					<Card
						title={`You're a ${account.data.type}`}
						description={account.data?.type === "donor" ? descs.donor : descs.fundraiser}
					>
						<Button
							onClick={alertChangeRole}
							className="mt-2"
							size={"lg"}
							variant={"outline"}
							shape={"circle"}
						>
							Change into a {account.data?.type === "donor" ? "fundraiser" : "donor"}
						</Button>
					</Card>
					{account.data.type === "fundraiser" && (
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
									defaultValue={account.data?.name ?? ""}
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
									defaultValue={account.data?.email ?? ""}
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
									defaultValue={account.data?.socialUrl ?? ""}
									className="border border-gray-300 bg-transparent"
									variant={"lg"}
									placeholder="e.g. https://instagram.com/albuquerque_animalshelter"
									type="url"
								/>
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
							<p className="font-medium sm:hidden">{formatAddress(account.data?.address, 8)}</p>
							<p className="hidden font-medium sm:block">{account.data?.address}</p>
							<button className="cursor-pointer" onClick={() => copy(account.data?.address || "")}>
								<Copy size={12} />
							</button>
						</div>
					</Card>
				</div>
			)}
		</main>
	);
}
