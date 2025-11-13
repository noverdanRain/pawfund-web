import "server-only";

import { type appRouter, createCaller } from "@/server";
import { createTRPCContext } from "@/server/trpc";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "./client";
import { cookies } from "next/headers";

import { NextRequest } from "next/server";

export const getQueryClient = cache(makeQueryClient);
const caller = createCaller(async () =>
	createTRPCContext({ req: {} as NextRequest, cookie: await cookies() }),
);

export const { trpc: trpcServer, HydrateClient } = createHydrationHelpers<typeof appRouter>(
	caller,
	getQueryClient,
);
