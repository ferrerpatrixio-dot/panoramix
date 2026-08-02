import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  demoListarUsuarios, demoDesactivarUsuario, demoActivarUsuario,
  demoObtenerEvaluacionesNegativas, demoObtenerReclamos, demoResponderReclamo,
  demoGuardarReclamo, type DemoUser, type DemoEvaluacion, type DemoReclamo,
} from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Users, Shield, Star, AlertTriangle, CheckCircle, UserX, UserCheck,
  MessageSquare, Eye, Clock, Ban, Unlock
} from 'lucide-react'

export default function Admin() {
  const [tab, setTab] = useState<'usuarios' | 'evaluaciones' | 'reclamos'>('usuarios')
  const [usuarios, setUsuarios] = useState<DemoUser[]>([])
  const [evaluaciones, setEvaluaciones] = useState<DemoEvaluacion[]>([])
  const [reclamos, setReclamos] = useState<DemoReclamo[]>([])
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})

  useEffect(() => {
    setUsuarios(demoListarUsuarios())
    setEvaluaciones(demoObtenerEvaluacionesNegativas())
    setReclamos(demoObtenerReclamos())
  }, [tab])

  const handleDesactivar = (uid: string) => {
    demoDesactivarUsuario(uid)
    setUsuarios(demoListarUsuarios())
  }

  const handleActivar = (uid: string) => {
    demoActivarUsuario(uid)
    setUsuarios(demoListarUsuarios())
  }

  const handleResponder = (id: string) => {
    const resp = respuestas[id]
    if (!resp?.trim()) return
    demoResponderReclamo(id, resp)
    setReclamos(demoObtenerReclamos())
    setRespuestas(prev => ({ ...prev, [id]: '' }))
  }

  const simularReclamo = () => {
    demoGuardarReclamo({
      tipo: 'evaluacion_negativa',
      uidAfectado: 'demo_uid_1',
      nombreAfectado: 'Carla',
      descripcion: 'El usuario no llegó al panorama y no avisó. Solicito revisión.',
      estrellas: 1,
      estado: 'pendiente',
    })
    setReclamos(demoObtenerReclamos())
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="text-xl font-bold tracking-tight">Consola Admin · Panoramix</span>
          </div>
          <Link to="/" className="text-sm text-slate-400 hover:text-white transition">Volver al sitio</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Panel de Administración</h1>
          <p className="text-slate-500">Gestiona usuarios, evaluaciones negativas y reclamos.</p>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'usuarios' as const, label: 'Usuarios', icon: <Users className="w-4 h-4" />, count: usuarios.length },
            { id: 'evaluaciones' as const, label: 'Evaluaciones Negativas', icon: <Star className="w-4 h-4" />, count: evaluaciones.length },
            { id: 'reclamos' as const, label: 'Reclamos / Descargos', icon: <AlertTriangle className="w-4 h-4" />, count: reclamos.length },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                tab === t.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border'
              }`}
            >
              {t.icon} {t.label}
              <Badge className={tab === t.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}>{t.count}</Badge>
            </button>
          ))}
        </div>

        {/* USUARIOS */}
        {tab === 'usuarios' && (
          <div className="space-y-4">
            {usuarios.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-slate-500">No hay usuarios registrados.</CardContent></Card>
            ) : (
              usuarios.map(u => (
                <Card key={u.uid} className={u.activo === false ? 'opacity-60 border-red-200' : ''}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        u.activo === false ? 'bg-red-100 text-red-700' : 'bg-teal-100 text-teal-700'
                      }`}>
                        {u.displayName?.[0] || u.email[0]}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{u.displayName || u.email}</p>
                        <p className="text-xs text-slate-500">{u.email} · Registro: {new Date(u.createdAt).toLocaleDateString('es-CL')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {u.activo === false ? (
                        <>
                          <Badge className="bg-red-100 text-red-700"><Ban className="w-3 h-3 mr-1" /> Desactivado</Badge>
                          <Button size="sm" variant="outline" className="gap-1" onClick={() => handleActivar(u.uid)}>
                            <Unlock className="w-3.5 h-3.5" /> Reactivar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Activo</Badge>
                          <Button size="sm" variant="outline" className="gap-1 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleDesactivar(u.uid)}>
                            <UserX className="w-3.5 h-3.5" /> Desactivar
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* EVALUACIONES NEGATIVAS */}
        {tab === 'evaluaciones' && (
          <div className="space-y-4">
            {evaluaciones.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">No hay evaluaciones negativas</p>
                  <p className="text-sm text-slate-400 mt-1">Todas las evaluaciones son de 3+ estrellas.</p>
                </CardContent>
              </Card>
            ) : (
              evaluaciones.map(e => (
                <Card key={e.id} className="border-red-200">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-700">{e.estrellas}⭐</Badge>
                        <span className="text-sm font-medium text-slate-900">{e.evaluadoNombre}</span>
                      </div>
                      <span className="text-xs text-slate-400">{new Date(e.createdAt).toLocaleDateString('es-CL')}</span>
                    </div>
                    {e.comentario && <p className="text-sm text-slate-600">"{e.comentario}"</p>}
                    <div className="flex gap-2 text-xs text-slate-500">
                      <span>Cumplió: {e.cumplioPanorama ? 'Sí' : 'No'}</span>
                      <span>·</span>
                      <span>Llegó a tiempo: {e.llegoATiempo ? 'Sí' : 'No'}</span>
                      <span>·</span>
                      <span>Volvería: {e.volveriaAJuntarse ? 'Sí' : 'No'}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* RECLAMOS */}
        {tab === 'reclamos' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-500">Bandeja de reclamos y descargos de usuarios.</p>
              <Button size="sm" variant="outline" onClick={simularReclamo} className="gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Simular reclamo de prueba
              </Button>
            </div>

            {reclamos.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">Sin reclamos pendientes</p>
                  <p className="text-sm text-slate-400 mt-1">La bandeja está vacía.</p>
                </CardContent>
              </Card>
            ) : (
              reclamos.map(r => (
                <Card key={r.id} className={r.estado === 'pendiente' ? 'border-amber-200' : 'border-green-200'}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={
                          r.tipo === 'evaluacion_negativa' ? 'bg-red-100 text-red-700' :
                          r.tipo === 'reporte_usuario' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }>
                          {r.tipo === 'evaluacion_negativa' ? 'Evaluación negativa' :
                           r.tipo === 'reporte_usuario' ? 'Reporte' : 'Descargo'}
                        </Badge>
                        <span className="text-sm font-medium text-slate-900">{r.nombreAfectado}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={r.estado === 'pendiente' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}>
                          {r.estado === 'pendiente' ? <><Clock className="w-3 h-3 mr-1" /> Pendiente</> : <><CheckCircle className="w-3 h-3 mr-1" /> Revisado</>}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{r.descripcion}</p>
                    {r.estrellas && <p className="text-xs text-slate-500">Calificación: {r.estrellas} estrellas</p>}

                    {r.respuestaAdmin ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-green-700 mb-1">Respuesta del administrador:</p>
                        <p className="text-sm text-green-800">{r.respuestaAdmin}</p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Escribe una respuesta o decisión..."
                          className="flex-1 text-sm"
                          rows={2}
                          value={respuestas[r.id] || ''}
                          onChange={e => setRespuestas(prev => ({ ...prev, [r.id]: e.target.value }))}
                        />
                        <Button size="sm" className="self-end bg-teal-600 hover:bg-teal-700" onClick={() => handleResponder(r.id)}>
                          Responder
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
