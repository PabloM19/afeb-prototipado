import { InternalAction } from '../components/directory'
import { Eyebrow } from '../components/ui'

export function NotFoundPage({ company = false }: { company?: boolean }) {
  return (
    <div className="inner-page inner-not-found container">
      <Eyebrow>AFEB · Página no encontrada</Eyebrow>
      <h1>{company ? 'Esta empresa no está en la selección.' : 'No encontramos esta página.'}</h1>
      <p>Puedes volver al directorio o seguir explorando la comunidad desde el inicio.</p>
      <div>
        <InternalAction to="/empresas-asociadas">Ver empresas asociadas</InternalAction>
        <InternalAction to="/" variant="outline">
          Volver al inicio
        </InternalAction>
      </div>
    </div>
  )
}
