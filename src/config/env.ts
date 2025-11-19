import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/*
	 * Serverside Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		JWT_SECRET: z.string().min(1),
		DATABASE_URL: z.string().min(1),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {
		NEXT_PUBLIC_BASE_URL: z.url(),
		NEXT_PUBLIC_ENVIRONMENT: z.enum(["development", "production"]),
		NEXT_PUBLIC_REOWN_PROJECT_ID: z.string().min(1),
	},
	/*
	 * Due to how Next.js bundles environment variables on Edge and Client,
	 * we need to manually destructure them to make sure all are included in bundle.
	 *
	 * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
	 */
	runtimeEnv: {
		JWT_SECRET: process.env.JWT_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
		NEXT_PUBLIC_REOWN_PROJECT_ID: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
	},
});