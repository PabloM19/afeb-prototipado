import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import {
  Breadcrumbs,
  CompanyCard,
  CompanyLogo,
  displayWebsite,
  ExternalAction,
} from '../components/directory'
import { Eyebrow } from '../components/ui'
import { companies, getRelatedCompanies } from '../data/companies'
import { usePageTitle } from '../routing'
import { NotFoundPage } from './NotFoundPage'

export default function CompanyPage() {
  const { slug } = useParams()
  const company = companies.find((item) => item.slug === slug)
  const location = useLocation()
  const directoryUrl =
    (location.state as { directoryUrl?: string } | null)?.directoryUrl ?? '/empresas-asociadas'
  usePageTitle(company?.name ?? 'Empresa no encontrada')
  if (!company) return <NotFoundPage company />
  const related = getRelatedCompanies(company)

  return (
    <div className="inner-page company-page">
      <section className="company-intro container" aria-labelledby="company-title">
        <Breadcrumbs
          items={[
            { label: 'Inicio', to: '/' },
            { label: 'Empresas asociadas', to: directoryUrl },
            { label: company.name },
          ]}
        />
        <div className="company-intro__grid">
          <div>
            <Eyebrow>Empresa asociada a AFEB</Eyebrow>
            <h1 id="company-title">{company.name}</h1>
            <p className="company-intro__activity">{company.activity}</p>
            <p className="company-intro__summary">{company.description}</p>
            <ExternalAction href={company.website} />
          </div>
          <div className="company-identity">
            <span className="mini-label">LA COMUNIDAD AFEB</span>
            <CompanyLogo company={company} prominent />
            <div className="company-identity__footer">
              <span>Empresas que hacen sector.</span>
              <ArrowUpRight size={21} strokeWidth={1.3} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
      <section className="company-overview" aria-labelledby="company-about-title">
        <div className="container company-overview__grid">
          <div>
            <Eyebrow>Actividad y especialización</Eyebrow>
            <h2 id="company-about-title">
              Conoce a<br />
              <span>{company.name}.</span>
            </h2>
            <p>{company.overview}</p>
          </div>
          <div className="company-facts">
            <dl>
              {company.legalName && (
                <div className="company-facts__row">
                  <dt>Denominación</dt>
                  <dd>{company.legalName}</dd>
                </div>
              )}
              <div className="company-facts__row">
                <dt>Actividad principal</dt>
                <dd>{company.activitySummary ?? company.activity}</dd>
              </div>
              <div className="company-facts__row">
                <dt>Sitio web</dt>
                <dd>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    {displayWebsite(company.website)}
                    <ArrowUpRight size={15} aria-hidden="true" />
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                </dd>
              </div>
            </dl>
            {company.specialities.length > 0 && (
              <div className="company-specialities">
                <h3>Áreas de especialización</h3>
                <ul>
                  {company.specialities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="corporate-visit">
        <div className="container corporate-visit__inner">
          <div>
            <Eyebrow light>Directamente con la empresa</Eyebrow>
            <h2>
              Su actividad,
              <br />
              <span>con todos los detalles.</span>
            </h2>
            <p>Explora los productos y la información de {company.name} en su web.</p>
          </div>
          <div className="corporate-visit__action">
            <ExternalAction href={company.website} variant="lime" />
            <p>Web de la empresa · nueva pestaña</p>
          </div>
        </div>
      </section>
      <section className="company-related container" aria-labelledby="related-title">
        <div className="company-related__heading">
          <div>
            <Eyebrow>Otras empresas asociadas</Eyebrow>
            <h2 id="related-title">
              Sigue conociendo
              <br />
              <span>a la comunidad.</span>
            </h2>
          </div>
          <Link to={directoryUrl} className="action action--text">
            <ArrowLeft size={17} aria-hidden="true" />
            <span>Volver a todas las empresas</span>
          </Link>
        </div>
        <ul className="company-grid company-grid--related">
          {related.map((item) => (
            <li key={item.slug}>
              <CompanyCard company={item} directoryUrl={directoryUrl} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
