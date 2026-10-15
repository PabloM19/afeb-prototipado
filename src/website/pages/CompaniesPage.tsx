import { ArrowDown, ArrowUpRight, ChevronDown, Search, X } from 'lucide-react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import {
  companies,
  directoryStatistics,
  directorySource,
  normaliseSearch,
  sectors,
} from '../data/companies'
import { providerPath, providersPath } from '../data/providers'
import { Breadcrumbs, CompanyCard, ExternalAction, InternalAction } from '../components/directory'
import { Eyebrow } from '../components/ui'
import { usePageTitle } from '../routing'

export default function CompaniesPage() {
  usePageTitle('Empresas asociadas')
  const [params, setParams] = useSearchParams()
  const location = useLocation()
  const query = params.get('q') ?? ''
  const sector = params.get('sector') ?? 'todos'
  const search = normaliseSearch(query)
  const selectedSector = sectors.some((item) => item.id === sector) ? sector : 'todos'
  const filtered = companies.filter(
    (company) =>
      (!search || normaliseSearch(`${company.name} ${company.legalName ?? ''}`).includes(search)) &&
      (selectedSector === 'todos' ||
        company.sectors.includes(selectedSector as (typeof company.sectors)[number])),
  )
  const hasFilters = query.length > 0 || selectedSector !== 'todos'
  const directoryUrl = location.pathname + location.search

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'todos') next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  return (
    <div className="inner-page directory-page">
      <section className="directory-intro container" aria-labelledby="directory-title">
        <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Empresas asociadas' }]} />
        <Eyebrow>La comunidad AFEB</Eyebrow>
        <div className="directory-intro__grid">
          <h1 id="directory-title">
            Empresas
            <br />
            asociadas.
          </h1>
          <div>
            <p className="directory-intro__lead">
              Las empresas que <br />
              impulsan nuestro sector.
            </p>
            <p>
              Fabricantes y marcas que comparten conocimiento, generan conexiones y construyen el
              futuro del bricolaje y la ferretería.
            </p>
            <a href="#directorio" className="directory-intro__jump">
              Conoce a los asociados
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className="directory-statistics" aria-label="Representatividad del sector">
        <div className="container">
          <Eyebrow light>La dimensión de nuestra comunidad</Eyebrow>
          <div className="directory-statistics__grid">
            {directoryStatistics.map((item) => (
              <div key={item.value}>
                <p className="directory-statistics__value">
                  {item.prefix && <span>{item.prefix}</span>}
                  {item.value}
                </p>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="directory-explorer container"
        id="directorio"
        aria-labelledby="explorer-title"
      >
        <div className="directory-explorer__heading">
          <div>
            <Eyebrow>Encuentra tu próxima conexión</Eyebrow>
            <h2 id="explorer-title">
              Una comunidad.
              <br />
              <span>Muchas especialidades.</span>
            </h2>
          </div>
          <p>
            Explora esta selección de empresas
            <br className="directory-desktop-break" /> que ya forman parte de AFEB.
          </p>
        </div>
        <form
          className="directory-filters"
          role="search"
          aria-label="Buscar empresas asociadas"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="directory-field">
            <label htmlFor="company-search">Buscar por nombre</label>
            <div className="directory-input">
              <Search size={19} strokeWidth={1.5} aria-hidden="true" />
              <input
                id="company-search"
                type="search"
                value={query}
                onChange={(event) => updateFilter('q', event.target.value)}
                placeholder="Nombre de la empresa…"
                autoComplete="off"
                aria-controls="company-results"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => updateFilter('q', '')}
                  aria-label="Borrar búsqueda"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <div className="directory-field">
            <label htmlFor="company-sector">Sector o actividad</label>
            <div className="directory-select">
              <select
                id="company-sector"
                value={selectedSector}
                onChange={(event) => updateFilter('sector', event.target.value)}
                aria-controls="company-results"
              >
                <option value="todos">Todos los sectores</option>
                {sectors.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} aria-hidden="true" />
            </div>
          </div>
        </form>
        <div className="directory-results-meta">
          <p role="status" aria-live="polite">
            <strong>{filtered.length}</strong> {filtered.length === 1 ? 'empresa' : 'empresas'}{' '}
            {hasFilters
              ? filtered.length === 1
                ? 'encontrada'
                : 'encontradas'
              : 'en esta selección'}
          </p>
          {hasFilters ? (
            <button
              className="directory-reset"
              type="button"
              onClick={() => setParams({}, { replace: true })}
            >
              Limpiar filtros
              <X size={15} aria-hidden="true" />
            </button>
          ) : (
            <span>De la A a la Z</span>
          )}
        </div>
        <div id="company-results">
          {filtered.length ? (
            <ul className="company-grid">
              {filtered.map((company) => (
                <li key={company.slug}>
                  <CompanyCard company={company} directoryUrl={directoryUrl} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="directory-empty">
              <Search size={30} strokeWidth={1.1} aria-hidden="true" />
              <h3>No hay empresas con estos criterios.</h3>
              <p>Prueba con otro nombre o explora todos los sectores de la selección.</p>
              <button
                className="action action--dark"
                type="button"
                onClick={() => setParams({}, { replace: true })}
              >
                <span>Ver todas las empresas</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className="directory-complete">
          <p>
            Esta es una selección de nuestra comunidad.
            <br />
            Encontrarás todas las empresas en el directorio oficial de AFEB.
          </p>
          <ExternalAction href={directorySource} variant="text">
            Directorio completo de AFEB
          </ExternalAction>
        </div>
      </section>
      <section className="provider-discovery">
        <div className="container provider-discovery__grid">
          <div>
            <Eyebrow>También en el ecosistema AFEB</Eyebrow>
            <h2>
              Más conexiones.
              <br />
              <span>Más posibilidades.</span>
            </h2>
            <p>
              Los proveedores de servicios recomendados aportan soluciones especializadas a las
              empresas del sector.
            </p>
            <InternalAction to={providersPath} variant="text">
              Ver proveedores recomendados
            </InternalAction>
          </div>
          <Link className="provider-discovery__card" to={providerPath('nexmart')}>
            <span className="mini-label">PROVEEDOR DE SERVICIOS RECOMENDADO</span>
            <img
              src="/media/companies/nexmart.webp"
              alt="Nexmart"
              width="230"
              height="103"
              loading="lazy"
            />
            <p>Comercio electrónico e integración de procesos.</p>
            <span>
              Conoce a NEXMART
              <ArrowUpRight size={20} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
