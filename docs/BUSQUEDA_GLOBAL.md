# Búsqueda general del portal

La cabecera muestra un campo alargado de 44 px de alto. Al pulsarlo abre un diálogo Radix con el input enfocado. En pantallas de hasta 1100 px ocupa una segunda fila completa; el texto sigue visible en móvil. También se abre con ⌘K o Ctrl+K.

## Comportamiento actual

- Sin texto: accesos a las áreas del portal. No muestra un listado arbitrario de registros.
- Al escribir: resultados agrupados en Empresas, Actividades, Personas, Informes, Normativa, Documentos, Colaboradores, Grupos de trabajo y Mi espacio. Gestión interna aparece en la vista Gestor AFEB.
- Cada grupo incluye contador y enlace a su área. Los botones de filtro permiten consultar todas las áreas o una concreta.
- Busca títulos, nombres, descripciones y metadatos: especialidades, ubicación, empresa del contacto, cargo, categoría, edición, año, formato y beneficios. El catálogo de actividades incorpora las modificaciones de la demo.
- Ignora mayúsculas y tildes. Con varias palabras, todas deben aparecer en alguno de los campos del registro. Dentro de cada grupo prioriza coincidencias en el título, después metadatos y descripción.
- Muestra todas las coincidencias del catálogo de demostración, con scroll interno. No existe el antiguo límite global de ocho resultados. Los accesos a áreas se omiten cuando ese grupo ya tiene registros coincidentes, porque el encabezado ofrece «Ver área».
- Los borradores se excluyen para Socio y SocioAdmin. La vista Gestor permite encontrarlos. Este comportamiento representa el rol de la demo y no sustituye la autorización de servidor.
- Un documento abre `/documentos?buscar=…` con la tabla filtrada. Un proveedor o beneficio abre `/colaboradores?buscar=…&tipo=…` con la pestaña correcta y la ficha desplegada. Normativa usa `?recurso=…` para destacar y llevar a la referencia elegida. Empresas, personas, informes y actividades abren sus fichas.
- Flechas arriba/abajo recorren los resultados; Enter abre el primero desde el input o el enlace enfocado. Escape cierra y devuelve el foco al botón que abrió el diálogo. El teclado Tab sigue disponible para todos los controles.

Los grupos de trabajo conservan su estado vacío: el buscador ofrece el acceso al área y encuentra las actividades de grupos que ya existen. No inventa grupos nuevos.

Ejemplos de la base observada: `ecoembes` encuentra su actividad; `eudr` encuentra el recurso de normativa; `contratos` encuentra la asesoría; `memoria 2025` encuentra Memoria_AFEB_2025.pdf; `3m` encuentra la empresa y sus contactos recogidos.

## Archivos

- `src/components/global-search.tsx`: apertura, diálogo, filtros, agrupación y teclado.
- `src/lib/search.ts`: áreas, índice de contenido visible, normalización y relevancia.
- `src/styles/global-search.css`: barra y panel adaptables; usa los tokens de la rama.
- `src/data/mock-db.json` y `src/data/fixtures.ts`: base observada y adaptadores compartidos por las pantallas y el índice.
- `resources.tsx` y `services.tsx`: navegación contextual desde resultados, incluyendo nuevas selecciones dentro de la misma ruta.

## Continuidad hacia datos reales

Actualmente busca en la muestra observada local. Ver `DATOS_MOCK.md` para procedencia, cobertura y valores desconocidos. Los archivos ilustrativos no tienen contenido PDF/DOC indexable; sus títulos y metadatos sí se buscan.

Al conectar un backend, sustituir la creación del índice local por un servicio de búsqueda común, conservando la interfaz y agrupación. El servidor debe resolver usuario, empresa y permisos antes de calcular resultados o contadores. La descarga sigue teniendo su autorización propia. Un contrato posible es `GET /api/search?q=…&area=…`, con grupos, totales y cursor por área para catálogos grandes. La extracción de texto de archivos reales, si se acuerda, pertenece a ese servicio.

## Evidencias

- [Barra de escritorio](previews/search/barra-desktop.jpg).
- [Áreas al abrir](previews/search/areas-desktop.jpg).
- [Resultados agrupados](previews/search/resultados-desktop.jpg).
- [Resultados en 390 px](previews/search/resultados-mobile.jpg) y [320 px](previews/search/resultados-320.jpg).

La comprobación funcional y de tamaños se recoge en `VERIFICACION.md`.

Las capturas anteriores documentan el diseño del buscador antes de sustituir los datos ficticios por la base observada.

## Ampliación de fase 1

Se indexan las personas locales, marcas observadas/locales y participaciones visibles. Los resultados de marca abren la pestaña Marcas. Las participaciones originales sin identidad verificada abren su ocurrencia; las locales abren la ficha de persona. En vista Gestor se buscan también los datos de solicitudes con enlace a su detalle. Los cambios de miembros, inscripciones y marcas regeneran el índice sin recargar.
