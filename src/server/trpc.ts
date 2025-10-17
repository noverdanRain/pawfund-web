import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

const createTRPCContext = (opts: CreateNextContextOptions) => {
	const { req, res } = opts;
	return {
		req,
		res,
	};
};

export const t = initTRPC.context<ReturnType<typeof createTRPCContext>>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
	const { req, res } = ctx;
	const token = req.cookies["token"];
	if (!token) throw new TRPCError({ code: "UNAUTHORIZED" });
	return next({
		ctx: {
			payload: "Authenticated",
		},
	});
});
export const privateProcedure = t.procedure.use(isAuthed);
export const publicProcecdure = t.procedure;
export const router = t.router;
