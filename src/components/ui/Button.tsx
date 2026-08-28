import { forwardRef, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Button.module.css'

type Variant = 'blue' | 'orange' | 'ghost' | 'ghost-orange' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?:    Size
  loading?: boolean
  as?:      'button' | 'a'
  href?:    string
}

const variantMap: Record<Variant, string> = {
  'blue':         'btn btn-blue',
  'orange':       'btn btn-orange',
  'ghost':        'btn btn-ghost',
  'ghost-orange': 'btn btn-ghost-orange',
  'danger':       'btn btn-danger',
}
const sizeMap: Record<Size, string> = {
  sm: 'btn-sm', md: '', lg: 'btn-lg',
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'blue', size = 'md', loading, className, children, disabled, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading}
      className={clsx(variantMap[variant], sizeMap[size], className)}
      {...rest}
    >
      {loading ? <span aria-hidden className={styles.loadingSpinner}>···</span> : children}
    </button>
  )
)
Button.displayName = 'Button'
