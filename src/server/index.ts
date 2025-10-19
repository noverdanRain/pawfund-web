import { createCallerFactory, router } from "./trpc";
import { authRouter, campaignsRouter, userRouter } from "./router";

export const appRouter = router({
	userRouter,
	authRouter,
	campaignsRouter,
});
export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
