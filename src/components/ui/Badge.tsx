import clsx from 'clsx'
import styles from './Badge.module.css'
type Color = 'blue' | 'orange' | 'cyan' | 'green' | 'red'
interface Props { label: string; color?: Color; dot?: boolean; className?: string }
export function Badge({ label, color = 'blue', dot, className }: Props) {
  return (
    <span className={clsx(`badge badge-${color}`, className)}>
      {dot && <span aria-hidden className={styles.dot} />}
      {label}
    </span>
  )
}
