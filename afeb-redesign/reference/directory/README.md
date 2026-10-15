# Procedencia del directorio — 15/10/2026

Los ocho asociados y sus denominaciones se contrastaron con el [directorio público de AFEB](https://brico-afeb.com/empresas-asociadas/). Cada entrada de `src/data/companies.ts` conserva sus fuentes. Las descripciones son síntesis de las actividades y catálogos de las webs corporativas, sin añadir historia, ubicaciones ni cifras empresariales.

Las cifras 175, +5.000 millones y +15.000 empleos se reproducen como referencia publicada por AFEB. **Pendientes de confirmación definitiva por el cliente.** No sustituyen los indicadores de la home.

## Logotipos

Se mantienen intactos los originales utilizados en la home. Para las páginas interiores, se han añadido logos desde fuentes públicas oficiales: 3M y NEXMART desde AFEB; Bellota, Bosch, RUBI, COMPO y AkzoNobel desde sus webs corporativas. `logos/sources.json` registra sus URLs. Se conservan proporciones y colores; los raster se convierten a WebP y los SVG se mantienen en vector.

WD-40 reutiliza el asset de AFEB. La inscripción de Stanley Black & Decker en AFEB utiliza la marca BLACK+DECKER: se muestra el mismo recurso con la indicación explícita «Marca del grupo: BLACK+DECKER», sin identificarlo como logo corporativo del grupo. El archivo `stanley.jpg` descargado durante la búsqueda corresponde a la marca STANLEY y no se utiliza.

## Sitios corporativos

Los enlaces proceden del directorio, con dos normalizaciones: Bosch utiliza su URL española vigente y Bellota enlaza a su página principal. El antiguo enlace de Bellota, `/ES/es/`, redirige actualmente a un producto concreto.

Las comprobaciones HTTP están en `previews/directory/external-links.json`: varias webs responden 200; 3M agota el tiempo de la solicitud automática, y Stanley Black & Decker y WD-40 devuelven 403 a esa comprobación. Sus URLs se contrastaron con las fuentes corporativas públicas; no se atribuye una respuesta 200 donde no pudo verificarse. Los enlaces de las fichas incluyen `target="_blank"` y `rel="noopener noreferrer"`.

## NEXMART

[AFEB: ficha oficial](https://brico-afeb.com/afeb-recomienda/nexmart/) y [sitio corporativo](https://www.nexmart.com/es/). Teléfono +34 943 309 286, correo sales-es@nexmart.com. Cinco servicios: EDI Connect, Business App, Documents to EDI, Retail Connect y Data Engine. La información se sintetiza sin ampliar prestaciones. NEXMART pertenece a Proveedores de Servicios Recomendados, una categoría independiente de asociados.

`asociados.html` y `nexmart.html` son copias de referencia del contenido público consultado. Los originales descargados se guardan en `logos/`; la aplicación sirve sus versiones en `public/media/companies/`.
