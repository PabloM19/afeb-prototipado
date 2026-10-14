import { mockDb, getMockFiles, initialsFor, missingValue, referenceIds } from './mock-db'

// Compatibility adapters for the UI. All content is read from mock-db.json.
// Empty strings are form/display values for source nulls, never invented facts.
export type Role = 'Socio' | 'SocioAdmin' | 'Gestor AFEB'
export type Activity = {
  id: string
  title: string
  category: string
  date: string
  end: string
  deadline: string
  place: string
  address: string
  mode: string
  state:
    'Abierta' | 'Finalizada' | 'Borrador' | 'Cerrada' | 'Completa' | 'Consulta' | 'Sin verificar'
  sourceState: string
  price: number | null
  secondPrice: number | null
  nonMemberPrice: number | null
  attendees: number | null
  capacity: number | null
  description: string
  timezone: string | null
  fileIds: string[]
  qualityNotes: string[]
  participantSample: string
  isLocalOverride?: boolean
}
const stateMap: Record<string, Activity['state']> = {
  'Inscripciones abiertas': 'Abierta',
  'Inscripciones cerradas': 'Cerrada',
  'Grupo completo': 'Completa',
  Finalizado: 'Finalizada',
  Borrador: 'Borrador',
  Consulta: 'Consulta',
}
export const activities: Activity[] = mockDb.activities.map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category ?? '',
  date: item.startsAt ?? '',
  end: item.endsAt ?? '',
  deadline: item.registrationDeadline ?? '',
  place: item.place ?? '',
  address: item.address ?? '',
  // Derived display label from the explicit webinar title or physical address.
  mode:
    item.title.startsWith('WEBINAR') || item.place === 'Online'
      ? 'Webinar'
      : item.address
        ? 'Presencial'
        : '',
  state: stateMap[item.stateRaw] ?? 'Sin verificar',
  sourceState: item.stateRaw,
  price: item.memberPrice,
  secondPrice: item.additionalMemberPrice,
  nonMemberPrice: item.nonMemberPrice,
  attendees:
    item.participantSample === 'not-collected'
      ? null
      : mockDb.participations.filter((p) => p.activityId === item.id).length,
  capacity: item.capacity,
  description: item.description ?? '',
  timezone: item.timezone,
  fileIds: [...item.fileIds],
  qualityNotes: [...item.qualityNotes],
  participantSample: item.participantSample,
}))
export const activityCategories = ['Todas', ...mockDb.catalogs.activityCategories]
export type Company = {
  id: string
  name: string
  initials: string
  category: string
  location: string
  description: string
  members: number
  email: string
  website: string
  phone: string
  tax: string
  address: string
  country: string
  province: string
  postalCode: string
  membership: string
  brands: { id: string; name: string | null }[]
  memberPersonIds: string[]
}
export const allCompanies: Company[] = mockDb.companies.map((item) => ({
  id: item.id,
  name: item.name,
  initials: initialsFor(item.name),
  category: item.category ?? '',
  location: item.location ?? '',
  description: item.description ?? '',
  members: item.memberPersonIds.length,
  email: item.email ?? '',
  website: item.website ?? '',
  phone: item.phone ?? '',
  tax: item.taxId ?? '',
  address: item.address ?? '',
  country: item.country ?? '',
  province: item.province ?? '',
  postalCode: item.postalCode ?? '',
  membership: item.membershipRaw ?? '',
  brands: [...item.brands],
  memberPersonIds: [...item.memberPersonIds],
}))
export const companies = allCompanies.filter(
  (item) => mockDb.companies.find((c) => c.id === item.id)?.isMember,
)
export const companyCategories = ['Todas', ...mockDb.catalogs.companyCategories]
export const contacts = mockDb.people.map((item) => ({
  id: item.id,
  name: item.name,
  initials: initialsFor(item.name),
  position: item.position ?? '',
  companyId: item.companyId,
  company: allCompanies.find((c) => c.id === item.companyId)?.name ?? '',
  department: item.department ?? '',
  email: item.email ?? '',
  sourceRole: item.sourceRole ?? '',
  kind: item.kind,
}))
export const afebTeam = contacts.filter((item) => item.kind === 'afeb-team')
export const participations = mockDb.participations.map((item) => ({
  id: item.id,
  name: item.name,
  initials: initialsFor(item.name),
  company: item.companyLabel ?? '',
  activityId: item.activityId,
  personId: item.personId,
  position: '',
  department: '',
  email: '',
}))
const reportCategory: Record<string, string> = {
  'Informes Mercado AFEB': 'Mercado',
  'Informes Sectoriales': 'Sectoriales',
  'Informes Internacionales': 'Internacionales',
  Normativa: 'Normativa',
}
export const allReports = mockDb.reports.map((item) => {
  const files = getMockFiles(item.fileIds)
  const edition = files[0]?.filename.match(/(\d)T[ _-]*(\d{4})/)
  return {
    id: item.id,
    title: item.title,
    category: reportCategory[item.categoryRaw] ?? item.categoryRaw,
    sourceCategory: item.categoryRaw,
    date: item.catalogDate ?? '',
    edition: edition ? `${edition[1]}T ${edition[2]}` : '',
    description: item.description ?? '',
    personal: item.personalized === true,
    accessLabel: item.accessLabel ?? '',
    price: item.price,
    files,
    fileIds: [...item.fileIds],
  }
})
export const reports = allReports.filter((item) => item.category !== 'Normativa')
export const legalResources = allReports
  .filter((item) => item.category === 'Normativa')
  .map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    reportId: item.id,
  }))
export const legalService = mockDb.services[0]
export const documents = mockDb.documents.map((item) => {
  const file = mockDb.files.find((f) => f.id === item.fileId)!
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    subcategory: item.subcategory,
    year: file.years.join(', '),
    format: file.format ?? missingValue,
    fileId: item.fileId,
  }
})
export const providers = mockDb.providers.map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  type: item.type,
  description: item.description ?? '',
  benefit: item.benefit ?? '',
  contactEmail: item.contactEmail ?? '',
  fileIds: [...item.fileIds],
}))
export const formatDate = (
  value: string | null,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
) => {
  if (!value || Number.isNaN(new Date(value).getTime())) return 'Fecha no verificada'
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(value))
}
export function resolveActivityId(id: string | null) {
  const aliases: Record<string, string> = {
    encuentro: 'rec1ALws66b1fUrsO',
    webinar: referenceIds.featuredActivityId,
    normativa: 'recLtCYBe6zHUNuTR',
    foro: 'recUoTW85mdkZSs2j',
    gt: 'rec7HedzrkFcFqWPw',
    export: 'recroXKvtkC3H8KFl',
  }
  return id ? (aliases[id] ?? id) : referenceIds.featuredActivityId
}
export function resolveReportId(id: string | null) {
  const aliases: Record<string, string> = {
    ventas: referenceIds.featuredReportId,
    distribucion: 'recYUL9XzeEjQf3qb',
  }
  return id ? (aliases[id] ?? id) : referenceIds.featuredReportId
}
