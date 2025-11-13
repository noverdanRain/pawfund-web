import db from "@/db";
import { fundraisersTable, usersTable } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { privateProcedure, router } from "../trpc";

export const accountRouter = router({
	getAccount: privateProcedure.query(async ({ ctx }) => {
		const { payload } = ctx;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { type } = payload;
		try {
			const [user] = await db
				.select({
					address: usersTable.address,
					fundraiserId: fundraisersTable.id,
					name: fundraisersTable.name,
					imageUrl: fundraisersTable.imageUrl,
					email: fundraisersTable.email,
					socialUrl: fundraisersTable.socialUrl,
				})
				.from(usersTable)
				.leftJoin(fundraisersTable, eq(fundraisersTable.usersId, usersTable.id))
				.where(eq(usersTable.address, payload.address))
				.limit(1);

			if (!user) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Account Not Found",
				});
			}
			return {
				...user,
				type: (user.fundraiserId ? "fundraiser" : "donor") as typeof type,
			};
		} catch (error) {
			if (error instanceof TRPCError) throw error;
			console.log("Failed get account data:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Failed to sign in`,
			});
		}
	}),
});
