import { callerFactory, router } from "./trpc";
import { authRouter, campaignsRouter, userRouter, accountRouter } from "./router";

export type AppRouter = typeof appRouter;

export const appRouter = router({
	userRouter,
	authRouter,
	campaignsRouter,
	accountRouter,
});
export const createCaller = callerFactory(appRouter);
