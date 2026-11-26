import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

let registered = false;

export function getGsap() {
	if (!registered && typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
		registered = true;
	}
	return { gsap, ScrollTrigger };
}

export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return true;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface RevealOptions {
	y?: number;
	duration?: number;
	stagger?: number;
	start?: string;
}

/**
 * Registers a subtle scroll-triggered Y-translate reveal inside a scoped GSAP context.
 * Never sets opacity: 0 pre-scroll so content remains readable at any scroll position.
 */
export function createRevealAnimation(
	container: HTMLElement | undefined,
	selector: string,
	options: RevealOptions = {}
): () => void {
	if (!container || prefersReducedMotion()) return () => {};

	const { y = 14, duration = 0.42, stagger = 0.06, start = 'top 85%' } = options;
	const { gsap, ScrollTrigger } = getGsap();

	const ctx = gsap.context(() => {
		gsap.from(selector, {
			scrollTrigger: {
				trigger: container,
				start,
				once: true
			},
			y,
			duration,
			stagger,
			ease: 'power2.out',
			clearProps: 'transform'
		});
	}, container);

	ScrollTrigger.refresh();
	return () => ctx.revert();
}

export function animateModalIn(panel: HTMLElement | undefined) {
	if (!panel || prefersReducedMotion()) return;
	const { gsap } = getGsap();
	gsap.fromTo(
		panel,
		{ y: 16, opacity: 0.9 },
		{ y: 0, opacity: 1, duration: 0.24, ease: 'power2.out', clearProps: 'transform,opacity' }
	);
}
