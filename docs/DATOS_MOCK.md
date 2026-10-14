# Base de datos del mock AFEB

La fuente común es `src/data/mock-db.json`. Contiene una muestra de registros observados en el portal privado el **14/10/2026**, mediante navegación de solo lectura. No es una exportación completa del CRM. No se modificó el portal ni se enviaron formularios.

## Contenido y procedencia

| Tabla          | Registros | Cobertura                                                                           |
| -------------- | --------: | ----------------------------------------------------------------------------------- |
| companies      |        10 | 8 empresas etiquetadas Socio AFEB, AFEB y ZERION (pruebas)                          |
| people         |        18 | Cuenta de revisión, 8 contactos del equipo AFEB y 9 contactos de fichas de empresas |
| activities     |        12 | Catálogo visible, dos borradores con título y un webinar finalizado de normativa    |
| participations |        24 | Primeros 8 inscritos visibles de BdB, ECOEMBES y HOUSER; no totales del portal      |
| reports        |        16 | 11 informes del catálogo y 5 recursos de normativa                                  |
| documents      |         5 | Nombres y clasificación de documentos institucionales                               |
| files          |        39 | Metadatos de archivos observados; sin contenido ni enlaces firmados                 |
| providers      |        12 | 6 proveedores y 6 beneficios, con las fichas visibles desplegadas                   |
| groups         |         0 | Lista vacía en la cuenta revisada                                                   |
| services       |         1 | Asesoría de contratos con la distribución y su contacto publicado                   |

`sources` guarda URL, fecha, método y alcance de cada pantalla consultada. Cada registro incluye `source.sourceIds`, `verifiedFields` y notas de cobertura. Los identificadores `rec…` se conservan cuando aparecen en las rutas originales. Los identificadores técnicos de archivos y contactos sin ID visible son locales; no se presentan como IDs del CRM.

`auditedForms` centraliza las seis opciones y el límite de cinco empresas de cobranding, la referencia de 90 €/mes en licitaciones y los dos precios contradictorios de marca. Proceden del PDF, identificado por SHA-256 en `sources`; las categorías específicas de licitaciones no se recogieron y no se sustituyen por las del directorio.

Las categorías y las etiquetas de comunicación proceden de los controles observados, enlazados a su pantalla en `catalogSources`. La auditoría local `output/pdf/auditoria_portal_afeb_2026-10-14.pdf` complementa el mapa funcional; los textos propuestos de interfaz no se consideran registros de negocio.

## Reglas de los datos

- **No inventar registros ni completar huecos.** Un campo no observado se guarda como `null`; la interfaz muestra «No verificado» o indica que no fue recogido.
- `null` no significa tarifa cero, cupo ilimitado, preferencia desactivada ni ausencia de contactos en toda la empresa. Una lista vacía se distingue de una lista no recogida mediante cobertura y notas.
- Los cupos y la zona horaria de las actividades no figuran en los campos inspeccionados: permanecen `null`. El formato «Webinar» puede derivarse del título explícito o del lugar Online; no añade una ubicación ni una URL de sesión.
- Los participantes son **ocurrencias de inscripción**, ligadas a `activityId`. El ID de un enlace de participante no se presupone ID de persona del CRM. `personId` y `companyId` quedan `null` hasta verificar esa relación; no fusionar personas por nombre.
- Los contactos y las marcas de las empresas son muestras observadas. El contador de contactos del mock no es el tamaño real de un equipo.
- Los archivos solo contienen nombre, formato derivado y años presentes en ese nombre. El histórico de ventas utiliza los 23 nombres observados, encabezados por **2T 2026 parcial**. No se generan trimestres o ediciones inexistentes.
- Las descargas producen fichas TXT de prueba, no los originales PDF/DOC. El calendario queda deshabilitado sin archivo original o zona verificada.
- La cuenta revisada pertenece a **ZERION (pruebas)**, con rol observado `AdminAFEB` y sin inscripciones. No se le atribuye antigüedad ni condición de socio. `Socio`, `SocioAdmin` y `Gestor AFEB` son vistas propuestas de simulación, distintas del rol original.
- Los cuatro estados originales de preferencias no se verificaron: se muestran indeterminados. Las elecciones posteriores son locales.

## Incoherencias conservadas

ECOEMBES empieza el 26/10/2026 y el campo de fin muestra **26/11/2026 11:00**. Se conserva y se señala; no se corrige suponiendo qué quiso decir la fuente. En CBAM, el final estructurado dice 12:00 y el texto anuncia 12:30. También se conserva la advertencia.

BdB muestra **150 €** para el primer inscrito y **75 €** a partir del segundo. La lista indica grupo completo y el plazo observado terminó el 13/10/2026; no se sustituye por un cupo inventado.

El contacto jurídico de la portada y el del servicio de asesoría publican correos distintos. Cada contexto mantiene su correo observado.

## Uso en la aplicación

- `src/data/mock-db.ts` importa y congela recursivamente la base. Expone referencias, utilidades y versión del dataset.
- `src/data/fixtures.ts` adapta esos registros a las pantallas existentes. No debe contener una segunda colección de datos de negocio.
- `src/lib/mock-backend.ts` crea copias de la base y escribe los cambios relacionados juntos en `localStorage`, bajo `afeb:mock:afeb-observed-2026-10-14-v1:backend:v1`. `src/lib/store.tsx` conecta React y sincroniza las pestañas. Los antiguos datos ficticios usan otro prefijo y dejan de alimentar esta versión.
- `src/lib/mock-rules.ts` reúne la regla local de inscripción. Exige estado abierto, fechas y tarifa comprobadas, y aplica el plazo con reloj fijo **14/10/2026**. Un cupo desconocido permanece desconocido. Estas son reglas del borrador, no una afirmación sobre el backend actual.
- El buscador y las fichas leen las mismas entidades. Perfil e inscripciones comparten el estado local.
- **Restablecer demo** recupera la base observada en el snapshot local y elimina las claves antiguas migradas de esta versión. No altera el JSON ni la web privada.

## Escenarios reproducibles

Los IDs y las expectativas están definidos en `scenarios` dentro del JSON.

1. Restablecer: recupera la cuenta revisada y cero inscripciones locales.
2. HOUSER: inscribirse una vez, ver el alta en el perfil y participantes, recargar y cancelar. El registro fuente permanece intacto.
3. BdB: inscripción bloqueada por estado completo/plazo, sin inventar capacidad.
4. Implementa DIY: borrador oculto a las vistas de socio; Gestor puede publicarlo localmente. El cambio no modifica el estado observado del JSON.
5. Mapa de la Distribución: entrega individual sin archivo asignado a la cuenta; descarga deshabilitada.
6. ECOEMBES: muestra la fecha de fin observada y su advertencia.

Las nuevas actividades, marcas, personas o solicitudes introducidas por el usuario son cambios de simulación; nunca se incorporan automáticamente a la base verificada. El panel de gestión marca las actividades modificadas como locales. Invitaciones y solicitudes se guardan como solicitudes locales; no crean una inscripción confirmada en el portal.

## Continuidad en Cursor

Usar siempre este JSON y sus adaptadores. No añadir arrays de negocio dentro de componentes, no rellenar campos con nombres/cifras plausibles y no reinterpretar `null`. Para ampliar la muestra, revisar la fuente, registrar URL/fecha/campos y relaciones verificadas, y pasar `npm run mock:check`. Cambiar `meta.datasetId` cuando una nueva base deba sustituir el punto de partida del navegador.

No introducir contraseñas, cookies, tokens, enlaces firmados ni cuerpos de comunicaciones privadas. La carpeta `tmp/source-review` contiene evidencias temporales locales excluidas de Git; la aplicación no depende de ellas.

```bash
npm run mock:check
npm run mock:flows
npm run build
```

El control automático verifica IDs únicos, procedencia, relaciones entre tablas, propietarios de archivos, años derivados y los casos observados que no deben corregirse silenciosamente.

Los escenarios también se pueden preparar desde `/demo`; el funcionamiento del mini backend y los controles de presentación están en `DEMO.md`.
