# Rishabh Pareek — Personal Portfolio

Personal cybersecurity and software engineering portfolio built with **SvelteKit 2**, **Svelte 5**, **TypeScript**, **SCSS**, **GSAP**, and **Zod**, deployed for Vercel.


## Stack

- **Framework**: SvelteKit 2 + Svelte 5 (Runes)
- **Language**: TypeScript
- **Styling**: SCSS (`src/sass`) with CSS custom properties
- **Animations**: GSAP + ScrollTrigger (with `prefers-reduced-motion` support)
- **Validation**: Zod (client + SvelteKit server actions)
- **Testing**: Vitest (unit) + Playwright (E2E & responsive checks)
- **Deployment**: `@sveltejs/adapter-vercel`

## Project Structure

- `src/routes/` — SvelteKit routes, server actions (`+page.server.ts`), and privacy policy page
- `src/lib/components/` — Reusable UI components and page sections
- `src/lib/data/` — Structured portfolio content (`profile.ts`, `skills.ts`, `projects.ts`, `experience.ts`)
- `src/lib/util/` — Zod validation schemas (`contact-form-schema.ts`) and GSAP motion helpers
- `src/sass/` — Design tokens (`_variables.scss`), base reset (`_base.scss`), and entry (`main.scss`)
- `static/images/` — Profile portrait placeholder and project visual assets
- `tests/` — Playwright end-to-end and responsive tests

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run check
npm run test:unit
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure optional SendGrid or Turnstile credentials. If no mail provider is configured, the contact form provides a functional `mailto:` fallback.
