import { toast } from 'sonner'
/** Display failure before any UI confirmation; persistence commands throw on failure. */
export function localAction<T>(action: () => T): { ok: true; value: T } | { ok: false } {
  try {
    return { ok: true, value: action() }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'No se pudo guardar el cambio local')
    return { ok: false }
  }
}
