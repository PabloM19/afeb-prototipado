import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Pencil,
  ArrowUpRight,
  Check,
  FileText,
  CalendarDays,
  UsersRound,
  Inbox,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  PageHeading,
  SearchInput,
  Status,
  EmptyState,
  DemoNotice,
  FormFields,
} from '@/components/shared'
import { RequestList } from '@/components/request-list'
import { displayValue } from '@/data/mock-db'
import { useStore } from '@/lib/store'
import { activityCategories, formatDate } from '@/data/fixtures'
import type { Activity } from '@/data/fixtures'
export default function Management() {
  const store = useStore()
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  if (store.role !== 'Gestor AFEB')
    return (
      <>
        <PageHeading
          title="Gestión interna"
          description="El espacio editorial para el equipo AFEB."
        />
        <EmptyState
          title="Vista reservada al equipo AFEB"
          description="Para explorar esta propuesta, selecciona Gestor AFEB en el menú de usuario de la demo."
        />
        <DemoNotice>
          El selector ilustra roles de interfaz. No es un sistema real de autorización.
        </DemoNotice>
      </>
    )
  const open = (activity?: Activity) => {
    setEditing(activity?.id || 'new')
    setValues(
      activity
        ? {
            title: activity.title,
            category: activity.category,
            date: activity.date,
            end: activity.end,
            deadline: activity.deadline,
            place: activity.place,
            mode: activity.mode,
            state: activity.state,
            description: activity.description,
            price: activity.price === null ? '' : String(activity.price),
            capacity: activity.capacity === null ? '' : String(activity.capacity),
            attendees: activity.attendees === null ? '' : String(activity.attendees),
          }
        : {
            state: 'Borrador',
            mode: '',
            price: '',
            capacity: '',
            category: '',
            title: '',
            date: '',
            end: '',
            deadline: '',
            place: '',
            description: '',
          },
    )
  }
  const save = () => {
    if (values.price && (!Number.isFinite(Number(values.price)) || Number(values.price) < 0))
      return toast.error('La tarifa debe ser un número mayor o igual a cero')
    if (
      values.capacity &&
      (!Number.isInteger(Number(values.capacity)) || Number(values.capacity) < 1)
    )
      return toast.error('El cupo debe ser un entero positivo')
    const old = store.activities.find((a) => a.id === editing)
    if (values.end && values.date && new Date(values.end) <= new Date(values.date))
      return toast.error('El final debe ser posterior al inicio')
    if (values.deadline && values.date && values.deadline > values.date.slice(0, 10))
      return toast.error('El cierre de inscripción no puede ser posterior al inicio')
    if (values.capacity && Number(values.capacity) < (old?.attendees || 0))
      return toast.error('El cupo no puede ser inferior al número de inscritos')
    const activity: Activity = {
      id: old?.id || `demo-${Date.now()}`,
      title: values.title,
      category: values.category,
      date: values.date,
      end: values.end,
      deadline: values.deadline,
      place: values.place,
      mode: values.mode,
      state: values.state as Activity['state'],
      price: values.price === '' ? null : Number(values.price),
      capacity: values.capacity === '' ? null : Number(values.capacity),
      attendees: old ? old.attendees : 0,
      description: values.description,
      address: old?.address ?? '',
      sourceState: old?.sourceState ?? '',
      secondPrice: old?.secondPrice ?? null,
      nonMemberPrice: old?.nonMemberPrice ?? null,
      timezone: old?.timezone ?? null,
      fileIds: old?.fileIds ?? [],
      qualityNotes: old?.qualityNotes ?? [],
      participantSample: old?.participantSample ?? 'local',
      isLocalOverride: true,
    }
    store.setActivities(
      old
        ? store.activities.map((a) => (a.id === old.id ? activity : a))
        : [...store.activities, activity],
    )
    setEditing(null)
    toast.success('Actividad guardada en la demo')
  }
  const items = store.activities.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <>
      <PageHeading
        eyebrow="Equipo AFEB"
        title="Gestión interna"
        description="Publica actividades y revisa las solicitudes de la comunidad."
        action={
          <Button onClick={() => open()}>
            <Plus size={16} />
            Crear actividad
          </Button>
        }
      />
      <div className="management-summary">
        <div>
          <CalendarDays size={20} />
          <strong>{store.activities.length}</strong>
          <span>Actividades</span>
        </div>
        <div>
          <FileText size={20} />
          <strong>{store.activities.filter((a) => a.state === 'Borrador').length}</strong>
          <span>Borradores</span>
        </div>
        <div>
          <Inbox size={20} />
          <strong>{store.requests.length}</strong>
          <span>Solicitudes locales</span>
        </div>
      </div>
      <Tabs defaultValue="actividades" className="management-tabs">
        <TabsList className="management-tabs-list">
          <TabsTrigger value="actividades">Actividades</TabsTrigger>
          <TabsTrigger value="solicitudes">Solicitudes ({store.requests.length})</TabsTrigger>
          <TabsTrigger value="editorial">Otros contenidos</TabsTrigger>
        </TabsList>
        <TabsContent value="actividades">
          <div className="filter-bar">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Buscar actividad en gestión…"
            />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Actividad</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Inscritos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <strong>{a.title}</strong>
                      <span className="table-subtitle">{a.category}</span>
                    </td>
                    <td>{formatDate(a.date, { day: '2-digit', month: 'short' })}</td>
                    <td>
                      <Status>{a.state}</Status>
                    </td>
                    <td>
                      <div className="registration-count">
                        <span>Inscritos: {displayValue(a.attendees)}</span>
                        <span>Cupo: {displayValue(a.capacity)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="table-actions">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Editar ${a.title}`}
                          onClick={() => open(a)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link aria-label={`Ver ${a.title}`} to={`/detalles-evento?id=${a.id}`}>
                            <ArrowUpRight size={16} />
                          </Link>
                        </Button>
                        {a.state === 'Borrador' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (
                                !a.title ||
                                !a.date ||
                                !a.end ||
                                !a.deadline ||
                                a.price === null ||
                                a.date >= a.end
                              )
                                return toast.error('Revisa los datos antes de publicar')
                              store.setActivities(
                                store.activities.map((x) =>
                                  x.id === a.id
                                    ? { ...x, state: 'Abierta', isLocalOverride: true }
                                    : x,
                                ),
                              )
                              toast.success('Publicada en el catálogo local')
                            }}
                          >
                            Publicar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {items.length === 0 && <EmptyState />}
        </TabsContent>
        <TabsContent value="solicitudes">
          <div className="content-panel">
            <h2>Solicitudes recibidas en la demo</h2>
            <RequestList />
          </div>
        </TabsContent>
        <TabsContent value="editorial">
          <div className="content-panel">
            <h2>Catálogos y alcance editorial</h2>
            <p className="muted">
              Consulta los catálogos de informes, documentos y proveedores. La edición de estos
              contenidos está pendiente.
            </p>
            <div className="quick-links editorial-links">
              <Link to="/informes">
                <FileText size={20} />
                <div>
                  <strong>Informes</strong>
                  <span>Ver catálogo propuesto</span>
                </div>
                <ArrowUpRight size={18} />
              </Link>
              <Link to="/documentos">
                <FileText size={20} />
                <div>
                  <strong>Documentos</strong>
                  <span>Ver clasificación y archivos</span>
                </div>
                <ArrowUpRight size={18} />
              </Link>
              <Link to="/colaboradores">
                <UsersRound size={20} />
                <div>
                  <strong>Colaboradores</strong>
                  <span>Ver proveedores y beneficios</span>
                </div>
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <DemoNotice>
              Alta, subida de archivos, asignación a empresa, publicación y archivo quedan
              documentados para la siguiente fase.
            </DemoNotice>
          </div>
        </TabsContent>
      </Tabs>
      <DemoNotice>
        Panel de demostración. La autorización, los registros de auditoría y las operaciones se
        validarán en el servidor.
      </DemoNotice>
      <Dialog
        open={editing !== null}
        onOpenChange={(v) => {
          if (!v) setEditing(null)
        }}
      >
        <DialogContent className="edit-dialog">
          <DialogHeader>
            <DialogTitle>{editing === 'new' ? 'Crear actividad' : 'Editar actividad'}</DialogTitle>
            <DialogDescription>
              La publicación solo afecta al catálogo de este navegador. Horarios en Europe/Madrid.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              save()
            }}
          >
            <FormFields
              fields={[
                { name: 'title', label: 'Título', required: true, wide: true },
                {
                  name: 'category',
                  label: 'Categoría',
                  options: activityCategories.slice(1),
                },
                {
                  name: 'mode',
                  label: 'Formato',
                  options: ['Webinar', 'Presencial'],
                },
                { name: 'date', label: 'Inicio', type: 'datetime-local' },
                { name: 'end', label: 'Final', type: 'datetime-local' },
                { name: 'deadline', label: 'Cierre de inscripción', type: 'date' },
                { name: 'place', label: 'Lugar o enlace de sesión' },
                {
                  name: 'price',
                  label: 'Tarifa socio (€) · vacío = no verificado',
                  type: 'number',
                },
                { name: 'capacity', label: 'Cupo · vacío = no verificado', type: 'number' },
                {
                  name: 'state',
                  label: 'Estado',
                  options: [
                    'Borrador',
                    'Abierta',
                    'Cerrada',
                    'Completa',
                    'Finalizada',
                    'Consulta',
                    'Sin verificar',
                  ],
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Descripción',
                  type: 'textarea',
                  wide: true,
                },
              ]}
              values={values}
              setValues={setValues}
            />
            <div className="form-actions">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancelar
              </Button>
              <Button type="submit">
                <Check size={16} />
                Guardar actividad
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
