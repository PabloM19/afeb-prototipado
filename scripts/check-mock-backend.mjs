import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'
const temporary = await mkdtemp(join(tmpdir(), 'afeb-phase1-'))
try {
  const entry = join(temporary, 'entry.ts'),
    output = join(temporary, 'backend.mjs')
  const root = fileURLToPath(new URL('../', import.meta.url))
  await writeFile(
    entry,
    `export * from '${root}src/lib/mock-backend.ts';export * from '${root}src/lib/mock-selectors.ts';export * from '${root}src/lib/search.ts';export * from '${root}src/data/mock-db.ts';`,
  )
  await build({
    entryPoints: [entry],
    outfile: output,
    bundle: true,
    platform: 'node',
    format: 'esm',
    tsconfig: fileURLToPath(new URL('../tsconfig.json', import.meta.url)),
  })
  const {
    createMockBackend,
    createInitialDemoState,
    getDemoContacts,
    getDemoParticipations,
    getCompanyTeam,
    createSearchIndex,
    findSearchResults,
    mockDb,
  } = await import(pathToFileURL(output).href)
  const sourceBefore = JSON.stringify(mockDb),
    houser = mockDb.presentation.featuredActivityId,
    companyId = mockDb.account.companyId,
    actorId = mockDb.account.personId
  const values = new Map(),
    storage = {
      getItem: (k) => values.get(k) ?? null,
      setItem: (k, v) => values.set(k, v),
      removeItem: (k) => values.delete(k),
    }
  const backend = createMockBackend(storage),
    initial = createInitialDemoState()
  let notifications = 0
  const unsubscribe = backend.subscribe(() => notifications++)
  backend.register(houser)
  backend.register(houser)
  assert.equal(notifications, 1)
  assert.deepEqual(backend.getSnapshot().registered, [houser])
  assert.equal(backend.getSnapshot().activities.find((a) => a.id === houser).attendees, 9)
  backend.cancel(houser)
  backend.cancel(houser)
  assert.equal(backend.getSnapshot().activities.find((a) => a.id === houser).attendees, 8)
  assert.throws(() => backend.register('rec1ALws66b1fUrsO'))
  assert.throws(() => backend.register('reclQOglCiwZbqQI1'))
  // Explicit test inputs, never inserted in the observed JSON dataset.
  const input = {
    name: 'Persona de prueba local',
    email: 'phase1@example.test',
    position: 'Cargo escrito en la prueba',
    department: 'Área escrita',
    level: 'Nivel escrito',
    phone: '111222333',
    phone2: '444555666',
    linkedin: 'https://example.test/persona',
    role: 'SocioAdmin',
  }
  const memberId = backend.addMember(input),
    member = backend.getSnapshot().members.find((m) => m.id === memberId)
  for (const field of [
    'name',
    'email',
    'position',
    'department',
    'level',
    'phone',
    'phone2',
    'linkedin',
  ])
    assert.equal(member[field], input[field])
  assert.equal(member.companyId, companyId)
  assert.equal(member.simulationRole, 'SocioAdmin')
  assert.equal(member.sourceRole, null)
  assert.throws(() => backend.addMember({ ...input, email: ' PHASE1@EXAMPLE.TEST ' }))
  assert.throws(() => backend.addMember({ ...input, email: 'invalid' }))
  assert.equal(getCompanyTeam(backend.getSnapshot(), companyId).length, 2)
  assert.ok(
    getDemoContacts(backend.getSnapshot()).some(
      (p) => p.id === memberId && p.phone2 === input.phone2,
    ),
  )
  const inviteInput = {
    activityId: houser,
    personId: memberId,
    name: input.name,
    email: input.email,
    position: input.position,
    company: initial.business.name,
    companyId,
  }
  assert.throws(() => backend.createInvitation({ ...inviteInput, company: 'Empresa diferente' }))
  const invitationId = backend.createInvitation(inviteInput)
  assert.throws(() => backend.createInvitation(inviteInput))
  assert.equal(backend.getSnapshot().invitations.length, 1)
  let invitation = backend.getSnapshot().invitations.find((i) => i.id === invitationId)
  assert.deepEqual(invitation.invitee, {
    name: input.name,
    email: input.email,
    position: input.position,
    companyLabel: initial.business.name,
  })
  assert.equal(invitation.cost.status, 'Por confirmar')
  assert.equal(invitation.cost.charged, false)
  assert.equal(backend.getSnapshot().registrations.filter((r) => r.personId === memberId).length, 0)
  let request = backend.getSnapshot().requests.find((r) => r.kind === 'activity-invitation')
  assert.equal(request.payload.invitationId, invitationId)
  assert.equal(request.payload.personId, memberId)
  // Resolving the management request does not accept the invitation or register anyone.
  assert.throws(() => backend.updateRequest(request.id, 'Resuelta'))
  backend.patch('role', 'Gestor AFEB')
  backend.updateRequest(request.id, 'Resuelta')
  assert.equal(backend.getSnapshot().invitations[0].status, 'Pendiente')
  assert.equal(backend.getSnapshot().registrations.filter((r) => r.personId === memberId).length, 0)
  backend.followRequest(request.id, {
    assigneeId: mockDb.people.find((p) => p.kind === 'afeb-team').id,
    comment: 'Comentario conservado',
  })
  request = backend.getSnapshot().requests.find((r) => r.id === request.id)
  assert.equal(request.comments[0].body, 'Comentario conservado')
  assert.ok(request.assigneeId)
  assert.equal(request.history.length, 3)
  assert.throws(() => backend.followRequest(request.id, { assigneeId: 'unknown', comment: 'no' }))
  backend.respondInvitation(invitationId, 'Aceptada')
  backend.respondInvitation(invitationId, 'Aceptada')
  invitation = backend.getSnapshot().invitations.find((i) => i.id === invitationId)
  assert.equal(invitation.status, 'Aceptada')
  assert.ok(invitation.registrationId)
  assert.equal(
    backend
      .getSnapshot()
      .registrations.filter((r) => r.personId === memberId && r.status === 'Confirmada').length,
    1,
  )
  assert.equal(backend.getSnapshot().activities.find((a) => a.id === houser).attendees, 9)
  assert.equal(
    backend.getSnapshot().registered.length,
    0,
    'An invited member is not the current account',
  )
  const participation = getDemoParticipations(backend.getSnapshot()).find(
    (p) => p.personId === memberId,
  )
  assert.equal(participation.companyId, companyId)
  assert.equal(participation.name, input.name)
  assert.throws(() => backend.createInvitation(inviteInput))
  assert.throws(() => backend.respondInvitation(invitationId, 'Rechazada'))
  const secondTab = createMockBackend(storage)
  assert.equal(secondTab.getSnapshot().invitations[0].status, 'Aceptada')
  assert.equal(
    getDemoContacts(secondTab.getSnapshot()).find((p) => p.id === memberId).phone2,
    input.phone2,
  )
  backend.patch('brands', ['Marca introducida en la prueba'])
  const index = createSearchIndex(backend.getSnapshot())
  assert.ok(
    findSearchResults(index, 'Marca introducida').some((r) => r.path.includes('tab=marcas')),
  )
  assert.ok(index.some((r) => r.id === `person-${memberId}`))
  assert.ok(index.some((r) => r.id === `participation-${participation.id}`))
  backend.patch('role', 'Socio')
  assert.ok(!createSearchIndex(backend.getSnapshot()).some((r) => r.id.startsWith('request-')))
  assert.throws(() => backend.addMember({ ...input, email: 'other@example.test' }))
  backend.patch('role', 'SocioAdmin')
  const guestId = backend.createInvitation({
    activityId: houser,
    name: 'Invitado de prueba',
    email: 'guest@example.test',
    position: 'Invitado',
    company: 'Empresa escrita por el usuario',
    companyId: null,
  })
  const guest = backend.getSnapshot().invitations.find((i) => i.id === guestId)
  assert.equal(guest.companyId, null)
  assert.equal(backend.getSnapshot().members.find((m) => m.id === guest.personId).phone, null)
  backend.respondInvitation(guestId, 'Rechazada')
  assert.ok(!backend.getSnapshot().registrations.some((r) => r.invitationId === guestId))
  const revokable = backend.createInvitation({
    activityId: houser,
    name: 'Revocación de prueba',
    email: 'revoke@example.test',
    company: 'Empresa escrita',
    companyId: null,
  })
  backend.respondInvitation(revokable, 'Revocada')
  assert.throws(() => backend.respondInvitation(revokable, 'Aceptada'))
  const blocked = backend.createInvitation({
    activityId: houser,
    name: 'Cupo de prueba',
    email: 'capacity@example.test',
    company: 'Empresa escrita',
    companyId: null,
  })
  backend.patch(
    'activities',
    backend
      .getSnapshot()
      .activities.map((a) => (a.id === houser ? { ...a, capacity: a.attendees } : a)),
  )
  assert.throws(() => backend.respondInvitation(blocked, 'Aceptada'))
  assert.equal(backend.getSnapshot().invitations.find((i) => i.id === blocked).status, 'Pendiente')
  backend.patch(
    'activities',
    backend
      .getSnapshot()
      .activities.map((a) =>
        a.id === houser ? { ...a, capacity: null, deadline: '2026-10-13' } : a,
      ),
  )
  assert.throws(() => backend.respondInvitation(blocked, 'Aceptada'))
  const unknownsBefore = backend.getSnapshot().members.length
  assert.throws(() =>
    backend.createInvitation({
      activityId: 'rec1ALws66b1fUrsO',
      name: 'No alta',
      email: 'blocked@example.test',
      company: 'x',
    }),
  )
  assert.equal(backend.getSnapshot().members.length, unknownsBefore)
  backend.reset()
  const adviceId = backend.createRequest({
    kind: 'advice',
    payload: { details: 'Detalle íntegro\nSegunda línea', serviceId: mockDb.services[0].id },
  })
  assert.equal(
    backend.getSnapshot().requests.find((r) => r.id === adviceId).payload.details,
    'Detalle íntegro\nSegunda línea',
  )
  const companies = mockDb.companies
    .filter((c) => c.isMember)
    .slice(0, 2)
    .map((c) => c.id)
  const collabId = backend.createRequest({
    kind: 'collaboration',
    payload: {
      companyIds: companies,
      collaborationType: mockDb.auditedForms.collaboration.types[0],
      description: 'Descripción íntegra',
    },
  })
  assert.deepEqual(
    backend.getSnapshot().requests.find((r) => r.id === collabId).payload.companyIds,
    companies,
  )
  assert.throws(() =>
    backend.createRequest({
      kind: 'collaboration',
      payload: { companyIds: ['unknown'], collaborationType: 'Comercial', description: 'x' },
    }),
  )
  assert.throws(() =>
    backend.createRequest({
      kind: 'collaboration',
      payload: {
        companyIds: [companies[0], companies[0]],
        collaborationType: 'Comercial',
        description: 'x',
      },
    }),
  )
  assert.throws(() =>
    backend.createRequest({
      kind: 'collaboration',
      payload: {
        companyIds: mockDb.companies
          .filter((c) => c.isMember)
          .slice(0, 6)
          .map((c) => c.id),
        collaborationType: 'Comercial',
        description: 'Demasiadas empresas',
      },
    }),
  )
  const prefs = {
    daily: false,
    personalized: true,
    categoryIds: [],
    interests: 'Intereses escritos',
    comments: 'Comentarios escritos',
    updatedAt: null,
  }
  backend.saveTenderPreferences(prefs)
  const reloaded = createMockBackend(storage)
  assert.equal(reloaded.getSnapshot().tenderPreferences.daily, false)
  assert.equal(reloaded.getSnapshot().tenderPreferences.interests, prefs.interests)
  const tenderRequest = reloaded.getSnapshot().requests.find((r) => r.kind === 'tenders')
  assert.equal(tenderRequest.payload.comments, prefs.comments)
  assert.throws(() => backend.saveTenderPreferences({ ...prefs, daily: null }))
  assert.throws(() => backend.saveTenderPreferences({ ...prefs, categoryIds: ['invented'] }))
  assert.throws(() => backend.saveTenderPreferences({ ...prefs, interests: '' }))
  for (const scenario of mockDb.scenarios) {
    backend.loadScenario(scenario.id)
    assert.equal(backend.getSnapshot().scenarioId, scenario.id)
    assert.equal(backend.getSnapshot().members.length, 0)
    assert.equal(backend.getSnapshot().registered.length, scenario.id === 'register-cancel' ? 1 : 0)
  }
  backend.reset()
  secondTab.syncFromStorage()
  assert.deepEqual(secondTab.getSnapshot(), initial)
  assert.equal(JSON.stringify(mockDb), sourceBefore)
  assert.ok(Object.isFrozen(backend.getSnapshot().members))
  const bad = createMockBackend({
    ...storage,
    setItem: () => {
      throw Error('No storage')
    },
  })
  assert.throws(() => bad.addMember(input))
  assert.equal(bad.getSnapshot().members.length, 0)
  const legacy = new Map(),
    prefix = backend.storageKey.replace('backend:v2', '')
  const old = {
    ...initial,
    schemaVersion: 1,
    team: [initial.person.name, 'Nombre anterior'],
    members: undefined,
    invitations: undefined,
    registrations: undefined,
    registered: [houser],
    requests: [
      {
        id: 'old-request',
        subject: 'Texto anterior',
        createdAt: null,
        status: 'Pendiente',
        activityId: null,
      },
    ],
  }
  legacy.set(prefix + 'backend:v1', JSON.stringify(old))
  const oldStore = {
    getItem: (k) => legacy.get(k) ?? null,
    setItem: (k, v) => legacy.set(k, v),
    removeItem: (k) => legacy.delete(k),
  }
  const migrated = createMockBackend(oldStore)
  assert.equal(migrated.getSnapshot().members[0].email, null)
  assert.equal(migrated.getSnapshot().requests[0].kind, 'legacy')
  assert.equal(migrated.getSnapshot().registered[0], houser)
  migrated.patch('role', 'Gestor AFEB')
  assert.equal(
    createMockBackend(oldStore).getSnapshot().members.length,
    1,
    'Migration must not duplicate legacy members',
  )
  migrated.reset()
  assert.equal(legacy.has(prefix + 'backend:v1'), false)
  unsubscribe()
  console.log(
    'Phase 1 passed: complete members, linked invitation acceptance/rejection/revocation, duplication and quota/deadline guards, requests with payload/history, persistent preferences, participation aggregation, search, reload/sync/reset, immutable source and v1 migration.',
  )
} finally {
  await rm(temporary, { recursive: true, force: true })
}
