<script lang="ts">
	interface Props {
		id: string;
		name: string;
		label: string;
		placeholder: string;
		type?: 'text' | 'email' | 'textarea';
		maxLength: number;
		value: string;
		error?: string;
		onInput?: () => void;
	}

	let {
		id,
		name,
		label,
		placeholder,
		type = 'text',
		maxLength,
		value = $bindable(''),
		error,
		onInput
	}: Props = $props();
</script>

<div class="field-group">
	<label for={id}>{label}</label>
	<div class="input-container">
		{#if type === 'textarea'}
			<textarea
				{id}
				{name}
				{placeholder}
				maxlength={maxLength}
				bind:value
				oninput={onInput}
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : undefined}
			></textarea>
		{:else}
			<input
				{id}
				{name}
				{type}
				{placeholder}
				maxlength={maxLength}
				bind:value
				oninput={onInput}
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : undefined}
			/>
		{/if}
		<small class="counter">{value.length}/{maxLength}</small>
	</div>
	{#if error}
		<p id={`${id}-error`} class="error-message" role="alert">{error}</p>
	{/if}
</div>

<style lang="scss">
	@use '../../../../../sass/variables';

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	label {
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--color-primary);
		letter-spacing: var(--letter-spacing-s);
		text-transform: uppercase;
	}

	.input-container {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
	}

	input,
	textarea {
		width: 100%;
		background-color: var(--color-bg-light);
		color: var(--color-primary);
		border: 1px solid var(--color-primary);
		border-radius: var(--border-radius-s);
		padding: var(--spacing-m);
		font-size: var(--font-size-b1);
		font-family: 'Inter', sans-serif;
		letter-spacing: var(--letter-spacing-m);

		&::placeholder {
			color: var(--color-light-fade);
		}

		&:focus {
			outline: 2px solid var(--color-primary);
			outline-offset: -1px;
		}

		&[aria-invalid='true'] {
			border-color: var(--color-error);
		}
	}

	textarea {
		height: 180px;
		resize: vertical;
	}

	.counter {
		position: absolute;
		bottom: 6px;
		right: 10px;
		color: var(--color-light-fade);
		font-size: var(--font-size-small);
		pointer-events: none;
	}

	.error-message {
		font-size: var(--font-size-small);
		color: var(--color-error);
		font-weight: 500;
		letter-spacing: var(--letter-spacing-s);
	}

	@media screen and (max-width: 768px) {
		textarea {
			height: 120px;
		}
	}
</style>
