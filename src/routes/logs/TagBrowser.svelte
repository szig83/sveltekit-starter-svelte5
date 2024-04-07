<script lang="ts">
	import Chrome from '$lib/components/icons/Chrome.svelte'
	import Firefox from '$lib/components/icons/Firefox.svelte'
	import Brave from '$lib/components/icons/Brave.svelte'
	import Safari from '$lib/components/icons/Safari.svelte'
	import { type IBrowser } from 'ua-parser-js'

	type Props = {
		browser: IBrowser
	}
	const { browser }: Props = $props()

	const browserName = browser.name ?? ''
	const browserVersion = browser.version ?? ''

	const iconClass = 'h-7 w-7'
</script>

<div
	class="flex items-center justify-start gap-2 rounded-md bg-neutral-200 px-2 py-1 dark:bg-neutral-200 dark:text-neutral-600"
>
	<div>
		{#if browserName.includes('Chrome')}
			<Chrome class={iconClass} />
		{:else if browserName.includes('Brave')}
			<Brave class={iconClass} />
		{:else if browserName.includes('Firefox')}
			<Firefox class={iconClass} />
		{:else if browserName.includes('Safari')}
			<Safari class={iconClass} />
		{/if}
	</div>
	<div><strong>{browser.name}</strong><br />Version: {browser.version}</div>
</div>
