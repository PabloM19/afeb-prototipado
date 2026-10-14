import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  Database,
  Play,
  RotateCcw,
  Check,
  CalendarDays,
  Building2,
  FileText,
  Handshake,
  Files,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { PageHeading, SearchInput, FilterSelect, EmptyState } from '@/components/shared'
import { allCompanies, allReports, documents, providers, formatDate } from '@/data/fixtures'
import { mockDb, displayValue } from '@/data/mock-db'
import { createInitialDemoState, demoRoles } from '@/lib/mock-backend'
import { getDemoContacts } from '@/lib/mock-selectors'
import { RequestList } from '@/components/request-list'
import { useStore } from '@/lib/store'

const scenarioCopy: Record<string, { description: string; action: string }> = {
  baseline: {
    description:
      'La muestra original, sin inscripciones ni cambios locales. Ideal para empezar una presentación.',
    action: 'Abrir inicio',
  },
  'register-cancel': {
    description:
      'HOUSER con tu inscripción local preparada. Enseña el perfil, los participantes y la cancelación.',
    action: 'Ver inscripción',
  },
  'closed-registration': {
    description:
      'BdB conserva sus tarifas y el estado de grupo completo. Enseña cómo se bloquea la inscripción.',
    action: 'Ver actividad',
  },
  'draft-publication': {
    description:
      'Abre la vista Gestor con Implementa DIY en borrador. Publica y comprueba el cambio en el catálogo.',
    action: 'Abrir gestión',
  },
  'personalized-report': {
    description:
      'El Mapa de la Distribución sin archivo asignado. Enseña el estado pendiente de entrega.',
    action: 'Ver informe',
  },
  'metadata-inconsistency': {
    description:
      'ECOEMBES con la fecha de fin tal como aparece en la fuente y la advertencia visible.',
    action: 'Ver detalle',
  },
}
export default function DemoCenter() {
  const store = useStore()
  const navigate = useNavigate()
  const [resetOpen, setResetOpen] = useState(false)
  const [baseline] = useState(createInitialDemoState)
  const [search, setSearch] = useState('')
  const [area, setArea] = useState('Actividades')
  const active = mockDb.scenarios.find((s) => s.id === store.scenarioId)
  const modified = store.activities.filter((a) => a.isLocalOverride).length
  const collections = [
    { label: 'Actividades', count: store.activities.length, icon: CalendarDays },
    { label: 'Empresas', count: allCompanies.length, icon: Building2 },
    { label: 'Informes y normativa', count: allReports.length, icon: FileText },
    { label: 'Documentos', count: documents.length, icon: Files },
    { label: 'Colaboradores', count: providers.length, icon: Handshake },
    { label: 'Personas', count: getDemoContacts(store).length, icon: Database },
    { label: 'Invitaciones', count: store.invitations.length, icon: CalendarDays },
  ]
  const records =
    {
      Actividades: store.activities.map((a) => ({
        id: a.id,
        title: a.title,
        category: displayValue(a.category),
        status: a.state,
        changed: a.isLocalOverride,
        path: `/detalles-evento?id=${a.id}`,
        source: mockDb.activities.find((x) => x.id === a.id)?.source.sourceIds ?? [],
      })),
      Empresas: allCompanies.map((c) => ({
        id: c.id,
        title: c.id === mockDb.account.companyId ? store.business.name : c.name,
        category: displayValue(
          c.id === mockDb.account.companyId ? store.business.category : c.category,
        ),
        status: c.membership || 'Condición no verificada',
        changed:
          c.id === mockDb.account.companyId &&
          JSON.stringify(store.business) !== JSON.stringify(baseline.business),
        path:
          c.id === mockDb.account.companyId
            ? '/detalles-de-mi-empresa'
            : `/detalles-socio?id=${c.id}`,
        source: mockDb.companies.find((x) => x.id === c.id)!.source.sourceIds,
      })),
      'Informes y normativa': allReports.map((r) => ({
        id: r.id,
        title: r.title,
        category: r.sourceCategory,
        status: `${r.files.length} archivos recogidos`,
        changed: false,
        path: `/detalles-informe?id=${r.id}`,
        source: mockDb.reports.find((x) => x.id === r.id)!.source.sourceIds,
      })),
      Documentos: documents.map((d) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        status: d.format,
        changed: false,
        path: `/documentos?buscar=${encodeURIComponent(d.title)}`,
        source: mockDb.documents.find((x) => x.id === d.id)!.source.sourceIds,
      })),
      Colaboradores: providers.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        status: p.type,
        changed: false,
        path: `/colaboradores?buscar=${encodeURIComponent(p.title)}&tipo=${p.type}`,
        source: mockDb.providers.find((x) => x.id === p.id)!.source.sourceIds,
      })),
      Personas: getDemoContacts(store).map((p) => ({
        id: p.id,
        title: p.name,
        category: p.company,
        status: p.position || 'Cargo no verificado',
        changed: p.origin === 'local-simulation',
        path: `/detalles-equipo?id=${p.id}`,
        source: [],
      })),
      Invitaciones: store.invitations.map((i) => ({
        id: i.id,
        title: i.invitee.name,
        category: store.activities.find((a) => a.id === i.activityId)?.title ?? '',
        status: i.status,
        changed: true,
        path: `/invitaciones/${i.id}`,
        source: [],
      })),
    }[area] ?? []
  const filtered = records.filter((r) =>
    `${r.title} ${r.category}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  )
  const scenarioPath = (id: string) => {
    const scenario = mockDb.scenarios.find((s) => s.id === id)!
    return id === 'draft-publication'
      ? '/gestion'
      : scenario.activityId
        ? `/detalles-evento?id=${scenario.activityId}`
        : scenario.reportId
          ? `/detalles-informe?id=${scenario.reportId}`
          : '/'
  }
  return (
    <>
      <PageHeading
        eyebrow="Tu mesa de presentación"
        title="Centro de demos"
        description="Prepara un recorrido, prueba los flujos y vuelve a empezar cuando quieras."
        action={
          <Button variant="outline" onClick={() => setResetOpen(true)}>
            <RotateCcw size={16} />
            Restablecer base
          </Button>
        }
      />
      <div className="demo-control-hero">
        <div>
          <span className="eyebrow">
            <Database size={15} />
            Base compartida
          </span>
          <h2>
            Datos conectados.
            <br />
            Una demo que responde.
          </h2>
          <p>
            Los catálogos, las fichas, el buscador y tu perfil utilizan la misma base. Las acciones
            se guardan en este navegador y se sincronizan entre sus pestañas.
          </p>
          <span className="demo-source-date">
            Muestra observada el {formatDate(mockDb.meta.observedAt)} · Datos desconocidos sin
            rellenar
          </span>
        </div>
        <div className="demo-live-state">
          <span className="small-label">Sesión de presentación</span>
          <strong>{active?.label ?? 'Recorrido libre'}</strong>
          <dl>
            <div>
              <dt>Inscripciones locales</dt>
              <dd>{store.registrations.filter((r) => r.status === 'Confirmada').length}</dd>
            </div>
            <div>
              <dt>Actividades modificadas</dt>
              <dd>{modified}</dd>
            </div>
            <div>
              <dt>Solicitudes locales</dt>
              <dd>{store.requests.length}</dd>
            </div>
          </dl>
          <FilterSelect
            value={store.role}
            onChange={(r) => store.setRole(r as typeof store.role)}
            options={demoRoles}
            label="Vista de la demo"
          />
        </div>
      </div>
      <Tabs defaultValue="scenarios" className="demo-tabs">
        <TabsList>
          <TabsTrigger value="scenarios">Recorridos</TabsTrigger>
          <TabsTrigger value="data">Datos del mock</TabsTrigger>
          <TabsTrigger value="requests">Solicitudes ({store.requests.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="scenarios">
          <p className="demo-section-note">
            Cada recorrido recupera el punto de partida y sustituye los cambios locales de la
            sesión. Los registros observados se conservan.
          </p>
          <div className="demo-scenarios">
            {mockDb.scenarios.map((scenario, index) => (
              <article
                className={`demo-scenario ${store.scenarioId === scenario.id ? 'selected' : ''}`}
                key={scenario.id}
              >
                <div className="demo-scenario-top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {store.scenarioId === scenario.id && (
                    <span>
                      <Check size={14} />
                      Preparado
                    </span>
                  )}
                </div>
                <h2>{scenario.label}</h2>
                <p>{scenarioCopy[scenario.id].description}</p>
                <div className="demo-scenario-actions">
                  <Button
                    onClick={() => {
                      store.loadScenario(scenario.id)
                      toast.success('Recorrido preparado')
                      navigate(scenarioPath(scenario.id))
                    }}
                  >
                    <Play size={15} />
                    {scenarioCopy[scenario.id].action}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="data">
          <div className="demo-collection-counts">
            {collections.map(({ label, count, icon: Icon }) => (
              <button
                key={label}
                aria-pressed={area === label}
                className={area === label ? 'selected' : ''}
                onClick={() => {
                  setArea(label)
                  setSearch('')
                }}
              >
                <Icon size={18} />
                <strong>{count}</strong>
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="filter-bar">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Buscar en los datos del mock…"
            />
            <span className="small-label">
              {filtered.length} registros · {area}
            </span>
          </div>
          <div className="demo-record-list">
            {filtered.map((r) => (
              <article key={r.id}>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.category}</p>
                  <span className="form-hint">
                    {r.changed ? 'Tiene cambios locales' : 'Base observada'} · {r.status}
                  </span>
                </div>
                <Button variant="outline" asChild>
                  <Link to={r.path}>
                    Ver en el front
                    <ArrowUpRight size={15} />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <EmptyState />}
          <p className="demo-section-note">
            Empresas incluye 8 socios verificados, AFEB y la cuenta de pruebas. Personas e
            invitaciones incluyen tus entradas de simulación; los contactos y participantes
            originales son muestras. Los 39 archivos son metadatos; sus originales no están
            importados.
          </p>
        </TabsContent>
        <TabsContent value="requests">
          <div className="content-panel">
            <h2>Del formulario a la gestión</h2>
            <p className="muted">
              Envía una asesoría, invitación o colaboración en el front. Aparecerá aquí y en Gestión
              interna, con el mismo estado.
            </p>
            <RequestList />
          </div>
        </TabsContent>
      </Tabs>
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preparar una nueva demo</DialogTitle>
            <DialogDescription>
              Se quitarán las modificaciones, inscripciones y solicitudes locales y se recuperará la
              base observada. Afecta a las pestañas de este navegador.
            </DialogDescription>
          </DialogHeader>
          <div className="form-actions">
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                store.reset()
                setResetOpen(false)
                toast.success('Base restablecida')
              }}
            >
              Restablecer base
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
