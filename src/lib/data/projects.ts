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
		githubUrl: 'https://github.com/rishii-sudo/privacy-gateway'
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
		liveUrl: 'https://scam-tracker-india.vercel.app/'
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
		githubUrl: 'https://github.com/rishii-sudo/AirPulse'
	},
	{
		id: 'android-security-lab',
		title: 'Android Security Research & Forensics Lab',
		description:
			'Personal research project focused on authorized Android security analysis, APK inspection, Android permissions, IPC, application behavior and mobile forensics.',
		tags: ['Android', 'MobSF', 'ADB', 'Linux', 'Android Security Tools'],
		status: 'Research / lab work',
		image: '/images/projects/android-lab.svg',
		imageAlt: 'Android Security Research and Forensics workflow diagram'
	},
	{
		id: 'red-blue-home-lab',
		title: 'Red Team / Blue Team Home Lab',
		description:
			'An isolated environment for studying C2 infrastructure, endpoint telemetry, defensive monitoring and incident investigation.',
		tags: ['Sliver C2', 'Kali Linux', 'Windows', 'VMware', 'Wireshark'],
		status: 'Personal laboratory',
		image: '/images/projects/red-blue-lab.svg',
		imageAlt: 'Red Team and Blue Team isolated home lab topology'
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
		secondary: true
	}
];
