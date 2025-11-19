"use client";

import TRPCProvider from "@/app/_trpc/provider";
import { initAuthAtom } from "@/atom/auth";
import { projectId, reownConfig, reownMetadata, wagmiAdapter } from "@/config/reownConfig";
import { CloudAuthSIWX } from "@reown/appkit-siwx";
import { sepolia } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { useSetAtom } from "jotai";
import { useEffect, type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider } from "wagmi";

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

export default function ContextProvider({
	children,
	cookies,
}: {
	children: ReactNode;
	cookies: string | null;
}) {
	const initialState = cookieToInitialState(reownConfig, cookies);
	const initAuthUser = useSetAtom(initAuthAtom);

	useEffect(() => {
		initAuthUser({ type: "INIT" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<WagmiProvider config={reownConfig} initialState={initialState}>
			<TRPCProvider>{children}</TRPCProvider>
		</WagmiProvider>
	);
}
