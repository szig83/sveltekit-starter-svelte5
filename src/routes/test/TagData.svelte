<script lang="ts">
	type Props = {
		label: string
		value: string
	}
	const { label, value }: Props = $props()
</script>

<div class="inline-block">
	<div class="flex overflow-hidden rounded-md dark:text-neutral-600">
		<div class="bg-neutral-300 px-2 py-1 dark:bg-neutral-300">{label}</div>
		<div class="bg-neutral-200 px-2 py-1 dark:bg-neutral-200">{value}</div>
	</div>
</div>
