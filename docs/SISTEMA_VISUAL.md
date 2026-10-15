# Sistema visual del portal AFEB

**Fecha:** 15/10/2026. **Rama actual:** `main`. Integra el diseño desarrollado en `codex/afeb-design-system` a partir de `codex/afeb-brand` y conserva los flujos de la fase 1 aceptada. Las variantes anteriores permanecen en el historial, aunque sus ramas auxiliares se han retirado.

## Referencia y adaptación

El usuario aportó `afeb-redesign/public/design-system/`, con tokens, fuentes, iconos y assets. Se contrastaron también `afeb-redesign/docs/design-system.md`, los estilos de la landing y su guía en `/sistema-de-diseno`. Es un sistema de interfaz de la propuesta, no un manual corporativo certificado.

La landing y sus archivos se conservan. El portal reutiliza sus valores visuales sobre los componentes React/shadcn/Radix existentes. No se trasplantan demos de componentes ni formularios sin backend de la landing a los flujos funcionales del portal.

| Fundamento                                | Aplicación en el portal                                                                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manrope Variable local                    | Pesos 400 de lectura, 550–600 de títulos y 650–700 de acciones/rótulos. Texto de lectura 16 px, metadatos y acciones 14 px; rótulos auxiliares en mayúsculas 12 px. |
| Tinta `#203c30`                           | Texto y títulos.                                                                                                                                                    |
| Bosque `#153e30` y profundo `#103426`     | Acciones principales, navegación activa, destacada, portadas y texto sobre lima.                                                                                    |
| Lima `#b7d96c` y verde AFEB `#87bc23`     | CTA de la destacada, indicadores y pequeños acentos.                                                                                                                |
| Papel `#fbfcf9`, cálido `#f1f3ec`, blanco | Fondo, bloques de apoyo y tarjetas/campos.                                                                                                                          |
| Secundario `#536356`, línea `#dfe5db`     | Descripciones, metadatos y divisores. Los campos usan un borde más visible.                                                                                         |
| Radio 3 px y borde 1 px                   | Tarjetas, tablas, botones, inputs, tabs y capas. Sin sombras en las tarjetas; sombra en diálogos/menús temporales.                                                  |
| Controles 52 px, compactos 42 px          | Formularios, filtros y acciones. Botones de icono principales de 44 px.                                                                                             |
| Títulos fluidos y espacios 24/32/40/48 px | Jerarquía editorial adaptada a una aplicación de trabajo. No se usa el tamaño de hero de la landing en cada pantalla.                                               |
| Foco visible y movimiento reducido        | Foco de 3 px, campos de 2 px; transiciones de 200 ms y respeto a `prefers-reduced-motion`.                                                                          |

El logotipo reutiliza el archivo del kit de la landing, conserva sus proporciones 435 × 365 y se muestra a 88 px de ancho en navegación, 96 px en acceso de escritorio y 80 px en acceso móvil. No se recolorea ni se recorta.

## Cobertura de interfaz

- Navegación lateral y menú móvil, cabecera, búsqueda global, ayuda, notificaciones y pie.
- Inicio: indicadores, actividad destacada, informes, agenda y comunidad. Los bloques de informe y comunidad también se muestran en tablet/móvil.
- Catálogos, filtros, tarjetas, fichas de empresa y contacto, perfil, marcas, equipo y participación.
- Actividades y reservas, invitación, confirmación y seguimiento de solicitudes.
- Informes, portadas, tablas/documentos, normativa, colaboradores y servicios.
- Gestión interna, Centro de demos y sus colecciones/solicitudes.
- Acceso/recuperación, formularios, diálogos, menús, estados vacíos y avisos.

Hasta 1000 px la navegación pasa a menú desplegable para dejar espacio al contenido. Las pestañas largas y las tablas conservan desplazamiento propio. Los directorios pasan a una columna hasta 600 px. No se oculta la página con `overflow-x: hidden` para tapar problemas de ancho.

## Archivos para continuar

- `src/styles/design-tokens.css`: valores del kit con prefijo `--afeb-` y fuentes locales. El prefijo evita la colisión entre `--muted` del kit (texto) y `--muted` de shadcn (superficie).
- `src/styles/afeb-brand.css`: puente semántico a shadcn y adaptación por componente/pantalla.
- `src/index.css`: estructura, disposición y colores semánticos. La geometría funcional continúa aquí.
- `src/components/brand-mark.tsx` y `public/brand/afeb-logo.png`: marca y proporciones.
- `public/design-system/fonts/`: Manrope latin/latin-ext y licencia OFL copiados del kit. No hay petición de fuentes a terceros.

Para ajustar un color común, modificar el token y su uso semántico; evitar nuevos HEX en pantallas individuales. Mantener los componentes Radix y sus estados/atributos al cambiar el aspecto. No cambiar claves de almacenamiento, IDs ni comandos por motivos visuales.

## Verificación

- `npm run mock:check`, `npm run mock:flows` y `npm run build`: correctos.
- 30 rutas/variantes en 1440, 768, 390 y 320 px: **120 comprobaciones finales sin desbordamiento horizontal de página ni imágenes rotas**, con Manrope aplicada. Incluyen gestión como Gestor, acceso, estados de registro ausente y fichas reales de invitación aceptada y solicitud.
- Se corrigieron el espacio de lectura en tablet, las pestañas de actividades del Gestor en 320 px y los indicadores de gestión en móvil. También se revisaron esos puntos en 1001 y 1100 px.
- Navegador: alta completa desde móvil, recarga de la ficha, invitación de esa persona a HOUSER y aceptación con inscripción confirmada, seguimiento con responsable/comentario conservado, preferencias de licitaciones No/Sí recuperadas, búsqueda agrupada, cierre con Escape/restauración de foco, menú móvil y editor con desplazamiento interno.
- Ayuda revisada en 320 × 700 px: diálogo contenido entre 20 y 680 px, con scroll interno y cierre accesible. Los pares de texto principales revisados superan 5,7:1; el CTA lima mantiene su texto oscuro también al pasar el cursor.
- Las pruebas interactivas se ejecutaron en `http://127.0.0.1:5181/`, separado del origen de uso `http://127.0.0.1:5173/`. Al terminar se restableció únicamente la sesión de pruebas.

Evidencias: [mediciones por ruta](previews/design-system/route-checks.json), [inicio escritorio](previews/design-system/inicio-desktop.jpg), [inicio móvil](previews/design-system/inicio-mobile.jpg), [búsqueda móvil](previews/design-system/busqueda-mobile.jpg), [invitación aceptada](previews/design-system/invitacion-aceptada-mobile.jpg) y [solicitud](previews/design-system/solicitud-desktop.jpg). Los registros temporales de esas capturas son entradas de simulación.

El dataset observado y los módulos de negocio permanecen sin cambios. La fase 1 sigue cerrada; las fases 2-6 siguen pendientes.
