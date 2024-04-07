<script lang="ts">
	import { sourceLanguageTag } from '$paraglide/runtime'
	import * as m from '$m'

	let { data } = $props()

	const imgLink = $derived(`/images/${data.slug}.jpg`)
	const cardTitle = $derived(data.slug.charAt(0).toUpperCase() + data.slug.slice(1))
	const navLink = $derived(() => {
		return data.lang === sourceLanguageTag ? `/` : `/${data.lang}`
	})

	// let x = y / 0
</script>

<h1 style={`view-transition-name: card-title-${data.slug}`}>{cardTitle}</h1>
<div class="flex gap-4">
	<img
		class="w-96 rounded-2xl"
		src={imgLink}
		alt={data.slug}
		style={`view-transition-name: card-image-${data.slug}`}
	/>

	<div>
		<p class="grow">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ipsam aspernatur, cumque
			tempora facere molestias eligendi eaque deserunt fugit animi sequi ullam optio necessitatibus
			quasi? Minus, ipsa enim? Voluptas, illum.
		</p>
		<a class="btn btn-primary mt-6" href={navLink()}>{m.btnBack()}</a>
	</div>
</div>
