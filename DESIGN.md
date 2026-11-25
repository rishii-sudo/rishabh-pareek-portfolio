# Design System — Rishabh Pareek Personal Portfolio

Design inspiration: Tim Gesemann — https://github.com/timges/personal-homepage

## 1. Color System

Extracted directly from the reference repository (`src/sass/_variables.scss`):

| Token | Value | Usage |
| --- | --- | --- |
| `--color-primary` | `#2f355c` | Primary buttons, nav links, headings, timeline, social icons |
| `--color-primary-hover` | `#363651` | Primary button hover state |
| `--color-secondary` | `#e7472b` | Greeting, headline accent, hover underlines, active highlights |
| `--color-bg-dark` | `#f7f5f1` | Warm off-white main page background (Nav, Hero, Work, Contact, Footer) |
| `--color-bg-light` | `#ffffff` | White content surfaces (Skills, Experience, Project cards, Contact form card) |
| `--color-text-on-primary` | `#ffffff` | Text & icons on `#2f355c` surfaces |
| `--color-text-on-secondary` | `#ffffff` | Text on `#e7472b` surfaces |
| `--color-text-on-bg-light` | `#000000` | Primary body/heading text on white |
| `--color-text-on-bg-dark` | `#000000` | Primary text on warm off-white |
| `--color-disabled` | `#485273` | Disabled states |
| `--color-light-fade` | `#666666` | Secondary / muted text, form disclaimers, tags |
| `--color-chili-pepper` | `#f6bd8f` | Supporting warm accent |
| `--color-error` | `#c73d1d` | Validation error states |
| `--color-success` | `#22bb33` | Success states |

## 2. Typography

- **Primary Font**: `Inter`, `sans-serif` (loaded via Google Fonts / system fallback)
- **Monogram Logo Font**: `type-writer` (loaded from `/fonts/type-writer.ttf` for the `rp` nav mark, matching the `tg` mark in the reference)
- **Base Root Size**: `16px`
- **Type Scale**:
  - `--font-size-h1`: `3rem` (48px) — Hero greeting (`Hi!`)
  - `--font-size-h2`: `2rem` (32px) — Section headings (`I'M GOOD AT THIS`, `THINGS, I WORKED ON`, `EXPERIENCE`, `CONTACT ME`) & Hero name (`Rishabh Pareek`)
  - `--font-size-h3`: `1.5rem` (24px) — Subheadings, card titles, hero tagline
  - `--font-size-b2`: `1.25rem` (20px)
  - `--font-size-b1`: `1rem` (16px) — Body copy, form inputs, buttons
  - `--font-size-small`: `0.75rem` (12px) — Disclaimers, consent label, footer copyright
- **Letter Spacing**:
  - `--letter-spacing-s`: `0.05rem`
  - `--letter-spacing-m`: `0.1rem`
  - `--letter-spacing-l`: `0.15rem` (applied globally on `:root`, nav, cards)
- **Line Heights**:
  - `--line-height-small`: `1em`
  - `--line-height-normal`: `1.2em`
  - `--line-height-large`: `1.5em`

## 3. Spacing & Layout Grid

- **Spacing Scale**:
  - `--spacing-xs`: `4px`
  - `--spacing-s`: `8px`
  - `--spacing-m`: `16px`
  - `--spacing-l`: `24px`
  - `--spacing-xl`: `32px`
  - `--spacing-xxl`: `48px`
  - `--spacing-page-inset`: `8rem` (desktop), `6rem` (`<= 1024px`), `4rem` (`<= 768px`)
- **8-Column Section Grid**:
  - Desktop sections use `display: grid; grid-template-columns: repeat(8, 1fr); gap: var(--spacing-l); padding: var(--spacing-xxl) 0;`
  - Section `h2` headings align to `grid-column: 2 / span all;`
  - Alternating section backgrounds:
    1. **Nav + Hero**: `#f7f5f1` (`--color-bg-dark`)
    2. **Skills**: `#ffffff` (`--color-bg-light`)
    3. **My Work**: `#f7f5f1` (`--color-bg-dark`) with `#ffffff` cards
    4. **Experience, Education, Certifications & Learning Profiles**: `#ffffff` (`--color-bg-light`) with subtle `50px x 50px` architectural grid background
    5. **Contact Me**: `#f7f5f1` (`--color-bg-dark`) with `#ffffff` form card
    6. **Footer**: `#f7f5f1` (`--color-bg-dark`)
- **Fixed Left Social Rail**:
  - Desktop (`> 768px`): Fixed bottom-left vertical icon stack (`GitHub`, `LinkedIn`, `Hack The Box`, `TryHackMe`) with a `2px × 70px` vertical navy rule, plus a vertical `back to top` indicator that slides in when the navbar scrolls out of view.

## 4. Responsive Breakpoints

- **Desktop (`1440px`)**: Full 8-column grid, fixed left social rail, 3-column project grid (`grid-column: ($i * 2) / span 2`).
- **Tablet (`768px` – `1260px`)**: 2-column project grid (`<= 1260px`), adjusted `--spacing-page-inset: 6rem` (`<= 1024px`) and `4rem` (`<= 768px`).
- **Mobile (`390px` / `<= 768px`)**: Stacked flex column layout, responsive mobile navigation bar with accessible drawer/menu, stacked hero with properly sized profile portrait, single-column project cards, full-width form and buttons, zero horizontal overflow.

## 5. Motion & Accessibility

- **GSAP + ScrollTrigger**:
  - Subtle hero entrance stagger
  - Section reveal on scroll
  - Timeline path & milestone reveal in Experience
  - All animations respect `prefers-reduced-motion: reduce` (immediately settling at final visible state without motion).
- **CSS Micro-interactions**:
  - Nav links: `scale(1.1)` + `#e7472b` color + expanding underline
  - Hero CTA button: sliding `#e7472b` fill overlay (`::after` width `0%` → `100%`)
  - Project cards & interactive skill category tabs/pills: subtle elevation and border/color transitions
