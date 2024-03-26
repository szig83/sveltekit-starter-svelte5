<script lang="ts">
	import { languageTag, sourceLanguageTag } from '$paraglide/runtime'
	import * as m from '$m'
	type Props = {
		name: string
		title?: string
		img?: string
		text?: string
		link?: string
	}
	const { title, img, text, link, name }: Props = $props()
	const cardTitle = $derived((title || name).charAt(0).toUpperCase() + (title || name).slice(1))
	const lang = $derived(languageTag())
	const navLink = $derived((name: string) => {
		return lang === sourceLanguageTag ? `/hero/${name}` : `${lang}/hero/${name}`
	})
</script>

<div class="card glass my-4 w-96 bg-base-100 shadow">
	<figure>
		<a href={navLink(name)}>
			<img
				src={`/images/${name}.jpg`}
				alt={name}
				style={`view-transition-name: card-image-${name}`}
			/>
		</a>
	</figure>
	<div class="card-body">
		<h2 class="card-title" style={`view-transition-name: card-title-${name}`}>{cardTitle}</h2>
		<p>
			{text || 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'}
		</p>
		<div class="card-actions justify-end">
			<a class="btn btn-primary" href={navLink(name)}>{m.btnDetails()}</a>
		</div>
	</div>
</div>

<style lang="postcss">
	.card-title::first-letter {
		text-transform: uppercase;
	}
</style>
