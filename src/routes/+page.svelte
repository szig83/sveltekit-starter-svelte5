<script>
	import Card from '$lib/components/Card.svelte'
	import Hero from '$lib/components/Hero.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
</script>

<Hero />

<PageTitle>Valami cím</PageTitle>
<p>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae placeat voluptas odio aut
	magnam laboriosam accusantium exercitationem debitis animi doloribus voluptate quibusdam quis
	cupiditate, commodi iusto veniam in perferendis esse.
</p>

<div class="flex justify-between gap-4">
	<Card name="mechanicer" />
	<Card name="firefighter" />
	<Card name="gardener" />
	<Card name="cop" />
</div>

<input
	type="file"
	name="file"
	accept="image/*"
	class=" h-60 w-full rounded-md border border-slate-300 bg-transparent text-transparent file:hidden"
/>
