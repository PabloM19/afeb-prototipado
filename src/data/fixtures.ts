export type Role = 'Socio' | 'SocioAdmin' | 'Gestor AFEB'
export type Activity = {
  id: string
  title: string
  category: string
  date: string
  end: string
  deadline: string
  place: string
  mode: string
  state: 'Abierta' | 'Finalizada' | 'Borrador' | 'Cerrada'
  price: number
  attendees: number
  capacity: number
  description: string
}
export const activities: Activity[] = [
  {
    id: 'encuentro',
    title: 'El futuro se construye juntos.',
    category: 'Encuentros con distribución',
    date: '2026-10-22T09:30',
    end: '2026-10-22T14:00',
    deadline: '2026-10-20',
    place: 'Barcelona · Espacio de encuentro AFEB',
    mode: 'Presencial',
    state: 'Abierta',
    price: 75,
    attendees: 42,
    capacity: 60,
    description:
      'Una mañana para conectar con la distribución, compartir perspectivas y abrir nuevas oportunidades para el sector del bricolaje y la ferretería. Una jornada de conversaciones, ideas y relaciones que suman.',
  },
  {
    id: 'webinar',
    title: 'Del dato a la decisión: nuevas claves del mercado',
    category: 'Formación / Webinars',
    date: '2026-10-28T10:00',
    end: '2026-10-28T11:00',
    deadline: '2026-10-27',
    place: 'Online · Enlace disponible tras la inscripción',
    mode: 'Webinar',
    state: 'Abierta',
    price: 0,
    attendees: 68,
    capacity: 150,
    description:
      'Descubre cómo interpretar los indicadores del sector y convertir la información en decisiones para tu empresa. Sesión práctica con preguntas y materiales de apoyo.',
  },
  {
    id: 'export',
    title: 'Club Export: oportunidades en el mercado europeo',
    category: 'Club Export',
    date: '2026-11-05T10:00',
    end: '2026-11-05T12:00',
    deadline: '2026-11-03',
    place: 'Madrid · Sede de encuentro AFEB',
    mode: 'Presencial',
    state: 'Abierta',
    price: 0,
    attendees: 24,
    capacity: 40,
    description:
      'Compartimos experiencias de internacionalización, tendencias de distribución y herramientas para abrir nuevos mercados.',
  },
  {
    id: 'normativa',
    title: 'Envases y sostenibilidad: qué cambia para tu empresa',
    category: 'Normativa',
    date: '2026-09-24T10:00',
    end: '2026-09-24T11:30',
    deadline: '2026-09-23',
    place: 'Online',
    mode: 'Webinar',
    state: 'Finalizada',
    price: 0,
    attendees: 86,
    capacity: 150,
    description:
      'Una revisión de las obligaciones de envases y de las cuestiones prácticas que afectan a fabricantes y distribuidores.',
  },
  {
    id: 'foro',
    title: 'Foro de innovación y competitividad 2027',
    category: 'Asambleas / Foros',
    date: '2027-01-21T09:00',
    end: '2027-01-21T15:00',
    deadline: '2027-01-18',
    place: 'Por confirmar',
    mode: 'Presencial',
    state: 'Borrador',
    price: 90,
    attendees: 0,
    capacity: 120,
    description: 'Propuesta de encuentro anual pendiente de validación editorial.',
  },
  {
    id: 'gt',
    title: 'Grupo de trabajo: transformación digital',
    category: 'Grupos de trabajo',
    date: '2026-10-08T10:00',
    end: '2026-10-08T12:00',
    deadline: '2026-10-06',
    place: 'Online',
    mode: 'Webinar',
    state: 'Cerrada',
    price: 0,
    attendees: 18,
    capacity: 20,
    description: 'Sesión de trabajo sobre procesos y herramientas digitales para el sector.',
  },
]
export const activityCategories = [
  'Todas',
  'Asambleas / Foros',
  'Club Export',
  'Encuentros con distribución',
  'Ferias',
  'Formación / Webinars',
  'Grupos de trabajo',
  'GT 2025',
  'Lobby',
  'Normativa',
  'Otros',
]
export type Company = {
  id: string
  name: string
  initials: string
  category: string
  location: string
  description: string
  members: number
}
export const companies: Company[] = [
  {
    id: 'nord',
    name: 'Nord Tools',
    initials: 'NT',
    category: 'Herramientas',
    location: 'Barcelona',
    members: 4,
    description: 'Herramientas y soluciones para profesionales y amantes del bricolaje.',
  },
  {
    id: 'forma',
    name: 'Forma Hábitat',
    initials: 'FH',
    category: 'Decoración',
    location: 'Valencia',
    members: 3,
    description: 'Diseño funcional para transformar los espacios del día a día.',
  },
  {
    id: 'terra',
    name: 'Terra Garden',
    initials: 'TG',
    category: 'Jardinería',
    location: 'Madrid',
    members: 5,
    description: 'Productos y soluciones para un jardín más sostenible.',
  },
  {
    id: 'fix',
    name: 'Fix Pro',
    initials: 'FP',
    category: 'Fijación',
    location: 'Bilbao',
    members: 2,
    description: 'Especialistas en sistemas de fijación y montaje.',
  },
  {
    id: 'lumen',
    name: 'Lumen Home',
    initials: 'LH',
    category: 'Iluminación',
    location: 'Zaragoza',
    members: 3,
    description: 'Iluminación eficiente para hogares y espacios de trabajo.',
  },
  {
    id: 'aqua',
    name: 'Aqua Systems',
    initials: 'AS',
    category: 'Fontanería',
    location: 'Sevilla',
    members: 6,
    description: 'Tecnología y soluciones para la gestión responsable del agua.',
  },
  {
    id: 'materia',
    name: 'Materia',
    initials: 'M',
    category: 'Materiales de construcción',
    location: 'Girona',
    members: 4,
    description: 'Materiales de calidad para cada proyecto.',
  },
  {
    id: 'color',
    name: 'Color Studio',
    initials: 'CS',
    category: 'Pinturas',
    location: 'Alicante',
    members: 2,
    description: 'Recubrimientos y color para dar nueva vida a los espacios.',
  },
]
export const companyCategories = [
  'Todas',
  'Adhesivos',
  'Baño',
  'Cocina',
  'Decoración',
  'Electricidad',
  'Ferretería',
  'Fijación',
  'Fontanería',
  'Herramientas',
  'Iluminación',
  'Jardinería',
  'Materiales de construcción',
  'Mobiliario',
  'Ordenación',
  'Pinturas',
  'Protección laboral',
  'Puertas y ventanas',
  'Revestimientos',
  'Seguridad',
  'Suelos',
  'Ventilación',
  'Otros',
]
export const contacts = [
  {
    id: 'clara',
    name: 'Clara Martín',
    initials: 'CM',
    position: 'Directora comercial',
    company: 'Nord Tools',
    department: 'Comercial',
    email: 'clara@nord.example',
  },
  {
    id: 'marcos',
    name: 'Marcos Vidal',
    initials: 'MV',
    position: 'Responsable de exportación',
    company: 'Nord Tools',
    department: 'Exportación',
    email: 'marcos@nord.example',
  },
  {
    id: 'elena',
    name: 'Elena Roca',
    initials: 'ER',
    position: 'Directora de marketing',
    company: 'Forma Hábitat',
    department: 'Marketing',
    email: 'elena@forma.example',
  },
  {
    id: 'pablo',
    name: 'Pablo Torres',
    initials: 'PT',
    position: 'Director general',
    company: 'Terra Garden',
    department: 'Dirección',
    email: 'pablo@terra.example',
  },
  {
    id: 'ana',
    name: 'Ana Serra',
    initials: 'AS',
    position: 'Responsable de operaciones',
    company: 'Fix Pro',
    department: 'Operaciones',
    email: 'ana@fix.example',
  },
  {
    id: 'david',
    name: 'David Costa',
    initials: 'DC',
    position: 'Director comercial',
    company: 'Lumen Home',
    department: 'Comercial',
    email: 'david@lumen.example',
  },
]
export const reports = [
  {
    id: 'ventas',
    title: 'Evolución de ventas',
    category: 'Mercado',
    date: '2026-10-08',
    edition: '3.er trimestre 2026',
    description:
      'La visión trimestral del sector. Sigue la evolución de las ventas y compara tendencias para anticipar tus próximos pasos.',
    personal: false,
  },
  {
    id: 'distribucion',
    title: 'Mapa de la distribución',
    category: 'Sectoriales',
    date: '2026-09-30',
    edition: 'Edición 2026',
    description:
      'Una radiografía de los principales operadores, puntos de venta y oportunidades de distribución.',
    personal: true,
  },
  {
    id: 'internacional',
    title: 'Panorama internacional del bricolaje',
    category: 'Internacionales',
    date: '2026-09-15',
    edition: 'Septiembre 2026',
    description:
      'Tendencias y perspectivas de los mercados europeos para orientar tu estrategia de exportación.',
    personal: false,
  },
  {
    id: 'consumidor',
    title: 'El consumidor y el hogar',
    category: 'Sectoriales',
    date: '2026-08-20',
    edition: 'Edición 2026',
    description: 'Hábitos de compra, nuevos perfiles y prioridades en la mejora del hogar.',
    personal: false,
  },
]
export const documents = [
  {
    title: 'Estatutos de la asociación',
    category: 'Estatutos / Reglamentos / Normativa',
    subcategory: 'Estatutos',
    year: '2026',
    format: 'PDF',
  },
  {
    title: 'Reglamento interno AFEB',
    category: 'Estatutos / Reglamentos / Normativa',
    subcategory: 'Reglamento',
    year: '2026',
    format: 'PDF',
  },
  {
    title: 'Código de buenas prácticas',
    category: 'Código de buenas prácticas',
    subcategory: 'Código',
    year: '2025',
    format: 'PDF',
  },
  {
    title: 'Memoria de actividades 2025',
    category: 'Memoria',
    subcategory: 'Memoria anual',
    year: '2025',
    format: 'PDF',
  },
  {
    title: 'Guía de contratación con la distribución',
    category: 'Informes jurídicos',
    subcategory: 'Contratos',
    year: '2026',
    format: 'DOC',
  },
  {
    title: 'Guía de internacionalización',
    category: 'Internacionalización',
    subcategory: 'Exportación',
    year: '2026',
    format: 'PDF',
  },
]
export const providers = [
  {
    title: 'Estudio Legal Asociado',
    category: 'Asesoría jurídica',
    type: 'Proveedores',
    description:
      'Acompañamiento jurídico especializado en relaciones con la distribución y contratos comerciales.',
    benefit: 'Primera consulta de orientación incluida.',
  },
  {
    title: 'Logística Conecta',
    category: 'Logística',
    type: 'Proveedores',
    description:
      'Soluciones logísticas para fabricantes: transporte, almacenaje y distribución nacional.',
    benefit: 'Condiciones preferentes para empresas asociadas.',
  },
  {
    title: 'Digital Partners',
    category: 'Tecnología',
    type: 'Proveedores',
    description:
      'Consultoría digital, automatización y herramientas para mejorar la gestión de tu empresa.',
    benefit: 'Diagnóstico inicial sin coste.',
  },
  {
    title: 'Espacios de encuentro',
    category: 'Eventos',
    type: 'Benefits',
    description: 'Espacios de trabajo y salas para tus reuniones, presentaciones y eventos.',
    benefit: 'Tarifa de socio en reservas de salas.',
  },
  {
    title: 'Formación para tu equipo',
    category: 'Formación',
    type: 'Benefits',
    description: 'Programas de formación en gestión, marketing y ventas adaptados al sector.',
    benefit: 'Descuento en programas seleccionados.',
  },
]
export const formatDate = (
  value: string,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
) => new Intl.DateTimeFormat('es-ES', options).format(new Date(value))
