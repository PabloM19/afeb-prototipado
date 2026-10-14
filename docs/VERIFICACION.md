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

Las imágenes están en `docs/previews/`:

- `inicio-desktop.png` y `inicio-mobile.png`.
- `actividad-desktop.png` y `actividad-mobile.png`.
- `empresas-desktop.png`, `informes-desktop.png` y `gestion-desktop.png`.
- `perfil-mobile.png`, `documentos-mobile.png`, `colaboradores-mobile.png` y `gestion-estrecho.png`.
- `route-checks.json` y `responsive-checks.json`: renderizado, tamaños de pantalla y desbordamientos comprobados.

Estas evidencias documentan el prototipo, no una prueba integral de accesibilidad o seguridad.

## Límites de esta revisión

No hay pruebas de autenticación, permisos/API, aislamiento entre empresas, envío de correo, subida/descarga privada real, cuotas de Zoho, pagos, concurrencia de inscripciones ni restauración de copias. Son capacidades de la siguiente fase. Loading/error de API y restablecimiento por token no son alcanzables porque no existe backend. No se ha certificado WCAG ni se ha realizado un pentest. Los horarios deben normalizarse en el backend antes de producción.
