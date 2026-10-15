# Proveedores recomendados — ampliación del 15/10/2026

Se añaden tres proveedores publicados en el [catálogo público de AFEB](https://brico-afeb.com/afeb-recomienda/) a la ficha existente de NEXMART. Los cuatro se muestran en `/proveedores-recomendados` y usan la plantilla común de `src/pages/ProviderPage.tsx`.

## Fuentes de contenido y contacto

- **Daterium System**: [ficha AFEB](https://brico-afeb.com/afeb-recomienda/daterium-system/), [web corporativa](https://www.dateriumsystem.com/) y [contacto corporativo](https://www.dateriumsystem.com/front/contacto). Servicios de información de producto, calidad del dato, activos digitales y consultoría. Se usa el contacto general publicado en su web: +34 916 256 238 y info@dateriumsystem.com.
- **DACHSER DIY Logistics**: [ficha AFEB](https://brico-afeb.com/afeb-recomienda/dachser-diy-logistics/) y [solución DIY de DACHSER](https://www.dachser.es/es/diy-logistics-102). Aprovisionamiento, distribución, almacenes, valor añadido, eLogistics y logística en tienda y al consumidor. El contacto procede de la ficha AFEB: +34 671 080 938 y joaquim.lopez@es.dachser.com. La web corporativa DIY publica otro contacto de su equipo; se mantiene el indicado por AFEB para este prototipo.
- **Slimstock**: [ficha AFEB](https://brico-afeb.com/afeb-recomienda/slimstock/) y [web corporativa](https://www.slimstock.com/es/). Demanda, inventario, reposición y planificación integrada mediante Slim4. Contacto publicado por AFEB: +34 629 266 506 y n.padros@slimstock.com.
- **NEXMART**: conserva los datos y servicios verificados en la iteración anterior, documentados en `../directory/README.md`.

Las descripciones son síntesis breves de las actividades y servicios publicados. Los títulos editoriales se adaptan a cada especialidad. Las fichas son de proveedores de servicios recomendados y permanecen separadas del directorio de empresas asociadas.

## Recursos

`logos.json` recoge la procedencia de los logotipos oficiales alojados por AFEB. Se guardan los originales descargados junto a las páginas públicas de referencia. Las versiones WebP para la aplicación están en `public/media/providers/`, conservando proporciones y colores. Los tres sitios corporativos nuevos responden HTTP 200 en la verificación, registrada en `previews/providers/websites.json`.

## Navegación y revisión

Desde el directorio de asociados, «Ver proveedores recomendados» abre el listado. Las migas de pan de cada ficha vuelven al listado local y las tres tarjetas relacionadas permiten recorrer los otros proveedores. «Explorar soluciones» y «Habla con su equipo» navegan a las secciones correspondientes. Los sitios corporativos abren en otra pestaña; teléfono y correo conservan sus enlaces `tel:` y `mailto:`.

La revisión de cinco rutas en siete anchos (320–1440 px) se conserva en `previews/providers/responsive.json`, junto a las capturas y comprobaciones de navegación. El diseño y la hoja de estilos de la home se conservan.
