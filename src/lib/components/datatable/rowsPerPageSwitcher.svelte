<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { IDataTable } from '.'
	import { getContext } from 'svelte'
	import { tick } from 'svelte'
	import { fade } from 'svelte/transition'
	import { type Writable } from 'svelte/store'

	type Props = {
		children?: Snippet
		displayRowsItems?: { value: number; text: string }[]
	}
	const {
		children,
		displayRowsItems = [
			{ value: 5, text: '5' },
			{ value: 10, text: '10' },
			{ value: 25, text: '25' },
			{ value: 50, text: '50' },
			{ value: 100, text: '100' },
			{ value: 9999, text: 'Összes' },
		],
	}: Props = $props()

	let loaded = $state(false)

	const ctxTable: IDataTable = getContext('table')

	let rowsPerPage = <Writable<number>>ctxTable.rowsPerPage
	let currentPage = <Writable<number>>ctxTable.currentPage

	const onFilter = ctxTable.onFilter

	const onchange = () => {
		$currentPage = 1
		onFilter(1, $rowsPerPage)
	}

	$effect(() => {
		tick().then(() => {
			loaded = true
		})
	})
</script>

{#if loaded}
	<div class="flex items-center gap-2" transition:fade>
		<select
			class="select select-bordered select-sm max-w-xs rounded-md"
			bind:value={$rowsPerPage}
			{onchange}
		>
			{#each displayRowsItems as item}
				<option value={item.value}>
					{item.text}
				</option>
			{/each}
		</select>
		<div>sor / oldal</div>
	</div>
{:else}
	<div></div>
{/if}
