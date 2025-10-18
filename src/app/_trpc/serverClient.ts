import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createCallerFactory, createTRPCContext } from "@/server/trpc";
import { makeQueryClient } from "./client";
import { appRouter } from "@/server";

import { NextRequest } from "next/server";

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(() => createTRPCContext({ req: {} as NextRequest }));

export const { trpc: trpcServer, HydrateClient } = createHydrationHelpers<typeof appRouter>(
	caller,
	getQueryClient,
);
