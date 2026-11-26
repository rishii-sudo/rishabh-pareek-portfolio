import { describe, expect, it, vi } from 'vitest';
import { buildMailtoFallback, submitFormSubmitAjax } from './formsubmit-client';

const sampleData = {
	name: 'Security Researcher',
	email: 'researcher@example.com',
	subject: 'Portfolio Inquiry',
	message: 'Testing browser-side FormSubmit AJAX delivery and fallback states.',
	consent: true as const,
	website: ''
};

describe('submitFormSubmitAjax', () => {
	it('returns delivered=true when FormSubmit returns res.ok and success="true"', async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ success: 'true', message: 'Form submitted' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const result = await submitFormSubmitAjax({
			target: 'anonymized-token-123',
			data: sampleData,
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(true);
		expect(fetchMock).toHaveBeenCalledTimes(1);

		const [url, init] = fetchMock.mock.calls[0];
		expect(url).toBe('https://formsubmit.co/ajax/anonymized-token-123');
		expect((init?.headers as Record<string, string>)['Origin']).toBeUndefined();
		expect((init?.headers as Record<string, string>)['Referer']).toBeUndefined();
	});

	it('returns delivered=true when FormSubmit returns res.ok and boolean success=true', async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const result = await submitFormSubmitAjax({
			target: 'anonymized-token-123',
			data: sampleData,
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(true);
	});

	it('returns delivered=false with reason="rejected" when success="false"', async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ success: 'false', message: 'Form not activated' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const result = await submitFormSubmitAjax({
			target: 'anonymized-token-123',
			data: sampleData,
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(false);
		expect(result.reason).toBe('rejected');
	});

	it('returns delivered=false with reason="http_error" on non-ok HTTP status', async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response('Service Unavailable', { status: 503 })
		);

		const result = await submitFormSubmitAjax({
			target: 'anonymized-token-123',
			data: sampleData,
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(false);
		expect(result.reason).toBe('http_error');
	});

	it('returns delivered=false with reason="malformed" on invalid JSON', async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response('<html>not json</html>', { status: 200 })
		);

		const result = await submitFormSubmitAjax({
			target: 'anonymized-token-123',
			data: sampleData,
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(false);
		expect(result.reason).toBe('malformed');
	});

	it('returns delivered=false with reason="malformed" when success field is missing', async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ message: 'Unexpected shape' }), { status: 200 })
		);

		const result = await submitFormSubmitAjax({
			target: 'anonymized-token-123',
			data: sampleData,
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(false);
		expect(result.reason).toBe('malformed');
	});

	it('handles timeout via AbortController and returns reason="timeout"', async () => {
		const fetchMock = vi.fn((_url, init) => {
			return new Promise<Response>((_resolve, reject) => {
				init?.signal?.addEventListener('abort', () => {
					reject(new DOMException('The operation was aborted.', 'AbortError'));
				});
			});
		});

		const result = await submitFormSubmitAjax({
			target: 'anonymized-token-123',
			data: sampleData,
			fetchFn: fetchMock as unknown as typeof fetch,
			timeoutMs: 15
		});

		expect(result.delivered).toBe(false);
		expect(result.reason).toBe('timeout');
	});

	it('handles network error and returns reason="network_error"', async () => {
		const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

		const result = await submitFormSubmitAjax({
			target: 'anonymized-token-123',
			data: sampleData,
			fetchFn: fetchMock
		});

		expect(result.delivered).toBe(false);
		expect(result.reason).toBe('network_error');
	});

	it('returns reason="unconfigured" without calling fetch when target is empty', async () => {
		const fetchMock = vi.fn();

		const result = await submitFormSubmitAjax({
			target: '   ',
			data: sampleData,
			fetchFn: fetchMock
		});

		expect(fetchMock).not.toHaveBeenCalled();
		expect(result.delivered).toBe(false);
		expect(result.reason).toBe('unconfigured');
	});
});

describe('buildMailtoFallback', () => {
	it('encodes recipient, subject, and sender details cleanly', () => {
		const url = buildMailtoFallback(
			'fremindly@gmail.com',
			'Alice',
			'alice@example.com',
			'Hello & Security',
			'Testing mailto encoding.'
		);
		expect(url).toContain('mailto:fremindly@gmail.com?subject=Hello%20%26%20Security&body=');
		expect(url).toContain('Alice');
	});
});
