import { activities as sourceActivities } from '@/data/fixtures'
import type { Activity, Role } from '@/data/fixtures'
import {
  currentSourcePerson,
  currentSourceCompany,
  mockDb,
  mockStoragePrefix,
} from '@/data/mock-db'
import { canRegisterInMock } from '@/lib/mock-rules'

export type Person = {
  name: string
  position: string
  email: string
  phone: string
  linkedin: string
  department: string
  level: string
}
export type Business = {
  name: string
  tax: string
  address: string
  city: string
  country: string
  email: string
  phone: string
  employees: string
  revenue: string
  market: string
  export: string
  category: string
  website: string
}
export type RequestStatus = 'Pendiente' | 'En curso' | 'Resuelta'
export type LocalRequest = {
  id: string
  subject: string
  status: RequestStatus
  createdAt: string | null
  actorId: string
  activityId: string | null
  origin: 'local-simulation'
}
export type DemoState = {
  role: Role
  person: Person
  business: Business
  preferences: (boolean | null)[]
  registered: string[]
  activities: Activity[]
  requests: LocalRequest[]
  brands: string[]
  team: string[]
  scenarioId: string | null
}
export const requestStatuses: RequestStatus[] = ['Pendiente', 'En curso', 'Resuelta']
export const demoRoles: Role[] = ['Socio', 'SocioAdmin', 'Gestor AFEB']

export function createInitialDemoState(): DemoState {
  return structuredClone({
    role: 'SocioAdmin',
    person: {
      name: currentSourcePerson.name,
      position: currentSourcePerson.position ?? '',
      email: currentSourcePerson.email ?? '',
      phone: currentSourcePerson.phone ?? '',
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
    team: mockDb.people
      .filter((p) => new Set<string>(currentSourceCompany.memberPersonIds).has(p.id))
      .map((p) => p.name),
    scenarioId: null,
  })
}

// A local repository with atomic writes and a React-independent command API.
// Observed source data is never mutated or sent to the private portal.
export function createMockBackend(storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>) {
  const key = `${mockStoragePrefix}backend:v1`
  const listeners = new Set<() => void>()
  const readJSON = (name: string): unknown => {
    try {
      return JSON.parse(storage.getItem(name) ?? 'null')
    } catch {
      return null
    }
  }
  const load = (): DemoState => {
    const baseline = createInitialDemoState()
    const saved = readJSON(key) as DemoState | null
    if (saved && Array.isArray(saved.activities) && Array.isArray(saved.requests)) return saved
    // Preserve the user's previous demo edits when upgrading from per-field keys.
    for (const field of [
      'role',
      'person',
      'business',
      'preferences',
      'registered',
      'activities',
      'brands',
      'team',
    ] as const) {
      const previous = readJSON(`${mockStoragePrefix}${field}`)
      if (previous !== null) Object.assign(baseline, { [field]: previous })
    }
    const previousRequests = readJSON(`${mockStoragePrefix}requests`)
    if (Array.isArray(previousRequests))
      baseline.requests = previousRequests
        .filter((r) => typeof r === 'string')
        .map((subject, i) => ({
          id: `local-migrated-${i}`,
          subject,
          status: 'Pendiente',
          createdAt: null,
          actorId: mockDb.account.personId,
          activityId: null,
          origin: 'local-simulation',
        }))
    return baseline
  }
  const freezeState = (snapshot: DemoState): DemoState => {
    const freeze = (value: unknown) => {
      if (value && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value)
        Object.values(value).forEach(freeze)
      }
    }
    freeze(snapshot)
    return snapshot
  }
  let state = freezeState(load())
  const notify = () => listeners.forEach((listener) => listener())
  const write = (next: DemoState) => {
    // Persist before publishing; a failed storage write must not show success.
    storage.setItem(key, JSON.stringify(next))
    state = freezeState(next)
    notify()
  }
  const patch = <K extends keyof DemoState>(field: K, value: DemoState[K]) => {
    const next = { ...state, [field]: value }
    if (field === 'person')
      next.team = state.team.map((name) =>
        name === state.person.name ? (value as Person).name : name,
      )
    write(next)
  }
  const applyRegistration = (snapshot: DemoState, activityId: string, cancelled = false) => {
    const activity = snapshot.activities.find((a) => a.id === activityId)
    const registered = snapshot.registered.includes(activityId)
    if (!activity || (cancelled ? !registered : registered || !canRegisterInMock(activity)))
      return snapshot
    return {
      ...snapshot,
      registered: cancelled
        ? snapshot.registered.filter((id) => id !== activityId)
        : [...snapshot.registered, activityId],
      activities: snapshot.activities.map((a) =>
        a.id === activityId
          ? {
              ...a,
              attendees:
                a.attendees === null ? null : Math.max(0, a.attendees + (cancelled ? -1 : 1)),
              isLocalOverride: true,
            }
          : a,
      ),
    }
  }
  return {
    storageKey: key,
    getSnapshot: () => state,
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    syncFromStorage: () => {
      state = freezeState(load())
      notify()
    },
    patch,
    reset: () => {
      write(createInitialDemoState())
      // Remove migrated values so a later reset cannot resurrect them.
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
      ])
        storage.removeItem(`${mockStoragePrefix}${field}`)
    },
    register: (id: string) => {
      const next = applyRegistration(state, id)
      if (next !== state) write(next)
    },
    cancel: (id: string) => {
      const next = applyRegistration(state, id, true)
      if (next !== state) write(next)
    },
    addRequest: (subject: string, activityId: string | null = null) => {
      if (!subject.trim()) return
      if (activityId && !state.activities.some((a) => a.id === activityId))
        throw new Error('Actividad no encontrada')
      const request: LocalRequest = {
        id: `local-request-${crypto.randomUUID()}`,
        subject: subject.trim(),
        status: 'Pendiente',
        createdAt: new Date().toISOString(),
        actorId: mockDb.account.personId,
        activityId,
        origin: 'local-simulation',
      }
      patch('requests', [...state.requests, request])
    },
    updateRequest: (id: string, status: RequestStatus) => {
      if (state.role !== 'Gestor AFEB' || !requestStatuses.includes(status)) return
      patch(
        'requests',
        state.requests.map((request) => (request.id === id ? { ...request, status } : request)),
      )
    },
    loadScenario: (id: string) => {
      const scenario = mockDb.scenarios.find((s) => s.id === id)
      if (!scenario) throw new Error('Escenario no encontrado')
      let next: DemoState = { ...createInitialDemoState(), scenarioId: id }
      if (id === 'register-cancel' && scenario.activityId)
        next = applyRegistration(next, scenario.activityId)
      if (id === 'draft-publication') next.role = 'Gestor AFEB'
      write(next)
    },
  }
}
