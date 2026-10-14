# AFEB · Portal del socio

Primer borrador de rediseño en **React + TypeScript + Vite**, con **shadcn/ui, Radix UI, Tailwind CSS 4, Lucide e Inter Variable**. Esta rama incluye una variante con la identidad AFEB: logotipo completo, verdes corporativos propuestos y la misma tipografía Inter de `main`. Implementación local basada en la auditoría del 14 de octubre de 2026.

La versión neutra está guardada en `main`. La variante de marca está en `codex/afeb-brand`. Consulta [la aplicación de marca y la comparación](docs/MARCA_AFEB.md).

## Arranque

Requiere Node.js 22.12+ (o una versión compatible con Vite 7).

```bash
npm install
npm run dev
```

Abre http://localhost:5173. Si ese puerto está ocupado, utiliza la dirección que imprima Vite.

```bash
npm run build        # Comprobación TypeScript y build
npm run check        # Comprobación TypeScript
npm run mock:check   # Integridad de la base observada
npm run mock:flows   # Flujos del mini backend local
npm run format       # Formato del código y documentos
npm run format:check
npm run preview      # Previsualizar dist después del build
```

## Preparar una demo

Abre **Centro de demos** en la navegación o visita `/demo`. Puedes cargar recorridos, consultar los datos que se ven en el front, cambiar de rol y gestionar solicitudes locales. Los cambios persisten y se sincronizan entre pestañas del mismo navegador. Ver [guía de presentación y mini backend](docs/DEMO.md).

## Qué puedes recorrer

Inicio, actividades y sus variantes, inscripción y cancelación, invitaciones, empresas asociadas, directorio, fichas, mi empresa, marcas, equipo, perfil y comunicaciones, informes e históricos, documentos, normativa y asesoría, colaboradores, grupos, cobranding, licitaciones, acceso y recuperación. `/publicaciones` redirige a `/informes` para corregir el enlace roto documentado.

El menú de usuario (abajo a la izquierda; dentro del menú en móvil) cambia entre **Socio, SocioAdmin y Gestor AFEB**. Gestor AFEB muestra `/gestion`, donde puedes crear, editar y publicar actividades de ejemplo y consultar solicitudes locales. El selector permite evaluar el diseño por perfil; **no es autorización real**.

La mini base común está en **`src/data/mock-db.json`**: registros observados en AFEB el 14/10/2026, con procedencia y campos desconocidos a `null`. Las pantallas y el buscador leen sus adaptadores. Consulta [datos, relaciones y escenarios](docs/DATOS_MOCK.md).

Las simulaciones persisten bajo `afeb:mock:<datasetId>:`. No envían correos ni modifican el portal. Las descargas crean fichas TXT de nombres observados; no contienen los documentos originales. El calendario no se genera sin archivo o zona verificada.

Para reiniciar, selecciona **Restablecer demo** en el menú de usuario: borra únicamente los cambios de la versión activa y recupera la base observada. No hay credenciales del portal en el código.

## Estructura

- `src/components/ui`: componentes de shadcn editables y versionados en el repositorio.
- `src/components/layout`: estructura, navegación, ayuda y notificaciones.
- `src/components/global-search.tsx` y `src/lib/search.ts`: búsqueda general agrupada por áreas. Ver [funcionamiento y continuidad](docs/BUSQUEDA_GLOBAL.md).
- `src/components/shared.tsx`: cabeceras, filtros, estados, filas, formularios y diálogos reutilizables.
- `src/features`: pantallas agrupadas por dominio funcional.
- `src/data/mock-db.json`: única base de registros observados, relaciones, procedencia y escenarios.
- `src/data/mock-db.ts`: base inmutable y utilidades.
- `src/data/fixtures.ts`: adaptadores de la base y utilidades de presentación.
- `src/lib/mock-backend.ts`: repositorio persistente y comandos del mini backend local.
- `src/lib/store.tsx`: suscripción de React y sincronización entre pestañas.
- `src/features/demo.tsx`: centro de control de presentaciones y datos.
- `src/index.css`: tokens neutros, composición, adaptabilidad y estados.
- `src/styles/afeb-brand.css`: capa de marca aplicada sobre la base funcional.
- `src/styles/global-search.css`: barra alargada y diálogo de búsqueda adaptables.
- `src/components/brand-mark.tsx` y `public/brand`: logotipo original y su presentación.
- `docs`: mapa de la auditoría, decisiones, continuidad en Cursor y evidencias visuales.

## Para continuar

Lee primero [el mapa funcional](docs/ALCANCE.md), [la arquitectura](docs/ARQUITECTURA.md) y [el documento de continuidad para Cursor](docs/CURSOR.md). [Verificación](docs/VERIFICACION.md) detalla lo comprobado y las limitaciones.

Esto es una base visual e interactiva de frontend. Autenticación, permisos por recurso/empresa, backend, Zoho, correo transaccional, almacenamiento privado y gestión editorial completa están pendientes. No desplegar como portal real sin implementarlos.
