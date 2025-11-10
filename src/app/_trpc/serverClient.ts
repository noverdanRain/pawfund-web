import "server-only";

import { type appRouter, createCaller } from "@/server";
import { createTRPCContext } from "@/server/trpc";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "./client";

import { NextRequest } from "next/server";

export const getQueryClient = cache(makeQueryClient);
const caller = createCaller(() => createTRPCContext({ req: {} as NextRequest }));

export const { trpc: trpcServer, HydrateClient } = createHydrationHelpers<typeof appRouter>(
	caller,
	getQueryClient,
);
