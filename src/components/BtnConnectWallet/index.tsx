"use client";

import { EthereumRoundedIcon } from "@/assets/icons/EthereumRoundedIcon";
import { authedUserAtom } from "@/atom/auth";
import { useAppKitEvents } from "@/hooks/useAppKitEvents";
import { useSignIn } from "@/hooks/useSignIn";
import { formatAddress, formatBalance } from "@/lib/utils";
import { useAppKit } from "@reown/appkit/react";
import { useAtom } from "jotai";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { sepolia } from "viem/chains";
import { useAccount, useBalance } from "wagmi";
import MainMenuDropdown from "../MainMenuDropdown";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function BtnWalletConnect() {
	const { open } = useAppKit();
	const { isConnected, address } = useAccount();
	const { isSIWXSuccess } = useAppKitEvents();
	const [authedUser, setAuthedUser] = useAtom(authedUserAtom);

	const { mutate: signIn } = useSignIn();

	useEffect(() => {
		if (isSIWXSuccess && address && !authedUser) {
			signIn({ address: address });
		}
	}, [address, authedUser, isSIWXSuccess, signIn]);

	useEffect(() => {
		if (address !== authedUser?.address) {
			setAuthedUser(null);
		}
	}, [address, authedUser?.address, setAuthedUser]);

	const { data: balance, ...balanceRest } = useBalance({
		address: address,
		chainId: sepolia.id,
	});

	return (
		<>
			{isConnected ? (
				<MainMenuDropdown>
					<Button
						shape="circle"
						variant="secondary"
						size="lg"
						className="flex items-center gap-2 bg-gray-200 font-medium ring-2 ring-white hover:bg-gray-200/80"
					>
						<div className="flex items-center gap-1">
							<EthereumRoundedIcon />
							{balanceRest.isLoading ? (
								<Skeleton className="h-3 w-16 rounded-full bg-gray-300" />
							) : (
								<p>{formatBalance(balance)}</p>
							)}
						</div>
						<div className="hidden rounded-full border border-white bg-gray-100 px-2 py-1 sm:block">
							{formatAddress(address || "", 4)}
						</div>
						<ChevronDown />
					</Button>
				</MainMenuDropdown>
			) : (
				<Button
					shape="circle"
					variant="secondary"
					size="lg"
					className="bg-gray-200 font-medium ring-2 ring-white hover:bg-gray-200/80"
					onClick={() => open()}
				>
					Login
				</Button>
			)}
		</>
	);
}
