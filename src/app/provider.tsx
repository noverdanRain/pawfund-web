"use client";

import { projectId, reownConfig, reownMetadata, wagmiAdapter } from "@/config/reownConfig";
import { CloudAuthSIWX } from "@reown/appkit-siwx";
import { sepolia } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { useEffect, type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import TRPCProvider from "./_trpc/provider";
import { useSetAtom } from "jotai";
import { authedUserAtom } from "@/atom/auth";
import { trpc } from "./_trpc/client";

if (!projectId) {
	throw new Error("Project ID is not defined");
}

createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks: [sepolia],
	defaultNetwork: sepolia,
	metadata: reownMetadata,
	themeMode: "light",
	themeVariables: {
		"--w3m-font-size-master": "10px",
	},
	features: {
		analytics: true,
		socials: ["google", "x"],
		onramp: false,
		swaps: false,
	},
	enableCoinbase: false,
	siwx: new CloudAuthSIWX({
		localAuthStorageKey: "pawfund-siwx-session",
		localNonceStorageKey: "pawfund-siwx-nonce",
	}),
});

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
	const initialState = cookieToInitialState(reownConfig, cookies);

	return (
		<WagmiProvider config={reownConfig} initialState={initialState}>
			<TRPCProvider>
				<UserProvider>{children}</UserProvider>
			</TRPCProvider>
		</WagmiProvider>
	);
}

export default ContextProvider;

function UserProvider({ children }: { children: ReactNode }) {
	const setAuthedUser = useSetAtom(authedUserAtom);
	const getAuth = trpc.authRouter.verifyAuth.useQuery();

	useEffect(() => {
		if (getAuth.data) {
			setAuthedUser(getAuth.data);
		}
	}, [getAuth.data, setAuthedUser]);
	return <>{children}</>;
}
