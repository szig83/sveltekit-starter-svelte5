import { redirect, fail } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	return {}
}

export const actions = {
	uploadFile: async ({ request }) => {
		await new Promise((resolve) => setTimeout(resolve, 3000))
		return { status: 'OK' }
	},
}
