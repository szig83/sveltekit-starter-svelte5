import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { env } from '$env/dynamic/private'
import Database from 'better-sqlite3'
const sqlite = new Database(env.DB_PATH)
export const db: BetterSQLite3Database = drizzle(sqlite)
