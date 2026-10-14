import { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import {
  ArrowUpRight,
  ArrowRight,
  Download,
  FileText,
  LockKeyhole,
  CalendarDays,
  Scale,
  BookOpen,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  PageHeading,
  SectionHeading,
  SearchInput,
  FilterSelect,
  EmptyState,
  BackLink,
  ActivityRow,
  DemoNotice,
  FormFields,
  downloadDemo,
} from '@/components/shared'
import { reports, documents, legalResources, formatDate } from '@/data/fixtures'
import { useStore } from '@/lib/store'
export function Reports() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const filtered = reports.filter(
    (r) =>
      (category === 'Todos' || r.category === category) &&
      r.title.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <>
      <PageHeading
        eyebrow="Información para decidir mejor"
        title="Informes del sector"
        description="Una perspectiva compartida para entender el presente y anticipar lo que viene."
      />
      <div className="report-feature">
        <div className="report-cover" aria-hidden="true">
          <span>AFEB / Observatorio</span>
          <div>
            La visión
            <br />
            del sector.
          </div>
          <span>
            03 / 2026 <ArrowUpRight size={32} />
          </span>
        </div>
        <div className="report-feature-copy">
          <span className="eyebrow">El último pulso del mercado</span>
          <h2>Evolución de ventas</h2>
          <p>
            Consulta las tendencias del tercer trimestre y encuentra las claves para orientar tus
            próximos pasos.
          </p>
          <span className="report-metadata">
            <CalendarDays size={15} />8 octubre 2026<span>·</span>Exclusivo socios
          </span>
          <Button asChild>
            <Link to="/detalles-informe?id=ventas">
              Consultar informe
              <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="filter-bar">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar un informe…" />
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList>
            {['Todos', 'Mercado', 'Sectoriales', 'Internacionales'].map((c) => (
              <TabsTrigger value={c} key={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="reports-grid">
        {filtered.map((r, i) => (
          <Link className="report-card" key={r.id} to={`/detalles-informe?id=${r.id}`}>
            <div className="report-card-top">
              <span className="report-number">0{i + 1}</span>
              <ArrowUpRight size={21} />
            </div>
            <span className="small-label">
              {r.category} · {r.edition}
            </span>
            <h2>{r.title}</h2>
            <p>{r.description}</p>
            <div className="report-card-footer">
              <span>
                <LockKeyhole size={14} />
                Exclusivo socios
              </span>
              <span>{r.personal ? 'Edición por empresa' : 'Sin coste para socios'}</span>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <EmptyState />}
    </>
  )
}
export function ReportDetail() {
  const [params] = useSearchParams()
  const report = reports.find((r) => r.id === params.get('id')) || reports[0]
  const [year, setYear] = useState('2026')
  const store = useStore()
  return (
    <>
      <BackLink to="/informes" label="Todos los informes" />
      <div className="detail-heading">
        <span className="eyebrow">{report.category} / Observatorio AFEB</span>
        <h1>{report.title}</h1>
        <p>{report.description}</p>
      </div>
      <div className="detail-grid">
        <div>
          <section className="detail-section">
            <h2>Una visión que aporta contexto</h2>
            <p>
              {report.description} Este espacio reúne las ediciones disponibles y su histórico para
              que puedas consultar la evolución del sector.
            </p>
            <div className="resource-facts">
              <span>
                <LockKeyhole size={17} />
                Exclusivo para socios AFEB
              </span>
              <span>
                <CalendarDays size={17} />
                Actualizado el {formatDate(report.date)}
              </span>
            </div>
          </section>
          <section className="detail-section">
            <SectionHeading title="Archivo de informes" />
            <FilterSelect
              value={year}
              onChange={setYear}
              options={['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019']}
              label="Año"
            />
            {report.personal ? (
              <div className="summary-box">
                <strong>Informe individual por empresa</strong>
                <p>
                  La entrega de «{report.title}» se asigna a cada empresa. En esta demo no hay un
                  archivo personalizado de {store.business.name}.
                </p>
                <span>La generación automática de marcas de agua queda fuera de esta base.</span>
              </div>
            ) : (
              ['3.er trimestre', '2.º trimestre', '1.er trimestre'].map((edition, i) => (
                <button
                  className="file-row"
                  key={edition}
                  onClick={() => downloadDemo(`${report.title} — ${edition} ${year}`)}
                >
                  <span className="file-icon">TXT</span>
                  <div>
                    <strong>
                      {report.title} · {edition} {year}
                    </strong>
                    <p>
                      Ejemplo de archivo histórico
                      {year === '2026' && i === 0 ? ' · Última edición' : ''}
                    </p>
                  </div>
                  <Download size={19} />
                </button>
              ))
            )}
            <DemoNotice>
              El histórico es ilustrativo. Las descargas generan un TXT de ejemplo; los PDF reales
              se servirán con autorización de backend.
            </DemoNotice>
          </section>
        </div>
        <aside className="booking-panel">
          <span className="panel-icon">
            <FileText size={20} />
          </span>
          <h2>Conocimiento que suma.</h2>
          <p>{report.edition}</p>
          <div className="booking-price">
            Incluido<span>En tu condición de socio</span>
          </div>
          <Button
            disabled={report.personal}
            onClick={() => downloadDemo(`${report.title} — ${report.edition}`)}
          >
            <Download size={16} />
            {report.personal ? 'Pendiente de asignación' : 'Descargar ejemplo'}
          </Button>
          <Button variant="outline" asChild>
            <Link to="/normativa">
              ¿Necesitas orientación?
              <ArrowUpRight size={16} />
            </Link>
          </Button>
        </aside>
      </div>
    </>
  )
}
export function Documents() {
  const [params] = useSearchParams()
  const location = useLocation()
  const [search, setSearch] = useState(() => params.get('buscar') || '')
  const [category, setCategory] = useState('Todas las categorías')
  useEffect(() => {
    setSearch(params.get('buscar') || '')
    setCategory('Todas las categorías')
  }, [params, location.key])
  const filtered = documents.filter(
    (d) =>
      (category === 'Todas las categorías' || category === d.category) &&
      d.title.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <>
      <PageHeading
        eyebrow="La información, en su sitio"
        title="Documentos"
        description="Estatutos, memorias y recursos institucionales de nuestra asociación."
      />
      <div className="filter-bar">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar un documento…" />
        <FilterSelect
          label="Categoría del documento"
          value={category}
          onChange={setCategory}
          options={['Todas las categorías', ...new Set(documents.map((d) => d.category))]}
        />
      </div>
      <div
        className="table-container documents-table"
        tabIndex={0}
        role="region"
        aria-label="Tabla de documentos. Desplázate horizontalmente para ver todas las columnas."
      >
        <table>
          <thead>
            <tr>
              <th>Documento</th>
              <th>Categoría</th>
              <th>Edición</th>
              <th>Formato previsto</th>
              <th>
                <span className="sr-only">Descarga</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.title}>
                <td>
                  <div className="table-title">
                    <FileText size={18} />
                    <div>
                      <strong>{d.title}</strong>
                      <span>{d.subcategory}</span>
                    </div>
                  </div>
                </td>
                <td>{d.category}</td>
                <td>{d.year}</td>
                <td>
                  <span className="format-badge">{d.format}</span>
                </td>
                <td>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Descargar ejemplo de ${d.title}`}
                    onClick={() => downloadDemo(d.title)}
                  >
                    <Download size={17} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <EmptyState />}
      <div className="table-summary">{filtered.length} documentos de ejemplo</div>
      <DemoNotice>
        Los archivos de esta demo son TXT ilustrativos. La política de acceso a los documentos
        institucionales debe confirmarse.
      </DemoNotice>
    </>
  )
}
export function Regulations() {
  const store = useStore()
  const [params] = useSearchParams()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})
  useEffect(() => {
    const resource = params.get('recurso')
    if (resource)
      document
        .getElementById(`normativa-${resource}`)
        ?.scrollIntoView({ block: 'center', behavior: 'instant' })
  }, [params, location.key])
  return (
    <>
      <PageHeading
        eyebrow="Claridad para tu empresa"
        title="Normativa y asesoría"
        description="Recursos, formación y orientación para afrontar los cambios con confianza."
      />
      <div className="advice-banner">
        <div className="advice-icon">
          <Scale size={34} />
        </div>
        <div>
          <span className="eyebrow">Asesoría para socios</span>
          <h2>
            Un poco de claridad.
            <br />
            Un gran paso adelante.
          </h2>
          <p>Cuéntanos tus dudas sobre contratos con la distribución y solicita orientación.</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          Solicitar asesoría
          <ArrowUpRight size={17} />
        </Button>
      </div>
      <section className="detail-section">
        <SectionHeading
          title="Para estar al día"
          description="Documentación y referencias de consulta."
          href="/documentos"
          label="Ver documentos"
        />
        <div className="legal-resources">
          {legalResources.map((resource) => (
            <button
              key={resource.id}
              id={`normativa-${resource.id}`}
              className={params.get('recurso') === resource.id ? 'search-target' : undefined}
              onClick={() => downloadDemo(resource.title)}
            >
              <BookOpen size={22} />
              <div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
              <Download size={18} />
            </button>
          ))}
        </div>
      </section>
      <section className="detail-section">
        <SectionHeading
          title="Webinars de normativa"
          description="Aprende con expertos y consulta los materiales de las sesiones."
        />
        {store.activities
          .filter((a) => a.category === 'Normativa')
          .map((a) => (
            <ActivityRow activity={a} key={a.id} />
          ))}
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿En qué podemos ayudarte?</DialogTitle>
            <DialogDescription>
              Describe tu consulta sobre contratos con la distribución. Esta solicitud se registra
              solo en la demo.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              store.addRequest(`Asesoría: ${values.details}`)
              setOpen(false)
              setValues({})
              toast.success('Solicitud de asesoría guardada localmente', {
                description: 'No se han enviado correos.',
              })
            }}
          >
            <FormFields
              fields={[
                {
                  name: 'details',
                  label: 'Detalles de tu consulta',
                  type: 'textarea',
                  required: true,
                  wide: true,
                  placeholder: 'Contexto, dudas y qué orientación necesitas…',
                },
              ]}
              values={values}
              setValues={setValues}
            />
            <DemoNotice />
            <div className="form-actions">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Registrar solicitud
                <ArrowRight size={16} />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
