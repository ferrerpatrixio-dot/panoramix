import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import {
  demoObtenerFeedPersonalizado,
  demoExpresarInteres,
  demoObtenerPanoramasConInteres,
  type DemoPanorama,
} from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users, ChevronLeft, MapPin, Calendar, DollarSign, UserCircle,
  Music, Dog, Coffee, Ticket, Bike, Film, UtensilsCrossed,
  Heart, Star, Frown, Sparkles, Search, Filter,
} from 'lucide-react'

const CATEGORIAS = [
  { id: 'todos', label: 'Todos', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'concierto', label: 'Conciertos', icon: <Music className="w-4 h-4" /> },
  { id: 'paseo', label: 'Paseos', icon: <Dog className="w-4 h-4" /> },
  { id: 'bar', label: 'Bares/Cafés', icon: <Coffee className="w-4 h-4" /> },
  { id: 'cine', label: 'Cine/Teatro', icon: <Film className="w-4 h-4" /> },
  { id: 'trekking', label: 'Trekking', icon: <Bike className="w-4 h-4" /> },
  { id: 'comida', label: 'Restaurantes', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: 'evento', label: 'Eventos', icon: <Ticket className="w-4 h-4" /> },
]

export default function FeedPanoramas() {
  const { user } = useAuth()
  const [panoramas, setPanoramas] = useState<DemoPanorama[]>([])
  const [misIntereses, setMisIntereses] = useState<DemoPanorama[]>([])
  const [categoria, setCategoria] = useState('todos')
  const [cargando, setCargando] = useState(true)
  const [notificacion, setNotificacion] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      cargarDatos()
    }
    setCargando(false)
  }, [user])

  const cargarDatos = () => {
    if (!user) return
    const feed = demoObtenerFeedPersonalizado(user.uid)
    setPanoramas(feed)
    const interesados = demoObtenerPanoramasConInteres(user.uid)
    setMisIntereses(interesados)
  }

  const handleMeInteresa = (panorama: DemoPanorama) => {
    if (!user) return
    const ok = demoExpresarInteres(panorama.id, user.uid, user.displayName || user.email)
    if (ok) {
      setNotificacion('¡Interés enviado! El creador del panorama revisará tu perfil.')
      setTimeout(() => setNotificacion(null), 4000)
      cargarDatos()
    }
  }

  // Filtrar por categoría
  const filtrados = categoria === 'todos'
    ? panoramas
    : panoramas.filter(p => {
        const actLower = p.actividad.toLowerCase()
        switch (categoria) {
          case 'concierto': return actLower.includes('concierto') || actLower.includes('música')
          case 'paseo': return actLower.includes('paseo') || actLower.includes('perro') || actLower.includes('parque')
          case 'bar': return actLower.includes('bar') || actLower.includes('cerveza') || actLower.includes('café')
          case 'cine': return actLower.includes('cine') || actLower.includes('teatro') || actLower.includes('película')
          case 'trekking': return actLower.includes('trek') || actLower.includes('cerro') || actLower.includes('sendero')
          case 'comida': return actLower.includes('restaurant') || actLower.includes('comida') || actLower.includes('cena')
          case 'evento': return actLower.includes('evento') || actLower.includes('feria') || actLower.includes('festival')
          default: return true
        }
      })

  // Separar por estado para el usuario actual
  const disponibles = filtrados.filter(p => {
    const soyInteresado = p.interesados.some(i => i.uid === user?.uid)
    const fuiSeleccionado = p.seleccionadoId === user?.uid
    const fuiRechazado = p.estado === 'no_disponible' && soyInteresado && !fuiSeleccionado
    return !fuiRechazado // Ocultar los que me rechazaron
  })

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Cargando panoramas...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Panoramix</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-teal-600 transition">Inicio</Link>
            <Link to="/feed" className="text-teal-600">Descubrir</Link>
            <Link to="/eventos-rm" className="hover:text-teal-600 transition">Eventos RM</Link>
            <Link to="/mis-panoramas" className="hover:text-teal-600 transition">Mis Panoramas</Link>
            <Link to="/perfil" className="hover:text-teal-600 transition">Mi Perfil</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-slate-500">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Descubre panoramas</h1>
          <p className="text-slate-500">Personas buscan compañía para actividades que podrían interesarte.</p>
        </div>

        {/* Notificación */}
        {notificacion && (
          <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-800 flex items-center gap-2">
            <Heart className="w-4 h-4 text-teal-600" />
            {notificacion}
          </div>
        )}

        {/* Filtros de categoría */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">Filtrar por categoría</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIAS.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  categoria === cat.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de panoramas */}
        {disponibles.length === 0 ? (
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-8 text-center">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-700">No hay panoramas disponibles</h3>
              <p className="text-sm text-slate-500 mt-1">Aún no hay panoramas que coincidan con tus intereses. Vuelve más tarde o crea el tuyo.</p>
              <Link to="/crear-panorama" className="inline-block mt-4">
                <Button className="bg-teal-600 hover:bg-teal-700">Crear mi panorama</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {disponibles.map(p => {
              const soyInteresado = p.interesados.some(i => i.uid === user?.uid)
              const fuiSeleccionado = p.seleccionadoId === user?.uid
              const miInteres = p.interesados.find(i => i.uid === user?.uid)

              return (
                <Card key={p.id} className={`overflow-hidden border-2 ${
                  fuiSeleccionado ? 'border-amber-300' :
                  soyInteresado ? 'border-teal-200' :
                  'border-slate-200'
                }`}>
                  {/* Estado visual en header */}
                  <div className={`p-3 text-white flex items-center justify-between ${
                    fuiSeleccionado ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                    soyInteresado ? 'bg-gradient-to-r from-teal-500 to-cyan-600' :
                    'bg-gradient-to-r from-slate-600 to-slate-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      {fuiSeleccionado ? (
                        <>
                          <Star className="w-4 h-4" />
                          <span className="text-sm font-medium">¡Fuiste seleccionado!</span>
                        </>
                      ) : soyInteresado ? (
                        <>
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-medium">Interés enviado</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm font-medium">Panorama abierto</span>
                        </>
                      )}
                    </div>
                    {miInteres && (
                      <Badge className="bg-white/20 text-white border-0 text-xs">
                        {miInteres.compatibilidad}% compatibilidad
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-5 space-y-4">
                    {/* Info del panorama */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{p.actividad}</h3>
                      {p.descripcionGenerada && (
                        <p className="text-sm text-slate-600 mt-1">{p.descripcionGenerada}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2 text-xs text-slate-500">
                        <Badge variant="outline"><MapPin className="w-3 h-3 mr-1" />{p.lugar}</Badge>
                        <Badge variant="outline"><Calendar className="w-3 h-3 mr-1" />{p.fecha} {p.hora}</Badge>
                        <Badge variant="outline"><DollarSign className="w-3 h-3 mr-1" />{p.presupuesto || 'Gratis'}</Badge>
                        {p.companiasPref && (
                          <Badge variant="outline"><UserCircle className="w-3 h-3 mr-1" />{p.companiasPref}</Badge>
                        )}
                      </div>
                    </div>

                    {/* Info del creador */}
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-teal-700 font-bold">
                        {p.actividad[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Creador del panorama</p>
                        <p className="text-xs text-slate-500">{p.interesados.length} persona{p.interesados.length !== 1 ? 's' : ''} interesadas</p>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-2 pt-1">
                      {fuiSeleccionado ? (
                        <Link to={`/chat/${p.id}/${p.uid}`} className="flex-1">
                          <Button className="w-full bg-amber-600 hover:bg-amber-700 gap-1">
                            <Star className="w-4 h-4" /> Chatear con tu compañero
                          </Button>
                        </Link>
                      ) : soyInteresado ? (
                        <Button disabled className="w-full bg-slate-200 text-slate-500 cursor-not-allowed gap-1">
                          <Heart className="w-4 h-4" /> Esperando respuesta del creador
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleMeInteresa(p)}
                          className="w-full bg-teal-600 hover:bg-teal-700 gap-1"
                        >
                          <Heart className="w-4 h-4" /> Me interesa
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Panoramas donde fui rechazado */}
        {misIntereses.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-slate-700 mb-3">Historial</h2>
            <div className="space-y-2">
              {misIntereses
                .filter(p => p.estado === 'no_disponible' && p.seleccionadoId !== user?.uid)
                .map(p => (
                  <Card key={p.id} className="border-slate-200 opacity-60">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Frown className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-500">{p.actividad}</p>
                        <p className="text-xs text-slate-400">El creador ya seleccionó a alguien más</p>
                      </div>
                      <Badge variant="outline" className="text-slate-400">No disponible</Badge>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
