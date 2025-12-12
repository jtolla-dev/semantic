'use client'

import { useEffect, useState } from 'react'

export function AnimatedDots() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return <span>{dots.padEnd(3, '\u00A0')}</span> // Use non-breaking spaces to maintain width
}
