<script lang="ts">
	import { onMount } from 'svelte';
	import { researchLogEntries, type ResearchCategory } from '$lib/data/research-log';
	import { createRevealAnimation, getGsap } from '$lib/util/gsap';

	let sectionRef: HTMLElement | undefined = $state();
	let activeCategory = $state<'All' | ResearchCategory>('All');
	let expandedId = $state<string | null>(null);

	const categories: Array<'All' | ResearchCategory> = [
		'All',
		'Tooling',
		'Mobile Forensics',
		'Lab Note'
	];

	const visibleEntries = $derived(
		activeCategory === 'All'
			? researchLogEntries
			: researchLogEntries.filter((entry) => entry.category === activeCategory)
	);

	function selectCategory(cat: 'All' | ResearchCategory) {
		activeCategory = cat;
		expandedId = null;
		requestAnimationFrame(() => getGsap().ScrollTrigger.refresh());
	}

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
		requestAnimationFrame(() => getGsap().ScrollTrigger.refresh());
	}

	onMount(() => {
		return createRevealAnimation(sectionRef, '.log-entry', { y: 12, stagger: 0.06 });
	});
</script>

<section id="research-log" bind:this={sectionRef}>
	<div class="section-header">
		<h2>SECURITY RESEARCH LOG</h2>
		<p class="section-subtitle">
			Field notes from building security tooling, auditing mobile components, and running isolated
			lab experiments.
		</p>
	</div>

	<div class="log-shell">
		<div class="filter-bar" role="tablist" aria-label="Research log categories">
			{#each categories as cat}
				<button
					type="button"
					role="tab"
					aria-selected={activeCategory === cat}
					class:active={activeCategory === cat}
					onclick={() => selectCategory(cat)}
				>
					{cat}
				</button>
			{/each}
		</div>

		<div class="log-list">
			{#each visibleEntries as entry (entry.id)}
				<article class="log-entry">
					<div class="entry-meta">
						<span class="entry-date">{entry.date}</span>
						<span class="entry-category">{entry.category}</span>
					</div>

					<div class="entry-main">
						<h3>{entry.title}</h3>
						<p class="entry-summary">{entry.summary}</p>

						{#if expandedId === entry.id}
							<div class="entry-details">
								<p class="technical-note">{entry.technicalNote}</p>
								<p class="scope-note">{entry.scopeNote}</p>
							</div>
						{/if}

						<div class="entry-footer">
							<ul class="entry-tags">
								{#each entry.tags as tag}
									<li>{tag}</li>
								{/each}
							</ul>

							<div class="entry-actions">
								<button
									type="button"
									class="note-toggle"
									aria-expanded={expandedId === entry.id}
									onclick={() => toggleExpand(entry.id)}
								>
									{expandedId === entry.id ? 'Hide Note' : 'Read Note'}
								</button>

								{#if entry.repoUrl}
									<a href={entry.repoUrl} target="_blank" rel="noopener noreferrer" class="repo-link">
										Repo ↗
									</a>
								{/if}
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;
		background-color: var(--color-bg-dark);
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: var(--spacing-l);
		padding: var(--spacing-xxl) 0;
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	.section-header {
		grid-column: 2 / 8;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-s);
	}

	h2 {
		line-height: var(--line-height-large);
	}

	.section-subtitle {
		font-size: 0.95rem;
		color: var(--color-light-fade);
		line-height: var(--line-height-large);
		letter-spacing: var(--letter-spacing-s);
		max-width: 680px;
	}

	.log-shell {
		grid-column: 2 / 8;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-s);

		button {
			min-height: 40px;
			padding: 0 var(--spacing-m);
			background-color: var(--color-bg-light);
			color: var(--color-primary);
			border: 1px solid color-mix(in srgb, var(--color-primary) 18%, transparent);
			border-radius: var(--border-radius-s);
			font-family: 'Inter', sans-serif;
			font-size: 0.85rem;
			font-weight: 600;
			cursor: pointer;
			transition:
				background-color 0.2s ease,
				color 0.2s ease,
				border-color 0.2s ease;

			&:hover {
				border-color: var(--color-secondary);
				color: var(--color-secondary);
			}

			&.active {
				background-color: var(--color-primary);
				color: var(--color-text-on-primary);
				border-color: var(--color-primary);
			}
		}
	}

	.log-list {
		display: flex;
		flex-direction: column;
	}

	.log-entry {
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		gap: var(--spacing-l);
		padding: var(--spacing-l) 0;
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 14%, transparent);
		letter-spacing: var(--letter-spacing-s);

		&:last-child {
			border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 14%, transparent);
		}
	}

	.entry-meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.entry-date {
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--color-primary);
	}

	.entry-category {
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--color-secondary);
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-m);
	}

	.entry-main {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-s);

		h3 {
			font-size: var(--font-size-h3);
			font-weight: 600;
			color: var(--color-primary);
			line-height: var(--line-height-normal);
		}
	}

	.entry-summary {
		font-size: 0.95rem;
		line-height: var(--line-height-large);
		color: var(--color-text-on-bg-dark);
	}

	.entry-details {
		background-color: var(--color-bg-light);
		border-left: 2.5px solid var(--color-primary);
		padding: var(--spacing-m);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-s);
	}

	.technical-note {
		font-size: 0.92rem;
		line-height: var(--line-height-large);
		color: var(--color-text-on-bg-light);
	}

	.scope-note {
		font-size: var(--font-size-small);
		color: var(--color-light-fade);
		font-weight: 600;
	}

	.entry-footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-m);
		margin-top: var(--spacing-xs);
	}

	.entry-tags {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-s) var(--spacing-m);

		li {
			font-size: 0.85rem;
			color: var(--color-light-fade);
		}
	}

	.entry-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-m);
	}

	.note-toggle,
	.repo-link {
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-primary);
		background: transparent;
		border: none;
		cursor: pointer;
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;

		&:hover {
			color: var(--color-secondary);
			border-bottom-color: var(--color-secondary);
		}
	}

	@media screen and (max-width: 768px) {
		section {
			display: flex;
			flex-direction: column;
			padding: var(--spacing-xxl) var(--spacing-m);
		}

		.log-entry {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--spacing-s);
		}
	}
</style>
