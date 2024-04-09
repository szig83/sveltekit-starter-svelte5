import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db/'
import { log } from '$lib/server/db/schema/log'
import { desc, count, between } from 'drizzle-orm'
import type { SQLiteSelect } from 'drizzle-orm/sqlite-core'
import { redirect } from '@sveltejs/kit'
import type { IDataTableDatas } from '$lib/components/datatable'

export const load: PageServerLoad = async ({ url }) => {
	console.log('lista adatlekérés')

	const paramDisplayRows = url.searchParams.get('displayRows')
	const paramTo = url.searchParams.get('to')
	const paramFrom = url.searchParams.get('from')
	const paramPage = url.searchParams.get('page')

	const filter = url.searchParams.get('filter')

	let parsedFilter: {
		from?: string
		to?: string
		page?: number
		displayRows?: number
	} = {}

	let pageSize = 10
	let to = new Date()
	let from = new Date('2000-01-01')
	let page = 1

	if (filter) {
		// const decodedFilter = atob(filter)
		const decodedFilter = filter
		parsedFilter = JSON.parse(decodedFilter)
		if (parsedFilter.from || parsedFilter.from === 'undefined') {
			if (parsedFilter.from !== 'undefined') {
				from = new Date(parsedFilter.from)
			}
		}
		if (parsedFilter.to || parsedFilter.to === 'undefined') {
			if (parsedFilter.to !== 'undefined') {
				to = new Date(parsedFilter.to)
			}
		}
		if (parsedFilter.page) {
			page = parsedFilter.page
		}
		if (parsedFilter.displayRows) {
			pageSize = parsedFilter.displayRows
		}
	}

	const originalUrlWithoutQuery = url.pathname

	// if (paramDisplayRows) {
	// 	pageSize = parseInt(paramDisplayRows)
	// }

	// if (paramPage && parseInt(paramPage) > 0) {
	// 	page = parseInt(paramPage)
	// }

	// if (paramTo || paramTo === 'undefined') {
	// 	if (paramTo !== 'undefined') {
	// 		to = new Date(paramTo)
	// 	}
	// }

	// if (paramFrom) {
	// 	if (paramFrom !== 'undefined') {
	// 		from = new Date(paramFrom)
	// 	}
	// }

	if (to.toString() === 'Invalid Date' || from.toString() === 'Invalid Date') {
		redirect(307, originalUrlWithoutQuery)
	}

	function withIntervalFilter<T extends SQLiteSelect>(
		qb: T,
		from: Date = new Date(),
		to: Date = new Date(),
	) {
		return qb.where(between(log.createdAt, from, to))
	}

	function withPagination<T extends SQLiteSelect>(qb: T, page: number, pageSize: number = 10) {
		return qb.limit(pageSize).offset((page - 1) * pageSize)
	}

	const totalRows = db.select({ count: count() }).from(log)
	const totalRowsDynamicQuery = totalRows.$dynamic()
	const filteredTotalRows = await withIntervalFilter(totalRowsDynamicQuery, from, to)

	if (filteredTotalRows[0].count < (page - 1) * pageSize + 1) {
		page = 1
	}

	const logs = db.select().from(log).orderBy(desc(log.createdAt))
	const logsDynamicQuery = logs.$dynamic()
	const filteredLogs = await withPagination(
		withIntervalFilter(logsDynamicQuery, from, to),
		page,
		pageSize,
	)

	return {
		dataTable: {
			data: filteredLogs,
			totalRows: filteredTotalRows[0].count,
			currentPage: page,
			rowsPerPage: pageSize,
		} as IDataTableDatas,
	}
}
