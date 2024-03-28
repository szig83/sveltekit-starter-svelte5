import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params: { slug }, locals }) => {
	console.log(locals)
	return {
		lang: locals.paraglide.lang,
		slug,
	}
}
