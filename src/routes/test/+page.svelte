<script lang="ts">
	import Footer from '$lib/components/Footer.svelte'
	import * as DataTable from '$lib/components/datatable'
	import LogListItem from './LogListItem.svelte'
	type Props = {
		data: {
			dataTable: DataTable.IDataTableDatas
		}
	}

	const { data }: Props = $props()
	let dt = $state(data.dataTable)
	let dataTable = $derived(data.dataTable)

	// $inspect('dataTable:', dataTable)

	$effect(() => {
		dt = { ...data.dataTable }
		//console.log('x', dataTable)
	})
</script>

<DataTable.Root {...dt}>
	<!-- <Table.Filter /> -->
	<DataTable.Data>
		<div class="my-3 flex flex-col gap-3">
			{#if dataTable.data && dataTable.data.length > 0}
				{#each dataTable.data! as logs, i (logs.id)}
					<LogListItem {logs} />
				{/each}
			{:else}
				<div class="text-center text-neutral-400">Nincs megjeleníthető adat.</div>
			{/if}
		</div>
	</DataTable.Data>
	<DataTable.Footer />
</DataTable.Root>
