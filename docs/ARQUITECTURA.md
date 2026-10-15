# Arquitectura de la base

## Dirección técnica

Se utiliza Vite con React y TypeScript para iterar el diseño de forma rápida. No se ha elegido todavía el backend de producción. Si se adopta Next.js, las pantallas y componentes pueden migrarse a rutas App Router, reemplazando React Router y el estado demo por una capa de servicios. La auditoría también contempla WordPress con un plugin propio: la interfaz no resuelve esa decisión.

## Convenciones

- `main.tsx` carga la web pública para `/`, directorios públicos y guía de diseño; para el resto carga el portal. `website-entry.tsx` reutiliza la landing integrada en `src/website/` y sus estilos; `portal-entry.tsx` carga `App.tsx` y el CSS del portal. Los enlaces entre experiencias son enlaces de documento, para que no se mezclen sus estilos globales.
- Entrada: `/` → «Hazte socio» → `/login` → `/portal`. Volver desde acceso a la web carga `/`; los enlaces de inicio y los recorridos del portal usan `/portal`. No se introduce autenticación real ni se cambian las claves de persistencia.
- Solo hay un `package.json`, lockfile, configuración Vite y `index.html`, todos en la raíz. `public/media/` y `public/design-system/` contienen los assets versionados; no requieren instalación ni build en otra carpeta. El servidor de raíz y un único `dist/` sirven ambas experiencias. `vercel.json` fija Vite y el fallback SPA para recargas de `/login`, `/portal` y demás rutas.
- Alias `@/` apunta a `src/`.
- `App.tsx` registra rutas y proveedores; cada dominio vive en `features/`.
- UI básica en `components/ui/`: fuente de shadcn, accesibilidad de Radix. No reinventar diálogos, menú, select, checkbox o foco.
- Componentes de producto comunes en `components/shared.tsx`. Si crecen, separar formularios, listado y descargador en módulos propios.
- Base común inmutable en `data/mock-db.json`, adaptada por `data/fixtures.ts`. Estado de simulación en `lib/mock-backend.ts`, con comandos independientes de React y snapshots atómicos. `StoreProvider` se suscribe con `useSyncExternalStore`; el evento `storage` sincroniza pestañas. Se persiste bajo `afeb:mock:<datasetId>:`. Ver `DATOS_MOCK.md`. Los componentes no llaman al portal actual.
- Layout único con sidebar de escritorio, Sheet móvil, breadcrumb, búsqueda, notificaciones y ayuda. Cambiar de ruta reinicia el scroll.
- La búsqueda global agrupa el contenido visible de empresas, actividades, personas, informes, normativa, documentos, colaboradores y accesos al resto del portal. `components/global-search.tsx` presenta el diálogo; `lib/search.ts` construye y consulta el índice local. Ver `BUSQUEDA_GLOBAL.md`. Los listados filtran en memoria porque la demo es acotada.
- Manrope Variable servida localmente desde el kit de la landing en `public/design-system/fonts/`. Tokens compartidos en `src/styles/design-tokens.css` y adaptación de componentes en `src/styles/afeb-brand.css`; ver `SISTEMA_VISUAL.md`. Lucide es la única familia de iconos. Las ramas anteriores conservan Inter.
- Base funcional del portal en `index.css`; sistema visual en `styles/afeb-brand.css`. Tailwind da soporte a los primitives de shadcn. `main` integra el sistema visual de la landing; el diseño neutro queda en el historial.
- Estilo: fondos blancos, surfaces tranquilas, texto base de 16 px y metadatos de 14–15 px. Los verdes se concentran en navegación activa, acciones, estados y bloques destacados. El logotipo se muestra sin alterar sus proporciones ni recolorear el archivo. Ver `MARCA_AFEB.md`.
- Mobile first funcional: navegación con labels, listados apilados, formularios a una columna y tabla con scroll acotado. No ocultar funciones para simplificar la captura.
- El selector de roles es una herramienta de demo. Su lógica no constituye una frontera de seguridad.
- Las fichas TXT se generan con Blob a partir de nombres observados. El calendario permanece deshabilitado sin archivo o zona verificada. Los archivos privados reales pasarán por endpoints autorizados.

## Modelo local de fase 1

`lib/mock-types.ts` define los registros y payloads; `lib/mock-selectors.ts` compone origen y simulación. `members` conserva campos y rol propuesto; `invitations` y `registrations` enlazan persona/empresa/actividad; `requests` incluye tipo, payload, responsable e historial. `tenderPreferences` recupera el formulario. Las vistas usan estos mismos registros; el JSON observado permanece intacto. La persistencia es `backend:v2`, con migración del snapshot v1.

## Entidades de destino

`User/Person`, `Company`, `Membership`, `Brand`, `CommunicationPreference`, `Activity`, `Registration`, `Invitation`, `Report`, `ReportEdition`, `FileGrant`, `InstitutionalDocument`, `Provider`, `Benefit`, `AdviceRequest`, `CollaborationRequest`, `TenderPreference`, `AuditEvent`.

Separar estado comercial/condición de socio de rol de aplicación. PSR o Potencial Frío no son permisos. No aceptar `role`, `companyId` o estados internos arbitrarios desde edición de perfil.

## Sustitución del estado demo

Extender los comandos del repositorio local `lib/mock-backend.ts` mediante interfaces por dominio en `src/services/` y adaptadores mock/API. Mantener los escenarios de `DEMO.md`. Componentes deben consumir los mismos contratos tipados. Para producción, servidor resuelve identidad y empresa, filtra campos y autoriza cada lectura, escritura y descarga. No pasar tokens de Zoho al navegador. No persistir credenciales en localStorage.

Autenticación y autorización se repiten en operaciones de servidor. Usar sesiones revocables, autenticación mantenida, MFA para administración, límites, validación, errores controlados y almacenamiento privado. Cupos y duplicados requieren transacciones; los botones deshabilitados son solo feedback.

Las fechas observadas conservan sus campos locales y no presuponen una zona horaria de la fuente. Europe/Madrid es el contexto técnico de la simulación. Antes de producción, normalizar instantes en UTC con zona IANA `Europe/Madrid`, incluidos cambios de horario; el backend será responsable del cierre de inscripción. El reloj del borrador se fija al 14/10/2026 para poder explorar los estados con consistencia.

## Estado y pruebas

No hay un backend escondido, SDK de Zoho o conexión a la plataforma real. La comprobación TypeScript, build, revisión visual y recorridos funcionales están descritos en `VERIFICACION.md`. La continuidad debe añadir pruebas de negocio y permisos, no tests que solo repliquen la composición de tarjetas.
