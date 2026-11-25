<script lang="ts">
	import { onMount } from "svelte";
	import { skillCategories } from "$lib/data/skills";
	import { getGsap, prefersReducedMotion } from "$lib/util/gsap";
	import SkillIcon from './skill-icon.svelte';

	let sectionRef: HTMLElement | undefined = $state();
	let activeSkill = $state<string | null>(null);

	const allSkills = skillCategories.flatMap((cat) =>
		cat.skills.map((skill) => ({
			name: skill,
			category: cat.label
		}))
	);

	onMount(() => {
		if (!sectionRef || prefersReducedMotion()) return;

		const { gsap, ScrollTrigger } = getGsap();
		const ctx = gsap.context(() => {
			gsap.from('.bucket-item', {
				scrollTrigger: {
					trigger: sectionRef,
					start: 'top 82%',
					once: true
				},
				y: 12,
				duration: 0.38,
				stagger: 0.025,
				ease: "power2.out",
				clearProps: "transform",
			});
		}, sectionRef);

		ScrollTrigger.refresh();

		return () => ctx.revert();
	});
</script>

<section id="skills" bind:this={sectionRef}>
	<div class="section-header">
		<h2>I'M GOOD AT THIS</h2>
		<p class="bucket-caption">
			Technical Arsenal — {allSkills.length} security tools, offensive methodologies, languages, and
			platforms gathered in one place.
		</p>
	</div>

	<div class="bucket-stage">
		<div class="bucket-shell">
			<svg
				class="bucket-handle-svg"
				viewBox="0 0 600 72"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M90 68 C120 12, 480 12, 510 68"
					stroke="#2f355c"
					stroke-width="2.5"
					stroke-linecap="round"
				/>
				<circle cx="90" cy="66" r="5" fill="#ffffff" stroke="#2f355c" stroke-width="2" />
				<circle cx="510" cy="66" r="5" fill="#ffffff" stroke="#2f355c" stroke-width="2" />
			</svg>

			<div class="bucket-rim" aria-hidden="true"></div>

			<div class="bucket-body">
				<div class="bucket-grid" role="list" aria-label="Technical skills and tools">
					{#each allSkills as item (item.name)}
						<div class="bucket-item" role="listitem">
							<button
								type="button"
								class="skill-token"
								class:is-active={activeSkill === item.name}
								aria-label={`${item.name} (${item.category})`}
								onmouseenter={() => (activeSkill = item.name)}
								onmouseleave={() => (activeSkill = null)}
								onfocus={() => (activeSkill = item.name)}
								onblur={() => (activeSkill = null)}
								onclick={() => (activeSkill = activeSkill === item.name ? null : item.name)}
							>
								<span class="token-tooltip" aria-hidden="true">
									{item.name}
									<small>{item.category}</small>
								</span>
								<span class="token-icon">
									<SkillIcon name={item.name} />
								</span>
								<span class="token-label">{item.name}</span>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;
		background-color: var(--color-bg-light);
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: var(--spacing-l);
		color: var(--color-text-on-bg-light);
		padding: var(--spacing-xxl) 0;
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

	.bucket-caption {
		font-size: 0.95rem;
		color: var(--color-light-fade);
		letter-spacing: var(--letter-spacing-s);
		line-height: var(--line-height-large);
	}

	.bucket-stage {
		grid-column: 2 / 8;
		display: flex;
		justify-content: center;
	}

	.bucket-shell {
		width: 100%;
		max-width: 980px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.bucket-handle-svg {
		width: 72%;
		max-width: 560px;
		height: auto;
		display: block;
		margin-bottom: -4px;
	}

	.bucket-rim {
		width: 100%;
		height: 16px;
		background-color: var(--color-bg-light);
		border: 2.5px solid var(--color-primary);
		border-radius: 6px;
		z-index: 2;
	}

	.bucket-body {
		width: 94%;
		background-color: var(--color-bg-dark);
		border-left: 2.5px solid var(--color-primary);
		border-right: 2.5px solid var(--color-primary);
		border-bottom: 2.5px solid var(--color-primary);
		border-bottom-left-radius: 36px;
		border-bottom-right-radius: 36px;
		padding: var(--spacing-xl) var(--spacing-l) var(--spacing-xxl);
	}

	.bucket-grid {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: var(--spacing-m) var(--spacing-s);
		align-items: start;
	}

	.bucket-item {
		display: flex;
		justify-content: center;
	}

	.skill-token {
		all: unset;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		width: 100%;
		padding: var(--spacing-s) 4px;
		cursor: pointer;
		text-align: center;
		border-bottom: 2px solid transparent;
		transition:
			transform 0.2s ease,
			border-color 0.2s ease;

		&:hover,
		&:focus-visible,
		&.is-active {
			transform: scale(1.06);
			border-bottom-color: var(--color-secondary);

			.token-tooltip {
				opacity: 1;
				transform: translate(-50%, -4px);
				pointer-events: auto;
			}

			.token-label {
				color: var(--color-primary);
			}
		}
	}

	.token-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background-color: var(--color-bg-light);
		border: 1px solid color-mix(in srgb, var(--color-primary) 16%, transparent);
		border-radius: var(--border-radius-m);
	}

	.token-label {
		font-size: 0.72rem;
		font-weight: 500;
		line-height: 1.25;
		color: var(--color-light-fade);
		letter-spacing: 0.02em;
		word-break: break-word;
	}

	.token-tooltip {
		position: absolute;
		bottom: calc(100% + 4px);
		left: 50%;
		transform: translate(-50%, 0);
		background-color: var(--color-primary);
		color: var(--color-text-on-primary);
		padding: 6px 10px;
		border-radius: var(--border-radius-s);
		font-size: 0.72rem;
		font-weight: 600;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		z-index: 20;
		transition:
			opacity 0.18s ease,
			transform 0.18s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1px;

		small {
			font-size: 0.65rem;
			font-weight: 400;
			color: var(--color-chili-pepper);
		}
	}

	@media screen and (max-width: 1080px) {
		.bucket-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	@media screen and (max-width: 768px) {
		section {
			padding: var(--spacing-xxl) var(--spacing-l);
			display: flex;
			flex-direction: column;
		}

		.bucket-body {
			width: 96%;
			padding: var(--spacing-l) var(--spacing-m) var(--spacing-xl);
			border-bottom-left-radius: 24px;
			border-bottom-right-radius: 24px;
		}

		.bucket-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: var(--spacing-m) var(--spacing-xs);
		}
	}

	@media screen and (max-width: 440px) {
		.bucket-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.token-tooltip {
			display: none;
		}
	}
</style>
