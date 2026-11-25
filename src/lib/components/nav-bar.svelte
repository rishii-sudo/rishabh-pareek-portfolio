<script lang="ts">
	import viewport from '$lib/util/useViewportAction';
	import { profile } from '$lib/data/profile';

	interface Props {
		onExitViewport?: () => void;
		onEnterViewport?: () => void;
	}

	let { onExitViewport, onEnterViewport }: Props = $props();
	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ label: 'Skills', href: '/#skills' },
		{ label: 'My Work', href: '/#work' },
		{ label: 'Experience', href: '/#experience' },
		{ label: 'Contact', href: '/#contact-me' }
	];

	function handleLinkClick() {
		mobileMenuOpen = false;
	}
</script>

<nav
	id="nav"
	aria-label="Primary navigation"
	use:viewport={{
		onExit: () => onExitViewport?.(),
		onEnter: () => onEnterViewport?.()
	}}
>
	<div class="brand">
		<a href="/" aria-label="{profile.name} home">
			<span class="monogram">{profile.monogram}</span>
		</a>
	</div>

	<ul class="desktop-links">
		{#each navLinks as item}
			<li><a href={item.href}>{item.label}</a></li>
		{/each}
	</ul>

	<button
		type="button"
		class="mobile-toggle"
		aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
		aria-expanded={mobileMenuOpen}
		aria-controls="mobile-nav-drawer"
		onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
	>
		<span class="bar" class:open={mobileMenuOpen}></span>
		<span class="bar" class:open={mobileMenuOpen}></span>
		<span class="bar" class:open={mobileMenuOpen}></span>
	</button>
</nav>

{#if mobileMenuOpen}
	<div id="mobile-nav-drawer" class="mobile-drawer">
		<ul>
			{#each navLinks as item}
				<li>
					<a href={item.href} onclick={handleLinkClick}>{item.label}</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style lang="scss">

	nav {
		background-color: var(--color-bg-dark);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-l) var(--spacing-page-inset);
		letter-spacing: var(--letter-spacing-l);
		width: 100%;
		font-size: 0.85rem;
		position: relative;
		z-index: 120;
	}

	.desktop-links {
		list-style: none;
		display: flex;
		gap: var(--spacing-xl);

		li {
			cursor: pointer;
			transition: transform 0.2s ease-in-out;

			&::after {
				display: block;
				content: '';
				width: 0;
				height: 1px;
				margin: var(--spacing-xs) auto 0;
				transition: width 0.2s ease-in-out;
			}

			&:hover {
				transform: scale(1.08);

				a {
					color: var(--color-secondary);
				}

				&::after {
					width: 100%;
					background-color: var(--color-secondary);
				}
			}
		}
	}

	a {
		text-decoration: none;
		color: var(--color-primary);
		transition: color 0.2s ease-in-out;
		padding: var(--spacing-s) 0;
	}

	.monogram {
		display: inline-block;
		font-size: 2.5rem;
		color: var(--color-primary);
		font-weight: normal;
		font-family: 'type-writer', monospace;
		transition: color 0.2s ease-in-out;
		line-height: 1;

		&:hover {
			color: var(--color-secondary);
		}
	}

	.mobile-toggle {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		background: transparent;
		border: 1px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
		border-radius: var(--border-radius-s);
		padding: 8px 10px;
		cursor: pointer;

		.bar {
			display: block;
			width: 20px;
			height: 2px;
			background-color: var(--color-primary);
			transition: transform 0.2s ease, opacity 0.2s ease;
		}
	}

	.mobile-drawer {
		display: none;
		background-color: var(--color-bg-light);
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 15%, transparent);
		padding: var(--spacing-m) var(--spacing-page-inset) var(--spacing-l);

		ul {
			list-style: none;
			display: flex;
			flex-direction: column;
			gap: var(--spacing-m);
		}

		a {
			display: block;
			font-size: 1rem;
			font-weight: 500;
			color: var(--color-primary);

			&:hover {
				color: var(--color-secondary);
			}
		}
	}

	@media screen and (max-width: 768px) {
		nav {
			padding: var(--spacing-m) var(--spacing-l);
		}

		.desktop-links {
			display: none;
		}

		.mobile-toggle {
			display: flex;
		}

		.mobile-drawer {
			display: block;
			padding: var(--spacing-m) var(--spacing-l);
		}
	}
</style>
