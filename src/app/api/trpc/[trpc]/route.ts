import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";
import { NextRequest } from "next/server";

const handler = (req: NextRequest) => {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => ({ req }),
	});
};

export { handler as GET, handler as POST };
