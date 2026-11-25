<script lang="ts">
	import { onMount } from 'svelte';
	import WorkItem from './work-item.svelte';
	import { projects } from '$lib/data/projects';
	import { getGsap, prefersReducedMotion } from '$lib/util/gsap';

	let workSectionRef: HTMLElement | undefined = $state();

	onMount(() => {
		if (!workSectionRef || prefersReducedMotion()) return;
		const { gsap } = getGsap();
		const ctx = gsap.context(() => {
			gsap.from('.work-item', {
				scrollTrigger: {
					trigger: workSectionRef,
					start: 'top 85%',
					once: true
				},
				y: 16,
				duration: 0.45,
				stagger: 0.06,
				ease: 'power2.out',
				clearProps: 'transform'
			});
		}, workSectionRef);

		return () => ctx.revert();
	});
</script>

<section id="work" bind:this={workSectionRef}>
	<h2>THINGS, I WORKED ON</h2>
	<div class="work-grid">
		{#each projects as item (item.id)}
			<div class="work-item">
				<WorkItem {item} />
			</div>
		{/each}
	</div>
</section>

<style lang="scss">

	section {
		max-width: 100%;
		background-color: var(--color-bg-dark);
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: var(--spacing-l);
		padding: var(--spacing-xxl) 0;
	}

	h2 {
		grid-column: 2 / span all;
		line-height: var(--line-height-large);
	}

	.work-grid {
		grid-column: 2 / 8;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--spacing-l);
	}

	.work-item {
		height: 100%;
	}

	@media screen and (max-width: 1260px) {
		.work-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media screen and (max-width: 800px) {
		section {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-l);
			padding: var(--spacing-xxl) var(--spacing-l);
		}

		.work-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
