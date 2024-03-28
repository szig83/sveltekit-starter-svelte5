import { test, expect } from '@playwright/test'

test('navigation test', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByTestId('hydrated')).toBeVisible()

	await expect(page).toHaveTitle(/Weboldal/)
})
