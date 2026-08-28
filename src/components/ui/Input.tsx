import { forwardRef, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?:  string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, hint, className, id, ...rest }, ref) => (
    <div className="field">
      {label && <label className="label" htmlFor={id}>{label}</label>}
      <input
        ref={ref} id={id}
        className={clsx('input', error && 'input-error', className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...rest}
      />
      {hint  && <span id={`${id}-hint`} className={styles.hint}>{hint}</span>}
      {error && <span id={`${id}-error`} role="alert" className="field-error">{error}</span>}
    </div>
  )
)
Input.displayName = 'Input'
