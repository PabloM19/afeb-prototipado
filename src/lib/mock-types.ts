import type { Activity, Role } from '@/data/fixtures'
export type Person = {
  name: string
  position: string
  email: string
  phone: string
  phone2: string
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
export type MemberInput = {
  name: string
  email: string
  position?: string
  department?: string
  level?: string
  phone?: string
  phone2?: string
  linkedin?: string
  role?: Role | ''
}
export type LocalMember = {
  id: string
  companyId: string | null
  companyLabel: string
  ownerCompanyId: string
  name: string
  email: string | null
  position: string | null
  department: string | null
  level: string | null
  phone: string | null
  phone2: string | null
  linkedin: string | null
  simulationRole: Role | null
  sourceRole: null
  kind: 'company-member' | 'guest'
  origin: 'local-simulation'
  createdAt: string | null
}
export type InvitationStatus = 'Pendiente' | 'Aceptada' | 'Rechazada' | 'Revocada'
export type LocalInvitation = {
  id: string
  activityId: string
  personId: string
  companyId: string | null
  ownerCompanyId: string
  invitedById: string
  invitee: { name: string; email: string; position: string | null; companyLabel: string }
  status: InvitationStatus
  createdAt: string
  respondedAt: string | null
  registrationId: string | null
  cost: {
    status: 'Por confirmar'
    referenceAmount: number | null
    rule: 'pending-afeb'
    charged: false
  }
  origin: 'local-simulation'
}
export type LocalRegistration = {
  id: string
  activityId: string
  personId: string
  companyId: string | null
  invitationId: string | null
  status: 'Confirmada' | 'Cancelada'
  createdAt: string | null
  cancelledAt: string | null
  origin: 'local-simulation'
}
export type RequestStatus = 'Pendiente' | 'En curso' | 'Resuelta'
export type RequestInput =
  | { kind: 'advice'; payload: { details: string; serviceId: string } }
  | {
      kind: 'collaboration'
      payload: { companyIds: string[]; collaborationType: string; description: string }
    }
  | {
      kind: 'tenders'
      payload: {
        daily: boolean
        personalized: boolean
        categoryIds: string[]
        interests: string
        comments: string
        referenceMonthlyPrice: number | null
      }
    }
  | {
      kind: 'activity-invitation'
      payload: { invitationId: string; activityId: string; personId: string }
    }
  | { kind: 'member-added'; payload: { personId: string; companyId: string } }
  | { kind: 'legacy'; payload: { text: string } }
export type RequestHistory = {
  id: string
  at: string | null
  actorId: string
  action: string
  comment: string | null
  status: RequestStatus
}
export type LocalRequest = RequestInput & {
  id: string
  subject: string
  status: RequestStatus
  createdAt: string | null
  actorId: string
  companyId: string
  activityId: string | null
  origin: 'local-simulation'
  assigneeId: string | null
  comments: { id: string; actorId: string; at: string; body: string }[]
  history: RequestHistory[]
}
export type TenderPreferences = {
  daily: boolean | null
  personalized: boolean | null
  categoryIds: string[]
  interests: string
  comments: string
  updatedAt: string | null
}
export type DemoState = {
  schemaVersion: 2
  role: Role
  person: Person
  business: Business
  preferences: (boolean | null)[]
  registered: string[]
  activities: Activity[]
  requests: LocalRequest[]
  brands: string[]
  members: LocalMember[]
  invitations: LocalInvitation[]
  registrations: LocalRegistration[]
  tenderPreferences: TenderPreferences
  scenarioId: string | null
}
