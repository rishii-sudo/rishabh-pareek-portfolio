export interface ProjectCaseStudy {
	overview: string;
	architecture: string[];
	securityScope: string;
	highlights: string[];
}

export interface ProjectItem {
	id: string;
	title: string;
	description: string;
	tags: string[];
	status: string;
	image: string;
	imageAlt: string;
	githubUrl?: string;
	liveUrl?: string;
	secondary?: boolean;
	caseStudy: ProjectCaseStudy;
}

export const projects: ProjectItem[] = [
	{
		id: 'privacy-gateway',
		title: 'Privacy Gateway',
		description:
			'A Go-based privacy verification and network security monitoring application. Designed around read-only discovery, local diagnostics, explicit verification states and structured reporting.',
		tags: ['Go', 'CLI', 'YAML', 'Windows', 'Linux'],
		status: 'Early development · M1 foundation implemented',
		image: '/images/projects/privacy-gateway.svg',
		imageAlt: 'Privacy Gateway network diagnostics diagram',
		githubUrl: 'https://github.com/rishii-sudo/privacy-gateway',
		caseStudy: {
			overview:
				'Privacy Gateway is a cross-platform Go CLI built to inspect local network configuration and privacy posture without making intrusive system modifications.',
			architecture: [
				'Config package loading declarative YAML profiles for diagnostic checks.',
				'Read-only discovery and monitoring layer inspecting local network interfaces and state.',
				'Privacy verification engine emitting explicit pass/fail/unknown verification states.',
				'Structured reporting module formatting deterministic CLI output.'
			],
			securityScope:
				'Early development (M1 foundation implemented). Strictly read-only local diagnostics; planned enforcement features are not presented as complete.',
			highlights: [
				'Cross-platform Go binary targeting both Windows and Linux environments.',
				'Explicit verification states prevent ambiguous or silent security assumptions.'
			]
		}
	},
	{
		id: 'scam-tracker-india',
		title: 'Scam Tracker India',
		description:
			'An India-focused scam tracking platform featuring an interactive map, scam categorization, user reports and data visualization.',
		tags: ['React', 'Tailwind CSS', 'Leaflet', 'Supabase', 'PostgreSQL', 'Vercel'],
		status: 'Deployed',
		image: '/images/projects/scam-tracker-india.svg',
		imageAlt: 'Scam Tracker India interactive map preview',
		githubUrl: 'https://github.com/rishii-sudo/scam-tracker-india',
		liveUrl: 'https://scam-tracker-india.vercel.app/',
		caseStudy: {
			overview:
				'A public cyber-threat intelligence and awareness web application visualizing scam patterns and user-submitted incident reports across India.',
			architecture: [
				'React + Tailwind CSS frontend with Leaflet interactive geographic mapping.',
				'Supabase & PostgreSQL backend storing categorized scam incidents and regional metadata.',
				'Trend and category views for filtering scam vectors by type and location.'
			],
			securityScope:
				'Public awareness and threat-tracking interface deployed on Vercel.',
			highlights: [
				'Interactive map clustering and category breakdown for regional scam trends.',
				'Structured report submission flow backed by PostgreSQL.'
			]
		}
	},
	{
		id: 'airpulse',
		title: 'AirPulse',
		description:
			'A Wi-Fi CSI research prototype exploring signal processing and machine learning for estimating vital-sign-related signals and indoor positioning. Experimental research prototype, not a clinically validated medical device.',
		tags: ['Python', 'PyTorch', 'LSTM', 'FastAPI', 'WebSockets', 'SciPy'],
		status: 'Experimental research prototype',
		image: '/images/projects/airpulse.svg',
		imageAlt: 'AirPulse Wi-Fi CSI signal analysis diagram',
		githubUrl: 'https://github.com/rishii-sudo/AirPulse',
		caseStudy: {
			overview:
				'Passive RF sensing prototype investigating how Wi-Fi Channel State Information (CSI) subcarriers respond to micro-movements and indoor presence.',
			architecture: [
				'SciPy signal-processing pipeline applying bandpass filtering and noise reduction to raw CSI streams.',
				'PyTorch LSTM sequence model estimating periodic breathing and heart-rate-related patterns.',
				'FastAPI + WebSockets backend streaming real-time inference and trilateration estimates.'
			],
			securityScope:
				'Experimental research prototype only — not a clinically validated medical device.',
			highlights: [
				'Real-time WebSocket streaming between signal pipeline and client dashboard.',
				'Explores non-contact RF sensing without cameras or wearable sensors.'
			]
		}
	},
	{
		id: 'android-security-lab',
		title: 'Android Security Research & Forensics Lab',
		description:
			'Personal research project focused on authorized Android security analysis, APK inspection, Android permissions, IPC, application behavior and mobile forensics.',
		tags: ['Android', 'MobSF', 'ADB', 'Linux', 'Android Security Tools'],
		status: 'Research / lab work',
		image: '/images/projects/android-lab.svg',
		imageAlt: 'Android Security Research and Forensics workflow diagram',
		caseStudy: {
			overview:
				'Structured mobile security testing and forensics workflow conducted on owned physical devices and Android emulators.',
			architecture: [
				'Static APK inspection using MobSF and manifest/permission auditing.',
				'Exported component and Inter-Process Communication (IPC) surface review.',
				'Dynamic runtime observation via ADB shell, logcat, and traffic inspection.'
			],
			securityScope:
				'Authorized targets and self-owned lab devices only.',
			highlights: [
				'Systematic checklist covering AndroidManifest permissions, intents, and content providers.',
				'Reproducible lab notes for mobile forensics and vulnerability validation.'
			]
		}
	},
	{
		id: 'red-blue-home-lab',
		title: 'Red Team / Blue Team Home Lab',
		description:
			'An isolated environment for studying C2 infrastructure, endpoint telemetry, defensive monitoring and incident investigation.',
		tags: ['Sliver C2', 'Kali Linux', 'Windows', 'VMware', 'Wireshark'],
		status: 'Personal laboratory',
		image: '/images/projects/red-blue-lab.svg',
		imageAlt: 'Red Team and Blue Team isolated home lab topology',
		caseStudy: {
			overview:
				'Host-only virtualized laboratory pairing an attacker node (Kali Linux) with an instrumented Windows target to study adversary behavior and detection.',
			architecture: [
				'VMware isolated network segment preventing any external traffic leakage.',
				'Sliver C2 operator & implant exercises on owned Windows VM.',
				'Wireshark packet capture and Windows endpoint telemetry correlation.'
			],
			securityScope:
				'Strictly isolated personal laboratory on owned virtual machines.',
			highlights: [
				'Maps observed C2 beaconing and process activity to MITRE ATT&CK techniques.',
				'Connects offensive execution with defensive visibility and PCAP analysis.'
			]
		}
	},
	{
		id: 'niramaya-setu',
		title: 'NIRAMAYA-SETU',
		description:
			'A rural healthcare care-continuity and referral workflow frontend prototype.',
		tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
		status: 'Secondary engineering prototype',
		image: '/images/projects/niramaya-setu.svg',
		imageAlt: 'NIRAMAYA-SETU referral workflow interface diagram',
		githubUrl: 'https://github.com/rishii-sudo/niramaya-setu',
		secondary: true,
		caseStudy: {
			overview:
				'Frontend prototype designed to model closed-loop patient referrals and care continuity between rural clinics and regional centers.',
			architecture: [
				'Next.js + TypeScript component architecture for referral tracking views.',
				'Tailwind CSS responsive UI modeling patient handoff states.'
			],
			securityScope:
				'Secondary software engineering prototype; not a primary cybersecurity project.',
			highlights: [
				'Clean state modeling for referral status transitions.',
				'Accessible form-driven workflow design.'
			]
		}
	}
];
