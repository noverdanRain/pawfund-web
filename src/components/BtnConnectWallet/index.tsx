"use client";

import { EthereumRoundedIcon } from "@/assets/icons/EthereumRoundedIcon";
import { authUserAtom } from "@/atom/auth";
import { useAppKitEvents } from "@/hooks/useAppKitEvents";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useSignIn } from "@/hooks/useSignIn";
import { formatAddress, formatBalance } from "@/lib/utils";
import { useAppKit } from "@reown/appkit/react";
import { useSetAtom } from "jotai";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { sepolia } from "viem/chains";
import { useAccount, useBalance } from "wagmi";
import MainMenuDropdown from "../MainMenuDropdown";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { trpc } from "@/app/_trpc/client";

export default function BtnWalletConnect() {
	const { open } = useAppKit();
	const utils = trpc.useUtils();
	const { isConnected, address, isReconnecting } = useAccount();
	const { isSIWXSuccess } = useAppKitEvents();
	const setAuthUser = useSetAtom(authUserAtom);
	const { user, isLoading } = useAuthUser();

	const { mutate: signIn } = useSignIn();

	useEffect(() => {
		if (isSIWXSuccess && address && !user) {
			signIn({ address: address });
		}
	}, [address, user, isSIWXSuccess, signIn]);

	useEffect(() => {
		if (address !== user?.address) {
			setAuthUser(null);
			utils.accountRouter.getAccount.invalidate();
		}
	}, [address, user?.address, setAuthUser, utils.accountRouter.getAccount]);

	const { data: balance, ...balanceRest } = useBalance({
		address: address,
		chainId: sepolia.id,
	});

	return (
		<>
			{isConnected || isReconnecting ? (
				<MainMenuDropdown>
					<Button
						shape="circle"
						variant="secondary"
						size="lg"
						className="flex items-center gap-2 bg-gray-200 font-medium ring-2 ring-white hover:bg-gray-200/80"
					>
						{isLoading || isReconnecting ? (
							<Skeleton className="h-3 w-40 rounded-full bg-gray-300" />
						) : (
							<>
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
							</>
						)}
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
