import { createCallerFactory, router } from "./trpc";
import { authRouter, userRouter } from "./router";

export const appRouter = router({
	userRouter,
	authRouter,
});
export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
