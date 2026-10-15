import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { providerPath, type ServiceProvider } from '../data/providers'

export function ProviderCard({ provider }: { provider: ServiceProvider }) {
  return (
    <Link
      className="company-card provider-card"
      to={providerPath(provider.slug)}
      aria-label={`Ver proveedor: ${provider.name}`}
    >
      <div className="company-card__brand">
        <img src={provider.logo} alt={provider.name} width="230" height="118" />
        <span className="company-card__corner" aria-hidden="true">
          <ArrowUpRight size={19} strokeWidth={1.4} />
        </span>
      </div>
      <div className="company-card__body">
        <span className="company-card__activity">{provider.category}</span>
        <h3>{provider.name}</h3>
        <p className="company-card__description">{provider.summary}</p>
      </div>
      <span className="company-card__action">
        Ver proveedor
        <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </Link>
  )
}
