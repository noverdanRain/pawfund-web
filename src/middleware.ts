import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/jwt";

const protectedRoutes = ["/account"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);

	const token = req.headers.get("Authorization")?.replace("Bearer ", "");
	// if (isProtectedRoute) {
	// 	if (!token) NextResponse.redirect(new URL("/404", req.nextUrl));
	// 	try {
	// 		const verify = await verifyJwt(token || "");
	// 		if (!verify) {
	// 			return NextResponse.next();
	// 		}
	// 	} catch (err) {
	// 		return NextResponse.redirect(new URL("/404", req.nextUrl));
	// 	}
	// }
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
