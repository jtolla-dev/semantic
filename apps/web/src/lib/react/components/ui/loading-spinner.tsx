import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/client/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  className?: string
  variant?: 'inline' | 'fullPage' | 'button'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
}

export function LoadingSpinner({
  size = 'md',
  text,
  className,
  variant = 'inline',
}: LoadingSpinnerProps) {
  const spinnerElement = (
    <Loader2 className={cn('animate-spin text-muted-foreground', sizeClasses[size], className)} />
  )

  if (variant === 'fullPage') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        {spinnerElement}
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
    )
  }

  if (variant === 'button') {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className={cn('animate-spin', sizeClasses[size], className)} />
        {text && <span>{text}</span>}
      </div>
    )
  }

  // Default inline variant
  if (text) {
    return (
      <div className="flex items-center gap-2">
        {spinnerElement}
        <span className="text-muted-foreground">{text}</span>
      </div>
    )
  }

  return spinnerElement
}
