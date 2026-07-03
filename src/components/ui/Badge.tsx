import clsx from 'clsx'
type Color = 'blue' | 'orange' | 'cyan' | 'green' | 'red'
interface Props { label: string; color?: Color; dot?: boolean; className?: string }
export function Badge({ label, color = 'blue', dot, className }: Props) {
  return (
    <span className={clsx(`badge badge-${color}`, className)}>
      {dot && <span aria-hidden style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />}
      {label}
    </span>
  )
}
