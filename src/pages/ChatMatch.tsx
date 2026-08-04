import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import {
  demoObtenerPanorama,
  demoObtenerMensajes,
  demoGuardarMensaje,
  demoMarcarLeido,
  demoObtenerUsuario,
  demoObtenerPerfilPublico,
  type DemoMensajeChat,
  type DemoPerfilPublico,
} from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  ChevronLeft, Send, Shield, MapPin, Calendar, User,
  CheckCircle, AlertTriangle, MessageCircle, Eye,
  Heart, Wallet, Clock, MapPinned, Ban, Sparkles,
  MessageSquare
} from 'lucide-react'
import NotificacionesBadge from '@/components/NotificacionesBadge'

const SUGERENCIAS = [
  '¡Hola! ¿Ya tienes entrada para el evento?',
  '¿Te parece si nos encontramos en la entrada principal?',
  '¿A qué hora piensas llegar? Yo prefiero ir un poco antes.',
  '¿Sabes si hay estacionamiento cerca?',
  'Perfecto, nos vemos ahí. ¡Llevo mi entrada lista!',
]

function previewKey(panoramaId: string, matchUserId: string) {
  return `preview_seen_${panoramaId}_${matchUserId}`
}

export default function ChatMatch() {
  const { panoramaId, matchUserId } = useParams<{ panoramaId: string; matchUserId: string }>()
  const { user } = useAuth()
  const [mensajes, setMensajes] = useState<DemoMensajeChat[]>([])
  const [input, setInput] = useState('')
  const [panorama, setPanorama] = useState<any>(null)
  const [matchInfo, setMatchInfo] = useState<any>(null)
  const [perfilPublico, setPerfilPublico] = useState<DemoPerfilPublico | null>(null)
  const [checklistCompleto, setChecklistCompleto] = useState(false)
  const [previewAceptado, setPreviewAceptado] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [checks, setChecks] = useState({
    lugarPublico: false,
    aviseContacto: false,
    llegarSeparados: false,
    compartiUbicacion: false,
  })

  useEffect(() => {
    if (!panoramaId || !matchUserId || !user) return

    const p = demoObtenerPanorama(panoramaId)
    if (p) {
      setPanorama(p)
      const esDueño = user.uid === p.uid
      if (esDueño) {
        const m = p.matches.find((x: any) => x.matchUserId === matchUserId)
        if (m) setMatchInfo(m)
      } else {
        const dueño = demoObtenerUsuario(p.uid)
        const miInteres = p.interesados.find((i: any) => i.uid === user.uid)
        if (dueño) {
          setMatchInfo({
            matchUserId: p.uid,
            matchUserName: dueño.displayName || dueño.email,
            estado: 'aceptado',
            compatibilidad: miInteres?.compatibilidad || 0,
            createdAt: p.createdAt,
          })
        }
      }
    }

    const yaVio = localStorage.getItem(previewKey(panoramaId, matchUserId)) === 'true'
    setPreviewAceptado(yaVio)

    cargarMensajes()
    demoMarcarLeido(panoramaId, matchUserId, user.uid)
  }, [panoramaId, matchUserId, user])

  useEffect(() => {
    if (!panorama || !user) return
    const otroUid = panorama.uid === user.uid ? matchUserId : panorama.uid
    if (otroUid) {
      const perfil = demoObtenerPerfilPublico(otroUid)
      setPerfilPublico(perfil)
    }
  }, [panorama, user, matchUserId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const cargarMensajes = () => {
    if (!panoramaId || !matchUserId) return
    const msgs = demoObtenerMensajes(panoramaId, matchUserId)
    setMensajes(msgs)
  }

  const aceptarPreview = () => {
    if (!panoramaId || !matchUserId) return
    localStorage.setItem(previewKey(panoramaId, matchUserId), 'true')
    setPreviewAceptado(true)
  }

  const handleEnviar = () => {
    if (!input.trim() || !panoramaId || !matchUserId || !user) return
    demoGuardarMensaje(panoramaId, matchUserId, user.uid, user.displayName || user.email, input.trim())
    setInput('')
    cargarMensajes()
    inputRef.current?.focus()
  }

  const handleSugerencia = (texto: string) => {
    if (!panoramaId || !matchUserId || !user) return
    demoGuardarMensaje(panoramaId, matchUserId, user.uid, user.displayName || user.email, texto)
    cargarMensajes()
  }

  const allChecks = checks.lugarPublico && checks.aviseContacto && checks.llegarSeparados && checks.compartiUbicacion

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-sm">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-700">Inicia sesión para chatear</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">Debes estar registrado para coordinar con tu match.</p>
            <Link to="/">
              <Button className="bg-teal-600 hover:bg-teal-700">Ir al inicio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!panorama || !matchInfo) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Cargando chat...</p>
      </div>
    )
  }

  // VISTA PREVIA DEL PERFIL (antes del chat)
  if (!previewAceptado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <Link to="/mis-panoramas">
              <Button variant="ghost" size="sm" className="text-slate-500 -ml-2">
                <ChevronLeft className="w-4 h-4 mr-1" /> Volver
              </Button>
            </Link>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Tu compañero/a de panorama</p>
            </div>
            <NotificacionesBadge />
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="bg-teal-50/50 border-teal-200 mb-6">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-teal-800 mb-1">Panorama</p>
              <p className="text-lg font-bold text-slate-900">{panorama.actividad}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-teal-500" /> {panorama.lugar}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-teal-500" /> {panorama.fecha} {panorama.hora}</span>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mx-auto mb-3">
              <Eye className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Así es tu compañero/a</h1>
            <p className="text-sm text-slate-500">Datos que compartió para ayudarte a decidir. Sin datos personales.</p>
          </div>

          {perfilPublico ? (
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-medium text-slate-900">Compatibilidad</span>
                  </div>
                  <Badge className="bg-teal-100 text-teal-700 text-sm">{matchInfo.compatibilidad}% match</Badge>
                </CardContent>
              </Card>

              {perfilPublico.categoriasSel && perfilPublico.categoriasSel.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span className="font-medium text-slate-900">Le interesa</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {perfilPublico.categoriasSel.map((c: string) => (
                        <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {perfilPublico.presupuesto && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium text-slate-900">Presupuesto:</span>
                    <span className="text-sm text-slate-600">{perfilPublico.presupuesto}</span>
                  </CardContent>
                </Card>
              )}

              {perfilPublico.companiasPref && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-slate-900">Busca compañía:</span>
                    <span className="text-sm text-slate-600">{perfilPublico.companiasPref}</span>
                  </CardContent>
                </Card>
              )}

              {perfilPublico.frecuenciaSocial && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-slate-900">Ritmo social:</span>
                    <span className="text-sm text-slate-600">{perfilPublico.frecuenciaSocial}</span>
                  </CardContent>
                </Card>
              )}

              {perfilPublico.comunasSel && perfilPublico.comunasSel.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinned className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-slate-900">Se mueve en</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {perfilPublico.comunasSel.slice(0, 5).map((c: string) => (
                        <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                      ))}
                      {perfilPublico.comunasSel.length > 5 && (
                        <Badge variant="outline" className="text-xs">+{perfilPublico.comunasSel.length - 5}</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {perfilPublico.nuncaHaria && (
                <Card className="border-red-200 bg-red-50/30">
                  <CardContent className="p-4 flex items-start gap-2">
                    <Ban className="w-4 h-4 text-red-500 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-900">Nunca haría:</span>
                      <p className="text-sm text-slate-600">{perfilPublico.nuncaHaria}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {(perfilPublico.temasEntusiasman || perfilPublico.temasEvitar) && (
                <Card>
                  <CardContent className="p-4 space-y-2">
                    {perfilPublico.temasEntusiasman && (
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <span className="font-medium text-slate-900">Le entusiasma hablar de:</span>
                          <p className="text-sm text-slate-600">{perfilPublico.temasEntusiasman}</p>
                        </div>
                      </div>
                    )}
                    {perfilPublico.temasEvitar && (
                      <div className="flex items-start gap-2">
                        <Ban className="w-4 h-4 text-red-400 mt-0.5" />
                        <div>
                          <span className="font-medium text-slate-900">Prefiere evitar:</span>
                          <p className="text-sm text-slate-600">{perfilPublico.temasEvitar}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="bg-slate-50 border-dashed">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-slate-500">Este usuario aún no ha completado su perfil público.</p>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Tu seguridad primero</p>
                <p className="text-xs text-amber-700">
                  Recuerda: cada uno llega por separado al lugar público de encuentro. 
                  Comparte tu ubicación con tu contacto de seguridad.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={aceptarPreview} className="w-full bg-teal-600 hover:bg-teal-700 py-5 text-base">
              <CheckCircle className="w-5 h-5 mr-2" />
              Entendido — Iniciar chat
            </Button>
            <p className="text-xs text-slate-400 text-center mt-2">
              Al iniciar el chat, confirmas que has revisado estos datos y aceptas las recomendaciones de seguridad.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // CHAT NORMAL (después de aceptar preview)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/mis-panoramas">
            <Button variant="ghost" size="sm" className="text-slate-500 -ml-2">
              <ChevronLeft className="w-4 h-4 mr-1" /> Volver
            </Button>
          </Link>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-teal-700 font-bold text-sm">
            {matchInfo.matchUserName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{matchInfo.matchUserName}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Badge className="bg-teal-100 text-teal-700 text-[10px] px-1.5 py-0">{matchInfo.compatibilidad}% match</Badge>
              <span className="truncate">{panorama.actividad}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificacionesBadge />
            <Link to={`/evaluar?panorama=${panorama.id}&match=${matchInfo.matchUserId}&nombre=${encodeURIComponent(matchInfo.matchUserName)}`}>
              <Button variant="outline" size="sm" className="text-xs h-8">Evaluar</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto w-full px-4 py-3">
        <Card className="bg-teal-50/50 border-teal-200">
          <CardContent className="p-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-teal-500" /> {panorama.lugar}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-teal-500" /> {panorama.fecha} {panorama.hora}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3 text-teal-500" /> {panorama.companiasPref || 'Indiferente'}</span>
          </CardContent>
        </Card>
      </div>

      {!checklistCompleto && (
        <div className="max-w-3xl mx-auto w-full px-4 pb-3">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                <p className="text-sm font-semibold text-amber-800">Checklist de seguridad obligatorio</p>
              </div>
              <p className="text-xs text-amber-700">Antes de coordinar los detalles del encuentro, confirma lo siguiente:</p>
              <div className="space-y-2">
                {[
                  { key: 'lugarPublico', label: 'El lugar de encuentro es público y concurrido' },
                  { key: 'aviseContacto', label: 'Ya avisé a mi contacto de seguridad que voy a este panorama' },
                  { key: 'llegarSeparados', label: 'Acordamos llegar por separado al lugar' },
                  { key: 'compartiUbicacion', label: 'Compartiré mi ubicación en tiempo real con mi contacto' },
                ].map(item => (
                  <label key={item.key} className="flex items-start gap-2 cursor-pointer">
                    <Checkbox
                      checked={(checks as any)[item.key]}
                      onCheckedChange={(v) => setChecks(prev => ({ ...prev, [item.key]: v === true }))}
                      className="mt-0.5"
                    />
                    <span className="text-xs text-slate-700">{item.label}</span>
                  </label>
                ))}
              </div>
              <Button
                size="sm"
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={!allChecks}
                onClick={() => setChecklistCompleto(true)}
              >
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                Confirmar y continuar al chat
              </Button>
              {!allChecks && (
                <p className="text-[10px] text-amber-600 text-center">Marca todas las casillas para continuar</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full px-4 py-2 space-y-3">
        {mensajes.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="w-10 h-10 text-slate-200 mx-auto mb-2" />
            <p className="text-sm text-slate-400">Aún no hay mensajes</p>
            <p className="text-xs text-slate-400">Coordina los detalles de tu encuentro de forma segura</p>
          </div>
        )}

        {mensajes.map((msg) => {
          const esMio = msg.remitenteUid === user!.uid
          return (
            <div key={msg.id} className={`flex ${esMio ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.tipo === 'sistema'
                  ? 'bg-amber-50 border border-amber-200 text-amber-800 mx-auto text-center text-xs'
                  : esMio
                    ? 'bg-teal-600 text-white rounded-br-md'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm'
              }`}>
                {msg.tipo !== 'sistema' && !esMio && (
                  <p className="text-[10px] font-medium text-teal-600 mb-0.5">{msg.remitenteNombre}</p>
                )}
                <p>{msg.contenido}</p>
                <p className={`text-[10px] mt-1 ${esMio ? 'text-teal-100' : 'text-slate-400'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {checklistCompleto && mensajes.length < 3 && (
        <div className="max-w-3xl mx-auto w-full px-4 pb-2">
          <p className="text-[10px] text-slate-400 mb-1.5">Sugerencias de mensajes:</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {SUGERENCIAS.slice(0, 4).map((s, i) => (
              <button
                key={i}
                onClick={() => handleSugerencia(s)}
                className="flex-shrink-0 text-xs bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition"
              >
                {s.length > 35 ? s.slice(0, 35) + '...' : s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-0 bg-white border-t">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-2">
          <Input
            ref={inputRef}
            placeholder={checklistCompleto ? 'Escribe un mensaje...' : 'Completa el checklist de seguridad primero'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleEnviar()}
            disabled={!checklistCompleto}
            className="flex-1"
          />
          <Button
            size="icon"
            className="bg-teal-600 hover:bg-teal-700 shrink-0"
            onClick={handleEnviar}
            disabled={!checklistCompleto || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="max-w-3xl mx-auto px-4 pb-2">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <AlertTriangle className="w-3 h-3" />
            <span>Este chat está monitoreado. No compartas datos personales (teléfono, dirección, redes sociales).</span>
          </div>
        </div>
      </div>
    </div>
  )
}
