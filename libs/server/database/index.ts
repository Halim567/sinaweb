import "server-only";

import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
export * from "./schema";
export { eq, and, count, not, or, sql, desc } from "drizzle-orm";