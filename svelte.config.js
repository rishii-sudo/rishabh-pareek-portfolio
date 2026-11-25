import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// @sveltejs/adapter-vercel creates POSIX symlinks in .vercel/output which fails with EPERM on Windows without Developer Mode.
const vercelAdapter = adapter({ runtime: 'nodejs22.x' });
const buildAdapter =
	process.platform === 'win32' && !process.env.VERCEL
		? { name: 'local-win-preview', adapt: () => {} }
		: vercelAdapter;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: buildAdapter
	}
};

export default config;
