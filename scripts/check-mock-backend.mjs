import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const temporary = await mkdtemp(join(tmpdir(), 'afeb-mock-check-'))
try {
  const output = join(temporary, 'mock-backend.mjs')
  await build({
    entryPoints: [fileURLToPath(new URL('../src/lib/mock-backend.ts', import.meta.url))],
    outfile: output,
    bundle: true,
    platform: 'node',
    format: 'esm',
    tsconfig: fileURLToPath(new URL('../tsconfig.json', import.meta.url)),
  })
  const { createMockBackend, createInitialDemoState } = await import(pathToFileURL(output).href)
  const values = new Map()
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
  const backend = createMockBackend(storage)
  const houser = 'rec9o6L7QzzSGPd3O'
  const bdb = 'rec1ALws66b1fUrsO'
  const initial = createInitialDemoState()
  let notifications = 0
  const unsubscribe = backend.subscribe(() => notifications++)
  assert.equal(backend.getSnapshot().registered.length, 0)
  assert.ok(Object.isFrozen(backend.getSnapshot().activities[0]))
  backend.register(houser)
  backend.register(houser)
  assert.equal(notifications, 1, 'Duplicate commands must not write again')
  assert.deepEqual(backend.getSnapshot().registered, [houser])
  assert.equal(backend.getSnapshot().activities.find((a) => a.id === houser).attendees, 9)
  const secondTab = createMockBackend(storage)
  assert.deepEqual(secondTab.getSnapshot().registered, [houser], 'Registration survives reload')
  backend.cancel(houser)
  secondTab.syncFromStorage()
  assert.deepEqual(secondTab.getSnapshot().registered, [], 'Other views see cancellation')
  assert.equal(backend.getSnapshot().activities.find((a) => a.id === houser).attendees, 8)
  backend.register(bdb)
  backend.register('reclQOglCiwZbqQI1')
  assert.equal(
    backend.getSnapshot().registered.length,
    0,
    'Full and incomplete records stay blocked',
  )
  backend.addRequest('Solicitud local de prueba', houser)
  const request = backend.getSnapshot().requests[0]
  assert.equal(request.activityId, houser)
  assert.equal(request.origin, 'local-simulation')
  assert.equal(request.status, 'Pendiente')
  backend.updateRequest(request.id, 'Resuelta')
  assert.equal(
    backend.getSnapshot().requests[0].status,
    'Pendiente',
    'Member view cannot manage requests',
  )
  backend.patch('role', 'Gestor AFEB')
  backend.updateRequest(request.id, 'En curso')
  backend.updateRequest(request.id, 'Resuelta')
  secondTab.syncFromStorage()
  assert.equal(secondTab.getSnapshot().requests[0].status, 'Resuelta')
  assert.equal(createMockBackend(storage).getSnapshot().requests[0].status, 'Resuelta')
  for (const id of [
    'baseline',
    'register-cancel',
    'closed-registration',
    'draft-publication',
    'personalized-report',
    'metadata-inconsistency',
  ]) {
    backend.loadScenario(id)
    assert.equal(backend.getSnapshot().scenarioId, id)
    assert.equal(backend.getSnapshot().requests.length, 0)
    assert.equal(backend.getSnapshot().registered.length, id === 'register-cancel' ? 1 : 0)
    assert.equal(
      backend.getSnapshot().role,
      id === 'draft-publication' ? 'Gestor AFEB' : 'SocioAdmin',
    )
  }
  assert.throws(() => backend.loadScenario('unknown'))
  assert.equal(backend.getSnapshot().scenarioId, 'metadata-inconsistency')
  backend.patch('person', { ...backend.getSnapshot().person, name: 'Cuenta de demostración' })
  assert.ok(backend.getSnapshot().team.includes('Cuenta de demostración'))
  backend.reset()
  assert.deepEqual(backend.getSnapshot(), initial)
  assert.deepEqual(createMockBackend(storage).getSnapshot(), initial)
  assert.equal(
    initial.activities.find((a) => a.id === houser).attendees,
    8,
    'Initial source state stays intact',
  )
  const badStorage = {
    ...storage,
    setItem: () => {
      throw new Error('Storage unavailable')
    },
  }
  const failingBackend = createMockBackend(badStorage)
  assert.throws(() => failingBackend.register(houser))
  assert.equal(
    failingBackend.getSnapshot().registered.length,
    0,
    'A failed save never publishes success',
  )
  // Upgrade an existing presentation without silently discarding its inputs.
  const legacy = new Map()
  const prefix = backend.storageKey.replace('backend:v1', '')
  legacy.set(prefix + 'registered', JSON.stringify([houser]))
  legacy.set(prefix + 'requests', JSON.stringify(['Solicitud anterior']))
  const oldStorage = {
    getItem: (key) => legacy.get(key) ?? null,
    setItem: (key, value) => legacy.set(key, value),
    removeItem: (key) => legacy.delete(key),
  }
  const migrated = createMockBackend(oldStorage)
  assert.deepEqual(migrated.getSnapshot().registered, [houser])
  assert.equal(migrated.getSnapshot().requests[0].createdAt, null)
  migrated.reset()
  assert.equal(legacy.has(prefix + 'requests'), false)
  unsubscribe()
  console.log(
    'Local backend passed: atomic registration, duplicates, cancellation, persistence, sync, requests, roles, scenarios, reset, failed saves and migration.',
  )
} finally {
  await rm(temporary, { recursive: true, force: true })
}
