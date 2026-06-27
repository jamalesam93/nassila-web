export const THEME_COOKIE = 'theme'

export type Theme = 'light' | 'dark' | 'system'

/** SSR class on `<html>` — only explicit light/dark; system resolves on the client. */
export function themeClassFromCookie(value: string | undefined): 'light' | 'dark' | null {
  if (value === 'dark') return 'dark'
  if (value === 'light') return 'light'
  return null
}

export function writeThemeCookie(theme: Theme) {
  document.cookie = `${THEME_COOKIE}=${theme};path=/;max-age=31536000;SameSite=Lax`
}
