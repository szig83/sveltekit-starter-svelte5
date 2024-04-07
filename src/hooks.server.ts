import type { Handle, HandleServerError } from '@sveltejs/kit'
import { i18n } from '$lib/i18n.js'
import { sequence } from '@sveltejs/kit/hooks'
import { createLogger, transports, format } from 'winston'
import { db } from '$lib/server/db/'
import { log } from '$lib/server/db/schema/log'

const { combine, timestamp, prettyPrint, colorize } = format

export const i18nHandle = i18n.handle()

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	const userAgent = event.request.headers.get('user-agent') ?? ''

	if (error) {
		const message: string = (error as Error).message
		const stackLines = (error as Error).stack!.split('\n').map((line) => line.trim())
		const parsedStack = stackLines.slice(1).map((full) => {
			const match = full.match(/at\s+(.*?)\s+\((.*?):(\d+):(\d+)\)/)
			if (match) {
				const [_, functionName, fileName, line, char] = match
				return { full, functionName, fileName, line, char }
			} else {
				const matchWithoutFunction = full.match(/at\s+(.*?):(\d+):(\d+)/)
				if (matchWithoutFunction) {
					const [_, fileName, line, char] = matchWithoutFunction
					return { full, functionName: '', fileName, line, char }
				} else {
					return { full }
				}
			}
		})
		try {
			const stack = JSON.stringify(parsedStack)
			await db.insert(log).values({
				message,
				stack,
				status,
				userAgent,
				url: event.request.url,
				ip: event.getClientAddress(),
			})
		} catch (error) {
			const logger = createLogger({
				format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), prettyPrint()),
				transports: [
					new transports.Console({
						format: colorize({ all: true }),
					}),
					new transports.File({ filename: './logs/combined.log' }),
				],
			})
			logger.error(error)
		}
	}
}

export const customHandle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event)
	return response
}

export const handle = sequence(i18nHandle, customHandle)
