# Preparar una presentación

Abre `/demo`, accesible desde **Centro de demos** en la navegación y el menú de usuario. El front ya muestra los registros de `src/data/mock-db.json`: actividades, fichas de empresas, informes, normativa, documentos, colaboradores y búsqueda global.

## Centro de control

- **Recorridos:** seis casos basados en IDs de la base verificada. Cada botón recupera el punto de partida y abre la pantalla adecuada. HOUSER se prepara con una inscripción local; Implementa DIY abre la vista Gestor para publicar el borrador. Los otros casos conservan los estados observados.
- **Datos del mock:** consulta las colecciones y abre cada registro en el front. Las modificaciones locales de actividades y de la empresa de revisión se identifican sin alterar la fuente observada.
- **Solicitudes:** las enviadas desde formularios locales aparecen aquí y en Gestión interna. Gestor puede cambiar su estado a Pendiente, En curso o Resuelta; el cambio persiste.
- **Vista de la demo:** cambia entre Socio, SocioAdmin y Gestor AFEB para enseñar los diferentes recorridos.
- **Restablecer base:** recupera la base observada y elimina los cambios de la sesión. Se sincroniza con las pestañas del mismo origen y navegador.

Cargar un recorrido sustituye los cambios locales. La interfaz lo indica antes de los botones. Para conservar una sesión, continúa el recorrido libre sin cargar otro caso.

## Flujo sugerido

1. Abre el recorrido de HOUSER; muestra la inscripción, el perfil y los participantes. Cancela y comprueba la actualización.
2. Carga BdB; muestra sus tarifas verificadas y el estado de grupo completo.
3. Carga el borrador Implementa DIY, publícalo en Gestión y vuelve a la vista de socio.
4. Desde Normativa, registra una consulta de asesoría local. En el Centro de demos, cambia a Gestor y pásala de Pendiente a En curso y Resuelta.
5. Consulta Datos del mock para enseñar que los mismos registros alimentan catálogos y fichas. Restablece al terminar.

## Mini backend local

`src/lib/mock-backend.ts` contiene el repositorio y los comandos; es independiente de React. `StoreProvider` se suscribe a sus snapshots y conserva la interfaz usada por las pantallas.

Los cambios relacionados se escriben juntos en una sola clave `afeb:mock:<datasetId>:backend:v1`: perfil, empresa, preferencias, actividades, inscripciones, solicitudes, marcas, equipo, rol y recorrido activo. La escritura se completa antes de notificar a la UI. Los snapshots publicados se congelan; los comandos crean una nueva versión.

Inscribir/cancelar son idempotentes, comprueban las reglas locales y actualizan registro y contador en la misma operación. Las solicitudes tienen ID local, autor de revisión, fecha técnica de creación, estado y, en invitaciones, referencia de actividad. Los registros importados permanecen intactos.

El evento `storage` sincroniza pestañas del mismo origen. Una nueva versión de la página recupera el estado persistido. Las claves del formato anterior se migran para conservar los cambios de una presentación existente.

Este backend funciona **en el navegador**. No necesita un servidor de datos, no comparte sesiones entre dispositivos y no incorpora correo, pagos, ficheros originales o autorización real. Informes, documentos y colaboradores siguen siendo catálogos de consulta; el editor actual gestiona actividades y solicitudes. Las decisiones de integración siguen documentadas en `CURSOR.md`.

## Comprobación

```bash
npm run mock:check  # Integridad de los registros observados
npm run mock:flows  # Comandos, persistencia, duplicados, sincronización y reinicio
npm run build
```

No añadir datos de negocio plausibles para hacer la presentación: se utilizan los registros verificados y las entradas de simulación que escriba el presentador. Véase `DATOS_MOCK.md` para cobertura y datos desconocidos.
