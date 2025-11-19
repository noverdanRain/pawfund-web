"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import { makeQueryClient, trpc } from "./client";
import { env } from "@/config/env";

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient();
	}
	// Browser: use singleton pattern to keep the same query client
	return (clientQueryClientSingleton ??= makeQueryClient());
}

export default function TRPCProvider(props: { children: React.ReactNode }) {
	const [queryClient] = useState(() => getQueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `${env.NEXT_PUBLIC_BASE_URL}/api/trpc`,
				}),
			],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
		</trpc.Provider>
	);
}
