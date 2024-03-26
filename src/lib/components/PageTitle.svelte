<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		children: Snippet
	}
	const { children }: Props = $props()
</script>

<h1 class="font-head font-semibold">{@render children()}</h1>
