import { publicProcecdure, router } from "../trpc";
import db from "@/db";
import { fundraisersTable, messageSignersTable, usersTable } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { Payload, signJwt } from "@/lib/jwt";

export const authRouter = router({
	createSignMessage: publicProcecdure
		.input(
			z.object({
				address: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const { address } = input;
			try {
				const [existingSigner] = await db
					.select({
						message: messageSignersTable.message,
					})
					.from(messageSignersTable)
					.where(eq(messageSignersTable.address, address))
					.limit(1);
				if (existingSigner) {
					return {
						message: existingSigner.message,
					};
				}
				const nonce = crypto.randomUUID();
				const timestamp = new Date().toISOString();
				const message = JSON.stringify({
					address,
					nonce,
					timestamp,
				});
				await db.insert(messageSignersTable).values({
					address,
					message,
				});
				return {
					message,
				};
			} catch (error) {
				if (error instanceof TRPCError) throw error;
				console.error("Failed to create sign message:", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Failed to create sign message`,
				});
			}
		}),
	signIn: publicProcecdure.input(z.object({ address: z.string() })).mutation(async ({ input }) => {
		// This is needs to be updated to ensure the security
		const { address } = input;
		try {
			const [userExsist] = await db
				.select({
					address: usersTable.address,
					fundraiserId: fundraisersTable.id,
				})
				.from(usersTable)
				.leftJoin(fundraisersTable, eq(fundraisersTable.usersId, usersTable.id))
				.where(eq(usersTable.address, address))
				.limit(1);
			if (userExsist) {
				const payload: Payload = {
					address: userExsist.address,
					type: userExsist.fundraiserId ? "fundraiser" : "donor",
				};
				const token = await signJwt(payload);
				return {
					token,
					payload,
				};
			}
			await db.insert(usersTable).values({
				address,
			});
			const payload: Payload = {
				address: address,
				type: "donor",
			};
			const token = await signJwt(payload);
			return {
				token,
				payload,
			};
		} catch (error) {
			if (error instanceof TRPCError) throw error;
			console.error("Failed to sign in:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Failed to sign in`,
			});
		}
	}),
});
