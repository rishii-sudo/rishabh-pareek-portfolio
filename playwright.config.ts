import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npx vite preview --port 4173 --strictPort',
		port: 4173,
		reuseExistingServer: !process.env.CI
	},
	testDir: 'tests',
	reporter: 'list',
	use: {
		channel: 'chrome',
		headless: true
	}
};

export default config;
