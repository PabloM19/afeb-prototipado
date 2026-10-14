import { activities as sourceActivities } from '@/data/fixtures'
import type { Role } from '@/data/fixtures'
import {
  currentSourcePerson,
  currentSourceCompany,
  mockDb,
  mockStoragePrefix,
} from '@/data/mock-db'
import { canRegisterInMock } from '@/lib/mock-rules'
import type {
  DemoState,
  LocalMember,
  MemberInput,
  LocalInvitation,
  LocalRegistration,
  LocalRequest,
  RequestInput,
  RequestStatus,
  TenderPreferences,
} from './mock-types'
export type {
  DemoState,
  Person,
  Business,
  RequestStatus,
  LocalRequest,
  LocalMember,
  LocalInvitation,
  RequestInput,
  TenderPreferences,
} from './mock-types'
export const requestStatuses: RequestStatus[] = ['Pendiente', 'En curso', 'Resuelta']
export const demoRoles: Role[] = ['Socio', 'SocioAdmin', 'Gestor AFEB']
const now = () => new Date().toISOString()
const id = (kind: string) => `local-${kind}-${crypto.randomUUID()}`
const clean = (value: string | undefined | null) => value?.trim() || null
const normalizeEmail = (value: string) => value.trim().toLowerCase()
const emailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const freeze = <T>(value: T): T => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value)
    Object.values(value).forEach(freeze)
  }
  return value
}
const ownerId = mockDb.account.companyId
const actorId = mockDb.account.personId
export function createInitialDemoState(): DemoState {
  return structuredClone({
    schemaVersion: 2,
    role: 'SocioAdmin',
    person: {
      name: currentSourcePerson.name,
      position: currentSourcePerson.position ?? '',
      email: currentSourcePerson.email ?? '',
      phone: currentSourcePerson.phone ?? '',
      phone2: '',
      linkedin: currentSourcePerson.linkedin ?? '',
      department: currentSourcePerson.department ?? '',
      level: currentSourcePerson.level ?? '',
    },
    business: {
      name: currentSourceCompany.name,
      tax: currentSourceCompany.taxId ?? '',
      address: currentSourceCompany.address ?? '',
      city: currentSourceCompany.location ?? '',
      country: currentSourceCompany.country ?? '',
      email: currentSourceCompany.email ?? '',
      phone: currentSourceCompany.phone ?? '',
      employees: currentSourceCompany.employees ?? '',
      revenue: currentSourceCompany.revenue ?? '',
      market: currentSourceCompany.market ?? '',
      export: currentSourceCompany.export ?? '',
      category: currentSourceCompany.category ?? '',
      website: currentSourceCompany.website ?? '',
    },
    preferences: mockDb.account.communicationPreferences,
    registered: mockDb.account.initialRegisteredActivityIds,
    activities: sourceActivities,
    requests: [],
    brands: currentSourceCompany.brands
      .map((b) => b.name)
      .filter((name): name is string => name !== null),
    members: [],
    invitations: [],
    registrations: [],
    tenderPreferences: {
      daily: null,
      personalized: null,
      categoryIds: [],
      interests: '',
      comments: '',
      updatedAt: null,
    },
    scenarioId: null,
  })
}

function newRequest(
  input: RequestInput,
  subject: string,
  activityId: string | null = null,
): LocalRequest {
  const at = now()
  return {
    ...input,
    id: id('request'),
    subject,
    status: 'Pendiente',
    createdAt: at,
    actorId,
    companyId: ownerId,
    activityId,
    origin: 'local-simulation',
    assigneeId: null,
    comments: [],
    history: [
      {
        id: id('history'),
        at,
        actorId,
        action: 'Creada localmente',
        comment: null,
        status: 'Pendiente',
      },
    ],
  }
}
function migration(
  saved: Partial<DemoState> & { team?: string[]; requests?: unknown[] },
): DemoState {
  const base = createInitialDemoState()
  const next = {
    ...base,
    ...saved,
    person: { ...base.person, ...saved.person },
    schemaVersion: 2,
  } as DemoState
  next.members = Array.isArray(saved.members) ? saved.members : []
  next.invitations = Array.isArray(saved.invitations) ? saved.invitations : []
  next.registrations = Array.isArray(saved.registrations)
    ? saved.registrations
    : (saved.registered ?? []).map((activityId) => ({
        id: `local-migrated-registration-${activityId}`,
        activityId,
        personId: actorId,
        companyId: ownerId,
        invitationId: null,
        status: 'Confirmada',
        createdAt: null,
        cancelledAt: null,
        origin: 'local-simulation',
      }))
  if (saved.team)
    next.members = [
      ...next.members,
      ...saved.team
        .filter((name) => name !== next.person.name)
        .map((name, i): LocalMember => ({
          id: `local-migrated-member-${i}`,
          name,
          companyId: ownerId,
          companyLabel: next.business.name,
          ownerCompanyId: ownerId,
          email: null,
          position: null,
          department: null,
          level: null,
          phone: null,
          phone2: null,
          linkedin: null,
          simulationRole: null,
          sourceRole: null,
          kind: 'company-member',
          origin: 'local-simulation',
          createdAt: null,
        })),
    ]
  next.requests = (saved.requests ?? []).map((record, i) => {
    if (typeof record === 'object' && record && 'kind' in record) return record as LocalRequest
    const old =
      typeof record === 'string'
        ? { subject: record }
        : (record as {
            id?: string
            subject?: string
            status?: RequestStatus
            createdAt?: string
            activityId?: string
          })
    return {
      ...newRequest(
        { kind: 'legacy', payload: { text: old.subject ?? '' } },
        old.subject ?? '',
        old.activityId ?? null,
      ),
      id: old.id ?? `local-migrated-request-${i}`,
      status: old.status ?? 'Pendiente',
      createdAt: old.createdAt ?? null,
      history: [
        {
          id: `local-migrated-history-${i}`,
          at: old.createdAt ?? null,
          actorId,
          action: 'Registro anterior conservado sin inferir campos',
          comment: null,
          status: old.status ?? 'Pendiente',
        },
      ],
    }
  })
  next.tenderPreferences = { ...base.tenderPreferences, ...saved.tenderPreferences }
  delete (next as DemoState & { team?: string[] }).team
  next.registered = next.registrations
    .filter((r) => r.personId === actorId && r.status === 'Confirmada')
    .map((r) => r.activityId)
  return next
}
export function createMockBackend(storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>) {
  const key = `${mockStoragePrefix}backend:v2`,
    previousKey = `${mockStoragePrefix}backend:v1`
  const listeners = new Set<() => void>()
  const read = (key: string) => {
    try {
      return JSON.parse(storage.getItem(key) ?? 'null')
    } catch {
      return null
    }
  }
  const load = (): DemoState => {
    const saved = read(key) ?? read(previousKey)
    if (saved && Array.isArray(saved.activities) && Array.isArray(saved.requests))
      return migration(saved)
    const legacy: Record<string, unknown> = {}
    for (const field of [
      'role',
      'person',
      'business',
      'preferences',
      'registered',
      'activities',
      'requests',
      'brands',
      'team',
    ]) {
      const value = read(`${mockStoragePrefix}${field}`)
      if (value !== null) legacy[field] = value
    }
    return migration(legacy)
  }
  let state = freeze(load())
  const notify = () => listeners.forEach((fn) => fn())
  const write = (next: DemoState) => {
    const snapshot = {
      ...next,
      registered: next.registrations
        .filter((r) => r.personId === actorId && r.status === 'Confirmada')
        .map((r) => r.activityId),
    }
    storage.setItem(key, JSON.stringify(snapshot))
    state = freeze(snapshot)
    notify()
  }
  // Refresh before each command, so sequential commands in different tabs use the last saved snapshot.
  const refresh = () => {
    state = freeze(load())
  }
  const requireManager = () => {
    if (state.role !== 'Gestor AFEB')
      throw new Error('Selecciona Gestor AFEB para gestionar solicitudes')
  }
  const requireCompanyEditor = () => {
    if (state.role === 'Socio')
      throw new Error('Selecciona SocioAdmin o Gestor AFEB para gestionar el equipo')
  }
  const personExists = (personId: string) =>
    personId === actorId ||
    state.members.some((m) => m.id === personId && m.ownerCompanyId === ownerId)
  const updateCount = (snapshot: DemoState, activityId: string, delta: number) =>
    snapshot.activities.map((a) =>
      a.id === activityId
        ? {
            ...a,
            attendees: a.attendees === null ? null : Math.max(0, a.attendees + delta),
            isLocalOverride: true,
          }
        : a,
    )
  const applyRegistration = (
    snapshot: DemoState,
    activityId: string,
    personId = actorId,
    companyId: string | null = ownerId,
    invitationId: string | null = null,
  ): DemoState => {
    const activity = snapshot.activities.find((a) => a.id === activityId)
    if (
      snapshot.registrations.some(
        (r) => r.activityId === activityId && r.personId === personId && r.status === 'Confirmada',
      )
    )
      return snapshot
    if (!activity || !canRegisterInMock(activity))
      throw new Error('La actividad no admite inscripciones: revisa estado, plazo, datos y cupo')
    const registration: LocalRegistration = {
      id: id('registration'),
      activityId,
      personId,
      companyId,
      invitationId,
      status: 'Confirmada',
      createdAt: now(),
      cancelledAt: null,
      origin: 'local-simulation',
    }
    return {
      ...snapshot,
      registrations: [...snapshot.registrations, registration],
      activities: updateCount(snapshot, activityId, 1),
    }
  }
  const findByEmail = (email: string) =>
    normalizeEmail(state.person.email) === normalizeEmail(email)
      ? {
          id: actorId,
          companyId: ownerId,
          companyLabel: state.business.name,
          name: state.person.name,
          position: clean(state.person.position),
          email: state.person.email,
        }
      : state.members.find((m) => m.email && normalizeEmail(m.email) === normalizeEmail(email))
  const makeMember = (
    input: MemberInput,
    kind: LocalMember['kind'],
    companyId: string | null,
    companyLabel: string,
  ): LocalMember => {
    if (!input.name.trim() || !emailValid(input.email))
      throw new Error('Indica nombre y un email válido')
    if (input.role && !demoRoles.includes(input.role))
      throw new Error('Rol de simulación no válido')
    if (input.linkedin) {
      try {
        const url = new URL(input.linkedin)
        if (!['http:', 'https:'].includes(url.protocol)) throw Error()
      } catch {
        throw new Error('El enlace debe ser una URL http o https')
      }
    }
    return {
      id: id('person'),
      companyId,
      companyLabel,
      ownerCompanyId: ownerId,
      name: input.name.trim(),
      email: input.email.trim(),
      position: clean(input.position),
      department: clean(input.department),
      level: clean(input.level),
      phone: clean(input.phone),
      phone2: clean(input.phone2),
      linkedin: clean(input.linkedin),
      simulationRole: input.role || null,
      sourceRole: null,
      kind,
      origin: 'local-simulation',
      createdAt: now(),
    }
  }
  const requestUpdate = (
    snapshot: DemoState,
    invitationId: string,
    status: RequestStatus,
    action: string,
  ): LocalRequest[] =>
    snapshot.requests.map((r) =>
      r.kind === 'activity-invitation' && r.payload.invitationId === invitationId
        ? {
            ...r,
            status,
            history: [
              ...r.history,
              { id: id('history'), at: now(), actorId, action, comment: null, status },
            ],
          }
        : r,
    )
  return {
    storageKey: key,
    getSnapshot: () => state,
    subscribe: (fn: () => void) => {
      listeners.add(fn)
      return () => {
        listeners.delete(fn)
      }
    },
    syncFromStorage: () => {
      refresh()
      notify()
    },
    patch: <K extends keyof DemoState>(field: K, value: DemoState[K]) => {
      refresh()
      if (
        [
          'members',
          'invitations',
          'registrations',
          'requests',
          'registered',
          'schemaVersion',
          'tenderPreferences',
        ].includes(field)
      )
        throw new Error('Utiliza un comando de dominio para modificar estos registros')
      write({ ...state, [field]: value })
    },
    reset: () => {
      write(createInitialDemoState())
      storage.removeItem(previousKey)
      for (const f of [
        'role',
        'person',
        'business',
        'preferences',
        'registered',
        'activities',
        'requests',
        'brands',
        'team',
      ])
        storage.removeItem(`${mockStoragePrefix}${f}`)
    },
    register: (activityId: string) => {
      refresh()
      const next = applyRegistration(state, activityId)
      if (next !== state) write(next)
    },
    cancel: (activityId: string) => {
      refresh()
      const registrations = state.registrations.filter(
        (r) => r.activityId === activityId && r.personId === actorId && r.status === 'Confirmada',
      )
      if (!registrations.length) return
      write({
        ...state,
        registrations: state.registrations.map((r) =>
          registrations.some((x) => x.id === r.id)
            ? { ...r, status: 'Cancelada', cancelledAt: now() }
            : r,
        ),
        activities: updateCount(state, activityId, -registrations.length),
      })
    },
    addMember: (input: MemberInput) => {
      refresh()
      requireCompanyEditor()
      if (findByEmail(input.email))
        throw new Error('Ya existe una persona con este email en la demo')
      const member = makeMember(input, 'company-member', ownerId, state.business.name)
      write({
        ...state,
        members: [...state.members, member],
        requests: [
          ...state.requests,
          newRequest(
            { kind: 'member-added', payload: { personId: member.id, companyId: ownerId } },
            `Alta local de ${member.name}`,
          ),
        ],
      })
      return member.id
    },
    createInvitation: (input: {
      activityId: string
      personId?: string
      name: string
      email: string
      position?: string
      company: string
      companyId?: string | null
    }) => {
      refresh()
      const activity = state.activities.find((a) => a.id === input.activityId)
      if (!activity || !canRegisterInMock(activity))
        throw new Error('La actividad no admite invitaciones')
      if (!emailValid(input.email) || !input.name.trim() || !input.company.trim())
        throw new Error('Completa nombre, email y empresa')
      if (
        input.companyId === ownerId &&
        input.company.trim().toLocaleLowerCase() !== state.business.name.trim().toLocaleLowerCase()
      )
        throw new Error(
          'La empresa introducida no coincide con tu empresa; desmarca la pertenencia si es externa',
        )
      const selected = input.personId
        ? input.personId === actorId
          ? {
              id: actorId,
              companyId: ownerId,
              companyLabel: state.business.name,
              name: state.person.name,
              position: clean(state.person.position),
              email: state.person.email,
            }
          : state.members.find((m) => m.id === input.personId && m.ownerCompanyId === ownerId)
        : findByEmail(input.email)
      if (input.personId && !selected) throw new Error('Persona no encontrada en esta demo')
      if (selected?.email && normalizeEmail(selected.email) !== normalizeEmail(input.email))
        throw new Error('El email no corresponde a la persona seleccionada')
      const companyId = selected?.companyId ?? (input.companyId === ownerId ? ownerId : null)
      if (selected && input.companyId !== undefined && selected.companyId !== input.companyId)
        throw new Error('La empresa no corresponde a la persona seleccionada')
      const member =
        selected ??
        makeMember(
          input,
          companyId === ownerId ? 'company-member' : 'guest',
          companyId,
          input.company,
        )
      if (
        state.registrations.some(
          (r) =>
            r.personId === member.id &&
            r.activityId === input.activityId &&
            r.status === 'Confirmada',
        ) ||
        state.invitations.some(
          (i) =>
            i.personId === member.id &&
            i.activityId === input.activityId &&
            i.status === 'Pendiente',
        )
      )
        throw new Error('Esta persona ya está inscrita o tiene una invitación pendiente')
      const invitation: LocalInvitation = {
        id: id('invitation'),
        activityId: input.activityId,
        personId: member.id,
        companyId: member.companyId,
        ownerCompanyId: ownerId,
        invitedById: actorId,
        invitee: {
          name: input.name.trim(),
          email: input.email.trim(),
          position: clean(input.position),
          companyLabel: input.company.trim(),
        },
        status: 'Pendiente',
        createdAt: now(),
        respondedAt: null,
        registrationId: null,
        cost: {
          status: 'Por confirmar',
          referenceAmount: member.companyId === ownerId ? activity.price : activity.nonMemberPrice,
          rule: 'pending-afeb',
          charged: false,
        },
        origin: 'local-simulation',
      }
      write({
        ...state,
        members: selected ? state.members : [...state.members, member as LocalMember],
        invitations: [...state.invitations, invitation],
        requests: [
          ...state.requests,
          newRequest(
            {
              kind: 'activity-invitation',
              payload: {
                invitationId: invitation.id,
                activityId: input.activityId,
                personId: member.id,
              },
            },
            `Invitación a ${input.name.trim()} · ${activity.title}`,
            input.activityId,
          ),
        ],
      })
      return invitation.id
    },
    respondInvitation: (invitationId: string, response: 'Aceptada' | 'Rechazada' | 'Revocada') => {
      refresh()
      const invitation = state.invitations.find(
        (i) => i.id === invitationId && i.ownerCompanyId === ownerId,
      )
      if (!invitation) throw new Error('Invitación no encontrada')
      if (invitation.status === response) return
      if (invitation.status !== 'Pendiente') throw new Error('Esta invitación ya ha finalizado')
      if (!personExists(invitation.personId)) throw new Error('Persona no encontrada')
      let next = state
      if (response === 'Aceptada')
        next = applyRegistration(
          state,
          invitation.activityId,
          invitation.personId,
          invitation.companyId,
          invitation.id,
        )
      const registrationId =
        next.registrations.find(
          (r) => r.invitationId === invitation.id && r.status === 'Confirmada',
        )?.id ?? null
      write({
        ...next,
        invitations: next.invitations.map((i) =>
          i.id === invitationId
            ? { ...i, status: response, respondedAt: now(), registrationId }
            : i,
        ),
        requests: requestUpdate(next, invitationId, 'Resuelta', `Aceptación simulada: ${response}`),
      })
    },
    createRequest: (input: RequestInput) => {
      refresh()
      let subject: string,
        activityId: string | null = null
      switch (input.kind) {
        case 'advice':
          if (
            !input.payload.details.trim() ||
            !mockDb.services.some((s) => s.id === input.payload.serviceId)
          )
            throw new Error('Consulta o servicio no válidos')
          subject = `Asesoría: ${input.payload.details.trim()}`
          break
        case 'collaboration': {
          const p = input.payload
          const ids = new Set(p.companyIds)
          if (
            !p.description.trim() ||
            ids.size !== p.companyIds.length ||
            ids.size < 1 ||
            ids.size > mockDb.auditedForms.collaboration.maxCompanies ||
            !mockDb.auditedForms.collaboration.types.includes(p.collaborationType) ||
            p.companyIds.some((id) => !mockDb.companies.some((c) => c.id === id && c.isMember))
          )
            throw new Error('Revisa empresas, tipo y descripción de la colaboración')
          subject = `Cobranding: ${p.collaborationType}`
          break
        }
        case 'tenders':
          throw new Error('Utiliza guardar preferencias de licitaciones')
        case 'activity-invitation':
        case 'member-added':
          throw new Error('Utiliza el comando de invitación o miembro')
        case 'legacy':
          if (!input.payload.text.trim()) throw new Error('Solicitud vacía')
          subject = input.payload.text
          break
      }
      const request = newRequest(input, subject, activityId)
      write({ ...state, requests: [...state.requests, request] })
      return request.id
    },
    saveTenderPreferences: (prefs: TenderPreferences) => {
      refresh()
      if (typeof prefs.daily !== 'boolean' || typeof prefs.personalized !== 'boolean')
        throw new Error('Elige ambas preferencias')
      if (prefs.categoryIds.length)
        throw new Error('Las categorías de licitaciones siguen sin verificarse; usa intereses')
      if (prefs.personalized && !prefs.interests.trim())
        throw new Error('Indica los intereses de la modalidad personalizada')
      const preferences = {
        ...prefs,
        interests: prefs.interests.trim(),
        comments: prefs.comments.trim(),
        updatedAt: now(),
      }
      const request = newRequest(
        {
          kind: 'tenders',
          payload: {
            daily: prefs.daily,
            personalized: prefs.personalized,
            categoryIds: [],
            interests: preferences.interests,
            comments: preferences.comments,
            referenceMonthlyPrice: mockDb.auditedForms.tenders.personalizedMonthlyPrice,
          },
        },
        'Preferencias de licitaciones',
      )
      write({ ...state, tenderPreferences: preferences, requests: [...state.requests, request] })
      return request.id
    },
    updateRequest: (requestId: string, status: RequestStatus) => {
      refresh()
      requireManager()
      if (!requestStatuses.includes(status)) throw new Error('Estado no válido')
      const request = state.requests.find((r) => r.id === requestId && r.companyId === ownerId)
      if (!request) throw new Error('Solicitud no encontrada')
      if (request.status === status) return
      write({
        ...state,
        requests: state.requests.map((r) =>
          r.id === requestId
            ? {
                ...r,
                status,
                history: [
                  ...r.history,
                  {
                    id: id('history'),
                    at: now(),
                    actorId,
                    action: 'Estado actualizado',
                    comment: null,
                    status,
                  },
                ],
              }
            : r,
        ),
      })
    },
    followRequest: (requestId: string, input: { assigneeId: string | null; comment: string }) => {
      refresh()
      requireManager()
      if (
        input.assigneeId &&
        !mockDb.people.some(
          (p) => p.id === input.assigneeId && ['afeb-team', 'review-account'].includes(p.kind),
        )
      )
        throw new Error('Responsable no encontrado')
      const request = state.requests.find((r) => r.id === requestId && r.companyId === ownerId)
      if (!request) throw new Error('Solicitud no encontrada')
      const at = now(),
        comment = clean(input.comment)
      if (!comment && input.assigneeId === request.assigneeId) return
      write({
        ...state,
        requests: state.requests.map((r) =>
          r.id === requestId
            ? {
                ...r,
                assigneeId: input.assigneeId,
                comments: comment
                  ? [...r.comments, { id: id('comment'), actorId, at, body: comment }]
                  : r.comments,
                history: [
                  ...r.history,
                  {
                    id: id('history'),
                    at,
                    actorId,
                    action:
                      input.assigneeId !== r.assigneeId
                        ? 'Responsable actualizado'
                        : 'Comentario añadido',
                    comment,
                    status: r.status,
                  },
                ],
              }
            : r,
        ),
      })
    },
    loadScenario: (scenarioId: string) => {
      const scenario = mockDb.scenarios.find((s) => s.id === scenarioId)
      if (!scenario) throw new Error('Escenario no encontrado')
      let next: DemoState = { ...createInitialDemoState(), scenarioId }
      if (scenarioId === 'register-cancel' && scenario.activityId)
        next = applyRegistration(next, scenario.activityId)
      if (scenarioId === 'draft-publication') next.role = 'Gestor AFEB'
      write(next)
    },
  }
}
