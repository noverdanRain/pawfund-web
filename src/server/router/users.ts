import { publicProcedure, router } from "../trpc";
import db from "@/db";
import { usersTable } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userRouter = router({
	getUser: publicProcedure.input(z.object({ address: z.string() })).query(async ({ input }) => {
		const { address } = input;
		try {
			const [user] = await db
				.select({
					id: usersTable.id,
					address: usersTable.address,
				})
				.from(usersTable)
				.where(eq(usersTable.address, address))
				.limit(1);
			if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
			return user;
		} catch (error) {
			if (error instanceof TRPCError) throw error;
			console.error("Failed to fetch user:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Failed to fetch user`,
			});
		}
	}),
});
