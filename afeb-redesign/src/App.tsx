import { lazy, Suspense } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import {
  About,
  Activities,
  Associates,
  Benefits,
  ClubExport,
  FinalCTA,
  Footer,
  Hero,
  Resources,
  Statistics,
} from './components/sections'
import CompaniesPage from './pages/CompaniesPage'
import CompanyPage from './pages/CompanyPage'
import ProviderPage from './pages/ProviderPage'
import ProvidersPage from './pages/ProvidersPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { NavigationEffects, usePageTitle } from './routing'

const DesignSystemPage = lazy(() => import('./pages/DesignSystemPage'))

function WebsiteLayout() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function HomePage() {
  usePageTitle('El sector avanza cuando avanzamos juntos')
  return (
    <>
      <Hero />
      <Statistics />
      <About />
      <Associates />
      <Benefits />
      <Activities />
      <ClubExport />
      <Resources />
      <FinalCTA />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <NavigationEffects />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Routes>
        <Route
          path="/sistema-de-diseno"
          element={
            <Suspense
              fallback={
                <main id="contenido" className="container section-space">
                  <p>Cargando sistema de diseño…</p>
                </main>
              }
            >
              <DesignSystemPage />
            </Suspense>
          }
        />
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/empresas-asociadas" element={<CompaniesPage />} />
          <Route path="/empresas-asociadas/:slug" element={<CompanyPage />} />
          <Route path="/proveedores-recomendados" element={<ProvidersPage />} />
          <Route path="/proveedores-recomendados/:slug" element={<ProviderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
