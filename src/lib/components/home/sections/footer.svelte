<script lang="ts">
	import { profile, socialProfiles } from '$lib/data/profile';
</script>

<footer>
	<ul>
		{#each socialProfiles as item, index}
			<li>
				<a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
			</li>
			{#if index < socialProfiles.length - 1}
				<li class="sep" aria-hidden="true">|</li>
			{/if}
		{/each}
		<li class="sep" aria-hidden="true">|</li>
		<li><a href="/privacy-policy">Privacy Policy</a></li>
	</ul>
	<p>© 2026 {profile.name}. All rights reserved.</p>
</footer>

<style lang="scss">
	footer {
		padding: var(--spacing-xxl) var(--spacing-l);
		background-color: var(--color-bg-dark);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-m);
		justify-content: center;
		align-items: center;
		list-style: none;
		color: var(--color-primary);
	}

	.sep {
		color: var(--color-light-fade);
	}

	a {
		color: var(--color-primary);
		text-decoration: none;
		font-size: var(--font-size-small);
		transition: color 0.2s ease;

		&::after {
			content: '';
			display: block;
			width: 0;
			height: 1px;
			background-color: var(--color-secondary);
			transition: width 0.2s ease;
		}

		&:hover {
			color: var(--color-secondary);
			&::after {
				width: 100%;
			}
		}
	}

	p {
		text-align: center;
		color: var(--color-primary);
		font-size: var(--font-size-small);
		margin-top: var(--spacing-xl);
	}

	@media screen and (max-width: 768px) {
		ul {
			flex-direction: column;
			gap: var(--spacing-xs);
		}

		.sep {
			display: none;
		}
	}
</style>
