import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState, Status } from '@/components/shared'
import { mockDb } from '@/data/mock-db'
import { useStore } from '@/lib/store'
import { requestKindLabels } from '@/lib/mock-selectors'
import { formatDate } from '@/data/fixtures'
export function RequestList() {
  const store = useStore()
  return store.requests.filter((r) => r.companyId === mockDb.account.companyId).length ? (
    <div>
      {store.requests
        .filter((r) => r.companyId === mockDb.account.companyId)
        .map((r) => (
          <div className="demo-request" key={r.id}>
            <div>
              <span className="small-label">{requestKindLabels[r.kind]}</span>
              <strong>{r.subject}</strong>
              <span>
                {r.createdAt ? formatDate(r.createdAt) : 'Fecha no recogida'} · {r.history.length}{' '}
                cambios locales
              </span>
            </div>
            <Status>{r.status}</Status>
            <Button variant="outline" asChild>
              <Link to={`/solicitudes/${r.id}`}>
                Ver solicitud
                <ArrowUpRight size={15} />
              </Link>
            </Button>
          </div>
        ))}
    </div>
  ) : (
    <EmptyState
      title="Sin solicitudes locales"
      description="Las altas, invitaciones, asesorías y propuestas aparecerán aquí con sus datos completos."
    />
  )
}
