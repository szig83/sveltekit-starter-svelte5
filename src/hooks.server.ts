import type { Handle } from '@sveltejs/kit'
import { i18n } from '$lib/i18n.js'
import { sequence } from '@sveltejs/kit/hooks'

export const i18nHandle = i18n.handle()

export const customHandle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event)
	return response
}

export const handle = sequence(i18nHandle, customHandle)
