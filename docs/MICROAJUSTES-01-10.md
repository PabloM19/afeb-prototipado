# Primeros diez microajustes de la auditoría revisada

Implementados y revisados el 16 de octubre de 2026 en `codex/afeb-ajustes-graduales`.
`main` se mantiene en `5862f337d1c5c9783838cacc168f873917e748f4`.

El alcance es reubicar contexto y quitar duplicados dentro de componentes, conservando secciones, métricas, datos y flujos.

| ID   | Ajuste aplicado                                                                                                            | Dónde comprobarlo                                        |
| ---- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| M001 | Empresa pequeña y visible bajo el breadcrumb; retirado el bloque contextual lateral.                                       | Cabecera de cualquier ruta del portal, también en móvil. |
| M007 | Retirado «Actividad del catálogo».                                                                                         | Destacado de `/portal`.                                  |
| M008 | Fecha, hora e icono juntos una vez arriba a la derecha. Lugar y modalidad permanecen en el cuerpo.                         | Destacado de `/portal`.                                  |
| M010 | Retirado «Actividad del catálogo observado».                                                                               | Banner de `/eventos`.                                    |
| M011 | Fecha solo en el bloque derecho del banner, mediante un elemento `time` accesible.                                         | Banner de `/eventos`; el listado conserva sus fechas.    |
| M013 | Descripción completa una vez en «Información de la actividad».                                                             | Abrir «Conocer la jornada» en `/eventos`.                |
| M019 | Etiquetas «Cargo» y «Empresa».                                                                                             | Preparar una invitación local y abrir su detalle.        |
| M031 | Retirado «Contacto del mock» en cada tarjeta. Aviso general y enlaces conservados.                                         | `/directorio`.                                           |
| M040 | Retirado el subtítulo repetido de las cuatro preferencias.                                                                 | `/perfil` → Comunicaciones.                              |
| M045 | «Exclusivo Socios AFEB» junto a un único «Gratuito». Se conservan las condiciones personalizadas y los datos desconocidos. | Pie de la tarjeta Evolución de Ventas en `/informes`.    |

## Verificación realizada

- `npm run build`: correcto.
- `npm run mock:check`: integridad, procedencia y relaciones correctas.
- `npm run mock:flows`: flujos de fase 1 correctos, incluidas persistencia, invitaciones, solicitudes, búsqueda y reinicio.
- `git diff --check`: correcto.
- Revisión en navegador del build de producción en un origen separado (`http://127.0.0.1:5188`), sin alterar los datos del puerto habitual.
- Dashboard: cuatro métricas, destacado, informe, agenda, empresas y accesos conservados; una fecha y hora en el destacado.
- Actividades: banner y listado conservados; descripción completa, reserva, participantes y documentación presentes en el detalle.
- Invitación local de prueba: etiquetas nuevas y valores correctos; estado Pendiente, coste Por confirmar y referencia 0 €, con acciones y enlaces conservados.
- Directorio: tarjetas y enlaces presentes; aviso general conservado.
- Comunicaciones: cuatro controles inicialmente indeterminados; Cancelar recupera el estado y Guardar conserva el cambio tras recargar.
- Informes: once tarjetas y destacado conservados; precio gratuito una vez en el pie correspondiente, condición individual y tarifas no verificadas conservadas.
- Móvil a 390 px: empresa visible, búsqueda accesible, fecha alineada a la derecha y menú operativo, sin desbordamiento horizontal.
- Consola del dashboard sin errores ni advertencias durante la comprobación.
- Restablecida la base del origen de prueba al terminar.

## Capturas

- [Escritorio](previews/microajustes/dashboard-escritorio.png)
- [Móvil](previews/microajustes/dashboard-movil.png)
