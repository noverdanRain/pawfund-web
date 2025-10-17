"use client";

import { reownConfig, projectId, reownMetadata, wagmiAdapter } from "@/config/reownConfig";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { sepolia } from "@reown/appkit/networks";
import TRPCProvider from "./_trpc/provider";

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
});

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
	const initialState = cookieToInitialState(reownConfig, cookies);

	return (
		<WagmiProvider config={reownConfig} initialState={initialState}>
			<TRPCProvider>{children}</TRPCProvider>
		</WagmiProvider>
	);
}

export default ContextProvider;
