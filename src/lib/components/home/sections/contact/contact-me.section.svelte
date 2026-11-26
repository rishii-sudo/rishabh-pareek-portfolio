<script lang="ts">
	import { enhance } from '$app/forms';
	import { contactMethods } from '$lib/data/profile';
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

		<ul class="contact-methods" aria-label="Direct contact methods">
			{#each contactMethods as method (method.id)}
				<li>
					<a
						href={method.href}
						target={method.external ? '_blank' : undefined}
						rel={method.external ? 'noopener noreferrer' : undefined}
						aria-label={method.external ? `${method.label} (opens in new tab)` : `Email ${method.label}`}
					>
						<span class="method-icon" aria-hidden="true">
							{#if method.id === 'email'}
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 3.2V18h16V7.2l-8 5-8-5M4.8 6L12 10.5 19.2 6H4.8z"
									/>
								</svg>
							{:else if method.id === 'instagram'}
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
									/>
								</svg>
							{:else if method.id === 'discord'}
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"
									/>
								</svg>
							{:else if method.id === 'linkedin'}
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
									/>
								</svg>
							{:else}
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"
									/>
								</svg>
							{/if}
						</span>
						<span class="method-label">{method.label}</span>
					</a>
				</li>
			{/each}
		</ul>
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
		flex-direction: column;
		justify-content: center;
		gap: var(--spacing-l);

		p {
			font-size: var(--font-size-b1);
			line-height: var(--line-height-large);
			color: var(--color-primary);
			letter-spacing: var(--letter-spacing-s);
		}
	}

	.contact-methods {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);

		a {
			display: inline-flex;
			align-items: center;
			gap: var(--spacing-s);
			min-height: 44px;
			min-width: 44px;
			padding: 6px 4px;
			color: var(--color-primary);
			text-decoration: none;
			font-size: 0.9rem;
			font-weight: 500;
			letter-spacing: var(--letter-spacing-s);
			transition: color 0.2s ease;

			&:hover,
			&:focus-visible {
				color: var(--color-secondary);

				.method-label {
					text-decoration: underline;
				}
			}
		}

		.method-icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
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
			background-color: var(--color-bg-dark);
			border-left: 3px solid var(--color-primary);
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
