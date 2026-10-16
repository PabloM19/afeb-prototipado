# Imágenes verificadas de la demo

Recogidas el 16/10/2026. Rama: `codex/afeb-imagenes-demo`.

Las imágenes se sirven desde `public/media/demo/`; el logo de AFEB reutiliza el recurso existente. Los originales se han reducido a WebP, sin retoques de identidad. El registro `src/data/entity-media.json` conserva ID, nombre, página de origen, URL original, dimensiones y SHA-256. No contiene credenciales ni enlaces firmados.

## Cobertura

- 8 fotos: equipo AFEB publicado en la portada pública del portal.
- 8 logos de empresas asociadas: directorio público oficial de AFEB.
- Logo AFEB ya existente.
- 3 logos comerciales: Ceys, Ceys Agua Stop y Paso Profesional. Las dos filas observadas de Paso reutilizan el mismo recurso.

## Recursos

| Tipo      | Registro                                                          | Fuente                                                                      |
| --------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| people    | Marta Omedes (`afeb-marta-omedes`)                                | [Fuente](https://portal.brico-afeb.com/)                                    |
| people    | Maria Soler (`afeb-maria-soler`)                                  | [Fuente](https://portal.brico-afeb.com/)                                    |
| people    | Jordi Albaladejo (`afeb-jordi-albaladejo`)                        | [Fuente](https://portal.brico-afeb.com/)                                    |
| people    | Marta Viñas (`afeb-marta-vinas`)                                  | [Fuente](https://portal.brico-afeb.com/)                                    |
| people    | Susana Velasco (`afeb-susana-velasco`)                            | [Fuente](https://portal.brico-afeb.com/)                                    |
| people    | Mari Carmen Vilchez (`afeb-mari-carmen-vilchez`)                  | [Fuente](https://portal.brico-afeb.com/)                                    |
| people    | Pedro Palay (`afeb-pedro-palay`)                                  | [Fuente](https://portal.brico-afeb.com/)                                    |
| people    | Alejandro Casero (`afeb-alejandro-casero`)                        | [Fuente](https://portal.brico-afeb.com/)                                    |
| companies | 3M ESPAÑA, S.L. (`recR9s8Enais4SXet`)                             | [Fuente](https://brico-afeb.com/empresas-asociadas/)                        |
| companies | AC MARCA ADHESIVES S.L. (`recGhfV9L4RCctCrd`)                     | [Fuente](https://brico-afeb.com/empresas-asociadas/)                        |
| companies | AGHASA TURIS, S.A (`recgE6o65hAJLAd1m`)                           | [Fuente](https://brico-afeb.com/empresas-asociadas/)                        |
| companies | AKZO NOBEL COATINGS, S.L. (`recjCrzA5r95OP3dQ`)                   | [Fuente](https://brico-afeb.com/empresas-asociadas/)                        |
| companies | ALBERO FORTE COMOPOSITE, SLU (PLASTICFORTE) (`rec8asC1RCdSB1HVy`) | [Fuente](https://brico-afeb.com/empresas-asociadas/)                        |
| companies | ALTADEX, S.A.U. (`recl1DURKbROcnxKX`)                             | [Fuente](https://brico-afeb.com/empresas-asociadas/)                        |
| companies | ALTUNA HERMANOS, SA (`rec7Mwiadmmppzvdn`)                         | [Fuente](https://brico-afeb.com/empresas-asociadas/)                        |
| companies | ALYCO TOOLS, S.A (`recBws9SAiiKadF7m`)                            | [Fuente](https://brico-afeb.com/empresas-asociadas/)                        |
| companies | AFEB (`reciubrH8X2ccL2yw`)                                        | [Fuente](https://brico-afeb.com/)                                           |
| brands    | Ceys (`recGhfV9L4RCctCrd-brand-1`)                                | [Fuente](https://mundoceys.com/)                                            |
| brands    | Ceys Agua Stop (`recGhfV9L4RCctCrd-brand-2`)                      | [Fuente](https://www.profesional.mundoceys.com/impermeabilizantes-aguastop) |
| brands    | Paso Profesional (`recGhfV9L4RCctCrd-brand-3`)                    | [Fuente](https://pasoprofesional.com/)                                      |
| brands    | Paso Profesional (`recGhfV9L4RCctCrd-brand-4`)                    | [Fuente](https://pasoprofesional.com/)                                      |

## Pendientes

No se han obtenido fotos verificadas de los otros diez contactos (Eloy y los contactos de 3M y AC MARCA), ni de los 24 registros de participación. Los participantes no tienen un vínculo personal observado en la muestra: no se enlazan por coincidencias de nombre. Command conserva las iniciales; la web oficial no respondió a la descarga.

El navegador automatizado estaba desactivado en Work. Se han consultado únicamente páginas y recursos públicos por HTTP, sin entrar ni modificar la plataforma privada. La revisión visual en navegador queda pendiente.

## Integración y comprobaciones

- Directorio y fichas de personas, equipo de empresa y contacto de ayuda: fotos vinculadas por ID.
- Empresas asociadas, fichas y comunidad del dashboard: logos vinculados por ID.
- Pestaña Marcas: logos comerciales vinculados por ID de la marca observada. Las marcas locales nuevas conservan iniciales.
- Imágenes decorativas junto al nombre visible; se mantienen las medidas y el recorte de avatar. Si una imagen falla, aparecen las iniciales.
- Compilación, integridad del mock y flujos de fase 1: correctos.
- Validada la correspondencia de IDs/nombres, existencia y decodificación de archivos, hashes y fuentes.
- Renderizado de componentes comprobado: imagen para ID observado; iniciales para ID nuevo incluso cuando coinciden las iniciales.

Para revisar: `/portal`, `/socios`, `/directorio` (buscar «Marta»), `/detalles-equipo?id=afeb-marta-omedes`, `/detalles-socio?id=recGhfV9L4RCctCrd` → Marcas y «Contactar con AFEB».

El directorio prioriza los contactos con foto verificada; conserva el orden relativo dentro de cada grupo y sigue aplicando la búsqueda y el filtro de departamento. La búsqueda ocupa todo el ancho disponible junto al filtro y se apila en móvil.

Trabajo en `codex/afeb-imagenes-demo`; no se ha fusionado ni desplegado en `main`.
