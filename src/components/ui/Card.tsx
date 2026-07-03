import clsx from 'clsx'
import type { HTMLAttributes } from 'react'
interface Props extends HTMLAttributes<HTMLDivElement> { glass?: boolean }
export function Card({ glass, className, children, ...rest }: Props) {
  return <div className={clsx(glass ? 'card-glass' : 'card', className)} {...rest}>{children}</div>
}
