import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { activities as initialActivities } from '@/data/fixtures'
import type { Activity, Role } from '@/data/fixtures'
import {
  currentSourcePerson,
  currentSourceCompany,
  mockDb,
  mockStoragePrefix,
} from '@/data/mock-db'
import { canRegisterInMock } from '@/lib/mock-rules'
type Person = {
  name: string
  position: string
  email: string
  phone: string
  linkedin: string
  department: string
  level: string
}
type Business = {
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
type Store = {
  reset: () => void
  role: Role
  setRole: (r: Role) => void
  person: Person
  setPerson: (p: Person) => void
  business: Business
  setBusiness: (b: Business) => void
  preferences: (boolean | null)[]
  setPreferences: (p: (boolean | null)[]) => void
  registered: string[]
  register: (id: string) => void
  cancel: (id: string) => void
  activities: Activity[]
  setActivities: (a: Activity[]) => void
  requests: string[]
  addRequest: (r: string) => void
  brands: string[]
  setBrands: (b: string[]) => void
  team: string[]
  setTeam: (t: string[]) => void
}
const Context = createContext<Store | null>(null)
function useLocal<T>(key: string, initial: T) {
  const storageKey = `${mockStoragePrefix}${key}`
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || 'null') ?? structuredClone(initial)
    } catch {
      return structuredClone(initial)
    }
  })
  return [
    value,
    (next: T) => {
      setValue(next)
      localStorage.setItem(storageKey, JSON.stringify(next))
    },
  ] as const
}
export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useLocal<Role>('role', 'SocioAdmin')
  const [person, setPerson] = useLocal('person', {
    name: currentSourcePerson.name,
    position: currentSourcePerson.position ?? '',
    email: currentSourcePerson.email ?? '',
    phone: currentSourcePerson.phone ?? '',
    linkedin: currentSourcePerson.linkedin ?? '',
    department: currentSourcePerson.department ?? '',
    level: currentSourcePerson.level ?? '',
  })
  const [business, setBusiness] = useLocal('business', {
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
  })
  const [preferences, setPreferences] = useLocal<(boolean | null)[]>(
    'preferences',
    mockDb.account.communicationPreferences,
  )
  const [registered, setRegistered] = useLocal<string[]>(
    'registered',
    mockDb.account.initialRegisteredActivityIds,
  )
  const [activities, setActivities] = useLocal<Activity[]>('activities', initialActivities)
  const [requests, setRequests] = useLocal<string[]>('requests', [])
  const [brands, setBrands] = useLocal<string[]>(
    'brands',
    currentSourceCompany.brands.map((b) => b.name).filter((name): name is string => name !== null),
  )
  const [team, setTeam] = useLocal<string[]>(
    'team',
    mockDb.people
      .filter((p) => new Set<string>(currentSourceCompany.memberPersonIds).has(p.id))
      .map((p) => p.name),
  )
  return (
    <Context.Provider
      value={{
        reset: () => {
          Object.keys(localStorage)
            .filter((key) => key.startsWith(mockStoragePrefix))
            .forEach((key) => localStorage.removeItem(key))
          window.location.assign('/')
        },
        role,
        setRole,
        person,
        setPerson,
        business,
        setBusiness,
        preferences,
        setPreferences,
        registered,
        register: (id) => {
          const activity = activities.find((a) => a.id === id)
          if (!activity || !canRegisterInMock(activity)) return
          if (!registered.includes(id)) {
            setRegistered([...registered, id])
            setActivities(
              activities.map((a) =>
                a.id === id
                  ? {
                      ...a,
                      attendees: a.attendees === null ? null : a.attendees + 1,
                      isLocalOverride: true,
                    }
                  : a,
              ),
            )
          }
        },
        cancel: (id) => {
          if (registered.includes(id)) {
            setRegistered(registered.filter((x) => x !== id))
            setActivities(
              activities.map((a) =>
                a.id === id
                  ? {
                      ...a,
                      attendees: a.attendees === null ? null : Math.max(0, a.attendees - 1),
                      isLocalOverride: true,
                    }
                  : a,
              ),
            )
          }
        },
        activities,
        setActivities,
        requests,
        addRequest: (r) => setRequests([...requests, r]),
        brands,
        setBrands,
        team,
        setTeam,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export function useStore() {
  const context = useContext(Context)
  if (!context) throw new Error('Missing StoreProvider')
  return context
}
