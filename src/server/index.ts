import { privateProcedure, publicProcecdure, router } from "./trpc";

export const appRouter = router({
	getHello: publicProcecdure.query(async () => {
		return "Hello from tRPC!";
	}),
	getUser: privateProcedure.query(async ({ ctx }) => {
		const { payload } = ctx;
		return { message: `Hello, ${payload}` };
	}),
});

export type AppRouter = typeof appRouter;
