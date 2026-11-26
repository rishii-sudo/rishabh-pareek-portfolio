<script lang="ts">
	import { onMount } from "svelte";
	import { timelineMilestones } from "$lib/data/experience";
	import { getGsap, prefersReducedMotion } from "$lib/util/gsap";
	import CertificationsSection from "./certifications.section.svelte";
	import LearningProfilesSection from "./learning-profiles.section.svelte";

	let expSectionRef: HTMLElement | undefined = $state();
	let timelineGridRef: HTMLElement | undefined = $state();

	onMount(() => {
		if (!expSectionRef || !timelineGridRef) return;

		const paths =
			timelineGridRef.querySelectorAll<SVGPathElement>(".timeline-path");
		const reduced = prefersReducedMotion();

		paths.forEach((path) => {
			const length = path.getTotalLength();
			path.style.strokeDasharray = `${length}`;
			path.style.strokeDashoffset = reduced ? "0" : `${length}`;
		});

		if (reduced) return;

		const { gsap, ScrollTrigger } = getGsap();
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: timelineGridRef,
					start: "top 82%",
					end: "bottom 70%",
					scrub: 1,
					invalidateOnRefresh: true,
				},
			});

			paths.forEach((path) => {
				tl.to(
					path,
					{
						strokeDashoffset: 0,
						ease: "none",
						duration: 3,
					},
					0,
				);
			});

			const milestoneTimes = [0.3, 1.4, 2.4];

			milestoneTimes.forEach((time, idx) => {
				tl.fromTo(
					`.milestone-dot-${idx}`,
					{ scale: 0.72, transformOrigin: "center center" },
					{ scale: 1, duration: 0.35, ease: "back.out(1.7)" },
					time,
				);

				tl.fromTo(
					`.milestone-year-${idx}`,
					{ x: -8 },
					{ x: 0, duration: 0.35, ease: "power2.out" },
					time + 0.04,
				);

				tl.fromTo(
					`.milestone-content-${idx}`,
					{ y: 10 },
					{ y: 0, duration: 0.4, ease: "power2.out" },
					time + 0.06,
				);
			});
		}, expSectionRef);

		ScrollTrigger.refresh();

		return () => ctx.revert();
	});
</script>

<section id="experience" bind:this={expSectionRef}>
	<h2>EXPERIENCE</h2>

	<div class="experience-shell">
		<div class="timeline-grid" bind:this={timelineGridRef}>
			<div class="curve-column curve-column--desktop" aria-hidden="true">
				<svg
					class="curve-svg"
					viewBox="0 0 280 900"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						class="timeline-guide"
						d="M140 0 C140 65, 195 85, 195 140 C195 245, 95 320, 95 450 C95 580, 195 655, 195 760 C195 825, 140 855, 140 900"
						stroke="#2f355c"
						stroke-opacity="0.14"
						stroke-width="2.5"
						stroke-linecap="round"
					/>
					<path
						class="timeline-path"
						d="M140 0 C140 65, 195 85, 195 140 C195 245, 95 320, 95 450 C95 580, 195 655, 195 760 C195 825, 140 855, 140 900"
						stroke="#2f355c"
						stroke-width="2.5"
						stroke-linecap="round"
					/>

					<line
						x1="205"
						y1="140"
						x2="280"
						y2="140"
						stroke="#2f355c"
						stroke-opacity="0.3"
						stroke-width="1"
					/>
					<line
						x1="105"
						y1="450"
						x2="280"
						y2="450"
						stroke="#2f355c"
						stroke-opacity="0.3"
						stroke-width="1"
					/>
					<line
						x1="205"
						y1="760"
						x2="280"
						y2="760"
						stroke="#2f355c"
						stroke-opacity="0.3"
						stroke-width="1"
					/>

					<g class="milestone-dot-0">
						<circle cx="195" cy="140" r="14" fill="#ffffff" />
						<circle cx="195" cy="140" r="9" fill="#2f355c" />
					</g>
					<g class="milestone-dot-1">
						<circle cx="95" cy="450" r="14" fill="#ffffff" />
						<circle cx="95" cy="450" r="9" fill="#2f355c" />
					</g>
					<g class="milestone-dot-2">
						<circle cx="195" cy="760" r="14" fill="#ffffff" />
						<circle cx="195" cy="760" r="9" fill="#2f355c" />
					</g>

					<text
						class="svg-year milestone-year-0"
						x="166"
						y="149"
						text-anchor="end">2024</text
					>
					<text
						class="svg-year milestone-year-1"
						x="66"
						y="459"
						text-anchor="end">2024</text
					>
					<text
						class="svg-year milestone-year-2"
						x="166"
						y="769"
						text-anchor="end">2025</text
					>
				</svg>
			</div>

			<div class="curve-column curve-column--mobile" aria-hidden="true">
				<svg
					class="curve-svg"
					viewBox="0 0 56 900"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						class="timeline-guide"
						d="M28 0 C28 65, 40 85, 40 140 C40 245, 16 320, 16 450 C16 580, 40 655, 40 760 C40 825, 28 855, 28 900"
						stroke="#2f355c"
						stroke-opacity="0.14"
						stroke-width="2"
						stroke-linecap="round"
					/>
					<path
						class="timeline-path"
						d="M28 0 C28 65, 40 85, 40 140 C40 245, 16 320, 16 450 C16 580, 40 655, 40 760 C40 825, 28 855, 28 900"
						stroke="#2f355c"
						stroke-width="2"
						stroke-linecap="round"
					/>
					<g class="milestone-dot-0">
						<circle cx="40" cy="140" r="10" fill="#ffffff" />
						<circle cx="40" cy="140" r="6" fill="#2f355c" />
					</g>
					<g class="milestone-dot-1">
						<circle cx="16" cy="450" r="10" fill="#ffffff" />
						<circle cx="16" cy="450" r="6" fill="#2f355c" />
					</g>
					<g class="milestone-dot-2">
						<circle cx="40" cy="760" r="10" fill="#ffffff" />
						<circle cx="40" cy="760" r="6" fill="#2f355c" />
					</g>
				</svg>
			</div>

			<div class="milestones-column">
				{#each timelineMilestones as entry, idx (entry.id)}
					<article class="milestone-entry milestone-content-{idx}">
						<p class="mobile-year">{entry.yearLabel}</p>
						<p class="period">{entry.period}</p>
						<h3>
							{entry.organization}{#if entry.location}, {entry.location}{/if}
						</h3>
						<p class="role">{entry.role}</p>
						<ul>
							{#each entry.highlights as bullet}
								<li>{bullet}</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>
		</div>

		<CertificationsSection />
		<LearningProfilesSection />
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;
		background-color: var(--color-bg-light);
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: var(--spacing-l);
		padding: var(--spacing-xxl) 0;
	}

	h2 {
		grid-column: 2 / span all;
		line-height: var(--line-height-large);
	}

	.experience-shell {
		grid-column: 2 / 8;
		display: flex;
		flex-direction: column;
		gap: 4.5rem;
	}

	.timeline-grid {
		display: grid;
		grid-template-columns: 280px minmax(0, 1fr);
		gap: var(--spacing-xl);
		align-items: stretch;
		min-height: 820px;
	}

	.curve-column {
		position: relative;

		&--mobile {
			display: none;
		}
	}

	.curve-svg {
		width: 100%;
		height: 100%;
		display: block;
		overflow: visible;
	}

	.svg-year {
		fill: var(--color-primary);
		font-family: "Inter", sans-serif;
		font-size: 32px;
		font-weight: 700;
		letter-spacing: 0.04em;
	}

	.milestones-column {
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		gap: var(--spacing-l);
	}

	.milestone-entry {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: var(--spacing-m) 0;
		letter-spacing: var(--letter-spacing-s);
	}

	.mobile-year {
		display: none;
		font-size: var(--font-size-h2);
		font-weight: 700;
		color: var(--color-primary);
		margin-bottom: var(--spacing-xs);
	}

	.period {
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--color-light-fade);
		letter-spacing: var(--letter-spacing-m);
		text-transform: uppercase;
		margin-bottom: var(--spacing-xs);
	}

	.milestone-entry h3 {
		font-size: var(--font-size-h3);
		font-weight: 700;
		color: var(--color-primary);
		line-height: var(--line-height-normal);
		margin-bottom: 4px;
	}

	.role {
		font-size: var(--font-size-b1);
		font-weight: 600;
		color: var(--color-text-on-bg-light);
		margin-bottom: var(--spacing-m);
	}

	.milestone-entry ul {
		list-style: disc;
		padding-left: var(--spacing-m);
		display: flex;
		flex-direction: column;
		gap: 6px;

		li {
			font-size: 0.95rem;
			line-height: var(--line-height-large);
			color: var(--color-text-on-bg-light);
		}
	}

	@media screen and (max-width: 1024px) {
		.timeline-grid {
			grid-template-columns: 200px minmax(0, 1fr);
			gap: var(--spacing-l);
		}
	}

	@media screen and (max-width: 640px) {
		section {
			display: flex;
			flex-direction: column;
			padding: var(--spacing-xxl) var(--spacing-m);
		}

		.timeline-grid {
			grid-template-columns: 40px minmax(0, 1fr);
			gap: var(--spacing-m);
			min-height: 820px;
		}

		.curve-column--desktop {
			display: none;
		}

		.curve-column--mobile {
			display: block;
		}

		.milestones-column {
			gap: var(--spacing-xl);
		}

		.milestone-entry {
			padding: var(--spacing-s) 0;
		}

		.mobile-year {
			display: block;
			font-size: 1.6rem;
			margin-bottom: 4px;
		}

		.period {
			font-size: 0.78rem;
			margin-bottom: 6px;
		}

		.milestone-entry h3 {
			font-size: 1.3rem;
		}

		.role {
			font-size: 1rem;
			margin-bottom: var(--spacing-s);
		}

		.milestone-entry ul li {
			font-size: 0.98rem;
			line-height: 1.6;
		}
	}
</style>
