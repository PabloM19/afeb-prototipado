import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { providers, companies, companyCategories } from '@/data/fixtures'
import { useStore } from '@/lib/store'
export function Providers() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('Proveedores')
  const filtered = providers.filter(
    (p) =>
      p.type === tab && `${p.title} ${p.category}`.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <>
      <PageHeading
        eyebrow="Ventajas de formar parte"
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
        <span className="small-label">Catálogo de demostración</span>
      </div>
      <div className="filter-bar">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar proveedor o especialidad…"
        />
      </div>
      <div className="providers-list">
        {filtered.map((p) => (
          <details className="provider" key={p.title}>
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
              <div className="benefit">
                <Check size={17} />
                <span>{p.benefit}</span>
              </div>
              <a
                className="text-link"
                href={`mailto:servicios@afeb.example?subject=${encodeURIComponent(p.title)}`}
              >
                Pedir más información
                <ArrowUpRight size={16} />
              </a>
              <p className="form-hint">
                Ficha y contacto de ejemplo; condiciones pendientes de validación.
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
        eyebrow="Compartir para avanzar"
        title="Grupos de trabajo"
        description="Un espacio para trabajar juntos en los retos del sector."
      />
      <div className="filter-bar">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar grupo de trabajo…" />
      </div>
      <EmptyState
        title="Aún no hay grupos en tu espacio"
        description="Explora las actividades vinculadas a grupos de trabajo mientras preparamos este espacio."
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
        La auditoría encontró una lista vacía. Está pendiente decidir si los grupos serán espacios
        permanentes con miembros y documentos.
      </DemoNotice>
    </>
  )
}
export function Cobranding() {
  const { addRequest } = useStore()
  const [selected, setSelected] = useState<string[]>([])
  const [values, setValues] = useState<Record<string, string>>({})
  const [search, setSearch] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <>
      <BackLink to="/eventos" label="Actividades y servicios" />
      <PageHeading
        eyebrow="Mejor, juntos"
        title="Conecta una nueva idea."
        description="Propón una colaboración con otras empresas de la comunidad AFEB."
      />
      <div className="service-form-grid">
        <form
          className="form-page"
          onSubmit={(e) => {
            e.preventDefault()
            if (!selected.length) return toast.error('Selecciona al menos una empresa')
            addRequest(
              `Cobranding: ${values.type} · ${selected.join(', ')} · ${values.description}`,
            )
            setSent(true)
            toast.success('Propuesta guardada en la demo')
          }}
        >
          {sent ? (
            <EmptyState
              title="Tu idea ya tiene un punto de partida"
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
                <span className="small-label">{selected.length} / 5 empresas</span>
              </div>
              <SearchInput value={search} onChange={setSearch} placeholder="Buscar empresa…" />
              <div className="company-picker">
                {companies
                  .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
                  .map((c) => (
                    <label key={c.id}>
                      <Checkbox
                        checked={selected.includes(c.name)}
                        disabled={selected.length === 5 && !selected.includes(c.name)}
                        onCheckedChange={(v) =>
                          setSelected(
                            v ? [...selected, c.name] : selected.filter((x) => x !== c.name),
                          )
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
                    options: [
                      'Comercial',
                      'Exportación',
                      'Marketing',
                      'Punto de venta',
                      'Desarrollo de producto',
                      'Otras',
                    ],
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
          <p>
            Elige hasta cinco empresas y comparte una propuesta concreta. AFEB podrá revisar tu
            solicitud y acompañar los siguientes pasos.
          </p>
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
  const { addRequest } = useStore()
  const [daily, setDaily] = useState(true)
  const [personal, setPersonal] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [values, setValues] = useState<Record<string, string>>({})
  return (
    <>
      <BackLink to="/eventos" label="Actividades y servicios" />
      <PageHeading
        eyebrow="Nuevas oportunidades para tu empresa"
        title="Licitaciones"
        description="Cuéntanos qué oportunidades te interesan y personaliza tus preferencias."
      />
      <div className="service-form-grid">
        <form
          className="form-page"
          onSubmit={(e) => {
            e.preventDefault()
            if (personal && !categories.length) return toast.error('Elige al menos una categoría')
            addRequest(
              `Licitaciones: diaria ${daily ? 'sí' : 'no'} · personalizada ${personal ? 'sí' : 'no'} · ${categories.join(', ')} · ${values.comments || ''}`,
            )
            toast.success('Preferencias registradas en la demo', {
              description: 'No se genera una suscripción ni un cobro.',
            })
          }}
        >
          <h2>La información que te interesa</h2>
          <label className="preference-row">
            <div>
              <strong>Newsletter general diaria</strong>
              <span>Un resumen de oportunidades de licitación.</span>
            </div>
            <Checkbox checked={daily} onCheckedChange={(v) => setDaily(v === true)} />
          </label>
          <label className="preference-row">
            <div>
              <strong>Modalidad personalizada</strong>
              <span>Información según tus categorías · 90 €/mes de referencia.</span>
            </div>
            <Checkbox checked={personal} onCheckedChange={(v) => setPersonal(v === true)} />
          </label>
          {personal && (
            <>
              <h3 className="subsection-title">Selecciona tus categorías</h3>
              <div className="category-checks">
                {companyCategories.slice(1).map((c) => (
                  <label key={c}>
                    <Checkbox
                      checked={categories.includes(c)}
                      onCheckedChange={(v) =>
                        setCategories(v ? [...categories, c] : categories.filter((x) => x !== c))
                      }
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </>
          )}
          <FormFields
            fields={[
              { name: 'comments', label: 'Comentarios adicionales', type: 'textarea', wide: true },
            ]}
            values={values}
            setValues={setValues}
          />
          <DemoNotice>
            Tarifa observada en la auditoría, pendiente de confirmar. Guardar aquí no contrata el
            servicio.
          </DemoNotice>
          <div className="form-actions">
            <Button type="submit">
              Guardar preferencias
              <Check size={16} />
            </Button>
          </div>
        </form>
        <aside className="service-aside">
          <Mail size={28} />
          <h2>
            La oportunidad
            <br />
            adecuada, más cerca.
          </h2>
          <p>Recibe información relevante para las especialidades de tu empresa.</p>
          <span>
            La búsqueda automatizada de licitaciones y la producción de newsletters no están
            incluidas en esta base.
          </span>
        </aside>
      </div>
    </>
  )
}
