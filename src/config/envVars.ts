type Environment = "development" | "production";

export const ENVIRONMENT: Environment = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment;
export const REOWN_PROJECT_ID = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
