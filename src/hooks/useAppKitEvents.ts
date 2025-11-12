import { useAppKitEvents as useAppKitEventsDefault } from "@reown/appkit/react";
import { useMemo } from "react";

export function useAppKitEvents() {
	const { data, ...rest } = useAppKitEventsDefault();
	const isSIWXSuccess = useMemo(() => {
		return (
			data?.event === "SIWX_AUTH_SUCCESS" ||
			data?.event === "SOCIAL_LOGIN_SUCCESS" ||
			data?.event === "EMAIL_VERIFICATION_CODE_PASS"
		);
	}, [data?.event]);
	return { data, ...rest, isSIWXSuccess };
}
