<script lang="ts">
	import type { Snippet } from 'svelte'

	type Column = string | number

	type DataSet = Column[]

	type Props = {
		children: Snippet
		data: DataSet[]
	}
	const { children, data }: Props = $props()
</script>

{@render children()}

<!-- <div>filter</div>
<div>adatok</div>
<div>lábléc</div> -->
