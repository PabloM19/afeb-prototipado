# Arquitectura de la base

## Dirección técnica

Se utiliza Vite con React y TypeScript para iterar el diseño de forma rápida. No se ha elegido todavía el backend de producción. Si se adopta Next.js, las pantallas y componentes pueden migrarse a rutas App Router, reemplazando React Router y el estado demo por una capa de servicios. La auditoría también contempla WordPress con un plugin propio: la interfaz no resuelve esa decisión.

## Convenciones

- Alias `@/` apunta a `src/`.
- `App.tsx` registra rutas y proveedores; cada dominio vive en `features/`.
- UI básica en `components/ui/`: fuente de shadcn, accesibilidad de Radix. No reinventar diálogos, menú, select, checkbox o foco.
- Componentes de producto comunes en `components/shared.tsx`. Si crecen, separar formularios, listado y descargador en módulos propios.
- Estado mutable en `StoreProvider`, persistido bajo `afeb:`. Fixtures inmutables para compañías, contactos y recursos. Los componentes no llaman al portal actual.
- Layout único con sidebar de escritorio, Sheet móvil, breadcrumb, búsqueda, notificaciones y ayuda. Cambiar de ruta reinicia el scroll.
- La búsqueda global consulta actividades, empresas e informes. Los listados filtran en memoria porque la demo es acotada.
- Inter Variable y Barlow Condensed instaladas localmente desde npm. Inter se usa en lectura y controles; Barlow en titulares y cifras destacadas. Lucide es la única familia de iconos.
- Base funcional en `index.css`; identidad de esta variante en `styles/afeb-brand.css`. Tailwind da soporte a los primitives de shadcn. La rama `main` conserva el diseño neutro.
- Estilo: fondos blancos, surfaces tranquilas, texto base de 16 px y metadatos de 14–15 px. Los verdes se concentran en navegación activa, acciones, estados y bloques destacados. El logotipo se muestra sin alterar sus proporciones ni recolorear el archivo. Ver `MARCA_AFEB.md`.
- Mobile first funcional: navegación con labels, listados apilados, formularios a una columna y tabla con scroll acotado. No ocultar funciones para simplificar la captura.
- El selector de roles es una herramienta de demo. Su lógica no constituye una frontera de seguridad.
- Descargas TXT de muestra e ICS se generan con Blob. Los archivos privados reales pasarán por endpoints autorizados.

## Entidades de destino

`User/Person`, `Company`, `Membership`, `Brand`, `CommunicationPreference`, `Activity`, `Registration`, `Invitation`, `Report`, `ReportEdition`, `FileGrant`, `InstitutionalDocument`, `Provider`, `Benefit`, `AdviceRequest`, `CollaborationRequest`, `TenderPreference`, `AuditEvent`.

Separar estado comercial/condición de socio de rol de aplicación. PSR o Potencial Frío no son permisos. No aceptar `role`, `companyId` o estados internos arbitrarios desde edición de perfil.

## Sustitución del estado demo

Crear interfaces por dominio en `src/services/` (todavía no implementadas) y adaptadores mock/API. Componentes deben consumir los mismos contratos tipados. Para producción, servidor resuelve identidad y empresa, filtra campos y autoriza cada lectura, escritura y descarga. No pasar tokens de Zoho al navegador. No persistir credenciales en localStorage.

Autenticación y autorización se repiten en operaciones de servidor. Usar sesiones revocables, autenticación mantenida, MFA para administración, límites, validación, errores controlados y almacenamiento privado. Cupos y duplicados requieren transacciones; los botones deshabilitados son solo feedback.

Los horarios de la demo se muestran según el navegador y están pensados para Europe/Madrid. Antes de producción, normalizar instantes en UTC con zona IANA `Europe/Madrid`, incluidos cambios de horario; el backend será responsable del cierre de inscripción. El reloj del borrador se fija al 14/10/2026 para poder explorar los estados con consistencia.

## Estado y pruebas

No hay un backend escondido, SDK de Zoho o conexión a la plataforma real. La comprobación TypeScript, build, revisión visual y recorridos funcionales están descritos en `VERIFICACION.md`. La continuidad debe añadir pruebas de negocio y permisos, no tests que solo repliquen la composición de tarjetas.
