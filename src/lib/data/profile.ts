export interface SocialProfile {
	id: 'github' | 'linkedin' | 'hackthebox' | 'tryhackme';
	label: string;
	href: string;
	handle: string;
	description: string;
}

export interface ContactMethod {
	id: 'email' | 'instagram' | 'discord' | 'linkedin' | 'github';
	label: string;
	href: string;
	external: boolean;
}

export interface SidebarSocialItem {
	id: 'github' | 'linkedin' | 'hackthebox' | 'tryhackme' | 'instagram' | 'discord' | 'email';
	label: string;
	href: string;
	external: boolean;
}

export const profile = {
	name: 'Rishabh Pareek',
	monogram: 'rp',
	greeting: 'Hi!',
	headline: 'I BUILD, TEST AND SECURE DIGITAL SYSTEMS.',
	introduction:
		"I'm a Cybersecurity student at JECRC University, Jaipur, focused on Offensive Security, Application Security and Security Research. I enjoy understanding how systems work, identifying security weaknesses and building tools that make digital environments safer.",
	email: 'fremindly@gmail.com',
	location: 'Jaipur, India',
	avatarSrc: '/images/profile-placeholder.svg',
	avatarAlt: 'Rishabh Pareek portrait placeholder'
} as const;

export const socialProfiles: SocialProfile[] = [
	{
		id: 'github',
		label: 'GitHub',
		href: 'https://github.com/rishii-sudo',
		handle: '@rishii-sudo',
		description: 'Security tools, research prototypes and source repositories.'
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/rishabhpareek-security/',
		handle: 'rishabhpareek-security',
		description: 'Professional experience, cybersecurity interests and technical updates.'
	},
	{
		id: 'hackthebox',
		label: 'Hack The Box',
		href: 'https://profile.hackthebox.com/profile/019cc396-c268-72b9-aa7d-1eff5f726cdb',
		handle: 'HTB Profile',
		description: 'Hands-on offensive security labs and machine challenges.'
	},
	{
		id: 'tryhackme',
		label: 'TryHackMe',
		href: 'https://tryhackme.com/p/48sh1xbh',
		handle: '@48sh1xbh',
		description: 'Guided penetration testing, web application security and blue-team labs.'
	}
];

export const contactMethods: ContactMethod[] = [
	{
		id: 'email',
		label: 'fremindly@gmail.com',
		href: 'mailto:fremindly@gmail.com',
		external: false
	},
	{
		id: 'instagram',
		label: 'Instagram',
		href: 'https://www.instagram.com/48sh1xbh.p/',
		external: true
	},
	{
		id: 'discord',
		label: 'Discord',
		href: 'https://discord.com/users/1106909470132551812',
		external: true
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/rishabhpareek-security/',
		external: true
	},
	{
		id: 'github',
		label: 'GitHub',
		href: 'https://github.com/rishii-sudo',
		external: true
	}
];

export const sidebarSocials: SidebarSocialItem[] = [
	{
		id: 'github',
		label: 'GitHub',
		href: 'https://github.com/rishii-sudo',
		external: true
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/rishabhpareek-security/',
		external: true
	},
	{
		id: 'hackthebox',
		label: 'Hack The Box',
		href: 'https://profile.hackthebox.com/profile/019cc396-c268-72b9-aa7d-1eff5f726cdb',
		external: true
	},
	{
		id: 'tryhackme',
		label: 'TryHackMe',
		href: 'https://tryhackme.com/p/48sh1xbh',
		external: true
	},
	{
		id: 'instagram',
		label: 'Instagram',
		href: 'https://www.instagram.com/48sh1xbh.p/',
		external: true
	},
	{
		id: 'discord',
		label: 'Discord',
		href: 'https://discord.com/users/1106909470132551812',
		external: true
	},
	{
		id: 'email',
		label: 'Email (fremindly@gmail.com)',
		href: 'mailto:fremindly@gmail.com',
		external: false
	}
];
