import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./drizzle/db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle/db",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
