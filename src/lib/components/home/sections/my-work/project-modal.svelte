<script lang="ts">
	import { tick } from 'svelte';
	import type { ProjectItem } from '$lib/data/projects';
	import { animateModalIn } from '$lib/util/gsap';

	interface Props {
		project: ProjectItem | null;
		onClose: () => void;
	}

	let { project, onClose }: Props = $props();
	let panelRef: HTMLElement | undefined = $state();
	let closeBtnRef: HTMLButtonElement | undefined = $state();
	let previousFocus: HTMLElement | null = null;

	const FOCUSABLE_SELECTOR =
		'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

	function getFocusableElements(): HTMLElement[] {
		if (!panelRef) return [];
		return Array.from(panelRef.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
	}

	$effect(() => {
		if (!project) return;
		previousFocus = document.activeElement as HTMLElement | null;

		const prevOverflow = document.body.style.overflow;
		const prevPaddingRight = document.body.style.paddingRight;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = 'hidden';
		if (scrollbarWidth > 0) {
			const computedPadding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
			document.body.style.paddingRight = `${computedPadding + scrollbarWidth}px`;
		}

		tick().then(() => {
			animateModalIn(panelRef);
			closeBtnRef?.focus();
		});

		return () => {
			document.body.style.overflow = prevOverflow;
			document.body.style.paddingRight = prevPaddingRight;
			previousFocus?.focus?.();
		};
	});

	function handleKeydown(event: KeyboardEvent) {
		if (!project) return;

		if (event.key === 'Escape') {
			event.preventDefault();
			onClose();
			return;
		}

		if (event.key === 'Tab') {
			const focusables = getFocusableElements();
			if (focusables.length === 0) {
				event.preventDefault();
				return;
			}
			if (focusables.length === 1) {
				event.preventDefault();
				focusables[0].focus();
				return;
			}

			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const active = document.activeElement as HTMLElement | null;

			if (event.shiftKey) {
				if (active === first || !panelRef?.contains(active)) {
					event.preventDefault();
					last.focus();
				}
			} else if (active === last || !panelRef?.contains(active)) {
				event.preventDefault();
				first.focus();
			}
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if project}
	<div class="modal-backdrop" role="presentation" onclick={handleBackdropClick}>
		<div
			class="modal-panel"
			bind:this={panelRef}
			role="dialog"
			aria-modal="true"
			aria-labelledby="case-study-title"
		>
			<div class="modal-header">
				<div>
					<p class="modal-status">{project.status}</p>
					<h3 id="case-study-title">{project.title}</h3>
				</div>
				<button
					bind:this={closeBtnRef}
					type="button"
					class="close-btn"
					aria-label="Close case study"
					onclick={onClose}
				>
					✕
				</button>
			</div>

			<div class="modal-preview">
				<img src={project.image} alt={project.imageAlt} />
			</div>

			<div class="modal-body">
				<section class="study-block">
					<h4>Overview</h4>
					<p>{project.caseStudy.overview}</p>
				</section>

				<section class="study-block">
					<h4>Architecture &amp; Workflow</h4>
					<ul>
						{#each project.caseStudy.architecture as step}
							<li>{step}</li>
						{/each}
					</ul>
				</section>

				<section class="study-block">
					<h4>Key Highlights</h4>
					<ul>
						{#each project.caseStudy.highlights as point}
							<li>{point}</li>
						{/each}
					</ul>
				</section>

				<section class="study-scope">
					<strong>Scope &amp; Verification:</strong>
					<span>{project.caseStudy.securityScope}</span>
				</section>

				<ul class="study-tags" aria-label="Technologies used">
					{#each project.tags as tag}
						<li>{tag}</li>
					{/each}
				</ul>
			</div>

			{#if project.githubUrl || project.liveUrl}
				<div class="modal-footer">
					{#if project.githubUrl}
						<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="action-link">
							View Repository ↗
						</a>
					{/if}
					{#if project.liveUrl}
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="action-link action-link--primary"
						>
							Open Live Demo ↗
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(47, 53, 92, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-l);
		z-index: 300;
	}

	.modal-panel {
		width: 100%;
		max-width: 720px;
		max-height: 90vh;
		overflow-y: auto;
		background-color: var(--color-bg-light);
		border-radius: var(--border-radius-s);
		border-top: 3px solid var(--color-primary);
		padding: var(--spacing-xl);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-l);
		letter-spacing: var(--letter-spacing-s);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--spacing-m);
	}

	.modal-status {
		font-size: var(--font-size-small);
		color: var(--color-secondary);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-m);
		margin-bottom: var(--spacing-xs);
	}

	h3 {
		font-size: var(--font-size-h2);
		color: var(--color-primary);
		font-weight: 700;
		line-height: var(--line-height-normal);
	}

	.close-btn {
		min-width: 44px;
		min-height: 44px;
		border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
		background-color: var(--color-bg-dark);
		color: var(--color-primary);
		border-radius: var(--border-radius-s);
		font-size: 1.1rem;
		cursor: pointer;
		flex-shrink: 0;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;

		&:hover,
		&:focus-visible {
			background-color: var(--color-primary);
			color: var(--color-text-on-primary);
		}
	}

	.modal-preview {
		flex-shrink: 0;
		border-radius: var(--border-radius-s);
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-primary) 12%, transparent);

		img {
			display: block;
			width: 100%;
			height: auto;
			aspect-ratio: 20 / 9;
			object-fit: cover;
		}
	}

	.modal-body {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-m);
	}

	.study-block {
		h4 {
			font-size: 0.85rem;
			text-transform: uppercase;
			letter-spacing: var(--letter-spacing-m);
			color: var(--color-primary);
			margin-bottom: var(--spacing-xs);
		}

		p,
		li {
			font-size: 0.95rem;
			line-height: var(--line-height-large);
			color: var(--color-text-on-bg-light);
		}

		ul {
			padding-left: var(--spacing-m);
			display: flex;
			flex-direction: column;
			gap: 4px;
		}
	}

	.study-scope {
		background-color: var(--color-bg-dark);
		border-left: 3px solid var(--color-secondary);
		padding: var(--spacing-s) var(--spacing-m);
		font-size: 0.88rem;
		line-height: var(--line-height-normal);
		color: var(--color-primary);
	}

	.study-tags {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		gap: var(--spacing-s);

		li {
			background-color: var(--color-bg-dark);
			color: var(--color-primary);
			padding: 4px 10px;
			border-radius: var(--border-radius-s);
			font-size: 0.8rem;
			font-weight: 500;
		}
	}

	.modal-footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: var(--spacing-m);
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 12%, transparent);
		padding-top: var(--spacing-m);
	}

	.action-link {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 var(--spacing-m);
		border: 1px solid var(--color-primary);
		border-radius: var(--border-radius-s);
		color: var(--color-primary);
		text-decoration: none;
		font-size: 0.88rem;
		font-weight: 600;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;

		&:hover {
			background-color: var(--color-primary);
			color: var(--color-text-on-primary);
		}

		&--primary {
			background-color: var(--color-primary);
			color: var(--color-text-on-primary);

			&:hover {
				background-color: var(--color-primary-hover);
			}
		}
	}

	@media screen and (max-width: 640px) {
		.modal-backdrop {
			padding: var(--spacing-s);
		}

		.modal-panel {
			padding: var(--spacing-l) var(--spacing-m);
		}

		h3 {
			font-size: 1.4rem;
		}
	}
</style>
