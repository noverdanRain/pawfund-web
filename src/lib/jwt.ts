import "server-only";

import { env } from "@/config/env";
import { Payload } from "@/types";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export async function signJwt(payload: Payload): Promise<string> {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("12h")
		.setIssuedAt()
		.sign(secret);
}

export async function verifyJwt(token: string): Promise<Payload> {
	try {
		const { payload } = await jwtVerify(token, secret);
		return payload as Payload;
	} catch (error) {
		throw new Error(
			`JWT verification failed: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}
