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
import {
  reports,
  allReports,
  documents,
  legalResources,
  legalService,
  resolveReportId,
  formatDate,
} from '@/data/fixtures'
import { localAction } from '@/lib/local-action'
import { useStore } from '@/lib/store'
import { displayValue, referenceIds, mockDb } from '@/data/mock-db'
export function Reports() {
  const featured = reports.find((r) => r.id === referenceIds.featuredReportId)!
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
            {featured.edition} <ArrowUpRight size={32} />
          </span>
        </div>
        <div className="report-feature-copy">
          <h2>{featured.title}</h2>
          <p>
            {featured.files.length} archivos observados. Último archivo de la lista:{' '}
            {featured.files[0]?.filename}.
          </p>
          <span className="report-metadata">
            <CalendarDays size={15} />
            {formatDate(featured.date)}
            <span>·</span>
            {featured.accessLabel}
          </span>
          <Button asChild>
            <Link to={`/detalles-informe?id=${featured.id}`}>
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
        {filtered.map((r) => (
          <Link className="report-card" key={r.id} to={`/detalles-informe?id=${r.id}`}>
            <div className="report-card-top">
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
                {displayValue(
                  !r.personal && r.price === 0
                    ? r.accessLabel.replace(/^Gratuito y /i, '')
                    : r.accessLabel,
                )}
              </span>
              <span>
                {r.personal
                  ? 'Edición por empresa'
                  : r.price === 0
                    ? 'Gratuito'
                    : r.price === null
                      ? 'Tarifa no verificada'
                      : `${r.price} €`}
              </span>
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
  const report = allReports.find((r) => r.id === resolveReportId(params.get('id')))
  const [year, setYear] = useState('Todos')
  const store = useStore()
  if (!report) return <EmptyState title="Informe no encontrado" />
  const years = [...new Set(report.files.flatMap((f) => f.years))].sort().reverse()
  const files = report.files.filter((f) => year === 'Todos' || f.years.includes(year))
  return (
    <>
      <BackLink
        to={report.category === 'Normativa' ? '/normativa' : '/informes'}
        label="Volver al catálogo"
      />
      <div className="detail-heading">
        <span className="eyebrow">{report.sourceCategory}</span>
        <h1>{report.title}</h1>
        <p>{report.description || 'Descripción no recogida en la muestra.'}</p>
      </div>
      <div className="detail-grid">
        <div>
          <section className="detail-section">
            <h2>Información del recurso</h2>
            <div className="resource-facts">
              <span>
                <LockKeyhole size={17} />
                {displayValue(report.accessLabel)}
              </span>
              <span>
                <CalendarDays size={17} />
                Fecha del catálogo: {formatDate(report.date)}
              </span>
            </div>
          </section>
          <section className="detail-section">
            <SectionHeading title="Archivos del recurso" />
            {years.length > 0 && (
              <FilterSelect
                value={year}
                onChange={setYear}
                options={['Todos', ...years]}
                label="Año del nombre de archivo"
              />
            )}
            {report.personal ? (
              <div className="summary-box">
                <strong>Informe individual por empresa</strong>
                <p>
                  La fuente indica entrega con marca de agua por empresa. No se ha observado un
                  archivo asignado a {store.business.name}.
                </p>
              </div>
            ) : (
              files.map((file) => (
                <button
                  className="file-row"
                  key={file.id}
                  onClick={() => downloadDemo(file.filename)}
                >
                  <span className="file-icon">{file.format ?? '—'}</span>
                  <div>
                    <strong>{file.filename}</strong>
                    <p>Ficha de prueba TXT</p>
                  </div>
                  <Download size={19} />
                </button>
              ))
            )}
            {!report.personal && files.length === 0 && (
              <EmptyState
                title="Sin archivos en esta muestra"
                description="La muestra no incluye el contenido de este recurso."
              />
            )}
            <DemoNotice>
              Los nombres proceden del portal. No se han importado los archivos originales; la
              descarga crea una ficha TXT de prueba. Los años se deducen únicamente del nombre del
              archivo.
            </DemoNotice>
          </section>
        </div>
        <aside className="booking-panel">
          <span className="panel-icon">
            <FileText size={20} />
          </span>
          <h2>Descarga del recurso</h2>
          <p>{report.edition}</p>
          <div className="booking-price">
            {report.price === 0
              ? 'Gratuito'
              : report.price === null
                ? 'Tarifa no verificada'
                : `${report.price} €`}
            <span>
              {displayValue(
                !report.personal && report.price === 0
                  ? report.accessLabel.replace(/^Gratuito y /i, '')
                  : report.accessLabel,
              )}
            </span>
          </div>
          <Button
            disabled={report.personal || report.files.length === 0}
            onClick={() => downloadDemo(report.files[0].filename)}
          >
            <Download size={16} />
            {report.personal ? 'Sin archivo asignado' : 'Descargar ficha TXT'}
          </Button>
          <Button variant="outline" asChild>
            <Link to="/normativa">
              Consultar normativa
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
                      {d.subcategory && d.subcategory !== 'General' && <span>{d.subcategory}</span>}
                    </div>
                  </div>
                </td>
                <td>{d.category}</td>
                <td>{displayValue(d.year)}</td>
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
      <div className="table-summary">{filtered.length} documentos recogidos</div>
      <DemoNotice>
        Las descargas crean fichas TXT de los nombres observados; no contienen los documentos
        originales. La política de acceso a los documentos institucionales debe confirmarse.
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
        title="Normativa y asesoría"
        description="Recursos, formación y orientación para afrontar los cambios con confianza."
      />
      <div className="advice-banner">
        <div className="advice-icon">
          <Scale size={34} />
        </div>
        <div>
          <span className="eyebrow">Asesoría para socios</span>
          <h2>{legalService.title}</h2>
          <p>{legalService.description}</p>
          <p>
            Contacto observado:{' '}
            {mockDb.people.find((p) => p.id === legalService.contactPersonId)?.name} ·{' '}
            {legalService.contactEmail}
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          Solicitar asesoría
          <ArrowUpRight size={17} />
        </Button>
      </div>
      <section className="detail-section">
        <SectionHeading
          title="Referencias de normativa"
          href="/documentos"
          label="Documentos institucionales"
        />
        <div className="legal-resources">
          {legalResources.map((resource) => (
            <Link
              to={`/detalles-informe?id=${resource.reportId}`}
              key={resource.id}
              id={`normativa-${resource.id}`}
              className={params.get('recurso') === resource.id ? 'search-target' : undefined}
            >
              <BookOpen size={22} />
              <div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <section className="detail-section">
        <SectionHeading title="Webinars de normativa" />
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
              const result = localAction(() =>
                store.createRequest({
                  kind: 'advice',
                  payload: { details: values.details, serviceId: legalService.id },
                }),
              )
              if (!result.ok) return
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
