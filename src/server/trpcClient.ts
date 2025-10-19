import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from ".";
import { BASE_URL } from "@/config/envVars";

export const trpcNative = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${BASE_URL}/api/trpc`,
		}),
	],
});
