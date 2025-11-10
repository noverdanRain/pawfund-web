import { publicProcedure, router } from "../trpc";
import db from "@/db";
import { campaignsTable, fundraisersTable } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

const getCampaignsScheme = z.object({
	searchQuery: z.string().optional(),
	sort: z.enum(["newest", "oldest", "closeToGoal", "popular"]).default("newest"),
	limit: z.number().default(10),
	offset: z.number().default(0),
});

export const campaignsRouter = router({
	getCampaigns: publicProcedure.input(getCampaignsScheme).query(async ({ input }) => {
		const {} = input;
		const { searchQuery, sort, limit, offset } = input;
		try {
			const campaigns = await db
				.select({
					imageUrl: campaignsTable.imageUrl,
					title: campaignsTable.title,
					shortDescription: campaignsTable.shortDescription,
					address: campaignsTable.address,
					fundraiserName: fundraisersTable.name,
					story: campaignsTable.story,
				})
				.from(campaignsTable)
				.leftJoin(fundraisersTable, eq(campaignsTable.fundraisersId, fundraisersTable.id));
			return campaigns;
		} catch (error) {
			if (error instanceof TRPCError) throw error;
			console.error("Failed to get campaigns:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Failed to get campaigns`,
			});
		}
	}),
});
