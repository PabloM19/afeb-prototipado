import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  Files,
  Handshake,
  Layers,
  Scale,
  Search,
  Settings2,
  UsersRound,
  UserRound,
  X,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store'
import {
  createSearchIndex,
  findSearchResults,
  getSearchAreas,
  type SearchAreaId,
} from '@/lib/search'

const icons = {
  companies: Building2,
  activities: CalendarDays,
  people: UsersRound,
  reports: ChartNoAxesCombined,
  regulations: Scale,
  documents: Files,
  providers: Handshake,
  groups: Layers,
  account: UserRound,
  management: Settings2,
}

export function GlobalSearch() {
  const store = useStore()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [area, setArea] = useState<SearchAreaId | 'all'>('all')
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const shortcut = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K'
  const entries = useMemo(
    () => createSearchIndex(store),
    [store.activities, store.role, store.person, store.business],
  )
  const areas = getSearchAreas(store.role)
  const results = useMemo(() => findSearchResults(entries, query), [entries, query])
  const groups = areas.map((item) => ({
    ...item,
    results: results.filter((result) => result.area === item.id),
  }))
  const visibleGroups = groups.filter(
    (item) => item.results.length > 0 && (area === 'all' || item.id === area),
  )
  const visibleCount = visibleGroups.reduce((total, item) => total + item.results.length, 0)
  const hasQuery = Boolean(query.trim())

  function changeQuery(value: string) {
    setQuery(value)
    if (!value.trim()) setArea('all')
  }

  function changeOpen(next: boolean) {
    if (next) {
      setQuery('')
      setArea('all')
    }
    setOpen(next)
  }

  useEffect(() => {
    function handleShortcut(event: globalThis.KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k' &&
        !event.altKey &&
        !event.repeat
      ) {
        if (!open && document.querySelector('[role="dialog"]')) return
        event.preventDefault()
        if (open) setOpen(false)
        else {
          setQuery('')
          setArea('all')
          setOpen(true)
        }
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [open])

  function handleResultKeys(event: KeyboardEvent) {
    const links = Array.from(
      resultsRef.current?.querySelectorAll<HTMLAnchorElement>('[data-search-result]') ?? [],
    )
    const target = event.target
    if (target !== inputRef.current && !links.includes(target as HTMLAnchorElement)) return
    if (event.key === 'Enter' && target === inputRef.current && links.length) {
      event.preventDefault()
      links[0].click()
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!links.length) return
      event.preventDefault()
      const index = links.indexOf(target as HTMLAnchorElement)
      const next = event.key === 'ArrowDown' ? Math.min(index + 1, links.length - 1) : index - 1
      if (next < 0) inputRef.current?.focus()
      else links[next].focus()
    }
  }

  return (
    <>
      <button
        className="global-search-trigger"
        aria-label="Buscar en todo el portal"
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        onClick={() => changeOpen(true)}
      >
        <Search size={19} aria-hidden="true" />
        <span>Buscar en todo el portal…</span>
        <kbd aria-hidden="true">{shortcut}</kbd>
      </button>
      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogContent
          className="portal-search-dialog"
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            inputRef.current?.focus()
          }}
          onKeyDown={handleResultKeys}
        >
          <div className="portal-search-header">
            <DialogHeader>
              <DialogTitle>Buscar en el portal</DialogTitle>
              <DialogDescription>
                Empresas, actividades, recursos y contactos en un solo lugar.
              </DialogDescription>
            </DialogHeader>
            <div className="portal-search-input">
              <Search size={22} aria-hidden="true" />
              <Input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => changeQuery(event.target.value)}
                aria-label="Buscar en todo el portal"
                placeholder="Nombre, tema o palabra clave…"
                aria-describedby="portal-search-count"
                autoComplete="off"
              />
              {query && (
                <button
                  aria-label="Limpiar búsqueda"
                  onClick={() => {
                    changeQuery('')
                    inputRef.current?.focus()
                  }}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          {hasQuery && (
            <div
              className="portal-search-filters"
              role="group"
              aria-label="Filtrar resultados por área"
            >
              <button aria-pressed={area === 'all'} onClick={() => setArea('all')}>
                Todas <span>{results.length}</span>
              </button>
              {groups
                .filter((item) => item.results.length > 0 || item.id === area)
                .map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={area === item.id}
                    onClick={() => setArea(item.id)}
                  >
                    {item.label}
                    <span>{item.results.length}</span>
                  </button>
                ))}
            </div>
          )}
          <div className="portal-search-body" ref={resultsRef}>
            <p
              className="portal-search-count"
              id="portal-search-count"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {!hasQuery
                ? 'Explora por áreas o escribe para buscar'
                : `${visibleCount} ${visibleCount === 1 ? 'resultado' : 'resultados'}${area === 'all' ? ` en ${visibleGroups.length} ${visibleGroups.length === 1 ? 'área' : 'áreas'}` : ` en ${areas.find((item) => item.id === area)?.label}`}`}
            </p>
            {!hasQuery ? (
              <div className="portal-search-areas">
                {areas.map((item) => {
                  const Icon = icons[item.id]
                  return (
                    <Link key={item.id} to={item.path} onClick={() => setOpen(false)}>
                      <Icon size={20} aria-hidden="true" />
                      <div>
                        <strong>{item.label}</strong>
                        <span>{item.description}</span>
                      </div>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  )
                })}
              </div>
            ) : visibleCount ? (
              visibleGroups.map((group) => {
                const Icon = icons[group.id]
                return (
                  <section
                    className="portal-search-group"
                    key={group.id}
                    aria-labelledby={`search-area-${group.id}`}
                  >
                    <div className="portal-search-group-heading">
                      <h2 id={`search-area-${group.id}`}>
                        <Icon size={18} aria-hidden="true" />
                        {group.label}
                        <span>{group.results.length}</span>
                      </h2>
                      <Link to={group.path} onClick={() => setOpen(false)}>
                        Ver área <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                    <ul>
                      {group.results.map((item) => (
                        <li key={item.id}>
                          <Link to={item.path} data-search-result onClick={() => setOpen(false)}>
                            <div>
                              <strong>{item.title}</strong>
                              <span className="portal-search-meta">{item.meta}</span>
                              <p>{item.description}</p>
                            </div>
                            <ArrowUpRight size={18} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )
              })
            ) : (
              <div className="portal-search-empty">
                <Search size={28} aria-hidden="true" />
                <h2>No encontramos resultados</h2>
                <p>
                  Prueba con otro nombre o tema
                  {area !== 'all' && ', o amplía la búsqueda a todas las áreas'}.
                </p>
                {area !== 'all' && (
                  <button onClick={() => setArea('all')}>Buscar en todas las áreas</button>
                )}
              </div>
            )}
          </div>
          <div className="portal-search-footer">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> recorrer · <kbd>↵</kbd> abrir
            </span>
            <span>
              <kbd>Esc</kbd> cerrar
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
