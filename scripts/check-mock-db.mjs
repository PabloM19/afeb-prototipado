import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const db = JSON.parse(readFileSync(new URL('../src/data/mock-db.json', import.meta.url), 'utf8'))
const tables = [
  'companies',
  'people',
  'activities',
  'participations',
  'reports',
  'documents',
  'files',
  'providers',
  'groups',
  'services',
]
const ids = Object.fromEntries(
  [...tables, 'sources'].map((table) => {
    const values = db[table].map((record) => record.id)
    assert.equal(new Set(values).size, values.length, `${table}: duplicate IDs`)
    return [table, new Set(values)]
  }),
)
const ref = (table, id) => assert.ok(ids[table].has(id), `${table}: missing reference ${id}`)
const nullableRef = (table, id) => {
  if (id !== null) ref(table, id)
}
for (const table of tables)
  for (const record of db[table]) {
    assert.ok(record.source.sourceIds.length, `${table}/${record.id}: provenance required`)
    for (const source of record.source.sourceIds) ref('sources', source)
  }
for (const company of db.companies)
  for (const id of company.memberPersonIds) {
    ref('people', id)
    assert.equal(db.people.find((p) => p.id === id).companyId, company.id)
  }
for (const person of db.people) nullableRef('companies', person.companyId)
for (const participant of db.participations) {
  ref('activities', participant.activityId)
  nullableRef('people', participant.personId)
  nullableRef('companies', participant.companyId)
}
for (const [table, ownerType] of [
  ['activities', 'activity'],
  ['reports', 'report'],
  ['providers', 'provider'],
  ['services', 'service'],
]) {
  for (const record of db[table])
    for (const id of record.fileIds) {
      ref('files', id)
      const file = db.files.find((f) => f.id === id)
      assert.equal(file.ownerId, record.id)
      assert.equal(file.ownerType, ownerType)
    }
}
for (const doc of db.documents) {
  ref('files', doc.fileId)
  assert.equal(db.files.find((f) => f.id === doc.fileId).ownerId, doc.id)
}
const ownerTables = {
  activity: 'activities',
  report: 'reports',
  document: 'documents',
  provider: 'providers',
  service: 'services',
}
for (const file of db.files) {
  ref(ownerTables[file.ownerType], file.ownerId)
  assert.equal(file.contentImported, false)
  assert.equal(file.downloadUrl, null)
  assert.deepEqual(file.years, [
    ...new Set(file.filename.match(/(?<!\d)(?:19|20)\d{2}(?!\d)/g) ?? []),
  ])
}
for (const scenario of db.scenarios) {
  nullableRef('activities', scenario.activityId)
  nullableRef('reports', scenario.reportId)
}
ref('people', db.account.personId)
ref('companies', db.account.companyId)
ref('activities', db.presentation.featuredActivityId)
ref('reports', db.presentation.featuredReportId)
for (const id of db.presentation.memberHighlightIds) ref('companies', id)
for (const id of db.account.initialRegisteredActivityIds) ref('activities', id)
for (const sources of Object.values(db.catalogSources))
  for (const source of sources) ref('sources', source)
for (const form of Object.values(db.auditedForms))
  for (const source of form.source.sourceIds) ref('sources', source)
assert.equal(db.auditedForms.brands.agreedPrice, null)
assert.equal(db.auditedForms.tenders.categoryOptions, null)
for (const service of db.services) ref('people', service.contactPersonId)
assert.ok(db.account.communicationPreferences.every((p) => p === null))
assert.ok(db.activities.every((a) => a.capacity === null && a.timezone === null))
const bdb = db.activities.find((a) => a.id === 'rec1ALws66b1fUrsO')
assert.equal(bdb.memberPrice, 150)
assert.equal(bdb.additionalMemberPrice, 75)
const eco = db.activities.find((a) => a.id === 'rechBg5Ghv8eStB7u')
assert.equal(eco.endsAt, '2026-11-26T11:00')
assert.ok(eco.qualityNotes.length)
assert.equal(db.reports.find((r) => r.id === 'recYUL9XzeEjQf3qb').fileIds.length, 0)
for (const source of db.sources) {
  assert.equal(source.observedAt, db.meta.observedAt)
  const url = new URL(source.url)
  assert.ok(!url.username && !url.password)
  assert.ok([...url.searchParams.keys()].every((key) => key === 'recordId'))
}
console.log('Mock DB: IDs, provenance, relationships, filenames and source ambiguities verified.')
console.log(Object.fromEntries(tables.map((table) => [table, db[table].length])))
