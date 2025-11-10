import { callerFactory, router } from "./trpc";
import { authRouter, campaignsRouter, userRouter } from "./router";

export type AppRouter = typeof appRouter;

export const appRouter = router({
	userRouter,
	authRouter,
	campaignsRouter,
});
export const createCaller = callerFactory(appRouter);
