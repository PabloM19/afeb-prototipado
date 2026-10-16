import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Check, X, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  BackLink,
  DemoNotice,
  EmptyState,
  FilterSelect,
  FormFields,
  PageHeading,
  Status,
} from '@/components/shared'
import { useStore } from '@/lib/store'
import { getDemoContacts, requestKindLabels } from '@/lib/mock-selectors'
import { localAction } from '@/lib/local-action'
import { requestStatuses } from '@/lib/mock-backend'
import type { RequestStatus } from '@/lib/mock-types'
import { allCompanies, formatDate } from '@/data/fixtures'
import { displayValue, mockDb } from '@/data/mock-db'

export function InvitationDetail() {
  const { id } = useParams(),
    store = useStore(),
    [busy, setBusy] = useState(false)
  const invitation = store.invitations.find(
    (i) => i.id === id && i.ownerCompanyId === mockDb.account.companyId,
  )
  if (!invitation) return <EmptyState title="Invitación no encontrada" />
  const activity = store.activities.find((a) => a.id === invitation.activityId)
  if (!activity || (activity.state === 'Borrador' && store.role !== 'Gestor AFEB'))
    return <EmptyState title="Actividad no disponible para esta vista" />
  const request = store.requests.find(
    (r) => r.kind === 'activity-invitation' && r.payload.invitationId === id,
  )
  const respond = (status: 'Aceptada' | 'Rechazada' | 'Revocada') => {
    setBusy(true)
    const result = localAction(() => store.respondInvitation(invitation.id, status))
    setBusy(false)
    if (result.ok) toast.success(`Invitación ${status.toLowerCase()} en la simulación`)
  }
  return (
    <>
      <BackLink to={`/detalles-evento?id=${activity.id}`} label="Volver a la actividad" />
      <PageHeading
        eyebrow="Invitación de simulación"
        title={invitation.invitee.name}
        description={activity.title}
      />
      <div className="workflow-panel">
        <div className="workflow-state">
          <Status>{invitation.status}</Status>
          <span>Creada: {formatDate(invitation.createdAt)}</span>
        </div>
        <dl className="data-grid">
          {[
            ['Email', invitation.invitee.email],
            ['Cargo', invitation.invitee.position],
            ['Empresa', invitation.invitee.companyLabel],
            ['Coste aplicable', invitation.cost.status],
            [
              'Tarifa de referencia observada',
              invitation.cost.referenceAmount === null
                ? null
                : `${invitation.cost.referenceAmount} €`,
            ],
            [
              'Fecha de respuesta',
              invitation.respondedAt ? formatDate(invitation.respondedAt) : null,
            ],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{displayValue(v)}</dd>
            </div>
          ))}
        </dl>
        <div className="quick-links">
          <Link to={`/detalles-equipo?id=${invitation.personId}`}>
            Ver persona
            <ArrowUpRight size={16} />
          </Link>
          <Link to={`/detalles-evento?id=${activity.id}`}>
            Ver actividad
            <ArrowUpRight size={16} />
          </Link>
          {invitation.companyId && (
            <Link
              to={
                invitation.companyId === mockDb.account.companyId
                  ? '/detalles-de-mi-empresa'
                  : `/detalles-socio?id=${invitation.companyId}`
              }
            >
              Ver empresa
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
        <DemoNotice>
          La aceptación la simula el presentador; no es una respuesta recibida del invitado. Los
          invitados externos y el cálculo de costes están pendientes de AFEB. No se envía correo ni
          se crea un cobro.
        </DemoNotice>
        {invitation.status === 'Pendiente' && (
          <div className="form-actions workflow-actions">
            <Button disabled={busy} onClick={() => respond('Aceptada')}>
              <Check size={16} />
              Simular aceptación
            </Button>
            <Button disabled={busy} variant="outline" onClick={() => respond('Rechazada')}>
              <X size={16} />
              Simular rechazo
            </Button>
            <Button disabled={busy} variant="ghost" onClick={() => respond('Revocada')}>
              Revocar invitación local
            </Button>
          </div>
        )}
        {invitation.status === 'Aceptada' && (
          <div className="summary-box">
            <strong>Inscripción local confirmada</strong>
            <p>
              La misma persona aparece en participantes, su ficha y la participación de su empresa
              cuando existe una relación verificada en la demo.
            </p>
          </div>
        )}
        {request && (
          <Button variant="outline" asChild>
            <Link to={`/solicitudes/${request.id}`}>
              Ver solicitud y seguimiento
              <ArrowUpRight size={16} />
            </Link>
          </Button>
        )}
      </div>
    </>
  )
}
export function RequestDetail() {
  const { id } = useParams(),
    store = useStore(),
    [form, setForm] = useState<Record<string, string>>({}),
    [selected, setSelected] = useState<string | undefined>()
  const request = store.requests.find(
    (r) => r.id === id && r.companyId === mockDb.account.companyId,
  )
  if (!request) return <EmptyState title="Solicitud no encontrada" />
  const people = getDemoContacts(store),
    assignees = mockDb.people.filter((p) => ['afeb-team', 'review-account'].includes(p.kind))
  const labels: string[][] = []
  const links: { title: string; path: string }[] = []
  switch (request.kind) {
    case 'advice':
      labels.push(
        ['Detalles', request.payload.details],
        [
          'Servicio',
          mockDb.services.find((s) => s.id === request.payload.serviceId)?.title ??
            request.payload.serviceId,
        ],
      )
      break
    case 'collaboration':
      labels.push(
        ['Tipo', request.payload.collaborationType],
        ['Descripción', request.payload.description],
      )
      request.payload.companyIds.forEach((companyId) =>
        links.push({
          title: allCompanies.find((c) => c.id === companyId)?.name ?? companyId,
          path: `/detalles-socio?id=${companyId}`,
        }),
      )
      break
    case 'tenders':
      labels.push(
        ['General diaria', request.payload.daily ? 'Sí' : 'No'],
        ['Personalizada', request.payload.personalized ? 'Sí' : 'No'],
        ['Intereses', displayValue(request.payload.interests)],
        ['Comentarios', displayValue(request.payload.comments)],
        ['Categorías verificadas', request.payload.categoryIds.join(', ') || 'No verificadas'],
        ['Tarifa mensual de referencia', displayValue(request.payload.referenceMonthlyPrice)],
      )
      break
    case 'activity-invitation': {
      const invitation = store.invitations.find((i) => i.id === request.payload.invitationId)
      labels.push(
        [
          'Persona',
          people.find((p) => p.id === request.payload.personId)?.name ?? request.payload.personId,
        ],
        ['Email', invitation?.invitee.email ?? 'No verificado'],
        ['Empresa indicada', invitation?.invitee.companyLabel ?? 'No verificado'],
        ['Estado de invitación', invitation?.status ?? 'No verificado'],
      )
      links.push({
        title: 'Abrir invitación y simular respuesta',
        path: `/invitaciones/${request.payload.invitationId}`,
      })
      break
    }
    case 'member-added':
      links.push(
        {
          title:
            people.find((p) => p.id === request.payload.personId)?.name ?? request.payload.personId,
          path: `/detalles-equipo?id=${request.payload.personId}`,
        },
        { title: 'Empresa del miembro', path: '/detalles-de-mi-empresa' },
      )
      break
    case 'legacy':
      labels.push(
        ['Texto conservado', request.payload.text],
        ['Datos separados', 'No disponibles en el formato anterior; no se han inferido'],
      )
      break
  }
  const description =
    request.kind === 'advice' &&
    [request.payload.details.trim(), `Asesoría: ${request.payload.details.trim()}`].includes(
      request.subject.trim(),
    )
      ? (mockDb.services.find((service) => service.id === request.payload.serviceId)?.title ??
        'Consulta de asesoría')
      : request.subject
  return (
    <>
      <BackLink to="/demo" label="Centro de demos" />
      <PageHeading
        eyebrow={requestKindLabels[request.kind]}
        title="Detalle de solicitud"
        description={description}
      />
      <div className="detail-grid">
        <div>
          <section className="detail-section">
            <h2>Datos de la solicitud</h2>
            <dl className="data-grid">
              {labels.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className="preserve-text">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="workflow-links">
              {links.map((link) => (
                <Link className="text-link" key={link.path} to={link.path}>
                  {link.title}
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>
            {request.activityId && (
              <Link className="text-link" to={`/detalles-evento?id=${request.activityId}`}>
                Ver actividad relacionada
                <ArrowUpRight size={16} />
              </Link>
            )}
          </section>
          <section className="detail-section">
            <h2>Historial de seguimiento</h2>
            <div className="workflow-timeline">
              {request.history.map((h) => (
                <article key={h.id}>
                  <Clock size={17} />
                  <div>
                    <strong>{h.action}</strong>
                    <p>
                      {h.at
                        ? formatDate(h.at, {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Fecha original no recogida'}{' '}
                      · {people.find((p) => p.id === h.actorId)?.name ?? h.actorId} · {h.status}
                    </p>
                    {h.comment && <p className="preserve-text">{h.comment}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        <aside className="booking-panel">
          <h2>Seguimiento local</h2>
          <Status>{request.status}</Status>
          <p>
            Responsable actual:{' '}
            {request.assigneeId
              ? assignees.find((p) => p.id === request.assigneeId)?.name
              : 'Sin asignar'}
          </p>
          {store.role === 'Gestor AFEB' ? (
            <>
              <FilterSelect
                label="Estado de la solicitud"
                value={request.status}
                options={requestStatuses}
                onChange={(value) =>
                  localAction(() => store.updateRequest(request.id, value as RequestStatus))
                }
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const result = localAction(() =>
                    store.followRequest(request.id, {
                      assigneeId: (selected ?? request.assigneeId) || null,
                      comment: form.comment ?? '',
                    }),
                  )
                  if (result.ok) {
                    setForm({})
                    toast.success('Seguimiento guardado')
                  }
                }}
              >
                <label className="field">
                  <span>Asignar responsable</span>
                  <select
                    aria-label="Asignar responsable"
                    value={selected ?? request.assigneeId ?? ''}
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    <option value="">Sin asignar</option>
                    {assignees.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <FormFields
                  fields={[
                    {
                      name: 'comment',
                      label: 'Comentario de seguimiento',
                      type: 'textarea',
                      wide: true,
                    },
                  ]}
                  values={form}
                  setValues={setForm}
                />
                <Button type="submit">Guardar seguimiento</Button>
              </form>
            </>
          ) : (
            <p className="form-hint">Gestión disponible en la vista Gestor AFEB de la demo.</p>
          )}
          <DemoNotice>
            El estado de la solicitud no acepta una invitación automáticamente ni activa un
            servicio. Sus acciones específicas se realizan desde el registro relacionado.
          </DemoNotice>
        </aside>
      </div>
    </>
  )
}
