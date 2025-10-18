import { signJwt } from "@/lib/jwt";
import { createCallerFactory, privateProcedure, publicProcecdure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
	getHello: publicProcecdure.query(async () => {
		return "Hello from tRPC!";
	}),
	setAuth: publicProcecdure
		.input(
			z.object({
				address: z.string(),
				type: z.enum(["fundraiser", "donor"]),
			}),
		)
		.mutation(async ({ input }) => {
			const token = await signJwt(input);
			return {
				token,
			};
		}),
	getAuth: privateProcedure.query(async ({ ctx }) => {
		const { payload } = ctx;
		return { payload };
	}),
	getUser: privateProcedure.query(async ({ ctx }) => {
		const { payload } = ctx;
		// req.headers.set("Authorization", "Bearer token");
		return { message: `Hello, ${payload.address}` };
	}),
	setUser: publicProcecdure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ input, ctx }) => {
			// Simulate setting user data
			const { req } = ctx;
			req.cookies.set("user", input.name);
			return { message: `User ${input.name} set successfully!` };
		}),
});
export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
