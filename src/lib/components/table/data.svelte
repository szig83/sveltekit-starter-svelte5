<script lang="ts">
	// type Column = string | number

	// type DataSet = Column[]

	// type Props = {
	// 	data: DataSet[]
	// 	rowCount?: number
	// }
	// const { data, rowCount = $bindable(0) }: Props = $props()
	// const columnCount = $derived(data[0].length)
</script>

<!-- 
<div>filter</div>

<div class="flex flex-col gap-2">
	{#each data as row}
		<div class="w-100 flex gap-3">
			{#each row as cell}<div
					class="flex flex-1 items-center justify-center rounded-sm bg-slate-300 p-3"
				>
					{cell}
				</div>
			{/each}
		</div>
	{/each}
</div> -->

{#snippet data(row)}
	{#each row as cell}<div
			class="flex flex-1 items-center justify-center rounded-sm bg-slate-300 p-3"
		>
			{cell}
		</div>
	{/each}
{/snippet}
