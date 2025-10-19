"use client";

import { reownConfig, projectId, reownMetadata, wagmiAdapter } from "@/config/reownConfig";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import TRPCProvider from "./_trpc/provider";
import { Provider as JotaiProvider } from "jotai";
import { CloudAuthSIWX } from "@reown/appkit-siwx";
import { sepolia } from "viem/chains";

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
			<JotaiProvider>
				<TRPCProvider>{children}</TRPCProvider>
			</JotaiProvider>
		</WagmiProvider>
	);
}

export default ContextProvider;
