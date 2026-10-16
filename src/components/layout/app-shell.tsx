import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Building2,
  UsersRound,
  ChartNoAxesCombined,
  Scale,
  Files,
  Handshake,
  Layers,
  ArrowUpRight,
  Bell,
  FileText,
  ChevronsUpDown,
  Settings2,
  Menu,
  CircleHelp,
  LogOut,
  ChevronRight,
  Play,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar } from '@/components/shared'
import { BrandMark } from '@/components/brand-mark'
import { GlobalSearch } from '@/components/global-search'
import { afebTeam, reports, activities } from '@/data/fixtures'
import { initialsFor, referenceIds } from '@/data/mock-db'
import { useStore } from '@/lib/store'
const navigation = [
  { label: 'Inicio', path: '/portal', icon: LayoutDashboard },
  { label: 'Actividades', path: '/eventos', icon: CalendarDays },
  { label: 'Empresas asociadas', path: '/socios', icon: Building2 },
  { label: 'Directorio', path: '/directorio', icon: UsersRound },
  { label: 'Informes del sector', path: '/informes', icon: ChartNoAxesCombined },
  { label: 'Normativa y asesoría', path: '/normativa', icon: Scale },
  { label: 'Documentos', path: '/documentos', icon: Files },
  { label: 'Colaboradores', path: '/colaboradores', icon: Handshake },
  { label: 'Grupos de trabajo', path: '/grupos-trabajo', icon: Layers },
]
export function AppShell() {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const keepProfileOpen = () => {
    clearTimeout(profileCloseTimer.current)
    setProfileOpen(true)
  }
  const scheduleProfileClose = () => {
    clearTimeout(profileCloseTimer.current)
    profileCloseTimer.current = setTimeout(() => setProfileOpen(false), 200)
  }
  useEffect(() => () => clearTimeout(profileCloseTimer.current), [])
  useEffect(() => setProfileOpen(false), [location.pathname, location.search])
  const [mobile, setMobile] = useState(false)
  const [help, setHelp] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const current =
    navigation.find((x) => x.path === location.pathname)?.label ||
    {
      '/perfil': 'Mi perfil',
      '/detalles-de-mi-empresa': 'Mi empresa',
      '/gestion': 'Gestión interna',
      '/demo': 'Centro de demos',
      '/detalles-evento': 'Detalle de actividad',
      '/detalles-informe': 'Detalle de informe',
      '/detalles-socio': 'Ficha de empresa',
      '/inscribir': 'Invitar asistentes',
      '/otras-acciones-cobranding': 'Cobranding',
      '/otras-acciones-licitaciones': 'Licitaciones',
      '/detalles-equipo': 'Contacto',
    }[location.pathname] ||
    (location.pathname.startsWith('/invitaciones/')
      ? 'Invitación local'
      : location.pathname.startsWith('/solicitudes/')
        ? 'Detalle de solicitud'
        : 'Portal del socio')
  const nav = (
    <>
      <Link
        className="brand"
        to="/portal"
        aria-label="AFEB · Portal del socio"
        onClick={() => setMobile(false)}
      >
        <BrandMark />
        <span className="brand-caption">Portal del socio</span>
      </Link>
      <nav aria-label="Navegación principal">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            end={path === '/portal'}
            to={path}
            onClick={() => setMobile(false)}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
            {path === '/eventos' && (
              <span className="nav-count">
                {store.activities.filter((a) => a.state === 'Abierta').length}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <NavLink
        to="/demo"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={() => setMobile(false)}
      >
        <Play size={18} />
        Centro de demos
      </NavLink>
      <div className="nav-caption nav-caption-second">Tu empresa</div>
      <nav aria-label="Empresa">
        <NavLink
          to="/detalles-de-mi-empresa"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={() => setMobile(false)}
        >
          <Building2 size={18} />
          Mi empresa
        </NavLink>
        <NavLink
          to="/perfil"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={() => setMobile(false)}
        >
          <UsersRound size={18} />
          Mi perfil
        </NavLink>
        {store.role === 'Gestor AFEB' && (
          <NavLink
            to="/gestion"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobile(false)}
          >
            <Settings2 size={18} />
            Gestión interna
          </NavLink>
        )}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card">
          <span>Estamos para ayudarte.</span>
          <button onClick={() => setHelp(true)}>
            Contactar con AFEB
            <ArrowUpRight size={15} />
          </button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="user-switch">
            <Avatar initials={initialsFor(store.person.name)} />
            <div>
              <strong>{store.person.name}</strong>
              <span>{store.role}</span>
            </div>
            <ChevronsUpDown size={15} />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuLabel>Vista de demostración</DropdownMenuLabel>
            {(['Socio', 'SocioAdmin', 'Gestor AFEB'] as const).map((role) => (
              <DropdownMenuItem key={role} onClick={() => store.setRole(role)}>
                {role}
                {store.role === role && ' ✓'}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/demo')}>Centro de demos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/perfil')}>Mi perfil</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setResetOpen(true)}>Restablecer demo</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/login')}>
              <LogOut size={15} />
              Ver pantalla de acceso
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
  return (
    <div className="app-shell">
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Volver al punto de partida</DialogTitle>
            <DialogDescription>
              Se recuperará la base verificada y se borrarán los cambios locales de perfil, empresa,
              marcas, equipo, preferencias, actividades y solicitudes. Solo afecta a este navegador.
            </DialogDescription>
          </DialogHeader>
          <div className="form-actions">
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                store.reset()
                setResetOpen(false)
                navigate('/portal')
              }}
            >
              Restablecer demo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <aside className="sidebar">{nav}</aside>
      <Sheet open={mobile} onOpenChange={setMobile}>
        <SheetContent side="left" className="mobile-sidebar">
          <SheetTitle className="sr-only">Menú del portal</SheetTitle>
          <SheetDescription className="sr-only">
            Navega por tu espacio AFEB y tu empresa.
          </SheetDescription>
          {nav}
        </SheetContent>
      </Sheet>
      <div className="main-column">
        <header className="topbar has-global-search">
          <div className="topbar-context">
            <div className="breadcrumb">
              <Button
                aria-label="Abrir menú"
                className="mobile-menu"
                variant="ghost"
                size="icon"
                onClick={() => setMobile(true)}
              >
                <Menu size={20} />
              </Button>
              <span>Portal del socio</span>
              <ChevronRight size={13} />
              <strong>{current}</strong>
            </div>
          </div>
          <GlobalSearch />
          <div className="topbar-actions">
            <span className="prototype-tag">Demo local</span>
            <button
              className="notification-button"
              aria-label="Ver accesos de la demo"
              title="Accesos de la demo"
              aria-haspopup="dialog"
              onClick={() => setNotifications(true)}
            >
              <Bell size={19} />
              <span aria-hidden="true" />
            </button>
            <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen} modal={false}>
              <DropdownMenuTrigger
                className="profile-menu-trigger"
                aria-label="Menú de perfil"
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') keepProfileOpen()
                }}
                onPointerLeave={scheduleProfileClose}
                onClick={keepProfileOpen}
                onPointerDown={(event) => {
                  if (event.pointerType === 'mouse' && event.button === 0) {
                    event.preventDefault()
                    keepProfileOpen()
                  }
                }}
              >
                <Avatar initials={initialsFor(store.person.name)} size="small" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="profile-menu-content"
                onPointerEnter={keepProfileOpen}
                onPointerLeave={scheduleProfileClose}
              >
                <DropdownMenuLabel className="profile-company-label">
                  <span>Tu empresa</span>
                  <strong>{store.business.name}</strong>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/perfil')}>
                  <UsersRound size={16} /> Ver perfil
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate('/perfil?tab=comunicaciones')}>
                  <Settings2 size={16} /> Preferencias
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/login')}>
                  <LogOut size={16} /> Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main id="main" className="main-content" key={location.pathname}>
          <Outlet />
        </main>
        <footer className="app-footer">
          <span>AFEB · Conectamos empresas. Impulsamos el sector.</span>
          <button onClick={() => setHelp(true)}>
            Ayuda y contacto
            <CircleHelp size={14} />
          </button>
        </footer>
      </div>
      <Dialog open={help} onOpenChange={setHelp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contacto con AFEB</DialogTitle>
            <DialogDescription>Contactos de la muestra del portal AFEB.</DialogDescription>
          </DialogHeader>
          {afebTeam.map(({ name: title, position: desc, email }) => (
            <div className="contact-help" key={title}>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <a
                className="text-link"
                href={`mailto:${email}?subject=${encodeURIComponent(title)}`}
              >
                Escribir
                <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
          <p className="form-hint">Muestra recogida el 14/10/2026.</p>
        </DialogContent>
      </Dialog>
      <Dialog open={notifications} onOpenChange={setNotifications}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accesos de la demo</DialogTitle>
            <DialogDescription>
              Accesos a los registros de la muestra. No se han importado notificaciones reales.
            </DialogDescription>
          </DialogHeader>
          {[
            {
              label: 'Informe',
              title: reports.find((r) => r.id === referenceIds.featuredReportId)!.title,
              path: `/detalles-informe?id=${referenceIds.featuredReportId}`,
              icon: FileText,
            },
            {
              label: 'Actividad',
              title: activities.find((a) => a.id === referenceIds.featuredActivityId)!.title,
              path: `/detalles-evento?id=${referenceIds.featuredActivityId}`,
              icon: CalendarDays,
            },
          ].map(({ label, title, path, icon: Icon }) => (
            <Link
              className="notification-item"
              key={path}
              to={path}
              onClick={() => setNotifications(false)}
            >
              <Icon size={18} aria-hidden="true" />
              <div>
                <strong>{label}</strong>
                <p>{title}</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  )
}
