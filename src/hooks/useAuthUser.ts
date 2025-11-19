import { authErrorAtom, authLoadingAtom, authUserAtom } from "@/atom/auth";
import { useAtomValue } from "jotai";

export function useAuthUser() {
	const user = useAtomValue(authUserAtom);
	const isLoading = useAtomValue(authLoadingAtom);
	const error = useAtomValue(authErrorAtom);
	const isError = Boolean(error);

	return {
		user,
		isLoading,
		isError,
		error,
	};
}
