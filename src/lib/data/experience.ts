export interface ExperienceEntry {
	id: string;
	yearLabel: string;
	period: string;
	role: string;
	organization: string;
	location?: string;
	type: 'employment' | 'education' | 'lab-practice';
	highlights: string[];
}

export interface CredentialItem {
	name: string;
	kind: 'Certification' | 'Learning Path' | 'Training';
}

export interface CertificationGroup {
	index: string;
	id: string;
	provider: string;
	subtitle: string;
	items: CredentialItem[];
}

export const timelineMilestones: ExperienceEntry[] = [
	{
		id: 'jecrc-university',
		yearLabel: '2024',
		period: '2024 – Expected 2028',
		role: 'B.Tech Computer Science, Cybersecurity Specialization',
		organization: 'JECRC University',
		location: 'Jaipur',
		type: 'education',
		highlights: [
			'Undergraduate studies focused on computer science fundamentals, network security, and offensive/defensive security engineering.'
		]
	},
	{
		id: 'orielix',
		yearLabel: '2024',
		period: 'September 2024 – October 2024',
		role: 'Database Management Intern',
		organization: 'Orielix',
		location: 'Jaipur',
		type: 'employment',
		highlights: [
			'Supported database management, data organization, and data-integrity tasks.',
			'Worked with storage and retrieval workflows and foundational data-handling practices.'
		]
	},
	{
		id: 'hands-on-security-labs',
		yearLabel: '2025',
		period: 'October 2025 – Present',
		role: 'Hands-On Security Practice',
		organization: 'TryHackMe, Hack The Box, and personal security labs',
		type: 'lab-practice',
		highlights: [
			'Hands-on lab practice covering reconnaissance, enumeration, web and API testing, and privilege escalation on authorized targets.',
			'Manual vulnerability validation (XSS, SQLi, IDOR, broken authentication) using Burp Suite and custom tooling.',
			'Isolated Red/Blue Team lab exercises mapping attacker techniques to MITRE ATT&CK and endpoint telemetry.'
		]
	}
];

export const certificationGroups: CertificationGroup[] = [
	{
		index: '01',
		id: 'ec-council',
		provider: 'EC-Council',
		subtitle: 'Network Defense & Security Fundamentals',
		items: [
			{ name: 'Certified Network Defender (CND)', kind: 'Certification' },
			{ name: 'Certified Security Specialist (ECSS)', kind: 'Certification' },
			{ name: 'Certified Secure Computer User (CSCU)', kind: 'Certification' }
		]
	},
	{
		index: '02',
		id: 'tryhackme',
		provider: 'TryHackMe',
		subtitle: 'Practical Offensive & Defensive Training',
		items: [
			{ name: 'Offensive Pentesting Certificate', kind: 'Certification' },
			{ name: 'CompTIA PenTest+ Learning Path Certificate', kind: 'Certification' },
			{ name: 'Security Engineer Path', kind: 'Learning Path' },
			{ name: 'DevSecOps Path', kind: 'Learning Path' },
			{ name: 'AI Security Path', kind: 'Learning Path' }
		]
	},
	{
		index: '03',
		id: 'cisco',
		provider: 'Cisco',
		subtitle: 'Networking & Endpoint Foundations',
		items: [
			{ name: 'Introduction to Cybersecurity', kind: 'Training' },
			{ name: 'Networking Basics', kind: 'Training' },
			{ name: 'Endpoint Security', kind: 'Training' }
		]
	},
	{
		index: '04',
		id: 'attackiq',
		provider: 'AttackIQ',
		subtitle: 'Adversary Emulation & Threat Frameworks',
		items: [{ name: 'Foundations of Operationalizing MITRE ATT&CK v13', kind: 'Training' }]
	}
];
