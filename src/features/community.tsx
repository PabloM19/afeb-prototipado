import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  UsersRound,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  PageHeading,
  SearchInput,
  FilterSelect,
  Avatar,
  CompanyLogo,
  EmptyState,
  BackLink,
  EditDialog,
  FormFields,
  DemoNotice,
  ActivityRow,
} from '@/components/shared'
import type { Field } from '@/components/shared'
import { companies, allCompanies, companyCategories, contacts } from '@/data/fixtures'
import { personImage } from '@/data/entity-media'
import { getDemoContacts, getDemoParticipations, getCompanyTeam } from '@/lib/mock-selectors'
import { ParticipationList } from '@/components/participation-list'
import { localAction } from '@/lib/local-action'
import type { Role } from '@/data/fixtures'
import { useStore } from '@/lib/store'
import { mockDb, displayValue, initialsFor } from '@/data/mock-db'
const personFields: Field[] = [
  { name: 'name', label: 'Nombre y apellidos', required: true },
  { name: 'position', label: 'Cargo', required: true },
  {
    name: 'level',
    label: 'Nivel de dirección',
  },
  {
    name: 'department',
    label: 'Departamento',
  },
  { name: 'phone', label: 'Teléfono', type: 'tel' },
  { name: 'phone2', label: 'Segundo teléfono', type: 'tel' },
  { name: 'linkedin', label: 'LinkedIn', type: 'url' },
]
const businessFields: Field[] = [
  { name: 'name', label: 'Razón social / nombre comercial', required: true },
  { name: 'tax', label: 'CIF / NIF', required: true },
  { name: 'address', label: 'Domicilio social', required: true, wide: true },
  { name: 'city', label: 'Localidad', required: true },
  { name: 'country', label: 'País', required: true },
  { name: 'email', label: 'Contacto general', type: 'email', required: true },
  { name: 'phone', label: 'Teléfono', type: 'tel' },
  { name: 'website', label: 'Web', type: 'url' },
  { name: 'category', label: 'Categoría', options: companyCategories.slice(1) },
  {
    name: 'employees',
    label: 'Empleados',
  },
  {
    name: 'revenue',
    label: 'Facturación total',
  },
  {
    name: 'market',
    label: 'Mercado',
  },
  { name: 'export', label: 'Exportación', options: ['Sí', 'No'] },
]
export function Companies() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const { role } = useStore()
  const items = companies.filter(
    (c) =>
      (category === 'Todas' || category === c.category) &&
      `${c.name} ${c.location}`.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <>
      <PageHeading
        title="Empresas asociadas"
        description="Encuentra nuevos contactos, comparte experiencias y abre oportunidades."
        action={
          <Button variant="outline" asChild>
            <Link to="/detalles-de-mi-empresa">
              <Building2 size={16} />
              Mi empresa
            </Link>
          </Button>
        }
      />
      <div className="directory-intro">
        <UsersRound size={22} />
        <p>Distintas especialidades. Una misma visión.</p>
        <span>{companies.length} empresas recogidas</span>
      </div>
      <div className="filter-bar">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar empresa o localidad…"
        />
        <FilterSelect value={category} onChange={setCategory} options={companyCategories} />
      </div>
      <div className="company-grid">
        {items.map((company) => (
          <Link key={company.id} className="company-card" to={`/detalles-socio?id=${company.id}`}>
            <div className="company-card-top">
              <CompanyLogo companyId={company.id} initials={company.initials} size="large" />
              <ArrowUpRight size={19} />
            </div>
            <span className="small-label">{company.category}</span>
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            <div className="company-card-footer">
              <span>
                <MapPin size={14} />
                {displayValue(company.location)}
              </span>
              <span>
                {company.members
                  ? `${company.members} contactos en la muestra`
                  : 'Contactos no recogidos'}
              </span>
            </div>
            {role === 'Gestor AFEB' && (
              <span className="admin-tag">Socio AFEB · Fuente verificada</span>
            )}
          </Link>
        ))}
      </div>
      {items.length === 0 && <EmptyState />}
    </>
  )
}
export function Directory() {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('Todos los departamentos')
  const store = useStore()
  const { role } = store
  const directoryContacts = getDemoContacts(store)
  const items = directoryContacts
    .filter(
      (p) =>
        (department === 'Todos los departamentos' || department === p.department) &&
        `${p.name} ${p.company} ${p.position}`.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => Number(Boolean(personImage(b.id))) - Number(Boolean(personImage(a.id))))
  return (
    <>
      <PageHeading eyebrow="Las personas detrás de las empresas" title="Directorio" />
      <div className="filter-bar directory-filters">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar persona, empresa o cargo…"
        />
        <FilterSelect
          label="Departamento"
          value={department}
          onChange={setDepartment}
          options={[
            'Todos los departamentos',
            ...new Set(directoryContacts.map((p) => p.department).filter(Boolean)),
          ]}
        />
      </div>
      <div className="contacts-grid">
        {items.map((p) => (
          <article className="person-card" key={p.id}>
            <div className="person-card-top">
              <Avatar personId={p.id} initials={p.initials} />
              <span className="small-label">{p.department}</span>
            </div>
            <h2>{p.name}</h2>
            <p>{p.position}</p>
            <strong className="person-company">{p.company}</strong>
            {p.email && (
              <a className="contact-email" href={`mailto:${p.email}`}>
                <Mail size={15} />
                {p.email}
              </a>
            )}
            <div className="person-card-footer">
              <Link className="text-link" to={`/detalles-equipo?id=${p.id}`}>
                Ver contacto
                <ArrowUpRight size={16} />
              </Link>
            </div>
            {role === 'Gestor AFEB' && (
              <p className="form-hint">
                La gestión de visibilidad se implementará con permisos de servidor.
              </p>
            )}
          </article>
        ))}
      </div>
      {items.length === 0 && <EmptyState />}
      <DemoNotice>
        Datos observados y personas introducidas en la simulación. No es el directorio completo; los
        campos desconocidos permanecen sin verificar.
      </DemoNotice>
    </>
  )
}
export function ContactDetail() {
  const [params] = useSearchParams()
  const store = useStore()
  const person = params.get('participation')
    ? getDemoParticipations(store).find((p) => p.id === params.get('participation'))
    : getDemoContacts(store).find((p) => p.id === params.get('id'))
  if (!person) return <EmptyState title="Contacto no encontrado" />
  const positionInDetails =
    !params.get('participation') &&
    getDemoContacts(store).some(
      (contact) => contact.id === person.id && contact.position === person.position,
    )
  return (
    <>
      <BackLink to="/directorio" label="Volver al directorio" />
      <div className="contact-detail">
        <Avatar
          personId={'personId' in person ? person.personId : person.id}
          initials={person.initials}
          size="large"
        />
        <PageHeading
          title={person.name}
          description={positionInDetails ? undefined : person.position}
        />
        <dl className="data-grid">
          <div>
            <dt>Departamento</dt>
            <dd>{displayValue(person.department)}</dd>
          </div>
          <div>
            <dt>Empresa</dt>
            <dd>{person.company}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              {person.email ? (
                <a href={`mailto:${person.email}`}>{person.email}</a>
              ) : (
                displayValue(person.email)
              )}
            </dd>
          </div>
          <div>
            <dt>Visibilidad</dt>
            <dd>Permisos pendientes de validar</dd>
          </div>
        </dl>
        {!params.get('participation') && (
          <>
            <dl className="data-grid">
              {getDemoContacts(store)
                .filter((p) => p.id === person.id)
                .flatMap((p) => [
                  ['Cargo', p.position],
                  ['Nivel', p.level],
                  ['Teléfono', p.phone],
                  ['Segundo teléfono', p.phone2],
                  ['LinkedIn', p.linkedin],
                  ['Rol real observado', p.sourceRole],
                  ['Rol de simulación', p.simulationRole],
                ])
                .map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{displayValue(v)}</dd>
                  </div>
                ))}
            </dl>
            <ParticipationList personId={person.id} />
          </>
        )}
        <DemoNotice>
          La ficha utiliza los campos observados. Una inscripción no se vincula a una persona del
          CRM sin un identificador verificado.
        </DemoNotice>
      </div>
    </>
  )
}
export function Profile() {
  const store = useStore()
  const [profileParams, setProfileParams] = useSearchParams()
  const profileTab = ['informacion', 'comunicaciones', 'actividad'].includes(
    profileParams.get('tab') ?? '',
  )
    ? profileParams.get('tab')!
    : 'informacion'
  const [edit, setEdit] = useState(false)
  const [prefs, setPrefs] = useState(store.preferences)
  useEffect(() => setPrefs(store.preferences), [store.preferences])
  return (
    <>
      <PageHeading
        title="Mi perfil"
        action={
          <Button variant="outline" onClick={() => setEdit(true)}>
            <Pencil size={16} />
            Editar perfil
          </Button>
        }
      />
      <div className="profile-hero">
        <Avatar
          personId={mockDb.account.personId}
          initials={store.person.name
            .split(' ')
            .map((x) => x[0])
            .slice(0, 2)
            .join('')}
          size="large"
        />
        <div>
          <h2>{store.person.name}</h2>
          <p>
            {store.person.position} · {store.business.name}
          </p>
          <span className="status">
            <span />
            {store.role}
          </span>
        </div>
        <Link className="text-link" to="/detalles-de-mi-empresa">
          Ver mi empresa
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <Tabs
        value={profileTab}
        onValueChange={(tab) => {
          setProfileParams(
            (params) => {
              const next = new URLSearchParams(params)
              if (tab === 'informacion') next.delete('tab')
              else next.set('tab', tab)
              return next
            },
            { replace: true },
          )
        }}
      >
        <TabsList>
          <TabsTrigger value="informacion">Información personal</TabsTrigger>
          <TabsTrigger value="comunicaciones">Comunicaciones</TabsTrigger>
          <TabsTrigger value="actividad">Mis inscripciones ({store.registered.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="informacion">
          <div className="content-panel">
            <h2>Datos personales</h2>
            <dl className="data-grid">
              {[
                ['Email', store.person.email],
                ['Teléfono', store.person.phone],
                ['Segundo teléfono', store.person.phone2],
                ['Cargo', store.person.position],
                ['Departamento', store.person.department],
                ['Nivel de dirección', store.person.level],
                ['LinkedIn', store.person.linkedin || 'Sin añadir'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{displayValue(v)}</dd>
                </div>
              ))}
            </dl>
            <DemoNotice>
              Rol observado en la cuenta: {mockDb.account.sourceRole}. La vista {store.role} es una
              simulación local de permisos.
            </DemoNotice>
          </div>
        </TabsContent>
        <TabsContent value="comunicaciones">
          <div className="content-panel">
            <h2>Elige qué quieres recibir</h2>
            <p className="muted">
              Las selecciones originales no se pudieron comprobar. El estado indeterminado significa
              «no verificado»; los cambios se guardan solo en local.
            </p>
            {mockDb.catalogs.communicationLabels.map((title, i) => (
              <label className="preference-row" key={title}>
                <div>
                  <strong>{title}</strong>
                </div>
                <Checkbox
                  checked={prefs[i] ?? 'indeterminate'}
                  onCheckedChange={(v) => setPrefs(prefs.map((p, j) => (j === i ? v === true : p)))}
                />
              </label>
            ))}
            <div className="form-actions">
              <Button variant="outline" onClick={() => setPrefs(store.preferences)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  store.setPreferences(prefs)
                  toast.success('Preferencias guardadas en este navegador')
                }}
              >
                Guardar preferencias
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="actividad">
          <div className="content-panel">
            <h2>Inscripciones</h2>
            {store.activities
              .filter((a) => store.registered.includes(a.id))
              .map((a) => (
                <ActivityRow activity={a} key={a.id} />
              ))}
            {store.registered.length === 0 && (
              <EmptyState
                title="Tu próxima conversación te espera"
                description="Explora las actividades y encuentra tu próximo encuentro."
                action={
                  <Button asChild>
                    <Link to="/eventos">Explorar actividades</Link>
                  </Button>
                }
              />
            )}
            <p className="form-hint">
              La actualización de grupos de trabajo está pendiente de definir con AFEB.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      {edit && (
        <EditDialog
          open={edit}
          onOpenChange={setEdit}
          title="Editar mi perfil"
          description="Actualiza tus datos personales. Tu empresa y rol se gestionan por separado."
          fields={personFields}
          initial={store.person}
          onSave={(v) => store.setPerson({ ...store.person, ...v })}
        />
      )}
    </>
  )
}
export function CompanyDetail({ own = false }: { own?: boolean }) {
  const [params] = useSearchParams()
  const store = useStore()
  const company = allCompanies.find(
    (c) => c.id === (own ? mockDb.account.companyId : params.get('id')),
  )
  const canEdit = own && store.role !== 'Socio'
  const [edit, setEdit] = useState(false)
  const [brandOpen, setBrandOpen] = useState(false)
  const [teamOpen, setTeamOpen] = useState(false)
  const [brandValues, setBrandValues] = useState<Record<string, string>>({})
  const [teamValues, setTeamValues] = useState<Record<string, string>>({})
  const [deleteBrand, setDeleteBrand] = useState('')
  const [companyTab, setCompanyTab] = useState(params.get('tab') || 'datos')
  const requestedTab = params.get('tab')
  useEffect(() => {
    setCompanyTab(requestedTab || 'datos')
  }, [requestedTab])
  if (!company) return <EmptyState title="Empresa no encontrada" />
  const name = own ? store.business.name : company.name
  return (
    <>
      <BackLink to="/socios" label="Empresas asociadas" />
      <PageHeading
        eyebrow={own ? 'Tu espacio de empresa' : 'Empresa asociada'}
        title={name}
        description={
          own ? 'Mantén tu información al día y gestiona las personas de tu equipo.' : undefined
        }
        action={
          canEdit ? (
            <Button variant="outline" onClick={() => setEdit(true)}>
              <Pencil size={16} />
              Editar empresa
            </Button>
          ) : undefined
        }
      />
      <div className="company-detail-header">
        <CompanyLogo companyId={company.id} initials={initialsFor(name)} size="extra-large" />
        <div>
          <span className="status">
            <span />
            {own ? 'Cuenta de revisión · pruebas' : displayValue(company.membership)}
          </span>
          <p>
            <MapPin size={15} />
            {displayValue(own ? store.business.city : company.location)} <span>·</span>
            {displayValue(own ? store.business.category : company.category)}
          </p>
        </div>
        <span className="small-label">Muestra observada · 14/10/2026</span>
      </div>
      <Tabs className="company-detail-tabs" value={companyTab} onValueChange={setCompanyTab}>
        <TabsList>
          <TabsTrigger value="datos">Información</TabsTrigger>
          <TabsTrigger value="marcas">Marcas</TabsTrigger>
          <TabsTrigger value="equipo">Equipo</TabsTrigger>
          {own && <TabsTrigger value="participacion">Participación</TabsTrigger>}
        </TabsList>
        <TabsContent value="datos">
          <div className="content-panel">
            <h2>{own ? 'Datos de la empresa' : 'Información de contacto'}</h2>
            <dl className="data-grid">
              {(own
                ? [
                    ['Razón social', store.business.name],
                    ['CIF / NIF', store.business.tax],
                    ['Domicilio social', store.business.address],
                    [
                      'Localidad / País',
                      [store.business.city, store.business.country].filter(Boolean).join(' · '),
                    ],
                    ['Email general', store.business.email],
                    ['Teléfono', store.business.phone],
                    ['Web', store.business.website],
                    ['Categoría', store.business.category],
                  ]
                : [
                    ['Nombre comercial', company.name],
                    ['Localidad', company.location],
                    ['Categoría', company.category],
                    ['Email general', company.email],
                    ['CIF / NIF', company.tax],
                    ['Teléfono', company.phone],
                    ['Domicilio', company.address],
                    ['Código postal', company.postalCode],
                    ['Web', company.website],
                    ['Descripción', company.description],
                  ]
              ).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{displayValue(v)}</dd>
                </div>
              ))}
            </dl>
            {own && (
              <>
                <h3 className="subsection-title">Actividad y dimensión</h3>
                <dl className="data-grid">
                  {[
                    ['Empleados', store.business.employees],
                    ['Facturación total', store.business.revenue],
                    ['Mercado', store.business.market],
                    ['Exportación', store.business.export],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{displayValue(v)}</dd>
                    </div>
                  ))}
                </dl>
                <DemoNotice>
                  Datos fiscales y económicos de tu empresa. No se muestran en el directorio
                  compartido.
                </DemoNotice>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="marcas">
          <div className="content-panel">
            <div className="section-heading">
              <div>
                <h2>Identidad y marcas</h2>
                <p>Las marcas con las que tu empresa llega al mercado.</p>
              </div>
              {canEdit && (
                <Button variant="outline" onClick={() => setBrandOpen(true)}>
                  <Plus size={16} />
                  Añadir marca
                </Button>
              )}
            </div>
            {(own ? store.brands : company.brands.map((b) => b.name ?? 'No verificado')).map(
              (brand, index) => (
                <div className="brand-row" key={`${index}-${brand}`}>
                  <CompanyLogo
                    brandId={own ? undefined : company.brands[index]?.id}
                    initials={initialsFor(brand)}
                  />
                  <strong>{brand}</strong>
                  {canEdit && (
                    <Button
                      aria-label={`Eliminar ${brand}`}
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteBrand(brand)}
                    >
                      <Trash2 size={17} />
                    </Button>
                  )}
                </div>
              ),
            )}
            <p className="form-hint">
              El coste por logo debe confirmarse: la auditoría detectó importes de{' '}
              {mockDb.auditedForms.brands.observedPrices.join(' € y ')} €. Esta demo no cobra ni
              sube archivos.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="equipo">
          <div className="content-panel">
            <div className="section-heading">
              <div>
                <h2>Las personas de {name}</h2>
              </div>
              {canEdit && (
                <Button variant="outline" onClick={() => setTeamOpen(true)}>
                  <Plus size={16} />
                  Añadir persona
                </Button>
              )}
            </div>
            {getCompanyTeam(store, company.id).map((member) => (
              <div className="team-row" key={member.id}>
                <Avatar personId={member.id} initials={member.initials} />
                <div>
                  <Link className="text-link" to={`/detalles-equipo?id=${member.id}`}>
                    {member.name}
                    <ArrowUpRight size={15} />
                  </Link>
                  <p>
                    {displayValue(member.position)}
                    {member.company && member.company !== name && <> · {member.company}</>}
                  </p>
                  <p className="form-hint">{member.email || 'Email no verificado'}</p>
                </div>
                <span className="small-label">
                  {member.simulationRole
                    ? `${member.simulationRole} · simulación`
                    : member.sourceRole || 'Rol no verificado'}
                </span>
              </div>
            ))}
            {!own && !contacts.some((c) => c.company === company.name) && (
              <EmptyState
                title="Sin contactos compartidos"
                description="Esta empresa no tiene contactos visibles en la muestra."
              />
            )}
            <DemoNotice>
              Los contactos recogidos son una muestra, no el total del equipo. Las altas realizadas
              aquí se guardan en local.
            </DemoNotice>
          </div>
        </TabsContent>
        {own && (
          <TabsContent value="participacion">
            <div className="content-panel">
              <ParticipationList companyId={company.id} />
              <Link className="text-link" to="/eventos">
                Descubrir nuevas actividades
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </TabsContent>
        )}
      </Tabs>
      {edit && (
        <EditDialog
          open={edit}
          onOpenChange={setEdit}
          title="Actualizar empresa"
          description="Edita los datos de tu propia empresa. Los cambios se guardan localmente."
          fields={businessFields}
          initial={store.business}
          onSave={(v) => store.setBusiness({ ...store.business, ...v })}
        />
      )}
      <Dialog open={brandOpen} onOpenChange={setBrandOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir marca</DialogTitle>
            <DialogDescription>
              Incorpora una marca al catálogo de tu empresa de demostración.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const brand = brandValues.name.trim()
              if (store.brands.some((b) => b.toLowerCase() === brand.toLowerCase()))
                return toast.error('Esta marca ya está añadida')
              store.setBrands([...store.brands, brand])
              setBrandOpen(false)
              setBrandValues({})
              toast.success('Marca añadida localmente')
            }}
          >
            <FormFields
              fields={[{ name: 'name', label: 'Nombre de la marca', required: true, wide: true }]}
              values={brandValues}
              setValues={setBrandValues}
            />
            <div className="form-actions">
              <Button type="submit">Añadir marca</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={teamOpen} onOpenChange={setTeamOpen}>
        <DialogContent className="edit-dialog">
          <DialogHeader>
            <DialogTitle>Añadir persona al equipo</DialogTitle>
            <DialogDescription>
              Guarda una persona en el equipo, directorio y fichas de esta demo. El rol solo es de
              simulación; no se crean accesos reales.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const result = localAction(() =>
                store.addMember({
                  ...teamValues,
                  name: teamValues.name,
                  email: teamValues.email,
                  role: teamValues.role as Role,
                }),
              )
              if (!result.ok) return
              setTeamOpen(false)
              setTeamValues({})
              toast.success('Persona guardada con todos sus datos')
            }}
          >
            <FormFields
              fields={[
                { name: 'email', label: 'Email', type: 'email', required: true, wide: true },
                ...personFields,
                {
                  name: 'role',
                  label: 'Rol propuesto',
                  options: ['Socio', 'SocioAdmin'],
                  required: true,
                },
              ]}
              values={teamValues}
              setValues={setTeamValues}
            />
            <p className="form-hint">
              El servidor deberá validar la pertenencia y autorizar el rol propuesto.
            </p>
            <div className="form-actions">
              <Button type="submit">Guardar persona</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={!!deleteBrand} onOpenChange={() => setDeleteBrand('')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar «{deleteBrand}»</DialogTitle>
            <DialogDescription>
              Se quitará del listado local de marcas de tu empresa.
            </DialogDescription>
          </DialogHeader>
          <div className="form-actions">
            <Button variant="outline" onClick={() => setDeleteBrand('')}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                store.setBrands(store.brands.filter((b) => b !== deleteBrand))
                setDeleteBrand('')
                toast.success('Marca eliminada de la demo')
              }}
            >
              Eliminar marca
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
