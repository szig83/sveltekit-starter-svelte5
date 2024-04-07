<script lang="ts">
	import * as Table from '$lib/components/table'
	import { SnippetReturn } from 'svelte'

	const data = [
		['1', '2', '3', 'dfdsf', 'fdfs'],
		['4', '5', '6', 'sdsd', 'sdsd'],
		['7', '8', '9', '4t53', 'freee'],
	]
</script>

<Table.Root {data}>
	<Table.Filter />

	<div class="flex justify-between">
		<Table.DisplayRows>Egyedi display rows</Table.DisplayRows>
		<Table.RowInfo />
		<Table.Pager />
	</div>
</Table.Root>
