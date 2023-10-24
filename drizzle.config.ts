import { Config } from "drizzle-kit";

// Assuming you have the Vercel PostgreSQL details in your environment variables
const POSTGRES_URL = process.env.POSTGRES0_URL;

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: POSTGRES_URL ?? "",
  },
} as Config;


