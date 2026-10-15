import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleCheck,
  Info,
  Search,
  TriangleAlert,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Chip,
  Dialog,
  SelectField,
  Switch,
  Tabs,
  TextAreaField,
  TextField,
} from '../../components/system'
import { companies, companyPath, normaliseSearch } from '../../data/companies'
import { serviceProviders } from '../../data/providers'

export type Notify = (message: string) => void

export function FontPlayground() {
  const [text, setText] = useState('El sector avanza cuando avanzamos juntos.')
  const [weight, setWeight] = useState(600)
  return (
    <div className="ds-font-playground">
      <p className="ds-font-preview" style={{ fontWeight: weight }}>
        {text || 'Escribe tu próxima idea.'}
      </p>
      <div className="ds-font-controls">
        <TextField
          label="Texto de prueba"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={140}
        />
        <div className="ui-field">
          <label htmlFor="ds-weight">
            Peso variable <strong>{weight}</strong>
          </label>
          <input
            id="ds-weight"
            className="ds-range"
            type="range"
            min="400"
            max="700"
            step="50"
            value={weight}
            onChange={(event) => setWeight(Number(event.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

export function ButtonPlayground({ notify }: { notify: Notify }) {
  const [loading, setLoading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )
  const load = () => {
    setLoading(true)
    timer.current = setTimeout(() => {
      setLoading(false)
      notify('Acción de ejemplo completada.')
    }, 900)
  }
  return (
    <>
      <div className="ds-button-board">
        <div className="ds-button-row">
          <span>Primario</span>
          <Button onClick={() => notify('Botón primario activado.')}>
            <span>Hazte socio</span>
            <ArrowUpRight size={18} />
          </Button>
          <code>.action--dark</code>
        </div>
        <div className="ds-button-row ds-button-row--dark">
          <span>Acento</span>
          <Button variant="lime" onClick={() => notify('Botón de acento activado.')}>
            <span>Descubre AFEB</span>
            <ArrowRight size={18} />
          </Button>
          <code>.action--lime</code>
        </div>
        <div className="ds-button-row">
          <span>Secundario</span>
          <Button variant="outline" onClick={() => notify('Botón secundario activado.')}>
            <span>Ver empresas</span>
            <ArrowUpRight size={18} />
          </Button>
          <code>.action--outline</code>
        </div>
        <div className="ds-button-row">
          <span>Editorial</span>
          <Button variant="text" onClick={() => notify('Enlace editorial activado.')}>
            <span>Conoce la asociación</span>
            <ArrowRight size={18} />
          </Button>
          <code>.action--text</code>
        </div>
      </div>
      <div className="ds-subgrid">
        <div className="ds-demo">
          <p className="ds-small-label">Tamaños · extensión</p>
          <div className="ds-inline ds-align-end">
            <Button size="sm" onClick={() => notify('Tamaño compacto: 42 px.')}>
              Compacto
            </Button>
            <Button onClick={() => notify('Tamaño base: 52 px.')}>Base</Button>
            <Button size="lg" onClick={() => notify('Tamaño amplio: 60 px.')}>
              Amplio
            </Button>
          </div>
        </div>
        <div className="ds-demo">
          <p className="ds-small-label">Estados · extensión</p>
          <div className="ds-inline">
            <Button disabled>No disponible</Button>
            <Button variant="outline" loading={loading} onClick={load}>
              {loading ? 'Procesando…' : 'Probar carga'}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => notify('Variante destructiva: ejemplo sin modificar datos.')}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function ChipsPlayground() {
  const [category, setCategory] = useState('Todos')
  const [visible, setVisible] = useState(true)
  return (
    <div className="ds-subgrid">
      <div className="ds-demo">
        <p className="ds-small-label">Etiquetas informativas</p>
        <div className="ds-inline">
          <Badge tone="brand">Empresa asociada</Badge>
          <Badge tone="dark">Proveedor recomendado</Badge>
          <Badge>Jardín</Badge>
          <Badge>2026</Badge>
        </div>
        <p className="ds-demo-note">
          Una etiqueta describe. Los filtros utilizan botones con estado.
        </p>
      </div>
      <div className="ds-demo">
        <p className="ds-small-label">Filtros seleccionables · extensión</p>
        <div className="ds-inline">
          {['Todos', 'Herramientas', 'Jardín'].map((item) => (
            <Chip key={item} active={category === item} onClick={() => setCategory(item)}>
              {item}
            </Chip>
          ))}
        </div>
        <p className="ds-demo-note" role="status">
          Selección: {category}.
        </p>
        <div className="ds-inline">
          {visible ? (
            <button
              type="button"
              className="ui-chip"
              onClick={() => setVisible(false)}
              aria-label="Quitar filtro Empresas asociadas"
            >
              Empresas asociadas
              <X size={14} aria-hidden="true" />
            </button>
          ) : (
            <Button variant="text" size="sm" onClick={() => setVisible(true)}>
              Restaurar etiqueta
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export function NavigationPlayground() {
  const [tab, setTab] = useState('informacion')
  const provider = serviceProviders[0]
  return (
    <Tabs
      label="Ejemplo de pestañas de proveedor"
      value={tab}
      onChange={setTab}
      items={[
        {
          id: 'informacion',
          label: 'Información',
          content: (
            <div className="ds-tab-copy">
              <Badge tone="brand">NEXMART</Badge>
              <h3>Conectar procesos.</h3>
              <p>{provider.summary}</p>
            </div>
          ),
        },
        {
          id: 'servicios',
          label: 'Servicios',
          content: (
            <ul className="ds-tag-list">
              {provider.services.map((service) => (
                <li key={service.name}>
                  <Check size={15} aria-hidden="true" />
                  {service.name}
                </li>
              ))}
            </ul>
          ),
        },
        {
          id: 'contacto',
          label: 'Contacto',
          content: (
            <div className="ds-tab-copy">
              <h3>Contacto comercial</h3>
              <p>
                <a href={provider.phoneHref}>{provider.phone}</a>
                <br />
                <a href={`mailto:${provider.email}`}>{provider.email}</a>
              </p>
            </div>
          ),
        },
      ]}
    />
  )
}

export function GridPlayground() {
  const [view, setView] = useState('desktop')
  const options = [
    { id: 'desktop', label: 'Escritorio', columns: 3, rule: '≥1101 px · 3 columnas' },
    { id: 'tablet', label: 'Tablet', columns: 2, rule: '601–1100 px · 2 columnas' },
    { id: 'mobile', label: 'Móvil', columns: 1, rule: '≤600 px · 1 columna' },
  ]
  const selected = options.find((item) => item.id === view)!
  return (
    <div className="ds-demo">
      <div className="ds-demo-toolbar">
        <p className="ds-small-label">Rejilla del directorio</p>
        <div className="ds-inline">
          {options.map((option) => (
            <Chip key={option.id} active={option.id === view} onClick={() => setView(option.id)}>
              {option.label}
            </Chip>
          ))}
        </div>
      </div>
      <div
        className="ds-grid-preview"
        style={{ '--ds-columns': selected.columns } as CSSProperties}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i}>
            <span>0{i + 1}</span>
            <div />
            <div />
          </div>
        ))}
      </div>
      <p className="ds-demo-note" role="status">
        {selected.rule}
      </p>
    </div>
  )
}

export function FormPlayground() {
  const [values, setValues] = useState({ name: '', email: '', sector: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [updates, setUpdates] = useState(false)
  const form = useRef<HTMLFormElement>(null)
  const update = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
    setSubmitted(false)
  }
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (!values.name.trim()) next.name = 'Introduce un nombre de contacto.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = 'Introduce un correo válido, por ejemplo nombre@empresa.es.'
    if (!values.sector) next.sector = 'Selecciona una actividad.'
    setErrors(next)
    if (Object.keys(next).length)
      requestAnimationFrame(() =>
        form.current?.querySelector<HTMLElement>('[aria-invalid=true]')?.focus(),
      )
    else setSubmitted(true)
  }
  const reset = () => {
    setValues({ name: '', email: '', sector: '', message: '' })
    setErrors({})
    setSubmitted(false)
    setUpdates(false)
  }
  return (
    <div className="ds-form-layout">
      <form ref={form} className="ds-demo ds-form" noValidate onSubmit={submit}>
        <div>
          <Badge tone="brand">Demo local</Badge>
          <h3>Una conversación empieza aquí.</h3>
          <p>Ejemplo con validación. Los datos permanecen en esta página. * Campo obligatorio.</p>
        </div>
        <div className="ds-form-grid">
          <TextField
            label="Nombre de contacto"
            name="name"
            autoComplete="off"
            required
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder="Nombre y apellidos"
            error={errors.name}
          />
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="off"
            required
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            placeholder="nombre@empresa.es"
            error={errors.email}
          />
          <SelectField
            label="Actividad de la empresa"
            required
            value={values.sector}
            onChange={(event) => update('sector', event.target.value)}
            error={errors.sector}
            fieldClassName="ds-full"
          >
            <option value="">Selecciona una actividad</option>
            <option value="herramientas">Herramientas y construcción</option>
            <option value="jardin">Jardín</option>
            <option value="pinturas">Pinturas y decoración</option>
            <option value="servicios">Servicios especializados</option>
          </SelectField>
          <TextAreaField
            label="Tu mensaje"
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            placeholder="Cuéntanos qué necesitas…"
            hint="Máximo 500 caracteres."
            maxLength={500}
            fieldClassName="ds-full"
          />
        </div>
        <Switch label="Mostrar preferencia de novedades" checked={updates} onChange={setUpdates} />
        <div className="ds-inline">
          <Button type="submit">
            Validar ejemplo
            <ArrowRight size={17} aria-hidden="true" />
          </Button>
          <Button variant="text" onClick={reset}>
            Limpiar
          </Button>
        </div>
        {submitted && (
          <Alert title="Ejemplo validado" tone="success" icon={<CircleCheck size={19} />} announce>
            La validación es correcta. Esta demo no envía mensajes.
          </Alert>
        )}
      </form>
      <div className="ds-form-states">
        <div className="ds-demo">
          <p className="ds-small-label">Estados de campo</p>
          <TextField
            label="Campo disponible"
            placeholder="Escribe aquí…"
            hint="La ayuda explica qué se espera."
          />
          <TextField
            label="Campo con error de ejemplo"
            value="correo@"
            readOnly
            error="El correo necesita un dominio completo."
          />
          <TextField label="Campo desactivado" value="AFEB" disabled />
        </div>
        <div className="ds-demo">
          <p className="ds-small-label">Opciones y selección</p>
          <label className="ui-check">
            <input type="checkbox" defaultChecked />
            Pertenezco a una empresa del sector
          </label>
          <label className="ui-check">
            <input type="checkbox" disabled />
            Opción no disponible
          </label>
          <fieldset className="ds-radio">
            <legend>Canal preferido · ejemplo</legend>
            <label className="ui-check">
              <input type="radio" name="ds-channel" value="email" defaultChecked />
              Correo electrónico
            </label>
            <label className="ui-check">
              <input type="radio" name="ds-channel" value="phone" />
              Teléfono
            </label>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export function TablePlayground() {
  const [query, setQuery] = useState('')
  const [sector, setSector] = useState('todos')
  const [page, setPage] = useState(0)
  const filtered = companies.filter(
    (item) =>
      normaliseSearch(item.name + ' ' + item.legalName).includes(normaliseSearch(query)) &&
      (sector === 'todos' || item.sectors.some((id) => id === sector)),
  )
  const pageCount = Math.ceil(filtered.length / 4)
  const currentPage = Math.min(page, Math.max(0, pageCount - 1))
  const visible = filtered.slice(currentPage * 4, currentPage * 4 + 4)
  const clear = () => {
    setQuery('')
    setSector('todos')
    setPage(0)
  }
  return (
    <div className="ds-demo ds-table-demo">
      <div className="ds-table-search">
        <TextField
          label="Buscar en la tabla"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setPage(0)
          }}
          placeholder="Nombre de la empresa…"
          aria-controls="ds-companies-table"
        />
        <SelectField
          label="Filtrar actividad"
          value={sector}
          onChange={(event) => {
            setSector(event.target.value)
            setPage(0)
          }}
        >
          <option value="todos">Todos los sectores</option>
          <option value="herramientas">Herramientas y construcción</option>
          <option value="jardin">Jardín</option>
          <option value="pinturas">Pinturas y decoración</option>
        </SelectField>
      </div>
      <div className="ds-table-wrap">
        <table id="ds-companies-table">
          <caption className="ds-sr-only">Selección de empresas asociadas de AFEB</caption>
          <thead>
            <tr>
              <th scope="col">Empresa</th>
              <th scope="col">Actividad</th>
              <th scope="col">Acceso</th>
            </tr>
          </thead>
          <tbody>
            {visible.length ? (
              visible.map((company) => (
                <tr key={company.slug}>
                  <td>
                    <strong>{company.name}</strong>
                    <small>{company.legalName}</small>
                  </td>
                  <td>{company.activity}</td>
                  <td>
                    <Link
                      to={companyPath(company.slug)}
                      aria-label={`Abrir ficha de ${company.name}`}
                    >
                      Ver ficha
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>
                  <div className="ds-table-empty">
                    <Search size={25} aria-hidden="true" />
                    <strong>No hay coincidencias.</strong>
                    <p>Prueba otro nombre o elimina los filtros.</p>
                    <Button variant="text" size="sm" onClick={clear}>
                      Limpiar búsqueda
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="ds-table-bottom">
        <p role="status">
          {filtered.length
            ? `${currentPage * 4 + 1}–${Math.min((currentPage + 1) * 4, filtered.length)} de ${filtered.length}`
            : '0 resultados'}
        </p>
        <nav aria-label="Paginación de empresas">
          <button
            className="ui-icon-button"
            type="button"
            aria-label="Página anterior"
            disabled={currentPage === 0}
            onClick={() => setPage(currentPage - 1)}
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              className="ui-icon-button"
              type="button"
              key={i}
              aria-label={`Ir a la página ${i + 1}`}
              aria-current={i === currentPage ? 'page' : undefined}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="ui-icon-button"
            type="button"
            aria-label="Página siguiente"
            disabled={currentPage >= pageCount - 1}
            onClick={() => setPage(currentPage + 1)}
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  )
}

export function FeedbackPlayground({ notify }: { notify: Notify }) {
  const [step, setStep] = useState(1)
  const steps = ['Información', 'Revisión', 'Confirmación']
  return (
    <>
      <div className="ds-subgrid">
        <Alert title="Operación completada" tone="success" icon={<CircleCheck size={20} />}>
          Confirma el resultado y facilita el siguiente paso.
        </Alert>
        <Alert title="Información útil" icon={<Info size={20} />}>
          Da contexto sin interrumpir la tarea.
        </Alert>
        <Alert title="Revisa antes de continuar" tone="warning" icon={<TriangleAlert size={20} />}>
          Señala una condición que necesita atención.
        </Alert>
        <Alert title="Revisa los datos" tone="danger" icon={<Info size={20} />}>
          Explica el problema junto al campo afectado.
        </Alert>
      </div>
      <div className="ds-subgrid">
        <div className="ds-demo">
          <p className="ds-small-label">Carga progresiva</p>
          <div className="ds-skeleton" aria-label="Ejemplo visual de carga">
            <div />
            <div />
            <div />
          </div>
          <p className="ds-demo-note">
            Reserva el espacio de imágenes y texto para reducir los saltos.
          </p>
        </div>
        <div className="ds-demo">
          <p className="ds-small-label">Notificación temporal</p>
          <h3>Una confirmación discreta.</h3>
          <p className="ds-demo-note">Aviso visible y anunciado, con cierre manual.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => notify('Los cambios del ejemplo se han guardado.')}
          >
            Mostrar notificación
          </Button>
        </div>
      </div>
      <div className="ds-demo">
        <p className="ds-small-label">Progreso por pasos</p>
        <ol className="ds-steps">
          {steps.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                aria-current={step === i ? 'step' : undefined}
                onClick={() => setStep(i)}
              >
                <span>{i < step ? <Check size={15} aria-hidden="true" /> : `0${i + 1}`}</span>
                {label}
              </button>
            </li>
          ))}
        </ol>
        <progress
          className="ds-progress"
          max="3"
          value={step + 1}
          aria-label="Progreso del ejemplo"
        />
        <p className="ds-demo-note" role="status">
          Paso {step + 1} de 3 · {steps[step]}
        </p>
      </div>
    </>
  )
}

export function LayersPlayground({ notify }: { notify: Notify }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="ds-subgrid">
      <div className="ds-demo">
        <p className="ds-small-label">Diálogo y ayuda contextual</p>
        <h3>Una pausa con propósito.</h3>
        <p className="ds-demo-note">
          Diálogo nativo con foco contenido, cierre con Escape y regreso al control de origen.
        </p>
        <div className="ds-inline">
          <Button variant="outline" onClick={() => setOpen(true)}>
            Abrir diálogo
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
          <span className="ds-tooltip">
            <button
              className="ui-icon-button"
              type="button"
              aria-label="Ayuda sobre los diálogos"
              aria-describedby="ds-tooltip-description"
            >
              <Info size={18} aria-hidden="true" />
            </button>
            <span role="tooltip" id="ds-tooltip-description">
              Reserva los diálogos para tareas breves y decisiones concretas.
            </span>
          </span>
        </div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="¿Continuamos con esta idea?"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  setOpen(false)
                  notify('Acción de ejemplo confirmada.')
                }}
              >
                Confirmar ejemplo
                <Check size={17} aria-hidden="true" />
              </Button>
            </>
          }
        >
          <p>
            Este diálogo muestra la composición y el comportamiento de una confirmación. Al
            cerrarlo, el foco vuelve al botón que lo abrió.
          </p>
        </Dialog>
      </div>
      <div className="ds-demo">
        <p className="ds-small-label">Contenido desplegable</p>
        <Accordion
          items={[
            {
              title: '¿Dónde cambio los colores?',
              content: (
                <p>
                  En las variables de <code>src/styles.css</code>. La guía y los componentes
                  reutilizan esos tokens. Ejecuta <code>npm run design:assets</code> para actualizar
                  los archivos descargables.
                </p>
              ),
            },
            {
              title: '¿Cómo reutilizo los componentes?',
              content: (
                <p>
                  Importa <code>Button</code>, <code>TextField</code>, <code>Tabs</code> o{' '}
                  <code>Dialog</code> desde <code>src/components/system</code>. Los enlaces y
                  tarjetas existentes conservan sus componentes originales.
                </p>
              ),
            },
            {
              title: '¿Cómo añado una nueva ficha?',
              content: (
                <p>
                  Amplía los datos de empresas o proveedores con información verificada y reutiliza
                  su plantilla. Las dos categorías tienen modelos y rutas independientes.
                </p>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
