// lib/atoms/authAtom.ts
import { atom } from "jotai";
import { Payload } from "@/types";
import { getAuthUser } from "@/server/_actions/getAuth";

type InitType = "INIT" | "CLEAR" | "SET_USER";

export const authUserAtom = atom<Payload | null>(null);

export const authLoadingAtom = atom<boolean>(false);

export const authErrorAtom = atom<string | null>(null);

export const initAuthAtom = atom(
	async (get) => {
		return get(authUserAtom);
	},
	async (get, set, action: { type: InitType; payload?: Payload }) => {
		switch (action.type) {
			case "INIT": {
				try {
					set(authLoadingAtom, true);
					set(authErrorAtom, null);

					const user = await getAuthUser();
					set(authUserAtom, user);
				} catch (error) {
					console.log("Failed to initialize auth:", error);
					set(authUserAtom, null);
					set(authErrorAtom, "Gagal mengambil data user dari server");
				} finally {
					set(authLoadingAtom, false);
				}
				break;
			}

			case "CLEAR": {
				set(authUserAtom, null);
				break;
			}

			case "SET_USER": {
				set(authUserAtom, action.payload || null);
				break;
			}

			default:
				break;
		}
	},
);
