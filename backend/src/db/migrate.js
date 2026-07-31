import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { sql } from "../config/database.js";

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "migrations");

/**
 * Applies every .sql file in migrations/ in filename order, skipping the ones
 * already recorded in schema_migrations. Safe to re-run.
 */
async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name       TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  const applied = new Set(
    (await sql`SELECT name FROM schema_migrations`).map((row) => row.name),
  );

  const files = (await readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  let count = 0;

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`- skipped ${file} (already applied)`);
      continue;
    }

    const contents = await readFile(join(migrationsDir, file), "utf8");
    // Migration files are trusted local sources, not user input.
    await sql.unsafe(contents);
    await sql`INSERT INTO schema_migrations (name) VALUES (${file})`;

    console.log(`+ applied ${file}`);
    count += 1;
  }

  console.log(
    count === 0 ? "Schema already up to date." : `Applied ${count} migration(s).`,
  );
}

migrate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Migration failed:", error.message);
    process.exit(1);
  });
