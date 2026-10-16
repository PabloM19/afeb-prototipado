import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { Company } from '../data/companies'
import { companyPath } from '../data/companies'

type Crumb = { label: string; to?: string; external?: boolean }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="page-breadcrumbs" aria-label="Migas de pan">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {index > 0 && <ChevronRight size={12} aria-hidden="true" />}
            {item.to ? (
              item.external ? (
                <a href={item.to} target="_blank" rel="noopener noreferrer">
                  {item.label}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function CompanyLogo({
  company,
  prominent = false,
}: {
  company: Company
  prominent?: boolean
}) {
  return (
    <div className={`company-brand${prominent ? ' company-brand--prominent' : ''}`}>
      <img src={company.logo} alt={company.logoAlt ?? company.name} width="80" height="80" />
      {company.logoNote && <span className="company-brand__note">{company.logoNote}</span>}
    </div>
  )
}

export function CompanyCard({
  company,
  directoryUrl = '/empresas-asociadas',
}: {
  company: Company
  directoryUrl?: string
}) {
  return (
    <Link
      className="company-card"
      to={companyPath(company.slug)}
      state={{ directoryUrl }}
      aria-label={`Ver empresa: ${company.name}`}
    >
      <div className="company-card__brand">
        <CompanyLogo company={company} />
        <span className="company-card__corner" aria-hidden="true">
          <ArrowUpRight size={19} strokeWidth={1.4} />
        </span>
      </div>
      <div className="company-card__body">
        <span className="company-card__activity">{company.activity}</span>
        <h3>{company.name}</h3>
        {company.legalName && company.legalName.trim() !== company.name.trim() && (
          <p className="company-card__legal">{company.legalName}</p>
        )}
        <p className="company-card__description">{company.description}</p>
      </div>
      <span className="company-card__action">
        Ver empresa
        <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </Link>
  )
}

export function InternalAction({
  to,
  children,
  variant = 'dark',
  state,
}: {
  to: string
  children: ReactNode
  variant?: 'dark' | 'lime' | 'outline' | 'text'
  state?: { directoryUrl: string }
}) {
  return (
    <Link to={to} state={state} className={`action action--${variant}`}>
      <span>{children}</span>
      <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
    </Link>
  )
}

export function ExternalAction({
  href,
  children = 'Visitar sitio web',
  variant = 'dark',
}: {
  href: string
  children?: ReactNode
  variant?: 'dark' | 'lime' | 'outline' | 'text'
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`action action--${variant}`}
    >
      <span>
        {children}
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </span>
      <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
    </a>
  )
}

export function displayWebsite(url: string) {
  return new URL(url).hostname.replace(/^www\./, '')
}
