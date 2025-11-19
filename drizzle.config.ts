import { env } from "@/config/env";
import { defineConfig } from "drizzle-kit";

const url = env.DATABASE_URL;

if (!url) {
	throw new Error("Database URI is undefined");
}

export default defineConfig({
	schema: "./src/db/schema.ts",
	dialect: "mysql",
	dbCredentials: {
		url,
	},
});
