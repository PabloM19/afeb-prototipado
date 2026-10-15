# Aceptación de la fase 1

**Fecha de registro:** 15/10/2026. **Resultado:** criterio de cierre cumplido en el mock local.

Esta acta recoge la prueba manual comunicada por el usuario. Es evidencia de su recorrido, adicional a las comprobaciones de implementación de [VERIFICACION.md](VERIFICACION.md); no representa una nueva ejecución automática ni una revisión del portal privado.

**Dirección utilizada:** `http://127.0.0.1:5175/`, porque los puertos 5173 y 5174 estaban ocupados. La prueba empezó con **Restablecer base** y terminó con otro restablecimiento.

## 1. Personas

- En SocioAdmin, el alta de `persona.demo@example.test` creó un único miembro de ZERION (pruebas): Persona Demo, Responsable de producto, nivel Dirección, departamento Marketing, dos teléfonos, enlace de LinkedIn y rol propuesto Socio. El rol real permaneció **No verificado**.
- Los campos persistieron al recargar. Equipo, directorio y búsqueda general enlazaron al mismo ID.
- Repetir el email en mayúsculas mostró «Ya existe una persona con este email en la demo» y conservó el formulario. El navegador recorta los espacios del campo email; el repositorio también normaliza con recorte y minúsculas.
- El mismo nombre con `persona.demo.2@example.test` creó otra persona sin fusionarlas.

Los datos introducidos en este recorrido son entradas de simulación, no nuevas observaciones del portal ni registros que incorporar a `mock-db.json`. El informe no aporta el valor del enlace de LinkedIn ni los IDs generados; no se completan aquí.

## 2. Invitación y aceptación

- La invitación de Persona Demo a HOUSER quedó **Pendiente**, con coste **Por confirmar** y tarifa de referencia de 0 €.
- **Simular aceptación** la pasó a **Aceptada** y creó una sola inscripción local confirmada.
- La inscripción apareció en la ficha de la persona y en Participación de ZERION. HOUSER pasó de 8 a 9 participantes; Mis inscripciones de Eloy permaneció en 0.
- La búsqueda devolvió a la misma persona como contacto y participante. Las relaciones y el estado persistieron al recargar.

## 3. Casos sin inscripción

- Repetir la invitación a HOUSER se bloqueó con «Esta persona ya está inscrita o tiene una invitación pendiente», sin incrementar el contador.
- **Simular rechazo** dejó la invitación **Rechazada**. **Revocar invitación local** la dejó **Revocada** y retiró las acciones de respuesta.
- BdB conservó **Grupo completo**, tarifas de 150 € y 75 € y cupo no verificado, sin alta ni invitación.
- Con una invitación pendiente a ECOEMBES, cerrar el plazo local al 01/10/2026 bloqueó la aceptación: «La actividad no admite inscripciones: revisa estado, plazo, datos y cupo». La invitación siguió **Pendiente**.
- Una persona externa conservó «Taller Externo Demo» como empresa en texto y `companyId: null` al desmarcar la pertenencia a la empresa.

## 4. Solicitudes

- La consulta de normativa y la propuesta de cobranding con 3M y AC MARCA, tipo Marketing, conservaron tipo, texto, servicio e IDs de empresas con enlaces a sus fichas.
- Como Gestor, el estado **En curso**, la responsable Marta Omedes y el comentario quedaron en el historial y persistieron al recargar.
- La otra pestaña del mismo origen mostró **Resuelta** sin recargar.
- Socio y SocioAdmin pudieron consultar la solicitud y vieron «Selecciona la vista Gestor AFEB para gestionar estado, responsable y comentarios».
- Resolver la solicitud de la invitación a ECOEMBES no aceptó al invitado.

## 5. Licitaciones

- La modalidad general diaria quedó en **No** y la personalizada en **Sí**, con intereses y comentarios conservados al salir, volver y recargar.
- La solicitud mantuvo esa copia, categorías **No verificadas** y tarifa mensual de referencia de 90.
- Marcar la solicitud **Resuelta** no contrató el servicio.

## 6. Marcas, búsqueda y restablecimiento

- `MarcaDemoFase1` apareció en el buscador y abrió ZERION en Marcas.
- Como Gestor, «plazos de contrato» abrió el detalle de la asesoría. Como Socio dio 0 resultados y no apareció el área de gestión.
- Datos del mock mostró 21 personas y 5 invitaciones durante la prueba, con enlaces a `/detalles-equipo` y `/invitaciones`.
- El restablecimiento final dejó 0 inscripciones, solicitudes, invitaciones, miembros y marcas **locales**. Las preferencias de licitaciones volvieron a indeterminadas.
- El equipo de ZERION volvió a contener solo a Eloy Latorre; HOUSER recuperó 8 inscripciones y ECOEMBES el plazo del 23 de octubre. La base observada conservó 18 contactos y 24 participaciones.
- La otra pestaña pasó a «Solicitud no encontrada» sin recargar y mantuvo ese resultado después de recargar.

## Conclusión y continuidad

El recorrido comunicado cumple el criterio de cierre de la fase 1 y no reporta incidencias funcionales pendientes. Se mantiene el alcance de simulación local descrito en la [guía de prueba](PROBAR_FASE_1.md).

**Prioridad actual: dedicar el siguiente bloque a la interfaz.** Las fases 2-6 permanecen pendientes; no iniciar la fase 2 durante este paréntesis. Los cambios visuales deben conservar los datos, las relaciones, las acciones y los resultados aceptados aquí. Comprobar los recorridos que afecte cada cambio de interfaz.

**Persistencia y puertos:** el almacenamiento pertenece al origen completo (protocolo, host y puerto). `127.0.0.1:5175`, `127.0.0.1:5173` y `localhost:5175` tienen estados separados. La sincronización entre pestañas y el restablecimiento se aplican al mismo origen; abrir otro puerto no recupera automáticamente la sesión probada.
