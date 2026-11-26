import { describe, expect, it, vi } from 'vitest';
import { deliverContactMessage } from './contact-mailer';

const sampleData = {
	name: 'Security Researcher',
	email: 'researcher@example.com',
	subject: 'Portfolio Inquiry',
	message: 'Testing server-side fallback delivery and mailto handling.',
	consent: true as const,
	website: ''
};

describe('deliverContactMessage', () => {
	it('returns mailtoFallback when SendGrid is not configured', async () => {
		const fetchMock = vi.fn();

		const result = await deliverContactMessage({
			data: sampleData,
			recipientEmail: 'fremindly@gmail.com',
			env: {},
			fetchFn: fetchMock
		});

		expect(fetchMock).not.toHaveBeenCalled();
		expect(result.delivered).toBe(false);
		expect(result.mailtoFallback).toContain('mailto:fremindly@gmail.com');
	});

	it('delivers via SendGrid when configured and SendGrid returns 202', async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));

		const result = await deliverContactMessage({
			data: sampleData,
			recipientEmail: 'fremindly@gmail.com',
			env: {
				SENDGRID_API_KEY: 'SG.test-key',
				CONTACT_FROM_EMAIL: 'verified@example.com'
			},
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(true);
		expect(result.provider).toBe('sendgrid');
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it('returns status 502 with mailtoFallback when SendGrid rejects the request', async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response('Unauthorized', { status: 401 }));

		const result = await deliverContactMessage({
			data: sampleData,
			recipientEmail: 'fremindly@gmail.com',
			env: {
				SENDGRID_API_KEY: 'SG.test-key',
				CONTACT_FROM_EMAIL: 'verified@example.com'
			},
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(false);
		expect(result.status).toBe(502);
		expect(result.mailtoFallback).toContain('mailto:fremindly@gmail.com');
	});

	it('returns status 500 with mailtoFallback when SendGrid throws a network error', async () => {
		const fetchMock = vi.fn().mockRejectedValue(new TypeError('Network failure'));

		const result = await deliverContactMessage({
			data: sampleData,
			recipientEmail: 'fremindly@gmail.com',
			env: {
				SENDGRID_API_KEY: 'SG.test-key',
				CONTACT_FROM_EMAIL: 'verified@example.com'
			},
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(false);
		expect(result.status).toBe(500);
		expect(result.mailtoFallback).toContain('mailto:fremindly@gmail.com');
	});
});
