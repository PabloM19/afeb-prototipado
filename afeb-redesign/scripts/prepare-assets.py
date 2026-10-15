"""Genera medios optimizados a partir del pack intacto de reference/afeb."""
from pathlib import Path
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'reference' / 'afeb'
OUTPUT = ROOT / 'public' / 'media'
OUTPUT.mkdir(parents=True, exist_ok=True)
manifest = []

def save(source, name, size=None, crop=False):
    im = Image.open(SOURCE / source)
    if crop:
        im = ImageOps.fit(im, size, method=Image.Resampling.LANCZOS, centering=(.95, .5))
    elif size:
        im.thumbnail(size, Image.Resampling.LANCZOS)
    if name.endswith('.webp'):
        im.convert('RGB').save(OUTPUT / name, 'WEBP', quality=88, method=6)
    else:
        # Quitar solo el espacio transparente, conservando toda la composición.
        if im.mode == 'RGBA':
            im = im.crop(im.getchannel('A').getbbox())
        im.save(OUTPUT / name, optimize=True)
    manifest.append({'original': source, 'output': 'media/' + name, 'size': im.size, 'bytes': (OUTPUT / name).stat().st_size})

save('01_logotipos/afeb-transparente.png', 'afeb-logo.png')
save('01_logotipos/club-export.png', 'club-export.png')
save('02_fotografias/herramientas-alternativa.jpg', 'hero-tools.webp', (1080, 1440), crop=True)
for source, name in [
    ('foro-verano-2025.jpeg', 'foro-verano.webp'),
    ('foro-invierno-2025.jpeg', 'foro-invierno.webp'),
    ('grupo-de-trabajo-01.jpeg', 'grupo-trabajo.webp'),
    ('encuentro-bauhaus-2025.jpeg', 'bauhaus.webp'),
    ('coloquio-club-export-2025.jpeg', 'club-coloquio.webp'),
]:
    save('02_fotografias/' + source, name)
for source, name in [
    ('bosch.png', 'bosch.webp'), ('bellota.jpg', 'bellota.webp'),
    ('rubi.jpg', 'rubi.webp'), ('compo.png', 'compo.webp'),
    ('wd40.gif', 'wd40.webp'), ('stanley-black-decker.png', 'black-decker.webp'),
]:
    save('03_socios/' + source, name)
(OUTPUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
print(json.dumps({'images': len(manifest), 'total_KB': round(sum(x['bytes'] for x in manifest) / 1024, 1)}, indent=2))
