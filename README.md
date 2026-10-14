# AFEB · Portal del socio

Primer borrador de rediseño en **React + TypeScript + Vite**, con **shadcn/ui, Radix UI, Tailwind CSS 4, Lucide e Inter Variable**. Diseño minimalista en blanco, negro y gris. Implementación local basada en la auditoría del 14 de octubre de 2026.

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
npm run format       # Formato del código y documentos
npm run format:check
npm run preview      # Previsualizar dist después del build
```

## Qué puedes recorrer

Inicio, actividades y sus variantes, inscripción y cancelación, invitaciones, empresas asociadas, directorio, fichas, mi empresa, marcas, equipo, perfil y comunicaciones, informes e históricos, documentos, normativa y asesoría, colaboradores, grupos, cobranding, licitaciones, acceso y recuperación. `/publicaciones` redirige a `/informes` para corregir el enlace roto documentado.

El menú de usuario (abajo a la izquierda; dentro del menú en móvil) cambia entre **Socio, SocioAdmin y Gestor AFEB**. Gestor AFEB muestra `/gestion`, donde puedes crear, editar y publicar actividades de ejemplo y consultar solicitudes locales. El selector permite evaluar el diseño por perfil; **no es autorización real**.

Las acciones de demostración persisten en `localStorage` con prefijo `afeb:`. No se envían correos, no hay pagos, no se suben archivos y no se realizan solicitudes a la plataforma actual ni a Zoho. Las descargas son TXT explícitamente identificados como ejemplos; el calendario genera un ICS para una actividad ficticia. Usa datos ficticios en los formularios.

Para reiniciar la demo, abre el menú de usuario y selecciona **Restablecer demo**. Elimina únicamente las claves `afeb:` en el almacenamiento local de este origen. No hay credenciales del portal real en el código.

## Estructura

- `src/components/ui`: componentes de shadcn editables y versionados en el repositorio.
- `src/components/layout`: estructura, navegación, búsqueda global, ayuda y notificaciones.
- `src/components/shared.tsx`: cabeceras, filtros, estados, filas, formularios y diálogos reutilizables.
- `src/features`: pantallas agrupadas por dominio funcional.
- `src/data/fixtures.ts`: entidades y contenido ficticio, categorías y utilidades de fecha.
- `src/lib/store.tsx`: estado de la demostración. Sustituir por servicios al implementar backend.
- `src/index.css`: tokens neutros, composición, adaptabilidad y estados.
- `docs`: mapa de la auditoría, decisiones, continuidad en Cursor y evidencias visuales.

## Para continuar

Lee primero [el mapa funcional](docs/ALCANCE.md), [la arquitectura](docs/ARQUITECTURA.md) y [el documento de continuidad para Cursor](docs/CURSOR.md). [Verificación](docs/VERIFICACION.md) detalla lo comprobado y las limitaciones.

Esto es una base visual e interactiva de frontend. Autenticación, permisos por recurso/empresa, backend, Zoho, correo transaccional, almacenamiento privado y gestión editorial completa están pendientes. No desplegar como portal real sin implementarlos.
