import type { ContactFormValues } from '$lib/util/contact-form-schema';
import { buildMailtoFallback } from '$lib/util/formsubmit-client';

export { buildMailtoFallback };

export interface ContactDeliveryEnv {
	SENDGRID_API_KEY?: string;
	CONTACT_FROM_EMAIL?: string;
	CONTACT_TO_EMAIL?: string;
}

export interface ContactDeliveryResult {
	delivered: boolean;
	provider?: 'sendgrid';
	status?: number;
	mailtoFallback?: string;
	message: string;
}

/**
 * Server-side contact delivery for non-JavaScript submissions and fallback.
 *
 * FormSubmit is handled browser-side in `contact-me.section.svelte` because FormSubmit's
 * AJAX endpoint rejects headerless server-to-server requests. SendGrid is retained here as
 * an optional server-side fallback until browser-side FormSubmit delivery is verified in production.
 */
export async function deliverContactMessage(params: {
	data: ContactFormValues;
	recipientEmail: string;
	env: ContactDeliveryEnv;
	fetchFn?: typeof fetch;
}): Promise<ContactDeliveryResult> {
	const {
		data: { name, email, subject, message },
		recipientEmail,
		env,
		fetchFn = fetch
	} = params;

	const fallbackUrl = buildMailtoFallback(recipientEmail, name, email, subject, message);
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

	return {
		delivered: false,
		mailtoFallback: fallbackUrl,
		message:
			'Direct server email is not configured here. Use the button below to send your message via your email client.'
	};
}
