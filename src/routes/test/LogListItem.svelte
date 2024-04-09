<script lang="ts">
	import type { Log } from '$lib/server/db/schema/log'
	import { languageTag } from '$lib/paraglide/runtime.js'
	import { cn } from '$lib/utils'
	import * as m from '$m'
	import LogDetails from './LogDetails.svelte'
	import IconDetails from '$lib/components/icons/Details.svelte'

	type Props = {
		logs: Log
	}

	const { logs }: Props = $props()

	let showDetails = $state(false)

	const criticalError = (logs.status ?? -1) >= 500
</script>

<div
	class="transform-gpu rounded-md border-2 border-transparent bg-slate-100 px-2 py-3 text-xs transition-all duration-500 hover:border-2 hover:border-slate-400 dark:bg-slate-600"
>
	<div class="grid grid-cols-[150px_50px_minmax(0,_1fr)_100px] items-center">
		<div class="font-semibold">{new Date(logs.createdAt).toLocaleString(languageTag())}</div>
		<div>
			<div
				class={cn(
					criticalError && 'bg-red-400',
					criticalError && 'text-neutral-100',
					!criticalError && 'bg-yellow-200',
					!criticalError && 'text-neutral-600',
					'rounded-md',
					'px-2',
					'py-1',
					'inline-block',
				)}
			>
				{logs.status}
			</div>
		</div>
		<div>{logs.message}</div>
		<div class="text-right">
			<div class="tooltip" data-tip="Részletek">
				<button class="mx-1" onclick={() => (showDetails = !showDetails)}
					><IconDetails class="h-5 w-5 transition-colors hover:text-primary" /></button
				>
			</div>
		</div>
	</div>
	{#if showDetails}
		<div class="mt-4 border-t border-t-slate-500 px-3">
			<LogDetails {logs} isListDetails={true} />
		</div>
	{/if}
</div>
