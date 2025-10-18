import { atomWithStorage } from "jotai/utils";

const tokenStorage = typeof window !== "undefined" ? localStorage.getItem("token") || null : null;
export const authTokenAtom = atomWithStorage<string | null>("token", tokenStorage);
