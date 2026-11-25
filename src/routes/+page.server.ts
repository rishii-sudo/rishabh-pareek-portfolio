import { env } from '$env/dynamic/private';
import { profile } from '$lib/data/profile';
import { contactFormSchema } from '$lib/util/contact-form-schema';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

function buildMailtoFallback(name: string, email: string, subject: string, message: string): string {
	const body = `From: ${name} (${email})\n\n${message}`;
	return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const raw = {
			name: String(formData.get('name') ?? ''),
			email: String(formData.get('email') ?? ''),
			subject: String(formData.get('subject') ?? ''),
			message: String(formData.get('message') ?? ''),
			consent: formData.get('consent') === 'on',
			website: String(formData.get('website') ?? '')
		};

		const parsed = contactFormSchema.safeParse(raw);
		if (!parsed.success) {
			return fail(400, {
				errors: parsed.error.flatten().fieldErrors,
				values: {
					name: raw.name,
					email: raw.email,
					subject: raw.subject,
					message: raw.message
				}
			});
		}

		const { name, email, subject, message } = parsed.data;
		const sendgridKey = env.SENDGRID_API_KEY;
		const fromEmail = env.CONTACT_FROM_EMAIL;
		const toEmail = env.CONTACT_TO_EMAIL || profile.email;

		if (sendgridKey && sendgridKey.startsWith('SG.') && fromEmail) {
			try {
				const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
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

				if (!res.ok) {
					return fail(502, {
						message: 'Email provider returned an error. Please use the email fallback or try again later.'
					});
				}

				return {
					success: true,
					message: 'Thank you for reaching out. Your message has been delivered.'
				};
			} catch {
				return fail(500, {
					message: 'Unable to reach email service. Please try again later.'
				});
			}
		}

		return {
			success: false,
			mailtoFallback: buildMailtoFallback(name, email, subject, message),
			message:
				'Direct server email delivery is not configured in this environment. Click "Open Email Client" below to send your message directly.'
		};
	}
};
