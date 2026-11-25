<script lang="ts">
	import HeroSection from '$lib/components/home/sections/hero.section.svelte';
	import SkillsSection from '$lib/components/home/sections/skills/skills.section.svelte';
	import WorkSection from '$lib/components/home/sections/my-work/work.section.svelte';
	import ExperienceSection from '$lib/components/home/sections/experience/experience.section.svelte';
	import ContactMeSection from '$lib/components/home/sections/contact/contact-me.section.svelte';
	import Footer from '$lib/components/home/sections/footer.svelte';
	import { profile } from '$lib/data/profile';

	let { form } = $props();
</script>

<svelte:head>
	<title>{profile.name} — Cybersecurity &amp; Security Research</title>
	<meta name="description" content={profile.introduction} />
</svelte:head>

<main>
	<HeroSection />
	<SkillsSection />
	<WorkSection />
	<ExperienceSection />
	<ContactMeSection {form} />
	<Footer />
</main>
