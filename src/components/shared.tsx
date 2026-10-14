import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Search, FolderOpen, X, Check, LockKeyhole } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDate } from '@/data/fixtures'
import type { Activity } from '@/data/fixtures'
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action}
    </div>
  )
}
export function SectionHeading({
  title,
  description,
  href,
  label = 'Ver todo',
}: {
  title: string
  description?: string
  href?: string
  label?: string
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && (
        <Link className="text-link" to={href}>
          {label}
          <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  )
}
export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar…',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="search-input">
      <Search size={17} />
      <Input
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button aria-label="Limpiar búsqueda" onClick={() => onChange('')}>
          <X size={14} />
        </button>
      )}
    </div>
  )
}
export function FilterSelect({
  value,
  onChange,
  options,
  label = 'Categoría',
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
  label?: string
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger aria-label={label} className="filter-select">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
export function EmptyState({
  title = 'No hay resultados',
  description = 'Prueba con otra búsqueda o cambia los filtros.',
  action,
}: {
  title?: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="empty-state">
      <FolderOpen size={32} />
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}
export function Status({ children }: { children: ReactNode }) {
  return (
    <span className={`status ${children === 'Abierta' ? 'status-open' : ''}`}>
      <span />
      {children}
    </span>
  )
}
export function ActivityRow({
  activity,
  compact = false,
}: {
  activity: Activity
  compact?: boolean
}) {
  const date = new Date(activity.date)
  return (
    <Link
      to={`/detalles-evento?id=${activity.id}`}
      className={`activity-row ${compact ? 'compact' : ''}`}
    >
      <div className="date-box">
        <span>{formatDate(activity.date, { month: 'short' }).replace('.', '')}</span>
        <strong>{date.getDate()}</strong>
      </div>
      <div className="activity-row-info">
        <span className="small-label">{activity.category}</span>
        <h3>{activity.title}</h3>
        <p>
          {activity.mode} <span>·</span>{' '}
          {formatDate(activity.date, { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      <div className="activity-row-end">
        <Status>{activity.state}</Status>
        <ArrowUpRight size={20} />
      </div>
    </Link>
  )
}
export function Stat({
  label,
  value,
  note,
  icon,
}: {
  label: string
  value: string
  note: string
  icon: ReactNode
}) {
  return (
    <div className="stat">
      <div className="stat-top">
        <span>{label}</span>
        {icon}
      </div>
      <strong>{value}</strong>
      <p>{note}</p>
    </div>
  )
}
export function Avatar({ initials, size = 'normal' }: { initials: string; size?: string }) {
  return <span className={`avatar avatar-${size}`}>{initials}</span>
}
export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link className="back-link" to={to}>
      <ArrowRight size={15} className="rotate-180" />
      {label}
    </Link>
  )
}
export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="demo-notice">
      <LockKeyhole size={15} />
      <span>{children || 'Prototipo local. Los datos y las acciones son de demostración.'}</span>
    </div>
  )
}
export type Field = {
  name: string
  label: string
  type?: string
  options?: string[]
  required?: boolean
  wide?: boolean
  placeholder?: string
}
export function FormFields({
  fields,
  values,
  setValues,
}: {
  fields: Field[]
  values: Record<string, string>
  setValues: (v: Record<string, string>) => void
}) {
  const formId = useId()
  return (
    <div className="form-grid">
      {fields.map((field) => (
        <label
          htmlFor={`${formId}-${field.name}`}
          className={field.wide ? 'field wide' : 'field'}
          key={field.name}
        >
          <span>
            {field.label}
            {field.required && ' *'}
          </span>
          {field.options ? (
            <select
              id={`${formId}-${field.name}`}
              value={values[field.name] || ''}
              onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
              required={field.required}
            >
              <option value="">Selecciona una opción</option>
              {field.options.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <Textarea
              id={`${formId}-${field.name}`}
              value={values[field.name] || ''}
              onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
              required={field.required}
              placeholder={field.placeholder}
            />
          ) : (
            <Input
              id={`${formId}-${field.name}`}
              type={field.type || 'text'}
              value={values[field.name] || ''}
              onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
              required={field.required}
              placeholder={field.placeholder}
            />
          )}
        </label>
      ))}
    </div>
  )
}
export function EditDialog({
  open,
  onOpenChange,
  title,
  description,
  fields,
  initial,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  fields: Field[]
  initial: Record<string, string>
  onSave: (values: Record<string, string>) => void
}) {
  const [values, setValues] = useState(initial)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="edit-dialog">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(values)
            onOpenChange(false)
            toast.success('Cambios guardados en este navegador')
          }}
        >
          <FormFields fields={fields} values={values} setValues={setValues} />
          <p className="form-hint">
            * Campos obligatorios. Datos de demostración, sin conexión al portal real.
          </p>
          <div className="form-actions">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              <Check size={16} />
              Guardar cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export function downloadDemo(title: string) {
  const blob = new Blob(
    [
      `AFEB · Documento de demostración\n\n${title}\n\nEste archivo ilustra el flujo de descarga del prototipo local. No es un informe real ni contiene datos de AFEB.\nFecha: 14/10/2026`,
    ],
    { type: 'text/plain;charset=utf-8' },
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `afeb-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-demo.txt`
  a.click()
  URL.revokeObjectURL(url)
  toast.success('Ejemplo descargado', {
    description: 'Archivo de texto de demostración; el documento real requiere backend.',
  })
}
