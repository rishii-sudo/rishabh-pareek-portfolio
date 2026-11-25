interface ViewportCallbacks {
	onEnter?: () => void;
	onExit?: () => void;
}

export default function viewport(element: Element, callbacks: ViewportCallbacks = {}) {
	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				callbacks.onEnter?.();
			} else {
				callbacks.onExit?.();
			}
		}
	});

	observer.observe(element);

	return {
		update(nextCallbacks: ViewportCallbacks = {}) {
			callbacks = nextCallbacks;
		},
		destroy() {
			observer.unobserve(element);
			observer.disconnect();
		}
	};
}
