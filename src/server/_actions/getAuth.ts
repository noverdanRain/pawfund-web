import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function getAuthedUser() {
	const cookieStore = await cookies();
	const token = cookieStore.get("pawfund-auth-token")?.value;
	if (!token) return null;
	try {
		const payload = await verifyJwt(token);
		return payload;
	} catch (error) {
		console.error("Failed to verify JWT:", error);
		return null;
	}
}
