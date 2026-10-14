# Continuidad en Cursor

## Contexto para empezar

Este repositorio contiene el primer borrador del portal del socio AFEB. No comenzar otra aplicación ni reemplazar el sistema visual: extender esta base. Revisar `README.md`, `docs/ALCANCE.md`, `docs/ARQUITECTURA.md` y la auditoría original en `output/pdf/auditoria_portal_afeb_2026-10-14.pdf` antes de ampliar el alcance.

Stack: React 19, TypeScript, Vite 7, Tailwind 4, shadcn/ui, Radix, Lucide, React Router, Sonner y Recharts. `main` conserva el diseño neutro; `codex/afeb-brand` aplica el logotipo completo, los verdes y la tipografía Inter de `main`, según `MARCA_AFEB.md`. Layout común, módulos por dominio y datos ficticios separados. Persistencia demo en `StoreProvider`; ningún backend o credencial real. `/publicaciones` redirige a `/informes`, `/detalles-equipo` es propuesta, grupos vacíos e informe por empresa sin archivo asignado.

El punto de entrada para revisar el diseño es `npm run dev`. `npm run build` verifica tipos y bundle. Los roles se prueban desde el menú de usuario; `Gestor AFEB` habilita el panel editorial de muestra. Restablecer la demo vuelve a los fixtures originales.

## Orden de trabajo sugerido

1. Validar el diseño con AFEB y completar los campos pendientes de perfil y empresa.
2. Cerrar decisiones de datos, permisos, inscripción, directorio y grupos.
3. Elegir backend, definir contratos y construir servicios mock intercambiables.
4. Implementar identidad y autorización en servidor con dos empresas de prueba.
5. Conectar empresas, contactos, actividades e inscripciones con reglas transaccionales.
6. Construir almacenamiento privado, concesiones de documentos y panel editorial.
7. Conectar solicitudes y correo; ampliar catálogos.
8. Ejecutar pruebas de aceptación y preparar staging.

Cada prompt debe abarcar un dominio y dejar el proyecto compilando. Añadir criterios de aceptación concretos. No mezclar integración Zoho, rediseño y despliegue en una sola tarea.

## Prompt 1 · Completar empresa y perfil

> Continúa la base local AFEB de este repositorio. Lee README.md, docs/ALCANCE.md, docs/ARQUITECTURA.md, docs/MARCA_AFEB.md y la auditoría original. Conserva la identidad de esta rama y reutiliza componentes shadcn/Radix y shared. Completa los campos del perfil y de mi empresa documentados como pendientes: nombres/apellidos separados, foto y segundo teléfono, opciones Otro, dirección/provincia/CP, contacto principal, marca principal, categorías múltiples, facturación del sector, tipología, mercados, CNAE, canales y asociaciones. Añade edición de miembros y preferencias con controles claros. Esta tarea es exclusivamente frontend local con datos ficticios: no conectar CRM ni portal actual ni introducir credenciales. Separa campos compartidos y privados. La edición personal no modifica empresa ni rol. El coste por marca sigue sin decidirse: no fijarlo arbitrariamente. Actualiza cobertura y verifica escritorio, móvil, teclado y npm run build.

## Prompt 2 · Capa de servicios y contratos

> Sustituye la dependencia directa de fixtures y StoreProvider por contratos tipados y servicios por dominio en src/services. Implementa un adaptador mock que preserve los flujos actuales y una frontera para un futuro adaptador de servidor. Añade estados útiles de carga, error, vacío y reintento. Las pantallas no deben conocer detalles del CRM. No añadas tokens ni llamadas al Zoho real. Documenta los contratos para empresa, perfil, actividades, inscripciones, documentos y solicitudes. Mantén el diseño existente y confirma con recorridos que la demo sigue funcionando. Escribe pruebas para duplicados, estados/cierre/cupo y límites de selección donde verifiquen reglas reales.

## Prompt 3 · Backend y permisos (requiere decisiones previas)

> Implementa el backend AFEB según las decisiones confirmadas y registradas en docs. Si aún faltan backend, fuente de verdad, relación de empresa o proveedor de identidad, solicita únicamente esos datos antes de integrar. Usa autenticación mantenida; identidad y empresa se resuelven en servidor. Autoriza por operación y recurso, deniega por defecto y no aceptes cambios de role/companyId desde perfil. Crea dos empresas ficticias, Socio, SocioAdmin y Gestor AFEB. Verifica lecturas/escrituras/descargas cruzadas rechazadas, sesiones revocables y límites. Sustituye el selector de roles de demo en el flujo real. Mantén componentes y estilo. No desplegar ni alterar el portal anterior.

## Prompt 4 · Actividades e inscripciones

> Completa catálogo, detalle y panel interno de actividades con los contratos de backend aprobados. Añade patrocinador, público permitido, tarifas, ubicación/enlace, documentos y logística. Centraliza estados borrador/publicado/cerrado/finalizado; normaliza UTC y Europe/Madrid, cupo y fecha límite en servidor. Inscribir y cancelar deben ser idempotentes y transaccionales. Invitaciones deben validar identidad, empresa, duplicados, límites y aceptación; aclara invitados externos y costes si sigue pendiente. Prueba cierre, agotamiento de plazas, peticiones simultáneas, duplicados y borradores. Pagos y facturas no forman parte de esta tarea.

## Prompt 5 · Documentos y gestión editorial

> Completa informes, documentos, normativa y proveedores con paneles editoriales accesibles reutilizando formularios y tablas existentes. Implementa carga, categorías, versiones, fechas, destinatarios, publicar/archivar y asignación archivo-empresa. Archivos privados fuera de la biblioteca pública; servidor autoriza cada descarga. Sustituye TXT de demo solo cuando haya archivos reales autorizados. Para Mapa de la Distribución, mantener entrega manual por empresa; marcas de agua automáticas son alcance adicional. Valida con dos empresas y acceso sin sesión. No simules éxito de subidas o permisos que no estén implementados.

## Prompt 6 · Búsqueda global con datos reales

> Conserva el buscador implementado en components/global-search.tsx y lee docs/BUSQUEDA_GLOBAL.md. Cuando exista el backend aprobado, sustituye el índice local por un servicio común que busque en todas las áreas y devuelva grupos y contadores. Usuario, empresa y permisos se resuelven en servidor antes de obtener resultados o totales; los borradores solo deben aparecer para roles autorizados. Mantén filtros por área, coincidencia sin tildes, navegación contextual, estados vacío/carga/error y teclado. Añade paginación por área si el volumen lo exige. No indexar texto de archivos privados ni ampliar su visibilidad sin una política de acceso acordada. Verifica selección de otro recurso dentro de la misma ruta, aislamiento entre empresas, exclusión de registros restringidos y autorización independiente de descarga.

## Reglas de continuidad

- No usar las credenciales reales del portal como fixture, variable frontend o documentación.
- No asumir que campos, roles o páginas no inspeccionados están verificados por la auditoría.
- Mantener diferenciados el estado comercial, la condición de socio y el rol de aplicación.
- Evitar mostrar éxito cuando una API haya fallado; errores deben dejar intacto el formulario.
- No publicar enlaces permanentes de archivos privados ni exponer secretos de Zoho.
- Cambios de negocio necesitan validación de servidor; frontend solo da feedback.
- Mantener la documentación alineada con lo que está implementado, propuesto y pendiente.
