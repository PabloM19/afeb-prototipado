import {
  companies,
  contacts,
  documents,
  legalResources,
  legalService,
  providers,
  reports,
  type Activity,
  type Role,
} from '@/data/fixtures'

export const searchAreas = [
  {
    id: 'companies',
    label: 'Empresas',
    path: '/socios',
    description: 'Empresas asociadas y especialidades',
    keywords: 'socios fabricantes marcas',
  },
  {
    id: 'activities',
    label: 'Actividades',
    path: '/eventos',
    description: 'Encuentros, formación y webinars',
    keywords: 'eventos agenda inscripciones ferias',
  },
  {
    id: 'people',
    label: 'Personas',
    path: '/directorio',
    description: 'Contactos de nuestra comunidad',
    keywords: 'directorio contactos equipo',
  },
  {
    id: 'reports',
    label: 'Informes',
    path: '/informes',
    description: 'Mercado, ventas y tendencias del sector',
    keywords: 'publicaciones estudios conocimiento',
  },
  {
    id: 'regulations',
    label: 'Normativa',
    path: '/normativa',
    description: 'Referencias legales y asesoría',
    keywords: 'regulación legislación jurídico contratos sostenibilidad',
  },
  {
    id: 'documents',
    label: 'Documentos',
    path: '/documentos',
    description: 'Estatutos, memorias y guías',
    keywords: 'archivos recursos institucionales',
  },
  {
    id: 'providers',
    label: 'Colaboradores',
    path: '/colaboradores',
    description: 'Proveedores y beneficios para socios',
    keywords: 'servicios ventajas descuentos',
  },
  {
    id: 'groups',
    label: 'Grupos de trabajo',
    path: '/grupos-trabajo',
    description: 'Acceso a tu espacio de grupos',
    keywords: 'comisiones miembros',
  },
  {
    id: 'account',
    label: 'Mi espacio',
    path: '/perfil',
    description: 'Perfil, empresa y preferencias',
    keywords: 'cuenta equipo datos comunicaciones',
  },
  {
    id: 'management',
    label: 'Gestión interna',
    path: '/gestion',
    description: 'Edición de actividades y solicitudes',
    keywords: 'administración editorial publicar',
  },
] as const

export type SearchAreaId = (typeof searchAreas)[number]['id']
export type SearchEntry = {
  id: string
  area: SearchAreaId
  title: string
  description: string
  meta: string
  path: string
  keywords?: string
  isArea?: boolean
}
export type SearchContext = {
  activities: Activity[]
  role: Role
  person: { name: string; position: string; department: string }
  business: { name: string; category: string; city: string }
}

export function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim()
}

export function getSearchAreas(role: Role) {
  return searchAreas.filter((area) => area.id !== 'management' || role === 'Gestor AFEB')
}

// Index the same content the current demo can display. No file body is indexed.
export function createSearchIndex(context: SearchContext): SearchEntry[] {
  return [
    ...getSearchAreas(context.role).map((area) => ({
      id: `area-${area.id}`,
      isArea: true,
      area: area.id,
      title: area.label,
      description: area.description,
      path: area.path,
      meta: 'Área del portal',
      keywords: area.keywords,
    })),
    ...companies.map((item) => ({
      id: `company-${item.id}`,
      area: 'companies' as const,
      title: item.name,
      description: item.description,
      meta: `${item.category} · ${item.location}`,
      path: `/detalles-socio?id=${item.id}`,
    })),
    ...context.activities
      .filter((item) => item.state !== 'Borrador' || context.role === 'Gestor AFEB')
      .map((item) => ({
        id: `activity-${item.id}`,
        area: 'activities' as const,
        title: item.title,
        description: item.description,
        meta: `${item.category} · ${item.mode} · ${item.state}`,
        path: `/detalles-evento?id=${item.id}`,
        keywords: `${item.place} ${item.date}`,
      })),
    ...contacts.map((item) => ({
      id: `person-${item.id}`,
      area: 'people' as const,
      title: item.name,
      description: item.position,
      meta: `${item.company} · ${item.department}`,
      path: `/detalles-equipo?id=${item.id}`,
    })),
    ...reports.map((item) => ({
      id: `report-${item.id}`,
      area: 'reports' as const,
      title: item.title,
      description: item.description,
      meta: `${item.category} · ${item.edition}`,
      keywords: item.files.map((file) => file.filename).join(' '),
      path: `/detalles-informe?id=${item.id}`,
    })),
    ...documents.map((item) => ({
      id: `document-${item.title}`,
      area: 'documents' as const,
      title: item.title,
      description: item.category,
      meta: `${item.subcategory} · ${item.year} · ${item.format}`,
      path: `/documentos?buscar=${encodeURIComponent(item.title)}`,
    })),
    {
      id: legalService.id,
      area: 'regulations',
      title: legalService.title,
      description: legalService.description,
      meta: 'Servicio observado',
      path: '/normativa',
      keywords: legalService.contactEmail,
    },
    ...legalResources.map((item) => ({
      id: `regulation-${item.id}`,
      area: 'regulations' as const,
      title: item.title,
      description: item.description,
      meta: 'Recurso de consulta',
      path: `/normativa?recurso=${item.id}`,
    })),
    ...providers.map((item) => ({
      id: `provider-${item.title}`,
      area: 'providers' as const,
      title: item.title,
      description: item.description,
      meta: `${item.category} · ${item.type === 'Benefits' ? 'Beneficio para socios' : 'Proveedor recomendado'}`,
      path: `/colaboradores?buscar=${encodeURIComponent(item.title)}&tipo=${item.type}`,
      keywords: item.benefit,
    })),
    {
      id: 'own-profile',
      area: 'account',
      title: 'Mi perfil',
      description: context.person.name,
      meta: 'Datos personales y preferencias',
      path: '/perfil',
      keywords: `${context.person.position} ${context.person.department} inscripciones comunicaciones`,
    },
    {
      id: 'own-company',
      area: 'account',
      title: 'Mi empresa',
      description: context.business.name,
      meta: 'Información, marcas y equipo',
      path: '/detalles-de-mi-empresa',
      keywords: `${context.business.category} ${context.business.city}`,
    },
    {
      id: 'service-cobranding',
      area: 'activities',
      title: 'Proponer una colaboración',
      description: 'Conecta una idea con otras empresas asociadas.',
      meta: 'Servicio · Cobranding',
      path: '/otras-acciones-cobranding',
    },
    {
      id: 'service-tenders',
      area: 'activities',
      title: 'Intereses en licitaciones',
      description: 'Selecciona las categorías sobre las que quieres recibir información.',
      meta: 'Servicio · Licitaciones',
      path: '/otras-acciones-licitaciones',
    },
  ]
}

export function findSearchResults(entries: SearchEntry[], query: string) {
  const normalized = normalizeSearch(query)
  if (!normalized) return []
  const terms = normalized.split(/\s+/)
  const matches = entries
    .map((entry) => {
      const title = normalizeSearch(entry.title)
      const meta = normalizeSearch(entry.meta)
      const area = searchAreas.find((item) => item.id === entry.area)!
      const text = normalizeSearch(
        `${entry.title} ${entry.meta} ${entry.description} ${entry.keywords ?? ''} ${area.label}`,
      )
      if (!terms.every((term) => text.includes(term))) return null
      const score =
        (title === normalized
          ? 100
          : title.startsWith(normalized)
            ? 60
            : title.includes(normalized)
              ? 40
              : 0) +
        terms.reduce(
          (sum, term) => sum + (title.includes(term) ? 10 : meta.includes(term) ? 5 : 1),
          0,
        )
      return { ...entry, score }
    })
    .filter((entry) => entry !== null)
  const areasWithContent = new Set(
    matches.filter((entry) => !entry.isArea).map((entry) => entry.area),
  )
  return matches
    .filter((entry) => !entry.isArea || !areasWithContent.has(entry.area))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'es'))
}
