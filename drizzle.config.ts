import type { Config } from 'drizzle-kit'

export default {
	schema: './src/database/schema/**/*.ts',
	out: './src/database/migrations',
	driver: 'better-sqlite',
	dbCredentials: { url: process.env.DB_PATH ?? './sqlite.db' },
	verbose: true,
	strict: true,
} satisfies Config
