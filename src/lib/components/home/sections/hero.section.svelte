<script lang="ts">
	import { onMount } from "svelte";
	import { profile, socialProfiles } from "$lib/data/profile";
	import { getGsap, prefersReducedMotion } from "$lib/util/gsap";

	let heroRef: HTMLElement | undefined = $state();

	const linkedin = socialProfiles.find((s) => s.id === "linkedin")!;
	const github = socialProfiles.find((s) => s.id === "github")!;

	function handleCtaClick() {
		document
			.getElementById("contact-me")
			?.scrollIntoView({ behavior: "smooth" });
	}

	onMount(() => {
		if (!heroRef || prefersReducedMotion()) return;
		const { gsap } = getGsap();
		const ctx = gsap.context(() => {
			gsap.from(".hero-animate", {
				y: 12,
				duration: 0.45,
				stagger: 0.06,
				ease: "power2.out",
				clearProps: "transform",
			});
		}, heroRef);

		return () => ctx.revert();
	});
</script>

<section class="hero" bind:this={heroRef}>
	<div class="cta-container">
		<p class="cta-greeting cta-greeting--hi hero-animate">
			{profile.greeting}
		</p>
		<p class="cta-greeting cta-greeting--name-paragraph hero-animate">
			my name is
		</p>
		<h1 class="hero-animate">{profile.name}</h1>
		<p class="cta-headline hero-animate">{profile.headline}</p>
		<p class="cta-introduction hero-animate">
			{profile.introduction}
		</p>
		<div class="cta-actions hero-animate">
			<button type="button" onclick={handleCtaClick} class="cta-button">
				<span>GET IN TOUCH</span>
			</button>
			<div class="quick-links">
				<a
					href={linkedin.href}
					target="_blank"
					rel="noopener noreferrer">LinkedIn</a
				>
				<span aria-hidden="true">/</span>
				<a href={github.href} target="_blank" rel="noopener noreferrer"
					>GitHub</a
				>
			</div>
		</div>
	</div>

	<div class="portrait-wrap hero-animate">
		<img src={profile.avatarSrc} alt={profile.avatarAlt} />
	</div>
</section>

<style lang="scss">
	.hero {
		width: 100%;
		min-height: calc(100vh - 96px);
		background-color: var(--color-bg-dark);
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		align-items: center;
		padding: var(--spacing-xl) 0 var(--spacing-xxl);
		overflow-x: hidden;
	}

	.cta-container {
		position: relative;
		grid-column: 2 / 6;
		z-index: 2;
	}

	.cta-greeting {
		font-size: var(--font-size-h3);
		color: var(--color-secondary);

		&--hi {
			font-size: var(--font-size-h1);
			margin-bottom: var(--spacing-l);
			font-weight: 700;
		}

		&--name-paragraph {
			display: inline-block;
			white-space: nowrap;
			margin-right: var(--spacing-s);
		}
	}

	h1 {
		display: inline-block;
		font-size: var(--font-size-h2);
		color: var(--color-primary);
		font-weight: 700;
		padding: var(--spacing-s) 0;
	}

	.cta-headline {
		margin-top: var(--spacing-s);
		font-size: var(--font-size-h3);
		line-height: var(--line-height-normal);
		color: var(--color-secondary);
		font-weight: 600;
		max-width: 520px;
	}

	.cta-introduction {
		max-width: 460px;
		margin: var(--spacing-xl) 0;
		color: var(--color-primary);
		font-weight: 300;
		line-height: var(--line-height-large);
		letter-spacing: var(--letter-spacing-s);
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--spacing-l);
	}

	.cta-button {
		position: relative;
		background-color: var(--color-primary);
		color: var(--color-text-on-primary);
		padding: var(--spacing-m) var(--spacing-xxl);
		border: none;
		border-radius: var(--border-radius-s);
		font-size: var(--font-size-b1);
		font-weight: 700;
		letter-spacing: var(--letter-spacing-m);
		cursor: pointer;
		transition: transform 0.2s ease-in-out;
		overflow: hidden;

		&::after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 0%;
			height: 100%;
			background-color: var(--color-secondary);
			z-index: 1;
			border-radius: var(--border-radius-s);
			transition: width 0.22s ease-in-out;
		}

		span {
			position: relative;
			z-index: 2;
		}

		&:hover {
			transform: scale(1.01);

			&::after {
				width: 100%;
			}
		}
	}

	.quick-links {
		display: flex;
		align-items: center;
		gap: var(--spacing-s);
		font-size: 0.9rem;
		color: var(--color-light-fade);

		a {
			color: var(--color-primary);
			text-decoration: none;
			font-weight: 600;
			border-bottom: 1px solid transparent;
			transition:
				color 0.2s ease,
				border-color 0.2s ease;

			&:hover {
				color: var(--color-secondary);
				border-bottom-color: var(--color-secondary);
			}
		}
	}

	.portrait-wrap {
		grid-column: 6 / 8;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 100%;
			max-width: 380px;
			height: auto;
			display: block;
			border-radius: var(--border-radius-l);
			box-shadow: 0 18px 40px rgba(47, 53, 92, 0.08);
		}
	}

	@media screen and (max-width: 1080px) {
		.cta-container {
			grid-column: 2 / 6;
		}

		.portrait-wrap {
			grid-column: 6 / 8;
		}
	}

	@media screen and (max-width: 768px) {
		.hero {
			display: flex;
			flex-direction: column-reverse;
			min-height: auto;
			padding: var(--spacing-l) var(--spacing-l) var(--spacing-xxl);
			gap: var(--spacing-xl);
		}

		.cta-container {
			width: 100%;
			text-align: left;
		}

		.cta-introduction {
			max-width: 100%;
			margin: var(--spacing-l) 0;
		}

		.cta-actions {
			flex-direction: column;
			align-items: stretch;
			gap: var(--spacing-m);
		}

		.cta-button {
			width: 100%;
			text-align: center;
		}

		.quick-links {
			justify-content: center;
		}

		.portrait-wrap img {
			max-width: 240px;
		}
	}
</style>
