<script lang="ts">
	import { getContext } from 'svelte'
	import { type IDataTable } from './'
	import { cn } from '$lib/utils'
	import ArrowNext from '$lib/components/icons/ArrowNext.svelte'
	import ArrowPrev from '$lib/components/icons/ArrowPrev.svelte'
	import type { Writable } from 'svelte/store'

	const ctxTable: IDataTable = getContext('table')
	let pageSize = <Writable<number>>ctxTable.rowsPerPage
	let actualPage = <Writable<number>>ctxTable.currentPage
	let totalRows = <Writable<number>>ctxTable.totalRows
	const onFilter = ctxTable.onFilter

	const pageCount = $derived(Math.ceil($totalRows / $pageSize))

	const actualPageChangeHandler = (actualPage: number) => {
		$actualPage = actualPage
		onFilter($actualPage, $pageSize)
	}
</script>

<div class="flex gap-2" data-sveltekit-preload-data="false">
	{#if $actualPage > 1 && pageCount > 3}
		<div class="tooltip" data-tip="Előző oldal">
			<button
				onclick={() => actualPageChangeHandler($actualPage - 1)}
				disabled={$actualPage === 1}
				class={cn(
					'flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300 transition-colors',
					$actualPage !== 1 && 'hover:bg-secondary/50',
				)}
			>
				<ArrowPrev class="h-5 w-5" /></button
			>
		</div>
	{/if}
	{#each { length: pageCount } as _, i}
		{#if (i + 1 >= $actualPage - 2 && i + 1 <= $actualPage + 2) || i + 1 === 1 || i + 1 === pageCount}
			<button
				onclick={() => actualPageChangeHandler(i + 1)}
				class={cn(
					'flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300 transition-colors',
					i + 1 === $actualPage && 'bg-secondary text-neutral-300',
					i + 1 !== $actualPage && 'hover:bg-secondary/50',
				)}
				disabled={i + 1 === $actualPage}
			>
				{i + 1}
			</button>
		{:else if i + 1 === $actualPage - 3 || i + 1 === $actualPage + 3}
			<span
				class="flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300"
				>...</span
			>
		{/if}
	{/each}
	{#if $actualPage < pageCount && pageCount > 3}
		<div class="tooltip" data-tip="Következő oldal">
			<button
				onclick={() => actualPageChangeHandler($actualPage + 1)}
				class="flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300 transition-colors hover:bg-secondary/50"
			>
				<ArrowNext class="h-5 w-5" /></button
			>
		</div>
	{/if}
</div>
