# AFEB · sistema de diseño de la propuesta web

**Proyecto unificado:** el código activo está en `src/website/` desde la raíz, los recursos en `public/` y los comandos `design:assets`/`design:package` se ejecutan también en la raíz. Las rutas de archivos siguientes documentan la estructura original previa a la integración. No arrancar ni desplegar esta carpeta como otra aplicación.

La referencia visual e interactiva está en `/sistema-de-diseno`. Reúne el lenguaje de la home y de los directorios, sin modificar sus estilos. No es un manual de marca corporativo certificado.

## Arranque

Requisitos: Node 20.19+ o 22.12+ compatible con Vite 7. Para regenerar los ZIP se utiliza Python 3 (biblioteca estándar).

```sh
npm install
npm run dev
# http://127.0.0.1:5180/sistema-de-diseno
npm run build
```

La guía se carga mediante una ruta lazy. Tiene navegación propia. La cabecera, el pie y las páginas de la web permanecen en `WebsiteLayout`. No hay backend ni formularios que envíen información en las demos.

## Fuentes de verdad

| Recurso | Archivo |
| --- | --- |
| Tokens y estilos de home | `src/styles.css` |
| Interiores y directorio | `src/directory.css` |
| Proveedores | `src/providers.css` |
| Acciones y rótulos originales | `src/components/ui.tsx` |
| Tarjetas y navegación interior | `src/components/directory.tsx` |
| Tarjetas de proveedores | `src/components/providers.tsx` |
| Componentes nuevos | `src/components/system/` |
| Guía visual y demos | `src/pages/DesignSystemPage.tsx`, `src/pages/design-system/` |
| Recursos de interfaz | `public/media/` |
| Tokens extraídos, fuente e iconos | `public/design-system/` |

`src/data/designTokens.generated.json` y `designAssets.generated.json` se generan a partir del proyecto. No editarlos directamente. Ejecutar `npm run design:assets` después de cambiar los tokens, las fuentes o el catálogo de imágenes. `tokens.css` contiene las 20 variables base extraídas; las reglas responsive siguen en `src/styles.css`. `tokens.json` añade las decisiones de interfaz y las extensiones semánticas para otros formatos de implementación.

## En uso y extensiones

La página identifica como **En uso** los fundamentos y componentes de la web: acciones, títulos, rótulos, colores, tarjetas, migas, inputs de búsqueda, logos y patrones editoriales.

Las **Extensiones** mantienen la misma base y añaden componentes para futuras pantallas: botones con carga y desactivados, variantes de tamaño, chips seleccionables, tabs, campos, checkbox/radio, switch, tabla paginada, alertas, pasos, skeleton, toast, ayuda contextual, acordeón y diálogo. Son utilizables desde el código; las demos y las clases `ds-*` sirven a la guía, no a las páginas de producto.

## Componentes

```tsx
import { Button, TextField, Tabs, Dialog, Badge, Chip, Alert } from './components/system'

<Button variant="outline" onClick={openDetail}>Ver detalle</Button>
<Button type="submit" loading={pending}>Continuar</Button>
<TextField label="Correo electrónico" type="email" value={email}
  onChange={event => setEmail(event.target.value)}
  required error={errors.email} hint="Correo de empresa." />

<Tabs label="Ficha del proveedor" value={tab} onChange={setTab}
  items={[{ id: 'info', label: 'Información', content: <p>Contenido</p> }]} />

<Dialog open={open} onClose={() => setOpen(false)} title="Continuar"
  footer={<Button onClick={confirm}>Confirmar</Button>}>
  <p>Contenido breve para una decisión concreta.</p>
</Dialog>
```

- `Button`: `variant` dark/lime/outline/text/danger, `size` sm/md/lg, `loading`, propiedades nativas de botón. Para enlaces usar `Action`, `InternalAction`, `ExternalAction` o `Link`.
- `Badge`: etiqueta informativa, con tonos neutral/brand/dark/success/info/warning/danger.
- `Chip`: botón de filtro con `active` y `aria-pressed`. Estado controlado por la pantalla.
- `TextField`, `SelectField`, `TextAreaField`: label, hint, error, required y atributos nativos; IDs estables con `useId`.
- `Switch`: label, checked, onChange y disabled; botón con role switch.
- `Tabs`: value/onChange/items; flechas, Home y End; una sola pestaña en el orden de tabulación.
- `Accordion`: details/summary nativos; no limita la apertura a un panel.
- `Alert`: semántica de nota por defecto. `announce` activa status/alert en cambios dinámicos.
- `Dialog`: elemento dialog nativo, showModal, foco contenido, Escape y restauración del foco al cerrar. Bloquea el scroll del fondo.

Los toast, la tabla de demostración, el selector de rejilla y las pruebas de fuente se encuentran en `demos.tsx`; no se presentan como integración de producto.

## Criterios visuales

- Manrope Variable, servida localmente. Pesos principales 400 (lectura), 500–550 (subtítulos), 600 (títulos), 650 (hero y acciones), 700 (rótulos).
- Lectura 16 px/1.7; acciones 14 px; rótulos 12 px. Títulos con tracking negativo y tamaños fluidos. La escala base del hero es 50–76 px; dispone de ajustes de 36–66 px en tamaños compactos.
- Bosque para las acciones y superficies destacadas; tinta para texto; papel para el fondo; cálido para alternar secciones. Lima y verde AFEB son acentos. Evitar texto blanco sobre verde AFEB.
- Borde de 1 px, radio de 3 px; las tarjetas no tienen sombras. La sombra aparece únicamente en capas temporales nuevas.
- Contenedor máximo 1280 px. Espacio de sección 96/76/60 px. Márgenes de base fluidos 24–88 px, con ajustes responsive a 32/24/20 px.
- Directorio: 3 columnas desde 1101 px, 2 entre 601 y 1100, 1 hasta 600. El directorio de proveedores usa 2 columnas amplias.
- Foco visible de 3 px con 5 px de separación. Los campos nuevos usan 2 px con separación de 2 px. No retirar foco sin sustitución visible.
- Transiciones de 200 ms; fotografía 500 ms con escala contenida. Respetar prefers-reduced-motion.

El contraste se calcula a partir de los colores planos: mínimo 4.5:1 para texto normal y 3:1 para texto grande, según [WCAG 2.2, criterio 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). La guía no constituye una auditoría completa de accesibilidad.

## Recursos y licencias

`npm run design:assets` copia Manrope y su licencia OFL desde la dependencia instalada y genera 24 SVG desde Lucide con su licencia. Los SVG descargables usan trazo tinta fijo; los componentes Lucide usan currentColor para adaptarse al contexto. Fotografías y marcas se reutilizan a partir de los recursos públicos documentados por AFEB; consultar las fuentes antes de reutilizar fuera de este proyecto. No se atribuye a AFEB la autoría de las marcas de terceros.

- `reference/afeb/`: pack y procedencia iniciales.
- `reference/directory/`: empresas, logos y fuentes.
- `reference/providers/`: proveedores, contactos y fuentes.
- La fotografía de herramientas se recorta con object-fit cover. Logos: object-fit contain, sin recolorear ni estirar.
- Las imágenes de encuentros están identificadas como 2025; no se atribuyen a actividades de 2026.

## Entrega y regeneración

```sh
npm run design:assets
npm run design:package
npm run build
```

El kit completo incluye `src/`, configuración, scripts, documentación y recursos, sin node_modules, credenciales, archivos de entorno ni los propios ZIP. El ZIP de assets incluye imágenes de interfaz, tokens, fuentes, iconos y referencias de procedencia. Ninguno publica el proyecto. Para servir rutas directas en un hosting futuro, redirigir rutas de la app a `index.html`.

Los ZIP contienen las versiones optimizadas de `public/media/` y el inventario de procedencia del pack inicial. Los originales de fotografía en alta resolución y la memoria PDF permanecen en el proyecto de trabajo, dentro de `reference/afeb/`; no se duplican en esta entrega ligera. `design:assets` regenera el catálogo usando las imágenes incluidas. El script histórico `prepare-assets.py` requiere esos originales si se desea volver a optimizarlos.
