import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import {
  Ticket,
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
import { activityCategories, formatDate, resolveActivityId } from '@/data/fixtures'
import { referenceIds, displayValue, getMockFiles, mockDb, simulationDate } from '@/data/mock-db'
import { canRegisterInMock } from '@/lib/mock-rules'
import { getDemoParticipations, getCompanyTeam } from '@/lib/mock-selectors'
import { localAction } from '@/lib/local-action'
import { useStore } from '@/lib/store'
export function Activities() {
  const { activities, role } = useStore()
  const highlighted = activities.find((a) => a.id === referenceIds.featuredActivityId)!
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [tab, setTab] = useState('proximas')
  const filtered = activities.filter(
    (a) =>
      (role === 'Gestor AFEB' || a.state !== 'Borrador') &&
      (tab === 'proximas'
        ? a.state !== 'Borrador' &&
          a.state !== 'Finalizada' &&
          (!a.date || a.date.slice(0, 10) >= simulationDate)
        : tab === 'historico'
          ? a.state === 'Finalizada' ||
            (a.state !== 'Borrador' && Boolean(a.date) && a.date.slice(0, 10) < simulationDate)
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
          <h2>{highlighted.title}</h2>
          <p>{highlighted.category}</p>
          <Link className="text-link" to={`/detalles-evento?id=${highlighted.id}`}>
            Conocer la jornada
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <time className="banner-date" dateTime={highlighted.date || undefined}>
          {new Date(highlighted.date).getDate()}
          <span>{formatDate(highlighted.date, { month: 'long', year: 'numeric' })}</span>
        </time>
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
  const activity = store.activities.find((a) => a.id === resolveActivityId(params.get('id')))
  const [confirm, setConfirm] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [peopleSearch, setPeopleSearch] = useState('')
  if (!activity)
    return (
      <EmptyState
        title="Actividad no encontrada en la base"
        action={
          <Button asChild>
            <Link to="/eventos">Ver actividades</Link>
          </Button>
        }
      />
    )
  if (activity.state === 'Borrador' && store.role !== 'Gestor AFEB')
    return (
      <EmptyState
        title="Actividad no disponible"
        description="Esta actividad todavía no se ha publicado en la simulación."
        action={
          <Button asChild>
            <Link to="/eventos">Ver actividades</Link>
          </Button>
        }
      />
    )
  const isRegistered = store.registered.includes(activity.id)
  const isOpen = canRegisterInMock(activity)
  const people = getDemoParticipations(store)
    .filter((p) => p.activityId === activity.id)
    .filter((p) => p.name.toLocaleLowerCase().includes(peopleSearch.toLocaleLowerCase()))
  const price = (amount: number | null) =>
    amount === 0 ? 'Gratuito' : amount === null ? 'No verificado' : `${amount} €`
  const files = getMockFiles(activity.fileIds)
  return (
    <>
      <BackLink to="/eventos" label="Todas las actividades" />
      <div className="detail-heading">
        <div className="detail-badges">
          <span className="small-label">{displayValue(activity.category)}</span>
          <Status>{activity.state}</Status>
        </div>
        <h1>{activity.title}</h1>
      </div>
      {activity.qualityNotes.map((note) => (
        <DemoNotice key={note}>{note}</DemoNotice>
      ))}
      {activity.isLocalOverride && (
        <DemoNotice>
          Este registro tiene cambios de simulación local. La base observada se conserva.
        </DemoNotice>
      )}
      <div className="detail-grid">
        <div>
          <div className="event-details-strip">
            <div>
              <CalendarDays size={20} />
              <span>
                Inicio
                <strong>
                  {formatDate(activity.date, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </strong>
              </span>
            </div>
            <div>
              <Clock3 size={20} />
              <span>
                Fin
                <strong>
                  {formatDate(activity.end, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </strong>
              </span>
            </div>
            <div>
              {activity.mode === 'Webinar' ? <Monitor size={20} /> : <MapPin size={20} />}
              <span>
                Modalidad<strong>{displayValue(activity.mode)}</strong>
              </span>
            </div>
          </div>
          <section className="detail-section">
            <h2>Información de la actividad</h2>
            {activity.description ? (
              activity.description.split('\n\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)
            ) : (
              <p>No se ha recogido una descripción para esta actividad.</p>
            )}
            {activity.address && (
              <p>
                <strong>Dirección:</strong> {activity.address}
              </p>
            )}
            <p className="form-hint">
              Contenido recogido del portal el {formatDate(simulationDate)}. No se añade un programa
              que no figure en la fuente.
            </p>
          </section>
          <section className="detail-section">
            <h2>Documentación y recursos</h2>
            {files.map((file) => (
              <button
                className="file-row"
                key={file.id}
                onClick={() => downloadDemo(file.filename)}
                aria-label={`Descargar ficha de prueba TXT de ${file.filename}`}
              >
                <span className="file-icon">{file.format ?? '—'}</span>
                <div>
                  <strong>{file.filename}</strong>
                  <p>Archivo observado · Contenido no importado · Ficha de prueba TXT</p>
                </div>
                <Download size={18} />
              </button>
            ))}
            {files.length === 0 && (
              <p className="muted">
                No se han recogido archivos para esta actividad en la muestra.
              </p>
            )}
          </section>
          <section className="detail-section">
            <div className="section-heading">
              <h2>La comunidad que participa</h2>
              <span className="small-label">Registros de la muestra y altas locales</span>
            </div>
            <SearchInput
              value={peopleSearch}
              onChange={setPeopleSearch}
              placeholder="Buscar un asistente…"
            />
            <div className="attendees">
              {people.map((p) => (
                <Link key={p.id} to={p.path}>
                  <Avatar personId={p.personId} initials={p.initials} />
                  <div>
                    <strong>{p.name}</strong>
                    <p>{p.company}</p>
                  </div>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>
            {people.length === 0 && (
              <EmptyState
                title="Sin participantes recogidos"
                description="No se añaden asistentes de otras actividades ni personas ficticias."
              />
            )}
            <p className="form-hint">
              La lista observada puede tener más páginas. Esta muestra no se presenta como el total
              de inscritos del portal.
            </p>
          </section>
          <section className="detail-section">
            <h2>Invitaciones locales</h2>
            {store.invitations
              .filter((i) => i.activityId === activity.id)
              .map((i) => (
                <div className="invitation-row" key={i.id}>
                  <div>
                    <strong>{i.invitee.name}</strong>
                    <p>{i.invitee.email}</p>
                  </div>
                  <Status>{i.status}</Status>
                  <Link className="text-link" to={`/invitaciones/${i.id}`}>
                    Ver invitación
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              ))}
            {!store.invitations.some((i) => i.activityId === activity.id) && (
              <p className="muted">No hay invitaciones locales para esta actividad.</p>
            )}
          </section>
        </div>
        <aside className="booking-panel">
          <Status>{isRegistered ? 'Inscripción local confirmada' : activity.state}</Status>
          <h2>
            {isRegistered
              ? 'Inscripción preparada.'
              : isOpen
                ? 'Reserva tu lugar.'
                : 'Actividad sin inscripción.'}
          </h2>
          <p>{displayValue(activity.place)}</p>
          <div className="booking-price">
            {price(activity.price)}
            <span>Tarifa socio observada</span>
          </div>
          {activity.price !== null && activity.price > 0 && (
            <div className="pricing-lines">
              <span>
                Desde el segundo asistente <strong>{price(activity.secondPrice)}</strong>
              </span>
              <span>
                No socio <strong>{price(activity.nonMemberPrice)}</strong>
              </span>
            </div>
          )}
          <div className="booking-facts">
            <span>
              <UsersRound size={16} />
              {activity.attendees === null
                ? 'Asistentes no verificados'
                : `${activity.attendees} inscripciones recogidas en el mock`}
            </span>
            <span>Cupo: {displayValue(activity.capacity)}</span>
            <span>
              <CalendarDays size={16} />
              Hasta el {formatDate(activity.deadline, { day: 'numeric', month: 'long' })}
            </span>
          </div>
          {isRegistered ? (
            <>
              <Button
                variant="outline"
                disabled
                title="Zona horaria original y archivo de calendario no importados"
              >
                <CalendarDays size={16} />
                Calendario no importado
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
                  : activity.state === 'Completa'
                    ? 'Grupo completo'
                    : activity.state === 'Abierta'
                      ? 'Datos de inscripción incompletos'
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
            Las tarifas proceden de la fuente. No se supone un cupo cuando falta el dato. Las
            acciones de este mock se guardan solo en el navegador.
          </p>
          <DemoNotice />
        </aside>
      </div>
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirma tu inscripción local</DialogTitle>
            <DialogDescription>
              {activity.title} · {formatDate(activity.date)}
            </DialogDescription>
          </DialogHeader>
          <div className="summary-box">
            <strong>{store.person.name}</strong>
            <span>{store.business.name}</span>
            <span>Tarifa observada: {price(activity.price)}</span>
          </div>
          <label className="checkbox-label">
            <Checkbox checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} />
            <span>
              Entiendo que esta inscripción es una simulación local y no se comunica a AFEB.
            </span>
          </label>
          <DemoNotice>
            Se añadirá a tu perfil y a los participantes del mock. No genera un cobro.
          </DemoNotice>
          <Button
            disabled={!accepted}
            onClick={() => {
              if (!localAction(() => store.register(activity.id)).ok) return
              setConfirm(false)
              toast.success('Inscripción local confirmada')
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
            <DialogTitle>¿Cancelar esta inscripción local?</DialogTitle>
            <DialogDescription>
              Se quitará del perfil y de los participantes del mock. El registro observado de AFEB
              se conserva.
            </DialogDescription>
          </DialogHeader>
          <div className="form-actions">
            <Button variant="outline" onClick={() => setCancel(false)}>
              Mantener inscripción
            </Button>
            <Button
              onClick={() => {
                if (!localAction(() => store.cancel(activity.id)).ok) return
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
  const [params] = useSearchParams(),
    store = useStore(),
    navigate = useNavigate()
  const activity = store.activities.find((a) => a.id === resolveActivityId(params.get('id')))
  const [selected, setSelected] = useState('new'),
    [sameCompany, setSameCompany] = useState(true)
  const [values, setValues] = useState<Record<string, string>>({ company: store.business.name }),
    [accept, setAccept] = useState(false)
  const members = getCompanyTeam(store, mockDb.account.companyId)
  if (!activity) return <EmptyState title="Actividad no encontrada" />
  const allowed = canRegisterInMock(activity)
  return (
    <>
      <BackLink to={`/detalles-evento?id=${activity.id}`} label="Volver a la actividad" />
      <PageHeading title="Invitar a una actividad" description={activity.title} />
      <div className="form-page">
        <h2>Persona invitada</h2>
        <label className="field">
          <span>Seleccionar persona del equipo</span>
          <select
            aria-label="Seleccionar persona del equipo"
            value={selected}
            onChange={(e) => {
              const id = e.target.value
              setSelected(id)
              const p = members.find((p) => p.id === id)
              setSameCompany(true)
              setValues(
                p
                  ? {
                      name: p.name,
                      email: p.email,
                      position: p.position,
                      company: store.business.name,
                    }
                  : { company: store.business.name },
              )
            }}
          >
            <option value="new">Nueva persona</option>
            {members.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.email || 'Email no verificado'}
              </option>
            ))}
          </select>
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const result = localAction(() =>
              store.createInvitation({
                activityId: activity.id,
                personId: selected === 'new' ? undefined : selected,
                name: values.name,
                email: values.email,
                position: values.position,
                company: values.company,
                companyId: sameCompany ? mockDb.account.companyId : null,
              }),
            )
            if (result.ok) {
              toast.success('Invitación local preparada')
              navigate(`/invitaciones/${result.value}`)
            }
          }}
        >
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
          {selected === 'new' && (
            <label className="checkbox-label">
              <Checkbox checked={sameCompany} onCheckedChange={(v) => setSameCompany(v === true)} />
              <span>Pertenece a mi empresa. Si es externa, indica su empresa.</span>
            </label>
          )}
          <label className="checkbox-label">
            <Checkbox checked={accept} onCheckedChange={(v) => setAccept(v === true)} />
            <span>
              Entiendo que es una invitación local, sin correo ni cobro. La regla de coste está por
              confirmar con AFEB.
            </span>
          </label>
          <DemoNotice>
            Los datos se conservarán en la invitación y en la ficha local de persona. La aceptación
            se simula explícitamente desde su detalle.
          </DemoNotice>
          <div className="form-actions">
            <Button type="submit" disabled={!accept || !allowed}>
              Preparar invitación
            </Button>
          </div>
          {!allowed && (
            <p role="status">
              Esta actividad no admite invitaciones por estado, plazo, cupo o datos incompletos.
            </p>
          )}
        </form>
      </div>
    </>
  )
}
