import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	timeout: 10 * 1000 /*default: 30*1000*/,
	/* Run tests in files in parallel */
	// fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	// forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	// retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	// workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		['list', { printSteps: true }],
		//['html', { open: 'never', outputFolder: 'test-reports' }],
		//['json', { outputFile: 'test-reports/results.json' }],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.PUBLIC_ROOT_URL || 'http://localhost:5173',

		launchOptions: {
			slowMo: parseInt(process.env.SLOW_MO || '0'),
		},

		// screenshot: {
		// 	mode: 'on',
		// },

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		video: 'retain-on-failure',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			testIgnore: /.*mobile.spec.ts/,
		},

		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// 	testIgnore: /.*mobile.spec.ts/,
		// },

		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] },
		// 	testIgnore: /.*mobile.spec.ts/,
		// },

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		//	 testIgnore: /.*desktop.spec.ts/,
		// },
		// {
		// 	name: 'Mobile Safari',
		// 	use: { ...devices['iPhone 14 Pro'] },
		// 	testIgnore: /.*desktop.spec.ts/,
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		//   testIgnore: /.*mobile.spec.ts/,
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		//   testIgnore: /.*mobile.spec.ts/,
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'bun run dev',
		port: 5173,
		reuseExistingServer: true,
	},
})
