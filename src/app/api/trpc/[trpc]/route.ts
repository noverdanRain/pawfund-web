import { appRouter } from "@/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
	const cookieStore = await cookies();
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => ({ req, cookie: cookieStore }),
		onError({}) {
			// Handle error
		},
	});
};

export { handler as GET, handler as POST };
