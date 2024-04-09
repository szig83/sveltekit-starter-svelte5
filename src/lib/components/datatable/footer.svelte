<script lang="ts">
	import type { Snippet } from 'svelte'
	import { RowsPerPageSwitcher, RowInfo, Pager } from './'
	import { cn } from '$lib/utils'

	type Props = {
		children?: Snippet
		isSticky?: boolean
		class?: string
	}

	const { children, isSticky = true, class: className }: Props = $props()
</script>

<div
	class={cn(
		isSticky && 'sticky bottom-0 z-10 bg-gradient-to-t from-base-100 from-85%',
		'flex justify-between py-3',
		className,
	)}
>
	{#if children}
		{@render children()}
	{:else}
		<RowsPerPageSwitcher />
		<RowInfo />
		<Pager />
	{/if}
</div>
