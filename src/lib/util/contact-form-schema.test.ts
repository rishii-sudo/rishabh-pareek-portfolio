import { describe, expect, it } from 'vitest';
import { contactFormSchema } from './contact-form-schema';

describe('contactFormSchema', () => {
	it('accepts valid contact submission with consent', () => {
		const result = contactFormSchema.safeParse({
			name: 'Rishabh Test',
			email: 'test@example.com',
			subject: 'Security Collaboration',
			message: 'Hello Rishabh, reaching out regarding an application security project.',
			consent: true,
			website: ''
		});
		expect(result.success).toBe(true);
	});

	it('rejects invalid email and missing consent', () => {
		const result = contactFormSchema.safeParse({
			name: '',
			email: 'not-an-email',
			subject: 'Hi',
			message: 'short',
			consent: false,
			website: ''
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			const fields = result.error.flatten().fieldErrors;
			expect(fields.name).toBeDefined();
			expect(fields.email).toBeDefined();
			expect(fields.message).toBeDefined();
			expect(fields.consent).toBeDefined();
		}
	});

	it('rejects honeypot spam submissions', () => {
		const result = contactFormSchema.safeParse({
			name: 'Bot',
			email: 'bot@example.com',
			subject: 'Spam',
			message: 'Automated spam message content.',
			consent: true,
			website: 'https://spam.example'
		});
		expect(result.success).toBe(false);
	});
});
