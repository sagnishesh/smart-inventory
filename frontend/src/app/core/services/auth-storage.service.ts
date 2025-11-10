import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'smart-inventory-auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private readonly tokenSignal = signal<string | null>(this.readFromStorage());

  getToken(): string | null {
    return this.tokenSignal();
  }

  setToken(token: string | null): void {
    this.tokenSignal.set(token);

    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private readFromStorage(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }
}

