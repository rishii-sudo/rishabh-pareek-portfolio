<script lang="ts">
	import { onMount } from 'svelte';
	import { certificationGroups } from '$lib/data/experience';
	import { getGsap, prefersReducedMotion } from '$lib/util/gsap';

	let certSectionRef: HTMLElement | undefined = $state();

	onMount(() => {
		if (!certSectionRef) return;

		const line = certSectionRef.querySelector<SVGLineElement>('.cert-line-draw');
		const reduced = prefersReducedMotion();

		if (line) {
			const len = line.getTotalLength();
			line.style.strokeDasharray = `${len}`;
			line.style.strokeDashoffset = reduced ? '0' : `${len}`;
		}

		if (reduced) return;

		const { gsap, ScrollTrigger } = getGsap();
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: certSectionRef,
					start: 'top 82%',
					end: 'bottom 75%',
					scrub: 1,
					invalidateOnRefresh: true
				}
			});

			if (line) {
				tl.to(line, { strokeDashoffset: 0, ease: 'none', duration: 2 }, 0);
			}

			certificationGroups.forEach((_, idx) => {
				tl.fromTo(
					`.cert-milestone-${idx}`,
					{ y: 10 },
					{ y: 0, duration: 0.35, ease: 'power2.out' },
					idx * 0.45
				);
			});
		}, certSectionRef);

		ScrollTrigger.refresh();

		return () => ctx.revert();
	});
</script>

<div id="certifications" class="certifications-section" bind:this={certSectionRef}>
	<div class="section-header">
		<h3>CERTIFICATIONS &amp; TRAINING</h3>
		<p class="section-subtitle">
			Verified credentials and structured learning paths — certifications are distinguished from
			in-progress or completed coursework.
		</p>
	</div>

	<div class="cert-timeline">
		<div class="rail" aria-hidden="true">
			<svg viewBox="0 0 2 100" preserveAspectRatio="none">
				<line x1="1" y1="0" x2="1" y2="100" stroke="#2f355c" stroke-opacity="0.16" stroke-width="2" />
				<line
					class="cert-line-draw"
					x1="1"
					y1="0"
					x2="1"
					y2="100"
					stroke="#2f355c"
					stroke-width="2"
				/>
			</svg>
		</div>

		<ol class="issuer-list">
			{#each certificationGroups as group, idx (group.id)}
				<li class="issuer-milestone cert-milestone-{idx}">
					<span class="milestone-marker" aria-hidden="true"></span>

					<div class="issuer-head">
						<span class="issuer-index">{group.index}</span>
						<div class="issuer-mark" aria-hidden="true">
							{#if group.id === 'ec-council'}
								<svg viewBox="0 0 24 24" width="22" height="22">
									<path
										fill="#2f355c"
										d="M12 2L4 5.5v6.2c0 5 3.4 9.5 8 10.8 4.6-1.3 8-5.8 8-10.8V5.5L12 2zm0 2.2l6 2.6v4.9c0 4-2.6 7.7-6 8.9-3.4-1.2-6-4.9-6-8.9V6.8l6-2.6z"
									/>
								</svg>
							{:else if group.id === 'tryhackme'}
								<svg viewBox="0 0 24 24" width="22" height="22">
									<path
										fill="#2f355c"
										d="M19.5 11.2a3.8 3.8 0 0 0-3.2-1.8 4.4 4.4 0 0 0-8.4-1.3A3.9 3.9 0 0 0 3 11.9 4.1 4.1 0 0 0 7.1 16h11.3a3.6 3.6 0 0 0 1.1-4.8z"
									/>
								</svg>
							{:else if group.id === 'cisco'}
								<svg viewBox="0 0 24 24" width="22" height="22">
									<path
										fill="#2f355c"
										d="M3 10h2v4H3v-4zm4-3h2v10H7V7zm4-3h2v16h-2V4zm4 3h2v10h-2V7zm4 3h2v4h-2v-4z"
									/>
								</svg>
							{:else}
								<svg viewBox="0 0 24 24" width="22" height="22">
									<path
										fill="#2f355c"
										d="M12 3l9 17H3L12 3zm0 4.3L6.4 18h11.2L12 7.3z"
									/>
								</svg>
							{/if}
						</div>
						<div>
							<h4>{group.provider}</h4>
							<p class="issuer-sub">{group.subtitle}</p>
						</div>
					</div>

					<ul class="credential-items">
						{#each group.items as item}
							<li>
								<span class="cred-name">{item.name}</span>
								<span class="cred-kind" class:is-cert={item.kind === 'Certification'}>
									{item.kind}
								</span>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ol>
	</div>
</div>

<style lang="scss">
	.certifications-section {
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

	.cert-timeline {
		position: relative;
		padding-left: var(--spacing-xl);
	}

	.rail {
		position: absolute;
		left: 7px;
		top: 8px;
		bottom: 8px;
		width: 2px;

		svg {
			width: 2px;
			height: 100%;
			display: block;
		}
	}

	.issuer-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.issuer-milestone {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-m);
		padding-bottom: var(--spacing-l);
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 10%, transparent);

		&:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}

		&:hover .milestone-marker {
			border-color: var(--color-secondary);
			background-color: var(--color-secondary);
		}
	}

	.milestone-marker {
		position: absolute;
		left: calc(-1 * var(--spacing-xl) + 1px);
		top: 6px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: var(--color-primary);
		border: 3px solid var(--color-bg-light);
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease;
	}

	.issuer-head {
		display: flex;
		align-items: center;
		gap: var(--spacing-m);
	}

	.issuer-index {
		font-size: var(--font-size-small);
		font-weight: 700;
		color: var(--color-secondary);
		letter-spacing: var(--letter-spacing-m);
		min-width: 24px;
	}

	.issuer-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		flex-shrink: 0;
	}

	.issuer-head h4 {
		font-size: var(--font-size-h3);
		font-weight: 700;
		color: var(--color-primary);
		line-height: var(--line-height-normal);
	}

	.issuer-sub {
		font-size: 0.85rem;
		color: var(--color-light-fade);
		letter-spacing: var(--letter-spacing-s);
	}

	.credential-items {
		list-style: none;
		padding-left: calc(24px + 28px + var(--spacing-m) * 2);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-s);

		li {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: baseline;
			gap: var(--spacing-s);
			padding: 4px 0;
		}
	}

	.cred-name {
		font-size: 0.95rem;
		color: var(--color-text-on-bg-light);
		letter-spacing: var(--letter-spacing-s);
	}

	.cred-kind {
		font-size: var(--font-size-small);
		color: var(--color-light-fade);
		letter-spacing: var(--letter-spacing-s);

		&.is-cert {
			color: var(--color-primary);
			font-weight: 600;
		}
	}

	@media screen and (max-width: 640px) {
		.cert-timeline {
			padding-left: var(--spacing-l);
		}

		.milestone-marker {
			left: calc(-1 * var(--spacing-l) + 1px);
		}

		.issuer-list {
			gap: var(--spacing-xxl);
		}

		.issuer-milestone {
			padding-bottom: var(--spacing-xl);
		}

		.issuer-head h4 {
			font-size: 1.35rem;
		}

		.issuer-sub {
			font-size: 0.9rem;
		}

		.credential-items {
			padding-left: 0;
			gap: var(--spacing-m);
		}

		.cred-name {
			font-size: 1rem;
			line-height: 1.45;
		}

		.cred-kind {
			font-size: 0.8rem;
		}
	}
</style>
