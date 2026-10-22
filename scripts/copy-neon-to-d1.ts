/**
 * One-off Neon -> D1 copy (Cloudflare migration, October 2026).
 *
 *   tsx scripts/copy-neon-to-d1.ts <json-dir> <out.sql>
 *
 * <json-dir> holds one JSON array per Postgres table (proverbs.json, users.json,
 * comments.json, likes.json, _UserFavorites.json, _UserLikes.json), exported with
 * `select json_agg(t) from <table> t`. Rows are written through the SQLite Prisma
 * client into a local database built from migrations/, so Prisma does the type
 * conversion, then dumped as INSERTs for `wrangler d1 execute --remote --file`.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import Database from "better-sqlite3";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../lib/generated/prisma-node/client";

type Row = Record<string, unknown>;

const [jsonDir, outFile] = process.argv.slice(2);
if (!jsonDir || !outFile) {
  console.error("usage: copy-neon-to-d1.ts <json-dir> <out.sql>");
  process.exit(1);
}

const read = (table: string): Row[] => {
  const file = join(jsonDir, `${table}.json`);
  if (!existsSync(file)) return [];
  return (JSON.parse(readFileSync(file, "utf8") || "null") as Row[] | null) ?? [];
};

// Postgres `timestamp(3)` (no zone) holds UTC, which is how Prisma wrote it.
const utc = (v: unknown) => new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(String(v)) ? String(v) : `${v}Z`);

const TABLES = ["users", "proverbs", "comments", "likes", "_UserFavorites", "_UserLikes"];

async function main() {
  const dbFile = join(mkdtempSync(join(tmpdir(), "ap-copy-")), "copy.db");
  const sqlite = new Database(dbFile);
  sqlite.exec(readFileSync(join(__dirname, "../migrations/0001_init.sql"), "utf8"));
  sqlite.close();

  const prisma = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: `file:${dbFile}` }) });
  for (const u of read("users"))
    await prisma.user.create({
      data: { id: u.id as string, name: u.name as string | null, email: u.email as string | null, role: u.role as "ADMIN" | "USER", createdAt: utc(u.created_at), updatedAt: utc(u.updated_at) },
    });
  // Insertion order is kept: the homepage's findFirst() has no orderBy.
  for (const p of read("proverbs"))
    await prisma.proverb.create({
      data: { id: p.id as string, text: p.text as string, region: p.region as never, country: p.country as never, tribe: p.tribe as never, category: p.category as never, createdAt: utc(p.created_at), updatedAt: utc(p.updated_at) },
    });
  for (const c of read("comments"))
    await prisma.comment.create({
      data: { id: c.id as string, text: c.text as string, userId: c.userId as string, proverbId: c.proverbId as string, createdAt: utc(c.createdAt) },
    });
  for (const l of read("likes"))
    await prisma.like.create({
      data: { id: l.id as string, userId: l.userId as string, proverbId: l.proverbId as string, createdAt: utc(l.createdAt) },
    });
  // Implicit many-to-many: A = Proverb id, B = User id.
  for (const rel of ["_UserFavorites", "_UserLikes"] as const)
    for (const r of read(rel))
      await prisma.$executeRawUnsafe(`INSERT INTO "${rel}" ("A","B") VALUES (?, ?)`, r.A, r.B);
  await prisma.$disconnect();

  let sql = "PRAGMA defer_foreign_keys = true;\n";
  for (const t of TABLES) {
    sql += `DELETE FROM "${t}";\n`;
  }
  for (const t of TABLES) {
    sql += execFileSync("sqlite3", ["-cmd", `.mode insert "${t}"`, dbFile, `SELECT * FROM "${t}" ORDER BY rowid`], { encoding: "utf8" });
  }
  writeFileSync(outFile, sql, { mode: 0o600 });
  const counts = Object.fromEntries(TABLES.map((t) => [t, read(t).length]));
  console.log(JSON.stringify({ out: outFile, counts }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
