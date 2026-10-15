import { ArrowDown, ArrowLeft, ArrowUpRight, Globe2, Mail, Phone } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import {
  Breadcrumbs,
  displayWebsite,
  ExternalAction,
  InternalAction,
} from '../components/directory'
import { Eyebrow } from '../components/ui'
import { ProviderCard } from '../components/providers'
import { serviceProviders, providersPath, getRelatedProviders } from '../data/providers'
import { usePageTitle } from '../routing'
import { NotFoundPage } from './NotFoundPage'

export default function ProviderPage() {
  const { slug } = useParams()
  const provider = serviceProviders.find((item) => item.slug === slug)
  usePageTitle(provider ? `${provider.name} · Proveedor recomendado` : 'Proveedor no encontrado')
  if (!provider) return <NotFoundPage />

  return (
    <div className="inner-page provider-page">
      <section className="provider-intro container" aria-labelledby="provider-title">
        <Breadcrumbs
          items={[
            { label: 'Inicio', to: '/' },
            {
              label: 'Proveedores recomendados',
              to: providersPath,
            },
            { label: provider.name },
          ]}
        />
        <div className="provider-intro__grid">
          <div>
            <Eyebrow>Proveedor de servicios recomendado</Eyebrow>
            <h1 id="provider-title">{provider.name}</h1>
            <p className="provider-intro__speciality">{provider.speciality}.</p>
            <p className="provider-intro__summary">{provider.summary}</p>
            <div className="provider-intro__actions">
              <ExternalAction href={provider.website} />
              <Link to="#servicios" className="action action--text">
                <span>Explorar soluciones</span>
                <ArrowDown size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="provider-identity">
            <span className="mini-label">SOLUCIONES PARA EL SECTOR</span>
            <img src={provider.logo} alt={provider.name} width="280" height="126" />
            <div>
              {provider.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="provider-about">
        <div className="container provider-about__grid">
          <div>
            <Eyebrow>Conoce a {provider.name}</Eyebrow>
            <h2>
              {provider.aboutTitle[0]}
              <br />
              <span>{provider.aboutTitle[1]}</span>
            </h2>
          </div>
          <p>{provider.overview}</p>
        </div>
      </section>
      <section
        className="provider-services container"
        id="servicios"
        aria-labelledby="services-title"
      >
        <div className="provider-services__intro">
          <Eyebrow>{provider.servicesIntro.eyebrow}</Eyebrow>
          <h2 id="services-title">
            {provider.servicesIntro.title[0]}
            <br />
            <span>{provider.servicesIntro.title[1]}</span>
          </h2>
          <p>{provider.servicesIntro.description}</p>
          <Link to="#contacto" className="action action--text">
            <span>Habla con su equipo</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ol className="provider-services__list">
          {provider.services.map((service, index) => (
            <li key={service.name}>
              <span className="provider-service__number">0{index + 1}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="provider-contact" id="contacto" aria-labelledby="provider-contact-title">
        <div className="container">
          <div className="provider-contact__heading">
            <div>
              <Eyebrow light>Contacto comercial</Eyebrow>
              <h2 id="provider-contact-title">
                La siguiente conversación <br />
                empieza aquí.
              </h2>
            </div>
            <ExternalAction href={provider.website} variant="lime" />
          </div>
          <div className="provider-contact__grid">
            <a href={provider.phoneHref}>
              <Phone size={21} strokeWidth={1.4} aria-hidden="true" />
              <span>
                <small>Teléfono</small>
                <strong>{provider.phone}</strong>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={`mailto:${provider.email}`}>
              <Mail size={21} strokeWidth={1.4} aria-hidden="true" />
              <span>
                <small>Correo electrónico</small>
                <strong>{provider.email}</strong>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={provider.website} target="_blank" rel="noopener noreferrer">
              <Globe2 size={21} strokeWidth={1.4} aria-hidden="true" />
              <span>
                <small>Sitio web · nueva pestaña</small>
                <strong>{displayWebsite(provider.website)}</strong>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className="provider-related container" aria-labelledby="provider-related-title">
        <div className="provider-related__heading">
          <div>
            <Eyebrow>Más especialistas del ecosistema</Eyebrow>
            <h2 id="provider-related-title">
              Otras miradas.
              <br />
              <span>Nuevas posibilidades.</span>
            </h2>
          </div>
          <Link to={providersPath} className="action action--text">
            <ArrowLeft size={17} aria-hidden="true" />
            <span>Todos los proveedores</span>
          </Link>
        </div>
        <ul className="company-grid">
          {getRelatedProviders(provider.slug).map((item) => (
            <li key={item.slug}>
              <ProviderCard provider={item} />
            </li>
          ))}
        </ul>
      </section>
      <section className="provider-back provider-back--extended container">
        <div>
          <Eyebrow>Un mismo ecosistema</Eyebrow>
          <h2>
            Descubre a las empresas
            <br />
            <span>que forman AFEB.</span>
          </h2>
        </div>
        <InternalAction to="/empresas-asociadas" variant="outline">
          Explorar empresas asociadas
        </InternalAction>
      </section>
    </div>
  )
}
