<script lang="ts">
	import ThemeToggleIcon from './ThemeToggleIcon.svelte'
	import * as m from '$m'
</script>

<header class="navbar sticky top-0 bg-base-200">
	<div class="flex-1">
		<a class="text-xl" href="/">{m.app_title()}</a>
	</div>
	<nav class="flex-none">
		<ul class="menu menu-horizontal items-center px-1">
			<li><a class="btn btn-ghost" href="/about">{m.about()}</a></li>
			<li>
				<button onclick={window.toggleTheme}><ThemeToggleIcon class="w-4" /></button>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	header {
		view-transition-name: header;
	}
</style>
