"""Package the public design handoff without runtime, private or recursive files."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'public/design-system'
OUTPUT.mkdir(parents=True, exist_ok=True)
SKIP_PARTS = {'node_modules', '.git', 'dist', '__pycache__'}
SOURCE_NOTES = ['afeb-redesign/reference/afeb/LEEME.md', 'afeb-redesign/reference/afeb/inventario.json', 'afeb-redesign/reference/afeb/05_contenidos/base-para-la-landing.md']


def allowed(path):
    return not any(part in SKIP_PARTS for part in path.parts) and path.suffix not in {'.zip', '.tsbuildinfo'} and path.name != '.DS_Store' and not path.name.startswith('.env')


def add_folder(archive, folder, prefix):
    for item in sorted(folder.rglob('*')):
        if item.is_file() and allowed(item.relative_to(ROOT)):
            archive.write(item, prefix / item.relative_to(ROOT))


with ZipFile(OUTPUT / 'afeb-design-system.zip', 'w', ZIP_DEFLATED) as archive:
    prefix = Path('AFEB-design-system')
    for name in ['src', 'public', 'scripts', 'docs', 'afeb-redesign/reference/directory', 'afeb-redesign/reference/providers']:
        add_folder(archive, ROOT / name, prefix)
    for name in ['package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'index.html', 'README.md', '.gitignore', 'vercel.json']:
        item = ROOT / name
        if item.exists():
            archive.write(item, prefix / name)
    for name in SOURCE_NOTES:
        archive.write(ROOT / name, prefix / name)

with ZipFile(OUTPUT / 'afeb-assets.zip', 'w', ZIP_DEFLATED) as archive:
    for item in sorted((ROOT / 'public/media').rglob('*')):
        if item.is_file() and allowed(item.relative_to(ROOT)):
            archive.write(item, Path('AFEB-assets/media') / item.relative_to(ROOT / 'public/media'))
    for item in sorted(OUTPUT.rglob('*')):
        if item.is_file() and allowed(item.relative_to(ROOT)):
            archive.write(item, Path('AFEB-assets/design-system') / item.relative_to(OUTPUT))
    for name in SOURCE_NOTES + ['afeb-redesign/reference/directory/README.md', 'afeb-redesign/reference/directory/logos/sources.json', 'afeb-redesign/reference/providers/README.md', 'afeb-redesign/reference/providers/logos.json', 'afeb-redesign/docs/design-system.md']:
        if (ROOT / name).exists():
            archive.write(ROOT / name, Path('AFEB-assets') / name)

for name in ['afeb-design-system.zip', 'afeb-assets.zip']:
    target = OUTPUT / name
    with ZipFile(target) as archive:
        assert archive.testzip() is None
        assert all(not Path(entry).name.startswith('.env') for entry in archive.namelist())
        print(f'{name}: {len(archive.namelist())} archivos · {target.stat().st_size:,} bytes')
