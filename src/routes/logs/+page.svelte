<script lang="ts">
	import type { Log } from '../../database/schema/log'
	import { goto } from '$app/navigation'
	import LogListItem from './LogListItem.svelte'
	import LogFilter from './LogFilter.svelte'
	import Pager from './Pager.svelte'
	import { page } from '$app/stores'

	type Props = {
		data: {
			logs: Log[]
			totalRows: number
			page: number
			paramTo: string
			paramFrom: string
			pageSize: number
		}
	}

	const { data }: Props = $props()

	let displayRows = $state(1)
	let filterFrom = $state('')
	let filterTo = $state('')
	let filterPage = $state(data.page)

	const filter = (resetPageFilter = true) => {
		const filterObject = {
			from: '',
			to: '',
			page: 1,
			displayRows: displayRows,
		}
		console.log(filterFrom, filterTo)
		let filterParams = []
		if (filterFrom) {
			filterParams.push(`from=${filterFrom}`)
			filterObject.from = filterFrom
		}
		if (filterTo) {
			filterParams.push(`to=${filterTo}`)
			filterObject.to = filterTo
		}
		if (!resetPageFilter) {
			filterParams.push(`page=${filterPage}`)
			filterObject.page = filterPage
		}
		if (displayRows) {
			filterParams.push(`displayRows=${displayRows}`)
			filterObject.displayRows = displayRows
		}
		const filter = btoa(JSON.stringify(filterObject))
		// const filter = JSON.stringify(filterObject)
		//goto(`?${filterParams.join('&')}`)
		goto(`?filter=${filter}`)
	}

	const filterReset = () => {
		// filterFrom = ''
		// filterTo = ''
		// filterPage = 1
		// filter()
		goto('/logs')
	}

	const navigateTo = (page: number) => {
		filterPage = page
		filter(false)
	}

	$effect(() => {
		console.log(data)
		filterTo = data.paramTo
		filterFrom = data.paramFrom
		displayRows = data.pageSize
	})
</script>

<div class="relative">
	<div class="sticky top-20 z-10 bg-gradient-to-b from-base-100 from-85%">
		<LogFilter bind:filterFrom bind:filterTo onFilter={filter} onFilterReset={filterReset} />
	</div>

	<div class="my-3 flex flex-col gap-3">
		{#each data.logs as logs, i (logs.id)}
			<LogListItem {logs} />
		{/each}
	</div>
	<div class="sticky bottom-0 z-10 bg-gradient-to-t from-base-100 from-85% py-3">
		<Pager
			bind:displayRows
			totalRows={data.totalRows}
			page={data.page}
			onNavigateTo={(page) => navigateTo(page)}
			onChangeDispayRows={filter}
		/>
	</div>
</div>
