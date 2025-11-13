import { verifyJwt } from "@/lib/jwt";
import { initTRPC, TRPCError } from "@trpc/server";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export const createTRPCContext = (opts: { req: NextRequest; cookie: ReadonlyRequestCookies }) => {
	return opts;
};

const t = initTRPC.context<ReturnType<typeof createTRPCContext>>().create();

const isAuthed = t.middleware(async ({ ctx, next }) => {
	const { cookie } = ctx;
	const token = cookie.get("pawfund-auth-token")?.value;
	if (!token)
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You must be logged in to access this resource.",
		});
	try {
		const payload = await verifyJwt(token);
		return next({
			ctx: {
				payload,
			},
		});
	} catch (err) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: `Token Error: ${err instanceof Error ? err.message : "Invalid token."}`,
		});
	}
});

export const privateProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
export const router = t.router;
export const callerFactory = t.createCallerFactory;
