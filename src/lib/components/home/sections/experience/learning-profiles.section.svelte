<script lang="ts">
	import { onMount } from 'svelte';
	import { socialProfiles } from '$lib/data/profile';
	import { getGsap, prefersReducedMotion } from '$lib/util/gsap';

	let directoryRef: HTMLElement | undefined = $state();

	onMount(() => {
		if (!directoryRef || prefersReducedMotion()) return;

		const { gsap, ScrollTrigger } = getGsap();
		const ctx = gsap.context(() => {
			gsap.from('.directory-entry', {
				scrollTrigger: {
					trigger: directoryRef,
					start: 'top 85%',
					once: true
				},
				y: 12,
				duration: 0.4,
				stagger: 0.08,
				ease: 'power2.out',
				clearProps: 'transform'
			});
		}, directoryRef);

		ScrollTrigger.refresh();

		return () => ctx.revert();
	});
</script>

<div id="learning-profiles" class="profiles-section" bind:this={directoryRef}>
	<div class="section-header">
		<h3>SECURITY LEARNING PROFILES</h3>
		<p class="section-subtitle">
			Public platforms where I publish tools, document research, and practice offensive &amp;
			defensive labs.
		</p>
	</div>

	<div class="directory-grid">
		{#each socialProfiles as item, idx (item.id)}
			<a
				class="directory-entry"
				href={item.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="{item.label} profile ({item.handle}) — opens in new tab"
			>
				<div class="entry-top">
					<div class="entry-brand">
						<span class="entry-index">{String(idx + 1).padStart(2, '0')}</span>
						<span class="entry-logo" aria-hidden="true">
							{#if item.id === 'github'}
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"
									/>
								</svg>
							{:else if item.id === 'linkedin'}
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
									/>
								</svg>
							{:else if item.id === 'hackthebox'}
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm0 2.3l6.1 3.5L12 11.3 5.9 7.8 12 4.3zM5.5 9.6l5.5 3.2v6.6l-5.5-3.2V9.6zm13 6.6L13 19.4v-6.6l5.5-3.2v6.6z"
									/>
								</svg>
							{:else}
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M19.5 11.2a3.8 3.8 0 0 0-3.2-1.8 4.4 4.4 0 0 0-8.4-1.3A3.9 3.9 0 0 0 3 11.9 4.1 4.1 0 0 0 7.1 16h11.3a3.6 3.6 0 0 0 1.1-4.8zM10.5 13.5H8v-2h2.5v2zm5.5 0h-3.5v-2H16v2z"
									/>
								</svg>
							{/if}
						</span>
						<span class="entry-name">{item.label}</span>
					</div>
					<span class="entry-arrow" aria-hidden="true">↗</span>
				</div>

				<p class="entry-handle">{item.handle}</p>
				<p class="entry-desc">{item.description}</p>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.profiles-section {
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 16%, transparent);
		padding-top: var(--spacing-xxl);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);

		h3 {
			font-size: 0.95rem;
			letter-spacing: var(--letter-spacing-l);
			color: var(--color-primary);
			font-weight: 700;
		}
	}

	.section-subtitle {
		font-size: 0.9rem;
		color: var(--color-light-fade);
		line-height: var(--line-height-large);
		letter-spacing: var(--letter-spacing-s);
		max-width: 680px;
	}

	.directory-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--spacing-xl) 3rem;
	}

	.directory-entry {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: var(--spacing-m) 0 var(--spacing-l);
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 18%, transparent);
		text-decoration: none;
		letter-spacing: var(--letter-spacing-s);
		position: relative;
		transition: border-color 0.2s ease;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -1px;
			width: 0;
			height: 2px;
			background-color: var(--color-primary);
			transition: width 0.25s ease;
		}

		&:hover,
		&:focus-visible {
			&::after {
				width: 100%;
			}

			.entry-arrow {
				color: var(--color-secondary);
				transform: translate(3px, -3px);
			}
		}
	}

	.entry-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-m);
	}

	.entry-brand {
		display: flex;
		align-items: center;
		gap: var(--spacing-s);
	}

	.entry-index {
		font-size: var(--font-size-small);
		font-weight: 700;
		color: var(--color-secondary);
		letter-spacing: var(--letter-spacing-m);
	}

	.entry-logo {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
	}

	.entry-name {
		font-size: var(--font-size-h3);
		font-weight: 700;
		color: var(--color-primary);
	}

	.entry-arrow {
		font-size: 1.2rem;
		color: var(--color-primary);
		transition:
			transform 0.2s ease,
			color 0.2s ease;
	}

	.entry-handle {
		font-size: var(--font-size-small);
		color: var(--color-light-fade);
		letter-spacing: var(--letter-spacing-m);
	}

	.entry-desc {
		font-size: 0.92rem;
		line-height: var(--line-height-large);
		color: var(--color-text-on-bg-light);
		margin-top: 2px;
	}

	@media screen and (max-width: 768px) {
		.directory-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--spacing-l);
		}
	}
</style>
