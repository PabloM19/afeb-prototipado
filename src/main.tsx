import React from 'react'
import ReactDOM from 'react-dom/client'

// Each experience owns its global CSS. Cross-experience links reload the document
// so landing styles never leak into the portal, or the other way around.
const websitePath =
  window.location.pathname === '/' ||
  /^\/(empresas-asociadas|proveedores-recomendados|sistema-de-diseno)(\/|$)/.test(
    window.location.pathname,
  )

async function start() {
  const { default: App } = websitePath
    ? await import('./website-entry')
    : await import('./portal-entry')
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

void start()
