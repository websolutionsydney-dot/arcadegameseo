import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import initSqlJs from "sql.js";
import type { EnquiryDatabase, EnquiryStatement, SqlValue } from "../lib/enquiry-db";

const require = createRequire(import.meta.url);

/** Pure JS/WASM SQLite runs in Node and Bolt's WebContainer without native addons.
 * One Node process owns each file. Use the included D1 adapter for Cloudflare.
 */
export async function openDatabase(filename: string, migrationDirectory = path.resolve("drizzle")): Promise<EnquiryDatabase> {
  const SQL = await initSqlJs({ locateFile: file => require.resolve(`sql.js/dist/${file}`) });
  const memory = filename === ":memory:";
  const database = new SQL.Database(!memory && fs.existsSync(filename) ? fs.readFileSync(filename) : undefined);
  const persist = () => {
    if (memory) return;
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    const temporary = filename + ".tmp";
    fs.writeFileSync(temporary, database.export(), { mode: 0o600 });
    fs.renameSync(temporary, filename);
  };
  database.run("CREATE TABLE IF NOT EXISTS _portable_migrations (name TEXT PRIMARY KEY)");
  for (const name of fs.readdirSync(migrationDirectory).filter(name => name.endsWith(".sql")).sort()) {
    const applied = database.exec("SELECT name FROM _portable_migrations WHERE name = ?", [name]);
    if (applied.length) continue;
    database.run("BEGIN");
    try {
      database.run(fs.readFileSync(path.join(migrationDirectory, name), "utf8"));
      database.run("INSERT INTO _portable_migrations (name) VALUES (?)", [name]);
      database.run("COMMIT");
    } catch (error) { database.run("ROLLBACK"); throw error; }
  }
  persist();
  return {
    prepare(sql) {
      let values: SqlValue[] = [];
      const statement: EnquiryStatement = {
        bind(...parameters) { values = parameters; return statement; },
        async first<T>() {
          const query = database.prepare(sql);
          try { query.bind(values); return query.step() ? query.getAsObject() as T : null; }
          finally { query.free(); }
        },
        async run() {
          database.run(sql, values);
          const changes = database.getRowsModified();
          persist();
          return { meta: { changes } };
        },
      };
      return statement;
    },
  };
}
