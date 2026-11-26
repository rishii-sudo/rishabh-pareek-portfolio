import { expect, test } from '@playwright/test';

const viewports = [
	{ name: 'desktop', width: 1440, height: 900 },
	{ name: 'tablet', width: 768, height: 1024 },
	{ name: 'mobile-390', width: 390, height: 844 },
	{ name: 'mobile-375', width: 375, height: 812 },
	{ name: 'mobile-360', width: 360, height: 800 }
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

		// Verify SVG rendering
		const svgBox = await page.locator('.bucket-handle-svg').boundingBox();
		expect(svgBox?.width).toBeGreaterThan(100);
		expect(svgBox?.height).toBeGreaterThan(10);

		// Verify touch targets >= 44px on project links
		const firstProjectLinkBox = await page.locator('#work .links a').first().boundingBox();
		expect(firstProjectLinkBox?.width).toBeGreaterThanOrEqual(44);
		expect(firstProjectLinkBox?.height).toBeGreaterThanOrEqual(44);

		// Verify mobile typography readability
		if (vp.width <= 390) {
			const skillFontSize = await page.evaluate(() => {
				const el = document.querySelector('#skills .token-label');
				return el ? parseFloat(getComputedStyle(el).fontSize) : 0;
			});
			expect(skillFontSize).toBeGreaterThanOrEqual(13);

			const expBodyFontSize = await page.evaluate(() => {
				const el = document.querySelector('#experience .milestone-entry li');
				return el ? parseFloat(getComputedStyle(el).fontSize) : 0;
			});
			expect(expBodyFontSize).toBeGreaterThanOrEqual(14);
		}

		const hasOverflow = await page.evaluate(() => {
			return document.documentElement.scrollWidth > document.documentElement.clientWidth;
		});
		expect(hasOverflow).toBe(false);
		expect(consoleErrors).toEqual([]);

		if (vp.width <= 390) {
			await page.screenshot({
				path: `C:/Users/fremi/.gemini/antigravity/brain/3fd37360-0956-49c7-ad5e-8189be6f0624/${vp.name}.png`,
				fullPage: true
			});
		}
	});
}

test('skill bucket, certifications timeline, learning profiles, and contact form fallback work', async ({
	page
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');

	// Skill Bucket contains all 26 skills
	await expect(page.locator('#skills .skill-token')).toHaveCount(26);

	// Certifications & Learning Profiles
	await expect(page.getByRole('heading', { name: 'CERTIFICATIONS & TRAINING' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'SECURITY LEARNING PROFILES' })).toBeVisible();

	// Contact form validation & mailto fallback replaces Send button with Open Email Client
	await page.getByRole('button', { name: /Send/i }).click();
	await expect(page.getByText('Uh-oh! This field cannot be left blank.').first()).toBeVisible();

	await page.getByLabel('Name').fill('Security Researcher');
	await page.getByLabel('Email address').fill('researcher@example.com');
	await page.getByLabel('Subject').fill('Portfolio Inquiry');
	await page.getByLabel('Message').fill('Testing the contact form validation and fallback.');
	await page.locator('#consent').check();
	await page.getByRole('button', { name: /Send/i }).click();

	await expect(page.getByRole('link', { name: 'Open Email Client' })).toBeVisible();
	await expect(page.getByRole('button', { name: /Send/i })).not.toBeVisible();
});

test('interactive project case study modal and security research log work', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/');

	// Open Case Study Modal for Privacy Gateway
	const caseStudyBtn = page.getByRole('button', { name: 'Open case study for Privacy Gateway' });
	await caseStudyBtn.click();

	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible();
	await expect(dialog.getByRole('heading', { name: 'Privacy Gateway' })).toBeVisible();
	await expect(dialog.getByText(/M1 foundation implemented/i).first()).toBeVisible();

	// Escape closes modal and restores focus
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await expect(caseStudyBtn).toBeFocused();

	// Security Research Log filtering & note expansion
	await expect(page.getByRole('heading', { name: 'SECURITY RESEARCH LOG' })).toBeVisible();
	await page.getByRole('tab', { name: 'Tooling' }).click();
	await expect(page.locator('#research-log .log-entry')).toHaveCount(1);
	await page.getByRole('button', { name: 'Read Note' }).click();
	await expect(page.locator('#research-log .technical-note')).toBeVisible();

	await page.getByRole('tab', { name: 'All' }).click();
	await expect(page.locator('#research-log .log-entry')).toHaveCount(4);
});

test('modal focus trap, single-focusable behavior, scrollbar compensation, and preview proportions work at 1440px and 390px', async ({
	page
}) => {
	for (const vp of [
		{ width: 1440, height: 900 },
		{ width: 390, height: 844 }
	]) {
		await page.setViewportSize(vp);
		await page.goto('/');

		// Multi-focusable modal (Privacy Gateway: close btn + View Repository link)
		const trigger = page.getByRole('button', { name: 'Open case study for Privacy Gateway' });
		await trigger.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();

		const closeBtn = dialog.getByRole('button', { name: 'Close case study' });
		const repoLink = dialog.getByRole('link', { name: /View Repository/i });
		await expect(closeBtn).toBeFocused();

		// Shift+Tab from first element wraps to last
		await page.keyboard.press('Shift+Tab');
		await expect(repoLink).toBeFocused();

		// Tab from last element wraps back to first
		await page.keyboard.press('Tab');
		await expect(closeBtn).toBeFocused();

		// Preview SVG maintains ~20:9 aspect ratio (not vertically compressed)
		const imgBox = await dialog.locator('.modal-preview img').boundingBox();
		expect(imgBox).not.toBeNull();
		if (imgBox) {
			const ratio = imgBox.width / imgBox.height;
			expect(ratio).toBeGreaterThan(2.0);
			expect(ratio).toBeLessThan(2.45);
		}

		// Body scroll lock & restoration
		const lockedOverflow = await page.evaluate(() => document.body.style.overflow);
		expect(lockedOverflow).toBe('hidden');

		await page.keyboard.press('Escape');
		await expect(dialog).not.toBeVisible();
		await expect(trigger).toBeFocused();

		const restoredBody = await page.evaluate(() => ({
			overflow: document.body.style.overflow,
			paddingRight: document.body.style.paddingRight
		}));
		expect(restoredBody.overflow).toBe('');
		expect(restoredBody.paddingRight).toBe('');
	}

	// Single-focusable-element modal (Android Security Research & Forensics Lab)
	const singleTrigger = page.getByRole('button', {
		name: 'Open case study for Android Security Research & Forensics Lab'
	});
	await singleTrigger.click();
	const singleDialog = page.getByRole('dialog');
	const singleClose = singleDialog.getByRole('button', { name: 'Close case study' });
	await expect(singleClose).toBeFocused();

	await page.keyboard.press('Tab');
	await expect(singleClose).toBeFocused();
	await page.keyboard.press('Shift+Tab');
	await expect(singleClose).toBeFocused();

	await page.keyboard.press('Escape');
	await expect(singleDialog).not.toBeVisible();
	await expect(singleTrigger).toBeFocused();
});

for (const vp of viewports.filter((v) => v.width <= 390 || v.width === 768 || v.width === 1440)) {
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
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');

	const offset = await page.evaluate(() => {
		const path = document.querySelector('.curve-column--mobile .timeline-path') as SVGPathElement | null;
		return path ? parseFloat(getComputedStyle(path).strokeDashoffset) : -1;
	});
	expect(offset).toBe(0);
});
