"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useMemo } from "react";

import { makeQueryClient, trpc } from "./client";
import { useAtomValue } from "jotai";
import { authTokenAtom } from "@/atom";
import { BASE_URL } from "@/config/envVars";

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
	const token = useAtomValue(authTokenAtom);
	const queryClient = getQueryClient();
	const trpcClient = useMemo(
		() =>
			trpc.createClient({
				links: [
					httpBatchLink({
						url: `${BASE_URL}/api/trpc`,
						headers() {
							return {
								Authorization: token ? `Bearer ${token}` : undefined,
							};
						},
					}),
				],
			}),
		[token],
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
		</trpc.Provider>
	);
}
