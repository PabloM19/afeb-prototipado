import { contacts, participations } from '@/data/fixtures'
import { mockDb, initialsFor } from '@/data/mock-db'
import type { DemoState } from './mock-types'
export function getDemoContacts(state: DemoState) {
  const observed = contacts.map((p) => ({
    ...p,
    phone: mockDb.people.find((x) => x.id === p.id)?.phone ?? '',
    phone2: '',
    linkedin: mockDb.people.find((x) => x.id === p.id)?.linkedin ?? '',
    level: mockDb.people.find((x) => x.id === p.id)?.level ?? '',
    simulationRole: '',
    origin: 'observed',
    ...(p.id === mockDb.account.personId
      ? { ...state.person, initials: initialsFor(state.person.name), company: state.business.name }
      : {}),
  }))
  return [
    ...observed,
    ...state.members
      .filter((m) => m.ownerCompanyId === mockDb.account.companyId)
      .map((m) => ({
        ...m,
        company: m.companyId === mockDb.account.companyId ? state.business.name : m.companyLabel,
        initials: initialsFor(m.name),
        email: m.email ?? '',
        position: m.position ?? '',
        department: m.department ?? '',
        phone: m.phone ?? '',
        phone2: m.phone2 ?? '',
        linkedin: m.linkedin ?? '',
        level: m.level ?? '',
        sourceRole: m.sourceRole ?? '',
        simulationRole: m.simulationRole ?? '',
      })),
  ]
}
export function getDemoParticipations(state: DemoState) {
  const people = getDemoContacts(state)
  return [
    ...participations.map((p) => ({
      ...p,
      companyId: null as string | null,
      status: 'Confirmada',
      origin: 'observed',
      path: `/detalles-equipo?participation=${p.id}`,
    })),
    ...state.registrations
      .filter((r) => r.status === 'Confirmada' && people.some((p) => p.id === r.personId))
      .map((r) => {
        const p = people.find((p) => p.id === r.personId)
        return {
          ...r,
          name: p?.name ?? 'Persona no encontrada',
          company:
            r.companyId === mockDb.account.companyId ? state.business.name : (p?.company ?? ''),
          initials: initialsFor(p?.name ?? ''),
          position: p?.position ?? '',
          department: p?.department ?? '',
          email: p?.email ?? '',
          path: `/detalles-equipo?id=${r.personId}`,
        }
      }),
  ]
}
export const getCompanyTeam = (state: DemoState, companyId: string) =>
  getDemoContacts(state).filter((p) => p.companyId === companyId)
export const requestKindLabels = {
  advice: 'Asesoría',
  collaboration: 'Cobranding',
  tenders: 'Licitaciones',
  'activity-invitation': 'Invitación a actividad',
  'member-added': 'Alta de miembro',
  legacy: 'Solicitud anterior',
}
