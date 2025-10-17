import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const serverClient = appRouter.createCaller({
	links: [
		httpBatchLink({
			url: `${BASE_URL}/api/trpc`,
		}),
	],
});
