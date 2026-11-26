<script lang="ts">
	import { slide } from 'svelte/transition';
	import { sidebarSocials } from '$lib/data/profile';

	interface Props {
		showBackToTop?: boolean;
	}

	let { showBackToTop = false }: Props = $props();
</script>

<aside aria-label="Social links and quick navigation">
	{#if showBackToTop}
		<div class="back-to-top" in:slide out:slide>
			<a href="#nav" aria-label="Jump back to top" title="Back to top">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
				</svg>
				<span>back to top</span>
			</a>
		</div>
	{/if}

	<div class="socials">
		{#each sidebarSocials as item (item.id)}
			<a
				href={item.href}
				target={item.external ? '_blank' : undefined}
				rel={item.external ? 'noopener noreferrer' : undefined}
				aria-label={item.external ? `${item.label} (opens in new tab)` : item.label}
				title={item.label}
			>
				{#if item.id === 'github'}
					<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
						/>
					</svg>
				{:else if item.id === 'linkedin'}
					<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
						/>
					</svg>
				{:else if item.id === 'hackthebox'}
					<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm0 2.3l6.1 3.5L12 11.3 5.9 7.8 12 4.3zM5.5 9.6l5.5 3.2v6.6l-5.5-3.2V9.6zm13 6.6L13 19.4v-6.6l5.5-3.2v6.6z"
						/>
					</svg>
				{:else if item.id === 'tryhackme'}
					<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M19.5 11.2a3.8 3.8 0 0 0-3.2-1.8 4.4 4.4 0 0 0-8.4-1.3A3.9 3.9 0 0 0 3 11.9 4.1 4.1 0 0 0 7.1 16h11.3a3.6 3.6 0 0 0 1.1-4.8zM10.5 13.5H8v-2h2.5v2zm5.5 0h-3.5v-2H16v2z"
						/>
					</svg>
				{:else if item.id === 'instagram'}
					<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
						/>
					</svg>
				{:else if item.id === 'discord'}
					<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"
						/>
					</svg>
				{:else}
					<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 3.2V18h16V7.2l-8 5-8-5M4.8 6L12 10.5 19.2 6H4.8z"
						/>
					</svg>
				{/if}
			</a>
		{/each}
	</div>
</aside>

<style lang="scss">
	.socials {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-m);
		position: fixed;
		bottom: 0;
		left: var(--spacing-m);
		background: transparent;
		z-index: 99;

		svg {
			transition: all ease-in-out 0.2s;
			fill: var(--color-primary);
		}

		&::after {
			content: '';
			width: 2px;
			height: 70px;
			background: var(--color-primary);
		}
	}

	.back-to-top {
		position: fixed;
		top: 30%;
		left: var(--spacing-m);
		z-index: 99;

		span {
			margin-top: var(--spacing-s);
			color: var(--color-primary);
			writing-mode: vertical-lr;
			font-size: var(--font-size-small);
			letter-spacing: var(--letter-spacing-m);
		}

		svg {
			fill: var(--color-primary);
			width: 32px;
			height: 32px;
			animation: bounce 1.2s infinite;
		}

		a {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-decoration: none;
			width: auto;
			height: auto;
			transition: transform 0.2s ease-in-out;

			&:hover,
			&:focus-visible {
				transform: scale(1.05);
				svg {
					fill: var(--color-secondary);
				}
				span {
					color: var(--color-secondary);
				}
			}
		}
	}

	.socials a {
		text-decoration: none;
		cursor: pointer;
		height: var(--icon-size-m);
		width: var(--icon-size-m);
		display: inline-flex;
		align-items: center;
		justify-content: center;

		&:hover svg,
		&:focus-visible svg {
			transform: translateY(-2px) scale(1.1);
			fill: var(--color-secondary);
		}
	}

	@media screen and (max-height: 760px) {
		.back-to-top {
			top: 16%;
		}

		.socials {
			gap: 12px;

			&::after {
				height: 44px;
			}
		}
	}

	@media screen and (max-width: 768px) {
		aside {
			display: none;
		}
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		80% {
			transform: translateY(5px);
		}
	}
</style>
