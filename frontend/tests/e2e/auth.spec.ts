import { test, expect } from '@playwright/test';
import { ensureUserExists } from '../utils/api-helpers';

const EMAIL = process.env.E2E_EMAIL || 'e2e-user@example.com';
const PASSWORD = process.env.E2E_PASSWORD || 'Password123!';

test.describe('Authentication', () => {
  test('allows a user to log in through the UI and see the dashboard', async ({ page, request }) => {
    await ensureUserExists(request, EMAIL, PASSWORD);

    await page.goto('/auth/login');
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();

    await page.getByLabel('Email').fill(EMAIL);
    await page.getByLabel('Password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText(EMAIL)).toBeVisible();

    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page).toHaveURL(/\/auth\/login$/);
  });
});

