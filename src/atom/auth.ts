import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Payload } from "@/types";

const tokenStorage =
	typeof window !== "undefined" ? localStorage.getItem("token") || undefined : undefined;
export const authTokenAtom = atomWithStorage<string | undefined>("token", tokenStorage);

export const authedUserAtom = atom<Payload | null | undefined>(null);
