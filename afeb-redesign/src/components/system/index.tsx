import { useEffect, useId, useRef } from 'react'
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { ChevronDown, LoaderCircle, X } from 'lucide-react'
import './system.css'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'dark' | 'lime' | 'outline' | 'text' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  variant = 'dark',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`action action--${variant} ui-button ui-button--${size} ${className}`}
    >
      {loading && <LoaderCircle className="ui-spin" size={17} aria-hidden="true" />}
      {children}
    </button>
  )
}

export type BadgeTone = 'neutral' | 'brand' | 'dark' | 'info' | 'warning' | 'danger' | 'success'
export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: BadgeTone }) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>
}

export function Chip({
  active = false,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      {...props}
      type="button"
      className={`ui-chip${active ? ' ui-chip--active' : ''}`}
      aria-pressed={active}
    >
      {children}
    </button>
  )
}

type FieldInfo = { label: string; hint?: string; error?: string; fieldClassName?: string }
function FieldLabel({ label, id, required }: { label: string; id: string; required?: boolean }) {
  return (
    <label htmlFor={id}>
      {label}
      {required && <span aria-hidden="true"> *</span>}
    </label>
  )
}
function FieldMessage({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  return error ? (
    <p className="ui-field__error" id={`${id}-message`} role="alert">
      {error}
    </p>
  ) : hint ? (
    <p className="ui-field__hint" id={`${id}-message`}>
      {hint}
    </p>
  ) : null
}
export function TextField({
  label,
  hint,
  error,
  fieldClassName = '',
  id: suppliedId,
  required,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & FieldInfo) {
  const autoId = useId()
  const id = suppliedId ?? autoId
  return (
    <div className={`ui-field ${fieldClassName}`}>
      <FieldLabel label={label} id={id} required={required} />
      <input
        {...props}
        className="ui-input"
        id={id}
        required={required}
        aria-invalid={!!error || undefined}
        aria-describedby={error || hint ? `${id}-message` : undefined}
      />
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  )
}
export function SelectField({
  label,
  hint,
  error,
  fieldClassName = '',
  id: suppliedId,
  required,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & FieldInfo) {
  const autoId = useId()
  const id = suppliedId ?? autoId
  return (
    <div className={`ui-field ${fieldClassName}`}>
      <FieldLabel label={label} id={id} required={required} />
      <div className="ui-select">
        <select
          {...props}
          className="ui-input"
          id={id}
          required={required}
          aria-invalid={!!error || undefined}
          aria-describedby={error || hint ? `${id}-message` : undefined}
        >
          {children}
        </select>
        <ChevronDown size={17} aria-hidden="true" />
      </div>
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  )
}
export function TextAreaField({
  label,
  hint,
  error,
  fieldClassName = '',
  id: suppliedId,
  required,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & FieldInfo) {
  const autoId = useId()
  const id = suppliedId ?? autoId
  return (
    <div className={`ui-field ${fieldClassName}`}>
      <FieldLabel label={label} id={id} required={required} />
      <textarea
        {...props}
        className="ui-input"
        id={id}
        required={required}
        aria-invalid={!!error || undefined}
        aria-describedby={error || hint ? `${id}-message` : undefined}
      />
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  )
}

export function Switch({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="ui-switch"
    >
      <span className="ui-switch__track" aria-hidden="true">
        <span />
      </span>
      <span>{label}</span>
    </button>
  )
}

export type TabItem = { id: string; label: string; content: ReactNode }
export function Tabs({
  items,
  value,
  onChange,
  label,
}: {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  label: string
}) {
  const baseId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  return (
    <div className="ui-tabs">
      <div role="tablist" aria-label={label} className="ui-tabs__list">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              refs.current[index] = element
            }}
            role="tab"
            type="button"
            id={`${baseId}-tab-${item.id}`}
            aria-controls={`${baseId}-panel-${item.id}`}
            aria-selected={item.id === value}
            tabIndex={item.id === value ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => {
              const last = items.length - 1
              const next =
                event.key === 'ArrowRight'
                  ? (index + 1) % items.length
                  : event.key === 'ArrowLeft'
                    ? (index + last) % items.length
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? last
                        : -1
              if (next >= 0) {
                event.preventDefault()
                onChange(items[next].id)
                refs.current[next]?.focus()
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          tabIndex={0}
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== value}
          className="ui-tabs__panel"
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}

export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  return (
    <div className="ui-accordion">
      {items.map((item) => (
        <details key={item.title}>
          <summary>
            {item.title}
            <ChevronDown size={19} aria-hidden="true" />
          </summary>
          <div>{item.content}</div>
        </details>
      ))}
    </div>
  )
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [open])
  return (
    <dialog
      ref={ref}
      className="ui-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose()
        }
      }}
    >
      <header>
        <Badge tone="brand">Vista previa</Badge>
        <button
          type="button"
          className="ui-icon-button"
          onClick={onClose}
          aria-label="Cerrar diálogo"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </header>
      <h2 id={titleId}>{title}</h2>
      <div className="ui-dialog__body">{children}</div>
      {footer && <footer>{footer}</footer>}
    </dialog>
  )
}

export function Alert({
  title,
  children,
  tone = 'info',
  icon,
  announce = false,
}: {
  title: string
  children?: ReactNode
  tone?: 'success' | 'info' | 'warning' | 'danger'
  icon?: ReactNode
  announce?: boolean
}) {
  return (
    <div
      className={`ui-alert ui-alert--${tone}`}
      role={announce ? (tone === 'danger' ? 'alert' : 'status') : 'note'}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <div>
        <strong>{title}</strong>
        {children && <p>{children}</p>}
      </div>
    </div>
  )
}
