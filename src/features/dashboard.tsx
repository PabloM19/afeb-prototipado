import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  UsersRound,
  FileText,
  TrendingUp,
  Building2,
  ChevronRight,
  Plus,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ActivityRow, Avatar, SectionHeading, Stat, EmptyState } from '@/components/shared'
import { useStore } from '@/lib/store'
import { companies, reports, allReports, participations, formatDate } from '@/data/fixtures'
import { referenceIds, simulationDate, displayValue } from '@/data/mock-db'

export default function Dashboard() {
  const { person, registered, activities, business, team, role } = useStore()
  const featured =
    activities.find(
      (a) =>
        a.id === referenceIds.featuredActivityId &&
        (a.state !== 'Borrador' || role === 'Gestor AFEB'),
    ) ?? activities.find((a) => a.state === 'Abierta')
  const sales = allReports.find((r) => r.id === referenceIds.featuredReportId)!
  const sample = participations.filter((p) => p.activityId === featured?.id)
  return (
    <>
      <div className="welcome">
        <div>
          <p className="eyebrow">Tu punto de encuentro con el sector</p>
          <h1>
            Hola, {person.name.split(' ')[0]}
            <span className="greeting-dot">.</span>
          </h1>
          <p>Todo lo que necesitas para seguir avanzando, en un mismo lugar.</p>
        </div>
        <span className="today">
          <CalendarDays size={16} />
          {formatDate(simulationDate, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      <div className="stats-grid">
        <Stat
          label="Tu agenda"
          value={String(registered.length).padStart(2, '0')}
          note="Inscripciones de esta simulación"
          icon={<CalendarDays size={18} />}
        />
        <Stat
          label="Nuestra comunidad"
          value={String(companies.length).padStart(2, '0')}
          note="Empresas recogidas en la muestra"
          icon={<Building2 size={18} />}
        />
        <Stat
          label="Conocimiento compartido"
          value={String(reports.length).padStart(2, '0')}
          note="Informes del catálogo recogido"
          icon={<FileText size={18} />}
        />
        <Stat
          label="Tu equipo"
          value={String(team.length).padStart(2, '0')}
          note={`${business.name} · Datos del mock`}
          icon={<UsersRound size={18} />}
        />
      </div>
      <div className="dashboard-main-grid">
        {featured ? (
          <section className="feature-event">
            <div className="feature-event-top">
              <span>
                <span className="live-dot" />
                Actividad del catálogo
              </span>
              <span>
                {formatDate(featured.date, { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </span>
            </div>
            <div className="feature-event-content">
              <span className="feature-category">{displayValue(featured.category)}</span>
              <h2>{featured.title}</h2>
              <p className="source-excerpt">{displayValue(featured.description)}</p>
              <div className="feature-event-meta">
                <span>
                  <CalendarDays size={15} />
                  {formatDate(featured.date, {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span>
                  {displayValue(featured.place)} · {displayValue(featured.mode)}
                </span>
              </div>
              <Button asChild className="feature-cta">
                <Link to={`/detalles-evento?id=${featured.id}`}>
                  Ver actividad
                  <ArrowUpRight size={17} />
                </Link>
              </Button>
            </div>
            <div className="event-graphic" aria-hidden="true">
              <div className="graphic-square square-one" />
              <div className="graphic-square square-two" />
              <div className="graphic-square square-three" />
              <div className="graphic-caption">Perspectivas que conectan.</div>
            </div>
            <div className="feature-event-footer">
              <div className="avatar-stack">
                {sample.slice(0, 3).map((p) => (
                  <Avatar key={p.id} initials={p.initials} size="small" />
                ))}
              </div>
              <span>
                {featured.attendees === null
                  ? 'Asistentes no recogidos en esta muestra'
                  : `${featured.attendees} inscripciones recogidas en el mock`}
              </span>
              <ArrowUpRight size={17} />
            </div>
          </section>
        ) : (
          <EmptyState title="Sin actividad destacada" />
        )}
        <section className="market-panel">
          <div className="market-heading">
            <span className="panel-icon">
              <TrendingUp size={18} />
            </span>
            <span>La perspectiva del sector</span>
            <Link to={`/detalles-informe?id=${sales.id}`} aria-label="Ver informe de ventas">
              <ArrowUpRight size={19} />
            </Link>
          </div>
          <h2>{sales.title}</h2>
          <p>{sales.accessLabel}</p>
          <div className="market-value">
            {sales.files.length}
            <small>Archivos observados en su ficha</small>
          </div>
          <ul className="source-file-list">
            {sales.files.slice(0, 3).map((file) => (
              <li key={file.id}>
                <FileText size={16} />
                <span>{file.filename}</span>
              </li>
            ))}
          </ul>
          <Link className="market-link" to={`/detalles-informe?id=${sales.id}`}>
            Explorar el archivo
            <ArrowRight size={16} />
          </Link>
          <span className="chart-disclaimer">
            No se ha recogido una serie estadística para el gráfico.
          </span>
        </section>
      </div>
      <div className="dashboard-bottom-grid">
        <section>
          <SectionHeading
            title="Reserva un espacio en tu agenda"
            href="/eventos"
            label="Todas las actividades"
          />
          <div className="agenda-list">
            {activities
              .filter((a) => a.state === 'Abierta' && a.id !== featured?.id)
              .slice(0, 2)
              .map((activity) => (
                <ActivityRow activity={activity} key={activity.id} compact />
              ))}
          </div>
          <Link className="agenda-callout" to="/perfil">
            <span className="agenda-callout-icon">
              <Check size={17} />
            </span>
            <div>
              <strong>
                {registered.length
                  ? 'Tu inscripción local está confirmada'
                  : 'Tu próxima cita empieza aquí'}
              </strong>
              <p>Consulta las inscripciones que prepares en esta simulación.</p>
            </div>
            <ChevronRight size={18} />
          </Link>
        </section>
        <section>
          <SectionHeading title="Tu comunidad, más cerca" href="/socios" label="Explorar" />
          <div className="community-list">
            {companies.slice(0, 3).map((company) => (
              <Link
                to={`/detalles-socio?id=${company.id}`}
                className="community-row"
                key={company.id}
              >
                <span className="company-logo">{company.initials}</span>
                <div>
                  <strong>{company.name}</strong>
                  <p>
                    {[company.category, company.location].filter(Boolean).join(' · ') ||
                      'Datos de ficha no recogidos'}
                  </p>
                </div>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        </section>
      </div>
      <section className="quick-links">
        <Link to="/detalles-de-mi-empresa">
          <Building2 size={20} />
          <div>
            <strong>Tu empresa, al día</strong>
            <span>Revisa tu información y equipo</span>
          </div>
          <ArrowUpRight size={18} />
        </Link>
        <Link to="/otras-acciones-cobranding">
          <Plus size={20} />
          <div>
            <strong>Juntos, llegamos más lejos</strong>
            <span>Explora una colaboración entre socios</span>
          </div>
          <ArrowUpRight size={18} />
        </Link>
        <Link to="/normativa">
          <FileText size={20} />
          <div>
            <strong>Resuelve tus dudas</strong>
            <span>Normativa y asesoría para tu negocio</span>
          </div>
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  )
}
