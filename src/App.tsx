import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StoreProvider } from '@/lib/store'
import { AppShell } from '@/components/layout/app-shell'
import { EmptyState } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Activities, EventDetail, Invite } from '@/features/activities'
import { Companies, Directory, ContactDetail, Profile, CompanyDetail } from '@/features/community'
import { Reports, ReportDetail, Documents, Regulations } from '@/features/resources'
import { InvitationDetail, RequestDetail } from '@/features/workflows'
import { Providers, Groups, Cobranding, Tenders } from '@/features/services'
const Dashboard = lazy(() => import('@/features/dashboard'))
const DemoCenter = lazy(() => import('@/features/demo'))
const Management = lazy(() => import('@/features/management'))
const Auth = lazy(() => import('@/features/auth'))
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}
export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <TooltipProvider>
          <ScrollToTop />
          <Suspense
            fallback={
              <div className="loading-page" role="status">
                Preparando tu espacio…
              </div>
            }
          >
            <Routes>
              <Route path="/login" element={<Auth />} />
              <Route path="/forget-password" element={<Auth recovery />} />
              <Route element={<AppShell />}>
                <Route path="portal" element={<Dashboard />} />
                <Route path="eventos" element={<Activities />} />
                <Route path="detalles-evento" element={<EventDetail />} />
                <Route path="inscribir" element={<Invite />} />
                <Route path="socios" element={<Companies />} />
                <Route path="directorio" element={<Directory />} />
                <Route path="detalles-socio" element={<CompanyDetail />} />
                <Route path="detalles-de-mi-empresa" element={<CompanyDetail own />} />
                <Route path="detalles-equipo" element={<ContactDetail />} />
                <Route path="perfil" element={<Profile />} />
                <Route path="informes" element={<Reports />} />
                <Route path="detalles-informe" element={<ReportDetail />} />
                <Route path="publicaciones" element={<Navigate to="/informes" replace />} />
                <Route path="documentos" element={<Documents />} />
                <Route path="normativa" element={<Regulations />} />
                <Route path="colaboradores" element={<Providers />} />
                <Route path="grupos-trabajo" element={<Groups />} />
                <Route path="otras-acciones-cobranding" element={<Cobranding />} />
                <Route path="otras-acciones-licitaciones" element={<Tenders />} />
                <Route path="invitaciones/:id" element={<InvitationDetail />} />
                <Route path="solicitudes/:id" element={<RequestDetail />} />
                <Route path="demo" element={<DemoCenter />} />
                <Route path="gestion" element={<Management />} />
                <Route
                  path="*"
                  element={
                    <EmptyState
                      title="No encontramos esta página"
                      description="Vuelve al inicio para continuar explorando el portal."
                      action={
                        <Button asChild>
                          <Link to="/portal">Volver al inicio</Link>
                        </Button>
                      }
                    />
                  }
                />
              </Route>
            </Routes>
          </Suspense>
          <Toaster position="bottom-right" richColors={false} />
        </TooltipProvider>
      </StoreProvider>
    </BrowserRouter>
  )
}
