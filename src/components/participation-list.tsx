import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ActivityRow, EmptyState, Status } from '@/components/shared'
import { useStore } from '@/lib/store'
import { getDemoContacts } from '@/lib/mock-selectors'
import { mockDb } from '@/data/mock-db'
export function ParticipationList({
  personId,
  companyId,
}: {
  personId?: string
  companyId?: string
}) {
  const store = useStore(),
    people = getDemoContacts(store)
  const rows = store.registrations.filter(
    (r) =>
      people.some((p) => p.id === r.personId) &&
      (!personId || r.personId === personId) &&
      (!companyId || r.companyId === companyId),
  )
  const invites = store.invitations.filter(
    (i) =>
      (!personId || i.personId === personId) &&
      (!companyId || i.companyId === companyId) &&
      i.ownerCompanyId === mockDb.account.companyId &&
      i.status === 'Pendiente' &&
      store.activities.some(
        (a) => a.id === i.activityId && (a.state !== 'Borrador' || store.role === 'Gestor AFEB'),
      ),
  )
  return (
    <section className="detail-section">
      <h2>{companyId ? 'Participación del equipo' : 'Inscripciones y participación'}</h2>
      {rows.map((r) => {
        const activity = store.activities.find((a) => a.id === r.activityId)
        if (!activity || (activity.state === 'Borrador' && store.role !== 'Gestor AFEB'))
          return null
        return (
          <div className="participation-record" key={r.id}>
            <div className="participation-record-meta">
              <Link to={`/detalles-equipo?id=${r.personId}`}>
                {people.find((p) => p.id === r.personId)?.name ?? 'Persona no encontrada'}
              </Link>
              <Status>{r.status}</Status>
            </div>
            <ActivityRow activity={activity} />
            {r.invitationId && (
              <Link className="text-link" to={`/invitaciones/${r.invitationId}`}>
                Ver invitación
                <ArrowUpRight size={15} />
              </Link>
            )}
          </div>
        )
      })}
      {invites.map((i) => (
        <div className="invitation-row" key={i.id}>
          <div>
            <strong>{i.invitee.name}</strong>
            <p>{store.activities.find((a) => a.id === i.activityId)?.title}</p>
          </div>
          <Link className="text-link" to={`/invitaciones/${i.id}`}>
            Invitación pendiente
            <ArrowUpRight size={15} />
          </Link>
        </div>
      ))}
      {!rows.length && !invites.length && (
        <EmptyState
          title="Sin participación local"
          description="Las inscripciones y las invitaciones de esta persona o equipo aparecerán aquí."
        />
      )}
      <p className="form-hint">
        Relaciones de la simulación local. Las ocurrencias originales sin identidad de CRM
        verificada no se asignan por nombre a una persona o empresa.{' '}
        {companyId === mockDb.account.companyId
          ? 'Incluye a todos los miembros locales de tu empresa.'
          : ''}
      </p>
    </section>
  )
}
