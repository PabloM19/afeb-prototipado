import { ArrowDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Breadcrumbs, ExternalAction, InternalAction } from '../components/directory'
import { ProviderCard } from '../components/providers'
import { Eyebrow } from '../components/ui'
import { serviceProviders, providersSource } from '../data/providers'
import { usePageTitle } from '../routing'

export default function ProvidersPage() {
  usePageTitle('Proveedores recomendados')
  return (
    <div className="inner-page providers-page">
      <section className="providers-intro container" aria-labelledby="providers-title">
        <Breadcrumbs
          items={[{ label: 'Inicio', to: '/' }, { label: 'Proveedores recomendados' }]}
        />
        <Eyebrow>Especialistas en nuestro ecosistema</Eyebrow>
        <div className="providers-intro__grid">
          <h1 id="providers-title">
            Proveedores
            <br />
            recomendados.
          </h1>
          <div>
            <p className="providers-intro__lead">
              El conocimiento adecuado.
              <br />
              La conexión que suma.
            </p>
            <p>
              Servicios especializados para acompañar a las empresas del sector en sus decisiones y
              en su día a día.
            </p>
            <Link className="directory-intro__jump" to="#proveedores">
              Descubre a los especialistas
              <ArrowDown size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="providers-band" aria-label="Áreas de especialización">
        <div className="container providers-band__inner">
          <div>
            <Eyebrow light>Conexiones que aportan valor</Eyebrow>
            <p>
              Distintas necesidades.
              <br />
              <span>Especialistas que las entienden.</span>
            </p>
          </div>
          <ul>
            <li>Datos de producto</li>
            <li>Comercio electrónico</li>
            <li>Logística</li>
            <li>Planificación de stock</li>
          </ul>
        </div>
      </section>
      <section
        className="providers-selection container"
        id="proveedores"
        aria-labelledby="providers-selection-title"
      >
        <div className="providers-selection__heading">
          <div>
            <Eyebrow>Proveedores de servicios recomendados</Eyebrow>
            <h2 id="providers-selection-title">
              Experiencia especializada.
              <br />
              <span>Más posibilidades.</span>
            </h2>
          </div>
          <p>
            <strong>{serviceProviders.length.toString().padStart(2, '0')}</strong>
            <span>
              proveedores <br />
              en esta selección
            </span>
          </p>
        </div>
        <ul className="company-grid providers-grid">
          {serviceProviders.map((provider) => (
            <li key={provider.slug}>
              <ProviderCard provider={provider} />
            </li>
          ))}
        </ul>
        <div className="providers-complete">
          <p>
            Una selección del catálogo de proveedores recomendados por AFEB. <br />
            Explora sus fichas para conocer sus soluciones y contactar con sus equipos.
          </p>
          <ExternalAction href={providersSource} variant="text">
            Catálogo completo de AFEB
          </ExternalAction>
        </div>
      </section>
      <section className="providers-community">
        <div className="container">
          <div>
            <Eyebrow>Un mismo ecosistema</Eyebrow>
            <h2>
              Las empresas que hacen sector.
              <br />
              <span>Las conexiones que lo impulsan.</span>
            </h2>
          </div>
          <InternalAction to="/empresas-asociadas" variant="outline">
            Explorar empresas asociadas
          </InternalAction>
        </div>
      </section>
    </div>
  )
}
