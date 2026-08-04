import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import {
  demoGuardarPerfil,
  demoObtenerPerfil,
  demoGuardarContactos,
  demoObtenerContactos,
  type DemoContactoEmergencia,
} from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Users, ChevronRight, CheckCircle, MapPin, Clock, Wallet, Heart,
  Music, Dog, Coffee, Ticket, Bike, Palette, Theater, Shield,
  AlertTriangle, Phone, Trash2, Sparkles, Star
} from 'lucide-react'

const categoriasInteres = [
  { id: 'conciertos', label: 'Conciertos', icon: <Music className="w-4 h-4" /> },
  { id: 'bares', label: 'Bares / Cerveza', icon: <Coffee className="w-4 h-4" /> },
  { id: 'cine', label: 'Cine / Teatro', icon: <Theater className="w-4 h-4" /> },
  { id: 'trekking', label: 'Trekking / Outdoor', icon: <Bike className="w-4 h-4" /> },
  { id: 'mascotas', label: 'Paseo de mascotas', icon: <Dog className="w-4 h-4" /> },
  { id: 'arte', label: 'Arte / Museos', icon: <Palette className="w-4 h-4" /> },
  { id: 'eventos', label: 'Eventos / Ferias', icon: <Ticket className="w-4 h-4" /> },
  { id: 'comida', label: 'Restaurantes / Comida', icon: <Coffee className="w-4 h-4" /> },
]

const comunasRM = [
  'Santiago Centro', 'Ñuñoa', 'Providencia', 'Las Condes', 'La Reina',
  'Macul', 'Peñalolén', 'San Miguel', 'La Florida', 'Puente Alto',
  'Maipú', 'Pudahuel', 'Quilicura', 'Recoleta', 'Independencia',
  'Estación Central', 'Cerrillos', 'El Bosque', 'San Bernardo', 'Pirque'
]

export default function OnboardingWizard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [paso, setPaso] = useState(0)
  const [guardado, setGuardado] = useState(false)

  // Paso 0: Bienvenida (no hay datos que guardar)

  // Paso 1: Vida cotidiana
  const [ultimoSabado, setUltimoSabado] = useState('')
  const [despuesTrabajo, setDespuesTrabajo] = useState('')
  const [frecuenciaSocial, setFrecuenciaSocial] = useState('')

  // Paso 2: Preferencias
  const [categoriasSel, setCategoriasSel] = useState<string[]>([])
  const [presupuesto, setPresupuesto] = useState('')
  const [companiasPref, setCompaniasPref] = useState('')
  const [disponibilidad, setDisponibilidad] = useState<string[]>([])
  const [comunasSel, setComunasSel] = useState<string[]>([])
  const [nuncaHaria, setNuncaHaria] = useState('')

  // Paso 3: Seguridad
  const [contactosEmergencia, setContactosEmergencia] = useState<DemoContactoEmergencia[]>([])
  const [nuevoContactoNombre, setNuevoContactoNombre] = useState('')
  const [nuevoContactoTelefono, setNuevoContactoTelefono] = useState('')
  const [nuevoContactoRelacion, setNuevoContactoRelacion] = useState('')

  const totalPasos = 5 // 0 bienvenida + 3 form + 1 completado

  // Cargar progreso existente
  useEffect(() => {
    if (!user) return
    const perfil = demoObtenerPerfil(user.uid)
    if (perfil) {
      setUltimoSabado(perfil.ultimoSabado || '')
      setDespuesTrabajo(perfil.despuesTrabajo || '')
      setFrecuenciaSocial(perfil.frecuenciaSocial || '')
      setCategoriasSel(perfil.categoriasSel || [])
      setPresupuesto(perfil.presupuesto || '')
      setCompaniasPref(perfil.companiasPref || '')
      setDisponibilidad(perfil.disponibilidad || [])
      setComunasSel(perfil.comunasSel || [])
      setNuncaHaria(perfil.nuncaHaria || '')
    }
    const contactos = demoObtenerContactos(user.uid)
    setContactosEmergencia(contactos)
  }, [user])

  const toggleCategoria = (c: string) => {
    setCategoriasSel(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }
  const toggleComuna = (c: string) => {
    setComunasSel(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }
  const toggleDisponibilidad = (d: string) => {
    setDisponibilidad(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  const agregarContacto = () => {
    if (!nuevoContactoNombre.trim() || !nuevoContactoTelefono.trim()) return
    const nuevo: DemoContactoEmergencia = {
      nombre: nuevoContactoNombre,
      telefono: nuevoContactoTelefono,
      relacion: nuevoContactoRelacion || 'Otro',
    }
    const updated = [...contactosEmergencia, nuevo]
    setContactosEmergencia(updated)
    if (user) demoGuardarContactos(user.uid, updated)
    setNuevoContactoNombre('')
    setNuevoContactoTelefono('')
    setNuevoContactoRelacion('')
  }

  const eliminarContacto = (index: number) => {
    const updated = contactosEmergencia.filter((_, i) => i !== index)
    setContactosEmergencia(updated)
    if (user) demoGuardarContactos(user.uid, updated)
  }

  const guardarProgreso = () => {
    if (!user) return
    demoGuardarPerfil(user.uid, {
      ultimoSabado,
      despuesTrabajo,
      frecuenciaSocial,
      categoriasSel,
      presupuesto,
      companiasPref,
      disponibilidad,
      comunasSel,
      nuncaHaria,
    })
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2000)
  }

  const avanzar = () => {
    guardarProgreso()
    if (paso < totalPasos - 1) setPaso(p => p + 1)
  }

  const retroceder = () => {
    if (paso > 0) setPaso(p => p - 1)
  }

  const finalizar = () => {
    guardarProgreso()
    navigate('/feed')
  }

  // Si no hay usuario, redirigir
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-sm">
          <CardContent className="p-6 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-700">Inicia sesión para continuar</h3>
            <Button className="mt-4 bg-teal-600 hover:bg-teal-700" onClick={() => navigate('/')}>Ir al inicio</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progressPercent = (paso / (totalPasos - 1)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900">Panoramix</span>
            </div>
            <p className="text-xs text-slate-500">Paso {paso + 1} de {totalPasos}</p>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {guardado && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Progreso guardado
          </div>
        )}

        {/* PASO 0: BIENVENIDA */}
        {paso === 0 && (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-teal-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">¡Bienvenido/a, {user.displayName || 'amigo'}!</h1>
              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                Vamos a crear tu perfil en 4 pasos para encontrarte los mejores compañeros de panorama. 
                No buscamos pareja — buscamos a alguien con quien disfrutar lo que te gusta hacer.
              </p>
            </div>
            <Card className="bg-teal-50/50 border-teal-200 max-w-md mx-auto">
              <CardContent className="p-4 text-left space-y-2">
                <p className="text-sm font-medium text-teal-800">En este onboarding:</p>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5" /> Definimos tu estilo de vida</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5" /> Seleccionas qué panoramas te interesan</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5" /> Configuras contactos de seguridad</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5" /> ¡Listo para encontrar compañía!</li>
                </ul>
              </CardContent>
            </Card>
            <Button onClick={avanzar} className="bg-teal-600 hover:bg-teal-700 px-8 py-5 text-base">
              Comenzar <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}

        {/* PASO 1: VIDA COTIDIANA */}
        {paso === 1 && (
          <div className="space-y-6">
            <div>
              <Badge className="bg-teal-100 text-teal-700 mb-2">Paso 1 de 4</Badge>
              <h2 className="text-xl font-bold text-slate-900">Tu día a día</h2>
              <p className="text-sm text-slate-500">Preguntamos qué haces, no qué te gustaría hacer. Sé honesto/a.</p>
            </div>

            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-1">Describe tu último sábado libre. ¿Qué hiciste?</label>
                  <p className="text-xs text-slate-400 mb-2">Esto nos ayuda a entender tu ritmo de vida.</p>
                  <Textarea
                    placeholder="Ej: Me levanté tarde, almorcé con mi hermana en Ñuñoa, paseé al perro y vi una película en casa."
                    value={ultimoSabado}
                    onChange={e => setUltimoSabado(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-900 block mb-1">En un día común de trabajo, ¿qué haces después de salir?</label>
                  <Textarea
                    placeholder="Ej: Llego a casa, cocino algo rápido y veo series. A veces salgo a caminar al perro."
                    value={despuesTrabajo}
                    onChange={e => setDespuesTrabajo(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Con qué frecuencia sales para actividades sociales?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Casi nunca', '1-2 veces al mes', 'Semanalmente', 'Varias veces por semana'].map(o => (
                      <button
                        key={o}
                        onClick={() => setFrecuenciaSocial(o)}
                        className={`p-3 rounded-lg border text-sm transition text-left ${
                          frecuenciaSocial === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 2: PREFERENCIAS */}
        {paso === 2 && (
          <div className="space-y-6">
            <div>
              <Badge className="bg-teal-100 text-teal-700 mb-2">Paso 2 de 4</Badge>
              <h2 className="text-xl font-bold text-slate-900">¿Qué panoramas te interesan?</h2>
              <p className="text-sm text-slate-500">Selecciona las categorías donde buscarías compañía.</p>
            </div>

            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-2">Categorías de interés</label>
                  <div className="flex flex-wrap gap-2">
                    {categoriasInteres.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategoria(cat.id)}
                        className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-1 transition ${
                          categoriasSel.includes(cat.id) ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-900 block mb-2 flex items-center gap-1">
                    <Wallet className="w-4 h-4 text-teal-500" /> Presupuesto típico para una salida
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['$0 (gratis)', '$5.000 - $15.000', '$15.000 - $30.000', '$30.000 - $60.000', '$60.000+'].map(o => (
                      <button
                        key={o}
                        onClick={() => setPresupuesto(o)}
                        className={`p-3 rounded-lg border text-sm transition text-left ${
                          presupuesto === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-900 block mb-2 flex items-center gap-1">
                    <Heart className="w-4 h-4 text-teal-500" /> Compañía preferida
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Femenina', 'Masculina', 'Me es indiferente'].map(o => (
                      <button
                        key={o}
                        onClick={() => setCompaniasPref(o)}
                        className={`px-4 py-2 rounded-full border text-sm transition ${
                          companiasPref === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-900 block mb-2 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-teal-500" /> Horarios disponibles
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Mañana', 'Tarde', 'Noche', 'Fin de semana'].map(d => (
                      <button
                        key={d}
                        onClick={() => toggleDisponibilidad(d)}
                        className={`px-4 py-2 rounded-full border text-sm transition ${
                          disponibilidad.includes(d) ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-900 block mb-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-teal-500" /> Comunas donde te mueves
                  </label>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg">
                    {comunasRM.map(c => (
                      <button
                        key={c}
                        onClick={() => toggleComuna(c)}
                        className={`px-3 py-1 rounded-full border text-xs transition ${
                          comunasSel.includes(c) ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  {comunasSel.length > 0 && (
                    <p className="text-xs text-slate-400 mt-1">Seleccionadas: {comunasSel.join(', ')}</p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-slate-900 block mb-1">¿Algo que NUNCA harías ni con buena compañía?</label>
                  <Textarea
                    placeholder="Ej: karaoke, discotecas, trekking extremo..."
                    value={nuncaHaria}
                    onChange={e => setNuncaHaria(e.target.value)}
                    className="min-h-[60px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 3: SEGURIDAD */}
        {paso === 3 && (
          <div className="space-y-6">
            <div>
              <Badge className="bg-red-100 text-red-700 mb-2">Paso 3 de 4</Badge>
              <h2 className="text-xl font-bold text-slate-900">Tu red de seguridad</h2>
              <p className="text-sm text-slate-500">Obligatorio: al menos 1 contacto para el botón SOS.</p>
            </div>

            <Card className="border-amber-200 bg-amber-50/50">
              <CardContent className="p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">¿Por qué pedimos esto?</p>
                  <p className="text-xs text-amber-700">
                    Panoramix es para encontrar compañía, no pareja. Tu seguridad es primero. 
                    El botón SOS enviará un mensaje a estos contactos si lo necesitas.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-4">
                {contactosEmergencia.length > 0 && (
                  <div className="space-y-2">
                    {contactosEmergencia.map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
                            {c.nombre[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{c.nombre}</p>
                            <p className="text-xs text-slate-500">{c.relacion} · {c.telefono}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-red-500" onClick={() => eliminarContacto(i)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {contactosEmergencia.length < 2 && (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="Nombre" value={nuevoContactoNombre} onChange={e => setNuevoContactoNombre(e.target.value)} />
                      <Input placeholder="Teléfono" value={nuevoContactoTelefono} onChange={e => setNuevoContactoTelefono(e.target.value)} />
                      <Input placeholder="Relación" value={nuevoContactoRelacion} onChange={e => setNuevoContactoRelacion(e.target.value)} />
                    </div>
                    <Button
                      onClick={agregarContacto}
                      disabled={!nuevoContactoNombre.trim() || !nuevoContactoTelefono.trim()}
                      variant="outline"
                      className="w-full gap-1"
                    >
                      <Phone className="w-4 h-4" /> Agregar contacto
                    </Button>
                  </>
                )}
                {contactosEmergencia.length >= 2 && (
                  <p className="text-xs text-slate-400 text-center">Máximo 2 contactos configurados.</p>
                )}

                {contactosEmergencia.length === 0 && (
                  <p className="text-xs text-amber-600 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Debes agregar al menos 1 contacto para continuar.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 4: COMPLETADO */}
        {paso === 4 && (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center mx-auto">
              <Star className="w-10 h-10 text-teal-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">¡Perfil completado!</h2>
              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                Ya puedes explorar panoramas o crear el tuyo propio. Recuerda: 
                cada panorama es una oportunidad de compartir algo que disfrutas.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <Card className="bg-teal-50/50 border-teal-200 cursor-pointer hover:shadow-md transition" onClick={finalizar}>
                <CardContent className="p-4 text-center">
                  <Sparkles className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-teal-800">Ver panoramas</p>
                  <p className="text-xs text-teal-600">Descubre quién busca compañía</p>
                </CardContent>
              </Card>
              <Card className="bg-amber-50/50 border-amber-200 cursor-pointer hover:shadow-md transition" onClick={() => { finalizar(); navigate('/crear-panorama'); }}>
                <CardContent className="p-4 text-center">
                  <ChevronRight className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-amber-800">Crear panorama</p>
                  <p className="text-xs text-amber-600">Busca compañía para tu plan</p>
                </CardContent>
              </Card>
            </div>
            <Button onClick={finalizar} className="bg-teal-600 hover:bg-teal-700 px-8">
              Ir al feed <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}

        {/* Navegación */}
        {paso > 0 && paso < totalPasos - 1 && (
          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" onClick={retroceder}>Anterior</Button>
            <Button
              onClick={avanzar}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={paso === 3 && contactosEmergencia.length === 0}
            >
              {paso === totalPasos - 2 ? 'Finalizar' : 'Siguiente'} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
