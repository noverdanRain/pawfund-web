import { trpc } from "@/app/_trpc/client";
import { type trpcServer } from "@/app/_trpc/serverClient";
import { authErrorAtom, authLoadingAtom, initAuthAtom } from "@/atom/auth";
import { MutationConfig } from "@/lib/react-query";
import { useDisconnect } from "@reown/appkit/react";
import { useSetAtom } from "jotai";
import { toast } from "sonner";

type UseSignInParams = {
	mutationConfig?: MutationConfig<typeof trpcServer.authRouter.signIn>;
};

export function useSignIn(params: UseSignInParams = {}) {
	const setAuthedUser = useSetAtom(initAuthAtom);
	const setLoadingUser = useSetAtom(authLoadingAtom);
	const setErrorUser = useSetAtom(authErrorAtom);
	const { disconnect } = useDisconnect();

	return trpc.authRouter.signIn.useMutation({
		...params.mutationConfig,
		onMutate: () => {
			setLoadingUser(true);
			setErrorUser(null);
			toast.loading("Just a moment", {
				description: `Verifying your wallet address `,
				id: "sign-in-toast",
			});
		},
		onSuccess: (data) => {
			toast.success("Welcome back!", {
				duration: 1000,
				description: `You have successfully signed in.`,
				id: "sign-in-toast",
			});
			setAuthedUser({ type: "SET_USER", payload: data.payload });
			setLoadingUser(false);
			setErrorUser(null);
		},
		onError: () => {
			toast.error("Sign In Failed", {
				description: "Sorry we could not sign you in. Please try again.",
				id: "sign-in-toast",
			});
			disconnect();
			setLoadingUser(false);
			setErrorUser("Failed to sign in user");
		},
	});
}
