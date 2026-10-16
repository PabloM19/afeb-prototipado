export type SectorId = 'industria' | 'herramientas' | 'ferreteria' | 'jardin' | 'pinturas'

export type Company = {
  slug: string
  name: string
  legalName?: string
  logo: string
  logoAlt?: string
  logoNote?: string
  sectors: SectorId[]
  activity: string
  activitySummary?: string
  description: string
  overview: string
  specialities: string[]
  website: string
  sources: string[]
}

export const sectors: { id: SectorId; label: string }[] = [
  { id: 'industria', label: 'Industria y consumo' },
  { id: 'herramientas', label: 'Herramientas y construcción' },
  { id: 'ferreteria', label: 'Ferretería y mantenimiento' },
  { id: 'jardin', label: 'Jardín' },
  { id: 'pinturas', label: 'Pinturas y decoración' },
]

export const directorySource = 'https://brico-afeb.com/empresas-asociadas/'

// Cifras publicadas por AFEB, consultadas el 15/10/2026. Pendientes de
// confirmación definitiva del cliente. No sustituyen las cifras de la home.
export const directoryStatistics = [
  { value: '175', label: 'empresas asociadas' },
  { value: '5.000', prefix: '+', label: 'millones de euros de negocio' },
  { value: '15.000', prefix: '+', label: 'puestos de trabajo' },
]

export const companies: Company[] = [
  {
    slug: '3m',
    name: '3M España',
    legalName: '3M España, S.L.',
    logo: '/media/companies/3m.webp',
    sectors: ['industria'],
    activity: 'Industria y productos de consumo',
    activitySummary: 'Industria y consumo',
    description: 'Soluciones para la industria, la seguridad y los productos de consumo.',
    overview:
      '3M trabaja en el desarrollo, la fabricación y la comercialización de productos para ámbitos industriales y de consumo. Su oferta para profesionales incluye soluciones de fabricación, construcción y seguridad, con aplicaciones en la unión de materiales, el tratamiento de superficies y la protección.',
    specialities: [
      'Soluciones industriales',
      'Seguridad y protección',
      'Construcción',
      'Bienes de consumo',
    ],
    website: 'https://www.3m.com.es/3M/es_ES/empresa-es/',
    sources: [directorySource, 'https://www.3m.com.es/3M/es_ES/empresa-es/'],
  },
  {
    slug: 'akzo-nobel',
    name: 'Akzo Nobel Coatings',
    legalName: 'Akzo Nobel Coatings, S.L.',
    logo: '/media/companies/akzo-nobel.webp',
    sectors: ['pinturas'],
    activity: 'Pinturas y decoración',
    activitySummary: 'Pinturas',
    description: 'Pinturas y soluciones para la decoración de superficies.',
    overview:
      'Akzo Nobel Coatings desarrolla su actividad en el sector de la pintura. La oferta de Bruguer incluye pinturas para interior y exterior, esmaltes y productos para la decoración de superficies y muebles.',
    specialities: ['Pinturas para interior', 'Pinturas para exterior', 'Decoración', 'Esmaltes'],
    website: 'https://www.bruguer.es/es/',
    sources: [directorySource, 'https://www.bruguer.es/es/productos'],
  },
  {
    slug: 'bellota',
    name: 'Bellota',
    legalName: 'Bellota Herramientas, S.L.U.',
    logo: '/media/companies/bellota.svg',
    sectors: ['herramientas', 'ferreteria', 'jardin'],
    activity: 'Herramientas, construcción y jardín',
    activitySummary: 'Herramientas',
    description: 'Herramientas para la construcción, la ferretería y el trabajo en el jardín.',
    overview:
      'Bellota es una empresa fabricante de herramientas. Dentro de la comunidad AFEB, su actividad abarca la construcción, la ferretería, las herramientas y el jardín: distintos entornos de trabajo con un punto en común, la herramienta manual.',
    specialities: ['Herramientas manuales', 'Construcción', 'Ferretería', 'Jardín'],
    website: 'https://www.bellota.com/',
    sources: [directorySource, 'https://www.bellota.com/'],
  },
  {
    slug: 'bosch',
    name: 'Bosch',
    legalName: 'Robert Bosch España',
    logo: '/media/companies/bosch.svg',
    sectors: ['herramientas'],
    activity: 'Herramientas eléctricas',
    description: 'Herramientas eléctricas, accesorios y soluciones de medición para profesionales.',
    overview:
      'Robert Bosch España figura en AFEB en la actividad de herramientas eléctricas. Bosch Professional ofrece herramientas a batería y con cable, equipos de medición y accesorios para aplicaciones como perforar, cortar, atornillar o lijar.',
    specialities: ['Herramientas eléctricas', 'Herramientas a batería', 'Medición', 'Accesorios'],
    website: 'https://www.bosch-professional.com/es/es/',
    sources: [directorySource, 'https://www.bosch-professional.com/es/es/'],
  },
  {
    slug: 'compo',
    name: 'COMPO',
    legalName: 'COMPO Iberia, S.L.',
    logo: '/media/companies/compo.webp',
    sectors: ['jardin'],
    activity: 'Jardín y cuidado de plantas',
    activitySummary: 'Jardín',
    description: 'Productos para el jardín y el cuidado de las plantas.',
    overview:
      'COMPO Iberia forma parte del sector de jardín dentro de AFEB. Su web reúne productos y consejos para el cuidado de plantas, desde la preparación del sustrato y la nutrición hasta el mantenimiento del césped.',
    specialities: ['Cuidado de plantas', 'Sustratos', 'Nutrición vegetal', 'Césped'],
    website: 'https://www.compo.es/',
    sources: [directorySource, 'https://www.compo.es/'],
  },
  {
    slug: 'rubi',
    name: 'RUBI',
    legalName: 'Germans Boada, S.A.',
    logo: '/media/companies/rubi.svg',
    sectors: ['herramientas'],
    activity: 'Herramientas para la colocación de cerámica',
    activitySummary: 'Herramientas para cerámica',
    description: 'Herramientas y maquinaria para la colocación y el mantenimiento de cerámica.',
    overview:
      'RUBI diseña, fabrica y distribuye herramientas y maquinaria para trabajar la cerámica. Su actividad acompaña las distintas fases de la colocación, con soluciones de corte, perforación e instalación de materiales cerámicos.',
    specialities: ['Corte de cerámica', 'Perforación', 'Colocación', 'Mantenimiento de cerámica'],
    website: 'https://www.rubi.com/es',
    sources: [directorySource, 'https://www.rubi.com/es'],
  },
  {
    slug: 'stanley-black-decker',
    name: 'Stanley Black & Decker',
    legalName: 'Stanley Black & Decker, S.A.U.',
    logo: '/media/black-decker.webp',
    logoAlt: 'BLACK+DECKER, marca de Stanley Black & Decker',
    logoNote: 'Marca del grupo: BLACK+DECKER',
    sectors: ['herramientas', 'ferreteria'],
    activity: 'Herramientas y ferretería',
    description: 'Herramientas y soluciones para el trabajo profesional y el hogar.',
    overview:
      'Stanley Black & Decker reúne marcas de herramientas, productos para exterior y soluciones industriales. Su inscripción en el directorio de AFEB comprende la ferretería, la fontanería y las herramientas.',
    specialities: ['Herramientas', 'Ferretería', 'Fontanería', 'Soluciones industriales'],
    website: 'https://www.stanleyblackanddecker.com/',
    sources: [directorySource, 'https://www.stanleyblackanddecker.com/'],
  },
  {
    slug: 'wd40',
    name: 'WD-40',
    legalName: 'WD-40 Company, LTD',
    logo: '/media/wd40.webp',
    sectors: ['ferreteria'],
    activity: 'Ferretería y mantenimiento',
    activitySummary: 'Mantenimiento',
    description: 'Productos para lubricar, limpiar y proteger en tareas de mantenimiento.',
    overview:
      'WD-40 ofrece productos para el mantenimiento, la lubricación y la protección. Su catálogo incluye el Producto Multi-Uso y la gama WD-40 Specialist, con lubricantes, limpiadores y desengrasantes para distintas aplicaciones.',
    specialities: ['Lubricación', 'Limpieza', 'Protección', 'Mantenimiento'],
    website: 'https://wd40.es/',
    sources: [directorySource, 'https://wd40.es/producto/', 'https://wd40.es/faqs/'],
  },
]

export const companyPath = (slug: string) => `/empresas-asociadas/${slug}`

export function normaliseSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim()
}

export function getRelatedCompanies(company: Company) {
  return companies
    .filter((other) => other.slug !== company.slug)
    .sort(
      (a, b) =>
        Number(b.sectors.some((sector) => company.sectors.includes(sector))) -
        Number(a.sectors.some((sector) => company.sectors.includes(sector))),
    )
    .slice(0, 3)
}
