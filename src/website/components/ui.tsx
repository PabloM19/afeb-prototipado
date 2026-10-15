import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

type ActionProps = {
  href: string
  children: ReactNode
  variant?: 'dark' | 'lime' | 'outline' | 'text'
  className?: string
  arrow?: 'right' | 'up' | 'down'
}

export function Action({
  href,
  children,
  variant = 'dark',
  className = '',
  arrow = 'up',
}: ActionProps) {
  const Icon = arrow === 'right' ? ArrowRight : arrow === 'down' ? ArrowDown : ArrowUpRight
  return (
    <a className={`action action--${variant} ${className}`} href={href}>
      <span>{children}</span>
      <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
    </a>
  )
}

export function Eyebrow({
  children,
  number,
  light = false,
}: {
  children: ReactNode
  number?: string
  light?: boolean
}) {
  return (
    <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>
      {number && (
        <span className="eyebrow__number" aria-hidden="true">
          {number}
        </span>
      )}
      {children}
    </p>
  )
}
