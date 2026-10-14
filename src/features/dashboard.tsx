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
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { ActivityRow, Avatar, SectionHeading, Stat } from '@/components/shared'
import { useStore } from '@/lib/store'
const chart = [
  { month: 'Abr', value: 95 },
  { month: 'May', value: 102 },
  { month: 'Jun', value: 99 },
  { month: 'Jul', value: 110 },
  { month: 'Ago', value: 106 },
  { month: 'Sep', value: 116 },
]
export default function Dashboard() {
  const { person, registered, activities, business, team } = useStore()
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
          Miércoles, 14 de octubre de 2026
        </span>
      </div>
      <div className="stats-grid">
        <Stat
          label="Tu agenda"
          value={String(registered.length).padStart(2, '0')}
          note="Actividades en las que estás inscrita"
          icon={<CalendarDays size={18} />}
        />
        <Stat
          label="Nuestra comunidad"
          value="08"
          note="Empresas de ejemplo para explorar"
          icon={<Building2 size={18} />}
        />
        <Stat
          label="Conocimiento compartido"
          value="04"
          note="Informes disponibles en la demo"
          icon={<FileText size={18} />}
        />
        <Stat
          label="Tu equipo"
          value={String(team.length).padStart(2, '0')}
          note={`${business.name} · Empresa asociada`}
          icon={<UsersRound size={18} />}
        />
      </div>
      <div className="dashboard-main-grid">
        <section className="feature-event">
          <div className="feature-event-top">
            <span>
              <span className="live-dot" />
              Próximo encuentro
            </span>
            <span>22.10.2026</span>
          </div>
          <div className="feature-event-content">
            <span className="feature-category">Encuentros con distribución</span>
            <h2>
              El futuro se
              <br />
              construye juntos.
            </h2>
            <p>Conecta, comparte y descubre nuevas oportunidades para tu empresa.</p>
            <div className="feature-event-meta">
              <span>
                <CalendarDays size={15} />
                22 octubre · 09:30 h
              </span>
              <span>Barcelona · Presencial</span>
            </div>
            <Button asChild className="feature-cta">
              <Link to="/detalles-evento?id=encuentro">
                Descubrir el encuentro
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
              <Avatar initials="ER" size="small" />
              <Avatar initials="PT" size="small" />
              <Avatar initials="MV" size="small" />
            </div>
            <span>42 profesionales ya se han sumado</span>
            <ArrowUpRight size={17} />
          </div>
        </section>
        <section className="market-panel">
          <div className="market-heading">
            <span className="panel-icon">
              <TrendingUp size={18} />
            </span>
            <span>La perspectiva del sector</span>
            <Link to="/detalles-informe?id=ventas" aria-label="Ver informe de ventas">
              <ArrowUpRight size={19} />
            </Link>
          </div>
          <h2>
            Una mirada a lo
            <br />
            que viene.
          </h2>
          <p>Evolución de ventas · 3.er trimestre</p>
          <div className="market-value">
            +8,4<span>%</span>
            <small>Variación ilustrativa</small>
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height={132}>
              <AreaChart data={chart} margin={{ top: 10, right: 4, left: -30, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e7e7e7" strokeDasharray="3 4" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 14, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide domain={[80, 125]} />
                <Tooltip
                  contentStyle={{ border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
                  formatter={(v) => [v, 'Índice (demo)']}
                />
                <Area
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="value"
                  stroke="var(--brand-green)"
                  strokeWidth={2}
                  fill="var(--brand-lime)"
                  fillOpacity={0.16}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <Link className="market-link" to="/detalles-informe?id=ventas">
            Explorar el informe
            <ArrowRight size={16} />
          </Link>
          <span className="chart-disclaimer">Datos de ejemplo, sin valor estadístico.</span>
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
              .filter((a) => a.state === 'Abierta')
              .slice(1, 3)
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
                  ? 'Tu próxima cita está confirmada'
                  : 'Tu próxima cita empieza aquí'}
              </strong>
              <p>Consulta tus inscripciones y los detalles de cada actividad.</p>
            </div>
            <ChevronRight size={18} />
          </Link>
        </section>
        <section>
          <SectionHeading title="Tu comunidad, más cerca" href="/socios" label="Explorar" />
          <div className="community-list">
            {[
              ['FH', 'Forma Hábitat', 'Decoración · Valencia'],
              ['TG', 'Terra Garden', 'Jardinería · Madrid'],
              ['FP', 'Fix Pro', 'Fijación · Bilbao'],
            ].map(([initials, name, desc], i) => (
              <Link
                to={`/detalles-socio?id=${['forma', 'terra', 'fix'][i]}`}
                className="community-row"
                key={name}
              >
                <span className="company-logo">{initials}</span>
                <div>
                  <strong>{name}</strong>
                  <p>{desc}</p>
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
