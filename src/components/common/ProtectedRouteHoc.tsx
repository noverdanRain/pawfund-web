import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

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
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			notFound();
		}
		return <WrappedComponent />;
	};
}
