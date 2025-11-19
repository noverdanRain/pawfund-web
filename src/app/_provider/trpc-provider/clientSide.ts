import { createTRPCReact } from "@trpc/react-query";
import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

import type { AppRouter } from "@/server";

export const cilentSideTRPC = createTRPCReact<AppRouter>({});

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
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
