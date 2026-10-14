import type { Activity } from '@/data/fixtures'
import { simulationDate } from '@/data/mock-db'

/** Local simulation rules, not a claim about the private portal's backend. */
export function canRegisterInMock(activity: Activity, date = simulationDate) {
  if (activity.state !== 'Abierta') return false
  if (!activity.date || !activity.end || !activity.deadline || activity.price === null) return false
  if (activity.deadline < date) return false
  // An unknown source capacity stays unknown. A known local capacity can be enforced.
  if (
    activity.capacity !== null &&
    activity.attendees !== null &&
    activity.attendees >= activity.capacity
  )
    return false
  return true
}
