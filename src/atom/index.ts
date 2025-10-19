import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Payload } from "@/lib/jwt";

const tokenStorage =
	typeof window !== "undefined" ? localStorage.getItem("token") || undefined : undefined;
export const authTokenAtom = atomWithStorage<string | undefined>("token", tokenStorage);

export const authedUserAtom = atom<Payload | null>(null);
// export const authedUserLoadableAtom = loadable(authedUserAtom);
