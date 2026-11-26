import { env } from '$env/dynamic/private';
import { profile } from '$lib/data/profile';
import { deliverContactMessage } from '$lib/server/contact-mailer';
import { contactFormSchema } from '$lib/util/contact-form-schema';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
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

		const result = await deliverContactMessage({
			data: parsed.data,
			recipientEmail: profile.email,
			env: {
				FORMSUBMIT_TARGET: env.FORMSUBMIT_TARGET,
				SENDGRID_API_KEY: env.SENDGRID_API_KEY,
				CONTACT_FROM_EMAIL: env.CONTACT_FROM_EMAIL,
				CONTACT_TO_EMAIL: env.CONTACT_TO_EMAIL
			},
			fetchFn: fetch
		});

		if (result.delivered) {
			return {
				success: true,
				message: result.message
			};
		}

		return {
			success: false,
			mailtoFallback: result.mailtoFallback,
			message: result.message
		};
	}
};
