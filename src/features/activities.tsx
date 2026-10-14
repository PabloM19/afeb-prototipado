import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Clock3,
  UsersRound,
  Download,
  Check,
  Plus,
  Monitor,
  ArrowRight,
  Ticket,
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  PageHeading,
  SearchInput,
  FilterSelect,
  ActivityRow,
  EmptyState,
  BackLink,
  Status,
  Avatar,
  FormFields,
  DemoNotice,
  downloadDemo,
} from '@/components/shared'
import { activityCategories, formatDate, contacts } from '@/data/fixtures'
import { useStore } from '@/lib/store'
export function Activities() {
  const { activities, role } = useStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [tab, setTab] = useState('proximas')
  const filtered = activities.filter(
    (a) =>
      (role === 'Gestor AFEB' || a.state !== 'Borrador') &&
      (tab === 'proximas'
        ? a.state === 'Abierta'
        : tab === 'historico'
          ? ['Finalizada', 'Cerrada'].includes(a.state)
          : a.state === 'Borrador') &&
      (category === 'Todas' || a.category === category) &&
      a.title.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <>
      <PageHeading
        eyebrow="Conecta. Aprende. Comparte."
        title="Actividades"
        description="Encuentros que abren conversaciones y oportunidades para el sector."
        action={
          role === 'Gestor AFEB' ? (
            <Button asChild>
              <Link to="/gestion">
                <Plus size={16} />
                Crear actividad
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/perfil">
                <CalendarDays size={16} />
                Mis inscripciones
              </Link>
            </Button>
          )
        }
      />
      <div className="activity-banner">
        <div>
          <span className="eyebrow">Nos vemos en Barcelona</span>
          <h2>
            Las mejores ideas empiezan
            <br />
            con una conversación.
          </h2>
          <p>Encuentro con la distribución · 22 de octubre</p>
          <Link className="text-link" to="/detalles-evento?id=encuentro">
            Conocer la jornada
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="banner-date" aria-hidden="true">
          22<span>Octubre / 2026</span>
        </div>
      </div>
      <div className="catalog-top">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="proximas">Próximas actividades</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            {role === 'Gestor AFEB' && <TabsTrigger value="borradores">Borradores</TabsTrigger>}
          </TabsList>
        </Tabs>
        <span className="muted text-sm">{filtered.length} actividades</span>
      </div>
      <div className="filter-bar">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar una actividad…" />
        <FilterSelect value={category} onChange={setCategory} options={activityCategories} />
      </div>
      <div className="activity-catalog">
        {filtered.map((a) => (
          <ActivityRow key={a.id} activity={a} />
        ))}
      </div>
      {filtered.length === 0 && <EmptyState />}
      <section className="inline-service">
        <div>
          <Ticket size={24} />
          <div>
            <h3>Hay más formas de participar</h3>
            <p>Colabora con otras empresas o recibe oportunidades de licitación.</p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link to="/otras-acciones-cobranding">
            Cobranding
            <ArrowUpRight size={16} />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/otras-acciones-licitaciones">
            Licitaciones
            <ArrowUpRight size={16} />
          </Link>
        </Button>
      </section>
    </>
  )
}
export function EventDetail() {
  const [params] = useSearchParams()
  const store = useStore()
  const activity = store.activities.find((a) => a.id === params.get('id')) || store.activities[0]
  const [confirm, setConfirm] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [peopleSearch, setPeopleSearch] = useState('')
  const isRegistered = store.registered.includes(activity.id)
  const isOpen =
    activity.state === 'Abierta' &&
    activity.deadline >= '2026-10-14' &&
    activity.attendees < activity.capacity
  const people = contacts.filter((c) => c.name.toLowerCase().includes(peopleSearch.toLowerCase()))
  if (activity.state === 'Borrador' && store.role !== 'Gestor AFEB')
    return (
      <EmptyState
        title="Actividad no disponible"
        description="Esta actividad todavía no se ha publicado."
        action={
          <Button asChild>
            <Link to="/eventos">Ver actividades</Link>
          </Button>
        }
      />
    )
  function calendar() {
    const toUTC = (date: string) =>
      new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const content = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//AFEB//Prototipo//ES\r\nBEGIN:VEVENT\r\nUID:${activity.id}@afeb-demo.example\r\nDTSTAMP:20261014T080000Z\r\nDTSTART:${toUTC(activity.date)}\r\nDTEND:${toUTC(activity.end)}\r\nSUMMARY:${activity.title}\r\nLOCATION:${activity.place}\r\nDESCRIPTION:Actividad ficticia del prototipo AFEB.\r\nEND:VEVENT\r\nEND:VCALENDAR`
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'actividad-afeb-demo.ics'
    link.click()
    URL.revokeObjectURL(url)
  }
  return (
    <>
      <BackLink to="/eventos" label="Todas las actividades" />
      <div className="detail-heading">
        <div className="detail-badges">
          <span className="small-label">{activity.category}</span>
          <Status>{activity.state}</Status>
        </div>
        <h1>{activity.title}</h1>
        <p>{activity.description}</p>
      </div>
      <div className="detail-grid">
        <div>
          <div className="event-details-strip">
            <div>
              <CalendarDays size={20} />
              <span>
                Fecha<strong>{formatDate(activity.date, { day: 'numeric', month: 'long' })}</strong>
              </span>
            </div>
            <div>
              <Clock3 size={20} />
              <span>
                Horario
                <strong>
                  {formatDate(activity.date, { hour: '2-digit', minute: '2-digit' })} –{' '}
                  {formatDate(activity.end, { hour: '2-digit', minute: '2-digit' })}
                </strong>
              </span>
            </div>
            <div>
              {activity.mode === 'Webinar' ? <Monitor size={20} /> : <MapPin size={20} />}
              <span>
                Formato<strong>{activity.mode}</strong>
              </span>
            </div>
          </div>
          <section className="detail-section">
            <h2>Un encuentro para avanzar</h2>
            <p>{activity.description}</p>
            <p>
              Dirigido a profesionales de empresas asociadas interesados en compartir experiencias,
              conocer nuevas perspectivas y fortalecer su red de contactos.
            </p>
            <h3>Programa de la sesión</h3>
            <div className="program">
              {[
                ['09:30', 'Bienvenida y contexto del sector'],
                ['10:00', 'Perspectivas y conversación con expertos'],
                ['11:00', 'Preguntas, intercambio y networking'],
              ].map(([time, title]) => (
                <div key={time}>
                  <span>{time}</span>
                  <strong>{title}</strong>
                </div>
              ))}
            </div>
            <p className="form-hint">
              Programa ilustrativo. La versión final se cargará desde la gestión editorial.
            </p>
          </section>
          <section className="detail-section">
            <h2>Documentación y recursos</h2>
            <button
              className="file-row"
              onClick={() => downloadDemo(`Programa — ${activity.title}`)}
            >
              <span className="file-icon">TXT</span>
              <div>
                <strong>Programa de la actividad</strong>
                <p>Ejemplo de descarga · Demostración</p>
              </div>
              <Download size={18} />
            </button>
            {activity.state === 'Finalizada' && (
              <button
                className="file-row"
                onClick={() => downloadDemo(`Materiales — ${activity.title}`)}
              >
                <span className="file-icon">TXT</span>
                <div>
                  <strong>Materiales de la sesión</strong>
                  <p>Contenido de ejemplo</p>
                </div>
                <Download size={18} />
              </button>
            )}
          </section>
          <section className="detail-section">
            <div className="section-heading">
              <h2>La comunidad que participa</h2>
              <span className="small-label">Muestra de asistentes</span>
            </div>
            <SearchInput
              value={peopleSearch}
              onChange={setPeopleSearch}
              placeholder="Buscar un asistente…"
            />
            <div className="attendees">
              {people.slice(0, 4).map((p) => (
                <Link key={p.id} to={`/detalles-equipo?id=${p.id}`}>
                  <Avatar initials={p.initials} />
                  <div>
                    <strong>{p.name}</strong>
                    <p>{p.company}</p>
                  </div>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>
            {people.length === 0 && <EmptyState />}
          </section>
        </div>
        <aside className="booking-panel">
          <Status>{isRegistered ? 'Inscripción confirmada' : activity.state}</Status>
          <h2>
            {isRegistered
              ? 'Nos vemos pronto.'
              : isOpen
                ? 'Reserva tu lugar.'
                : 'Actividad sin inscripción.'}
          </h2>
          <p>{activity.place}</p>
          <div className="booking-price">
            {activity.price === 0 ? 'Sin coste' : `${activity.price} €`}
            <span>Tarifa para socios</span>
          </div>
          {activity.price > 0 && (
            <div className="pricing-lines">
              <span>
                Segundo asistente <strong>50 €</strong>
              </span>
              <span>
                No socio <strong>120 €</strong>
              </span>
            </div>
          )}
          <div className="booking-facts">
            <span>
              <UsersRound size={16} />
              {activity.attendees} de {activity.capacity} plazas
            </span>
            <span>
              <CalendarDays size={16} />
              Hasta el {formatDate(activity.deadline, { day: 'numeric', month: 'long' })}
            </span>
          </div>
          {isRegistered ? (
            <>
              <Button variant="outline" onClick={calendar}>
                <CalendarDays size={16} />
                Añadir al calendario
              </Button>
              <Button variant="ghost" className="cancel-button" onClick={() => setCancel(true)}>
                Cancelar inscripción
              </Button>
            </>
          ) : isOpen ? (
            <Button onClick={() => setConfirm(true)}>
              Inscribirme a la actividad
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button disabled>
              {activity.state === 'Finalizada'
                ? 'Actividad finalizada'
                : activity.state === 'Borrador'
                  ? 'Pendiente de publicación'
                  : 'Inscripciones cerradas'}
            </Button>
          )}
          {isOpen && (
            <Button variant="outline" asChild>
              <Link to={`/inscribir?id=${activity.id}`}>
                <Plus size={16} />
                Invitar a otra persona
              </Link>
            </Button>
          )}
          <p className="booking-hint">
            Las cancelaciones se solicitarán según la política de cada actividad. Tarifas
            ilustrativas.
          </p>
          <DemoNotice />
        </aside>
      </div>
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirma tu inscripción</DialogTitle>
            <DialogDescription>
              {activity.title} · {formatDate(activity.date)}
            </DialogDescription>
          </DialogHeader>
          <div className="summary-box">
            <strong>{store.person.name}</strong>
            <span>{store.business.name}</span>
            <span>Tarifa: {activity.price === 0 ? 'Sin coste' : `${activity.price} €`}</span>
          </div>
          <label className="checkbox-label">
            <Checkbox checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} />
            <span>
              He leído las condiciones y la política de cancelación de la actividad de ejemplo.
            </span>
          </label>
          <DemoNotice>
            La inscripción se guardará solo en este navegador. No genera un cobro.
          </DemoNotice>
          <Button
            disabled={!accepted}
            onClick={() => {
              store.register(activity.id)
              setConfirm(false)
              toast.success('Inscripción de demostración confirmada')
            }}
          >
            <Check size={16} />
            Confirmar inscripción
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={cancel} onOpenChange={setCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Cancelar esta inscripción?</DialogTitle>
            <DialogDescription>
              Se eliminará de tu agenda de demostración. Puedes volver a inscribirte si el evento
              sigue abierto.
            </DialogDescription>
          </DialogHeader>
          <div className="form-actions">
            <Button variant="outline" onClick={() => setCancel(false)}>
              Mantener inscripción
            </Button>
            <Button
              onClick={() => {
                store.cancel(activity.id)
                setCancel(false)
                toast.success('Inscripción local cancelada')
              }}
            >
              Cancelar inscripción
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export function Invite() {
  const [params] = useSearchParams()
  const store = useStore()
  const activity = store.activities.find((x) => x.id === params.get('id')) || store.activities[0]
  const [values, setValues] = useState<Record<string, string>>({ company: store.business.name })
  const [accept, setAccept] = useState(false)
  const [sent, setSent] = useState(false)
  return (
    <>
      <BackLink to={`/detalles-evento?id=${activity.id}`} label="Volver a la actividad" />
      <PageHeading
        title="Las buenas conversaciones se comparten."
        description={`Invita a un profesional a «${activity.title}».`}
      />
      <div className="form-page">
        {sent ? (
          <EmptyState
            title="Invitación preparada"
            description="Se ha registrado la solicitud en la demo. No se ha enviado ningún correo."
            action={
              <Button
                onClick={() => {
                  setSent(false)
                  setValues({ company: store.business.name })
                }}
              >
                Invitar a otra persona
              </Button>
            }
          />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (activity.state !== 'Abierta')
                return toast.error('La actividad no admite invitaciones')
              store.addRequest(`Invitación: ${values.email} · ${activity.title}`)
              setSent(true)
            }}
          >
            <h2>Datos de la persona invitada</h2>
            <FormFields
              fields={[
                { name: 'email', label: 'Email', type: 'email', required: true, wide: true },
                { name: 'name', label: 'Nombre y apellidos', required: true },
                { name: 'position', label: 'Cargo', required: true },
                { name: 'company', label: 'Empresa', required: true, wide: true },
              ]}
              values={values}
              setValues={setValues}
            />
            <label className="checkbox-label">
              <Checkbox checked={accept} onCheckedChange={(x) => setAccept(x === true)} />
              <span>
                Confirmo la invitación y asumo, si corresponde, el coste de la inscripción (
                {activity.price} € de ejemplo).
              </span>
            </label>
            <DemoNotice />
            <div className="form-actions">
              <Button variant="outline" asChild>
                <Link to={`/detalles-evento?id=${activity.id}`}>Cancelar</Link>
              </Button>
              <Button disabled={!accept || activity.state !== 'Abierta'} type="submit">
                Preparar invitación
                <ArrowUpRight size={16} />
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
