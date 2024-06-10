import { test, expect } from '@playwright/test';

test("Devise succes", async ({ page }) => {
	await page.goto('http://localhost:4000/');

	const baseSelect =  page.locator('#baseDevise');
	const targetSelect =  page.locator('#targetDevise');
	await expect(baseSelect).toBeVisible();
	await expect(targetSelect).toBeVisible();

	const baseDefaultOption =  baseSelect.locator('option[disabled]');
	const targetDefaultOption =  targetSelect.locator('option[disabled]');

	await baseDefaultOption.click();
	await targetDefaultOption.click();

	const baseOptions =  baseSelect.locator('option');
	const targetOptions =  targetSelect.locator('option');
	expect(baseOptions.count()).toBeGreaterThan(1);
	expect(targetOptions.count()).toBeGreaterThan(1);

	await page.selectOption('#baseDevise', 'EUR');
	await page.selectOption('#targetDevise', 'USD');
	await page.fill('#montant', '5');
	await page.click('button');
	await page.waitForSelector('#resultat');

	const result = await page.inputValue('#resultat');
	console.log('Résultat de la conversion :', result);
})

