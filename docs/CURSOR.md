# Continuidad en Cursor

## Contexto para empezar

Este repositorio contiene el primer borrador del portal del socio AFEB. No comenzar otra aplicación ni reemplazar el sistema visual: extender esta base. Revisar `README.md`, `docs/HOJA_DE_RUTA_AFEB.md`, `docs/ALCANCE.md`, `docs/ARQUITECTURA.md` y la auditoría original en `output/pdf/auditoria_portal_afeb_2026-10-14.pdf` antes de ampliar el alcance.

Stack: React 19, TypeScript, Vite 7, Tailwind 4, shadcn/ui, Radix, Lucide, React Router, Sonner y Recharts. `main` conserva el diseño neutro; `codex/afeb-brand` aplica el logotipo completo, los verdes y la tipografía Inter de `main`, según `MARCA_AFEB.md`. Layout común, módulos por dominio y base observada centralizada en `src/data/mock-db.json`. Mini backend local en `src/lib/mock-backend.ts`, con `StoreProvider` suscrito y Centro de demos en `/demo`; ningún backend o credencial real. `/publicaciones` redirige a `/informes`, `/detalles-equipo` es propuesta, grupos vacíos e informe por empresa sin archivo asignado.

El punto de entrada para revisar el diseño es `npm run dev`. `npm run build` verifica tipos y bundle. Los roles se prueban desde el menú de usuario; `Gestor AFEB` habilita el panel editorial de muestra. Restablecer vuelve a la base observada; leer `docs/DATOS_MOCK.md` antes de modificar datos.

## Orden de trabajo sugerido

Seguir las fases de [HOJA_DE_RUTA_AFEB.md](HOJA_DE_RUTA_AFEB.md), manteniendo sus IDs y estados actualizados:

1. Completar miembros, invitaciones y solicitudes como entidades relacionadas del mini backend.
2. Completar campos y operaciones de perfil, empresa y directorios.
3. Completar gestión editorial, archivos de demo autorizados y recorridos de presentación.
4. Acordar arquitectura, datos y permisos y probar la integración mínima.
5. Construir backend real y conectar el front existente.
6. Ejecutar aceptación, migración acotada y preparación de staging/salida.

Los prompts siguientes son plantillas por dominio; su numeración no sustituye ese orden ni autoriza integración o despliegue.

## Prompt para el siguiente bloque del mock

> Lee docs/HOJA_DE_RUTA_AFEB.md, docs/DATOS_MOCK.md, docs/DEMO.md y el código actual. Completa E-09, M-04, V-12, V-13 y S-03 en el mini backend local: registros de miembro e invitación con IDs, datos introducidos conservados, relaciones de empresa/actividad/persona y payload por tipo de solicitud. Reutiliza mock-db.json como fuente factual y conserva valores desconocidos. No asignar roles reales no comprobados ni introducir registros plausibles en la base. Las reglas de aceptación no confirmadas deben quedar identificadas como propuestas de simulación. Mantén el estilo y los recorridos existentes. Comprueba recarga, sincronización entre pestañas, duplicados y restablecimiento, y demuestra el ciclo de invitación hacia una inscripción local. No conectar el portal privado ni Zoho, enviar correos o desplegar. Actualiza los IDs afectados y los límites reales de la hoja de ruta y ejecuta las comprobaciones pertinentes.

Cada prompt debe abarcar un dominio y dejar el proyecto compilando. Añadir criterios de aceptación concretos. No mezclar integración Zoho, rediseño y despliegue en una sola tarea.

## Prompt 1 · Completar empresa y perfil

> Continúa la base local AFEB de este repositorio. Lee README.md, docs/ALCANCE.md, docs/ARQUITECTURA.md, docs/MARCA_AFEB.md y la auditoría original. Conserva la identidad de esta rama y reutiliza componentes shadcn/Radix y shared. Completa los campos del perfil y de mi empresa documentados como pendientes: nombres/apellidos separados, foto y segundo teléfono, opciones Otro, dirección/provincia/CP, contacto principal, marca principal, categorías múltiples, facturación del sector, tipología, mercados, CNAE, canales y asociaciones. Añade edición de miembros y preferencias con controles claros. Esta tarea es frontend local: reutiliza mock-db.json, conserva campos desconocidos y no inventes contenido. No conectar CRM ni portal actual ni introducir credenciales. Separa campos compartidos y privados. La edición personal no modifica empresa ni rol. El coste por marca sigue sin decidirse: no fijarlo arbitrariamente. Actualiza cobertura y verifica escritorio, móvil, teclado y npm run build.

## Prompt 2 · Capa de servicios y contratos

> Extiende el mini backend src/lib/mock-backend.ts y la integración de StoreProvider mediante contratos tipados y servicios por dominio en src/services. El adaptador mock debe leer src/data/mock-db.json, conservar IDs, procedencia, relaciones y valores null. Reutiliza el repositorio mock existente y conserva los recorridos de docs/DEMO.md y las pruebas npm run mock:flows. Define una frontera para un futuro adaptador de servidor. Añade estados útiles de carga, error, vacío y reintento. Las pantallas no deben conocer detalles del CRM. No añadas tokens ni llamadas al Zoho real. Documenta los contratos para empresa, perfil, actividades, inscripciones, documentos y solicitudes. Mantén el diseño existente y confirma con recorridos que la demo sigue funcionando. Escribe pruebas para duplicados, estados/cierre/cupo y límites de selección donde verifiquen reglas reales.

## Prompt 3 · Backend y permisos (requiere decisiones previas)

> Implementa el backend AFEB según las decisiones confirmadas y registradas en docs. Si aún faltan backend, fuente de verdad, relación de empresa o proveedor de identidad, solicita únicamente esos datos antes de integrar. Usa autenticación mantenida; identidad y empresa se resuelven en servidor. Autoriza por operación y recurso, deniega por defecto y no aceptes cambios de role/companyId desde perfil. Utiliza los registros verificados de la base para las pruebas; cualquier empresa sintética adicional requiere acordarla y separarla de los datos observados. Verifica lecturas/escrituras/descargas cruzadas rechazadas, sesiones revocables y límites. Sustituye el selector de roles de demo en el flujo real. Mantén componentes y estilo. No desplegar ni alterar el portal anterior.

## Prompt 4 · Actividades e inscripciones

> Completa catálogo, detalle y panel interno de actividades con los contratos de backend aprobados. Añade patrocinador, público permitido, tarifas, ubicación/enlace, documentos y logística. Centraliza estados borrador/publicado/cerrado/finalizado; normaliza UTC y Europe/Madrid, cupo y fecha límite en servidor. Inscribir y cancelar deben ser idempotentes y transaccionales. Invitaciones deben validar identidad, empresa, duplicados, límites y aceptación; aclara invitados externos y costes si sigue pendiente. Prueba cierre, agotamiento de plazas, peticiones simultáneas, duplicados y borradores. Pagos y facturas no forman parte de esta tarea.

## Prompt 5 · Documentos y gestión editorial

> Completa informes, documentos, normativa y proveedores con paneles editoriales accesibles reutilizando formularios y tablas existentes. Implementa carga, categorías, versiones, fechas, destinatarios, publicar/archivar y asignación archivo-empresa. Archivos privados fuera de la biblioteca pública; servidor autoriza cada descarga. Sustituye TXT de demo solo cuando haya archivos reales autorizados. Para Mapa de la Distribución, mantener entrega manual por empresa; marcas de agua automáticas son alcance adicional. Valida con dos empresas y acceso sin sesión. No simules éxito de subidas o permisos que no estén implementados.

## Prompt 6 · Búsqueda global con datos reales

> Conserva el buscador implementado en components/global-search.tsx y lee docs/BUSQUEDA_GLOBAL.md. Cuando exista el backend aprobado, sustituye el índice local por un servicio común que busque en todas las áreas y devuelva grupos y contadores. Usuario, empresa y permisos se resuelven en servidor antes de obtener resultados o totales; los borradores solo deben aparecer para roles autorizados. Mantén filtros por área, coincidencia sin tildes, navegación contextual, estados vacío/carga/error y teclado. Añade paginación por área si el volumen lo exige. No indexar texto de archivos privados ni ampliar su visibilidad sin una política de acceso acordada. Verifica selección de otro recurso dentro de la misma ruta, aislamiento entre empresas, exclusión de registros restringidos y autorización independiente de descarga.

## Reglas de continuidad

- La cobertura vigente está en `docs/HOJA_DE_RUTA_AFEB.md`: actualizar estados por ID después de cada entrega y mantener «Parcial» si falta una etapa del flujo.

- Usar `src/data/mock-db.json` como única fuente factual; no crear fixtures paralelos ni completar huecos sin evidencia. Pasar `npm run mock:check` y conservar escenarios de `docs/DATOS_MOCK.md`.
- No usar las credenciales reales del portal como fixture, variable frontend o documentación.
- No asumir que campos, roles o páginas no inspeccionados están verificados por la auditoría.
- Mantener diferenciados el estado comercial, la condición de socio y el rol de aplicación.
- Evitar mostrar éxito cuando una API haya fallado; errores deben dejar intacto el formulario.
- No publicar enlaces permanentes de archivos privados ni exponer secretos de Zoho.
- Cambios de negocio necesitan validación de servidor; frontend solo da feedback.
- Mantener la documentación alineada con lo que está implementado, propuesto y pendiente.
