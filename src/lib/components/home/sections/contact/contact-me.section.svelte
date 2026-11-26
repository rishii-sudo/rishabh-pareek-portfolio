<script lang="ts">
	import { enhance } from '$app/forms';
	import { contactFormSchema } from '$lib/util/contact-form-schema';
	import FormField from './form-field.svelte';

	interface ActionResultData {
		success?: boolean;
		mailtoFallback?: string;
		message?: string;
		errors?: Record<string, string[]>;
		values?: {
			name?: string;
			email?: string;
			subject?: string;
			message?: string;
		};
	}

	interface Props {
		form?: ActionResultData | null;
	}

	let { form }: Props = $props();

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let consent = $state(false);
	let website = $state('');

	let clientErrors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);
	let statusBanner = $state<{
		type: 'success' | 'fallback' | 'error';
		text: string;
		mailtoUrl?: string;
	} | null>(null);

	function validateClient(): boolean {
		const parsed = contactFormSchema.safeParse({
			name,
			email,
			subject,
			message,
			consent,
			website
		});

		if (parsed.success) {
			clientErrors = {};
			return true;
		}

		const nextErrors: Record<string, string> = {};
		for (const issue of parsed.error.issues) {
			const key = String(issue.path[0] ?? 'form');
			if (!nextErrors[key]) {
				nextErrors[key] = issue.message;
			}
		}
		clientErrors = nextErrors;
		return false;
	}

	function clearFieldError(field: string) {
		if (clientErrors[field]) {
			const updated = { ...clientErrors };
			delete updated[field];
			clientErrors = updated;
		}
	}

	const mergedErrors = $derived({
		name: clientErrors.name ?? form?.errors?.name?.[0],
		email: clientErrors.email ?? form?.errors?.email?.[0],
		subject: clientErrors.subject ?? form?.errors?.subject?.[0],
		message: clientErrors.message ?? form?.errors?.message?.[0],
		consent: clientErrors.consent ?? form?.errors?.consent?.[0]
	});
</script>

<section id="contact-me">
	<h2>CONTACT ME</h2>

	<div class="contact-intro">
		<p>
			Open to internships, security research collaborations, and application security roles. Reach out
			directly if you'd like to discuss offensive security, tooling, or a project.
		</p>
	</div>

	<form
		method="POST"
		class="contact-form"
		novalidate
		use:enhance={({ cancel }) => {
			statusBanner = null;
			if (!validateClient()) {
				cancel();
				return;
			}
			isSubmitting = true;

			return async ({ result, update }) => {
				isSubmitting = false;
				await update({ reset: false });

				if (result.type === 'success') {
					const data = result.data as ActionResultData | undefined;
					if (data?.success) {
						statusBanner = {
							type: 'success',
							text: data.message ?? 'Your message has been sent.'
						};
						name = '';
						email = '';
						subject = '';
						message = '';
						consent = false;
					} else if (data?.mailtoFallback) {
						statusBanner = {
							type: 'fallback',
							text:
								data.message ??
								'Direct email delivery is not configured on this server. Use the button below to send via your email client.',
							mailtoUrl: data.mailtoFallback
						};
					}
				} else if (result.type === 'failure') {
					const data = result.data as ActionResultData | undefined;
					statusBanner = {
						type: 'error',
						text: data?.message ?? 'Please review the highlighted fields and try again.'
					};
				} else if (result.type === 'error') {
					statusBanner = {
						type: 'error',
						text: 'Something went wrong while submitting the form. Please try again later.'
					};
				}
			};
		}}
	>
		<FormField
			id="contact-name"
			name="name"
			label="Name"
			placeholder="Your name"
			type="text"
			maxLength={50}
			bind:value={name}
			error={mergedErrors.name}
			onInput={() => clearFieldError('name')}
		/>

		<FormField
			id="contact-email"
			name="email"
			label="Email address"
			placeholder="you@example.com"
			type="email"
			maxLength={50}
			bind:value={email}
			error={mergedErrors.email}
			onInput={() => clearFieldError('email')}
		/>

		<FormField
			id="contact-subject"
			name="subject"
			label="Subject"
			placeholder="What is this regarding?"
			type="text"
			maxLength={80}
			bind:value={subject}
			error={mergedErrors.subject}
			onInput={() => clearFieldError('subject')}
		/>

		<FormField
			id="contact-message"
			name="message"
			label="Message"
			placeholder="Write your message..."
			type="textarea"
			maxLength={500}
			bind:value={message}
			error={mergedErrors.message}
			onInput={() => clearFieldError('message')}
		/>

		<div class="honeypot" aria-hidden="true">
			<label for="contact-website">Leave this field blank</label>
			<input
				id="contact-website"
				name="website"
				type="text"
				tabindex="-1"
				autocomplete="off"
				bind:value={website}
			/>
		</div>

		<div class="consent-block">
			<div class="consent-input-container">
				<label for="consent">
					I agree to the processing of my entered details to respond to my inquiry as described in the
					<a href="/privacy-policy">Privacy Policy</a>.
				</label>
				<input
					id="consent"
					type="checkbox"
					name="consent"
					bind:checked={consent}
					onchange={() => clearFieldError('consent')}
					aria-invalid={!!mergedErrors.consent}
				/>
			</div>
			{#if mergedErrors.consent}
				<p class="consent-error" role="alert">{mergedErrors.consent}</p>
			{/if}
		</div>

		{#if statusBanner}
			<div
				class="status-banner"
				class:success={statusBanner.type === 'success'}
				class:fallback={statusBanner.type === 'fallback'}
				class:error={statusBanner.type === 'error'}
				role="status"
			>
				<p>{statusBanner.text}</p>
			</div>
		{/if}

		<div class="submit-container">
			{#if statusBanner?.type === 'fallback' && statusBanner.mailtoUrl}
				<a class="mailto-button" href={statusBanner.mailtoUrl}>Open Email Client</a>
			{:else}
				<button type="submit" disabled={isSubmitting}>
					{#if isSubmitting}
						Sending...
					{:else}
						Send
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 495.003 495.003" aria-hidden="true">
							<path
								d="M164.711 456.687a8.007 8.007 0 0 0 4.266 7.072 7.992 7.992 0 0 0 8.245-.468l55.09-37.616-67.6-32.22v63.232zM492.431 32.443a8.024 8.024 0 0 0-5.44-2.125 7.89 7.89 0 0 0-3.5.816L7.905 264.422a14.154 14.154 0 0 0 .153 25.472L133.4 349.618l250.62-205.99-219.565 220.786 156.145 74.4a14.115 14.115 0 0 0 6.084 1.376c1.768 0 3.519-.322 5.186-.977a14.188 14.188 0 0 0 7.97-7.956l154.596-390a7.968 7.968 0 0 0-2.005-8.814z"
							/>
						</svg>
					{/if}
				</button>
			{/if}
		</div>
	</form>
</section>

<style lang="scss">

	section {
		max-width: 100%;
		background-color: var(--color-bg-dark);
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: var(--spacing-l);
		position: relative;
		padding: var(--spacing-xxl) 0;
	}

	h2 {
		grid-column: 2 / span all;
		line-height: var(--line-height-large);
	}

	.contact-intro {
		grid-column: 2 / 4;
		display: flex;
		align-items: center;

		p {
			font-size: var(--font-size-b1);
			line-height: var(--line-height-large);
			color: var(--color-primary);
			letter-spacing: var(--letter-spacing-s);
		}
	}

	.contact-form {
		grid-column: 4 / 8;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-l);
		background-color: var(--color-bg-light);
		padding: var(--spacing-xl);
		border-radius: var(--border-radius-s);
	}

	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.consent-block {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.consent-input-container {
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-end;
		align-items: center;
		gap: var(--spacing-m);

		label {
			font-size: var(--font-size-small);
			color: var(--color-light-fade);
			line-height: var(--line-height-normal);
			letter-spacing: var(--letter-spacing-s);

			a {
				color: var(--color-primary);
			}
		}

		input[type='checkbox'] {
			appearance: none;
			-webkit-appearance: none;
			flex-shrink: 0;
			width: 24px;
			height: 24px;
			border: 1px solid var(--color-light-fade);
			border-radius: var(--border-radius-s);
			background-color: var(--color-bg-light);
			cursor: pointer;
			transition: background-color 0.12s ease-in-out;

			&:checked {
				background-image: url('/checkmark.svg');
				background-size: 60%;
				background-repeat: no-repeat;
				background-position: center;
				background-color: var(--color-primary);
				border-color: var(--color-primary);
			}
		}
	}

	.consent-error {
		font-size: var(--font-size-small);
		color: var(--color-error);
		font-weight: 500;
	}

	.status-banner {
		padding: var(--spacing-s) var(--spacing-m);
		border-radius: var(--border-radius-s);
		font-size: 0.85rem;
		line-height: var(--line-height-normal);

		&.success {
			background-color: color-mix(in srgb, var(--color-success) 12%, var(--color-bg-light));
			border-left: 3px solid var(--color-success);
			color: var(--color-text-on-bg-light);
		}

		&.fallback {
			background-color: color-mix(in srgb, var(--color-chili-pepper) 28%, var(--color-bg-light));
			border-left: 3px solid var(--color-secondary);
			color: var(--color-primary);
		}

		&.error {
			background-color: color-mix(in srgb, var(--color-error) 10%, var(--color-bg-light));
			border-left: 3px solid var(--color-error);
			color: var(--color-error);
		}
	}

	.mailto-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-primary);
		color: var(--color-text-on-primary);
		text-decoration: none;
		padding: var(--spacing-m) var(--spacing-xl);
		border-radius: var(--border-radius-s);
		font-size: var(--font-size-b1);
		font-weight: 600;
		min-height: 44px;
		transition: background-color 0.2s ease-in-out;

		&:hover {
			background-color: var(--color-primary-hover);
		}
	}

	.submit-container {
		display: flex;
		justify-content: flex-end;
	}

	button[type='submit'] {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-m);
		background-color: var(--color-primary);
		color: var(--color-text-on-primary);
		padding: var(--spacing-m) var(--spacing-xl);
		border: none;
		border-radius: var(--border-radius-s);
		font-size: var(--font-size-b1);
		font-weight: 600;
		cursor: pointer;
		min-width: 140px;
		transition: background-color 0.2s ease-in-out;

		&:hover:not(:disabled) {
			background-color: var(--color-primary-hover);
		}

		&:disabled {
			background-color: var(--color-disabled);
			cursor: not-allowed;
		}

		svg {
			width: var(--icon-size-s);
			height: var(--icon-size-s);
			fill: var(--color-text-on-primary);
		}
	}

	@media screen and (max-width: 900px) {
		section {
			display: flex;
			flex-direction: column;
			padding: var(--spacing-xxl) var(--spacing-l);
		}

		.contact-form {
			padding: var(--spacing-l);
		}
	}
</style>
