<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils'
	import ArrowNext from '$lib/components/icons/ArrowNext.svelte'
	import ArrowPrev from '$lib/components/icons/ArrowPrev.svelte'
	import ArrowFirst from '$lib/components/icons/ArrowFirst.svelte'
	import ArrowLast from '$lib/components/icons/ArrowLast.svelte'
	type Props = {
		page?: number
		displayRows: number
		totalRows: number
		onNavigateTo: (page: number) => void
		onChangeDispayRows: () => void
	} & HTMLButtonAttributes
	let {
		page = $bindable(1),
		displayRows = $bindable(10),
		totalRows,
		onNavigateTo,
		onChangeDispayRows,
	}: Props = $props()
	const pageCount = $derived(Math.ceil(totalRows / displayRows))
	let rowsStart = $derived(displayRows * (page - 1) + 1)
	let rowsEnd = $derived(displayRows * (page - 1) + 1 + (displayRows - 1))

	const displayRowsItems = [
		{ value: 10, text: '10' },
		{ value: 25, text: '25' },
		{ value: 50, text: '50' },
		{ value: 100, text: '100' },
		{ value: 9999, text: 'Összes' },
	]
</script>

<div class="flex items-center justify-between text-sm">
	<div class="flex items-center gap-2">
		<select
			class="select select-bordered select-sm max-w-xs rounded-md"
			bind:value={displayRows}
			onchange={onChangeDispayRows}
		>
			{#each displayRowsItems as item}
				<option value={item.value}>
					{item.text}
				</option>
			{/each}
		</select>
		<div>sor / oldal</div>
	</div>
	<div class="">
		{rowsStart} - {rowsEnd > totalRows ? totalRows : rowsEnd} / {totalRows}
	</div>
	<div class="flex gap-2" data-sveltekit-preload-data="false">
		{#if page > 1}
			<!-- <button
				onclick={() => onNavigateTo(1)}
				disabled={page === 1}
				class={cn(
					'flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300 transition-colors',
					page !== 1 && 'hover:bg-secondary/50',
				)}
			>
				<ArrowFirst class="h-5 w-5" /></button
			> -->
			<div class="tooltip" data-tip="Előző oldal">
				<button
					onclick={() => onNavigateTo(page - 1)}
					disabled={page === 1}
					class={cn(
						'flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300 transition-colors',
						page !== 1 && 'hover:bg-secondary/50',
					)}
				>
					<ArrowPrev class="h-5 w-5" /></button
				>
			</div>
		{/if}
		{#each { length: pageCount } as _, i}
			{#if (i + 1 >= page - 2 && i + 1 <= page + 2) || i + 1 === 1 || i + 1 === pageCount}
				<button
					onclick={() => onNavigateTo(i + 1)}
					class={cn(
						'flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300 transition-colors',
						i + 1 === page && 'bg-secondary text-neutral-300',
						i + 1 !== page && 'hover:bg-secondary/50',
					)}
				>
					{i + 1}
				</button>
			{:else if i + 1 === page - 3 || i + 1 === page + 3}
				<span
					class="flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300"
					>...</span
				>
			{/if}
		{/each}
		{#if page < pageCount}
			<div class="tooltip" data-tip="Következő oldal">
				<button
					onclick={() => onNavigateTo(page + 1)}
					class="flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300 transition-colors hover:bg-secondary/50"
				>
					<ArrowNext class="h-5 w-5" /></button
				>
			</div>
			<!-- <button
				onclick={() => onNavigateTo(pageCount)}
				class="flex h-9 w-9 items-center justify-center rounded-md bg-slate-600 text-neutral-300 transition-colors hover:bg-secondary/50"
			>
				<ArrowLast class="h-5 w-5" /></button
			> -->
		{/if}
	</div>
</div>
