import { test, expect } from '@playwright/test';
import { clearInventory, ensureUserExists, loginViaApi } from '../utils/api-helpers';

const EMAIL = process.env.E2E_EMAIL || 'e2e-user@example.com';
const PASSWORD = process.env.E2E_PASSWORD || 'Password123!';

test.describe('Inventory management', () => {
  test.beforeEach(async ({ request }) => {
    await ensureUserExists(request, EMAIL, PASSWORD);
    const { token } = await loginViaApi(request, EMAIL, PASSWORD);
    await clearInventory(request, token);
  });

  test('supports creating, updating, filtering, and deleting items', async ({ page, request }) => {
    const { token } = await loginViaApi(request, EMAIL, PASSWORD);
    await page.addInitScript(([authToken]) => {
      localStorage.setItem('smart-inventory-auth-token', authToken);
    }, [token]);

    await page.goto('/inventory');
    await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible();

    await page.getByRole('button', { name: 'Add Item' }).click();
    await page.getByLabel('Item name').fill('Thermal Printer');
    await page.getByLabel('SKU').fill('PRN-200');
    await page.getByLabel('Supplier ID (optional)').fill('SUP-99');
    await page.getByLabel('Quantity').fill('5');
    await page.getByLabel('Reorder level').fill('2');
    await page.getByLabel('Unit price').fill('499.99');
    await page.getByRole('button', { name: 'Save' }).click();

    const row = page.getByRole('row', { name: /Thermal Printer/ });
    await expect(row).toBeVisible();
    await expect(row).toContainText('Healthy');

    await page.getByLabel(/Search inventory/).fill('PRN-200');
    await expect(page.getByRole('row', { name: /Thermal Printer/ })).toBeVisible();

    await page.getByLabel(/Search inventory/).fill('');
    await page.locator('button[mattooltip="Edit item"]').first().click();
    await page.getByLabel('Quantity').fill('1');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('row', { name: /Thermal Printer/ })).toContainText('Needs restock');

    page.once('dialog', (dialog) => dialog.accept());
    await page.locator('button[mattooltip="Remove item"]').first().click();
    await expect(page.getByText('No items yet')).toBeVisible();
  });
});

