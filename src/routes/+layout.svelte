<script lang="ts">
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '../app.scss';
	import NavBar from '$lib/components/nav-bar.svelte';
	import Socials from '$lib/components/socials.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
	let showBackToTop = $state(false);
</script>

<NavBar
	onExitViewport={() => (showBackToTop = true)}
	onEnterViewport={() => (showBackToTop = false)}
/>
<Socials {showBackToTop} />

{@render children?.()}
