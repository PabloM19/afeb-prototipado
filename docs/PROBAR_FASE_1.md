# Probar la fase 1 del mock AFEB

**Estado: implementada y verificada el 14/10/2026.** La fase 1 completa la coherencia del mini backend local. Esta guía reproduce su criterio de cierre y sus comprobaciones adicionales.

**Aceptada por el usuario el 15/10/2026:** el [acta de su recorrido](ACEPTACION_FASE_1.md) registra los resultados y el restablecimiento final. El siguiente bloque se dedica a la interfaz; la fase 2 queda pendiente.

Arranca con `npm run dev` y abre la dirección de Vite, normalmente `http://127.0.0.1:5173/`. Se reutilizan los registros observados: no hay que importar otra base ni usar credenciales reales.

El recorrido de aceptación utilizó `http://127.0.0.1:5175/`. Cada combinación de protocolo, host y puerto conserva su propio estado: usa el mismo origen para recuperar una sesión o comprobar la sincronización entre pestañas.

## 1. Preparar una persona y conservar sus datos

1. Abre **Centro de demos** y pulsa **Restablecer base**. Confirma. Esto elimina los cambios de la sesión local.
2. Mantén la vista **SocioAdmin**.
3. Abre **Mi empresa → Equipo → Añadir persona**.
4. Introduce los datos de una persona de demostración: email, nombre, cargo, nivel, departamento, teléfono, segundo teléfono, enlace y rol propuesto. Puedes usar un email reservado para pruebas, por ejemplo `persona.demo@example.test`.
5. Pulsa **Guardar persona**.
6. Abre su nombre en el equipo y comprueba todos los campos. El rol real sigue «No verificado»; el rol propuesto es solo de simulación.
7. Busca a esa persona en **Directorio** y en el buscador general. Recarga y vuelve a abrir su ficha.

**Resultado esperado:** el miembro tiene un único ID, pertenece a ZERION (pruebas), conserva lo introducido y aparece en equipo, directorio y búsqueda. No es una cuenta real ni recibe un correo.

**Duplicados:** intenta dar de alta el mismo email con diferentes mayúsculas o espacios. Debe mostrar un error y conservar el formulario; no crea otro miembro. Dos personas pueden tener el mismo nombre si sus emails son distintos: no se fusionan por nombre.

## 2. Invitar, aceptar y comprobar las tres vistas

1. Abre **Actividades → HOUSER & HOUSER — DIY en las Redes Sociales en tiempos de IA**. También puedes usar `/detalles-evento?id=rec9o6L7QzzSGPd3O`.
2. Pulsa **Invitar a otra persona**.
3. En **Seleccionar persona del equipo**, elige el miembro que acabas de crear. Email, nombre, cargo y empresa se rellenan.
4. Confirma el aviso de simulación y pulsa **Preparar invitación**.
5. Revisa el detalle: datos del invitado, actividad, estado **Pendiente** y coste **Por confirmar**. La tarifa de referencia no es un cobro ni una regla de coste acordada.
6. Pulsa **Simular aceptación**.
7. Comprueba que aparece **Aceptada** e **Inscripción local confirmada**.
8. Abre los enlaces **Ver persona**, **Ver actividad** y **Ver empresa**:
   - Persona: su ficha muestra la inscripción.
   - Actividad: aparece en participantes y el contador de la muestra pasa de 8 a 9.
   - Empresa: **Participación** incluye la inscripción del miembro, aunque la cuenta de revisión no se haya inscrito.
9. Recarga cada pantalla y comprueba que continúa igual.
10. Busca al miembro en la búsqueda general: habrá coincidencias como persona y como participante, con enlaces al mismo registro.

**Resultado esperado:** invitación, persona, empresa y actividad se enlazan mediante IDs. La aceptación crea exactamente una inscripción. No se añade a «Mis inscripciones» de Eloy una inscripción perteneciente a otro miembro.

## 3. Probar los casos que no deben crear inscripciones

- **Duplicado:** intenta invitar al mismo miembro a HOUSER otra vez después de aceptar. Se bloquea y no aumenta el contador.
- **Rechazo:** crea otra invitación y pulsa **Simular rechazo**. Queda Rechazada y no añade asistente.
- **Revocación:** crea otra invitación pendiente y pulsa **Revocar invitación local**. Queda Revocada y no permite aceptar después.
- **Actividad completa:** en BdB, no se permite inscribir/invitar. Se conservan las tarifas conocidas de 150/75 € y el cupo desconocido.
- **Plazo/cupo después de invitar:** como Gestor, modifica la actividad local para cerrar el plazo o fijar un cupo conocido ya completo. Al intentar aceptar una invitación pendiente se muestra un error, no se confirma el alta y la invitación sigue Pendiente.
- **Empresa externa:** el formulario permite introducir una persona externa desmarcando pertenencia a la empresa. Su empresa se conserva como texto y `companyId` queda `null`; no se inventa una empresa del CRM. Esta posibilidad es una propuesta de simulación pendiente de AFEB.

Las invitaciones pendientes/finalizadas se pueden volver a abrir desde el detalle de actividad, **Centro de demos → Datos del mock → Invitaciones** o su solicitud relacionada.

## 4. Solicitudes estructuradas y seguimiento

1. Desde **Normativa**, registra una consulta de asesoría local.
2. Desde **Cobranding**, elige dos empresas, tipo y descripción, y registra la propuesta.
3. Abre **Centro de demos → Solicitudes → Ver solicitud**.
4. Comprueba el tipo y los datos completos. Cobranding conserva los IDs de las empresas y ofrece enlaces a sus fichas; asesoría conserva el texto y el servicio correspondiente.
5. Cambia a **Gestor AFEB** en el menú de usuario.
6. En el detalle, cambia el estado a **En curso**, elige un responsable y escribe un comentario. Pulsa **Guardar seguimiento**.
7. Recarga y comprueba responsable, estado y comentario en el historial.
8. Abre otra pestaña del mismo navegador/origen en esa solicitud. Cambia el estado a **Resuelta** en la primera: la segunda debe actualizarse sin recargar.

**Resultado esperado:** el detalle y la lista de Gestión/Centro de demos usan el mismo registro. El historial conserva actor, fecha, estado y comentario. Un Socio/SocioAdmin consulta sus solicitudes pero no puede gestionarlas desde la interfaz.

**Importante:** marcar una solicitud de invitación como Resuelta no acepta al invitado. La aceptación se ejecuta expresamente desde **Abrir invitación y simular respuesta**. Resolver una solicitud de licitaciones tampoco contrata el servicio.

## 5. Licitaciones: guardar y volver

1. Abre **Actividades → Licitaciones**.
2. Decide las dos preferencias: general diaria y modalidad personalizada. Inicialmente están indeterminadas porque no se verificaron en la fuente. Para escoger «No» desde el estado indeterminado, marca y desmarca la opción.
3. Si eliges personalizada, escribe **Intereses de la modalidad personalizada**. Añade comentarios.
4. Pulsa **Guardar preferencias**.
5. Sal de la página, vuelve y recarga.
6. Comprueba que permanecen las elecciones, intereses y comentarios.
7. Abre la solicitud creada en Centro de demos: conserva una copia de lo enviado, incluyendo referencia de tarifa y categorías desconocidas.

**Resultado esperado:** hay preferencias persistentes y una solicitud de seguimiento. Los intereses son texto del usuario: el catálogo de categorías sigue pendiente de verificación, no se sustituye por el de empresas.

## 6. Marcas, búsqueda y reinicio

1. En **Mi empresa → Marcas**, añade un nombre de marca de demostración.
2. Búscala en el buscador general. El resultado abre la empresa directamente en **Marcas**.
3. En vista Gestor, busca una palabra escrita en una solicitud. Su resultado abre el detalle; en vistas de socio esos resultados de gestión se excluyen.
4. Abre **Centro de demos → Datos del mock**: también hay colecciones de personas e invitaciones con enlaces al front.
5. Pulsa **Restablecer base** y confirma.
6. Comprueba cero inscripciones/solicitudes/invitaciones locales, equipo original, marca local eliminada y preferencias indeterminadas. Recarga y comprueba otra pestaña.

**Resultado esperado:** desaparecen únicamente las modificaciones locales de esta versión; la base observada recupera sus 18 contactos y 24 ocurrencias de participación, sin incorporar los datos de prueba.

## Cobertura técnica de la fase 1

| Requisito de hoja de ruta | Implementación                                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M-04 / E-09               | `members`: ID, empresa/propietario, campos completos, `simulationRole` y `sourceRole` separados. Valores no introducidos a `null`.                             |
| V-12 / V-13               | `invitations`: destinatario completo, persona/actividad/empresa, estado, coste pendiente y vínculo a inscripción. Aceptación, rechazo y revocación explícitos. |
| S-03                      | `requests`: tipo y payload, referencias, responsable, comentarios e historial; rutas `/solicitudes/:id` y `/invitaciones/:id`.                                 |
| S-07                      | `tenderPreferences`: elecciones, intereses, comentarios y fecha técnica; guardado conjunto con solicitud.                                                      |
| E-12 / V-09               | `registrations`: persona/empresa/actividad/invitación y estado; agregación por persona/empresa y participantes de actividad.                                   |
| T-03                      | Índice compartido con miembros, marcas, participaciones observadas/locales y solicitudes visibles en vista Gestor.                                             |
| Datos y overlays          | `mock-db.json` intacto; estado de simulación separado y congelado al publicar snapshots.                                                                       |

El mini backend se actualiza a `backend:v2` bajo el prefijo del dataset existente. Migra el formato anterior: conserva ediciones y textos de solicitudes; los campos de miembros anteriores que no existían permanecen `null`, sin deducirlos. No intenta interpretar un asunto antiguo como una invitación confirmada.

## Pruebas y evidencia

```bash
npm run mock:check
npm run mock:flows
npm run build
npm run format:check
```

`mock:flows` comprueba: conservación de campos, FKs, duplicados, aceptación idempotente, rechazo/revocación, estado/plazo/cupo, solicitud Resuelta sin aceptar invitación, responsable/historial, preferencias, agregación, búsqueda, recarga/sincronización, reset, inmutabilidad del dataset, guardados fallidos y migración sin duplicados.

Verificados además en navegador: alta → invitación → aceptación → ficha/directorio/empresa/actividad, persistencia, bloqueo de duplicado, rechazo/revocación, licitaciones, cobranding/asesoría, seguimiento, sincronización en otra pestaña y restablecimiento completo. Se revisaron 9 vistas en 320/390/768 px: **27 comprobaciones sin desbordamiento horizontal del documento**, corrigiendo equipo y enlace de licitaciones en 320 px.

Capturas con entradas temporales explícitamente de prueba: [participación de empresa](previews/phase1/company-participation-desktop.jpg), [aceptación](previews/phase1/invitation-accepted-desktop.jpg), [móvil](previews/phase1/invitation-accepted-mobile.jpg) y [comprobaciones adaptables](previews/phase1/responsive-checks.json). Las entradas de prueba se eliminaron con restablecimiento; no se añadieron a la base observada.

## Límites que siguen perteneciendo a otras fases

La aceptación es una simulación del presentador, no una respuesta por correo de un invitado real. Costes, invitados externos y permisos definitivos siguen pendientes de AFEB. No hay API de producción, tokens de invitación reales, correos, pagos ni acceso a Zoho. Las ediciones/bajas completas de miembros y la gestión de otros inscritos se mantienen en fases 2-3.
