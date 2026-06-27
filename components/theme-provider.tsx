'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { writeThemeCookie, type Theme } from '@/lib/theme'

type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    // ignore private mode
  }
  return 'system'
}

function applyTheme(resolved: ResolvedTheme, disableTransition: boolean) {
  const root = document.documentElement
  let cleanup: (() => void) | undefined

  if (disableTransition) {
    const css = document.createElement('style')
    css.appendChild(
      document.createTextNode('*,*::before,*::after{transition:none!important}'),
    )
    document.head.appendChild(css)
    cleanup = () => {
      window.getComputedStyle(document.body)
      setTimeout(() => document.head.removeChild(css), 1)
    }
  }

  root.classList.remove('light', 'dark')
  root.classList.add(resolved)
  root.style.colorScheme = resolved

  return cleanup
}

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'system' : readStoredTheme(),
  )
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    typeof window === 'undefined' ? 'light' : getSystemTheme(),
  )

  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    writeThemeCookie(readStoredTheme())
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemTheme(getSystemTheme())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useLayoutEffect(() => {
    return applyTheme(resolvedTheme, true)
  }, [resolvedTheme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore quota / private mode
    }
    writeThemeCookie(next)
  }, [])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within Providers')
  return ctx
}
