<script lang="ts">
	import * as m from '$m'
</script>

<div class="hero mb-6 min-h-96 rounded-xl" style="background-image: url(hero.jpg);">
	<div class="hero-overlay rounded-xl bg-opacity-60"></div>
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">{m.helloBello()}</h1>
			<p class="mb-5">
				{m.valami()}, sit amet consectetur adipisicing elit. Voluptatibus odio magni explicabo
				aliquid, asperiores consequuntur cupiditate cum vel praesentium cumque illum sed quam,
				accusantium ad minima culpa iste. Aliquid, nam.
			</p>
			<button class="btn btn-primary">{m.btnDetails()}</button>
		</div>
	</div>
</div>
