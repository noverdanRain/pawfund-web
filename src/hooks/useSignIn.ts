import { trpc } from "@/app/_trpc/client";
import { type trpcServer } from "@/app/_trpc/serverClient";
import { authedUserAtom, authTokenAtom } from "@/atom/auth";
import { MutationConfig } from "@/lib/react-query";
import { useDisconnect } from "@reown/appkit/react";
import { useSetAtom } from "jotai";
import { toast } from "sonner";

type UseSignInParams = {
	mutationConfig?: MutationConfig<typeof trpcServer.authRouter.signIn>;
};

export function useSignIn(params: UseSignInParams = {}) {
	const setAuthToken = useSetAtom(authTokenAtom);
	const setAuthedUser = useSetAtom(authedUserAtom);
	const { disconnect } = useDisconnect();

	return trpc.authRouter.signIn.useMutation({
		...params.mutationConfig,
		onMutate: () => {
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
			setAuthToken(data.token);
			setAuthedUser(data.payload);
		},
		onError: () => {
			toast.error("Sign In Failed", {
				description: "Sorry we could not sign you in. Please try again.",
				id: "sign-in-toast",
			});
			disconnect();
		},
	});
}
