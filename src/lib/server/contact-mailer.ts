import type { ContactFormValues } from '$lib/util/contact-form-schema';

export interface ContactDeliveryEnv {
	FORMSUBMIT_TARGET?: string;
	SENDGRID_API_KEY?: string;
	CONTACT_FROM_EMAIL?: string;
	CONTACT_TO_EMAIL?: string;
}

export interface ContactDeliveryResult {
	delivered: boolean;
	provider?: 'formsubmit' | 'sendgrid';
	status?: number;
	mailtoFallback?: string;
	message: string;
}

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

export async function deliverContactMessage(params: {
	data: ContactFormValues;
	recipientEmail: string;
	env: ContactDeliveryEnv;
	fetchFn?: typeof fetch;
	timeoutMs?: number;
}): Promise<ContactDeliveryResult> {
	const {
		data: { name, email, subject, message, website },
		recipientEmail,
		env,
		fetchFn = fetch,
		timeoutMs = 8000
	} = params;

	const fallbackUrl = buildMailtoFallback(recipientEmail, name, email, subject, message);
	const formSubmitTarget = env.FORMSUBMIT_TARGET?.trim();

	if (formSubmitTarget) {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeoutMs);

		try {
			const res = await fetchFn(
				`https://formsubmit.co/ajax/${encodeURIComponent(formSubmitTarget)}`,
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

			if (res.ok) {
				const payload = (await res.json().catch(() => null)) as {
					success?: boolean | string;
				} | null;

				if (payload?.success === true || payload?.success === 'true') {
					return {
						delivered: true,
						provider: 'formsubmit',
						message: 'Thank you for reaching out. Your message has been delivered.'
					};
				}
			}
		} catch {
			// Fall through to SendGrid (if configured) or mailto fallback.
		} finally {
			clearTimeout(timer);
		}
	}

	const sendgridKey = env.SENDGRID_API_KEY?.trim();
	const fromEmail = env.CONTACT_FROM_EMAIL?.trim();
	const toEmail = env.CONTACT_TO_EMAIL?.trim() || recipientEmail;

	if (sendgridKey && sendgridKey.startsWith('SG.') && fromEmail) {
		try {
			const res = await fetchFn('https://api.sendgrid.com/v3/mail/send', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${sendgridKey}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					personalizations: [{ to: [{ email: toEmail }] }],
					from: { email: fromEmail, name: 'Portfolio Contact Form' },
					reply_to: { email, name },
					subject: `[Portfolio] ${subject}`,
					content: [
						{
							type: 'text/plain',
							value: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`
						}
					]
				})
			});

			if (res.ok) {
				return {
					delivered: true,
					provider: 'sendgrid',
					message: 'Thank you for reaching out. Your message has been delivered.'
				};
			}

			return {
				delivered: false,
				status: 502,
				mailtoFallback: fallbackUrl,
				message: 'Email provider returned an error. Use the button below to send via your email client.'
			};
		} catch {
			return {
				delivered: false,
				status: 500,
				mailtoFallback: fallbackUrl,
				message: 'Unable to reach email service. Use the button below to send via your email client.'
			};
		}
	}

	if (formSubmitTarget) {
		return {
			delivered: false,
			status: 502,
			mailtoFallback: fallbackUrl,
			message:
				'Direct email delivery is temporarily unavailable. Use the button below to send your message via your email client.'
		};
	}

	return {
		delivered: false,
		mailtoFallback: fallbackUrl,
		message:
			'Direct server email is not configured here. Use the button below to send your message via your email client.'
	};
}
