<script lang="ts">
	import type { Snippet } from 'svelte'
	import { setContext, getAllContexts, getContext, tick } from 'svelte'
	import { writable, type Writable } from 'svelte/store'
	import { goto } from '$app/navigation'
	import type { IDataTableDatas, IDataTable } from '.'
	let loaded = $state(false)
	type Props = {
		children: Snippet
	} & IDataTableDatas
	const { children, ...restProps }: Props = $props()

	let { rowsPerPage, currentPage, totalRows } = $derived(restProps)

	const onFilter = (page: number, displayRows: number) => {
		const filterObject = {
			from: '',
			to: '',
			page: 1,
			displayRows: displayRows,
		}

		// let filterParams = []
		// if (filterFrom) {
		// 	filterParams.push(`from=${filterFrom}`)
		// 	filterObject.from = filterFrom
		// }
		// if (filterTo) {
		// 	filterParams.push(`to=${filterTo}`)
		// 	filterObject.to = filterTo
		// }
		// if (!resetPageFilter) {
		// 	filterParams.push(`page=${filterPage}`)
		// 	filterObject.page = filterPage
		// }
		if (displayRows) {
			// filterParams.push(`displayRows=${displayRows}`)
			filterObject.displayRows = displayRows
		}
		if (page) {
			// filterParams.push(`displayRows=${displayRows}`)
			filterObject.page = page
		}
		// const filter = btoa(JSON.stringify(filterObject))
		const filter = JSON.stringify(filterObject)
		//goto(`?${filterParams.join('&')}`)
		//console.log('filter:', filter)
		goto(`?filter=${filter}`, { replaceState: true, invalidateAll: true })
	}

	$effect(() => {
		let ctxTable: IDataTable = getContext('table')
		let _rowsPerPage = <Writable<number>>ctxTable.rowsPerPage
		let _currentPage = <Writable<number>>ctxTable.currentPage
		let _totalRows = <Writable<number>>ctxTable.totalRows

		_totalRows.set(<number>totalRows)
		_rowsPerPage.set(<number>rowsPerPage)
		_currentPage.set(<number>currentPage)
		loaded = true
	})

	const ctxTable = {
		rowsPerPage: writable(0),
		currentPage: writable(0),
		totalRows: writable(0),
		onFilter: onFilter,
	} as IDataTable
	setContext('table', ctxTable)
</script>

<!-- {#if loaded} -->
{@render children()}
<!-- {:else}
	<div>Loading...</div>
{/if} -->
