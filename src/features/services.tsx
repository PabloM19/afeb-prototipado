import { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Check, ChevronDown, Handshake, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  PageHeading,
  SearchInput,
  EmptyState,
  DemoNotice,
  FormFields,
  BackLink,
} from '@/components/shared'
import { providers, companies } from '@/data/fixtures'
import { mockDb } from '@/data/mock-db'
import { localAction } from '@/lib/local-action'
import { useStore } from '@/lib/store'
export function Providers() {
  const [params] = useSearchParams()
  const location = useLocation()
  const [search, setSearch] = useState(() => params.get('buscar') || '')
  const [tab, setTab] = useState(() =>
    params.get('tipo') === 'Benefits' ? 'Benefits' : 'Proveedores',
  )
  useEffect(() => {
    setSearch(params.get('buscar') || '')
    setTab(params.get('tipo') === 'Benefits' ? 'Benefits' : 'Proveedores')
  }, [params, location.key])
  const filtered = providers.filter(
    (p) =>
      p.type === tab && `${p.title} ${p.category}`.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <>
      <PageHeading
        title="Colaboradores y beneficios"
        description="Especialistas y condiciones que aportan valor a tu empresa."
      />
      <div className="catalog-top provider-catalog-top">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="Proveedores">Proveedores recomendados</TabsTrigger>
            <TabsTrigger value="Benefits">Beneficios para socios</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="filter-bar">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={
            tab === 'Benefits'
              ? 'Buscar beneficio o especialidad…'
              : 'Buscar proveedor o especialidad…'
          }
        />
      </div>
      <div className="providers-list">
        {filtered.map((p) => (
          <details
            className="provider"
            key={p.title}
            open={params.get('buscar') === p.title ? true : undefined}
          >
            <summary>
              <span className="panel-icon">
                <Handshake size={22} />
              </span>
              <div>
                <span className="small-label">{p.category}</span>
                <h2>{p.title}</h2>
              </div>
              <ChevronDown size={18} />
            </summary>
            <div className="provider-content">
              <p>{p.description}</p>
              {p.benefit && (
                <div className="benefit">
                  <Check size={17} />
                  <span>{p.benefit}</span>
                </div>
              )}
              {p.contactEmail && (
                <a
                  className="text-link"
                  href={`mailto:${p.contactEmail}?subject=${encodeURIComponent(p.title)}`}
                >
                  Pedir más información
                  <ArrowUpRight size={16} />
                </a>
              )}
              <p className="form-hint">
                Información recogida del portal el 14/10/2026.{' '}
                {p.contactEmail ? '' : 'Contacto no recogido.'}
              </p>
            </div>
          </details>
        ))}
      </div>
      {filtered.length === 0 && <EmptyState />}
    </>
  )
}
export function Groups() {
  const [search, setSearch] = useState('')
  return (
    <>
      <PageHeading
        title="Grupos de trabajo"
        description="Un espacio para trabajar juntos en los retos del sector."
      />
      <div className="filter-bar">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar grupo de trabajo…" />
      </div>
      <EmptyState
        title="Sin grupos en esta muestra"
        description="Puedes consultar las actividades relacionadas con grupos de trabajo."
        action={
          <Button variant="outline" asChild>
            <Link to="/eventos">
              Ver actividades
              <ArrowUpRight size={16} />
            </Link>
          </Button>
        }
      />
      <DemoNotice>
        La muestra consultada no incluye grupos. Está pendiente decidir si serán espacios
        permanentes con miembros y documentos.
      </DemoNotice>
    </>
  )
}
export function Cobranding() {
  const store = useStore()
  const [selected, setSelected] = useState<string[]>([])
  const [values, setValues] = useState<Record<string, string>>({})
  const [search, setSearch] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <>
      <BackLink to="/eventos" label="Actividades y servicios" />
      <PageHeading
        title="Proponer colaboración"
        description="Propón una colaboración con otras empresas de la comunidad AFEB."
      />
      <div className="service-form-grid">
        <form
          className="form-page"
          onSubmit={(e) => {
            e.preventDefault()
            if (!selected.length) return toast.error('Selecciona al menos una empresa')
            const result = localAction(() =>
              store.createRequest({
                kind: 'collaboration',
                payload: {
                  companyIds: selected,
                  collaborationType: values.type,
                  description: values.description,
                },
              }),
            )
            if (!result.ok) return
            setSent(true)
            toast.success('Propuesta guardada en la demo')
          }}
        >
          {sent ? (
            <EmptyState
              title="Propuesta registrada"
              description="Propuesta registrada localmente. No se ha enviado a ninguna empresa."
              action={
                <Button
                  type="button"
                  onClick={() => {
                    setSent(false)
                    setSelected([])
                    setValues({})
                  }}
                >
                  Crear otra propuesta
                </Button>
              }
            />
          ) : (
            <>
              <div className="section-heading">
                <h2>1. Elige con quién conectar</h2>
                <span className="small-label">
                  {selected.length} / {mockDb.auditedForms.collaboration.maxCompanies} empresas
                </span>
              </div>
              <SearchInput value={search} onChange={setSearch} placeholder="Buscar empresa…" />
              <div className="company-picker">
                {companies
                  .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
                  .map((c) => (
                    <label key={c.id}>
                      <Checkbox
                        checked={selected.includes(c.id)}
                        disabled={
                          selected.length === mockDb.auditedForms.collaboration.maxCompanies &&
                          !selected.includes(c.id)
                        }
                        onCheckedChange={(v) =>
                          setSelected(v ? [...selected, c.id] : selected.filter((x) => x !== c.id))
                        }
                      />
                      <div>
                        <strong>{c.name}</strong>
                        <span>{c.category}</span>
                      </div>
                    </label>
                  ))}
              </div>
              <h2>2. Cuéntanos tu propuesta</h2>
              <FormFields
                fields={[
                  {
                    name: 'type',
                    label: 'Tipo de colaboración',
                    options: mockDb.auditedForms.collaboration.types,
                    required: true,
                    wide: true,
                  },
                  {
                    name: 'description',
                    label: 'Descripción',
                    type: 'textarea',
                    required: true,
                    wide: true,
                    placeholder: '¿Qué te gustaría construir con estas empresas?',
                  },
                ]}
                values={values}
                setValues={setValues}
              />
              <DemoNotice />
              <div className="form-actions">
                <Button type="submit" disabled={selected.length === 0}>
                  Registrar propuesta
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </>
          )}
        </form>
        <aside className="service-aside">
          <Handshake size={28} />
          <h2>
            De una idea
            <br />a una oportunidad.
          </h2>
          <p>AFEB podrá revisar tu solicitud y acompañar los siguientes pasos.</p>
          <span>
            La demo cubre la recepción de solicitudes. El matching automático queda fuera del
            alcance.
          </span>
        </aside>
      </div>
    </>
  )
}
export function Tenders() {
  const store = useStore(),
    [daily, setDaily] = useState(store.tenderPreferences.daily),
    [personal, setPersonal] = useState(store.tenderPreferences.personalized)
  const [values, setValues] = useState<Record<string, string>>({
    interests: store.tenderPreferences.interests,
    comments: store.tenderPreferences.comments,
  })
  useEffect(() => {
    setDaily(store.tenderPreferences.daily)
    setPersonal(store.tenderPreferences.personalized)
    setValues({
      interests: store.tenderPreferences.interests,
      comments: store.tenderPreferences.comments,
    })
  }, [store.tenderPreferences.updatedAt])
  return (
    <>
      <BackLink to="/eventos" label="Actividades y servicios" />
      <PageHeading
        eyebrow="Nuevas oportunidades"
        title="Licitaciones"
        description="Preferencias de información."
      />
      <div className="service-form-grid">
        <form
          className="form-page"
          onSubmit={(e) => {
            e.preventDefault()
            const result = localAction(() =>
              store.saveTenderPreferences({
                daily,
                personalized: personal,
                categoryIds: [],
                interests: values.interests ?? '',
                comments: values.comments ?? '',
                updatedAt: null,
              }),
            )
            if (result.ok) toast.success('Preferencias y solicitud guardadas en local')
          }}
        >
          <h2>La información que te interesa</h2>
          <label className="preference-row">
            <div>
              <strong>Newsletter general diaria</strong>
            </div>
            <Checkbox
              checked={daily ?? 'indeterminate'}
              onCheckedChange={(v) => setDaily(v === true)}
            />
          </label>
          <label className="preference-row">
            <div>
              <strong>Modalidad personalizada</strong>
              <span>
                {mockDb.auditedForms.tenders.personalizedMonthlyPrice} €/mes de referencia auditada,
                sin contratación.
              </span>
            </div>
            <Checkbox
              checked={personal ?? 'indeterminate'}
              onCheckedChange={(v) => setPersonal(v === true)}
            />
          </label>
          <FormFields
            fields={[
              {
                name: 'interests',
                label: 'Intereses de la modalidad personalizada',
                type: 'textarea',
                required: personal === true,
                wide: true,
                placeholder: 'Indica tus intereses para esta solicitud local…',
              },
              { name: 'comments', label: 'Comentarios adicionales', type: 'textarea', wide: true },
            ]}
            values={values}
            setValues={setValues}
          />
          <p className="form-hint">
            El catálogo específico de categorías no se verificó. Tus intereses se conservan como
            texto, sin crear categorías ficticias.
          </p>
          <DemoNotice>
            Guardar conserva las preferencias y crea una solicitud estructurada de seguimiento. No
            suscribe newsletters ni cobra el servicio.
          </DemoNotice>
          <div className="form-actions">
            <Button type="submit">
              Guardar preferencias
              <Check size={16} />
            </Button>
          </div>
          {store.tenderPreferences.updatedAt && (
            <Link className="text-link" to="/demo">
              Consultar solicitud en el Centro de demos
              <ArrowUpRight size={16} />
            </Link>
          )}
        </form>
        <aside className="service-aside">
          <Mail size={28} />
          <h2>La oportunidad adecuada, más cerca.</h2>
          <p>Tus opciones permanecen al volver al formulario o recargar.</p>
          <span>
            Las categorías oficiales, producción de newsletters y contratación siguen pendientes.
          </span>
        </aside>
      </div>
    </>
  )
}
