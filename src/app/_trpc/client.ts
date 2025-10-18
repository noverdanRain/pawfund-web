import { createTRPCReact } from "@trpc/react-query";
import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

import type { AppRouter } from "@/server";

export const trpc = createTRPCReact<AppRouter>({});

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30 * 1000,
			},
			dehydrate: {
				// serializeData: superjson.serialize,
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) || query.state.status === "pending",
			},
			hydrate: {
				// deserializeData: superjson.deserialize,
			},
		},
	});
}
