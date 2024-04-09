<script lang="ts">
	import Win from '$lib/components/icons/Win.svelte'
	import Apple from '$lib/components/icons/Apple.svelte'
	import Linux from '$lib/components/icons/Linux.svelte'
	import { type IOS } from 'ua-parser-js'

	type Props = {
		os: IOS
	}
	const { os }: Props = $props()

	const iconClass = 'h-7 w-7'
</script>

<div
	class="flex items-center justify-start gap-2 rounded-md bg-neutral-200 px-2 py-1 dark:bg-neutral-200 dark:text-neutral-600"
>
	<div>
		{#if os.name === 'Windows'}
			<Win class={iconClass} />
		{:else if os.name === 'Mac OS' || os.name === 'iOS'}
			<Apple class={iconClass} />
		{:else if os.name === 'Linux'}
			<Linux class={iconClass} />
		{/if}
	</div>
	<div><strong>{os.name}</strong><br />Version: {os.version}</div>
</div>
