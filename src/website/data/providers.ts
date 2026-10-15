export type ServiceProvider = {
  slug: string
  name: string
  logo: string
  category: string
  tags: [string, string, string]
  speciality: string
  summary: string
  overview: string
  aboutTitle: [string, string]
  servicesIntro: { eyebrow: string; title: [string, string]; description: string }
  website: string
  phone: string
  phoneHref: string
  email: string
  services: { name: string; description: string }[]
  source: string
  additionalSources?: string[]
  checkedAt: string
}

export const serviceProviders: ServiceProvider[] = [
  {
    slug: 'nexmart',
    name: 'NEXMART',
    logo: '/media/companies/nexmart.webp',
    category: 'EDI e integración',
    tags: ['eBusiness', 'Integración', 'Canal digital'],
    speciality: 'Comercio electrónico e integración de procesos',
    summary:
      'Soluciones digitales que conectan a fabricantes, distribuidores y clientes a lo largo del proceso comercial.',
    overview:
      'Nexmart desarrolla soluciones de eBusiness para ferretería, bricolaje y suministro industrial. Integra el intercambio de información comercial y acompaña la relación entre fabricantes y distribuidores, desde los documentos y los pedidos hasta la conexión con el punto de venta.',
    aboutTitle: ['Conectar procesos.', 'Abrir posibilidades.'],
    servicesIntro: {
      eyebrow: 'Soluciones de eBusiness',
      title: ['Cada conexión,', 'un paso más sencillo.'],
      description:
        'Del intercambio de documentos a la gestión de catálogos y la conexión con el punto de venta.',
    },
    website: 'https://www.nexmart.com/es/',
    phone: '+34 943 309 286',
    phoneHref: 'tel:+34943309286',
    email: 'sales-es@nexmart.com',
    services: [
      {
        name: 'EDI Connect',
        description:
          'Intercambio electrónico de pedidos, albaranes y facturas entre fabricantes y sus socios comerciales, también en operaciones internacionales.',
      },
      {
        name: 'Business App',
        description:
          'Pedidos y presupuestos durante las visitas comerciales, con acceso al catálogo, precios y disponibilidad mediante integración con los sistemas de la empresa.',
      },
      {
        name: 'Documents to EDI',
        description:
          'Convierte pedidos recibidos por correo en PDF, Word o CSV al formato del ERP, combinando reconocimiento automático y revisión humana.',
      },
      {
        name: 'Retail Connect',
        description:
          'Conecta el botón «Dónde comprar» del fabricante con los distribuidores que disponen del producto, en tienda física u online.',
      },
      {
        name: 'Data Engine',
        description:
          'Gestiona y distribuye datos de catálogo, con clasificación en estándares como ETIM y eClass y enriquecimiento de contenidos.',
      },
    ],
    source: 'https://brico-afeb.com/afeb-recomienda/nexmart/',
    checkedAt: '2026-10-15',
  },
  {
    slug: 'daterium-system',
    name: 'Daterium System',
    logo: '/media/providers/daterium-system.webp',
    category: 'Gestión de datos',
    tags: ['Catálogos', 'Datos', 'Consultoría'],
    speciality: 'Datos de producto que conectan fabricantes y distribuidores',
    summary:
      'Información de producto estructurada para el sector de ferretería, suministro y acondicionamiento del hogar.',
    overview:
      'Daterium System centraliza la información de producto para facilitar su intercambio entre fabricantes y distribuidores. Combina su plataforma de datos con servicios de consultoría para organizar los procesos de digitalización y mejorar la calidad de la información.',
    aboutTitle: ['Información organizada.', 'Conexiones más sencillas.'],
    servicesIntro: {
      eyebrow: 'Gestión de información de producto',
      title: ['El dato adecuado,', 'donde se necesita.'],
      description:
        'Una base común para compartir catálogos, cuidar la calidad del dato y ordenar los procesos digitales.',
    },
    website: 'https://www.dateriumsystem.com/',
    phone: '+34 916 256 238',
    phoneHref: 'tel:+34916256238',
    email: 'info@dateriumsystem.com',
    services: [
      {
        name: 'Daterium Data Product',
        description:
          'Centralización de la información de producto y control de su distribución entre fabricantes y distribuidores.',
      },
      {
        name: 'Calidad del dato',
        description:
          'Homogeneización de contenidos e informes de completitud, consistencia y coherencia de la información.',
      },
      {
        name: 'Activos digitales',
        description:
          'Integración de imágenes, documentos y vídeos junto a los datos del catálogo, con actualizaciones individuales o en masa.',
      },
      {
        name: 'Daterium Consulting',
        description:
          'Consultoría de procesos digitales, definición de responsabilidades y apoyo en la selección e integración de sistemas PIM y DAM.',
      },
    ],
    source: 'https://brico-afeb.com/afeb-recomienda/daterium-system/',
    additionalSources: [
      'https://www.dateriumsystem.com/',
      'https://www.dateriumsystem.com/front/contacto',
    ],
    checkedAt: '2026-10-15',
  },
  {
    slug: 'dachser-diy-logistics',
    name: 'DACHSER DIY Logistics',
    logo: '/media/providers/dachser-diy-logistics.webp',
    category: 'Logística y transporte',
    tags: ['Transporte', 'Almacenes', 'Distribución'],
    speciality: 'Logística especializada en bricolaje, decoración y jardinería',
    summary:
      'Soluciones de transporte y logística que acompañan al producto desde el proveedor hasta el punto de venta y el consumidor.',
    overview:
      'DACHSER DIY Logistics adapta el aprovisionamiento, el almacenamiento y la distribución a las necesidades del sector del bricolaje, la decoración y la jardinería. Integra los flujos físicos de mercancías con la información necesaria para gestionar la cadena de suministro.',
    aboutTitle: ['Cada entrega,', 'parte de una conexión.'],
    servicesIntro: {
      eyebrow: 'Logística para el sector',
      title: ['Del origen,', 'al punto de venta.'],
      description:
        'Transporte, almacenamiento y servicios que conectan las distintas etapas de la distribución.',
    },
    website: 'https://www.dachser.es/es/diy-logistics-102',
    phone: '+34 671 080 938',
    phoneHref: 'tel:+34671080938',
    email: 'joaquim.lopez@es.dachser.com',
    services: [
      {
        name: 'Aprovisionamiento y distribución',
        description:
          'Conexión con las redes de transporte terrestre, aéreo y marítimo para el movimiento de productos.',
      },
      {
        name: 'Almacenamiento',
        description:
          'Soluciones de almacén integradas en la red logística, con procesos estandarizados y sistemas de gestión.',
      },
      {
        name: 'Servicios de valor añadido',
        description:
          'Operaciones como control de calidad, montaje, embalaje y etiquetado, adaptadas a las necesidades de cada cliente.',
      },
      {
        name: 'eLogistics',
        description:
          'Herramientas de información para aportar visibilidad y gestionar los procesos de la cadena de suministro.',
      },
      {
        name: 'Logística en tienda y B2C',
        description:
          'Servicios en el punto de venta y entregas al consumidor, con opciones específicas según la operación.',
      },
    ],
    source: 'https://brico-afeb.com/afeb-recomienda/dachser-diy-logistics/',
    additionalSources: ['https://www.dachser.es/es/diy-logistics-102'],
    checkedAt: '2026-10-15',
  },
  {
    slug: 'slimstock',
    name: 'Slimstock',
    logo: '/media/providers/slimstock.webp',
    category: 'Planificación de la cadena de suministro',
    tags: ['Demanda', 'Inventario', 'Reposición'],
    speciality: 'Planificación de la demanda y optimización del inventario',
    summary:
      'Software y conocimiento especializado para coordinar las decisiones de stock, surtido y reaprovisionamiento.',
    overview:
      'Slimstock desarrolla Slim4, una plataforma para planificar la cadena de suministro. Su propuesta integra la previsión de la demanda, la gestión del inventario y el reaprovisionamiento, junto con procesos de planificación que conectan las decisiones comerciales y operativas.',
    aboutTitle: ['Anticipar la demanda.', 'Decidir con perspectiva.'],
    servicesIntro: {
      eyebrow: 'Planificación con Slim4',
      title: ['El stock necesario,', 'en el momento adecuado.'],
      description:
        'Una visión compartida para planificar la demanda, el inventario y el suministro.',
    },
    website: 'https://www.slimstock.com/es/',
    phone: '+34 629 266 506',
    phoneHref: 'tel:+34629266506',
    email: 'n.padros@slimstock.com',
    services: [
      {
        name: 'Previsión de la demanda',
        description:
          'Herramientas para anticipar necesidades y coordinar la planificación de la demanda de productos.',
      },
      {
        name: 'Optimización del inventario',
        description:
          'Gestión de los niveles de stock y del surtido para equilibrar disponibilidad e inversión en existencias.',
      },
      {
        name: 'Reaprovisionamiento',
        description:
          'Planificación y automatización de la reposición de stock dentro de la cadena de suministro.',
      },
      {
        name: 'Planificación integrada',
        description:
          'Soporte a los procesos S&OE, S&OP e IBP para conectar las decisiones operativas y de negocio.',
      },
    ],
    source: 'https://brico-afeb.com/afeb-recomienda/slimstock/',
    additionalSources: ['https://www.slimstock.com/es/'],
    checkedAt: '2026-10-15',
  },
]

export const providerPath = (slug: string) => `/proveedores-recomendados/${slug}`
export const providersPath = '/proveedores-recomendados'
export const providersSource = 'https://brico-afeb.com/afeb-recomienda/'

export const getRelatedProviders = (slug: string) =>
  serviceProviders.filter((provider) => provider.slug !== slug).slice(0, 3)
