'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

export interface LinkProps extends NextLinkProps {
  children: React.ReactNode
  className?: string
  prefetch?: boolean
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ prefetch = true, ...props }, forwardedRef) => {
    const router = useRouter()
    const ref = useRef<HTMLAnchorElement | null>(null)
    const prefetchedRef = useRef(false)

    // Set up ref handling with useImperativeHandle to avoid memory leaks
    useImperativeHandle(forwardedRef, () => ref.current!, [])

    // Reset prefetch state when href changes
    useEffect(() => {
      prefetchedRef.current = false
    }, [props.href])

    // Prefetch on hover
    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Call any existing onMouseEnter handler
      props.onMouseEnter?.(e)

      if (!prefetch || prefetchedRef.current) return
      if (typeof props.href === 'string') {
        router.prefetch(props.href)
        prefetchedRef.current = true
      }
    }

    // Prefetch on viewport intersection
    useEffect(() => {
      if (!prefetch || !ref.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !prefetchedRef.current) {
              if (typeof props.href === 'string') {
                router.prefetch(props.href)
                prefetchedRef.current = true
              }
            }
          })
        },
        { rootMargin: '50px' }
      )

      observer.observe(ref.current)

      return () => {
        observer.disconnect()
      }
    }, [prefetch, props.href, router])

    // Extract onMouseEnter from props to avoid spreading it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onMouseEnter, ...restProps } = props

    return <NextLink ref={ref} prefetch={false} {...restProps} onMouseEnter={handleMouseEnter} />
  }
)

Link.displayName = 'Link'
