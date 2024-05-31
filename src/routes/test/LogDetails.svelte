<script lang="ts">
	import type { Log } from '../../database/schema/log'
	import { languageTag } from '$lib/paraglide/runtime.js'
	import { cn } from '$lib/utils'
	import * as m from '$m'
	import UAParser from 'ua-parser-js'

	import TagOs from './TagOs.svelte'
	import TagBrowser from './TagBrowser.svelte'
	import TagData from './TagData.svelte'
	import { dev } from '$app/environment'

	type Props = {
		logs: Log
		isListDetails?: boolean
	}

	const { logs, isListDetails = false }: Props = $props()

	let showStack = $state(false)

	const criticalError = (logs.status ?? -1) >= 500
	const parser = new UAParser(logs.userAgent ?? '')

	const userAgentInfo = parser.getResult()
</script>

{#snippet logHeader()}
	<div class="mb-2 flex items-center justify-between gap-1">
		<div class="inline-block rounded-md bg-slate-400 px-2 py-1 text-xs text-slate-200">
			{new Date(logs.createdAt).toLocaleString(languageTag())}
		</div>
		<div
			class={cn(
				criticalError && 'bg-red-700',
				!criticalError && 'bg-yellow-600',
				'rounded-md',
				'px-2',
				'py-1',
			)}
		>
			{logs.status}
		</div>
	</div>
{/snippet}

{#snippet tagDataBlock()}
	<div class="flex gap-2">
		<TagData label="id" value={logs.id.toString()} />
		{#if logs.url}
			<TagData label="url" value={logs.url} />
		{/if}
		{#if logs.ip}
			<TagData label="ip" value={logs.ip} />
		{/if}
		<TagData label="environment" value={dev ? 'dev' : 'prod'} />
	</div>
{/snippet}

{#snippet tagOsBrowserBlock()}
	{#if logs.userAgent && logs.userAgent !== ''}
		<div class="flex items-start gap-2 py-2">
			{#if userAgentInfo.os.name}
				<TagOs os={userAgentInfo.os} />
			{/if}
			{#if userAgentInfo.browser.name}
				<TagBrowser browser={userAgentInfo.browser} />
			{/if}
		</div>
	{/if}
{/snippet}

<div
	class={cn('rounded-md  py-3 text-xs ', !isListDetails && 'bg-slate-200 px-2 dark:bg-slate-600')}
>
	{#if !isListDetails}
		{@render logHeader()}
	{/if}

	<code class={cn('block overflow-auto whitespace-nowrap', !isListDetails && 'p-2')}>
		{#if !isListDetails}
			<div class="font-semibold">
				{m.error()}: <span class="text-red-400">{logs.message}</span>
			</div>
		{:else}
			Error stack:
		{/if}

		<div class="pl-3 text-xs">
			{#each JSON.parse(logs.stack as string) as stack}
				<div>
					{#if stack.functionName}
						at {stack.functionName}
						<span class="text-slate-400"
							>({stack.fileName}:<span class="text-primary">{stack.line}</span>:<span
								class="text-primary">{stack.char}</span
							>)</span
						>
					{/if}
				</div>
			{/each}
		</div>
	</code>
	<div class="mt-3 flex flex-col gap-1">
		{@render tagOsBrowserBlock()}

		{@render tagDataBlock()}
	</div>
</div>
