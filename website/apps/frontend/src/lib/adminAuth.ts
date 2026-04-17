'use client';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'mkfashion2026';
const STORAGE_KEY = 'mk_admin_auth';

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEY) === 'true';
}

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
