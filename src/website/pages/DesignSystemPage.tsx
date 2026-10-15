import { useEffect, useLayoutEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Check,
  Plus,
  Minus,
  Download,
  Copy,
  Mail,
  Phone,
  Globe2,
  CalendarDays,
  Users,
  FileText,
  Play,
  Info,
  CircleCheck,
  TriangleAlert,
} from 'lucide-react'
import { Badge, Button, Tabs } from '../components/system'
import { Breadcrumbs, CompanyCard, InternalAction } from '../components/directory'
import { ProviderCard } from '../components/providers'
import { Eyebrow } from '../components/ui'
import { companies } from '../data/companies'
import { serviceProviders } from '../data/providers'
import tokens from '../data/designTokens.generated.json'
import assets from '../data/designAssets.generated.json'
import { usePageTitle } from '../routing'
import {
  ButtonPlayground,
  ChipsPlayground,
  FeedbackPlayground,
  FontPlayground,
  FormPlayground,
  GridPlayground,
  LayersPlayground,
  NavigationPlayground,
  TablePlayground,
} from './design-system/demos'
import './design-system/guide.css'

const chapters = [
  ['identidad', 'Identidad'],
  ['color', 'Color'],
  ['tipografia', 'Tipografía'],
  ['reticula', 'Retícula y espacio'],
  ['superficies', 'Bordes e interacción'],
  ['acciones', 'Botones e iconos'],
  ['navegacion', 'Chips y navegación'],
  ['formularios', 'Formularios'],
  ['tarjetas', 'Tarjetas y listados'],
  ['estados', 'Estados y feedback'],
  ['capas', 'Capas y contenido'],
  ['patrones', 'Patrones de página'],
  ['assets', 'Biblioteca de assets'],
  ['implementacion', 'Implementación'],
]
const iconSet = [
  ['ArrowUpRight', ArrowUpRight],
  ['ArrowRight', ArrowRight],
  ['ArrowDown', ArrowDown],
  ['ArrowLeft', ArrowLeft],
  ['Search', Search],
  ['Menu', Menu],
  ['X', X],
  ['ChevronDown', ChevronDown],
  ['ChevronRight', ChevronRight],
  ['Check', Check],
  ['Plus', Plus],
  ['Minus', Minus],
  ['Download', Download],
  ['Copy', Copy],
  ['Mail', Mail],
  ['Phone', Phone],
  ['Globe2', Globe2],
  ['CalendarDays', CalendarDays],
  ['Users', Users],
  ['FileText', FileText],
  ['Play', Play],
  ['Info', Info],
  ['CircleCheck', CircleCheck],
  ['TriangleAlert', TriangleAlert],
] as const
const photography = [
  {
    src: '/media/hero-tools.webp',
    title: 'Herramientas y materiales',
    size: '1080 × 1440',
    use: 'Hero · recorte editorial',
  },
  {
    src: '/media/foro-verano.webp',
    title: 'Foro de Verano · 2025',
    size: '624 × 300',
    use: 'Comunidad y actividades',
  },
  {
    src: '/media/foro-invierno.webp',
    title: 'Foro de Invierno · 2025',
    size: '623 × 300',
    use: 'Archivo de actividades',
  },
  {
    src: '/media/grupo-trabajo.webp',
    title: 'Grupo de trabajo · 2025',
    size: '457 × 303',
    use: 'Conocimiento compartido',
  },
  {
    src: '/media/bauhaus.webp',
    title: 'Encuentro con Bauhaus · 2025',
    size: '462 × 305',
    use: 'Relaciones con la distribución',
  },
  {
    src: '/media/club-coloquio.webp',
    title: 'Coloquio Club Export · 2025',
    size: '619 × 341',
    use: 'Internacionalización',
  },
]
const logoAssets = [
  { name: 'AFEB', logo: '/media/afeb-logo.png' },
  { name: 'Club Export', logo: '/media/club-export.png' },
  ...companies.map((item) => ({ name: item.name, logo: item.logo, note: item.logoNote })),
  ...serviceProviders.map((item) => ({ name: item.name, logo: item.logo })),
]
const typeRows = [
  {
    name: 'Hero',
    token: '--text-hero',
    spec: '50–76 px base · 650 · 1.1',
    text: 'El sector avanza.',
    className: 'ds-type-hero',
  },
  {
    name: 'Título de sección',
    token: '--text-section',
    spec: '34–52 px base · 600 · 1.15',
    text: 'Somos comunidad.',
    className: 'ds-type-section',
  },
  {
    name: 'Título de tarjeta',
    token: '--text-card',
    spec: '22–28 px base · 600 · 1.25',
    text: 'Ideas que crecen.',
    className: 'ds-type-card',
  },
  {
    name: 'Lectura',
    token: '--text-body',
    spec: '16 px · 400 · 1.7',
    text: 'Compartimos conocimiento, creamos oportunidades.',
    className: 'ds-type-body',
  },
  {
    name: 'Acciones y apoyo',
    token: '--text-small',
    spec: '14 px · 650 / 400 · 1.5',
    text: 'Descubre todo lo que podemos hacer juntos.',
    className: 'ds-type-small',
  },
  {
    name: 'Rótulos',
    token: '--text-label',
    spec: '12 px · 700 · 1.6 · tracking .07em',
    text: 'LA COMUNIDAD AFEB',
    className: 'ds-type-label',
  },
]

function Chapter({
  id,
  title,
  intro,
  children,
  extension = false,
}: {
  id: string
  title: string
  intro: string
  children: ReactNode
  extension?: boolean
}) {
  const index = chapters.findIndex((item) => item[0] === id) + 1
  return (
    <section className="ds-chapter" id={id} aria-labelledby={`ds-${id}-title`}>
      <div className="ds-chapter__heading">
        <div>
          <span className="ds-chapter__number">{String(index).padStart(2, '0')} /</span>
          <h2 id={`ds-${id}-title`}>{title}</h2>
        </div>
        <Badge tone={extension ? 'neutral' : 'brand'}>{extension ? 'Extensión' : 'En uso'}</Badge>
      </div>
      <p className="ds-chapter__intro">{intro}</p>
      {children}
    </section>
  )
}
function Reference({ children }: { children: ReactNode }) {
  return (
    <p className="ds-reference">
      <FileText size={13} aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
function Code({ title, children }: { title: string; children: string }) {
  return (
    <details className="ds-code">
      <summary>
        {title}
        <ChevronDown size={16} aria-hidden="true" />
      </summary>
      <pre>
        <code>{children}</code>
      </pre>
    </details>
  )
}
function luminance(hex: string) {
  let value = hex.replace('#', '')
  if (value.length === 3) value = [...value].map((char) => char + char).join('')
  const rgb = [0, 2, 4]
    .map((i) => parseInt(value.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
}
function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

export default function DesignSystemPage() {
  usePageTitle('Sistema de diseño')
  const navigate = useNavigate()
  const [active, setActive] = useState('identidad')
  const [assetTab, setAssetTab] = useState('fotografias')
  const [toast, setToast] = useState('')
  const [copied, setCopied] = useState('')
  // The route is lazy loaded, so its anchor may not exist when navigation runs.
  useLayoutEffect(() => {
    if (window.location.hash) {
      document
        .getElementById(decodeURIComponent(window.location.hash.slice(1)))
        ?.scrollIntoView({ behavior: 'instant' })
    }
  }, [])
  useEffect(() => {
    let frame = 0
    const sections = [...document.querySelectorAll<HTMLElement>('.ds-chapter')]
    const update = () => {
      frame = 0
      let current = chapters[0][0]
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = section.id
        }
      })
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      setToast(`${label} copiado.`)
    } catch {
      setToast(`Selecciona y copia este valor: ${value}`)
    }
  }
  const contrastPairs = [
    { text: '#203c30', bg: '#fbfcf9', name: 'Tinta / Papel' },
    { text: '#ffffff', bg: '#153e30', name: 'Blanco / Bosque' },
    { text: '#103426', bg: '#b7d96c', name: 'Bosque profundo / Lima' },
    { text: '#536356', bg: '#fbfcf9', name: 'Secundario / Papel' },
    { text: '#ffffff', bg: '#87bc23', name: 'Blanco / Verde AFEB' },
  ]
  return (
    <div className="ds-page inner-page">
      <header className="ds-header">
        <div className="ds-header__inner">
          <Link to="/#inicio" className="ds-brand" aria-label="AFEB, volver a la web">
            <img src="/media/afeb-logo.png" alt="AFEB" width="48" height="40" />
            <span>
              Sistema de diseño<small>AFEB · Interfaz web / 01</small>
            </span>
          </Link>
          <div className="ds-header__actions">
            <Link className="ds-header-return" to="/#inicio">
              <span>Ver la web</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <a
              className="action action--dark ds-kit-link"
              href="/design-system/afeb-design-system.zip"
              download
            >
              <Download size={16} aria-hidden="true" />
              <span>Descargar kit</span>
            </a>
          </div>
        </div>
      </header>
      <div className="ds-shell">
        <aside className="ds-sidebar">
          <div className="ds-sidebar__desktop">
            <span className="ds-small-label">En esta guía</span>
            <nav aria-label="Índice del sistema de diseño">
              {chapters.map(([id, label], i) => (
                <Link to={`#${id}`} key={id} aria-current={active === id ? 'location' : undefined}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {label}
                </Link>
              ))}
            </nav>
            <div className="ds-sidebar__foot">
              <span className="ds-status-dot" />
              Guía de implementación<p>React · TypeScript · CSS</p>
              <a href="/design-system/tokens.json" download>
                Descargar tokens
                <Download size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="ds-mobile-index">
            <label htmlFor="ds-index">Explorar guía</label>
            <select
              id="ds-index"
              value={active}
              onChange={(event) => {
                setActive(event.target.value)
                navigate('#' + event.target.value)
              }}
            >
              {chapters.map(([id, label], i) => (
                <option key={id} value={id}>
                  {String(i + 1).padStart(2, '0')} · {label}
                </option>
              ))}
            </select>
          </div>
        </aside>
        <main id="contenido" className="ds-main">
          <section className="ds-intro">
            <Eyebrow>Una identidad compartida</Eyebrow>
            <h1>Sistema de diseño.</h1>
            <p className="ds-intro__lead">
              El lenguaje visual que conecta
              <br />
              toda la experiencia AFEB.
            </p>
            <p>
              Fundamentos, componentes y patrones de la web, reunidos en una referencia viva para
              diseñar y continuar su desarrollo.
            </p>
            <div className="ds-intro__legend">
              <Badge tone="brand">En uso</Badge>
              <span>Presente en la web.</span>
              <Badge>Extensión</Badge>
              <span>Preparado para las próximas pantallas.</span>
            </div>
            <div className="ds-overview">
              <Link to="#color">
                <span>01 — Fundamentos</span>
                <strong>Color, tipo y espacio.</strong>
                <ArrowDown size={17} aria-hidden="true" />
              </Link>
              <Link to="#acciones">
                <span>02 — Componentes</span>
                <strong>Una interfaz coherente.</strong>
                <ArrowDown size={17} aria-hidden="true" />
              </Link>
              <Link to="#assets">
                <span>03 — Entrega</span>
                <strong>Recursos para construir.</strong>
                <ArrowDown size={17} aria-hidden="true" />
              </Link>
            </div>
          </section>

          <Chapter
            id="identidad"
            title="Una identidad reconocible."
            intro="La marca conserva sus proporciones, sus colores y su descriptor. Los fondos claros le dan el espacio y la legibilidad que necesita."
          >
            <div className="ds-identity">
              <div>
                <img
                  src="/media/afeb-logo.png"
                  alt="AFEB. Asociación de Fabricantes de Bricolaje y Ferretería"
                  width="180"
                  height="151"
                />
                <div>
                  <strong>AFEB</strong>
                  <span>Marca institucional · PNG transparente</span>
                  <a href="/media/afeb-logo.png" download>
                    Descargar original de interfaz
                    <Download size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div>
                <img src="/media/club-export.png" alt="AFEB Club Export" width="180" height="122" />
                <div>
                  <strong>Club Export</strong>
                  <span>Identidad de programa · PNG transparente</span>
                  <a href="/media/club-export.png" download>
                    Descargar recurso
                    <Download size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
            <div className="ds-principles">
              <p>
                <strong>Proporción intacta.</strong> Utiliza <code>object-fit: contain</code> en
                soportes de marca.
              </p>
              <p>
                <strong>Espacio para respirar.</strong> Mantén una zona libre alrededor del
                logotipo.
              </p>
              <p>
                <strong>Identidades propias.</strong> Las marcas de asociados y proveedores
                mantienen sus colores.
              </p>
            </div>
            <Reference>
              Recursos de interfaz en <code>public/media/</code>. El sistema cromático de la web es
              una propuesta, pendiente de validación como manual de marca.
            </Reference>
          </Chapter>

          <Chapter
            id="color"
            title="Verdes con intención."
            intro="Una base clara, verdes de profundidad y acentos medidos. Cada color tiene una función; los tokens son los mismos que utiliza la web."
          >
            <div className="ds-colors">
              {tokens.colors.map((color) => (
                <button
                  type="button"
                  className="ds-color"
                  key={color.name}
                  onClick={() => copy(color.value, color.label)}
                  aria-label={`Copiar color ${color.label} ${color.value}`}
                >
                  <span className="ds-color__swatch" style={{ backgroundColor: color.value }}>
                    <span
                      style={{ color: contrast(color.value, '#fff') >= 4.5 ? '#fff' : '#153e30' }}
                    >
                      {copied === color.value ? (
                        <Check size={17} aria-hidden="true" />
                      ) : (
                        <Copy size={16} aria-hidden="true" />
                      )}
                    </span>
                  </span>
                  <span className="ds-color__name">{color.label}</span>
                  <span className="ds-color__meta">
                    <code>{color.token}</code>
                    <strong>{color.value.toUpperCase()}</strong>
                  </span>
                  <span className="ds-color__use">{color.usage}</span>
                </button>
              ))}
            </div>
            <Code title="Ver variables CSS de color">{`:root {\n${tokens.colors.map((color) => `  ${color.token}: ${color.value};`).join('\n')}\n}`}</Code>
            <div className="ds-demo ds-contrast">
              <p className="ds-small-label">Combinaciones de texto</p>
              <div className="ds-contrast-grid">
                {contrastPairs.map((pair) => {
                  const ratio = contrast(pair.text, pair.bg)
                  return (
                    <div key={pair.name}>
                      <span
                        className="ds-contrast__sample"
                        style={{ color: pair.text, background: pair.bg }}
                      >
                        Aa
                      </span>
                      <strong>{pair.name}</strong>
                      <span>{ratio.toFixed(2)}:1</span>
                      <Badge tone={ratio >= 4.5 ? 'brand' : 'warning'}>
                        {ratio >= 4.5 ? 'Texto AA' : 'Solo acento'}
                      </Badge>
                    </div>
                  )
                })}
              </div>
              <p className="ds-demo-note">
                Referencia para texto normal: 4,5:1. El texto grande admite 3:1. El verde AFEB
                funciona como acento; los fondos de acción utilizan bosque o lima.{' '}
                <a
                  href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Criterio de contraste W3C <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </p>
            </div>
            <Reference>
              Fuente de verdad: <code>src/styles.css → :root</code>. Los colores funcionales de
              información, aviso y error se documentan en Estados.
            </Reference>
          </Chapter>

          <Chapter
            id="tipografia"
            title="Una voz. Muchas escalas."
            intro="Manrope Variable aporta continuidad a toda la web. El peso y el espacio construyen la jerarquía antes que la decoración."
          >
            <div className="ds-font-card">
              <div>
                <span>Aa</span>
                <p>
                  Manrope
                  <br />
                  <strong>Variable</strong>
                </p>
              </div>
              <div>
                <Badge tone="brand">Servida localmente</Badge>
                <p>
                  Una familia · pesos 200–800.
                  <br />
                  La interfaz trabaja principalmente entre 400 y 700.
                </p>
                <a href="/design-system/fonts/manrope-latin-wght-normal.woff2" download>
                  Descargar WOFF2 · Latín
                  <Download size={14} aria-hidden="true" />
                </a>
                <a href="/design-system/fonts/OFL.txt" download>
                  Licencia SIL OFL 1.1
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="ds-type-scale">
              {typeRows.map((row) => (
                <div key={row.token} className="ds-type-row">
                  <div>
                    <strong>{row.name}</strong>
                    <code>{row.token}</code>
                    <small>{row.spec}</small>
                  </div>
                  <p className={row.className}>{row.text}</p>
                </div>
              ))}
            </div>
            <Reference>
              Estas son las escalas base. Hero, páginas interiores y tarjetas tienen ajustes
              responsive; la navegación usa 13 px y los textos de apoyo 12–14 px.
            </Reference>
            <div className="ds-weight-row">
              {[400, 500, 600, 650, 700].map((weight) => (
                <div key={weight}>
                  <span style={{ fontWeight: weight }}>Aa</span>
                  <code>{weight}</code>
                </div>
              ))}
            </div>
            <FontPlayground />
            <Code title="Ver configuración de tipografía">{`import '@fontsource-variable/manrope/wght.css'\n\n:root {\n  --font: 'Manrope Variable', sans-serif;\n  --text-body: 1rem;\n  --text-small: .875rem;\n  --text-label: .75rem;\n}\n\nbody { font-family: var(--font); line-height: 1.7; }\nh2 { font-weight: 600; letter-spacing: -.045em; }`}</Code>
          </Chapter>

          <Chapter
            id="reticula"
            title="Espacio que ordena."
            intro="La composición combina una retícula clara con ritmo editorial. El contenido decide la altura; las secciones alternan amplitud y concentración."
          >
            <div className="ds-facts">
              <div>
                <strong>
                  1280<span>px</span>
                </strong>
                <p>Ancho máximo de contenido</p>
                <code>--container</code>
              </div>
              <div>
                <strong>96 / 76 / 60</strong>
                <p>Espacio de sección · escritorio / tablet / móvil</p>
                <code>--section-space</code>
              </div>
              <div>
                <strong>
                  24 → 88<span>px</span>
                </strong>
                <p>Margen lateral fluido de base</p>
                <code>--gutter</code>
              </div>
            </div>
            <div className="ds-demo">
              <p className="ds-small-label">Escala recomendada para ampliar · base 4 px</p>
              <div className="ds-spacing">
                {tokens.extensions.spacingScale.map((size) => (
                  <div key={size}>
                    <code>{size}</code>
                    <span style={{ width: size }} />
                    <small>px</small>
                  </div>
                ))}
              </div>
              <p className="ds-demo-note">
                Los componentes existentes conservan sus ajustes editoriales. Esta escala facilita
                construir nuevas variantes.
              </p>
            </div>
            <GridPlayground />
            <div className="ds-rule-list">
              <p>
                <strong>≤1240 px</strong>La cabecera pasa a navegación de menú.
              </p>
              <p>
                <strong>≤900 px</strong>El hero y las composiciones principales de la home se
                apilan.
              </p>
              <p>
                <strong>≤600 px</strong>Controles y tarjetas se reorganizan en una columna.
              </p>
            </div>
            <Code title="Ver contenedor y retícula">{`.container {\n  width: min(var(--container), calc(100% - var(--gutter) * 2));\n  margin-inline: auto;\n}\n.company-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 26px;\n}\n/* 2 columnas ≤1100px · 1 columna ≤600px */`}</Code>
          </Chapter>

          <Chapter
            id="superficies"
            title="El detalle mantiene la calma."
            intro="Bordes finos, radios discretos y superficies planas. El contraste y la composición hacen el trabajo que otras interfaces delegan en sombras."
          >
            <div className="ds-surface-grid">
              <div className="ds-surface-sample">
                <span>01</span>
                <strong>Superficie</strong>
                <p>
                  Blanco sobre papel.
                  <br />
                  Tarjetas y formularios.
                </p>
                <code>--white / --paper</code>
              </div>
              <div className="ds-surface-sample ds-surface-sample--warm">
                <span>02</span>
                <strong>Agrupación</strong>
                <p>
                  Neutro cálido para
                  <br />
                  cambiar el ritmo.
                </p>
                <code>--warm</code>
              </div>
              <div className="ds-surface-sample ds-surface-sample--dark">
                <span>03</span>
                <strong>Contraste</strong>
                <p>
                  Bosque con texto claro
                  <br />y acentos lima.
                </p>
                <code>--forest / --lime</code>
              </div>
            </div>
            <div className="ds-spec-row">
              <div>
                <strong>1 px</strong>
                <span>Borde y divisor</span>
              </div>
              <div>
                <strong>3 px</strong>
                <span>Radio de interfaz</span>
              </div>
              <div>
                <strong>3 + 5 px</strong>
                <span>Foco / separación</span>
              </div>
              <div>
                <strong>200 ms</strong>
                <span>Transición habitual</span>
              </div>
            </div>
            <div className="ds-demo">
              <div className="ds-inline ds-interaction-samples">
                <div>
                  <span>Reposo</span>
                  <Button size="sm" onClick={() => setToast('Estado de reposo: ejemplo activado.')}>
                    Acción
                  </Button>
                </div>
                <div>
                  <span>Hover · muestra</span>
                  <Button
                    size="sm"
                    className="ds-hover-sample"
                    onClick={() => setToast('Hover: fondo #245940.')}
                  >
                    Acción
                  </Button>
                </div>
                <div>
                  <span>Foco · muestra</span>
                  <Button
                    size="sm"
                    className="ds-focus-sample"
                    onClick={() => setToast('Prueba también a recorrer los controles con Tab.')}
                  >
                    Acción
                  </Button>
                </div>
              </div>
              <p className="ds-demo-note">
                Las flechas se desplazan 2–4 px. Las fotografías pueden ampliar su escala a 1.025 en
                500 ms. Se respeta <code>prefers-reduced-motion</code>.
              </p>
            </div>
            <Reference>
              Las tarjetas usan borde, no sombra. La elevación queda reservada para capas temporales
              como el diálogo de referencia.
            </Reference>
          </Chapter>

          <Chapter
            id="acciones"
            title="Cada acción, en su lugar."
            intro="Una acción principal por contexto. Los enlaces editoriales acompañan la lectura y las flechas explican hacia dónde continúa la experiencia."
          >
            <ButtonPlayground notify={setToast} />
            <Code title="Ver componentes de acción">{`// Enlaces que ya utiliza la web\n<InternalAction to="/empresas-asociadas">Ver empresas</InternalAction>\n<ExternalAction href={company.website} />\n\n// Botones de interfaz · extensión\nimport { Button } from './components/system'\n<Button variant="outline" onClick={onOpen}>Ver detalle</Button>\n<Button type="submit" loading={pending}>Continuar</Button>`}</Code>
            <div className="ds-demo">
              <p className="ds-small-label">Iconografía · Lucide · 18–24 px · trazo 1.5–1.6</p>
              <div className="ds-icon-grid">
                {iconSet.slice(0, 12).map(([name, Icon]) => (
                  <div key={name}>
                    <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                    <code>{name}</code>
                  </div>
                ))}
              </div>
              <p className="ds-demo-note">
                Los iconos decorativos usan <code>aria-hidden</code>. Un botón que solo muestra un
                icono necesita nombre accesible y un área de interacción de referencia de 44 × 44
                px.
              </p>
            </div>
          </Chapter>

          <Chapter
            id="navegacion"
            title="Orientar sin interrumpir."
            intro="Etiquetas, filtros y migas de pan mantienen el contexto. Las pestañas amplían el sistema para contenidos relacionados dentro de una misma página."
            extension
          >
            <ChipsPlayground />
            <div className="ds-demo">
              <p className="ds-small-label">Migas de pan · en uso</p>
              <Breadcrumbs
                items={[
                  { label: 'Inicio', to: '/' },
                  { label: 'Empresas asociadas', to: '/empresas-asociadas' },
                  { label: 'Bellota' },
                ]}
              />
            </div>
            <div className="ds-demo">
              <p className="ds-small-label">Pestañas · prueba flechas, Inicio y Fin</p>
              <NavigationPlayground />
            </div>
            <Code title="Ver pestañas controladas">{`const [tab, setTab] = useState('informacion')\n<Tabs\n  label="Contenido del proveedor"\n  value={tab}\n  onChange={setTab}\n  items={[{ id: 'informacion', label: 'Información', content: <Info /> }]}\n/>`}</Code>
          </Chapter>

          <Chapter
            id="formularios"
            title="Preguntar con claridad."
            intro="Campos amplios, etiquetas visibles y ayudas concretas. La base visual procede del buscador del directorio; los campos adicionales amplían esa misma gramática."
            extension
          >
            <FormPlayground />
            <Code title="Ver un campo con ayuda y error">{`<TextField\n  label="Correo electrónico"\n  type="email"\n  required\n  value={email}\n  onChange={event => setEmail(event.target.value)}\n  hint="Utiliza tu correo de empresa."\n  error={errors.email}\n/>\n// El componente conecta etiqueta, ayuda y aria-invalid.\n// La validación de esta guía es local.`}</Code>
            <Reference>
              Altura base 54 px, borde 1 px, radio 3 px. Cada campo usa un identificador estable y
              el error se expresa con texto, además de color.
            </Reference>
          </Chapter>

          <Chapter
            id="tarjetas"
            title="Contenido que se reconoce."
            intro="Las tarjetas conectan con fichas reales y mantienen sus componentes originales. El patrón de tabla añade una opción compacta para listados más amplios."
          >
            <ul className="company-grid ds-card-examples">
              <li>
                <CompanyCard company={companies.find((item) => item.slug === 'bellota')!} />
              </li>
              <li>
                <ProviderCard
                  provider={serviceProviders.find((item) => item.slug === 'slimstock')!}
                />
              </li>
            </ul>
            <Reference>
              <code>CompanyCard</code> y <code>ProviderCard</code> · nombre, categoría, descripción
              y una acción clara. Un único enlace envuelve cada tarjeta.
            </Reference>
            <div className="ds-subheading">
              <h3>Tabla, búsqueda y paginación.</h3>
              <Badge>Extensión</Badge>
            </div>
            <p className="ds-demo-note">
              Ocho empresas reales. Busca sin distinguir mayúsculas ni tildes, filtra o cambia de
              página.
            </p>
            <TablePlayground />
            <Code title="Ver la arquitectura de las fichas">{`// Modelo común → tarjeta → plantilla de detalle\nsrc/data/companies.ts        → CompanyCard → CompanyPage\nsrc/data/providers.ts        → ProviderCard → ProviderPage\n\n/empresas-asociadas/:slug\n/proveedores-recomendados/:slug`}</Code>
          </Chapter>

          <Chapter
            id="estados"
            title="La interfaz también responde."
            intro="Confirmaciones, avisos, errores y carga forman parte de la experiencia. Los estados funcionales añaden colores semánticos con texto e iconos de apoyo."
            extension
          >
            <div className="ds-semantic-colors">
              {[
                ['Éxito', '#153e30'],
                ['Información', '#31576b'],
                ['Aviso', '#7c5b19'],
                ['Error', '#9a3d32'],
              ].map(([name, value]) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => copy(value, name)}
                  aria-label={`Copiar color funcional ${name}`}
                >
                  <span style={{ backgroundColor: value }} />
                  <strong>{name}</strong>
                  <code>{value.toUpperCase()}</code>
                  <Copy size={13} aria-hidden="true" />
                </button>
              ))}
            </div>
            <FeedbackPlayground notify={setToast} />
            <Reference>
              Los avisos estáticos son ejemplos. Los cambios de estado se anuncian mediante{' '}
              <code>role="status"</code> o <code>role="alert"</code>, según su urgencia.
            </Reference>
          </Chapter>

          <Chapter
            id="capas"
            title="Más detalle, cuando hace falta."
            intro="Un diálogo para una decisión breve. Un acordeón para profundizar sin saturar. Las capas mantienen el mismo tono y la misma escala del sistema."
            extension
          >
            <LayersPlayground notify={setToast} />
            <Code title="Ver un diálogo reutilizable">{`<Dialog open={open} onClose={() => setOpen(false)} title="Continuar"\n  footer={<Button onClick={confirm}>Confirmar</Button>}\n>\n  <p>Contenido breve y una siguiente acción clara.</p>\n</Dialog>\n// <dialog> nativo: modalidad, foco y Escape.\n// La interacción del fondo queda bloqueada mientras está abierto.`}</Code>
          </Chapter>

          <Chapter
            id="patrones"
            title="De componentes a experiencia."
            intro="El sistema cobra sentido al componer. Estos patrones reproducen la relación entre titulares, fotografía, cifras y llamadas a la acción de la landing."
          >
            <div className="ds-pattern-hero">
              <div>
                <Eyebrow>La comunidad AFEB</Eyebrow>
                <h3>
                  El sector avanza.
                  <br />
                  <span>Juntos, más lejos.</span>
                </h3>
                <p>Compartimos conocimiento y conectamos a las empresas del sector.</p>
                <InternalAction to="/#inicio" variant="dark">
                  Ver la home
                </InternalAction>
              </div>
              <img
                src="/media/hero-tools.webp"
                alt="Herramientas de bricolaje sobre madera, ejemplo de fotografía de hero"
                width="260"
                height="320"
                loading="lazy"
              />
            </div>
            <div className="ds-pattern-statistics">
              <div>
                <strong>+160</strong>
                <span>empresas líderes</span>
              </div>
              <div>
                <strong>23</strong>
                <span>categorías</span>
              </div>
              <div>
                <strong>2</strong>
                <span>foros anuales</span>
              </div>
              <div>
                <strong>+200</strong>
                <span>directivos participantes</span>
              </div>
            </div>
            <Reference>
              Cifras publicadas en la home y conservadas como referencia del prototipo. Su
              validación final está documentada en el proyecto.
            </Reference>
            <div className="ds-pattern-cta">
              <Eyebrow light>Conectamos empresas</Eyebrow>
              <div>
                <h3>
                  El futuro del sector
                  <br />
                  <span>se construye en común.</span>
                </h3>
                <InternalAction to="/proveedores-recomendados" variant="lime">
                  Explora el ecosistema
                </InternalAction>
              </div>
            </div>
          </Chapter>

          <Chapter
            id="assets"
            title="Todo lo que necesitas para construir."
            intro="Fotografías, identidades, fuente e iconos listos para reutilizar. Los archivos de interfaz conservan su procedencia y las proporciones de los originales."
          >
            <div className="ds-asset-summary">
              <span>
                <strong>{assets.media.length}</strong>imágenes y variantes
              </span>
              <span>
                <strong>{assets.icons.length}</strong>iconos SVG
              </span>
              <span>
                <strong>1</strong>familia variable
              </span>
              <a className="action action--outline" href="/design-system/afeb-assets.zip" download>
                Descargar assets
                <Download size={17} aria-hidden="true" />
              </a>
            </div>
            <Tabs
              label="Biblioteca de recursos"
              value={assetTab}
              onChange={setAssetTab}
              items={[
                {
                  id: 'fotografias',
                  label: 'Fotografías',
                  content: (
                    <div className="ds-photo-grid">
                      {photography.map((photo) => (
                        <a href={photo.src} download key={photo.src} className="ds-photo">
                          <img
                            src={photo.src}
                            alt={photo.title}
                            loading="lazy"
                            width="400"
                            height="260"
                          />
                          <div>
                            <strong>{photo.title}</strong>
                            <span>{photo.use}</span>
                            <small>
                              {photo.size} · WebP
                              <Download size={13} aria-hidden="true" />
                            </small>
                          </div>
                        </a>
                      ))}
                    </div>
                  ),
                },
                {
                  id: 'logotipos',
                  label: 'Logotipos',
                  content: (
                    <>
                      <div className="ds-logo-grid">
                        {logoAssets.map((logo) => (
                          <a href={logo.logo} download key={logo.logo}>
                            <div>
                              <img src={logo.logo} alt={logo.name} loading="lazy" />
                            </div>
                            <strong>{logo.name}</strong>
                            {'note' in logo && logo.note && <small>{logo.note}</small>}
                            <span>
                              Descargar
                              <Download size={12} aria-hidden="true" />
                            </span>
                          </a>
                        ))}
                      </div>
                      <details className="ds-legacy-assets">
                        <summary>Variantes conservadas en la home</summary>
                        <div className="ds-logo-grid">
                          {['bosch', 'bellota', 'rubi', 'compo'].map((name) => (
                            <a href={`/media/${name}.webp`} download key={name}>
                              <div>
                                <img src={`/media/${name}.webp`} alt={name} loading="lazy" />
                              </div>
                              <strong>{name.toUpperCase()}</strong>
                              <span>
                                WebP de la home
                                <Download size={12} aria-hidden="true" />
                              </span>
                            </a>
                          ))}
                        </div>
                      </details>
                    </>
                  ),
                },
                {
                  id: 'iconos',
                  label: 'Iconos',
                  content: (
                    <div className="ds-icon-downloads">
                      {iconSet.map(([name, Icon]) => (
                        <a key={name} href={`/design-system/icons/${name}.svg`} download>
                          <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                          <code>{name}</code>
                          <Download size={12} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
            <Reference>
              Las fotos de encuentros están identificadas como 2025. Los logos corporativos
              corresponden a sus marcas; BLACK+DECKER se identifica como marca de Stanley Black &
              Decker.
            </Reference>
          </Chapter>

          <Chapter
            id="implementacion"
            title="Una base para continuar."
            intro="Código, recursos y decisiones reunidos. El kit incluye una copia del proyecto, los componentes de referencia, los tokens y la documentación de esta entrega."
          >
            <div className="ds-handoff">
              <div>
                <Badge tone="brand">Kit de desarrollo / 01</Badge>
                <h3>
                  Del diseño
                  <br />
                  <span>al siguiente commit.</span>
                </h3>
                <p>
                  Instala las dependencias, arranca el proyecto y reutiliza los componentes en las
                  próximas pantallas.
                </p>
                <a
                  className="action action--lime"
                  href="/design-system/afeb-design-system.zip"
                  download
                >
                  Descargar kit completo
                  <Download size={18} aria-hidden="true" />
                </a>
              </div>
              <div>
                <p>INCLUYE</p>
                <ul>
                  {[
                    'Proyecto React + Vite + TypeScript',
                    'Fundamentos y tokens CSS / JSON',
                    'Componentes con variantes y estados',
                    'Fotos, logotipos y fuente local',
                    '24 iconos SVG y sus licencias',
                    'Guía de uso y mapa de archivos',
                  ].map((item) => (
                    <li key={item}>
                      <Check size={15} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ds-file-map">
              {[
                ['src/styles.css', 'Fundamentos y estilos existentes de la home.'],
                ['src/components/ui.tsx', 'Action y Eyebrow: componentes originales.'],
                [
                  'src/components/directory.tsx',
                  'Tarjetas, migas y enlaces de las páginas interiores.',
                ],
                [
                  'src/components/system/',
                  'Button, Badge, Chip, campos, Tabs, Accordion, Alert y Dialog.',
                ],
                ['src/pages/design-system/', 'Demos y estilos de esta guía; no alteran la home.'],
                ['src/data/', 'Datos de empresas, proveedores y tokens generados.'],
                ['public/media/', 'Recursos optimizados que utiliza la interfaz.'],
                [
                  'scripts/prepare-design-system.mjs',
                  'Generación del catálogo de recursos y tokens.',
                ],
              ].map(([file, description]) => (
                <div key={file}>
                  <code>{file}</code>
                  <span>{description}</span>
                </div>
              ))}
            </div>
            <Code title="Arrancar y mantener la guía">{`npm install\nnpm run dev\n\n# Actualizar tokens, fuentes e iconos a partir del proyecto\nnpm run design:assets\n\n# Validar TypeScript y generar el build\nnpm run build\n\n# Regenerar ambos ZIP de entrega\nnpm run design:package`}</Code>
            <div className="ds-principles">
              <p>
                <strong>Reutilizar primero.</strong> Amplía los componentes existentes antes de
                crear variantes paralelas.
              </p>
              <p>
                <strong>Una decisión, un token.</strong> Centraliza la base visual en las variables
                del sistema.
              </p>
              <p>
                <strong>Revisar en contexto.</strong> Comprueba la home, las fichas, el teclado y
                los tamaños compactos.
              </p>
            </div>
            <p className="ds-final-note">
              Guía de la propuesta AFEB. Las extensiones están listas como referencia técnica y
              visual; su integración se decide en cada pantalla.
            </p>
          </Chapter>
          <footer className="ds-footer">
            <span>AFEB · Sistema de diseño / 01</span>
            <Link to="/#inicio">
              Volver a la web
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </footer>
        </main>
      </div>
      {toast && (
        <div className="ds-toast" role="status" aria-live="polite">
          <CircleCheck size={19} aria-hidden="true" />
          <p>{toast}</p>
          <button
            className="ui-icon-button"
            aria-label="Descartar notificación"
            type="button"
            onClick={() => setToast('')}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
