<script lang="ts">
	import { type IDataTable } from './'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'

	const ctxTable: IDataTable = getContext('table')

	const rowsPerPage = <Writable<number>>ctxTable.rowsPerPage
	const currentPage = <Writable<number>>ctxTable.currentPage
	let totalRows = $derived(<Writable<number>>ctxTable.totalRows)

	let rowsStart = $derived($rowsPerPage * ($currentPage - 1) + 1)
	let rowsEnd = $derived($rowsPerPage * ($currentPage - 1) + 1 + ($rowsPerPage - 1))
</script>

<div class="">
	{rowsStart} - {rowsEnd > $totalRows ? $totalRows : rowsEnd} / {$totalRows}
</div>
