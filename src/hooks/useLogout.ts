import { cilentSideTRPC } from "@/app/_provider/trpc-provider/clientSide";
import { initAuthAtom } from "@/atom/auth";
import { useDisconnect as useAppkitDisconnect } from "@reown/appkit/react";
import { useSetAtom } from "jotai";
import { useDisconnect } from "wagmi";

export function useLogout() {
	const setAuthUser = useSetAtom(initAuthAtom);
	const utils = cilentSideTRPC.useUtils();

	const { mutate: signOut } = cilentSideTRPC.authRouter.signOut.useMutation({
		onSuccess: () => {
			setAuthUser({ type: "CLEAR" });
			disconnect();
		},
		onError: (error) => {
			console.log("Logout failed:", error);
		},
	});
	const { disconnect } = useAppkitDisconnect();
	return useDisconnect({
		mutation: {
			onSuccess() {
				signOut();
				utils.accountRouter.getAccount.invalidate();
			},
		},
	});
}
