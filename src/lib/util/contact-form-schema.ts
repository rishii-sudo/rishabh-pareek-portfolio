import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'Uh-oh! This field cannot be left blank.')
		.max(50, 'You exceeded the maximum length of 50 characters!'),
	email: z
		.string()
		.trim()
		.min(1, 'Uh-oh! This field cannot be left blank.')
		.max(50, 'You exceeded the maximum length of 50 characters!')
		.email('The email address you provided is invalid!'),
	subject: z
		.string()
		.trim()
		.min(1, 'Uh-oh! This field cannot be left blank.')
		.max(80, 'You exceeded the maximum length of 80 characters!'),
	message: z
		.string()
		.trim()
		.min(10, 'Please enter at least 10 characters so I have enough context.')
		.max(500, 'You exceeded the maximum length of 500 characters!'),
	consent: z.literal(true, {
		errorMap: () => ({
			message: 'You must accept the privacy notice before submitting the form.'
		})
	}),
	website: z.string().max(0).optional().default('')
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
