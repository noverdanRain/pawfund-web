"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useAppKit, useAppKitEvents } from "@reown/appkit/react";
import { formatAddress, formatBalance } from "@/lib/utils";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { sepolia } from "viem/chains";
import { Skeleton } from "../ui/skeleton";
import MainMenuDropdown from "../MainMenuDropdown";
import { trpc } from "@/app/_trpc/client";
import { useEffect } from "react";
import { toast } from "sonner";
import { authTokenAtom } from "@/atom";
import { useSetAtom } from "jotai";

export default function BtnWalletConnect() {
	const setAuthToken = useSetAtom(authTokenAtom);
	const { disconnect } = useDisconnect();
	const { open } = useAppKit();
	const { isConnected, address } = useAccount();
	const { data: appkitEvents } = useAppKitEvents();
	console.log("App Kit EVENTS: ", appkitEvents.event);
	const isSIWXAuthSuccess =
		appkitEvents.event === "SIWX_AUTH_SUCCESS" ||
		appkitEvents.event === "SOCIAL_LOGIN_SUCCESS" ||
		appkitEvents.event === "EMAIL_VERIFICATION_CODE_PASS";

	const { mutate: signIn } = trpc.authRouter.signIn.useMutation({
		onMutate: () => {
			toast.loading("Just a moment", {
				description: `Verifying your wallet address `,
				id: "sign-in-toast",
			});
		},
		onSuccess: (data) => {
			toast.success("Welcome back!", {
				duration: 1000,
				description: `You have successfully signed in.`,
				id: "sign-in-toast",
			});
			setAuthToken(data.token);
		},
		onError: () => {
			toast.error("Sign In Failed", {
				description: "Sorry we could not sign you in. Please try again.",
				id: "sign-in-toast",
			});
			disconnect();
		},
	});

	useEffect(() => {
		if (isSIWXAuthSuccess && address) {
			signIn({ address: address });
		}
	}, [address, isSIWXAuthSuccess, signIn]);

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
						// onClick={() => open()}
					>
						<div className="flex items-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32">
								<g fill="none" fillRule="evenodd">
									<circle cx={16} cy={16} r={16} fill="#000"></circle>
									<g fill="#fff" fillRule="nonzero">
										<path fillOpacity={0.602} d="M16.498 4v8.87l7.497 3.35z"></path>
										<path d="M16.498 4L9 16.22l7.498-3.35z"></path>
										<path fillOpacity={0.602} d="M16.498 21.968v6.027L24 17.616z"></path>
										<path d="M16.498 27.995v-6.028L9 17.616z"></path>
										<path fillOpacity={0.2} d="m16.498 20.573l7.497-4.353l-7.497-3.348z"></path>
										<path fillOpacity={0.602} d="m9 16.22l7.498 4.353v-7.701z"></path>
									</g>
								</g>
							</svg>
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
