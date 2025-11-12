import { authedUserAtom, authTokenAtom } from "@/atom/auth";
import { useSetAtom } from "jotai";
import { useDisconnect as useAppkitDisconnect } from "@reown/appkit/react";
import { useDisconnect } from "wagmi";
import { RESET } from "jotai/utils";

export function useLogout() {
	const setAuthToken = useSetAtom(authTokenAtom);
	const setAuthedUser = useSetAtom(authedUserAtom);

	const { disconnect } = useAppkitDisconnect();
	return useDisconnect({
		mutation: {
			onSuccess() {
				setAuthToken(RESET);
				setAuthedUser(null);
				disconnect();
			},
		},
	});
}
