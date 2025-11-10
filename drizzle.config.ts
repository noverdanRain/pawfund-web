import { DATABASE_URL } from "@/config/envVars";
import { defineConfig } from "drizzle-kit";

const url = DATABASE_URL;

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
