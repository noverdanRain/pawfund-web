import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import BtnWalletConnect from "../BtnConnectWallet";

export default function HeaderNav() {
	return (
		<header className="sticky top-4 mx-auto flex h-20 w-[calc(100%-1rem)] max-w-5xl transform items-center justify-between rounded-full bg-gray-100 px-7">
			<Image
				className="-ml-1.5 w-32 drop-shadow-xs sm:ml-0 sm:w-36"
				src={"/logo-text.svg"}
				alt="Pawfund Logo"
				width={140}
				height={40}
			/>
			<div className="flex items-center gap-2">
				<Button
					mode="icon"
					shape="circle"
					variant="secondary"
					size="lg"
					className="bg-gray-200 ring-2 ring-white hover:bg-gray-200/80"
				>
					<Search />
				</Button>
				<BtnWalletConnect />
			</div>
		</header>
	);
}
