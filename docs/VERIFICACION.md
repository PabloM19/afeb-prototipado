> Las comprobaciones de diseño y búsqueda anteriores usan el dataset inicial. La nueva base observada y sus recorridos se documentan en `DATOS_MOCK.md` y en la comprobación añadida al final.

# Verificación del borrador

Revisión realizada el 14 de octubre de 2026 sobre el servidor local Vite. Se utilizó el navegador de Codex para recorrer la aplicación, capturar las pantallas y comprobar estados renderizados. El repositorio estaba vacío de interfaz React al comenzar; no existía una pantalla local anterior para una comparación visual antes/después. La plataforma actual no se modificó.

## Comprobaciones técnicas

- `npm run build`: TypeScript estricto y bundle de producción correctos. Comprobación de imports/parámetros sin utilizar habilitada.
- `npm run format:check`: formato coherente del código y documentación.
- Bundle separado para componentes Radix y gráficos; sin advertencia de chunk de más de 500 kB.
- Fuente instalada localmente. No hay tokens ni credenciales del portal en los archivos nuevos.
- Durante la edición se observaron avisos transitorios de conexión/reload de Vite HMR. La comprobación final se hizo también sobre `npm run preview`: inicio, detalle de actividad e informes renderizados sin errores ni warnings en una pestaña nueva. No se observaron errores de aplicación en ese recorrido.

## Recorridos comprobados

- Renderizado de las 21 rutas del inventario y de `/gestion`, con variantes de informe y detalle. `/publicaciones` redirige correctamente.
- Búsqueda de actividad, histórico, búsqueda de empresa y búsqueda global de informes.
- Inscripción deshabilitada hasta aceptar las condiciones ficticias; confirmación local y cancelación. Registro único por actividad en el estado demo.
- Edición de cargo personal, persistencia tras recarga y restauración del dato original.
- Cobranding: selección de cinco empresas, sexta opción deshabilitada, registro local y recepción en gestión.
- Alta de actividad en borrador, rechazo de final anterior al inicio, guardado, publicación y aparición en catálogo.
- Socio no ve edición de su empresa; detalle de borrador no disponible en esta vista. Esto comprueba la interfaz, no la seguridad.
- Descarga TXT de demostración generada y verificada. Archivo de prueba eliminado después.
- Diálogo abierto por teclado, cierre con Escape, foco devuelto al botón y outline visible de 2 px; estado hover de navegación medido en estilos computados.
- Menú móvil con nombre y descripción accesibles, navegación y cierre.
- Restablecimiento de la demo; datos de las pruebas eliminados del estado del navegador.

## Adaptabilidad y revisión visual

Capturas completas e inspección de inicio, actividades, detalle de actividad, empresas, informes, perfil móvil, documentos móvil, colaboradores y gestión.

- Escritorio: 1440 × 1040.
- Móvil: 390 × 844.
- Móvil estrecho: 320 × 740.
- Tablet: 768 × 1024.

En la revisión de legibilidad se subió el texto base a 16 px y los textos de interfaz a 14–16 px. Se recorrieron 25 rutas y variantes en los cuatro tamaños anteriores: todas renderizaron con contenido y sin desbordamiento horizontal de la página. Las tablas mantienen su desplazamiento interno en móvil.

También se revisó la vista de Gestor AFEB en `/gestion` y el detalle del borrador `/detalles-evento?id=foro`; la gestión funciona sin desbordar en móvil estrecho. Se reubicó el rótulo de colaboradores en móvil y se ajustó el botón de recuperación para que pueda partirse en dos líneas a 320 px. Los formularios se apilan, los diálogos tienen altura limitada y scroll, la animación de diálogos/menú dura 160 ms y se respeta `reduced motion`. Los textos secundarios usan el gris `#737373` o más oscuro sobre blanco.

## Evidencias

La variante `codex/afeb-brand` se volvió a recorrer en 25 rutas y variantes a 1440, 768, 390 y 320 px: 100 comprobaciones sin desbordamiento de página, imágenes rotas ni textos de contenido por debajo de 14 px. También se comprobó la gestión con rol Gestor AFEB en escritorio y dos anchos móviles, y la apertura/cierre de menú móvil y diálogo de inscripción. No se confirmó ninguna inscripción durante esta revisión de marca.

Las capturas de marca y la referencia neutra están en `docs/previews/brand/`. Las dos capturas de inicio de escritorio usan 1440 × 1040. La verificación se realizó sobre el servidor de desarrollo; `npm run build` y `npm run format:check` pasaron. Los pares de texto de botones y paneles verdes revisados tienen contraste de al menos 5,1:1; esto no constituye una certificación integral de accesibilidad.

Las imágenes están en `docs/previews/`:

- `inicio-desktop.png` y `inicio-mobile.png`.
- `actividad-desktop.png` y `actividad-mobile.png`.
- `empresas-desktop.png`, `informes-desktop.png` y `gestion-desktop.png`.
- `perfil-mobile.png`, `documentos-mobile.png`, `colaboradores-mobile.png` y `gestion-estrecho.png`.
- `route-checks.json` y `responsive-checks.json`: renderizado, tamaños de pantalla y desbordamientos comprobados.

Estas evidencias documentan el prototipo, no una prueba integral de accesibilidad o seguridad.

## Búsqueda general por áreas

La cabecera y el diálogo se revisaron a 1440, 768, 390 y 320 px. El texto del acceso permanece visible; en pantallas pequeñas se usa una segunda fila completa. El diálogo mantiene sus bordes dentro del viewport y desplaza sus resultados internamente. Capturas en `docs/previews/search/`.

Se comprobaron agrupación y filtro por área, coincidencias sin tildes, múltiples palabras, estado vacío, apertura con ⌘K, recorrido con flechas, selección con Enter y cierre con Escape devolviendo el foco al acceso. Un documento abrió la tabla filtrada y otro documento sustituyó la selección dentro de la misma ruta. Un beneficio abrió su pestaña y ficha. La normativa destacó el recurso seleccionado.

La vista Gestor AFEB encontró el foro en borrador; SocioAdmin obtuvo cero resultados para esa misma consulta. Las verificaciones del índice local cubrieron también normalización, metadatos, separación de áreas, exclusión de gestión y borradores según el rol, ausencia de límite global de ocho registros y descarte de accesos de área redundantes. No se observaron errores de aplicación en consola durante este recorrido. El build y el formato pasaron.

Estas comprobaciones usan datos ficticios y roles de demostración. La búsqueda de texto dentro de archivos reales y la autorización de servidor siguen pendientes.

## Límites de esta revisión

No hay pruebas de autenticación, permisos/API, aislamiento entre empresas, envío de correo, subida/descarga privada real, cuotas de Zoho, pagos, concurrencia de inscripciones ni restauración de copias. Son capacidades de la siguiente fase. Loading/error de API y restablecimiento por token no son alcanzables porque no existe backend. No se ha certificado WCAG ni se ha realizado un pentest. Los horarios deben normalizarse en el backend antes de producción.

## Base observada · 14/10/2026

- `npm run mock:check`: IDs únicos, procedencia, relaciones entre tablas, propietarios de archivos, años derivados y casos observados con campos desconocidos.
- Comprobados inmutabilidad de la base, inscripción abierta/plazo vencido, bloqueo de BdB, bloqueo de una actividad con datos incompletos y búsqueda de ECOEMBES, EUDR, contratos, memoria 2025 y 3M.
- Recorrido en navegador: HOUSER se inscribe, aparece en perfil y participantes, persiste al recargar y se cancela, recuperando las ocho inscripciones de la muestra. No se envían formularios a AFEB.
- Borrador Implementa DIY oculto a socio; publicación local desde Gestor; aparece abierto con aviso de modificación. Restablecer devuelve su estado Borrador y cero inscripciones.
- Las cuatro preferencias originales se muestran indeterminadas después del reinicio. Los documentos muestran sus años solo cuando aparecen en el nombre.
- BdB conserva 150/75 €, inscripción bloqueada y cupo desconocido. Mapa de la Distribución no permite descargar un archivo no asignado.
- 24 rutas/variantes revisadas en 1440 px y 11 pantallas de datos en 390 px, sin desbordamiento horizontal del documento. Las tablas conservan su scroll propio.
- La pestaña de verificación abierta después de las ediciones no registró errores ni advertencias de consola. Los mensajes temporales de HMR durante el cambio del contexto desaparecieron al recargar.
- La serie estadística inventada y los trimestres generados del histórico se han retirado. La muestra es parcial y los originales PDF/DOC no están importados.

Evidencias actuales: [rutas](previews/mock/route-checks.json), [móvil](previews/mock/mobile-checks.json), [inicio de escritorio](previews/mock/inicio-desktop.jpg) e [inicio móvil](previews/mock/inicio-mobile.jpg). Los escenarios reproducibles y el contrato de continuidad están en `DATOS_MOCK.md`.

## Centro de demos y mini backend local

- `npm run mock:flows`: operaciones de inscripción/cancelación idempotentes, estado persistente, sincronización del repositorio, solicitudes y estados, rol de gestión, seis escenarios, restablecimiento, escritura fallida y migración del formato anterior.
- Recorrido de navegador: HOUSER se carga con una inscripción local y nueve registros de muestra/simulación; el recorrido base la elimina. Se abre una asesoría desde Normativa, aparece Pendiente en Centro de demos, pasa a En curso en Gestión y a Resuelta en la otra pestaña. La actualización llega sin recargar y se conserva después de recargar.
- Una edición del cargo de la cuenta se refleja en Directorio y en su ficha. Restablecer recupera la información observada, cero solicitudes y la vista SocioAdmin.
- Datos del mock muestra 12 actividades y 10 empresas y enlaza sus pantallas.
- Centro de demos comprobado en 1440 px y en 320/390/768 px con sus tres pestañas, sin desbordamiento horizontal del documento. Evidencias en `previews/demo-center/`.
- Las solicitudes generadas durante la comprobación se eliminaron mediante restablecimiento. El JSON observado permanece sin cambios.

## Fase 1 cerrada: entidades y flujos conectados

- `mock:flows` se amplió para comprobar todos los requisitos de la fase 1: miembros con campos/empresa/roles separados, invitaciones y estados, aceptación idempotente con FKs, bloqueo de duplicados/estado/plazo/cupo, solicitudes con payload/responsable/historial, preferencias recuperables, participación por persona/empresa y búsqueda ampliada.
- También verifica que resolver una solicitud no acepta automáticamente la invitación, los invitados externos mantienen empresa desconocida a `null`, los guardados fallidos no publican cambios y v1 migra sin duplicar miembros ni inventar campos.
- En navegador se probó una persona introducida expresamente para la demo con dos teléfonos y enlace: equipo → invitación HOUSER → aceptación → ficha, directorio, empresa, actividad y búsqueda. Conserva datos y participación al recargar.
- Probados duplicado bloqueado, invitación rechazada y revocada sin asistentes adicionales, preferencias de licitaciones recuperadas, cobranding con enlaces a empresas y asesoría con detalle completo. Estado/responsable/comentarios persisten; el estado se sincroniza sin recargar en otra pestaña.
- Restablecer elimina miembros/invitaciones/solicitudes/registro/marca de prueba y preferencias, recupera los 18 contactos observados y sigue limpio al recargar. La otra pestaña deja de mostrar la solicitud eliminada.
- 9 vistas en 320/390/768 px: 27 controles finales sin desbordamiento horizontal del documento. Se corrigieron filas de equipo y enlace de licitaciones en 320 px. Capturas y métricas en `previews/phase1/`.
- Guía reproducible y límites de simulación en `PROBAR_FASE_1.md`. El dataset `src/data/mock-db.json` no se ha modificado.

La pestaña de verificación abierta tras la implementación cargó `/demo` sin errores ni advertencias, en SocioAdmin, con 18 personas observadas y cero invitaciones/solicitudes locales tras el reinicio.
