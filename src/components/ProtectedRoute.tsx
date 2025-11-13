import { verifyJwt } from "@/lib/jwt";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withProtectedRoute(WrappedComponent: React.ComponentType<any>) {
	return async function ProtectedRoute() {
		const cookieStore = await cookies();
		const token = cookieStore.get("pawfund-auth-token")?.value;
		if (!token) {
			notFound();
		}

		try {
			verifyJwt(token || "");
		} catch (error) {
			notFound();
		}
		return <WrappedComponent />;
	};
}
