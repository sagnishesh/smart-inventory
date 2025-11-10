import { APIRequestContext, expect } from '@playwright/test';

const API_URL = process.env.API_URL || 'http://localhost:8080/api/v1';

export interface AuthPayload {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export async function ensureUserExists(
  request: APIRequestContext,
  email: string,
  password: string,
  role: 'ADMIN' | 'STAFF' = 'STAFF'
): Promise<void> {
  const response = await request.post(`${API_URL}/auth/register`, {
    data: { email, password, role }
  });

  if (response.status() === 201) {
    return;
  }

  if (response.status() === 409) {
    return;
  }

  throw new Error(`Unexpected response while ensuring user exists: ${response.status()} ${response.statusText()}`);
}

export async function loginViaApi(
  request: APIRequestContext,
  email: string,
  password: string
): Promise<AuthPayload> {
  const response = await request.post(`${API_URL}/auth/login`, {
    data: { email, password }
  });
  expect(response.ok()).toBeTruthy();
  return (await response.json()) as AuthPayload;
}

export async function clearInventory(request: APIRequestContext, token: string): Promise<void> {
  const listResponse = await request.get(`${API_URL}/inventory`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!listResponse.ok()) {
    return;
  }

  const items: Array<{ id: string }> = await listResponse.json();

  await Promise.all(
    items.map((item) =>
      request.delete(`${API_URL}/inventory/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    )
  );
}

