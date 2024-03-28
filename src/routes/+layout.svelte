<script lang="ts">
	import '$styles/app.css'
	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit'
	import { i18n } from '$lib/i18n.js'
	import '@fontsource-variable/inter'
	import '@fontsource-variable/oswald'
	import { onNavigate } from '$app/navigation'
	import type { Snippet } from 'svelte'

	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	type Props = {
		children: Snippet
	}
	const { children }: Props = $props()

	const title = $state('Weboldal title')

	onNavigate((navigation) => {
		if (document.startViewTransition && navigation.from?.url.href !== navigation.to?.url.href) {
			if (navigation.delta && navigation.delta < 0) {
				document.documentElement.dataset.back = 'true'
			} else {
				document.documentElement.removeAttribute('data-back')
			}

			return new Promise((resolve) => {
				document.startViewTransition &&
					document.startViewTransition(async () => {
						resolve()
						await navigation.complete
					})
			})
		}
	})
	$effect(() => {
		// Add data-testid now that our app is hydrated
		// We have Playwright "wait" for this before starting the tests
		document.documentElement.dataset.testid = 'hydrated'
	})
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<ParaglideJS {i18n}>
	<Header />
	<main class="container grow pt-5">
		{@render children()}
	</main>
	<Footer />
</ParaglideJS>

<style>
	:global(h1) {
		@apply text-3xl font-bold mb-4;
	}
</style>
