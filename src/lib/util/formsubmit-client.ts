import type { ContactFormValues } from './contact-form-schema';

export interface FormSubmitResult {
	delivered: boolean;
	reason?: 'unconfigured' | 'rejected' | 'http_error' | 'malformed' | 'timeout' | 'network_error';
	message: string;
}

const FALLBACK_UNAVAILABLE_MESSAGE =
	'Direct email delivery is temporarily unavailable. Use the button below to send your message via your email client.';

const FALLBACK_UNCONFIGURED_MESSAGE =
	'Direct server email is not configured here. Use the button below to send your message via your email client.';

/**
 * Builds a mailto: fallback URL with pre-filled subject and body.
 * Shared between browser-side FormSubmit fallback and server-side action fallback.
 */
export function buildMailtoFallback(
	recipientEmail: string,
	name: string,
	email: string,
	subject: string,
	message: string
): string {
	const body = `From: ${name} (${email})\n\n${message}`;
	return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Submits the contact form directly from the browser to FormSubmit's AJAX endpoint.
 *
 * Security & architecture notes:
 * - `target` (`PUBLIC_FORMSUBMIT_TARGET`) is a browser-visible FormSubmit endpoint identifier,
 *   not a secret. Use FormSubmit's anonymized token after initial email activation so the
 *   recipient email address is not exposed in production.
 * - Browser-side Zod validation and honeypot checks can be bypassed by automated clients;
 *   FormSubmit enforces server-side `_honey` filtering for browser AJAX submissions, while
 *   `+page.server.ts` preserves independent server-side Zod validation for non-JS requests.
 * - Do not spoof Origin or Referer headers; the browser sends the real page origin naturally.
 */
export async function submitFormSubmitAjax(params: {
	target?: string;
	data: ContactFormValues;
	fetchFn?: typeof fetch;
	timeoutMs?: number;
}): Promise<FormSubmitResult> {
	const {
		target,
		data: { name, email, subject, message, website },
		fetchFn = fetch,
		timeoutMs = 8000
	} = params;

	const trimmedTarget = target?.trim();
	if (!trimmedTarget) {
		return {
			delivered: false,
			reason: 'unconfigured',
			message: FALLBACK_UNCONFIGURED_MESSAGE
		};
	}

	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const res = await fetchFn(
			`https://formsubmit.co/ajax/${encodeURIComponent(trimmedTarget)}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					_subject: `[Portfolio] ${subject}`,
					message,
					_honey: website ?? '',
					_template: 'table'
				}),
				signal: controller.signal
			}
		);

		if (!res.ok) {
			return {
				delivered: false,
				reason: 'http_error',
				message: FALLBACK_UNAVAILABLE_MESSAGE
			};
		}

		let payload: unknown;
		try {
			payload = await res.json();
		} catch {
			return {
				delivered: false,
				reason: 'malformed',
				message: FALLBACK_UNAVAILABLE_MESSAGE
			};
		}

		if (!payload || typeof payload !== 'object' || !('success' in payload)) {
			return {
				delivered: false,
				reason: 'malformed',
				message: FALLBACK_UNAVAILABLE_MESSAGE
			};
		}

		const successValue = (payload as { success?: unknown }).success;
		if (successValue === true || successValue === 'true') {
			return {
				delivered: true,
				message: 'Thank you for reaching out. Your message has been delivered.'
			};
		}

		return {
			delivered: false,
			reason: 'rejected',
			message: FALLBACK_UNAVAILABLE_MESSAGE
		};
	} catch (error) {
		const isAbort = error instanceof DOMException && error.name === 'AbortError';
		return {
			delivered: false,
			reason: isAbort ? 'timeout' : 'network_error',
			message: FALLBACK_UNAVAILABLE_MESSAGE
		};
	} finally {
		clearTimeout(timer);
	}
}
