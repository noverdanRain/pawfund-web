import { sepolia } from "viem/chains";
import { REOWN_PROJECT_ID } from "./envVars";
import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import type { Storage } from "wagmi";

export const projectId = REOWN_PROJECT_ID;

if (!projectId) {
	throw new Error("Reown project ID is not defined");
}

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}) as Storage,
	ssr: true,
	projectId,
	networks: [sepolia],
});

export const reownConfig = wagmiAdapter.wagmiConfig;

// Set up metadata
export const reownMetadata = {
	name: "Pawfund",
	description: "A decentralized crowdfunding platform for animal welfare",
	url: "https://pawfunding.vercel.app",
	icons: ["https://pawfunding.vercel.app/logo-icon.svg"],
};
