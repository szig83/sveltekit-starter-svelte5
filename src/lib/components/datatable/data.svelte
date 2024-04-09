<script lang="ts">
	import type { Snippet } from 'svelte'

	// import { type Table } from './'
	// type Column = string | number

	type Props = {
		children?: Snippet
	}
	const { children }: Props = $props()

	// import { getContext } from 'svelte'
	// const ctxTable = <Table>getContext('table')
</script>

{#if children}
	{@render children()}
{:else}
	<div>default data visualizer</div>
{/if}

<!-- 
<div class="flex flex-col gap-2">
	{#each data as row, i}
		{#if i <= displayRows}
			<div class="w-100 flex gap-3">
				{#each row as cell}<div
						class="flex flex-1 items-center justify-center rounded-sm bg-slate-300 p-3 text-slate-800"
					>
						{cell}
					</div>
				{/each}
			</div>
		{/if}
	{/each}
</div> -->

<!-- {#snippet data(row)}
	{#each row as cell}<div
			class="flex flex-1 items-center justify-center rounded-sm bg-slate-300 p-3"
		>
			{cell}
		</div>
	{/each}
{/snippet} -->
