import { cn } from '@/lib/client/utils/cn'

interface LogoProps {
  className?: string
  iconOnly?: boolean
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Topos icon"
        className={cn('text-foreground', className)}
      >
        <g transform="translate(5,10)">
          <path
            d="M22 60 H168"
            stroke="currentColor"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <path
            d="M95 72 V180"
            stroke="currentColor"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <circle cx="22" cy="60" r="14" fill="currentColor" />
          <circle cx="168" cy="60" r="14" fill="currentColor" />
          <circle cx="95" cy="180" r="14" fill="currentColor" />
          <circle
            cx="95"
            cy="180"
            r="28"
            stroke="currentColor"
            strokeWidth="7"
            fill="none"
            opacity="0.95"
          />
        </g>
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 760 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Topos logo"
      className={cn('text-foreground', className)}
    >
      <g transform="translate(30,20)">
        <g>
          <path
            d="M22 60 H168"
            stroke="currentColor"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <path
            d="M95 72 V180"
            stroke="currentColor"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <circle cx="22" cy="60" r="14" fill="currentColor" />
          <circle cx="168" cy="60" r="14" fill="currentColor" />
          <circle cx="95" cy="180" r="14" fill="currentColor" />
          <circle
            cx="95"
            cy="180"
            r="28"
            stroke="currentColor"
            strokeWidth="7"
            fill="none"
            opacity="0.95"
          />
        </g>
        <text
          x="210"
          y="156"
          fill="currentColor"
          fontSize="132"
          fontWeight="800"
          fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
          letterSpacing="-2"
        >
          opos
        </text>
      </g>
    </svg>
  )
}
