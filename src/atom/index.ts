import { atomWithStorage } from "jotai/utils";

const tokenStorage =
	typeof window !== "undefined" ? localStorage.getItem("token") || undefined : undefined;
export const authTokenAtom = atomWithStorage<string | undefined>("token", tokenStorage);
