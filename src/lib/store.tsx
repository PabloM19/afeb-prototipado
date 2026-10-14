import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import type { Activity, Role } from '@/data/fixtures'
import { createMockBackend } from '@/lib/mock-backend'
import type { DemoState, Person, Business, RequestStatus } from '@/lib/mock-backend'

type Store = DemoState & {
  reset: () => void
  setRole: (r: Role) => void
  setPerson: (p: Person) => void
  setBusiness: (b: Business) => void
  setPreferences: (p: (boolean | null)[]) => void
  register: (id: string) => void
  cancel: (id: string) => void
  setActivities: (a: Activity[]) => void
  addRequest: (subject: string, activityId?: string | null) => void
  updateRequest: (id: string, status: RequestStatus) => void
  setBrands: (brands: string[]) => void
  setTeam: (team: string[]) => void
  loadScenario: (id: string) => void
}
const Context = createContext<Store | null>(null)
export function StoreProvider({ children }: { children: ReactNode }) {
  const [backend] = useState(() => createMockBackend(localStorage))
  const state = useSyncExternalStore(backend.subscribe, backend.getSnapshot)
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        (event.key === backend.storageKey || event.key === null)
      )
        backend.syncFromStorage()
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [backend])
  return (
    <Context.Provider
      value={{
        ...state,
        reset: backend.reset,
        setRole: (role) => backend.patch('role', role),
        setPerson: (person) => backend.patch('person', person),
        setBusiness: (business) => backend.patch('business', business),
        setPreferences: (prefs) => backend.patch('preferences', prefs),
        setActivities: (activities) => backend.patch('activities', activities),
        register: backend.register,
        cancel: backend.cancel,
        addRequest: backend.addRequest,
        updateRequest: backend.updateRequest,
        setBrands: (brands) => backend.patch('brands', brands),
        setTeam: (team) => backend.patch('team', team),
        loadScenario: backend.loadScenario,
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
