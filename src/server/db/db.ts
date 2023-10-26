import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "server-only";

import * as schema from "./schema";

const client = postgres(process.env.DB_URL || '');
export const db = drizzle(client, { schema });