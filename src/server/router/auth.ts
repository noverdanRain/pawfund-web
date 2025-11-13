import { privateProcedure, publicProcedure, router } from "../trpc";
import db from "@/db";
import { fundraisersTable, messageSignersTable, usersTable } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { signJwt, verifyJwt } from "@/lib/jwt";
import { Payload } from "@/types";

export const authRouter = router({
	createSignMessage: publicProcedure
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
	signIn: publicProcedure
		.input(
			z.object({
				address: z.string().refine((addr) => /^0x[a-fA-F0-9]{40}$/.test(addr), {
					message: "Invalid EVM address (expected 0x followed by 40 hex chars)",
				}),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			// This is needs to be updated to ensure the security
			const { address } = input;
			const { cookie } = ctx;
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
					cookie.set("pawfund-auth-token", token, {
						httpOnly: true,
						sameSite: "lax",
					});
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
				cookie.set("pawfund-auth-token", token, {
					httpOnly: true,
					sameSite: "lax",
				});
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
	signOut: privateProcedure.mutation(async ({ ctx }) => {
		const { cookie } = ctx;
		try {
			cookie.delete("pawfund-auth-token");
		} catch (error) {
			if (error instanceof TRPCError) throw error;
			console.error("Failed to sign out:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Failed to sign out`,
			});
		}
	}),
	verifyToken: publicProcedure
		.input(
			z.object({
				token: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const payload = await verifyJwt(input.token);
			return payload;
		}),
	verifyAuth: privateProcedure.query(async ({ ctx }) => {
		const { payload } = ctx;
		return payload;
	}),
});
