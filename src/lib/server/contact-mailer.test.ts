import { describe, expect, it, vi } from 'vitest';
import { deliverContactMessage } from './contact-mailer';

const sampleData = {
	name: 'Security Researcher',
	email: 'researcher@example.com',
	subject: 'Portfolio Inquiry',
	message: 'Testing server-side FormSubmit delivery and fallback handling.',
	consent: true as const,
	website: ''
};

describe('deliverContactMessage', () => {
	it('returns delivered=true only when FormSubmit returns res.ok and valid success payload', async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ success: 'true', message: 'Form submitted' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const result = await deliverContactMessage({
			data: sampleData,
			recipientEmail: 'fremindly@gmail.com',
			env: { FORMSUBMIT_TARGET: 'hashed-formsubmit-token' },
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(true);
		expect(result.provider).toBe('formsubmit');
		expect(fetchMock).toHaveBeenCalledTimes(1);

		const [url, init] = fetchMock.mock.calls[0];
		expect(url).toBe('https://formsubmit.co/ajax/hashed-formsubmit-token');
		expect((init?.headers as Record<string, string>)['Origin']).toBeUndefined();
		expect((init?.headers as Record<string, string>)['Referer']).toBeUndefined();
	});

	it('treats FormSubmit non-ok or success=false rejection as failure with mailtoFallback', async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ success: 'false', message: 'Form not activated' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const result = await deliverContactMessage({
			data: sampleData,
			recipientEmail: 'fremindly@gmail.com',
			env: { FORMSUBMIT_TARGET: 'hashed-formsubmit-token' },
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(false);
		expect(result.mailtoFallback).toContain('mailto:fremindly@gmail.com');
	});

	it('handles FormSubmit timeout cleanly and returns mailtoFallback', async () => {
		const fetchMock = vi.fn((_url, init) => {
			return new Promise<Response>((_resolve, reject) => {
				init?.signal?.addEventListener('abort', () => {
					reject(new DOMException('The operation was aborted.', 'AbortError'));
				});
			});
		});

		const result = await deliverContactMessage({
			data: sampleData,
			recipientEmail: 'fremindly@gmail.com',
			env: { FORMSUBMIT_TARGET: 'hashed-formsubmit-token' },
			fetchFn: fetchMock as unknown as typeof fetch,
			timeoutMs: 15
		});

		expect(result.delivered).toBe(false);
		expect(result.mailtoFallback).toContain('mailto:fremindly@gmail.com');
	});

	it('handles FormSubmit network failure and falls back to mailto', async () => {
		const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

		const result = await deliverContactMessage({
			data: sampleData,
			recipientEmail: 'fremindly@gmail.com',
			env: { FORMSUBMIT_TARGET: 'hashed-formsubmit-token' },
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(false);
		expect(result.mailtoFallback).toContain('mailto:fremindly@gmail.com');
	});

	it('returns mailtoFallback when neither FormSubmit nor SendGrid is configured', async () => {
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

	it('falls back to SendGrid during testing if FormSubmit fails and SendGrid is configured', async () => {
		const fetchMock = vi
			.fn()
			.mockRejectedValueOnce(new Error('FormSubmit unreachable'))
			.mockResolvedValueOnce(new Response(null, { status: 202 }));

		const result = await deliverContactMessage({
			data: sampleData,
			recipientEmail: 'fremindly@gmail.com',
			env: {
				FORMSUBMIT_TARGET: 'hashed-formsubmit-token',
				SENDGRID_API_KEY: 'SG.test-key',
				CONTACT_FROM_EMAIL: 'verified@example.com'
			},
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(true);
		expect(result.provider).toBe('sendgrid');
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});
});
