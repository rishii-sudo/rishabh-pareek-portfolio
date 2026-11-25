export interface SkillCategory {
	id: string;
	label: string;
	summary: string;
	skills: string[];
}

export const skillCategories: SkillCategory[] = [
	{
		id: 'offensive-security',
		label: 'Offensive Security',
		summary: 'Manual & structured security testing on authorized web, API, and mobile targets.',
		skills: [
			'Penetration Testing',
			'Reconnaissance',
			'Vulnerability Assessment',
			'Web Application Security',
			'API Security',
			'Android Security Research'
		]
	},
	{
		id: 'security-tools',
		label: 'Security Tools',
		summary: 'Intercepting proxies, network scanners, packet analyzers, and mobile assessment suites.',
		skills: [
			'Burp Suite',
			'Nmap',
			'Metasploit',
			'Wireshark',
			'OWASP ZAP',
			'Hashcat',
			'Kismet',
			'MobSF'
		]
	},
	{
		id: 'development',
		label: 'Development',
		summary: 'Building cross-platform CLI tooling, research backends, and automation scripts.',
		skills: ['Go', 'JavaScript', 'TypeScript', 'Node.js', 'SQL', 'Bash']
	},
	{
		id: 'platforms',
		label: 'Platforms',
		summary: 'Operating systems, virtualization, and version-control workflows for isolated lab environments.',
		skills: ['Kali Linux', 'Ubuntu', 'Windows', 'VMware', 'Git', 'Docker']
	}
];
