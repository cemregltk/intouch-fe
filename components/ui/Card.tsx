import { ReactNode } from 'react'
import Link from 'next/link'

interface CardProps {
  children: ReactNode
  href?: string
  className?: string
  onClick?: () => void
}

export default function Card({ children, href, className = '', onClick }: CardProps) {
  const baseStyles = 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden'
  
  const content = (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  )
  
  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }
  
  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        {content}
      </div>
    )
  }
  
  return content
}

