import type { Config } from 'drizzle-kit'

export default {
	schema: './src/lib/server/db/schema/**/*.ts',
	out: './src/lib/server/db/migrations',
	driver: 'better-sqlite',
	dbCredentials: { url: process.env.DB_PATH ?? './database/sqlite.db' },
	verbose: true,
	strict: true,
} satisfies Config
