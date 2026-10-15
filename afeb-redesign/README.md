# AFEB · propuesta de rediseño

Home, directorio de asociados y fichas de empresa y proveedor, construidos con React, Vite, TypeScript y CSS. Proyecto independiente del portal existente.

## Abrir el prototipo

Desde esta carpeta:

```bash
npm install
npm run dev
```

Dirección: **http://127.0.0.1:5180/**. El puerto es fijo; si está ocupado, cierra la instancia anterior del prototipo. Requiere una versión de Node compatible con Vite 7: 20.19+ o 22.12+.

```bash
npm run build    # TypeScript y build de producción en dist/
npm run preview  # Servir el build en el mismo puerto; cerrar antes dev
```

## Dirección de diseño

**El sector avanza cuando avanzamos juntos.** Una composición editorial que presenta a AFEB como una comunidad empresarial. El hero combina tipografía y una fotografía del pack con una pequeña ventana a las personas. Las cifras se presentan en una franja abierta; los servicios combinan una pieza protagonista y filas editoriales; las actividades forman un mosaico asimétrico. Club Export introduce un cambio de ritmo antes de los recursos y el cierre para asociarse.

Paleta de propuesta: verde bosque `#153E30`, carbón verdoso `#203C30`, verde AFEB observado `#87BC23`, acento claro `#B7D96C`, blanco `#FBFCF9` y neutro cálido `#F1F3EC`. El logo conserva sus propios colores originales. Los verdes del sistema no constituyen un manual corporativo certificado.

**Manrope Variable** en toda la web: peso 650 en el titular principal, 600 en títulos, 400 en lectura y 600–700 en navegación y rótulos. Una sola familia mantiene la coherencia. Escala compartida mediante tokens: lectura de 16 px, acciones de 14 px, rótulos de 12 px y títulos de sección entre 32 y 52 px. El hero tiene una escala propia de 36–76 px. Fuente libre OFL servida localmente mediante Fontsource. No se utilizan fuentes extraídas de la memoria.

## Assets y contenido

- `reference/afeb/`: pack completo descomprimido, con originales intactos, inventario de procedencia y memoria.
- `public/media/`: versiones optimizadas. La fotografía de herramientas de 16,85 MB se sirve recortada en WebP de unos 508 KB. El pack inicial de medios optimizados suma unos 778 KB; los logos nuevos del directorio se alojan por separado en `public/media/companies/`. Las fotos de actividades conservan su resolución original.
- El logo AFEB se ha recortado únicamente por su canal de transparencia, preservando tejado, siglas y descriptor.
- `scripts/prepare-assets.py` permite regenerar los medios con Python y Pillow. No es necesario ejecutarlo para arrancar la web.
- En la home se mantienen seis marcas del directorio como muestra de empresas asociadas; no se presentan como patrocinadores ni testimonios.

Las cuatro cifras proceden de la [home oficial](https://brico-afeb.com/) consultada el 15/10/2026: +160 empresas, 23 categorías, 2 foros y +200 directivos. Son las cifras publicadas allí y quedan pendientes de validación final del cliente; no se han mezclado con las cifras de cierre de 2025 de la memoria.

Las fotos de comunidad y Club Export corresponden a **2025**. Las dos piezas de vídeo enlazan los foros de **2026** identificados en la web oficial y utilizan titulares editoriales propuestos. No se atribuyen las fotos de 2025 a los vídeos de 2026.

La misión y los servicios se han contrastado con la [web de AFEB](https://brico-afeb.com/), [Club Export](https://brico-afeb.com/club-export/) y la memoria de 2025 incluida en el pack. Los datos de contacto proceden de la [página actual de contacto](https://brico-afeb.com/contacto-buzon-de-sugerencias/), que publica un teléfono distinto al de la memoria histórica.

## Componentes e interacción

`src/components/Header.tsx` gestiona navegación móvil, bloqueo del scroll, Escape y recorrido de foco. `sections.tsx` contiene las secciones independientes; `ui.tsx`, los enlaces de acción y rótulos comunes. `data.ts` centraliza enlaces y contenido repetido. `styles.css` define tokens, estilos y adaptaciones.

Todos los controles navegan a un apartado o a una URL real. Se incluyen salto al contenido, etiquetas accesibles, foco visible, imágenes con texto alternativo y respeto a `prefers-reduced-motion`. El prototipo no carga vídeos, analítica, servicios de terceros ni cookies; los vídeos se abren mediante enlaces.

## Verificación y capturas

Revisión visual de toda la página en Chrome, escritorio y móvil. Comprobaciones en **1920, 1440, 1024, 768, 430, 390, 375 y 320 px**, sin imágenes rotas, errores de consola ni desbordamientos horizontales. Menú móvil probado con Escape, anclas y teclado; fuentes locales verificadas.

- `previews/typography/desktop.jpg`: primera pantalla de escritorio tras la revisión tipográfica.
- `previews/typography/mobile.jpg`: primera pantalla móvil tras la revisión tipográfica.
- `previews/typography/panel.jpg`: vista en el ancho del panel de Codex.
- `previews/typography/desktop-full.jpg` y `mobile-full.jpg`: página completa tras la revisión tipográfica.
- `previews/typography/responsive-checks.json`: revisión de fuentes, jerarquía y anchura en 11 tamaños de 320 a 1920 px.
- `previews/1440.png`: página completa de la propuesta inicial de escritorio.
- `previews/390.png`: página completa de la propuesta inicial móvil.
- `previews/1440-hero.png` y `previews/390-hero.png`: primera pantalla.
- `previews/390-menu.png`: navegación móvil.
- `previews/responsive-checks.json`: resultados de las comprobaciones.
- `previews/accessibility-checks.json`: contraste calculado sobre superficies planas, anclas, movimiento reducido y recorrido de foco. No sustituye una auditoría completa de accesibilidad.
- `previews/links-checks.json`: URLs oficiales verificadas con respuesta HTTP 200.

La propuesta está preparada para validar diseño y contenido. No se ha publicado ni modificado la web actual de AFEB.


## Ampliación: directorio y fichas

La home mantiene su hoja de estilos, fotografías y componentes. Los cambios en sus enlaces conectan las rutas nuevas mediante React Router. Los estilos interiores están aislados en `src/directory.css`.

- `/empresas-asociadas`: selección de ocho asociados, búsqueda sin distinguir mayúsculas ni tildes, cinco sectores, contador, limpieza y estado vacío. La búsqueda y el sector se guardan en la URL y se conservan al volver desde una ficha.
- `/empresas-asociadas/:slug`: slugs `3m`, `akzo-nobel`, `bellota`, `bosch`, `compo`, `rubi`, `stanley-black-decker` y `wd40`. Una sola plantilla muestra los datos de `src/data/companies.ts`, con tres empresas relacionadas y enlaces externos en nueva pestaña.
- `/proveedores-recomendados`: listado de cuatro especialistas: NEXMART, Daterium System, DACHSER DIY Logistics y Slimstock. Cada tarjeta enlaza a `/proveedores-recomendados/:slug` con los slugs `nexmart`, `daterium-system`, `dachser-diy-logistics` y `slimstock`.
- Las fichas de proveedores comparten una plantilla y los datos de `src/data/providers.ts`, con textos editoriales por especialidad, servicios verificados, contactos y tres proveedores relacionados. El listado es accesible desde el bloque contextual del directorio de asociados y desde las migas de cada ficha. La categoría de proveedores se mantiene independiente de las ocho empresas asociadas.

Los datos y la procedencia de logos se documentan en `reference/directory/README.md`. Las cifras del directorio (175, +5.000 millones y +15.000 empleos) son las publicadas por AFEB y quedan pendientes de confirmación del cliente. Las cifras aprobadas de la home se mantienen.

La revisión incluye las ocho fichas, filtros de los cinco sectores, búsqueda con tildes y mayúsculas, estado vacío, limpieza, botón Atrás con restauración de la posición de lectura, navegación entre relacionadas, retorno con filtros, menú móvil, contacto de NEXMART y carga directa de rutas. Capturas y resultados en `previews/directory/`. Se han revisado las tres plantillas en nueve anchos entre 320 y 1440 px. Los servidores de Vite resuelven las rutas directas; un futuro alojamiento deberá redirigir las rutas de la aplicación a `index.html`.


La ampliación de proveedores utiliza `src/components/providers.tsx`, `src/pages/ProvidersPage.tsx` y los estilos aislados de `src/providers.css`. Las fuentes y los contactos de los tres nuevos especialistas se documentan en `reference/providers/README.md`. La revisión de las cinco rutas en siete anchos y las capturas están en `previews/providers/`.

## Sistema de diseño y entrega

Abre **http://127.0.0.1:5180/sistema-de-diseno**. La guía reúne 14 apartados: identidad, paleta, tipografía, retícula, bordes, botones, navegación, formularios, tarjetas y tabla, estados, capas, patrones, biblioteca de recursos e implementación. Identifica los estilos existentes y las extensiones para nuevas pantallas. Incluye ejemplos interactivos con validación local, pestañas con teclado, diálogo, filtros y paginación.

Los componentes reutilizables están en `src/components/system/`; las demostraciones y estilos aislados, en `src/pages/design-system/`. La API y las decisiones de implementación se documentan en `docs/design-system.md`.

```bash
npm run design:assets   # Extraer tokens reales, fuente, iconos e inventario
npm run design:package  # Regenerar los recursos y los dos ZIP descargables
npm run build
```

La guía ofrece `public/design-system/afeb-design-system.zip` (proyecto y documentación) y `afeb-assets.zip` (recursos, fuente, iconos y tokens). Conserva las licencias de Manrope y Lucide y las notas de procedencia. Los formularios son demostraciones locales y no envían información.
