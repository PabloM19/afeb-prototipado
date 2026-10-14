import { useState } from 'react'
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
  ChevronsUpDown,
  Settings2,
  Menu,
  CircleHelp,
  LogOut,
  ChevronRight,
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
import { useStore } from '@/lib/store'
const navigation = [
  { label: 'Inicio', path: '/', icon: LayoutDashboard },
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
      '/detalles-evento': 'Detalle de actividad',
      '/detalles-informe': 'Detalle de informe',
      '/detalles-socio': 'Ficha de empresa',
      '/inscribir': 'Invitar asistentes',
      '/otras-acciones-cobranding': 'Cobranding',
      '/otras-acciones-licitaciones': 'Licitaciones',
      '/detalles-equipo': 'Contacto',
    }[location.pathname] ||
    'Portal del socio'
  const nav = (
    <>
      <Link
        className="brand"
        to="/"
        aria-label="AFEB · Portal del socio"
        onClick={() => setMobile(false)}
      >
        <BrandMark />
        <span className="brand-caption">Portal del socio</span>
      </Link>
      <div className="workspace">
        <div className="company-mark">NT</div>
        <div>
          <strong>{store.business.name}</strong>
          <span>Empresa asociada</span>
        </div>
        <ChevronsUpDown size={14} />
      </div>
      <div className="nav-caption">Tu espacio AFEB</div>
      <nav aria-label="Navegación principal">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            end={path === '/'}
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
          <p>Tu equipo AFEB, a un clic.</p>
          <button onClick={() => setHelp(true)}>
            Contactar con AFEB
            <ArrowUpRight size={15} />
          </button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="user-switch">
            <Avatar initials="CM" />
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
              Se restablecerán los datos ficticios de esta demo: perfil, empresa, marcas, equipo,
              preferencias, actividades y solicitudes. Solo afecta a este navegador.
            </DialogDescription>
          </DialogHeader>
          <div className="form-actions">
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => store.reset()}>Restablecer demo</Button>
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
          <GlobalSearch />
          <div className="topbar-actions">
            <span className="prototype-tag">Demo local</span>
            <button
              className="notification-button"
              aria-label="Ver notificaciones"
              onClick={() => setNotifications(true)}
            >
              <Bell size={19} />
              <span />
            </button>
            <Link to="/perfil" aria-label="Mi perfil">
              <Avatar initials="CM" size="small" />
            </Link>
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
            <DialogTitle>Hablemos.</DialogTitle>
            <DialogDescription>
              Elige el área que mejor encaje con tu consulta. Datos de ejemplo.
            </DialogDescription>
          </DialogHeader>
          {[
            ['Atención al socio', 'Perfil, empresa y acceso al portal'],
            ['Actividades y formación', 'Inscripciones, encuentros y webinars'],
            ['Informes y normativa', 'Documentación y asesoría'],
          ].map(([title, desc]) => (
            <div className="contact-help" key={title}>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <a
                className="text-link"
                href={`mailto:atencion@afeb.example?subject=${encodeURIComponent(title)}`}
              >
                Escribir
                <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
          <p className="form-hint">
            Direcciones ficticias. Se sustituirán por los contactos confirmados por AFEB.
          </p>
        </DialogContent>
      </Dialog>
      <Dialog open={notifications} onOpenChange={setNotifications}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Al día con AFEB</DialogTitle>
            <DialogDescription>Novedades de demostración de tu espacio.</DialogDescription>
          </DialogHeader>
          {[
            [
              'Nuevo informe disponible',
              'Evolución de ventas · 3.er trimestre 2026',
              '/detalles-informe?id=ventas',
            ],
            [
              'Tu próxima actividad',
              'Del dato a la decisión · 28 de octubre',
              '/detalles-evento?id=webinar',
            ],
          ].map(([title, desc, path]) => (
            <Link
              className="notification-item"
              key={path}
              to={path}
              onClick={() => setNotifications(false)}
            >
              <Bell size={18} />
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  )
}
