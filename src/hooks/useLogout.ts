import { trpc } from "@/app/_trpc/client";
import { authedUserAtom } from "@/atom/auth";
import { useDisconnect as useAppkitDisconnect } from "@reown/appkit/react";
import { useSetAtom } from "jotai";
import { useDisconnect } from "wagmi";

export function useLogout() {
	const setAuthedUser = useSetAtom(authedUserAtom);

	const { mutate: signOut } = trpc.authRouter.signOut.useMutation({
		onError: (error) => {
			console.error("Logout failed:", error);
		},
		onSuccess: () => {
			setAuthedUser(null);
			disconnect();
		},
	});
	const { disconnect } = useAppkitDisconnect();
	return useDisconnect({
		mutation: {
			onSuccess() {
				signOut();
			},
		},
	});
}
