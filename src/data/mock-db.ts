import snapshot from './mock-db.json'

function freezeSnapshot<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.freeze(value)
    Object.values(value).forEach(freezeSnapshot)
  }
  return value
}

/** Canonical, source-backed snapshot. Runtime simulation edits must use a copy. */
export const mockDb = freezeSnapshot(snapshot)
export const mockDatasetId = mockDb.meta.datasetId
export const mockStoragePrefix = `afeb:mock:${mockDatasetId}:`
export const simulationDate = mockDb.meta.simulationDate
export const referenceIds = mockDb.presentation
export const currentSourcePerson = mockDb.people.find((p) => p.id === mockDb.account.personId)!
export const currentSourceCompany = mockDb.companies.find((c) => c.id === mockDb.account.companyId)!
export const getMockFiles = (ids: string[]) => mockDb.files.filter((file) => ids.includes(file.id))
export const missingValue = 'No verificado'
export const displayValue = (value: string | number | null | undefined) =>
  value === null || value === undefined || value === '' ? missingValue : String(value)
export const initialsFor = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part.replace(/^[^\p{L}\p{N}]+/u, '')[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
