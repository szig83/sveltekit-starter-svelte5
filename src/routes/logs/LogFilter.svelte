<script lang="ts">
	import { goto } from '$app/navigation'
	import { redirect } from '@sveltejs/kit'

	//let filterFrom = $state()
	// let filterTo = $state()
	// const filter = () => {
	// 	console.log(filterFrom, filterTo)

	// 	goto(`?from=${filterFrom}&to=${filterTo}`)
	// }

	// const filterReset = () => {
	// 	filterFrom = ''
	// 	filterTo = ''
	// 	goto('/logs')
	// }

	type Props = {
		filterFrom?: string
		filterTo?: string
		onFilter: () => void
		onFilterReset: () => void
	}

	let {
		filterFrom = $bindable(),
		filterTo = $bindable(),
		onFilter,
		onFilterReset,
	}: Props = $props()
</script>

<div class="flex items-end gap-3 py-5">
	<label class="form-control w-full max-w-xs">
		<span class="label-text mb-2">Dátum(tól)</span>
		<input
			bind:value={filterFrom}
			type="datetime-local"
			class="input input-bordered w-full max-w-xs"
			name="filterFrom"
		/>
	</label>

	<label class="form-control w-full max-w-xs">
		<span class="label-text mb-2">Dátum(ig)</span>
		<input
			bind:value={filterTo}
			type="datetime-local"
			class="input input-bordered w-full max-w-xs"
			name="filterTo"
		/>
	</label>

	<button class="btn btn-primary" onclick={onFilter}>Szűrés</button>
	<button type="reset" class="btn btn-error" onclick={onFilterReset}>Visszaállítás</button>
</div>
