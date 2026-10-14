import { useState } from 'react'
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
  EmptyState,
  BackLink,
  EditDialog,
  FormFields,
  DemoNotice,
  ActivityRow,
} from '@/components/shared'
import type { Field } from '@/components/shared'
import { companies, companyCategories, contacts } from '@/data/fixtures'
import { useStore } from '@/lib/store'
const personFields: Field[] = [
  { name: 'name', label: 'Nombre y apellidos', required: true },
  { name: 'position', label: 'Cargo', required: true },
  {
    name: 'level',
    label: 'Nivel de dirección',
    options: ['Dirección', 'Responsable', 'Técnico', 'Otro'],
  },
  {
    name: 'department',
    label: 'Departamento',
    options: ['Comercial', 'Marketing', 'Exportación', 'Operaciones', 'Dirección', 'Otro'],
  },
  { name: 'phone', label: 'Teléfono', type: 'tel' },
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
    options: ['1–10', '10–50', '50–100', '100–250', 'Más de 250'],
  },
  {
    name: 'revenue',
    label: 'Facturación total',
    options: ['Menos de 1 M€', '1–10 M€', '10–25 M€', 'Más de 25 M€'],
  },
  {
    name: 'market',
    label: 'Mercado',
    options: ['Profesional', 'Doméstico', 'Profesional y doméstico'],
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
        eyebrow="Una comunidad que suma"
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
        <p>
          Distintas especialidades. Una misma visión.
          <br />
          <strong>Conectamos a los profesionales que hacen avanzar el sector.</strong>
        </p>
        <span>{companies.length} empresas de ejemplo</span>
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
              <span className="company-logo large">{company.initials}</span>
              <ArrowUpRight size={19} />
            </div>
            <span className="small-label">{company.category}</span>
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            <div className="company-card-footer">
              <span>
                <MapPin size={14} />
                {company.location}
              </span>
              <span>{company.members} profesionales</span>
            </div>
            {role === 'Gestor AFEB' && (
              <span className="admin-tag">Socio · Registro de demostración</span>
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
  const { role } = useStore()
  const items = contacts.filter(
    (p) =>
      (department === 'Todos los departamentos' || department === p.department) &&
      `${p.name} ${p.company} ${p.position}`.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <>
      <PageHeading
        eyebrow="Las personas detrás de las empresas"
        title="Directorio"
        description="Conecta con otros profesionales de nuestra comunidad."
      />
      <div className="filter-bar">
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
            'Comercial',
            'Exportación',
            'Marketing',
            'Dirección',
            'Operaciones',
          ]}
        />
      </div>
      <div className="contacts-grid">
        {items.map((p) => (
          <article className="person-card" key={p.id}>
            <div className="person-card-top">
              <Avatar initials={p.initials} />
              <span className="small-label">{p.department}</span>
            </div>
            <h2>{p.name}</h2>
            <p>{p.position}</p>
            <strong className="person-company">{p.company}</strong>
            <a className="contact-email" href={`mailto:${p.email}`}>
              <Mail size={15} />
              {p.email}
            </a>
            <div className="person-card-footer">
              <span>Visible para socios</span>
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
        Personas y contactos ficticios. La visibilidad definitiva del directorio debe validarse con
        AFEB.
      </DemoNotice>
    </>
  )
}
export function ContactDetail() {
  const [params] = useSearchParams()
  const person = contacts.find((x) => x.id === params.get('id')) || contacts[0]
  return (
    <>
      <BackLink to="/directorio" label="Volver al directorio" />
      <div className="contact-detail">
        <Avatar initials={person.initials} size="large" />
        <PageHeading eyebrow={person.company} title={person.name} description={person.position} />
        <dl className="data-grid">
          <div>
            <dt>Departamento</dt>
            <dd>{person.department}</dd>
          </div>
          <div>
            <dt>Empresa</dt>
            <dd>{person.company}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </dd>
          </div>
          <div>
            <dt>Visibilidad</dt>
            <dd>Compartido con socios (demo)</dd>
          </div>
        </dl>
        <DemoNotice>
          Propuesta de ficha de contacto. La ruta original devolvía 404 y no se pudieron verificar
          sus campos.
        </DemoNotice>
      </div>
    </>
  )
}
export function Profile() {
  const store = useStore()
  const [edit, setEdit] = useState(false)
  const [prefs, setPrefs] = useState(store.preferences)
  return (
    <>
      <PageHeading
        title="Mi perfil"
        description="Tu información, tus preferencias y tu participación en AFEB."
        action={
          <Button variant="outline" onClick={() => setEdit(true)}>
            <Pencil size={16} />
            Editar perfil
          </Button>
        }
      />
      <div className="profile-hero">
        <Avatar
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
      <Tabs defaultValue="informacion">
        <TabsList>
          <TabsTrigger value="informacion">Información personal</TabsTrigger>
          <TabsTrigger value="comunicaciones">Comunicaciones</TabsTrigger>
          <TabsTrigger value="actividad">Mis inscripciones ({store.registered.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="informacion">
          <div className="content-panel">
            <h2>Los datos que nos conectan</h2>
            <dl className="data-grid">
              {[
                ['Email', store.person.email],
                ['Teléfono', store.person.phone],
                ['Cargo', store.person.position],
                ['Departamento', store.person.department],
                ['Nivel de dirección', store.person.level],
                ['LinkedIn', store.person.linkedin || 'Sin añadir'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <DemoNotice>
              El rol es informativo. La edición del perfil no permite cambiar privilegios.
            </DemoNotice>
          </div>
        </TabsContent>
        <TabsContent value="comunicaciones">
          <div className="content-panel">
            <h2>Elige qué quieres recibir</h2>
            <p className="muted">Recibe solo la información que te interesa.</p>
            {[
              ['Actividades y encuentros', 'Nuevas convocatorias, formación y recordatorios.'],
              ['Newsletter del sector', 'Novedades, tendencias y noticias de la comunidad.'],
              ['Información legal y normativa', 'Cambios normativos y contenidos de asesoría.'],
              ['Encuestas y participación', 'Ayúdanos a conocer las necesidades del sector.'],
            ].map(([title, desc], i) => (
              <label className="preference-row" key={title}>
                <div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
                <Checkbox
                  checked={prefs[i]}
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
            <h2>Tu agenda AFEB</h2>
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
  const company = companies.find((c) => c.id === params.get('id')) || companies[0]
  const canEdit = own && store.role !== 'Socio'
  const [edit, setEdit] = useState(false)
  const [brandOpen, setBrandOpen] = useState(false)
  const [teamOpen, setTeamOpen] = useState(false)
  const [brandValues, setBrandValues] = useState<Record<string, string>>({})
  const [teamValues, setTeamValues] = useState<Record<string, string>>({})
  const [deleteBrand, setDeleteBrand] = useState('')
  const name = own ? store.business.name : company.name
  return (
    <>
      <BackLink to="/socios" label="Empresas asociadas" />
      <PageHeading
        eyebrow={own ? 'Tu espacio de empresa' : 'Empresa asociada'}
        title={name}
        description={
          own
            ? 'Mantén tu información al día y gestiona las personas de tu equipo.'
            : company.description
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
        <span className="company-logo extra-large">{own ? 'NT' : company.initials}</span>
        <div>
          <span className="status">
            <span />
            Empresa asociada
          </span>
          <p>
            <MapPin size={15} />
            {own ? store.business.city : company.location} <span>·</span>
            {own ? store.business.category : company.category}
          </p>
        </div>
        <span className="small-label">
          {own ? 'Socio desde 2018' : 'Miembro de la comunidad AFEB'}
        </span>
      </div>
      <Tabs defaultValue="datos">
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
                    ['Localidad / País', `${store.business.city} · ${store.business.country}`],
                    ['Email general', store.business.email],
                    ['Teléfono', store.business.phone],
                    ['Web', store.business.website],
                    ['Categoría', store.business.category],
                  ]
                : [
                    ['Nombre comercial', company.name],
                    ['Localidad', company.location],
                    ['Categoría', company.category],
                    ['Email general', `hola@${company.id}.example`],
                    ['Web', `${company.id}.example`],
                    ['Descripción', company.description],
                  ]
              ).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
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
                      <dd>{v}</dd>
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
            {(own ? store.brands : [company.name]).map((brand) => (
              <div className="brand-row" key={brand}>
                <span className="company-logo">
                  {brand
                    .split(' ')
                    .map((x) => x[0])
                    .slice(0, 2)
                    .join('')}
                </span>
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
            ))}
            <p className="form-hint">
              El coste por logo debe confirmarse: la auditoría detectó importes de 100 € y 130 €.
              Esta demo no cobra ni sube archivos.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="equipo">
          <div className="content-panel">
            <div className="section-heading">
              <div>
                <h2>Las personas de {name}</h2>
                <p>Un equipo conectado con la comunidad.</p>
              </div>
              {canEdit && (
                <Button variant="outline" onClick={() => setTeamOpen(true)}>
                  <Plus size={16} />
                  Añadir persona
                </Button>
              )}
            </div>
            {(own
              ? store.team
              : contacts.filter((c) => c.company === company.name).map((c) => c.name)
            ).map((member) => (
              <div className="team-row" key={member}>
                <Avatar
                  initials={member
                    .split(' ')
                    .map((x) => x[0])
                    .slice(0, 2)
                    .join('')}
                />
                <div>
                  <strong>{member}</strong>
                  <p>{name}</p>
                </div>
                <span className="small-label">
                  {member.includes('Clara') ? 'SocioAdmin' : 'Socio'}
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
              Las invitaciones, bajas y permisos del equipo deben resolverse en el servidor.
            </DemoNotice>
          </div>
        </TabsContent>
        {own && (
          <TabsContent value="participacion">
            <div className="content-panel">
              <h2>Tu empresa participa</h2>
              {store.activities
                .filter((a) => store.registered.includes(a.id))
                .map((a) => (
                  <ActivityRow key={a.id} activity={a} />
                ))}
              {store.registered.length === 0 && <EmptyState title="Sin inscripciones" />}
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
              Prepara la invitación para una persona de tu empresa. No se envían correos.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (store.team.some((p) => p.toLowerCase() === teamValues.name.trim().toLowerCase()))
                return toast.error('Ya existe una persona con ese nombre')
              store.setTeam([...store.team, teamValues.name.trim()])
              store.addRequest(`Invitación al equipo: ${teamValues.email}`)
              setTeamOpen(false)
              setTeamValues({})
              toast.success('Persona añadida a la demo')
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
              <Button type="submit">Preparar invitación</Button>
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
