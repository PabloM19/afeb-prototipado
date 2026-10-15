import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { links, navigation } from '../data'
import { Action } from './ui'

export function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
      if (event.key === 'Tab') {
        const controls = [
          toggle.current,
          ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
        ].filter(Boolean) as HTMLElement[]
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    menu.current?.querySelector('a')?.focus()
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1241px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <header className={`header${open ? ' header--open' : ''}`}>
      <div className="container header__inner">
        <Link
          to="/#inicio"
          className="brand"
          aria-label="AFEB, ir al inicio"
          onClick={() => setOpen(false)}
        >
          <img
            src="/media/afeb-logo.png"
            alt="AFEB. Asociación de Fabricantes de Bricolaje y Ferretería"
            width="120"
            height="91"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header__actions">
          <a href={links.portal} className="portal-link">
            Portal del socio <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <Action href={links.join} className="header__join">
            Hazte socio
          </Action>
        </div>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      {open && (
        <div ref={menu} className="mobile-menu" id="mobile-navigation">
          <nav aria-label="Navegación móvil">
            {navigation.map((item, i) => (
              <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
                <span className="mobile-menu__number">0{i + 1}</span>
                {item.label}
                <ArrowUpRight size={24} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__actions">
            <Action href={links.join} variant="lime">
              Hazte socio
            </Action>
            <Action href={links.portal} variant="outline">
              Portal del socio
            </Action>
          </div>
          <p>
            Conectamos empresas.
            <br />
            Impulsamos el sector.
          </p>
        </div>
      )}
    </header>
  )
}
