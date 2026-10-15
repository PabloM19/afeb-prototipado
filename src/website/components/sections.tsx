import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Globe2,
  MoveUpRight,
  Play,
  Plus,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { associates, links, navigation, resources } from '../data'
import { Action, Eyebrow } from './ui'

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <Eyebrow>
            Asociación de Fabricantes
            <br className="eyebrow__break" /> de Bricolaje y Ferretería
          </Eyebrow>
          <h1 id="hero-title">
            El sector avanza.<span>Juntos, más lejos.</span>
          </h1>
          <p className="hero__description">
            Conectamos a las empresas que construyen el futuro del bricolaje y la ferretería.
            Compartimos conocimiento, creamos oportunidades.
          </p>
          <div className="hero__actions">
            <Action href="#afeb" arrow="down">
              Descubre AFEB
            </Action>
            <Action href={links.portal} variant="text">
              Portal del socio
            </Action>
          </div>
          <a className="hero__scroll" href="#afeb">
            <ArrowDown size={16} aria-hidden="true" />
            El valor de formar parte
          </a>
        </div>
        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img
              className="hero__image"
              src="/media/hero-tools.webp"
              alt="Herramientas de bricolaje sobre una mesa de trabajo de madera"
              width="1080"
              height="1440"
              fetchPriority="high"
            />
            <div className="hero__image-caption">
              <span>Muchas empresas.</span>
              <span>Un mismo impulso.</span>
              <MoveUpRight size={28} strokeWidth={1.1} aria-hidden="true" />
            </div>
          </div>
          <a className="hero__community" href="#comunidad">
            <img
              src="/media/foro-verano.webp"
              alt="Profesionales de AFEB reunidos en el Foro de Verano 2025"
              width="180"
              height="100"
            />
            <div>
              <span className="mini-label">EL VALOR DE CONECTAR</span>
              <strong>Las personas mueven el sector.</strong>
            </div>
            <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
          </a>
          <span className="hero__image-index" aria-hidden="true">
            AFEB / CONSTRUIMOS EN COMÚN
          </span>
        </div>
      </div>
    </section>
  )
}

export function Statistics() {
  const stats = [
    {
      value: '160',
      prefix: '+',
      text: (
        <>
          empresas líderes
          <br />
          en una misma comunidad
        </>
      ),
    },
    {
      value: '23',
      text: (
        <>
          categorías
          <br />
          representadas
        </>
      ),
    },
    {
      value: '2',
      text: (
        <>
          foros anuales
          <br />
          para encontrarnos
        </>
      ),
    },
    {
      value: '200',
      prefix: '+',
      text: (
        <>
          directivos participantes
          <br />
          en nuestros foros
        </>
      ),
    },
  ]
  return (
    <section className="statistics" aria-label="AFEB en cifras">
      <div className="container">
        <div className="statistics__top">
          <Eyebrow light>La fuerza de un sector que se une</Eyebrow>
          <a href={links.home}>
            AFEB en cifras <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
        <div className="statistics__grid">
          {stats.map((s) => (
            <div className="stat" key={s.value}>
              <p className="stat__value">
                {s.prefix && <span>{s.prefix}</span>}
                {s.value}
              </p>
              <p className="stat__label">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="about section-space" id="afeb" aria-labelledby="about-title">
      <div className="container about__grid">
        <Eyebrow number="01">Somos AFEB</Eyebrow>
        <div>
          <h2 className="about__title" id="about-title">
            Distintas empresas.
            <br />
            <span>Una gran comunidad.</span>
          </h2>
          <div className="about__body">
            <p>
              Somos el punto de encuentro de los fabricantes de bricolaje y ferretería. Un espacio
              para compartir lo que sabemos, conectar con quienes nos complementan y afrontar juntos
              lo que viene.
            </p>
            <div>
              <p>
                Facilitamos las relaciones, las sinergias y el conocimiento que ayudan a nuestras
                empresas a tomar mejores decisiones.
              </p>
              <Action href={links.board} variant="text">
                Conoce la asociación
              </Action>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Associates() {
  return (
    <section className="associates" id="asociados" aria-labelledby="associates-title">
      <div className="container">
        <div className="associates__heading">
          <div>
            <Eyebrow>Una comunidad de marcas líderes</Eyebrow>
            <h2 id="associates-title">
              Nombres que conoces. <br />
              Una fuerza que compartimos.
            </h2>
          </div>
          <Action href={links.associates} variant="text">
            Ver todos los asociados
          </Action>
        </div>
        <div className="associates__logos">
          {associates.map((a) => (
            <Link
              to={`${links.associates}/${a.slug}`}
              aria-label={`${a.name}, empresa asociada a AFEB`}
              key={a.name}
            >
              <img src={`/media/${a.image}`} alt={a.name} width="80" height="80" loading="lazy" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Benefits() {
  return (
    <section className="benefits section-space" id="que-ofrecemos" aria-labelledby="benefits-title">
      <div className="container">
        <div className="section-heading">
          <Eyebrow number="02">Qué te aporta AFEB</Eyebrow>
          <h2 id="benefits-title">
            Compartir nos permite <span>llegar más lejos.</span>
          </h2>
          <p>
            Las mejores decisiones empiezan con información. Las mejores oportunidades, con una
            conexión.
          </p>
        </div>
        <div className="benefits__grid">
          <a className="knowledge" href={links.reports}>
            <div className="knowledge__top">
              <span className="mini-label">01 / CONOCIMIENTO</span>
              <BookOpen size={26} strokeWidth={1.2} aria-hidden="true" />
            </div>
            <div className="knowledge__graphic" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="knowledge__content">
              <h3>La información se convierte en perspectiva.</h3>
              <p>
                Estudios de mercado, informes y formación para entender el sector y decidir con
                criterio.
              </p>
              <span className="knowledge__link">
                Conocimiento para tu empresa <ArrowUpRight size={21} aria-hidden="true" />
              </span>
            </div>
          </a>
          <div className="benefits__list">
            <a className="benefit-row" href="#comunidad">
              <span className="benefit-row__number">02</span>
              <div>
                <span className="mini-label">CONEXIONES Y ACTIVIDADES</span>
                <h3>Hay encuentros que lo cambian todo.</h3>
                <p>
                  Foros, grupos de trabajo y encuentros con la distribución. Relaciones que abren
                  nuevas posibilidades.
                </p>
              </div>
              <ArrowUpRight size={24} strokeWidth={1.3} aria-hidden="true" />
            </a>
            <a className="benefit-row" href={links.branding}>
              <span className="benefit-row__number">03</span>
              <div>
                <span className="mini-label">VISIBILIDAD Y COLABORACIÓN</span>
                <h3>Tu marca, con más posibilidades.</h3>
                <p>
                  Co-branding y Mi Hogar Mejor: iniciativas compartidas para dar más alcance a lo
                  que haces.
                </p>
              </div>
              <ArrowUpRight size={24} strokeWidth={1.3} aria-hidden="true" />
            </a>
            <a className="benefit-row" href="#club-export">
              <span className="benefit-row__number">04</span>
              <div>
                <span className="mini-label">INTERNACIONALIZACIÓN</span>
                <h3>El siguiente paso puede estar más allá.</h3>
                <p>
                  Club Export conecta experiencia y oportunidades para crecer en nuevos mercados.
                </p>
              </div>
              <ArrowUpRight size={24} strokeWidth={1.3} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Activities() {
  return (
    <section className="activities section-space" id="comunidad" aria-labelledby="activities-title">
      <div className="container">
        <div className="activities__heading">
          <div>
            <Eyebrow number="03">La comunidad en movimiento</Eyebrow>
            <h2 id="activities-title">
              Las conexiones se hacen <span>reales.</span>
            </h2>
          </div>
          <div className="activities__intro">
            <p>
              Nos reunimos para escuchar otras perspectivas, compartir experiencia y construir
              relaciones que continúan después de cada encuentro.
            </p>
            <Action href={links.activities} variant="text">
              Explora las actividades
            </Action>
          </div>
        </div>
        <div className="activities__mosaic">
          <figure className="activity activity--main">
            <div className="activity__image">
              <img
                src="/media/foro-verano.webp"
                alt="Fotografía de grupo de los asistentes al Foro de Verano de AFEB en el IESE de Barcelona, 2025"
                width="624"
                height="300"
                loading="lazy"
              />
            </div>
            <figcaption>
              <span className="mini-label">FOROS AFEB / BARCELONA · 2025</span>
              <h3>Un sector. Muchas miradas. La misma voluntad de avanzar.</h3>
              <p>Foro de Verano en IESE Business School.</p>
            </figcaption>
          </figure>
          <figure className="activity activity--middle">
            <div className="activity__image">
              <img
                src="/media/grupo-trabajo.webp"
                alt="Profesionales de empresas asociadas en un grupo de trabajo de AFEB en 2025"
                width="457"
                height="303"
                loading="lazy"
              />
            </div>
            <figcaption>
              <span className="mini-label">GRUPOS DE TRABAJO / 2025</span>
              <h3>Ideas que crecen cuando se comparten.</h3>
              <p>Experiencias y soluciones entre profesionales.</p>
            </figcaption>
          </figure>
          <figure className="activity activity--last">
            <div className="activity__image">
              <img
                src="/media/bauhaus.webp"
                alt="Encuentro de AFEB con Bauhaus en Valencia en noviembre de 2025"
                width="462"
                height="305"
                loading="lazy"
              />
            </div>
            <figcaption>
              <span className="mini-label">DISTRIBUCIÓN / VALENCIA · 2025</span>
              <h3>Más cerca. Mejor conectados.</h3>
              <p>Encuentro con Bauhaus.</p>
            </figcaption>
          </figure>
        </div>
        <div className="activities__footnote">
          <span>Una mirada a nuestra actividad de 2025.</span>
          <a href={links.memory}>
            Ver memoria de actividades <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function ClubExport() {
  return (
    <section className="club" id="club-export" aria-labelledby="club-title">
      <div className="container club__grid">
        <div className="club__visual">
          <div className="club__logo">
            <img
              src="/media/club-export.png"
              alt="AFEB Club Export"
              width="180"
              height="122"
              loading="lazy"
            />
          </div>
          <div className="club__photo">
            <img
              src="/media/club-coloquio.webp"
              alt="Coloquio de profesionales de Club Export durante su actividad de 2025"
              width="619"
              height="341"
              loading="lazy"
            />
          </div>
          <span className="club__caption">COMPARTIMOS EXPERIENCIA. ABRIMOS MERCADOS.</span>
          <span className="club__orbit" aria-hidden="true">
            <Globe2 size={92} strokeWidth={0.7} />
          </span>
        </div>
        <div className="club__content">
          <Eyebrow number="04" light>
            Club Export
          </Eyebrow>
          <h2 id="club-title">
            Juntos, más allá de <span>las fronteras.</span>
          </h2>
          <p>
            El mundo está lleno de oportunidades. Club Export reúne a las empresas españolas de
            ferretería y bricolaje que quieren dar su próximo paso internacional.
          </p>
          <ul>
            <li>
              <Plus size={16} aria-hidden="true" />
              Conocimiento de nuevos mercados
            </li>
            <li>
              <Plus size={16} aria-hidden="true" />
              Experiencia compartida entre exportadores
            </li>
            <li>
              <Plus size={16} aria-hidden="true" />
              Colaboración y oportunidades de negocio
            </li>
          </ul>
          <Action href={links.club} variant="lime">
            Descubre Club Export
          </Action>
        </div>
      </div>
    </section>
  )
}

export function Resources() {
  return (
    <section className="resources section-space" aria-labelledby="resources-title">
      <div className="container resources__grid">
        <div className="resources__heading">
          <Eyebrow number="05">Lo que nos mueve</Eyebrow>
          <h2 id="resources-title">
            El sector,
            <br />
            en perspectiva.
          </h2>
          <p>
            Encuentros que dejan ideas.
            <br />
            Un trabajo que merece compartirse.
          </p>
          <a className="resources__portal" href={links.portal}>
            <span className="resources__portal-icon">
              <BookOpen size={22} strokeWidth={1.3} aria-hidden="true" />
            </span>
            <span>
              <strong>Tu punto de conexión.</strong>
              <span>Accede al Portal del Socio</span>
            </span>
            <ArrowUpRight size={20} strokeWidth={1.3} aria-hidden="true" />
          </a>
        </div>
        <div className="resources__list">
          {resources.map((r) => (
            <a className="resource" href={r.href} key={r.href}>
              <div className="resource__meta">
                <span>{r.category}</span>
                <span>{r.year}</span>
              </div>
              <h3>{r.title}</h3>
              <div className="resource__bottom">
                <span>
                  {r.type === 'video' ? (
                    <Play size={13} aria-hidden="true" />
                  ) : (
                    <BookOpen size={14} aria-hidden="true" />
                  )}
                  {r.detail}
                </span>
                <span className="resource__arrow">
                  <ArrowUpRight size={22} strokeWidth={1.2} aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="join-title">
      <div className="container final-cta__inner">
        <div>
          <Eyebrow>Tu empresa tiene mucho que aportar</Eyebrow>
          <h2 id="join-title">
            El futuro del sector se construye <span>en común.</span>
          </h2>
          <p>Forma parte de la comunidad que lo impulsa.</p>
        </div>
        <a className="final-cta__action" href={links.join}>
          <ArrowUpRight size={56} strokeWidth={1} aria-hidden="true" />
          <span>Quiero asociarme</span>
        </a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__identity">
            <Link to="/#inicio" aria-label="AFEB, volver al inicio">
              <img
                src="/media/afeb-logo.png"
                alt="AFEB. Asociación de Fabricantes de Bricolaje y Ferretería"
                width="138"
                height="104"
                loading="lazy"
              />
            </Link>
            <p>
              Conectamos a los fabricantes.
              <br />
              Impulsamos el bricolaje y la ferretería.
            </p>
          </div>
          <div className="footer__nav">
            <h3>Somos comunidad</h3>
            <nav aria-label="Navegación del pie de página">
              {navigation.map((n) => (
                <Link to={n.href} key={n.href}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer__contact">
            <h3>Hablemos</h3>
            <address>
              Av. Diagonal 477, 12B
              <br />
              08036 Barcelona<a href="tel:+34664104685">+34 664 104 685</a>
              <a href="mailto:administracion@brico-afeb.com">administracion@brico-afeb.com</a>
            </address>
            <a className="footer__contact-link" href={links.contact}>
              Contacto y sugerencias <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="footer__portal">
            <h3>Siempre conectados</h3>
            <p>
              Actividades, informes y recursos.
              <br />
              Todo AFEB, en un mismo lugar.
            </p>
            <Action href={links.portal} variant="outline">
              Portal del socio
            </Action>
            <Link className="footer__back" to="/#inicio">
              Volver arriba <ArrowDown size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 AFEB. Todos los derechos reservados.</span>
          <nav aria-label="Información legal">
            <a href={links.privacy}>Privacidad</a>
            <a href={links.legal}>Aviso legal</a>
            <a href={links.cookies}>Cookies</a>
          </nav>
          <span className="footer__signature">
            EL VALOR DE AVANZAR JUNTOS <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </div>
    </footer>
  )
}
