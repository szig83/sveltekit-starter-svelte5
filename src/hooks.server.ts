import type { Handle, HandleServerError } from '@sveltejs/kit'
import { i18n } from '$lib/i18n.js'
import { sequence } from '@sveltejs/kit/hooks'
import { createLogger, transports, format } from 'winston'

const { combine, timestamp, label, prettyPrint, colorize } = format

export const i18nHandle = i18n.handle()

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	console.error(error)
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

export const customHandle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event)
	return response
}

export const handle = sequence(i18nHandle, customHandle)
