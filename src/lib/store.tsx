import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import type { Activity, Role } from '@/data/fixtures'
import { createMockBackend } from '@/lib/mock-backend'
import { getCompanyTeam } from '@/lib/mock-selectors'
import { mockDb } from '@/data/mock-db'
import type { DemoState, Person, Business } from '@/lib/mock-backend'

type Backend = ReturnType<typeof createMockBackend>
type Store = DemoState & {
  team: string[]
  reset: Backend['reset']
  setRole: (role: Role) => void
  setPerson: (person: Person) => void
  setBusiness: (business: Business) => void
  setPreferences: (prefs: (boolean | null)[]) => void
  setActivities: (activities: Activity[]) => void
  setBrands: (brands: string[]) => void
  register: Backend['register']
  cancel: Backend['cancel']
  addMember: Backend['addMember']
  createInvitation: Backend['createInvitation']
  respondInvitation: Backend['respondInvitation']
  createRequest: Backend['createRequest']
  updateRequest: Backend['updateRequest']
  followRequest: Backend['followRequest']
  saveTenderPreferences: Backend['saveTenderPreferences']
  loadScenario: Backend['loadScenario']
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
        team: getCompanyTeam(state, mockDb.account.companyId).map((p) => p.name),
        reset: backend.reset,
        setRole: (role) => backend.patch('role', role),
        setPerson: (person) => backend.patch('person', person),
        setBusiness: (business) => backend.patch('business', business),
        setPreferences: (prefs) => backend.patch('preferences', prefs),
        setActivities: (activities) => backend.patch('activities', activities),
        register: backend.register,
        cancel: backend.cancel,
        addMember: backend.addMember,
        createInvitation: backend.createInvitation,
        respondInvitation: backend.respondInvitation,
        createRequest: backend.createRequest,
        followRequest: backend.followRequest,
        saveTenderPreferences: backend.saveTenderPreferences,
        updateRequest: backend.updateRequest,
        setBrands: (brands) => backend.patch('brands', brands),
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
