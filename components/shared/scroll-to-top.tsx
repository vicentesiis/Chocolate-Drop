'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't scroll to top if there's a hash in the URL (for anchor links)
    if (window.location.hash) {
      return
    }

    // Small delay to ensure the page has rendered
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}