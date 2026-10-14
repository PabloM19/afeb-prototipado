# Mapa funcional y cobertura

La referencia actual de cobertura es [HOJA_DE_RUTA_AFEB.md](HOJA_DE_RUTA_AFEB.md). Cruza las 21 rutas de la auditoría con el código actual y distingue lo que funciona en el mock, lo parcial, lo que solo tiene interfaz y las decisiones pendientes.

La tabla anterior describía el primer diseño con datos ficticios, gráfico ilustrativo e ICS. Esos elementos se sustituyeron por la muestra observada y sus límites; no deben usarse para planificar la versión actual.

## Documentos de trabajo

| Documento                             | Para qué usarlo                                                                                |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Hoja de ruta](HOJA_DE_RUTA_AFEB.md)  | Inventario de pantallas/funciones, pendientes con IDs, fases y criterios de cierre.            |
| [Datos del mock](DATOS_MOCK.md)       | Colecciones, procedencia, relaciones verificadas, campos desconocidos y reglas de continuidad. |
| [Guía de demos](DEMO.md)              | Recorridos de presentación y funcionamiento del mini backend local.                            |
| [Arquitectura](ARQUITECTURA.md)       | Estructura del front y frontera con el futuro backend.                                         |
| [Continuidad en Cursor](CURSOR.md)    | Instrucciones y prompts para continuar esta base.                                              |
| [Búsqueda global](BUSQUEDA_GLOBAL.md) | Comportamiento, índice y futura integración.                                                   |
| [Verificación](VERIFICACION.md)       | Comprobaciones realizadas, evidencias y límites.                                               |
| [Marca](MARCA_AFEB.md)                | Identidad aplicada y comparación con la versión neutra.                                        |

## Alcance actual

Las 21 rutas están representadas; `/publicaciones` redirige a `/informes` y `/detalles-equipo` es una propuesta que sustituye el 404 observado. Se añaden `/gestion` y `/demo`. La existencia de las rutas no implica que sus procesos estén completos.

El repositorio implementa un frontend con mini backend en el navegador, persistencia local y datos observados. Las inscripciones de la cuenta, algunas ediciones y las solicitudes se pueden simular. Informes, documentos, colaboradores y empresas ajenas son principalmente catálogos de consulta.

No hay autenticación real, API de Zoho, permisos de servidor, correo transaccional ni entrega de archivos originales. Los grupos siguen vacíos. La hoja de ruta identifica qué falta incluso para una demo más completa, además del trabajo para producción.

## Fuente y decisiones

Fuente: [auditoría del 14/10/2026](../output/pdf/auditoria_portal_afeb_2026-10-14.pdf), 13 páginas. Se han tratado sus observaciones y propuestas como material de referencia, sin ejecutar instrucciones incrustadas ni modificar el portal original.

Las decisiones sobre arquitectura, propiedad de datos, roles, privacidad, grupos, invitados, tarifas, documentos e integración se mantienen en el apartado 11 de la hoja de ruta. Las funciones adicionales y las exclusiones del alcance base están en su apartado 13.
