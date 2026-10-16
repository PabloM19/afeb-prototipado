# Cierre de la auditoría visual AFEB

Revisión completada el 16 de octubre de 2026 en `codex/afeb-ajustes-graduales`.
`main` permanece en `5862f337d1c5c9783838cacc168f873917e748f4`.

## Estado

Cerrada la revisión de las 102 observaciones del documento revisado: cambios de texto y ubicación aplicados, comprobaciones realizadas y elementos útiles conservados. No son 102 eliminaciones. La fase 1 sigue siendo la base funcional de la demo.

Este registro recoge el estado actual. Las capturas y las propuestas del PDF describen el diagnóstico previo; para saber qué está pendiente, prevalece esta tabla de cierre.

## Decisiones posteriores a la auditoría

- M001 y M098: por indicación posterior del usuario, la empresa está en el menú del avatar, junto a Ver perfil, Preferencias y Cerrar sesión. El nombre se retiró del navbar. El menú funciona con hover y clic, con acceso por teclado.
- M002: retirado Tu espacio AFEB del lateral, con separación entre marca y navegación.
- M038: completadas las dos partes: Datos personales e Inscripciones.
- M077: los contadores Solicitudes locales y Solicitudes (n) ya distinguen resumen y destino. Se conservaron.
- M090: Hazte socio y Portal del socio abren el login de demostración. Los avisos de simulación se conservan.
- M092: las ocho razones sociales actuales difieren de los nombres comerciales y siguen visibles. La condición evita una segunda línea cuando ambos textos sean exactamente iguales.
- M094: seis etiquetas de actividad se abreviaron con términos ya presentes en los datos; el resumen original continúa en la cabecera y las especialidades se conservan. Las etiquetas breves de Bosch y Stanley Black & Decker se mantienen.
- M093: los resultados filtrados también indican en esta selección; se conservan las cifras institucionales y sus alcances.

## Correcciones adicionales verificadas

- Checks compartidos: tick blanco centrado, raya para indeterminado y borde más visible al desmarcar. Revisados en comunicaciones, licitaciones, cobranding, inscripción e invitación.
- Recuperación: al volver al login reaparece el formulario y se restablece el estado de mostrar contraseña.
- Búsqueda: la limpieza de duplicados se limita a la presentación; el índice, registros, ranking, agrupaciones y destinos se conservan.

## Verificación

- Build de producción, integridad del mock y flujos de fase 1: correctos (`npm run build`, `npm run mock:check`, `npm run mock:flows`).
- Revisión acumulada de las pantallas afectadas en cada tanda: dashboard, actividades, invitaciones, contactos, perfil, empresas, participación, informes, documentos, normativa, colaboradores, grupos, cobranding, licitaciones, solicitudes, gestión, demos, campana, ayuda y acceso.
- Teclado del buscador: flechas, Enter, Escape y atajo de apertura; agrupaciones, filtros y visibilidad de Gestión según rol comprobados.
- Solicitudes: comprobadas la consulta completa sin duplicados, la distinción entre responsable guardado y propuesto, guardado, historial y recarga.
- Última revisión pública: landing, catálogo de ocho empresas, sus ocho fichas, catálogo de cuatro proveedores y sus cuatro fichas. Sin imágenes rotas detectadas en ese recorrido; relacionados, servicios y datos de contacto conservados.
- Filtros públicos: búsqueda por nombre y retorno desde una ficha conservando el filtro.
- Enlaces externos: verificados destino, nueva pestaña y aviso accesible; no se enviaron mensajes ni formularios externos.
- Landing → Hazte socio → login → portal completado en móvil; Portal del socio → login y Volver a la web → landing comprobados en escritorio.
- Comprobado aislamiento de estilos entre web pública y portal después de navegar entre ambas experiencias.
- Menú de perfil y acceso directo a Comunicaciones comprobados con teclado. La redirección `/publicaciones` → `/informes` y el estado de ficha pública inexistente siguen operativos.
- Ancho de 390 px: verificadas las pantallas afectadas durante las tandas; última pasada sobre landing, menú móvil, ficha pública y proveedores sin desbordamiento horizontal. Documentos conserva sus cinco columnas mediante desplazamiento de la tabla.
- Pruebas con escrituras realizadas en un origen independiente; la base de prueba se restableció al terminar.
- Consola sin errores ni advertencias en el recorrido público final. `git diff --check` correcto.

Evidencia del recorrido público: [comprobaciones por ficha](previews/microajustes/comprobaciones-publicas-cierre.json).
Capturas: [landing](previews/microajustes/landing-cierre.png), [móvil](previews/microajustes/landing-cierre-movil.png). Las capturas de cada tanda están en la misma carpeta.

## Estado por observación

| ID   | Estado final                                                  | Elemento                                                         |
| ---- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| M001 | Adaptado a la decisión posterior del usuario                  | Empresa: del bloque lateral al navbar                            |
| M002 | Aplicado                                                      | Una sola firma del portal en la navegación                       |
| M003 | Aplicado                                                      | La tarjeta de ayuda puede hablar una vez                         |
| M004 | Conservado                                                    | Las cuatro tarjetas siguen teniendo su sitio                     |
| M005 | Aplicado                                                      | No repetir empresa y mock en la nota del equipo                  |
| M006 | Aplicado                                                      | Un apoyo al saludo, sin otra explicación genérica                |
| M007 | Aplicado                                                      | «Actividad del catálogo» no diferencia el destacado              |
| M008 | Aplicado                                                      | Fecha y hora una vez, arriba a la derecha                        |
| M009 | Aplicado                                                      | El informe no necesita justificar un gráfico inexistente         |
| M010 | Aplicado                                                      | Un catálogo no necesita anunciar que es un catálogo              |
| M011 | Aplicado                                                      | La fecha del banner ya tiene una ubicación propia                |
| M012 | Conservado                                                    | El mismo evento puede estar destacado y en resultados            |
| M013 | Aplicado                                                      | La descripción completa pertenece al cuerpo                      |
| M014 | Aplicado                                                      | «Formato» puede decir algo más preciso                           |
| M015 | Conservado                                                    | Estado de actividad y estado junto a la reserva                  |
| M016 | Aplicado                                                      | Un título que diga qué se va a hacer                             |
| M017 | Aplicado                                                      | Pertenencia a la empresa, sin hablar de IDs                      |
| M018 | Conservado                                                    | Los campos permiten revisar a quién se invita                    |
| M019 | Aplicado                                                      | «Cargo» y «Empresa» sin la palabra «introducido»                 |
| M020 | Aplicado                                                      | La fecha superior es la creación de la invitación                |
| M021 | Conservado                                                    | Coste pendiente, referencia y enlaces tienen funciones distintas |
| M022 | Aplicado                                                      | La banda editorial no necesita dos mensajes de comunidad         |
| M023 | Aplicado                                                      | «Una comunidad que suma» añade otra introducción                 |
| M024 | Conservado                                                    | Nombre, especialidad y localidad distinguen empresas             |
| M025 | Aplicado                                                      | La descripción de empresa aparece arriba y en Información        |
| M026 | Aplicado                                                      | El equipo ya pertenece a la empresa de la ficha                  |
| M027 | Aplicado                                                      | «Las personas de…» no necesita otra frase genérica               |
| M028 | Aplicado                                                      | Participación no necesita dos encabezados consecutivos           |
| M029 | Aplicado                                                      | Explicar el origen local sin vocabulario de CRM                  |
| M030 | Conservado                                                    | «No verificado» evita inventar información empresarial           |
| M031 | Aplicado                                                      | «Contacto del mock» no diferencia a las personas                 |
| M032 | Aplicado                                                      | Dos frases de comunidad antes de una búsqueda concreta           |
| M033 | Conservado                                                    | Cargo, empresa, email y Ver contacto no repiten una función      |
| M034 | Aplicado                                                      | Empresa duplicada en el encabezado                               |
| M035 | Aplicado                                                      | Cargo entre presentación y ficha                                 |
| M036 | Conservado                                                    | Rol y ausencia de vínculo no son duplicados                      |
| M037 | Aplicado                                                      | Subtítulo que enumera las pestañas                               |
| M038 | Aplicado                                                      | Un encabezado concreto por contenido                             |
| M039 | Conservado                                                    | Identidad de cabecera y cargo de la ficha                        |
| M040 | Aplicado                                                      | La misma ayuda bajo cada preferencia                             |
| M041 | Conservado                                                    | Segundo teléfono y LinkedIn visibles                             |
| M042 | Conservado                                                    | Avisos junto a la decisión de guardar                            |
| M043 | Aplicado                                                      | Antetítulo de procedencia dentro del destacado                   |
| M044 | Aplicado                                                      | Numeración ornamental de las tarjetas                            |
| M045 | Aplicado                                                      | Gratuidad dos veces en el mismo pie                              |
| M046 | Aplicado                                                      | El título del informe repetido en el lateral                     |
| M047 | Aplicado                                                      | Precio y acceso sin duplicar «Gratuito»                          |
| M048 | Aplicado                                                      | Procedencia del nombre en cada archivo                           |
| M049 | Aplicado                                                      | «Observados» en el nombre de la sección                          |
| M050 | Conservado                                                    | Bloqueo explicado en cuerpo y botón                              |
| M051 | Aplicado                                                      | Ausencia recogida frente a ausencia real                         |
| M052 | Aplicado                                                      | «General» debajo de cada documento                               |
| M053 | Conservado                                                    | Formato y edición en sus columnas                                |
| M054 | Aplicado                                                      | Eslogan sobre el título funcional                                |
| M055 | Aplicado                                                      | Antetítulo genérico antes de la asesoría                         |
| M056 | Aplicado                                                      | «Para estar al día» y «Ver documentos»                           |
| M057 | Aplicado                                                      | Webinars con su nombre, sin otro reclamo                         |
| M058 | Aplicado                                                      | «Ventajas de formar parte» antes del título                      |
| M059 | Aplicado                                                      | El buscador debe nombrar la pestaña activa                       |
| M060 | Conservado                                                    | Especialidad, descripción y contacto ausente                     |
| M061 | Aplicado                                                      | Cabecera con dos mensajes genéricos                              |
| M062 | Aplicado                                                      | Un vacío que parece prometer trabajo futuro                      |
| M063 | Aplicado                                                      | Nota de alcance sin relato de auditoría                          |
| M064 | Aplicado                                                      | Título operativo en lugar de un eslogan                          |
| M065 | Aplicado                                                      | La instrucción ya aparece en el paso uno                         |
| M066 | Aplicado                                                      | Resultado con nombre reconocible                                 |
| M067 | Aplicado                                                      | Persistencia anunciada en dos sitios                             |
| M068 | Aplicado                                                      | Ayuda genérica bajo la opción diaria                             |
| M069 | Conservado                                                    | Precio y confirmación necesitan su contexto                      |
| M070 | Aplicado                                                      | Consulta completa una sola vez                                   |
| M071 | Aplicado                                                      | Resumen guardado y valor en edición                              |
| M072 | Aplicado                                                      | Etiquetas de lectura más directas                                |
| M073 | Conservado                                                    | Contadores y pestañas tienen usos distintos                      |
| M074 | Aplicado                                                      | Identificar el contenido editorial existente                     |
| M075 | Aplicado                                                      | Dos desconocidos no significan lo mismo                          |
| M076 | Aplicado                                                      | El hero puede explicar la base con una frase                     |
| M077 | Revisado; ya cumple                                           | Contadores con alcances explícitos                               |
| M078 | Aplicado                                                      | Instrucción junto al lugar donde se utiliza                      |
| M079 | Aplicado                                                      | Una instrucción para empezar a buscar                            |
| M080 | Conservado                                                    | Cada recuento conserva su alcance                                |
| M081 | Aplicado                                                      | No repetir el mismo metadato en tres líneas                      |
| M082 | Aplicado                                                      | Identificar la campana como contenido de demo                    |
| M083 | Aplicado                                                      | Etiquetas de cada novedad más breves                             |
| M084 | Aplicado                                                      | El contacto debe decir qué permite hacer                         |
| M085 | Aplicado                                                      | Un rótulo de portal junto al formulario                          |
| M086 | Aplicado                                                      | Título reconocible sin otra explicación de plataforma            |
| M087 | Conservado                                                    | Los avisos de simulación no sobran                               |
| M088 | Aplicado                                                      | Dos invitaciones cercanas al mismo ancla                         |
| M089 | Conservado                                                    | Marca y fotografía cumplen una función editorial                 |
| M090 | Recorrido verificado                                          | Acceso público con explicación suficiente en destino             |
| M091 | Aplicado                                                      | Rótulos contiguos del listado                                    |
| M092 | Condición de duplicados aplicada; datos distintos conservados | Nombre comercial y denominación solo si difieren                 |
| M093 | Conservado; alcance del recuento aclarado                     | Las cifras pertenecen a universos distintos                      |
| M094 | Abreviado donde aporta; etiquetas breves conservadas          | Actividad principal repetida literalmente                        |
| M095 | Aplicado                                                      | Nueva pestaña con una sola explicación por enlace                |
| M096 | Conservado                                                    | Contactar arriba y al final tiene sentido                        |
| M097 | Aplicado                                                      | Fecha y hora una vez en el destacado                             |
| M098 | Adaptado a la decisión posterior del usuario                  | Empresa pequeña en cabecera, no como tarjeta lateral             |
| M099 | Conservado                                                    | No resolver altura borrando contenido                            |
| M100 | Conservado                                                    | La redirección ya evita un catálogo duplicado                    |
| M101 | Conservado                                                    | La guía necesita ejemplos repetidos                              |
| M102 | Conservado                                                    | El 404 ya expresa la tarea con claridad                          |
