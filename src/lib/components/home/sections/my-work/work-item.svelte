<script lang="ts">
	import type { ProjectItem } from "$lib/data/projects";

	interface Props {
		item: ProjectItem;
		onSelect?: (item: ProjectItem) => void;
	}

	let { item, onSelect }: Props = $props();
</script>

<article class="container" class:secondary={item.secondary}>
	<div class="preview">
		<img src={item.image} alt={item.imageAlt} />
	</div>

	<div class="body">
		<p class="status">{item.status}</p>
		<h3>{item.title}</h3>
		<p class="description">{item.description}</p>
	</div>

	<div class="meta-container">
		<ul>
			{#each item.tags as tag}
				<li>{tag}</li>
			{/each}
		</ul>

		<div class="links">
			<button
				type="button"
				class="case-study-btn"
				aria-label="Open case study for {item.title}"
				onclick={() => onSelect?.(item)}
			>
				Case Study →
			</button>

			<div class="external-icons">
			{#if item.githubUrl}
				<a
					href={item.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="{item.title} GitHub repository"
					title="View on GitHub"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
						/>
					</svg>
				</a>
			{/if}

			{#if item.liveUrl}
				<a
					href={item.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="{item.title} live demo"
					title="Open live deployment"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							d="M5 3C3.90694 3 3 3.90694 3 5V19C3 20.0931 3.90694 21 5 21H19C20.0931 21 21 20.0931 21 19V12H19V19H5V5H12V3H5ZM14 3V5H17.5859L8.29297 14.293L9.70703 15.707L19 6.41406V10H21V3H14Z"
						/>
					</svg>
				</a>
			{/if}
			</div>
		</div>
	</div>
</article>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		background-color: var(--color-bg-light);
		padding: var(--spacing-l);
		border-radius: var(--border-radius-s);
		letter-spacing: var(--letter-spacing-s);
		transition:
			transform 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out;

		&:hover {
			transform: translateY(-3px);
			box-shadow: 0 12px 28px rgba(47, 53, 92, 0.08);
		}

		&.secondary {
			border-top: 2px solid
				color-mix(in srgb, var(--color-primary) 20%, transparent);
		}
	}

	.preview {
		margin-bottom: var(--spacing-m);
		border-radius: var(--border-radius-s);
		overflow: hidden;

		img {
			display: block;
			width: 100%;
			height: auto;
			aspect-ratio: 20 / 9;
			object-fit: cover;
		}
	}

	.status {
		font-size: var(--font-size-small);
		color: var(--color-secondary);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-m);
		margin-bottom: var(--spacing-xs);
	}

	h3 {
		font-size: var(--font-size-h3);
		margin-bottom: var(--spacing-s);
		font-weight: 600;
		color: var(--color-primary);
		line-height: var(--line-height-normal);
	}

	.description {
		font-size: 0.95rem;
		line-height: var(--line-height-large);
		color: var(--color-text-on-bg-light);
		margin-bottom: var(--spacing-m);
	}

	.meta-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-m);
		margin-top: auto;
	}

	ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		list-style: none;
		gap: var(--spacing-s) var(--spacing-m);

		li {
			color: var(--color-light-fade);
			font-size: 0.85rem;
			font-weight: 400;
		}
	}

	.links {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-s);

		.case-study-btn {
			min-height: 44px;
			padding: 0 2px;
			border: none;
			background: transparent;
			color: var(--color-primary);
			font-family: 'Inter', sans-serif;
			font-size: 0.85rem;
			font-weight: 600;
			letter-spacing: var(--letter-spacing-s);
			cursor: pointer;
			border-bottom: 1px solid transparent;
			transition:
				color 0.2s ease,
				border-color 0.2s ease;

			&:hover,
			&:focus-visible {
				color: var(--color-secondary);
				border-bottom-color: var(--color-secondary);
			}
		}

		.external-icons {
			display: flex;
			align-items: center;
			gap: var(--spacing-xs);
		}

		a {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			min-width: 44px;
			min-height: 44px;
			padding: 10px;
			border-radius: var(--border-radius-s);
		}

		svg {
			fill: var(--color-primary);
			transition:
				fill 0.2s ease,
				transform 0.2s ease;

			&:hover {
				fill: var(--color-secondary);
				transform: translateY(-2px);
			}
		}
	}

	@media screen and (max-width: 800px) {
		ul {
			gap: var(--spacing-s) var(--spacing-m);

			li {
				font-size: 0.9rem;
				color: #4f4f4f;
			}
		}
	}
</style>
