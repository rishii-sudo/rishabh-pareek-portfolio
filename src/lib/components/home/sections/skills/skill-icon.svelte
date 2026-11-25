<script lang="ts">
	interface Props {
		name: string;
	}

	let { name }: Props = $props();
</script>

{#if name === 'Go'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<text x="12" y="16" text-anchor="middle" fill="#00ADD8" font-family="Inter, sans-serif" font-weight="800" font-size="13">GO</text>
	</svg>
{:else if name === 'JavaScript'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E" />
		<text x="17" y="19" text-anchor="end" fill="#000000" font-family="Inter, sans-serif" font-weight="800" font-size="11">JS</text>
	</svg>
{:else if name === 'TypeScript'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6" />
		<text x="17" y="19" text-anchor="end" fill="#ffffff" font-family="Inter, sans-serif" font-weight="800" font-size="11">TS</text>
	</svg>
{:else if name === 'Node.js'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path fill="#5FA04E" d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm0 2.6l6 3.5v7l-6 3.5-6-3.5v-7l6-3.5z" />
	</svg>
{:else if name === 'SQL'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<ellipse cx="12" cy="6.5" rx="7" ry="2.8" fill="none" stroke="#336791" stroke-width="1.8" />
		<path d="M5 6.5v11c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-11" fill="none" stroke="#336791" stroke-width="1.8" />
		<path d="M5 12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8" fill="none" stroke="#336791" stroke-width="1.8" />
	</svg>
{:else if name === 'Bash'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<rect x="2.5" y="4" width="19" height="16" rx="2" fill="#2f355c" />
		<path d="M6.5 9.5l3 2.5-3 2.5M11.5 14.5h5" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
	</svg>
{:else if name === 'Git'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path
			fill="#F05032"
			d="M21.62 11.11l-8.73-8.73a1.3 1.3 0 0 0-1.84 0L9.2 4.23l2.31 2.31a1.54 1.54 0 0 1 1.95 1.96l2.23 2.23a1.54 1.54 0 1 1-.92.87l-2.08-2.08v5.47a1.54 1.54 0 1 1-1.27-.04V9.43a1.54 1.54 0 0 1-.84-2.02L8.3 5.13 2.38 11.05a1.3 1.3 0 0 0 0 1.84l8.73 8.73a1.3 1.3 0 0 0 1.84 0l8.67-8.67a1.3 1.3 0 0 0 0-1.84z"
		/>
	</svg>
{:else if name === 'Docker'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path
			fill="#2496ED"
			d="M13 7h2v2h-2V7zm-3 0h2v2h-2V7zm-3 0h2v2H7V7zm6 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2H7v-2zm-3 0h2v2H4v-2zm9-6h2v2h-2V4zm8.3 6.8c-.4-.3-1.4-.4-2.1-.2-.1-.7-.5-1.3-1-1.7l-.3-.2-.2.3c-.4.5-.5 1.2-.4 1.8.1.4.3.8.6 1.1-.4.2-.9.3-1.4.3H2.6l-.1.5c-.2 1.6.1 3.2.9 4.5 1.1 1.8 2.9 2.7 5.3 2.7 4.4 0 7.7-2 9.4-5.7.6 0 1.9 0 2.5-1.3.1-.1.3-.6.4-.8l-.7-.3z"
		/>
	</svg>
{:else if name === 'Ubuntu'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<circle cx="12" cy="12" r="6.5" fill="none" stroke="#E95420" stroke-width="2.4" />
		<circle cx="12" cy="4" r="2" fill="#E95420" />
		<circle cx="5.2" cy="16" r="2" fill="#E95420" />
		<circle cx="18.8" cy="16" r="2" fill="#E95420" />
	</svg>
{:else if name === 'Windows'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path fill="#0078D4" d="M3 4.5l8-1.1v7.8H3V4.5zm9-1.2L21 2v9.2h-9V3.3zM3 12.2h8v7.9l-8-1.1v-6.8zm9 0h9V21l-9-1.3v-7.5z" />
	</svg>
{:else if name === 'Kali Linux'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path fill="#2f355c" d="M4 17c4.5-1.5 7.5-4.5 9.5-9.5 1 2.2 2.4 3.5 4.5 4-2.5 1.2-4.2 3-5.2 5.5H4z" />
		<circle cx="16.5" cy="7.5" r="2" fill="#e7472b" />
	</svg>
{:else if name === 'VMware'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<rect x="3" y="3" width="11" height="11" rx="2" fill="none" stroke="#2f355c" stroke-width="2" />
		<rect x="10" y="10" width="11" height="11" rx="2" fill="none" stroke="#0091DA" stroke-width="2" />
	</svg>
{:else if name === 'Burp Suite'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path fill="#FF6633" d="M12 2v5l-4 4h4v3l4-4h-4V2zm0 20v-5l4-4h-4v-3l-4 4h4v8z" />
	</svg>
{:else if name === 'Wireshark'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path d="M3 18h18M7 18c1-6 4.5-10 9-12-1 4.5-1 8.5 1 12" fill="none" stroke="#1679A7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{:else if name === 'Nmap'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<circle cx="12" cy="12" r="8" fill="none" stroke="#2f355c" stroke-width="1.8" />
		<circle cx="12" cy="12" r="3" fill="#e7472b" />
		<path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#2f355c" stroke-width="1.8" />
	</svg>
{:else if name === 'Metasploit'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path fill="#2596CD" d="M12 2L4 6v6c0 5 3.4 9.2 8 10.5 4.6-1.3 8-5.5 8-10.5V6l-8-4zm-4 13V8l4 3.5L16 8v7h-2v-3.8l-2 1.8-2-1.8V15H8z" />
	</svg>
{:else if name === 'OWASP ZAP'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path fill="#00549E" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
	</svg>
{:else if name === 'Hashcat'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path d="M9 4L7 20M17 4l-2 16M4 9h16M3 15h16" stroke="#2f355c" stroke-width="2" stroke-linecap="round" />
	</svg>
{:else if name === 'Kismet'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path d="M4 10a11 11 0 0 1 16 0M7 13.5a7 7 0 0 1 10 0M10 17a3 3 0 0 1 4 0" fill="none" stroke="#2f355c" stroke-width="2" stroke-linecap="round" />
		<circle cx="12" cy="19.5" r="1.5" fill="#e7472b" />
	</svg>
{:else if name === 'MobSF'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<rect x="6.5" y="2.5" width="11" height="19" rx="2" fill="none" stroke="#2f355c" stroke-width="1.8" />
		<circle cx="12" cy="18" r="1" fill="#2f355c" />
		<path d="M9.5 9l2.5 2.5L14.5 9" stroke="#e7472b" stroke-width="1.8" stroke-linecap="round" fill="none" />
	</svg>
{:else if name === 'Penetration Testing'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<circle cx="12" cy="12" r="7.5" fill="none" stroke="#2f355c" stroke-width="1.8" />
		<path d="M12 7v10M7 12h10" stroke="#e7472b" stroke-width="1.8" />
	</svg>
{:else if name === 'Reconnaissance'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<circle cx="10.5" cy="10.5" r="6" fill="none" stroke="#2f355c" stroke-width="1.8" />
		<path d="M15 15l5 5" stroke="#2f355c" stroke-width="2" stroke-linecap="round" />
	</svg>
{:else if name === 'Vulnerability Assessment'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path d="M12 3l8 3.5v5.5c0 4.5-3.2 8.4-8 9.6-4.8-1.2-8-5.1-8-9.6V6.5L12 3z" fill="none" stroke="#2f355c" stroke-width="1.8" />
		<path d="M12 8.5v4M12 15.5h.01" stroke="#e7472b" stroke-width="2" stroke-linecap="round" />
	</svg>
{:else if name === 'Web Application Security'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="#2f355c" stroke-width="1.8" />
		<path d="M3 9h18M9 14l-2 2 2 2M15 14l2 2-2 2" stroke="#2f355c" stroke-width="1.6" stroke-linecap="round" fill="none" />
	</svg>
{:else if name === 'API Security'}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<path d="M8 7l-4 5 4 5M16 7l4 5-4 5M13.5 6l-3 12" stroke="#2f355c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
	</svg>
{:else}
	<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
		<rect x="6" y="3" width="12" height="18" rx="2" fill="none" stroke="#2f355c" stroke-width="1.8" />
		<path d="M9.5 8h5M9.5 12h5" stroke="#e7472b" stroke-width="1.8" stroke-linecap="round" />
	</svg>
{/if}
