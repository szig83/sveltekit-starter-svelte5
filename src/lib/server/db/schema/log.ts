import { sql } from 'drizzle-orm'
import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core'

export const log = sqliteTable(
	'log',
	{
		id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
		status: integer('status'),
		message: text('message'),
		stack: text('stack'),
		userAgent: text('user_agent'),
		url: text('url'),
		ip: text('ip'),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.$defaultFn(() => new Date())
			.notNull(),
	},
	(log) => ({
		createdAtIdx: index('createdAtIdx').on(log.createdAt),
	}),
)

export type Log = typeof log.$inferSelect // return type when queried
