import { expect, test } from '@playwright/test';

const viewports = [
	{ name: 'desktop', width: 1440, height: 900 },
	{ name: 'tablet', width: 768, height: 1024 },
	{ name: 'mobile', width: 390, height: 844 }
];

for (const vp of viewports) {
	test(`renders without horizontal overflow or console errors at ${vp.name} (${vp.width}px)`, async ({
		page
	}) => {
		const consoleErrors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				consoleErrors.push(msg.text());
			}
		});
		page.on('pageerror', (err) => {
			consoleErrors.push(err.message);
		});

		await page.setViewportSize({ width: vp.width, height: vp.height });
		await page.goto('/');

		await expect(page.getByRole('heading', { name: 'Rishabh Pareek' })).toBeVisible();
		await expect(page.getByRole('heading', { name: "I'M GOOD AT THIS" })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'THINGS, I WORKED ON' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'EXPERIENCE', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'CONTACT ME' })).toBeVisible();

		// Experience milestones must never be blank / opacity: 0 before scrolling
		const expOpacity = await page.evaluate(() => {
			const el = document.querySelector('.milestone-content-0');
			return el ? parseFloat(getComputedStyle(el).opacity) : 0;
		});
		expect(expOpacity).toBe(1);

		const hasOverflow = await page.evaluate(() => {
			return document.documentElement.scrollWidth > document.documentElement.clientWidth;
		});
		expect(hasOverflow).toBe(false);
		expect(consoleErrors).toEqual([]);

		await page.screenshot({
			path: `C:/Users/fremi/.gemini/antigravity/brain/3fd37360-0956-49c7-ad5e-8189be6f0624/portfolio-${vp.name}.png`,
			fullPage: true
		});
	});
}

test('skill bucket, certifications timeline, learning profiles, and contact form work', async ({
	page
}) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/');

	// Skill Bucket contains all 26 skills with accessible labels
	const skillTokens = page.locator('#skills .skill-token');
	await expect(skillTokens).toHaveCount(26);
	await expect(page.getByRole('button', { name: /Burp Suite/ })).toBeVisible();
	await expect(page.getByRole('button', { name: /Penetration Testing/ })).toBeVisible();
	await expect(page.getByRole('button', { name: /Go \(Development\)/ })).toBeVisible();
	await expect(page.getByRole('button', { name: /Kali Linux/ })).toBeVisible();

	// Certifications & Training timeline
	await expect(page.getByRole('heading', { name: 'CERTIFICATIONS & TRAINING' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'EC-Council' })).toBeVisible();
	await expect(page.getByText('Certified Network Defender (CND)')).toBeVisible();
	await expect(page.getByText('Security Engineer Path')).toBeVisible();

	// Security Learning Profiles directory
	await expect(page.getByRole('heading', { name: 'SECURITY LEARNING PROFILES' })).toBeVisible();
	await expect(
		page.locator('#learning-profiles a[href="https://github.com/rishii-sudo"]')
	).toBeVisible();
	await expect(
		page.locator(
			'#learning-profiles a[href="https://profile.hackthebox.com/profile/019cc396-c268-72b9-aa7d-1eff5f726cdb"]'
		)
	).toBeVisible();

	// Project links
	await expect(
		page.locator('a[href="https://github.com/rishii-sudo/privacy-gateway"]')
	).toBeVisible();
	await expect(page.locator('a[href="https://scam-tracker-india.vercel.app/"]')).toBeVisible();

	// Contact form validation & mailto fallback
	await page.getByRole('button', { name: /Send/i }).click();
	await expect(page.getByText('Uh-oh! This field cannot be left blank.').first()).toBeVisible();

	await page.getByLabel('Name').fill('Security Researcher');
	await page.getByLabel('Email address').fill('researcher@example.com');
	await page.getByLabel('Subject').fill('Portfolio Inquiry');
	await page.getByLabel('Message').fill('Testing the contact form validation and fallback.');
	await page.locator('#consent').check();
	await page.getByRole('button', { name: /Send/i }).click();

	await expect(page.getByRole('link', { name: 'Open Email Client' })).toBeVisible();
});

for (const vp of viewports) {
	test(`experience curved timeline draws on scroll-down and reverses on scroll-up at ${vp.name} (${vp.width}px)`, async ({
		page
	}) => {
		await page.setViewportSize({ width: vp.width, height: vp.height });
		await page.goto('/');

		await page.evaluate(() => {
			const grid = document.querySelector('#experience .timeline-grid');
			if (grid) {
				const rect = grid.getBoundingClientRect();
				const targetY = rect.top + window.scrollY - window.innerHeight * 0.25;
				window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
			}
		});
		await page.waitForTimeout(450);

		const midOffset = await page.evaluate((isMobile) => {
			const selector = isMobile
				? '.curve-column--mobile .timeline-path'
				: '.curve-column--desktop .timeline-path';
			const path = document.querySelector(selector) as SVGPathElement | null;
			return path ? parseFloat(getComputedStyle(path).strokeDashoffset) : -1;
		}, vp.width <= 640);
		expect(midOffset).toBeGreaterThanOrEqual(0);

		await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
		await page.waitForTimeout(450);

		const topOffset = await page.evaluate((isMobile) => {
			const selector = isMobile
				? '.curve-column--mobile .timeline-path'
				: '.curve-column--desktop .timeline-path';
			const path = document.querySelector(selector) as SVGPathElement | null;
			return path ? parseFloat(getComputedStyle(path).strokeDashoffset) : -1;
		}, vp.width <= 640);
		expect(topOffset).toBeGreaterThan(midOffset);
	});
}

test('experience and certifications timelines render immediately under prefers-reduced-motion', async ({
	page
}) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/');

	const offset = await page.evaluate(() => {
		const path = document.querySelector('.curve-column--desktop .timeline-path') as SVGPathElement | null;
		return path ? parseFloat(getComputedStyle(path).strokeDashoffset) : -1;
	});
	expect(offset).toBe(0);

	const certOffset = await page.evaluate(() => {
		const line = document.querySelector('.cert-line-draw') as SVGLineElement | null;
		return line ? parseFloat(getComputedStyle(line).strokeDashoffset) : -1;
	});
	expect(certOffset).toBe(0);

	await expect(page.getByRole('heading', { name: 'JECRC University, Jaipur' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Orielix, Jaipur' })).toBeVisible();
});
