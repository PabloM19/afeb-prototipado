import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { activities as initialActivities } from '@/data/fixtures'
import type { Activity, Role } from '@/data/fixtures'
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
  preferences: boolean[]
  setPreferences: (p: boolean[]) => void
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
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null') ?? initial
    } catch {
      return initial
    }
  })
  return [
    value,
    (next: T) => {
      setValue(next)
      localStorage.setItem(key, JSON.stringify(next))
    },
  ] as const
}
export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useLocal<Role>('afeb:role', 'SocioAdmin')
  const [person, setPerson] = useLocal('afeb:person', {
    name: 'Clara Martín',
    position: 'Directora comercial',
    email: 'clara@nord.example',
    phone: '+34 930 000 000',
    linkedin: '',
    department: 'Comercial',
    level: 'Dirección',
  })
  const [business, setBusiness] = useLocal('afeb:business', {
    name: 'Nord Tools',
    tax: 'B00000000',
    address: 'Calle del Taller, 24',
    city: 'Barcelona',
    country: 'España',
    email: 'hola@nord.example',
    phone: '+34 930 000 000',
    employees: '50–100',
    revenue: '10–25 M€',
    market: 'Profesional y doméstico',
    export: 'Sí',
    category: 'Herramientas',
    website: 'https://nord.example',
  })
  const [preferences, setPreferences] = useLocal('afeb:preferences', [true, true, false, true])
  const [registered, setRegistered] = useLocal<string[]>('afeb:registered', ['webinar'])
  const [activities, setActivities] = useLocal<Activity[]>('afeb:activities', initialActivities)
  const [requests, setRequests] = useLocal<string[]>('afeb:requests', [])
  const [brands, setBrands] = useLocal<string[]>('afeb:brands', ['Nord Tools', 'Nord Professional'])
  const [team, setTeam] = useLocal<string[]>('afeb:team', [
    'Clara Martín',
    'Marcos Vidal',
    'Laura Soler',
    'Javier Ruiz',
  ])
  return (
    <Context.Provider
      value={{
        reset: () => {
          Object.keys(localStorage)
            .filter((key) => key.startsWith('afeb:'))
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
          if (!registered.includes(id)) {
            setRegistered([...registered, id])
            setActivities(
              activities.map((a) => (a.id === id ? { ...a, attendees: a.attendees + 1 } : a)),
            )
          }
        },
        cancel: (id) => {
          if (registered.includes(id)) {
            setRegistered(registered.filter((x) => x !== id))
            setActivities(
              activities.map((a) =>
                a.id === id ? { ...a, attendees: Math.max(0, a.attendees - 1) } : a,
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
