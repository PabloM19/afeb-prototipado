import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as icons from 'lucide-react'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const output = path.join(root, 'public/design-system')
await fs.mkdir(path.join(output, 'fonts'), { recursive: true })
await fs.mkdir(path.join(output, 'icons'), { recursive: true })
const baseCss = await fs.readFile(path.join(root, 'src/website/styles.css'), 'utf8')
const rootBlock = baseCss.match(/:root\s*\{([\s\S]*?)\}/)[1]
const variables = Object.fromEntries(
  [...rootBlock.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
)
const colors = [
  ['forest', 'Bosque', 'Acciones principales y superficies de contraste.'],
  ['ink', 'Tinta', 'Texto principal y títulos.'],
  ['forest-deep', 'Bosque profundo', 'Texto sobre el acento lima.'],
  ['brand', 'Verde AFEB', 'Identidad, indicadores y pequeños acentos.'],
  ['lime', 'Lima', 'Acciones y énfasis sobre fondos oscuros.'],
  ['paper', 'Papel', 'Fondo principal de la web.'],
  ['warm', 'Neutro cálido', 'Secciones alternas y agrupaciones.'],
  ['white', 'Blanco', 'Tarjetas, campos y soportes de marca.'],
  ['muted', 'Texto secundario', 'Descripciones, ayudas y metadatos.'],
  ['line', 'Línea', 'Divisores y bordes sobre fondos claros.'],
].map(([name, label, usage]) => ({
  name,
  label,
  usage,
  token: `--${name}`,
  value: variables[`--${name}`],
}))
const tokens = {
  version: '1.0',
  scope: 'AFEB · propuesta de interfaz web',
  source: 'src/website/styles.css',
  variables,
  colors,
  interface: {
    radius: '3px',
    border: '1px solid var(--line)',
    controlHeight: '52–55px',
    focus: '3px solid #578312',
    focusOffset: '5px',
    transition: '200ms ease',
  },
  extensions: {
    note: 'Componentes de referencia; se integran cuando una pantalla los necesita.',
    success: '#153e30',
    info: '#31576b',
    warning: '#7c5b19',
    danger: '#9a3d32',
    spacingScale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
  },
  responsive: {
    navigation: '≤1240px',
    homeStack: '≤900px',
    directoryGrid: {
      desktop: '≥1101px: 3 columnas',
      tablet: '601–1100px: 2 columnas',
      mobile: '≤600px: 1 columna',
    },
    sectionSpacing: { desktop: '96px', tablet: '76px (≤900px)', mobile: '60px (≤600px)' },
  },
}
const json = JSON.stringify(tokens, null, 2) + '\n'
await fs.writeFile(path.join(output, 'tokens.json'), json)
await fs.writeFile(path.join(root, 'src/website/data/designTokens.generated.json'), json)
await fs.writeFile(
  path.join(output, 'tokens.css'),
  `/* Extraído de src/website/styles.css. Ejecutar npm run design:assets para regenerar. */\n:root {\n${Object.entries(
    variables,
  )
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')}\n}\n`,
)
for (const name of ['manrope-latin-wght-normal.woff2', 'manrope-latin-ext-wght-normal.woff2']) {
  await fs.copyFile(
    path.join(root, 'node_modules/@fontsource-variable/manrope/files', name),
    path.join(output, 'fonts', name),
  )
}
await fs.copyFile(
  path.join(root, 'node_modules/@fontsource-variable/manrope/LICENSE'),
  path.join(output, 'fonts/OFL.txt'),
)
await fs.copyFile(
  path.join(root, 'node_modules/lucide-react/LICENSE'),
  path.join(output, 'icons/LICENSE.txt'),
)
const iconNames = [
  'ArrowUpRight',
  'ArrowRight',
  'ArrowDown',
  'ArrowLeft',
  'Search',
  'Menu',
  'X',
  'ChevronDown',
  'ChevronRight',
  'Check',
  'Plus',
  'Minus',
  'Download',
  'Copy',
  'Mail',
  'Phone',
  'Globe2',
  'CalendarDays',
  'Users',
  'FileText',
  'Play',
  'Info',
  'CircleCheck',
  'TriangleAlert',
]
for (const name of iconNames) {
  await fs.writeFile(
    path.join(output, 'icons', `${name}.svg`),
    renderToStaticMarkup(
      React.createElement(icons[name], {
        size: 24,
        strokeWidth: 1.5,
        color: '#203c30',
        'aria-hidden': undefined,
      }),
    ),
  )
}
const media = []
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(target)
    else if (/\.(png|webp|svg|jpe?g)$/i.test(entry.name))
      media.push({
        path: '/' + path.relative(path.join(root, 'public'), target),
        bytes: (await fs.stat(target)).size,
      })
  }
}
await walk(path.join(root, 'public/media'))
await fs.writeFile(
  path.join(output, 'assets.json'),
  JSON.stringify({ media, icons: iconNames, font: 'Manrope Variable · OFL 1.1' }, null, 2) + '\n',
)
await fs.writeFile(
  path.join(root, 'src/website/data/designAssets.generated.json'),
  JSON.stringify({ media, icons: iconNames }, null, 2) + '\n',
)
console.log(
  `Sistema de diseño: ${colors.length} colores, ${Object.keys(variables).length} variables, ${media.length} imágenes, ${iconNames.length} iconos y Manrope.`,
)
