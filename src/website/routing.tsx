import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — AFEB`
  }, [title])
}

export function NavigationEffects() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const previousPath = useRef<string | null>(null)
  const positions = useRef(new Map<string, { left: number; top: number }>())

  useLayoutEffect(() => {
    const original = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = original
    }
  }, [])

  useLayoutEffect(() => {
    const saved = positions.current.get(key)
    if (navigationType === 'POP' && saved) {
      window.scrollTo({ ...saved, behavior: 'instant' })
    } else if (hash) {
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView({ behavior: 'instant' })
    } else if (previousPath.current !== null && previousPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    previousPath.current = pathname
    return () => {
      positions.current.set(key, { left: window.scrollX, top: window.scrollY })
    }
  }, [pathname, hash, key, navigationType])
  return null
}
