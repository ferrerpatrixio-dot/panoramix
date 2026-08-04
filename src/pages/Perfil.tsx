import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { demoGuardarPerfil, demoObtenerPerfil, demoGuardarContactos, demoObtenerContactos, type DemoContactoEmergencia } from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Users, ChevronLeft, Save, MapPin, Clock, Wallet, Heart,
  Music, Dog, Coffee, Ticket, Bike, Palette, Theater, Star,
  LayoutDashboard, AlertTriangle, Phone, Trash2
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

export default function Perfil() {
  const { user } = useAuth()
  const [paso, setPaso] = useState(1)
  const [guardado, setGuardado] = useState(false)
  const [cargando, setCargando] = useState(true)

  // Bloque A: Comportamiento
  const [ultimoSabado, setUltimoSabado] = useState('')
  const [ultimoFindeDisfrutado, setUltimoFindeDisfrutado] = useState('')
  const [despuesTrabajo, setDespuesTrabajo] = useState('')
  const [frecuenciaSocial, setFrecuenciaSocial] = useState('')
  const [ultimoEvento, setUltimoEvento] = useState('')

  // Bloque B: Intereses
  const [artistas, setArtistas] = useState('')
  const [peliculaSerie, setPeliculaSerie] = useState('')
  const [deporte, setDeporte] = useState('')
  const [naturaleza, setNaturaleza] = useState('')
  const [mascota, setMascota] = useState('')
  const [horarioPreferido, setHorarioPreferido] = useState('')
  const [lugaresFrecuentes, setLugaresFrecuentes] = useState('')
  const [categoriasSel, setCategoriasSel] = useState<string[]>([])

  // Bloque C: Personalidad
  const [llegarEvento, setLlegarEvento] = useState('')
  const [conversar, setConversar] = useState('')
  const [temasEntusiasman, setTemasEntusiasman] = useState('')
  const [temasEvitar, setTemasEvitar] = useState('')
  const [silencios, setSilencios] = useState('')
  const [rol, setRol] = useState('')

  // Bloque D: Logística
  const [comunasSel, setComunasSel] = useState<string[]>([])
  const [disponibilidad, setDisponibilidad] = useState<string[]>([])
  const [presupuesto, setPresupuesto] = useState('')
  const [companiasPref, setCompaniasPref] = useState('')
  const [nuncaHaria, setNuncaHaria] = useState('')
  const [transporte, setTransporte] = useState('')

  // Contactos de emergencia
  const [contactosEmergencia, setContactosEmergencia] = useState<DemoContactoEmergencia[]>([])
  const [nuevoContactoNombre, setNuevoContactoNombre] = useState('')
  const [nuevoContactoTelefono, setNuevoContactoTelefono] = useState('')
  const [nuevoContactoRelacion, setNuevoContactoRelacion] = useState('')

  // Cargar perfil existente
  useEffect(() => {
    if (user) {
      const perfil = demoObtenerPerfil(user.uid)
      if (perfil) {
        setUltimoSabado(perfil.ultimoSabado || '')
        setUltimoFindeDisfrutado(perfil.ultimoFindeDisfrutado || '')
        setDespuesTrabajo(perfil.despuesTrabajo || '')
        setFrecuenciaSocial(perfil.frecuenciaSocial || '')
        setUltimoEvento(perfil.ultimoEvento || '')
        setArtistas(perfil.artistas || '')
        setPeliculaSerie(perfil.peliculaSerie || '')
        setDeporte(perfil.deporte || '')
        setNaturaleza(perfil.naturaleza || '')
        setMascota(perfil.mascota || '')
        setHorarioPreferido(perfil.horarioPreferido || '')
        setLugaresFrecuentes(perfil.lugaresFrecuentes || '')
        setCategoriasSel(perfil.categoriasSel || [])
        setLlegarEvento(perfil.llegarEvento || '')
        setConversar(perfil.conversar || '')
        setTemasEntusiasman(perfil.temasEntusiasman || '')
        setTemasEvitar(perfil.temasEvitar || '')
        setSilencios(perfil.silencios || '')
        setRol(perfil.rol || '')
        setComunasSel(perfil.comunasSel || [])
        setDisponibilidad(perfil.disponibilidad || [])
        setPresupuesto(perfil.presupuesto || '')
        setCompaniasPref(perfil.companiasPref || '')
        setNuncaHaria(perfil.nuncaHaria || '')
        setTransporte(perfil.transporte || '')
      }
      const contactos = demoObtenerContactos(user.uid)
      setContactosEmergencia(contactos)
    }
    setCargando(false)
  }, [user])

  const toggleDisponibilidad = (d: string) => {
    setDisponibilidad(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  const toggleComuna = (c: string) => {
    setComunasSel(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  const toggleCategoria = (c: string) => {
    setCategoriasSel(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
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

  const handleGuardar = () => {
    if (!user) return
    demoGuardarPerfil(user.uid, {
      ultimoSabado, ultimoFindeDisfrutado, despuesTrabajo, frecuenciaSocial, ultimoEvento,
      artistas, peliculaSerie, deporte, naturaleza, mascota, horarioPreferido, lugaresFrecuentes, categoriasSel,
      llegarEvento, conversar, temasEntusiasman, temasEvitar, silencios, rol,
      comunasSel, disponibilidad, presupuesto, companiasPref, nuncaHaria, transporte,
    })
    setGuardado(true)
    setTimeout(() => setGuardado(false), 3000)
  }

  const totalPasos = 4

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Panoramix</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-teal-600 transition">Inicio</Link>
            <Link to="/eventos-rm" className="hover:text-teal-600 transition">Eventos RM</Link>
            <Link to="/perfil" className="text-teal-600">Mi Perfil</Link>
            <Link to="/perfil-profundo" className="hover:text-teal-600 transition">Perfil Profundo</Link>
            <Link to="/mis-panoramas" className="hover:text-teal-600 transition">Mis Panoramas</Link>
            <Link to="/mis-chats" className="hover:text-teal-600 transition">Mis Chats</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-2 -ml-2 text-slate-500">
              <ChevronLeft className="w-4 h-4 mr-1" /> Volver
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Tu perfil de compatibilidad</h1>
          <p className="text-slate-500">Cuanto más completo esté, mejores matches encontrarás.</p>

          {/* Progress */}
          <div className="mt-4 flex items-center gap-2">
            {Array.from({ length: totalPasos }).map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full transition ${
                i + 1 <= paso ? 'bg-teal-500' : 'bg-slate-200'
              }`} />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">Paso {paso} de {totalPasos}</p>
        </div>

        {guardado && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-4 text-green-700 font-medium flex items-center gap-2">
              <Star className="w-4 h-4" /> Perfil guardado correctamente
            </CardContent>
          </Card>
        )}

        {/* LINKS RÁPIDOS */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link to="/perfil-profundo">
            <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 cursor-pointer hover:shadow-md transition">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-800">Perfil Profundo</p>
                  <p className="text-xs text-teal-600">Hábitos, estado emocional, conversación</p>
                </div>
                <ChevronLeft className="w-4 h-4 text-teal-600 rotate-180" />
              </CardContent>
            </Card>
          </Link>
          <Link to="/mis-panoramas">
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 cursor-pointer hover:shadow-md transition">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-amber-800">Mis Panoramas</p>
                  <p className="text-xs text-amber-600">Ver tus panoramas y matches</p>
                </div>
                <LayoutDashboard className="w-4 h-4 text-amber-600" />
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* PASO 1 */}
        {paso === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-teal-100 text-teal-700">Paso 1</Badge>
              <h2 className="text-lg font-bold text-slate-900">Mi día a día (comportamiento real)</h2>
            </div>
            <p className="text-sm text-slate-500">No preguntamos qué te gustaría. Preguntamos qué haces.</p>
            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-1">Describe tu último sábado libre. ¿Qué hiciste?</label>
                  <p className="text-xs text-slate-400 mb-2">Sé honesto/a. Esto define con quién te emparejamos.</p>
                  <Textarea placeholder="Ej: Me levanté tarde, fui a almorzar con mi hermana a un restaurante en Ñuñoa, después paseé al perro y vi una película en casa." value={ultimoSabado} onChange={e => setUltimoSabado(e.target.value)} />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-1">¿Qué hiciste el último fin de semana que disfrutaste?</label>
                  <Textarea placeholder="Ej: Fui a un concierto de Los Bunkers en el Teatro Caupolicán. Fue increíble, aunque fui solo." value={ultimoFindeDisfrutado} onChange={e => setUltimoFindeDisfrutado(e.target.value)} />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-1">En un día común de trabajo, ¿qué haces después de salir?</label>
                  <Textarea placeholder="Ej: Generalmente llego a casa, cocino algo rápido y veo series. A veces salgo a caminar al perro." value={despuesTrabajo} onChange={e => setDespuesTrabajo(e.target.value)} />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Con qué frecuencia sales de tu casa para actividades sociales?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Casi nunca', '1-2 veces al mes', 'Semanalmente', 'Varias veces por semana'].map(o => (
                      <button key={o} onClick={() => setFrecuenciaSocial(o)} className={`p-3 rounded-lg border text-sm transition text-left ${
                        frecuenciaSocial === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Cuándo fue la última vez que fuiste a un concierto, evento o bar?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Nunca', 'Hace más de 1 año', 'Hace meses', 'La semana pasada'].map(o => (
                      <button key={o} onClick={() => setUltimoEvento(o)} className={`p-3 rounded-lg border text-sm transition text-left ${
                        ultimoEvento === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 2 */}
        {paso === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-teal-100 text-teal-700">Paso 2</Badge>
              <h2 className="text-lg font-bold text-slate-900">Intereses y preferencias</h2>
            </div>
            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-1">Menciona 3 artistas o bandas que escuchaste recientemente</label>
                  <Input placeholder="Ej: Chayanne, Mon Laferte, Los Bunkers" value={artistas} onChange={e => setArtistas(e.target.value)} />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-1">¿Qué película o serie viste últimamente que te gustó?</label>
                  <Input placeholder="Ej: " value={peliculaSerie} onChange={e => setPeliculaSerie(e.target.value)} />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Haces deporte o solo lo ves / conversas?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Hago deporte', 'Solo lo veo', 'Converso de deporte', 'Ninguno', 'Me da igual'].map(o => (
                      <button key={o} onClick={() => setDeporte(o)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        deporte === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Con qué frecuencia vas a la naturaleza (parques, trekking, playa)?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Nunca', '1-2 veces al año', 'Mensual', 'Semanal'].map(o => (
                      <button key={o} onClick={() => setNaturaleza(o)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        naturaleza === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Tienes mascota? ¿Te gustaría salir con alguien que también tenga?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Tengo y prefiero con', 'Tengo, me da igual', 'No tengo, me gustaría', 'No tengo, no me interesa'].map(o => (
                      <button key={o} onClick={() => setMascota(o)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        mascota === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Prefieres planes con horario fijo o más relajados?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Estricto', 'Flexible', 'Me da igual'].map(o => (
                      <button key={o} onClick={() => setHorarioPreferido(o)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        horarioPreferido === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-1">¿Qué tipo de lugares frecuentas cuando sales?</label>
                  <Input placeholder="Ej: bares, restaurantes, cines, parques, teatros..." value={lugaresFrecuentes} onChange={e => setLugaresFrecuentes(e.target.value)} />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">Categorías de panoramas que más te interesan</label>
                  <div className="flex flex-wrap gap-2">
                    {categoriasInteres.map(cat => (
                      <button key={cat.id} onClick={() => toggleCategoria(cat.id)} className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-1 transition ${
                        categoriasSel.includes(cat.id) ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 3 */}
        {paso === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-teal-100 text-teal-700">Paso 3</Badge>
              <h2 className="text-lg font-bold text-slate-900">Estilo social y conversación</h2>
            </div>
            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-2">Llegas a un evento donde no conoces a nadie. ¿Qué haces?</label>
                  <div className="space-y-2">
                    {['Me acerco a alguien y hablo', 'Espero a que me hablen', 'Me quedo en un rincón observando', 'Me voy si no conozco a nadie'].map(o => (
                      <button key={o} onClick={() => setLlegarEvento(o)} className={`w-full p-3 rounded-lg border text-sm transition text-left ${
                        llegarEvento === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">En una conversación, ¿tiendes a hablar más o a escuchar más?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Hablo más', 'Escucho más', 'Equilibro', 'Depende del tema'].map(o => (
                      <button key={o} onClick={() => setConversar(o)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        conversar === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-1">¿Qué temas te entusiasman conversar?</label>
                  <Textarea placeholder="Ej: música, viajes, comida, tecnología, deportes, series..." value={temasEntusiasman} onChange={e => setTemasEntusiasman(e.target.value)} />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-1">¿Qué temas prefieres evitar en una primera salida?</label>
                  <Textarea placeholder="Ej: religión, política, dinero, ex-parejas..." value={temasEvitar} onChange={e => setTemasEvitar(e.target.value)} />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Te gusta conversar durante toda la actividad o prefieres silencios cómodos?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Siempre conversando', 'Mixto', 'Silencios están bien'].map(o => (
                      <button key={o} onClick={() => setSilencios(o)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        silencios === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Eres de los que organiza o de los que se suma a planes?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Organizo', 'Me sumo', 'Ambos según el tema'].map(o => (
                      <button key={o} onClick={() => setRol(o)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        rol === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 4 */}
        {paso === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-teal-100 text-teal-700">Paso 4</Badge>
              <h2 className="text-lg font-bold text-slate-900">Logística y disponibilidad</h2>
            </div>
            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-teal-500" /> ¿En qué comunas te mueves habitualmente?
                  </label>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg">
                    {comunasRM.map(c => (
                      <button key={c} onClick={() => toggleComuna(c)} className={`px-3 py-1 rounded-full border text-xs transition ${
                        comunasSel.includes(c) ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{c}</button>
                    ))}
                  </div>
                  {comunasSel.length > 0 && (
                    <p className="text-xs text-slate-400 mt-1">Seleccionadas: {comunasSel.join(', ')}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-teal-500" /> ¿Qué horario prefieres para salir?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Mañana', 'Tarde', 'Noche', 'Fin de semana'].map(d => (
                      <button key={d} onClick={() => toggleDisponibilidad(d)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        disponibilidad.includes(d) ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{d}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2 flex items-center gap-1">
                    <Wallet className="w-4 h-4 text-teal-500" /> ¿Cuál es tu presupuesto típico para una salida?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['$0 (gratis)', '$5.000 - $15.000', '$15.000 - $30.000', '$30.000 - $60.000', '$60.000+'].map(o => (
                      <button key={o} onClick={() => setPresupuesto(o)} className={`p-3 rounded-lg border text-sm transition text-left ${
                        presupuesto === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2 flex items-center gap-1">
                    <Heart className="w-4 h-4 text-teal-500" /> ¿Qué tipo de compañía prefieres para salir?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Femenina', 'Masculina', 'Me es indiferente'].map(o => (
                      <button key={o} onClick={() => setCompaniasPref(o)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        companiasPref === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-1">¿Hay algún tipo de panorama que NUNCA harías?</label>
                  <Textarea placeholder="Ej: karaoke, discotecas, fútbol, trekking extremo..." value={nuncaHaria} onChange={e => setNuncaHaria(e.target.value)} />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">¿Estarías dispuesto/a a compartir transporte o prefieres llegar solo?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Comparto transporte', 'Llego solo siempre', 'Depende del lugar'].map(o => (
                      <button key={o} onClick={() => setTransporte(o)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        transporte === o ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o}</button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CONTACTOS DE EMERGENCIA */}
        <div className="space-y-4 mt-8">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" /> Seguridad</Badge>
            <h2 className="text-lg font-bold text-slate-900">Contactos de emergencia</h2>
          </div>
          <p className="text-sm text-slate-500">
            Obligatorio: registra al menos 1 contacto para el botón SOS. En caso de emergencia, recibirán tu ubicación.
          </p>
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
                <div className="grid grid-cols-3 gap-3">
                  <Input placeholder="Nombre" value={nuevoContactoNombre} onChange={e => setNuevoContactoNombre(e.target.value)} />
                  <Input placeholder="Teléfono" value={nuevoContactoTelefono} onChange={e => setNuevoContactoTelefono(e.target.value)} />
                  <Input placeholder="Relación" value={nuevoContactoRelacion} onChange={e => setNuevoContactoRelacion(e.target.value)} />
                </div>
              )}
              {contactosEmergencia.length < 2 && (
                <Button onClick={agregarContacto} disabled={!nuevoContactoNombre.trim() || !nuevoContactoTelefono.trim()} variant="outline" className="w-full gap-1">
                  <Phone className="w-4 h-4" /> Agregar contacto de emergencia
                </Button>
              )}
              {contactosEmergencia.length >= 2 && (
                <p className="text-xs text-slate-400 text-center">Máximo 2 contactos de emergencia configurados.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* BOTONES NAVEGACIÓN */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="outline" onClick={() => setPaso(p => Math.max(1, p - 1))} disabled={paso === 1}>Anterior</Button>
          <div className="flex gap-2">
            {paso < totalPasos ? (
              <Button onClick={() => setPaso(p => Math.min(totalPasos, p + 1))} className="bg-teal-600 hover:bg-teal-700">Siguiente</Button>
            ) : (
              <Button onClick={handleGuardar} className="bg-teal-600 hover:bg-teal-700 gap-1">
                <Save className="w-4 h-4" /> Guardar perfil
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
