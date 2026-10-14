# Variante de identidad AFEB

Rama: `codex/afeb-brand`. La versión neutra está guardada en `main`, commit `b7c3752`.

La variante usa el análisis visual aportado por el usuario como referencia, no como manual corporativo certificado. Se ha contrastado el logotipo con los activos publicados por [AFEB](https://brico-afeb.com/) y la [Memoria 2025](https://brico-afeb.com/wp-content/uploads/2026/03/Memoria_AFEB_2025_12-pags_def.pdf).

## Sistema aplicado

| Elemento                      | Aplicación                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| Verde luminoso `#80C342`      | Acentos, indicador de marca y CTA sobre verde profundo; texto oscuro sobre el relleno |
| Verde institucional `#1E742E` | Botones principales, enlaces, pestañas activas, estados, foco y gráfico               |
| Verde profundo `#13452E`      | Actividad destacada, navegación activa, portadas de informe y titulares               |
| Superficie `#F4F6F2`          | Sidebar y bloques informativos suaves                                                 |
| Blanco y grises               | Fondo, tablas, formularios, tarjetas y texto de lectura                               |
| Barlow Condensed 600–700      | Titulares y cifras destacadas; alternativa propuesta, no fuente oficial verificada    |
| Inter Variable                | Lectura, navegación y controles; se conserva la escala de legibilidad de 14–16 px     |

Los HEX proceden del análisis y siguen siendo aproximados. El logo conserva el color de su archivo original, sin recolorearlo. Se incluye el tejado, las siglas y el descriptor completo en sidebar, menú móvil y pantallas de acceso.

## Archivos

- `src/styles/afeb-brand.css`: tokens y estilos de la variante, aislados de la composición base.
- `src/components/brand-mark.tsx`: presentación reutilizable del logo original.
- `public/brand/afeb-logo.png`: [activo original publicado por AFEB](https://brico-afeb.com/wp-content/uploads/2026/03/LOGO-AFEB-512px-FONS-TRANSPARENT.png).
- `src/features/dashboard.tsx`: gráfico vinculado a los tokens de marca.

## Comparación local

La sesión de comparación conserva una copia del build neutro en `tmp/neutral-dist` y la sirve en `http://127.0.0.1:5174`. La variante de esta rama se muestra en `http://127.0.0.1:5173`.

La copia temporal puede iniciarse con:

```bash
npm exec -- vite preview --host 127.0.0.1 --outDir tmp/neutral-dist --port 5174 --strictPort
```

Las ramas también pueden compararse con `git diff main...codex/afeb-brand`. Después de guardar los cambios, `git switch main` recupera el diseño neutro; `git switch codex/afeb-brand` vuelve a la variante. El servidor de desarrollo se actualiza al cambiar de rama.

La base funcional y los datos ficticios son los mismos en las dos variantes. La marca no cambia la lógica de formularios ni los permisos de demostración.

## Capturas y comprobación

- [Inicio neutro, 1440 × 1040](previews/brand/neutro-desktop.jpg).
- [Inicio AFEB, 1440 × 1040](previews/brand/inicio-desktop.jpg).
- [Acceso en escritorio](previews/brand/acceso-desktop.jpg) y [acceso móvil](previews/brand/acceso-mobile.jpg).
- [Inicio móvil](previews/brand/inicio-mobile.jpg), [menú móvil](previews/brand/menu-mobile.jpg) e [informes](previews/brand/informes-desktop.jpg).

Se revisaron las 25 rutas y variantes en 1440, 768, 390 y 320 px. No se observaron desbordamientos horizontales de página, imágenes rotas ni textos de contenido por debajo de 14 px. Se comprobaron además las vistas de gestión con rol Gestor AFEB. Los resultados están en `previews/brand/route-checks.json`.

Las combinaciones de texto revisadas —blanco sobre verde institucional, verde profundo sobre verde luminoso y texto secundario sobre superficie suave— superan 5,1:1. El verde luminoso se reserva para rellenos y detalles; los textos sobre fondo claro usan los tonos oscuros.
