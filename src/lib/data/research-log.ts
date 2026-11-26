export type ResearchCategory = 'Tooling' | 'Mobile Forensics' | 'Lab Note';

export interface ResearchLogEntry {
	id: string;
	date: string;
	category: ResearchCategory;
	title: string;
	summary: string;
	technicalNote: string;
	scopeNote: string;
	tags: string[];
	repoUrl?: string;
}

export const researchLogEntries: ResearchLogEntry[] = [
	{
		id: 'log-privacy-gateway-m1',
		date: '2026',
		category: 'Tooling',
		title: 'Read-Only Network Diagnostics & Explicit Verification States in Go',
		summary:
			'Designing Privacy Gateway around non-destructive discovery and deterministic state reporting (M1 foundation).',
		technicalNote:
			'Structured the config, monitoring, privacy, and reporting packages so each check returns an explicit verification state rather than silently passing on missing permissions or unsupported interfaces.',
		scopeNote: 'M1 foundation implemented · Early development',
		tags: ['Go', 'CLI', 'YAML', 'Network Diagnostics'],
		repoUrl: 'https://github.com/rishii-sudo/privacy-gateway'
	},
	{
		id: 'log-android-ipc-review',
		date: 'Ongoing',
		category: 'Mobile Forensics',
		title: 'Android Manifest, Permission & Exported IPC Surface Auditing',
		summary:
			'Combining static APK inspection in MobSF with live ADB runtime checks on owned test devices.',
		technicalNote:
			'Documented a repeatable workflow to audit exported activities, broadcast receivers, and content providers, then verify intent handling and local storage artifacts via ADB.',
		scopeNote: 'Authorized research · Owned emulator & physical test device',
		tags: ['Android', 'MobSF', 'ADB', 'IPC']
	},
	{
		id: 'log-sliver-telemetry',
		date: 'Ongoing',
		category: 'Lab Note',
		title: 'Correlating Sliver C2 Lab Activity with Endpoint Telemetry & PCAPs',
		summary:
			'Observing command-and-control network patterns and host artifacts inside an isolated VMware lab.',
		technicalNote:
			'Executed controlled sessions between Kali Linux and a Windows target VM, capturing traffic in Wireshark and mapping observed behaviors to MITRE ATT&CK techniques.',
		scopeNote: 'Isolated VMware home lab · Owned systems only',
		tags: ['Sliver C2', 'Wireshark', 'MITRE ATT&CK', 'VMware']
	},
	{
		id: 'log-wifi-csi-filtering',
		date: '2026',
		category: 'Lab Note',
		title: 'Signal Filtering & Real-Time Streaming for Wi-Fi CSI Prototypes',
		summary:
			'Exploring SciPy bandpass filtering and LSTM sequence modeling for passive RF sensing in AirPulse.',
		technicalNote:
			'Evaluated subcarrier smoothing and FastAPI WebSocket streaming to keep latency low while clearly bounding the prototype as experimental non-clinical research.',
		scopeNote: 'Experimental research prototype · Not a medical device',
		tags: ['Python', 'SciPy', 'PyTorch', 'FastAPI'],
		repoUrl: 'https://github.com/rishii-sudo/AirPulse'
	}
];
