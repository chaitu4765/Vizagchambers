import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("Set DATABASE_URL from the project's connected Neon database before running this migration.");
  process.exit(1);
}
const sql = neon(process.env.DATABASE_URL);
const migration = await readFile(new URL("../db/postgres/0001_enquiries.sql", import.meta.url), "utf8");
try {
  await sql.query(migration);
  console.log("Membership enquiries table is ready.");
} catch {
  console.error("The database migration failed. Check the database connection and permissions.");
  process.exit(1);
}
