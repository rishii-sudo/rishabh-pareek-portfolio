<script lang="ts">
	import Footer from '$lib/components/home/sections/footer.svelte';
	import { profile } from '$lib/data/profile';
</script>

<svelte:head>
	<title>Privacy Policy — {profile.name}</title>
</svelte:head>

<main class="policy-page">
	<article>
		<a class="back-link" href="/">← Back to Portfolio</a>
		<h1>Privacy Policy</h1>
		<p>
			This personal portfolio website for <strong>{profile.name}</strong> does not run third-party
			advertising trackers or analytics cookies.
		</p>
		<h2>Contact Form Data</h2>
		<p>
			When you submit the contact form, your name, email address, subject, and message are used solely
			to respond to your inquiry. Information is not sold or shared with third parties.
		</p>
		<h2>Contact</h2>
		<p>
			For any privacy questions, please reach out to
			<a href={`mailto:${profile.email}`}>{profile.email}</a>.
		</p>
	</article>
</main>
<Footer />

<style lang="scss">
	.policy-page {
		background-color: var(--color-bg-dark);
		padding: var(--spacing-xxl) var(--spacing-page-inset);
		min-height: 70vh;
	}

	article {
		max-width: 720px;
		background-color: var(--color-bg-light);
		padding: var(--spacing-xl);
		border-radius: var(--border-radius-s);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-m);
		letter-spacing: var(--letter-spacing-s);
	}

	.back-link {
		color: var(--color-secondary);
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9rem;
	}

	h1 {
		color: var(--color-primary);
		font-size: var(--font-size-h2);
	}

	h2 {
		color: var(--color-primary);
		font-size: var(--font-size-h3);
		margin-top: var(--spacing-s);
	}

	p {
		line-height: var(--line-height-large);
		color: var(--color-text-on-bg-light);
	}
</style>
