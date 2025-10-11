"use client";

import { reownConfig, projectId, reownMetadata, wagmiAdapter } from "@/config/reownConfig";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { sepolia } from "@reown/appkit/networks";

if (!projectId) {
	throw new Error("Project ID is not defined");
}

const queryClient = new QueryClient();

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
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}

export default ContextProvider;
