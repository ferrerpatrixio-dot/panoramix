import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { demoObtenerPanoramasUsuario, demoActualizarMatch, demoCerrarPanorama, demoEliminarPanorama, type DemoPanorama } from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users, ChevronLeft, MapPin, Calendar, DollarSign, UserCircle,
  Trash2, XCircle, CheckCircle, Clock, Sparkles, Eye, MessageCircle
} from 'lucide-react'

export default function MisPanoramas() {
  const { user } = useAuth()
  const [panoramas, setPanoramas] = useState<DemoPanorama[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (user) {
      const p = demoObtenerPanoramasUsuario(user.uid)
      setPanoramas(p)
    }
    setCargando(false)
  }, [user])

  const handleAceptarMatch = (panoramaId: string, matchUserId: string) => {
    demoActualizarMatch(panoramaId, matchUserId, 'aceptado')
    recargar()
  }

  const handleRechazarMatch = (panoramaId: string, matchUserId: string) => {
    demoActualizarMatch(panoramaId, matchUserId, 'rechazado')
    recargar()
  }

  const handleCerrar = (id: string) => {
    demoCerrarPanorama(id)
    recargar()
  }

  const handleEliminar = (id: string) => {
    if (confirm('¿Eliminar este panorama?')) {
      demoEliminarPanorama(id)
      recargar()
    }
  }

  const recargar = () => {
    if (user) setPanoramas(demoObtenerPanoramasUsuario(user.uid))
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
            <Link to="/eventos-rm" className="hover:text-teal-600 transition">Eventos RM</Link>
            <Link to="/perfil" className="hover:text-teal-600 transition">Mi Perfil</Link>
            <Link to="/mis-panoramas" className="text-teal-600">Mis Panoramas</Link>
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
          <p className="text-slate-500">Administra tus panoramas y revisa tus matches.</p>
        </div>

        {/* CTA crear nuevo */}
        <div className="flex gap-3 mb-6">
          <Link to="/crear-panorama" className="flex-1">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 gap-1">
              <Sparkles className="w-4 h-4" /> Crear nuevo panorama
            </Button>
          </Link>
          <Link to="/perfil">
            <Button variant="outline" className="gap-1">
              <Eye className="w-4 h-4" /> Ver perfil
            </Button>
          </Link>
        </div>

        {panoramas.length === 0 ? (
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
            {panoramas.map(p => (
              <Card key={p.id} className={`border-2 overflow-hidden ${
                p.estado === 'activo' ? 'border-teal-200' : 'border-slate-200 opacity-70'
              }`}>
                {/* Header */}
                <div className={`p-4 text-white ${
                  p.estado === 'activo' ? 'bg-gradient-to-r from-teal-500 to-cyan-600' : 'bg-slate-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {p.estado === 'activo' ? '🟢 Activo' : '⚫ Cerrado'}
                    </span>
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

                  {/* Matches */}
                  {p.matches.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-teal-500" />
                        Matches ({p.matches.length})
                      </p>
                      <div className="space-y-2">
                        {p.matches.map(m => (
                          <div key={m.matchUserId} className={`p-3 rounded-lg border flex items-center justify-between ${
                            m.estado === 'aceptado' ? 'bg-green-50 border-green-200' :
                            m.estado === 'rechazado' ? 'bg-slate-50 border-slate-200 opacity-60' :
                            'bg-white border-slate-200'
                          }`}>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                                {m.matchUserName[0]}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">{m.matchUserName}</p>
                                <p className="text-xs text-slate-500">{m.compatibilidad}% compatibilidad</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {m.estado === 'pendiente' ? (
                                <>
                                  <Button size="sm" variant="outline" className="text-xs h-7 px-2 border-green-300 text-green-700 hover:bg-green-50" onClick={() => handleAceptarMatch(p.id, m.matchUserId)}>
                                    <CheckCircle className="w-3 h-3 mr-1" /> Aceptar
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-xs h-7 px-2 border-red-300 text-red-700 hover:bg-red-50" onClick={() => handleRechazarMatch(p.id, m.matchUserId)}>
                                    <XCircle className="w-3 h-3 mr-1" /> Rechazar
                                  </Button>
                                </>
                              ) : m.estado === 'aceptado' ? (
                                <Badge className="bg-green-100 text-green-700">Aceptado ✓</Badge>
                              ) : (
                                <Badge variant="outline" className="text-slate-400">Rechazado</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
