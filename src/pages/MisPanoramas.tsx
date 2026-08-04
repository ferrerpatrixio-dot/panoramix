import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import {
  demoObtenerPanoramasUsuario,
  demoObtenerPanoramasConInteres,
  demoSeleccionarCompanero,
  demoCerrarPanorama,
  demoEliminarPanorama,
  type DemoPanorama,
  type DemoInteresado,
} from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import NotificacionesBadge from '@/components/NotificacionesBadge'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users, ChevronLeft, MapPin, Calendar, DollarSign, UserCircle,
  Trash2, XCircle, CheckCircle, Clock, Sparkles, MessageCircle,
  Star, Heart, Frown, MapPinned,
} from 'lucide-react'

export default function MisPanoramas() {
  const { user } = useAuth()
  const [misPanoramas, setMisPanoramas] = useState<DemoPanorama[]>([])
  const [panoramasSeleccionado, setPanoramasSeleccionado] = useState<DemoPanorama[]>([])
  const [panoramasRechazado, setPanoramasRechazado] = useState<DemoPanorama[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (user) cargarDatos()
    setCargando(false)
  }, [user])

  const cargarDatos = () => {
    if (!user) return
    // Panoramas que yo creé
    const creados = demoObtenerPanoramasUsuario(user.uid)
    setMisPanoramas(creados)

    // Panoramas donde expresé interés
    const conInteres = demoObtenerPanoramasConInteres(user.uid)
    const seleccionado = conInteres.filter(p => p.seleccionadoId === user.uid)
    const rechazado = conInteres.filter(p => p.estado === 'no_disponible' && p.seleccionadoId !== user.uid)
    setPanoramasSeleccionado(seleccionado)
    setPanoramasRechazado(rechazado)
  }

  const handleSeleccionar = (panoramaId: string, uid: string) => {
    if (!confirm('¿Seleccionar a esta persona como tu compañero/a? Una vez seleccionado, el panorama quedará no disponible para los demás.')) return
    demoSeleccionarCompanero(panoramaId, uid)
    cargarDatos()
  }

  const handleCerrar = (id: string) => {
    demoCerrarPanorama(id)
    cargarDatos()
  }

  const handleEliminar = (id: string) => {
    if (confirm('¿Eliminar este panorama?')) {
      demoEliminarPanorama(id)
      cargarDatos()
    }
  }

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
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Panoramix</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-teal-600 transition">Inicio</Link>
            <Link to="/feed" className="hover:text-teal-600 transition">Descubrir</Link>
            <Link to="/eventos-rm" className="hover:text-teal-600 transition">Eventos RM</Link>
            <Link to="/perfil" className="hover:text-teal-600 transition">Mi Perfil</Link>
            <Link to="/mis-panoramas" className="text-teal-600">Mis Panoramas</Link>
            <Link to="/mis-chats" className="hover:text-teal-600 transition">Mis Chats</Link>
            <NotificacionesBadge />
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-slate-500">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Mis Panoramas</h1>
          <p className="text-slate-500">Tus panoramas, matches y selecciones.</p>
        </div>

        {/* CTA crear nuevo */}
        <div className="flex gap-3 mb-6">
          <Link to="/crear-panorama" className="flex-1">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 gap-1">
              <Sparkles className="w-4 h-4" /> Crear nuevo panorama
            </Button>
          </Link>
          <Link to="/feed">
            <Button variant="outline" className="gap-1">
              <MapPinned className="w-4 h-4" /> Descubrir
            </Button>
          </Link>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECCIÓN: Fui seleccionado en panoramas de otros
            ═══════════════════════════════════════════════════════════ */}
        {panoramasSeleccionado.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-amber-700 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5" /> ¡Te seleccionaron!
            </h2>
            <div className="space-y-3">
              {panoramasSeleccionado.map(p => (
                <Card key={p.id} className="border-2 border-amber-300 overflow-hidden">
                  <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">¡Fuiste seleccionado como compañero!</span>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-bold text-slate-900">{p.actividad}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      <Badge variant="outline"><MapPin className="w-3 h-3 mr-1" />{p.lugar}</Badge>
                      <Badge variant="outline"><Calendar className="w-3 h-3 mr-1" />{p.fecha} {p.hora}</Badge>
                    </div>
                    <Link to={`/chat/${p.id}/${p.uid}`}>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 gap-1">
                        <MessageCircle className="w-4 h-4" /> Chatear y coordinar
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            SECCIÓN: Mis panoramas creados
            ═══════════════════════════════════════════════════════════ */}
        {misPanoramas.length === 0 ? (
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-8 text-center">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-700">Aún no tienes panoramas</h3>
              <p className="text-sm text-slate-500 mt-1 mb-4">Crea tu primer panorama y encuentra compañía.</p>
              <Link to="/crear-panorama">
                <Button className="bg-teal-600 hover:bg-teal-700">Crear panorama</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            {misPanoramas.map(p => (
              <Card key={p.id} className={`border-2 overflow-hidden ${
                p.estado === 'activo' ? 'border-teal-200' :
                p.estado === 'no_disponible' ? 'border-amber-200' :
                'border-slate-200 opacity-70'
              }`}>
                {/* Header */}
                <div className={`p-4 text-white ${
                  p.estado === 'activo' ? 'bg-gradient-to-r from-teal-500 to-cyan-600' :
                  p.estado === 'no_disponible' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                  'bg-slate-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {p.estado === 'activo' && <span className="text-sm font-medium">🟢 Activo</span>}
                      {p.estado === 'no_disponible' && (
                        <>
                          <Star className="w-4 h-4" />
                          <span className="text-sm font-medium">Compañero seleccionado</span>
                        </>
                      )}
                      {p.estado === 'cerrado' && <span className="text-sm font-medium">⚫ Cerrado</span>}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEliminar(p.id)} className="p-1 hover:bg-white/20 rounded transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {p.estado === 'activo' && (
                        <button onClick={() => handleCerrar(p.id)} className="p-1 hover:bg-white/20 rounded transition" title="Cerrar panorama">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
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

                  {/* INTERESADOS (solo si soy el dueño y está activo) */}
                  {p.estado === 'activo' && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-1">
                        <Heart className="w-4 h-4 text-teal-500" />
                        Personas interesadas ({p.interesados.length})
                      </p>
                      {p.interesados.length === 0 ? (
                        <p className="text-sm text-slate-400 italic">Aún nadie ha mostrado interés. Comparte tu panorama para que más personas lo vean.</p>
                      ) : (
                        <div className="space-y-2">
                          {p.interesados.map((inter: DemoInteresado) => (
                            <div key={inter.uid} className="p-3 rounded-lg border bg-white border-slate-200 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                                  {inter.nombre[0]}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-900">{inter.nombre}</p>
                                  <p className="text-xs text-slate-500">{inter.compatibilidad}% compatibilidad</p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="text-xs h-7 px-2 bg-teal-600 hover:bg-teal-700"
                                onClick={() => handleSeleccionar(p.id, inter.uid)}
                              >
                                <CheckCircle className="w-3 h-3 mr-1" /> Seleccionar
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SELECCIONADO (si ya elegí a alguien) */}
                  {p.estado === 'no_disponible' && p.seleccionadoId && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-amber-700 mb-3 flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500" />
                        Compañero seleccionado
                      </p>
                      {p.matches.filter(m => m.estado === 'aceptado').map(m => (
                        <div key={m.matchUserId} className="p-3 rounded-lg border bg-amber-50 border-amber-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                              {m.matchUserName[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{m.matchUserName}</p>
                              <p className="text-xs text-slate-500">{m.compatibilidad}% compatibilidad</p>
                            </div>
                          </div>
                          <Link to={`/chat/${p.id}/${m.matchUserId}`}>
                            <Button size="sm" className="text-xs h-7 px-2 bg-amber-600 hover:bg-amber-700 text-white">
                              <MessageCircle className="w-3 h-3 mr-1" /> Chatear
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            SECCIÓN: Rechazados (donde mostré interés pero no me eligieron)
            ═══════════════════════════════════════════════════════════ */}
        {panoramasRechazado.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-slate-500 mb-3 flex items-center gap-2">
              <Frown className="w-5 h-5" /> No disponibles
            </h2>
            <p className="text-sm text-slate-400 mb-3">Panoramas donde mostraste interés pero el creador ya seleccionó a alguien más.</p>
            <div className="space-y-2">
              {panoramasRechazado.map(p => (
                <Card key={p.id} className="border-slate-200 opacity-50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <Frown className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-500">{p.actividad}</p>
                      <p className="text-xs text-slate-400">{p.lugar} · {p.fecha}</p>
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
