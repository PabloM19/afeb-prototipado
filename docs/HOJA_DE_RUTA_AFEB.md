# Hoja de ruta AFEB: auditoría frente al mock actual

**Revisión:** 15/10/2026. **Rama actual:** `main`, que integra `codex/afeb-design-system`, derivada de `codex/afeb-brand`. **Base funcional contrastada:** fase 1 implementada en `4a142a8` sobre `0ea35c3`.

**Fase 1 completada, verificada y aceptada por el usuario (mock local):** ver [guía de prueba](PROBAR_FASE_1.md) y [acta de aceptación del 15/10/2026](ACEPTACION_FASE_1.md). Las fases 2-6 siguen pendientes.

**Prioridad actual:** paréntesis funcional para trabajar en la interfaz. No iniciar la fase 2 durante este bloque; preservar los recorridos aceptados al modificar la presentación.

La adaptación al sistema visual de la landing está documentada en [SISTEMA_VISUAL.md](SISTEMA_VISUAL.md). Este cambio de presentación no amplía la cobertura funcional del inventario.

Este documento es el inventario de cobertura y pendientes para continuar el portal. Se ha cruzado la auditoría completa con las rutas, componentes, datos y comandos actuales. Una pantalla presente no se considera completa si sus acciones o datos todavía faltan.

Fuentes:

- [Auditoría base, 13 páginas](../output/pdf/auditoria_portal_afeb_2026-10-14.pdf). Las referencias «p. X» de este documento corresponden a ese PDF.
- [Rutas de la aplicación](../src/App.tsx), [mini backend local](../src/lib/mock-backend.ts) y módulos de `src/features/`.
- [Base observada](../src/data/mock-db.json), [reglas de datos](DATOS_MOCK.md), [guía de demos](DEMO.md) y [verificación](VERIFICACION.md).

La auditoría mezcla **pantallas y acciones observadas**, **propuestas para la nueva solución** y **decisiones pendientes de AFEB**. Aquí se mantienen separadas. No se atribuyen campos a páginas que devolvían 404 ni se dan por confirmados los permisos del sistema anterior.

## 1. Situación actual

| Aspecto                              | Lo que tenemos                                                                                                                                                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Rutas auditadas                      | **21 de 21 representadas**. `/publicaciones` es una redirección y `/detalles-equipo` una ficha propuesta que sustituye el 404 observado.                                                                                                                           |
| Pantallas adicionales                | `/gestion`, `/demo`, `/invitaciones/:id` y `/solicitudes/:id`, para gestión y flujos de demo.                                                                                                                                                                      |
| Front                                | React, componentes reutilizables, Manrope, sistema visual de la landing AFEB, navegación adaptable y búsqueda global.                                                                                                                                              |
| Datos                                | Muestra observada en el portal, centralizada y con procedencia; campos desconocidos conservados como `null`.                                                                                                                                                       |
| Mini backend                         | Repositorio en el navegador: cambios persistentes, escrituras conjuntas, sincronización entre pestañas del mismo origen, solicitudes y recorridos reproducibles.                                                                                                   |
| Flujos interactivos                  | Perfil, preferencias personales, edición básica de empresa propia, marcas por nombre, alta completa de miembros, invitaciones y aceptación local, participación relacionada, inscripción/cancelación, edición/publicación de actividades y gestión de solicitudes. |
| Catálogos principalmente de consulta | Empresas ajenas, contactos observados, informes, normativa, documentos y colaboradores.                                                                                                                                                                            |
| Acceso real                          | Pendiente: login y recuperación son interfaces de demostración. La app no tiene sesiones autenticadas ni una vista de visitante separada.                                                                                                                          |
| Producción                           | Pendientes servidor/API, base compartida entre dispositivos, permisos reales, Zoho, correo y archivos privados.                                                                                                                                                    |

**No hay una gran sección de URLs auditadas ausente. Lo que falta se concentra en campos, acciones, gestión interna y ciclos completos de los flujos.** Tampoco se han implementado todas las pantallas de gestión propuestas por la auditoría.

### Principales huecos restantes para una demo completa

1. Edición extensa de empresa/perfil, edición/baja de miembros, marcas con archivos y visibilidad.
2. Editores de informes, documentos y colaboradores; asignación de archivos por empresa.
3. Editor completo de actividad y gestión de otros inscritos/cancelaciones.
4. Categorías verificadas de licitaciones, materiales originales autorizados y alcance de grupos.

La fase 1 ya conserva miembros e invitados como registros, conecta su participación y ofrece solicitudes estructuradas con seguimiento y preferencias recuperables. Login, permisos de servidor, correo y Zoho pertenecen al paso a plataforma real.

### Cómo leer los estados

- **Funciona en mock:** la acción modifica o consulta el estado local y puede enseñarse en una demo. No implica conexión real.
- **Parcial:** hay pantalla y parte de la funcionalidad, pero faltan campos, operaciones o etapas del flujo.
- **Solo interfaz:** se puede recorrer el diseño; la operación que anuncia aún no se ejecuta.
- **Vacío / por definir:** se conserva el estado observado; no existe un módulo funcional poblado.
- **Pendiente:** no está construido.
- **Decisión AFEB:** hay una pregunta de alcance o regla sin resolver; no completar con suposiciones.

El inventario contiene **99 funcionalidades con ID** para poder convertir los pendientes en tareas concretas. Se ha comprobado que cubre las 21 rutas extraídas de la página 2 del PDF y las 25 rutas actuales de la aplicación, sin IDs duplicados y con referencias locales existentes.

No se calcula un porcentaje de «plataforma terminada»: tener 21 rutas no equivale a tener todos los procesos ni el backend.

## 2. Todas las rutas de la auditoría

Las columnas de pendientes se refieren a completar la cobertura funcional del mock. La conexión real y los controles de producción se detallan por separado.

| Ruta                           | Estado                                   | Qué hay ahora                                                                                                                                                                               | Qué falta para completar su cobertura                                                                                                                                                          | PDF     |
| ------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `/`                            | Parcial                                  | Bienvenida de la cuenta de revisión, indicadores de la muestra, actividad destacada, agenda, informes y comunidad. Contactos AFEB accesibles en Ayuda.                                      | Variante sin sesión; presentación completa del equipo por funciones en inicio. No hay serie estadística verificada para un gráfico.                                                            | 2-3     |
| `/login`                       | Solo interfaz                            | Email, contraseña de ejemplo, mostrar/ocultar, enlace de recuperación y entrada a la demo.                                                                                                  | Modelo de sesión incluso para simular identidades distintas; errores de acceso y salida de sesión. Autenticación real en la fase de backend.                                                   | 2-3     |
| `/forget-password`             | Solo interfaz                            | Email y confirmación genérica simulada.                                                                                                                                                     | Solicitud persistida, validación de enlace/token y pantalla para fijar nueva contraseña. Esa última pantalla no se pudo revisar en el portal original.                                         | 2-3     |
| `/perfil`                      | Parcial                                  | Datos, edición básica con dos teléfonos, cuatro preferencias y participación de la cuenta; estado local conectado.                                                                          | Foto, nombres/apellidos separados, catálogos verificados, confirmación y grupos; backend real.                                                                                                 | 3       |
| `/socios`                      | Parcial                                  | 8 socios observados, búsqueda, 22 categorías y acceso a empresa propia.                                                                                                                     | Carga adicional/paginación, vista pública diferenciada, estados de relación, segmentación y puntos de participación administrativos.                                                           | 4       |
| `/directorio`                  | Parcial                                  | Contactos de la muestra, búsqueda, filtro de departamento, email y acceso a ficha. Los cambios de la cuenta propia se reflejan.                                                             | Teléfonos, segmento/perfil, gestión de visibilidad, edición de otros contactos autorizados, menú administrativo y paginación.                                                                  | 4       |
| `/detalles-socio`              | Parcial                                  | Datos observados de empresa, marcas y equipo de muestra, en consulta.                                                                                                                       | Provincia visible, subcategorías/categorías múltiples, participación de otras empresas, comunicaciones de miembros y acciones administrativas de marcas/equipo.                                | 4       |
| `/detalles-de-mi-empresa`      | Parcial                                  | Edición básica, marcas por nombre, alta de miembros con campos completos/ID y participación agregada del equipo.                                                                            | Campos extensos, logos, edición/baja de miembros y preferencias del equipo.                                                                                                                    | 3-4     |
| `/detalles-equipo`             | Propuesta parcial                        | Contactos observados y miembros locales, todos los campos introducidos, rol de simulación y participación por persona.                                                                      | Campos/visibilidad definitiva y ficha individual a acordar; el original devolvía 404.                                                                                                          | 2, 4, 7 |
| `/eventos`                     | Parcial                                  | Próximas/histórico, búsqueda, 10 categorías, borradores para Gestor y accesos a servicios.                                                                                                  | Patrocinador, paginación, separación editorial de eventos/servicios y configuración completa de destinatarios/estados.                                                                         | 5       |
| `/detalles-evento`             | Mock funcional parcial                   | Presencial, webinar, finalizado y borrador; fechas, tarifas conocidas, contenido/logística observada, inscritos de muestra y búsqueda. Inscribir/cancelar actualiza perfil y participantes. | Calendario, documentos originales, enlace de sesión, gestión de otros inscritos y reglas completas de tarifas/cancelación/público. No se inventan los cupos que faltan.                        | 5       |
| `/inscribir`                   | Funciona en mock                         | Miembro del equipo o persona nueva, datos completos, referencias de actividad/persona/empresa y detalle de invitación.                                                                      | Correo, aceptación real mediante enlace, reglas definitivas de externos y coste; la respuesta actual es explícitamente simulada.                                                               | 5       |
| `/grupos-trabajo`              | Vacío / por definir                      | Buscador visual, estado vacío y acceso a actividades relacionadas.                                                                                                                          | No hay listado poblado ni ficha, miembros o documentos de grupo. Acordar si son espacios permanentes o solo categorías de eventos.                                                             | 4       |
| `/informes`                    | Mock de consulta parcial                 | 11 informes observados, búsqueda, 3 grupos y acceso a sus fichas.                                                                                                                           | Descripciones/metadatos no recogidos, gestión editorial y visibilidad por destinatario.                                                                                                        | 6       |
| `/detalles-informe`            | Mock de consulta parcial                 | Nombres de archivos históricos, filtro por años presentes en los nombres, ficha TXT de prueba y estado sin archivo asignado para informe individual.                                        | PDFs originales, lector/descarga, versiones y asignación manual por empresa. Otros detalles no inspeccionados permanecen sin completar.                                                        | 6       |
| `/normativa`                   | Parcial                                  | 5 recursos temáticos, webinar normativo recogido, servicio de contratos y formulario local de asesoría. Solicitudes gestionables por estado.                                                | Separar próximos/finalizados, contenido/materiales pendientes, adjunto del servicio, destinatario operativo y confirmaciones del flujo.                                                        | 6       |
| `/documentos`                  | Mock de consulta parcial                 | 5 documentos, tabla, búsqueda, clasificación, formato/año conocido y fichas TXT de prueba.                                                                                                  | Originales PDF/DOC, cinco categorías del catálogo completo, filtros adicionales si se acuerdan y gestión editorial. El selector actual usa las categorías que tienen documentos en la muestra. | 6       |
| `/colaboradores`               | Mock de consulta parcial                 | 6 proveedores y 6 beneficios, búsqueda, pestañas, fichas desplegables y correo cuando se ha observado.                                                                                      | Información adicional/enlaces/adjuntos completos, carga adicional, alta/edición, ordenación, publicación y archivo.                                                                            | 4       |
| `/otras-acciones-cobranding`   | Funciona en mock, proceso real pendiente | Hasta 5 empresas por ID, tipos/descripcion, payload completo y seguimiento por responsable/estado/historial.                                                                                | Recepción y comunicaciones reales; matching automático adicional.                                                                                                                              | 7       |
| `/otras-acciones-licitaciones` | Funciona en mock, categorías pendientes  | Preferencias recuperables, intereses/comentarios, referencia de tarifa y solicitud estructurada de seguimiento.                                                                             | Verificar categorías y condiciones; servicio, contratación y newsletters reales.                                                                                                               | 7       |
| `/publicaciones`               | Redirección resuelta                     | Redirige a `/informes`; los enlaces del front actual apuntan al catálogo correcto.                                                                                                          | No necesita otra pantalla. Revisar enlaces históricos cuando se migre el portal.                                                                                                               | 2, 7    |

### Pantallas adicionales ya construidas

| Ruta                | Estado           | Qué hay                                                                                                            | Qué falta                                                                                                           |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `/gestion`          | Parcial          | Editor básico de actividades y lista de solicitudes enlazada a detalle, responsable, comentarios e historial.      | Editor completo, otros catálogos, gestión de inscritos, archivos y accesos.                                         |
| `/demo`             | Funciona en mock | 6 recorridos, exploración de catálogos/personas/invitaciones, solicitudes estructuradas, roles y restablecimiento. | Ampliar con siguientes fases; varias identidades, importación/exportación de sesiones no son requisitos originales. |
| `/invitaciones/:id` | Funciona en mock | Datos, referencias, estado y aceptación/rechazo/revocación explícitos; inscripción vinculada.                      | Correo/token y reglas reales en fases posteriores.                                                                  |
| `/solicitudes/:id`  | Funciona en mock | Payload por tipo, relaciones, responsable, comentarios, estado e historial persistentes.                           | Comunicaciones/integración de procesos reales en fases posteriores.                                                 |

## 3. Funcionalidades de acceso, inicio y perfil

Fuente: pp. 3 y 8; propuesta de controles y sesiones en p. 9.

| ID   | Funcionalidad                                    | Estado actual                             | Pendiente concreto                                                                                                |
| ---- | ------------------------------------------------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| A-01 | Entrar con email/contraseña                      | Solo interfaz                             | El formulario navega a inicio; no valida una identidad ni crea una sesión.                                        |
| A-02 | Recuperar contraseña                             | Solo interfaz                             | No genera solicitud persistente, enlace/token ni correo.                                                          |
| A-03 | Establecer nueva contraseña desde enlace         | Pendiente / no observado                  | Diseñar tras acordar autenticación. El PDF dice que no pudo revisarse ese recorrido.                              |
| A-04 | Salir, caducar o revocar sesión                  | Pendiente                                 | «Ver pantalla de acceso» no es logout. Falta ciclo de sesión.                                                     |
| A-05 | Inicio de visitante y contenido público          | Pendiente                                 | Navegar sin login abre el mock; no se ha implementado una identidad Visitante.                                    |
| A-06 | Permisos Socio/SocioAdmin/Gestor                 | Simulación parcial                        | El selector cambia la vista de la misma cuenta; no cambia de persona/empresa ni valida permisos en servidor.      |
| A-07 | Administrador funcional                          | Pendiente                                 | Es un perfil propuesto por la auditoría; no hay su consola ni gestión de accesos.                                 |
| H-01 | Bienvenida y accesos a áreas                     | Funciona en mock                          | Se basan en la cuenta y la muestra local.                                                                         |
| H-02 | Indicadores y agenda                             | Funciona en mock, muestra parcial         | No son cifras totales de AFEB ni datos analíticos nuevos.                                                         |
| H-03 | Equipo de contacto por función                   | Parcial                                   | 8 contactos observados en Ayuda; falta el bloque completo en inicio.                                              |
| H-04 | Estadísticas de ventas                           | Pendiente de datos, no exigido como motor | Se retiró el gráfico inventado. Hay nombres de informes, sin serie estadística importada.                         |
| P-01 | Consultar y editar persona                       | Funciona en mock, campos parciales        | Nombre completo, cargo, nivel, departamento, dos teléfonos y LinkedIn. Email se consulta; no se edita aquí.       |
| P-02 | Foto, apellidos, segundo teléfono y confirmación | Parcial                                   | Segundo teléfono implementado; pendientes foto, apellidos separados y confirmación.                               |
| P-03 | Opciones de nivel/departamento y «Otro»          | Parcial                                   | Son entradas de texto; falta verificar y modelar los catálogos originales.                                        |
| P-04 | Rol en ficha                                     | Consulta/simulación                       | El perfil no modifica privilegios. Concesión de roles mediante gestión autorizada, no como campo libre de perfil. |
| P-05 | Comunicaciones personales                        | Funciona en mock                          | Cuatro elecciones, Guardar/Cancelar y persistencia. Valores originales desconocidos empiezan indeterminados.      |
| P-06 | Mis inscripciones                                | Funciona en mock, alcance parcial         | Muestra altas de la cuenta de revisión; no se ha importado un histórico completo por persona.                     |
| P-07 | Relación con empresa y logo                      | Parcial                                   | Nombre/enlace de empresa e iniciales; sin foto/logo de empresa ni resumen completo en perfil.                     |
| P-08 | Actualización semanal de grupos                  | Pendiente / decisión                      | El texto auditado anuncia periodicidad; no hay proceso programado ni histórico de grupos.                         |

## 4. Empresa, marcas, equipo y directorios

Fuente: pp. 3-4. No todas las operaciones administrativas observadas están disponibles para socios en la propuesta nueva.

| ID   | Funcionalidad                                    | Estado actual                      | Pendiente concreto                                                                                                                                     |
| ---- | ------------------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| E-01 | Consultar empresa propia                         | Funciona en mock, campos parciales | Cuenta ZERION (pruebas), con campos no observados vacíos. No se le atribuye antigüedad ni condición de socio.                                          |
| E-02 | Editar empresa propia                            | Funciona en mock, campos parciales | Razón social, CIF, domicilio, localidad/país, email/teléfono/web, categoría, empleados, facturación total, mercado y exportación.                      |
| E-03 | Identidad comercial y domiciliaria extensa       | Pendiente                          | Logo, nombre comercial separado, provincia, CP y marca principal.                                                                                      |
| E-04 | Dimensión y actividad extensa                    | Pendiente                          | Facturación sectorial, tipología, mercados múltiples, categorías múltiples/subcategorías, CNAE y canales.                                              |
| E-05 | Relación con AFEB/asociaciones                   | Pendiente                          | Fecha de alta, relaciones/vinculaciones y campos acordados de otras asociaciones.                                                                      |
| E-06 | Contacto general y principal                     | Parcial                            | Contacto general básico; falta contacto principal independiente y su relación con persona.                                                             |
| E-07 | Marcas                                           | Funciona en mock, simplificado     | Añadir/eliminar nombres en empresa propia; sin logo, archivo, edición completa ni entidad de marca mutable con ID.                                     |
| E-08 | Coste de marcas                                  | Decisión AFEB                      | Se conservan 100/130 € como discrepancia; no hay tarifa definitiva ni cobro.                                                                           |
| E-09 | Añadir persona al equipo                         | Funciona en mock                   | Alta con ID y todos los campos introducidos, empresa y rol de simulación separado. Equipo, directorio y ficha conectados; edición/baja quedan en E-10. |
| E-10 | Editar, quitar o revocar un miembro              | Pendiente                          | Sin detalle editable, baja, revocación, aceptación ni gestión completa de roles del equipo.                                                            |
| E-11 | Comunicaciones de miembros/empresa               | Pendiente                          | No hay tabla editable de preferencias del equipo ni preferencias de empresa diferenciadas.                                                             |
| E-12 | Participación de empresa                         | Funciona en mock, muestra parcial  | Agregación de inscripciones por persona/empresa, incluyendo miembros locales. No se asignan a empresas los participantes observados sin FK verificada. |
| E-13 | Editar marcas/equipo de otra empresa como Gestor | Pendiente                          | La ficha de otra empresa es de consulta; no tiene esos controles administrativos.                                                                      |
| D-01 | Catálogo de empresas y categorías                | Funciona en mock, muestra parcial  | 8 socios, búsqueda y 22 filtros; falta carga adicional.                                                                                                |
| D-02 | Directorio público frente a administrativo       | Pendiente                          | Acordar qué se publica y separar estados/segmentos/puntuaciones de datos compartidos.                                                                  |
| D-03 | Directorio de personas                           | Funciona en mock, muestra parcial  | Consultar, buscar y filtrar; cuenta propia conectada con edición de perfil.                                                                            |
| D-04 | Teléfonos, etiquetas y visibilidad de contacto   | Pendiente                          | No se muestran ambos teléfonos ni se gestionan «Oculto para Socios»/«Oculto del directorio» o segmento.                                                |
| D-05 | Edición administrativa de contactos              | Pendiente                          | Sin Editar/menú contextual/baja de contactos ajenos. El error de mapeo antiguo no se «resuelve» por omitir el editor.                                  |
| D-06 | Ficha compartida de empresa                      | Parcial                            | Campos conocidos, marcas y equipo. Falta participación, comunicaciones, provincia visible y clasificación múltiple.                                    |
| D-07 | Ficha individual de contacto/participante        | Propuesta parcial                  | La muestra de inscritos solo verifica nombre/empresa y vínculo de actividad; no se presume email/cargo ni identidad CRM.                               |
| D-08 | Reglas de privacidad por campo                   | Decisión + pendiente               | Mostrar datos fiscales o un aviso no implementa permisos. Acordar campos compartidos y aplicar filtrado de datos.                                      |

**Fase 1:** el equipo ya deriva de personas con ID; las invitaciones y las participaciones están conectadas con directorio, persona y empresa. Las marcas siguen como nombres en el overlay local; su edición/logo completos se mantienen en fase 2.

## 5. Actividades, inscripciones e invitaciones

Fuente: p. 5; panel y aceptación en pp. 8 y 12.

| ID   | Funcionalidad                                 | Estado actual                           | Pendiente concreto                                                                                                                                                                   |
| ---- | --------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| V-01 | Listado, búsqueda y 10 categorías             | Funciona en mock                        | Próximas, histórico y borradores; falta paginación/carga adicional.                                                                                                                  |
| V-02 | Patrocinador y servicios                      | Parcial                                 | Accesos a cobranding/licitaciones; sin patrocinador modelado ni gestión separada de servicios.                                                                                       |
| V-03 | Cuatro variantes de detalle                   | Funciona en mock                        | Presencial, webinar abierto, finalizado y borrador. Se conservan las diferencias conocidas.                                                                                          |
| V-04 | Fechas, lugar, dirección, contenido/logística | Parcial                                 | Muestra los campos observados. No hay enlace de sesión protegido ni zona horaria verificada en los registros importados.                                                             |
| V-05 | Tarifas socio/segundo/no socio                | Consulta parcial                        | BdB conserva 150/75 €. Campos desconocidos no se interpretan como gratuitos. No se calcula el coste por número/tipo de invitado.                                                     |
| V-06 | Inscribirse                                   | Funciona en mock                        | Estado abierto, fechas/tarifa necesarias y plazo; evita duplicar el alta de la misma cuenta. Perfil, contador y participantes se actualizan juntos.                                  |
| V-07 | Cupo agotado                                  | Parcial                                 | Se bloquea estado Completa y un cupo local conocido. Los cupos importados son desconocidos y la lista de inscritos es una muestra; no prueba aforo real ni concurrencia de servidor. |
| V-08 | Cancelar inscripción                          | Funciona en mock, regla parcial         | Retira el alta local y ajusta contador. No aplica plazos/penalizaciones de una política de cancelación ni reembolso.                                                                 |
| V-09 | Lista de inscritos                            | Funciona en mock, muestra parcial       | Ocurrencias observadas y registros locales por actividad, búsqueda y enlaces. Paginación/exportación y gestión administrativa completa quedan pendientes.                            |
| V-10 | Calendario                                    | Pendiente                               | Botón deshabilitado. No se generan ICS con una zona horaria supuesta ni se presenta un archivo original importado.                                                                   |
| V-11 | Recursos y materiales                         | Parcial                                 | Nombres observados y fichas TXT. Sin PDFs, grabaciones ni enlaces privados operativos.                                                                                               |
| V-12 | Preparar invitación                           | Funciona en mock                        | Invitación con todos los campos, persona/empresa/actividad por ID, duplicados y coste pendiente. No envía correo.                                                                    |
| V-13 | Aceptar/rechazar/revocar invitación           | Funciona en mock; integración pendiente | Aceptación/rechazo/revocación explícitos e inscripción idempotente ligada a invitación. Tokens, caducidad de enlace y respuesta real corresponden al backend futuro.                 |
| V-14 | Duplicados/límites de invitados y empresa     | Pendiente / decisión                    | Acordar invitados externos, número permitido, pertenencia y tarifas; validarlos al implementar.                                                                                      |
| V-15 | Crear/editar actividades                      | Funciona en mock, campos parciales      | Título, categoría, formato, fechas, plazo, lugar, tarifa socio, cupo, estado y descripción.                                                                                          |
| V-16 | Editor completo de actividad                  | Pendiente                               | Patrocinador, público/destinatarios, zona horaria, dirección diferenciada, enlace de sesión, documentos y tarifas adicionales.                                                       |
| V-17 | Publicación y estados                         | Parcial                                 | Guardar estado y publicar borrador; ocultarlo en vistas de socios y búsqueda. Sin reglas completas de transición, programación, archivo o revisión editorial.                        |
| V-18 | Gestión de inscritos/cancelaciones por Gestor | Pendiente                               | No hay panel administrativo para inscribir/cancelar a otro miembro ni consultar históricos de operaciones.                                                                           |
| V-19 | Metadatos incoherentes                        | Advertencia implementada                | Se señalan ECOEMBES y CBAM y se conserva lo observado. Falta resolver los datos con su responsable y ampliar validaciones del editor.                                                |

Inscribir a la cuenta actual no prueba un ciclo con varios usuarios. Resolver una solicitud con estado «Resuelta» tampoco acepta automáticamente una invitación ni crea un asistente.

## 6. Informes, normativa, documentos, colaboradores y grupos

Fuente: pp. 4 y 6.

| ID   | Funcionalidad                               | Estado actual                     | Pendiente concreto                                                                                                                                     |
| ---- | ------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R-01 | Informes por grupos y búsqueda              | Funciona en mock, muestra parcial | Mercado/sectoriales/internacionales; títulos y metadatos recogidos.                                                                                    |
| R-02 | Detalle e históricos de ventas              | Funciona en mock, metadatos       | 23 nombres observados, con último archivo listado de 2T 2026 parcial y años extraídos del nombre. No hay trimestres inventados.                        |
| R-03 | Consultar/descargar original                | Pendiente                         | PDFs/DOC no importados; las fichas TXT no son los documentos.                                                                                          |
| R-04 | Informe personalizado por empresa           | Solo estado de consulta           | Se muestra ausencia de asignación. Falta carga manual y relación archivo-empresa con concesión.                                                        |
| R-05 | Editar informes y ediciones                 | Pendiente                         | Alta, descripción, categorías, archivos, versiones, destinatarios, publicar/archivar y ordenación acordada.                                            |
| N-01 | Recursos temáticos de normativa             | Funciona en mock, muestra parcial | 5 entradas enlazadas a plantilla de informe. No se ha importado su contenido completo.                                                                 |
| N-02 | Webinars normativos próximos/finalizados    | Parcial                           | Se lista el webinar normativo recogido; falta separar secciones y ampliar datos cuando se verifiquen.                                                  |
| N-03 | Asesoría de contratos                       | Funciona en mock, ciclo parcial   | Descripción/contacto observados, consulta local y estado de gestión. Sin correo al responsable/solicitante ni asignación operativa.                    |
| N-04 | Materiales y adjunto del servicio           | Parcial                           | Metadatos en la base; no todos se presentan en Normativa ni tienen contenido original.                                                                 |
| F-01 | Tabla institucional y búsqueda              | Funciona en mock, muestra parcial | 5 nombres de documentos, categoría/subcategoría y formato/año cuando se conocen.                                                                       |
| F-02 | Cinco categorías institucionales            | Parcial                           | La base guarda el catálogo; la UI ofrece solo las categorías presentes en la muestra.                                                                  |
| F-03 | Público/exclusivo/interno                   | Decisión + pendiente              | No hay concesiones por documento ni lector/descarga autorizada.                                                                                        |
| F-04 | Subida, versiones y destinatarios           | Pendiente                         | No existe gestor de archivos ni validación de formato/tamaño ni relación de acceso.                                                                    |
| C-01 | Proveedores y benefits                      | Funciona en mock, muestra parcial | Dos catálogos, búsqueda, fichas y beneficios/contactos observados.                                                                                     |
| C-02 | Información adicional, archivos y enlaces   | Parcial                           | No se ha modelado/expuesto toda la ficha; falta carga adicional y recursos adjuntos. Un `mailto:` abre el cliente de correo, no envía desde el portal. |
| C-03 | Gestión de colaboradores                    | Pendiente                         | Crear/editar, categoría, orden, publicación y archivo.                                                                                                 |
| G-01 | Listado de grupos                           | Vacío / decisión AFEB             | La fuente estaba vacía. La pantalla no tiene render de una colección poblada; el buscador no encuentra grupos reales.                                  |
| G-02 | Grupo, miembros, documentos y participación | Pendiente condicional             | Construir solo si AFEB confirma espacios permanentes y aporta su estructura. No hay una URL original de detalle verificable.                           |

La entrega manual de un informe personalizado sí pertenece a la propuesta base del PDF. La **generación automática** de la marca de agua es alcance adicional.

## 7. Solicitudes y servicios

Fuente: pp. 6-8.

| ID   | Funcionalidad                             | Estado actual                            | Pendiente concreto                                                                                                                                                               |
| ---- | ----------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-01 | Registro común de solicitudes             | Funciona en mock                         | Tipo/payload por formulario, ID, actor/empresa, fecha técnica, relaciones, responsable e historial. Los textos del formato anterior se conservan como legacy sin inferir campos. |
| S-02 | Pendiente/En curso/Resuelta               | Funciona en mock                         | Gestor cambia estado en Gestión o Centro de demos; persiste y se sincroniza.                                                                                                     |
| S-03 | Ficha de solicitud y seguimiento          | Funciona en mock                         | Detalle, payload completo, enlaces por ID, responsable, comentarios e historial. Aceptar invitación se ejecuta en su detalle; el estado general no activa servicios.             |
| S-04 | Asesoría: correo y confirmación           | Pendiente real                           | El formulario local funciona; no se envían mensajes ni se notifica a terceros.                                                                                                   |
| S-05 | Cobranding: máximo 5, tipos y descripción | Funciona en mock                         | Los controles y las opciones proceden de la auditoría.                                                                                                                           |
| S-06 | Cobranding: recepción/consulta interna    | Funciona en mock; proceso real pendiente | Empresas por ID, detalle, responsable, comentarios e historial. Matching automático y comunicaciones reales fuera del mock.                                                      |
| S-07 | Licitaciones: intereses y modalidad       | Funciona en mock                         | Preferencias y solicitud se guardan juntas; elecciones, intereses y comentarios reaparecen al volver/recargar. Categorías oficiales en S-08.                                     |
| S-08 | Licitaciones: categorías                  | Pendiente de evidencia                   | La lista específica no se recogió. No sustituirla por las categorías de empresas; mientras tanto se usan comentarios.                                                            |
| S-09 | Licitaciones: tarifa/contratación         | Decisión + pendiente                     | 90 €/mes es una referencia auditada; no hay contratación ni cobro.                                                                                                               |

## 8. Funciones transversales y del mini backend

La búsqueda general y el centro de demos son ampliaciones solicitadas durante el rediseño; no se presentan como pantallas encontradas en el portal antiguo.

| ID   | Funcionalidad                             | Estado actual                        | Pendiente concreto                                                                                                                                                                                                                                                             |
| ---- | ----------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T-01 | Marca y componentes                       | Implementado                         | Sistema visual de la landing con Manrope, papel/bosque/lima, logo contenido y componentes shadcn/Radix. La versión neutra anterior sigue en `main`.                                                                                                                            |
| T-02 | Navegación adaptable y teclado            | Implementado, revisión parcial       | Sidebar/móvil, rutas, filtros y diálogos; seguir verificando módulos que se añadan. No equivale a auditoría completa de accesibilidad.                                                                                                                                         |
| T-03 | Búsqueda global agrupada                  | Funciona en mock, fase 1 completa    | Marcas, contactos observados/miembros locales, participaciones observadas/locales y solicitudes para Gestor; filtrado de borradores. Cuerpos PDF/DOC y backend pendientes.                                                                                                     |
| T-04 | Búsqueda dentro de PDF/DOC                | Pendiente condicional                | No hay cuerpos originales importados. Requiere política de acceso y extracción de texto si se acuerda.                                                                                                                                                                         |
| T-05 | Ayuda y contactos AFEB                    | Funciona en mock                     | Datos observados y enlaces de correo; sin mensajería del portal.                                                                                                                                                                                                               |
| T-06 | Notificaciones                            | Solo accesos de demostración         | La campana enlaza dos registros. No hay bandeja de notificaciones, leídos/no leídos ni avisos generados por acciones.                                                                                                                                                          |
| M-01 | Una fuente factual compartida             | Implementado                         | JSON inmutable, IDs, relaciones verificadas, procedencia y desconocidos a `null`.                                                                                                                                                                                              |
| M-02 | Persistencia y sincronización             | Implementado local                   | Snapshot conjunto en `localStorage`, recarga y pestañas del mismo origen/navegador. Sin API HTTP ni persistencia compartida entre dispositivos; no controla ediciones simultáneas de múltiples escritores ni tiene recuperación de errores de almacenamiento presentada en UI. |
| M-03 | Seis recorridos y reset                   | Implementado                         | Base, inscripción, grupo completo, borrador, informe no asignado e inconsistencia de fechas.                                                                                                                                                                                   |
| M-04 | Modelo de entidades para demos completas  | Implementado para fase 1             | Miembros, invitaciones, solicitudes y registros de participación completos y relacionados. Marcas siguen siendo nombres; archivos/logo/editor completo en fases siguientes.                                                                                                    |
| M-05 | Cambiar persona y empresa de demostración | Pendiente como herramienta adicional | El selector actual solo cambia rol. Acordar si necesitamos este control para presentaciones. No asignar roles reales a contactos sin comprobarlos.                                                                                                                             |
| M-06 | Subidas y originales del mock             | Pendiente                            | Metadatos conservados, pero sin operaciones de carga/lectura de documentos. Cargar únicamente archivos autorizados, manteniendo origen y diferencia respecto al registro observado.                                                                                            |
| M-07 | Pruebas del mock                          | Implementadas, cobertura acotada     | Integridad, relaciones, comandos locales, duplicados, persistencia, roles, escenarios, migración y reinicio. No son pruebas de autorización de servidor.                                                                                                                       |

## 9. Cobertura de las pantallas de gestión

El PDF propone un panel que permita operar sin editar código (p. 8). No fija URLs para sus subsecciones. Los nombres siguientes son **módulos pendientes de la propuesta**, no rutas originales que se hayan encontrado.

| Módulo/pantalla                              | Estado                       | Capacidad necesaria                                                                                                 |
| -------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Editor completo de actividad                 | Parcial dentro de `/gestion` | Completar V-16 y V-17.                                                                                              |
| Gestión de inscritos/cancelaciones           | Pendiente                    | Buscar asistentes, crear/cancelar operaciones autorizadas, revisar reglas e histórico.                              |
| Gestión de informes/ediciones                | Pendiente                    | Crear, editar, clasificar, versionar, publicar y archivar.                                                          |
| Gestión de documentos y adjuntos             | Pendiente                    | Subida, metadatos, versiones, validación y destinatarios.                                                           |
| Asignación de informe/archivo por empresa    | Pendiente                    | Entrega manual y consulta de concesiones.                                                                           |
| Gestión de proveedores/benefits              | Pendiente                    | Alta, edición, orden, categoría, publicación y archivo.                                                             |
| Edición administrativa de empresas/contactos | Pendiente                    | Campos permitidos, segmento, visibilidad y estado de relación.                                                      |
| Gestión completa de miembros y accesos       | Pendiente                    | Invitaciones, aceptación, asignación autorizada de roles, bajas y revocaciones.                                     |
| Detalle y seguimiento de solicitudes         | Funciona en mock             | S-03 completo en el mock: payload, responsables, comentarios e historial. Integración de procesos reales pendiente. |
| Registro de cambios relevantes               | Pendiente                    | Autor, entidad, operación y fecha; un contador de cambios locales no sustituye el registro.                         |
| Consola de administrador funcional           | Pendiente                    | Accesos, asociaciones y configuración funcional; separada de administración técnica.                                |
| Gestión de grupos permanentes                | Pendiente condicional        | Solo si se confirma G-02.                                                                                           |

## 10. Lo que falta para pasar del mock a plataforma real

Son trabajos de la propuesta del PDF (pp. 8-10 y 12-13), aunque no tengan una nueva pantalla asociada. No se consideran resueltos por los controles visuales del mock.

| Bloque                         | Situación                              | Trabajo necesario                                                                                                                          |
| ------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Backend y datos compartidos    | Pendiente                              | Elegir arquitectura; definir contratos y almacenamiento persistente; sustituir comandos locales por operaciones de servidor.               |
| Identidad/sesiones             | Pendiente                              | Login, recuperación/restablecimiento, revocación, cookies de sesión y MFA administrativo según diseño aprobado.                            |
| Permisos                       | Pendiente                              | Identidad, empresa, rol, estado y campos autorizados por lectura/escritura/descarga; separar estados comerciales de permisos.              |
| Validación y reglas            | Parciales en cliente                   | Validación de tipos/campos y reglas de cupo, duplicados, cierre, tarifas/cancelación en servidor; concurrencia y operaciones consistentes. |
| Archivos privados              | Pendiente                              | Almacenamiento y entrega controlada, validación de subidas, concesiones y relación archivo-empresa.                                        |
| Zoho                           | Pendiente y dependiente de información | Módulos/campos/relaciones, OAuth, cuotas, propiedad de datos, caché por contexto, reintentos y errores controlados.                        |
| Transición del sistema antiguo | Pendiente                              | Identificar lo que sigue escribiendo Airtable hacia Zoho, datos/fórmulas no migrados y evitar sobrescrituras.                              |
| Correo transaccional           | Pendiente                              | Invitaciones, recuperación, asesoría y confirmaciones; destinatarios y fallos controlados.                                                 |
| Controles de abuso/contenido   | Pendiente de servidor                  | Límites, paginación, CSRF cuando corresponda, limpieza/escape, límites de subidas y protección de secretos.                                |
| Staging y operación            | Pendiente                              | Hosting compatible, HTTPS, secretos, almacenamiento, tareas, logs/alertas, copias/restauración y formación.                                |
| Pruebas de aceptación          | Pendientes de integración              | Dos empresas, accesos cruzados, archivos privados, concurrencia, fallos/cuotas/tokens de Zoho y revocación/restauración.                   |

## 11. Decisiones que debemos cerrar con AFEB

Estas decisiones figuran en el PDF o condicionan los huecos identificados. Mientras no estén resueltas, marcar el campo/regla como pendiente y conservar datos desconocidos.

| Decisión                                                                            | Qué condiciona                                                                |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Fuente de verdad: portal/Zoho y módulos disponibles                                 | Empresa, persona, actividad, inscripción, contenidos y sincronización.        |
| Identidad y empresa: una o varias empresas por usuario, administradores por empresa | Sesión, relación de miembros, invitaciones y permisos.                        |
| Matriz Visitante/Socio/SocioAdmin/Gestor/Administrador funcional                    | Pantallas, operaciones y campos visibles. El PDF la propone, no la certifica. |
| Directorio público/compartido y visibilidad de contactos                            | Emails/teléfonos, segmentos, ficha individual y datos fiscales/económicos.    |
| Grupos como eventos o espacios permanentes                                          | Necesidad de fichas, miembros y recursos de grupo.                            |
| Cupos, plazos, invitados externos, tarifas y cancelación                            | Inscripción, invitaciones, segundo asistente y reglas de coste.               |
| Precio de marca: 100 o 130 €                                                        | Una definición de tarifa; no elegir una cifra por estética.                   |
| Condiciones de licitaciones y categorías reales                                     | Preferencias, referencia de 90 €/mes y contratación.                          |
| Documentos públicos/exclusivos/internos y destinatarios                             | Gestión editorial, búsqueda y descargas.                                      |
| Entrega del Mapa de la Distribución e histórico inicial                             | Asignación manual y archivos que deben estar disponibles al arrancar.         |
| Ficha `/detalles-equipo`                                                            | Confirmar necesidad y campos, dado que el original devolvía 404.              |
| Datos incoherentes de ECOEMBES/CBAM                                                 | Fechas finales y calidad editorial; no corregir por inferencia.               |
| Arquitectura, hosting y corte Airtable → Zoho                                       | Integración, operación y puesta en marcha.                                    |

## 12. Hoja de ruta de trabajo

El orden es una propuesta para continuar este proyecto. Las decisiones de negocio se revisan en paralelo al mock; la integración depende de resolver propiedad de datos, permisos y arquitectura. No se heredan automáticamente las horas del PDF como «horas restantes».

### Fase 1. Completar la coherencia del mini backend

**Estado: completada y verificada en el mock local el 14/10/2026.** Guía y evidencia: [PROBAR_FASE_1.md](PROBAR_FASE_1.md).

Objetivo: que un formulario no pierda datos y las entidades locales se relacionen entre pantallas.

- [x] **M-04 / E-09:** miembro como registro completo con ID y pertenencia de empresa; conservar cargo, email, nivel, departamento, teléfonos, enlaces y rol de simulación separado del rol real.
- [x] **V-12 / V-13:** invitación como entidad; conservar todos los datos introducidos, actividad, estado y regla de coste pendiente.
- [x] **S-03:** payload por tipo de solicitud, referencias por ID, ficha y seguimiento específico.
- [x] **S-07:** preferencias de licitaciones persistentes y recuperación del formulario.
- [x] **E-12 / V-09:** relaciones de participación por persona y empresa para poder agregarlas.
- [x] **T-03:** ampliar el buscador a marcas, miembros locales y participaciones autorizadas en la demo.
- [x] Mantener desconocidos a `null`, procedencia del dataset y overlays locales separados.

**Criterio de cierre:** preparar una persona, invitarla a una actividad, simular aceptación, encontrarla en equipo/directorio y ver su inscripción desde persona, empresa y actividad. Las reglas no confirmadas se identifican como simulaciones propuestas; no se añaden registros plausibles a la base observada. Repetir el recorrido después de recargar y comprobar restablecimiento.

**Resultado de cierre:** comprobado en navegador con una persona introducida expresamente para la prueba: alta completa, invitación, aceptación, ficha/directorio/participación de empresa y actividad, recarga y reset. También se probaron solicitudes, preferencias, búsqueda, duplicados, rechazo/revocación y sincronización entre pestañas.

### Fase 2. Completar pantallas y campos de socio/empresa

- [ ] **P-02 / P-03 / P-07:** perfil completo, catálogos verificados y presentación de foto/logo.
- [ ] **E-03 a E-06:** ficha extensa de empresa y contacto principal.
- [ ] **E-07 / E-10 / E-11:** marcas con identidad/logo, edición de miembros y preferencias de equipo.
- [ ] **D-04 a D-08:** directorio, campos/visibilidad y acciones administrativas acordadas.
- [ ] **H-03 / A-05:** bloque de equipo AFEB y variante de visitante con contenido público acordado.
- [ ] **F-02 / S-08:** categorías institucionales completas y categorías reales de licitaciones.

**Criterio de cierre:** todos los campos observados en pp. 3-4 están cubiertos o explícitamente descartados por AFEB; lo introducido en los formularios persiste y se refleja donde corresponde. No exigir inventar datos para guardar campos desconocidos.

### Fase 3. Completar gestión editorial y recorridos de demo

- [ ] **V-16 a V-18:** editor completo, transiciones acordadas e inscritos/cancelaciones.
- [ ] **R-05 / F-04 / C-03:** editores de informes, documentos y colaboradores.
- [ ] **R-04:** asignación manual de archivos a empresa.
- [ ] **V-10 / V-11 / N-04:** calendario y materiales únicamente con metadatos/archivos verificados o aportados para la simulación.
- [ ] Registro local de cambios para mostrar trazabilidad; seguir distinguiéndolo de auditoría de servidor.
- [ ] Ampliar `/demo` con los recorridos que realmente se hayan completado.
- [ ] **G-02:** implementar solo si se confirma el alcance de grupos permanentes.

**Criterio de cierre:** desde la interfaz se puede crear/editar/publicar contenido, asignar un archivo de demo autorizado a una empresa y consultar su participación, sin editar JSON o código. El mock identifica claramente qué acceso y descarga son simulados.

### Fase 4. Acordar arquitectura y probar integración mínima

- [ ] Revisión de módulos/campos/relaciones de Zoho y propiedad de cada dato.
- [ ] Matriz de permisos por operación/recurso/empresa y política de archivos.
- [ ] Resolver las decisiones del apartado 11 y conservar las que AFEB aún no pueda cerrar como dependencias.
- [ ] Elegir backend/identidad/almacenamiento/hosting, sin reconstruir automáticamente el front.
- [ ] Prueba acordada con dos contextos de empresa, una actividad y un documento privado; usar datos de prueba autorizados, sin alterar el portal anterior.
- [ ] Plan de corte de escrituras Airtable/Zoho y alcance del histórico inicial.

**Criterio de cierre:** contrato de datos y permisos acordado, integración probada y responsabilidades claras. Si faltan datos de acceso o decisiones, avanzar solo en trabajos independientes del mock.

### Fase 5. Implementar backend real y conectar el front

- [ ] **A-01 a A-04 / A-06 / A-07:** identidad, sesiones, recuperación, MFA administrativo y gestión funcional de accesos.
- [ ] API por dominio, validación, permisos y relaciones de empresa.
- [ ] Inscripciones/invitaciones con reglas completas y concurrencia controlada.
- [ ] Archivos privados, asignaciones, subidas y descargas autorizadas.
- [ ] Integración Zoho con gestión de cuotas/errores/reintentos y caché por contexto.
- [ ] Correo transaccional para los flujos acordados.
- [ ] Sustituir el adaptador local manteniendo componentes y recorridos de aceptación.

**Criterio de cierre:** una operación persiste en servidor y sus permisos se cumplen independientemente de los botones del navegador. El selector de roles de presentación no concede privilegios reales.

### Fase 6. Validar, migrar y preparar salida

- [ ] Pruebas de aislamiento entre empresas, cambio de IDs/roles/campos y revocación.
- [ ] Descarga de archivos sin autorización rechazada.
- [ ] Duplicados, cupos/plazos y concurrencia; tarifas coherentes con reglas confirmadas.
- [ ] Fallos/cuotas/tokens de Zoho y subida inválida: error controlado, sin éxito falso ni pérdida de operación.
- [ ] Datos/histórico acordados, staging equivalente a producción y plan de corte.
- [ ] Copia/restauración probada, logs/alertas, responsables de mantenimiento y formación editorial.
- [ ] Aprobación y despliegue cuando se soliciten; no son acciones realizadas por este inventario.

**Criterio de cierre:** superar las pruebas del PDF p. 12 y dejar operación/mantenimiento acordados.

## 13. Funciones que no debemos incluir automáticamente en el alcance base

El PDF las excluye o señala como adicionales (pp. 1, 5-7, 11-12). Su ausencia no equivale por sí sola a una pantalla del portal «olvidada».

- Web pública posterior e idiomas adicionales.
- Implantación/rediseño de Zoho, fórmulas desconocidas y limpieza de todo el histórico empresarial.
- Pasarela de pago, facturas y reembolsos.
- Generación de informes estadísticos o datos para un gráfico.
- Producción automática de newsletters y motor de búsqueda de licitaciones.
- Matching automático de cobranding.
- Grabación/alojamiento de webinars.
- Marcas de agua generadas automáticamente.
- Pentest independiente, mantenimiento continuado y licencias.

La auditoría también contempla una primera versión de producción más acotada, posponiendo asesoría/cobranding/licitaciones, grupos permanentes, marcas extensas y automatizaciones. **No es una decisión tomada para este rediseño.** Si se adopta, registrar expresamente las funciones aplazadas; los controles de acceso y sus pruebas siguen formando parte de la entrega real.

## 14. Datos disponibles y límites para ampliar demos

| Colección              | Base actual | Límite                                                                                      |
| ---------------------- | ----------: | ------------------------------------------------------------------------------------------- |
| Empresas               |          10 | 8 socios, AFEB y ZERION (pruebas). No todas las fichas están completas.                     |
| Personas               |          18 | Cuenta de revisión, 8 contactos AFEB y 9 contactos de fichas. No es el directorio completo. |
| Actividades            |          12 | Muestra de catálogo y detalles representativos; 2 borradores titulados.                     |
| Participaciones        |          24 | Primeros 8 inscritos de 3 actividades. Los IDs de enlace no se presumen identidad CRM.      |
| Informes               |          16 | 11 del catálogo y 5 de normativa.                                                           |
| Documentos             |           5 | Nombres y clasificación; originales no importados.                                          |
| Archivos               |          39 | Metadatos; sin bytes ni enlaces firmados.                                                   |
| Colaboradores/benefits |          12 | 6 + 6 fichas visibles recogidas.                                                            |
| Grupos                 |           0 | Vacío observado; no hay registros de grupos con miembros/recursos.                          |
| Servicio de asesoría   |           1 | Descripción/contacto y metadatos de adjunto.                                                |

No añadir nombres, precios, calendarios, cupos ni archivos plausibles para marcar un requisito como completo. Ampliar desde una fuente revisada o una entrada explícita del presentador, separando siempre la simulación de los datos observados. Las descripciones no recogidas, los teléfonos desconocidos y los cupos sin valor no se transforman en datos inventados.

## 15. Cómo usar y mantener esta hoja de ruta con Cursor

1. Elegir una fase y un conjunto pequeño de IDs de funcionalidades.
2. Revisar el código indicado, el apartado del PDF y las decisiones que bloquean ese conjunto.
3. Implementar la parte autorizada sin mezclar integración, rediseño y despliegue en la misma tarea.
4. Comprobar persistencia, relaciones, navegación/teclado y móvil cuando se cambie UI; ejecutar las comprobaciones que correspondan.
5. Actualizar aquí el estado y describir exactamente qué etapa del flujo funciona. Si solo hay un formulario, mantenerlo «Parcial».
6. Mantener [ALCANCE.md](ALCANCE.md) como índice y [CURSOR.md](CURSOR.md) alineado con este inventario.

Comprobaciones disponibles: `npm run mock:check`, `npm run mock:flows`, `npm run build` y `npm run format:check`. Los resultados de pruebas de código no sustituyen una demostración del recorrido ni las pruebas futuras del backend real.

### Siguiente bloque recomendado

**Fase 2: campos y operaciones de socio/empresa.** La fase 1 está cerrada para el mock local. Continuar con campos extensos, edición/bajas de miembros, marcas y preferencias del equipo, respetando las decisiones pendientes y la base observada.
