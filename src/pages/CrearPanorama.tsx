import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { demoCrearPanorama } from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { generarDescripcionPanorama, moderarContenido, type ModeracionResult } from '@/services/openai'
import {
  Users, ChevronLeft, Send, Sparkles, AlertTriangle, CheckCircle,
  Loader2, MapPin, Calendar, DollarSign, UserCircle, Wand2,
  LayoutDashboard
} from 'lucide-react'

export default function CrearPanorama() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [paso, setPaso] = useState<'formulario' | 'generando' | 'preview' | 'publicado'>('formulario')

  // Datos del formulario
  const [actividad, setActividad] = useState('')
  const [lugar, setLugar] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [presupuesto, setPresupuesto] = useState('')
  const [companiasPref, setCompaniasPref] = useState('')
  const [entradaComprada, setEntradaComprada] = useState<'si' | 'no' | 'no-aplica'>('no-aplica')
  const [tono, setTono] = useState<'casual' | 'formal' | 'divertido'>('casual')

  // Generación
  const [descripcionGenerada, setDescripcionGenerada] = useState('')
  const [modResult, setModResult] = useState<ModeracionResult | null>(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const generarDescripcion = async () => {
    if (!actividad.trim() || !lugar.trim() || !fecha.trim()) {
      setError('Completa al menos: qué quieres hacer, dónde y cuándo.')
      return
    }
    setError('')
    setCargando(true)
    setPaso('generando')

    try {
      const descripcion = await generarDescripcionPanorama(
        actividad,
        lugar,
        `${fecha} ${hora}`,
        presupuesto || undefined,
        tono
      )
      setDescripcionGenerada(descripcion)

      const moderacion = await moderarContenido(descripcion)
      setModResult(moderacion)

      setPaso('preview')
    } catch (err: any) {
      setError('No se pudo generar la descripción. Intenta de nuevo.')
      setPaso('formulario')
    } finally {
      setCargando(false)
    }
  }

  const publicar = () => {
    if (!user) {
      setError('Debes iniciar sesión para publicar un panorama.')
      return
    }
    demoCrearPanorama(user.uid, {
      actividad,
      lugar,
      fecha,
      hora,
      presupuesto,
      companiasPref,
      entradaComprada,
      descripcionGenerada,
    })
    setPaso('publicado')
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
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-slate-500">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </Link>

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Crear un panorama</h1>
          <p className="text-slate-500">Describe tu actividad y te ayudamos a redactarla. Luego buscamos compañía.</p>
        </div>

        {!user && (
          <Card className="mb-6 bg-amber-50 border-amber-200">
            <CardContent className="p-4 text-amber-700 text-sm">
              ⚠️ <strong>Importante:</strong> Necesitas <Link to="/" className="underline font-medium">iniciar sesión</Link> para publicar panoramas y recibir matches.
            </CardContent>
          </Card>
        )}

        {/* PASO 1: FORMULARIO */}
        {paso === 'formulario' && (
          <div className="space-y-5">
            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-1 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-500" /> ¿Qué quieres hacer?
                  </label>
                  <p className="text-xs text-slate-400 mb-1">Sé específico. Ej: &quot;Ir al concierto de Chayanne&quot;</p>
                  <Input value={actividad} onChange={e => setActividad(e.target.value)} placeholder="Ej: Ir a concierto de Los Bunkers" />
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-red-500" /> ¿Dónde?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input value={lugar} onChange={e => setLugar(e.target.value)} placeholder="Lugar / Venue" />
                    <Input value={presupuesto} onChange={e => setPresupuesto(e.target.value)} placeholder="Presupuesto (CLP)" />
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-teal-500" /> ¿Cuándo?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                    <Input type="time" value={hora} onChange={e => setHora(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2 flex items-center gap-1">
                    <UserCircle className="w-4 h-4 text-purple-500" /> ¿Qué compañía buscas?
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
                  <label className="font-medium text-slate-900 block mb-2">¿Ya tienes la entrada?</label>
                  <div className="flex flex-wrap gap-2">
                    {[{ id: 'si', label: 'Sí, ya la compré' }, { id: 'no', label: 'No, falta comprar' }, { id: 'no-aplica', label: 'No aplica / es gratis' }].map(o => (
                      <button key={o.id} onClick={() => setEntradaComprada(o.id as any)} className={`px-4 py-2 rounded-full border text-sm transition ${
                        entradaComprada === o.id ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>{o.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-slate-900 block mb-2">Tono de la descripción</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'casual' as const, label: 'Casual 😎', desc: 'Como hablando con un amigo' },
                      { id: 'formal' as const, label: 'Formal 📝', desc: 'Claro y respetuoso' },
                      { id: 'divertido' as const, label: 'Divertido 🎉', desc: 'Con humor y entusiasmo' },
                    ].map(t => (
                      <button key={t.id} onClick={() => setTono(t.id)} className={`flex-1 p-3 rounded-lg border text-sm transition text-center ${
                        tono === t.id ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 hover:border-slate-300'
                      }`}>
                        <div className="font-medium">{t.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {error}
                  </div>
                )}
                <Button onClick={generarDescripcion} disabled={cargando} className="w-full bg-teal-600 hover:bg-teal-700 gap-2" size="lg">
                  {cargando ? <><Loader2 className="w-4 h-4 animate-spin" /> Generando...</> : <><Wand2 className="w-4 h-4" /> Generar descripción con IA</>}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 2: GENERANDO */}
        {paso === 'generando' && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-8 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-purple-600 mx-auto mb-4" />
              <p className="text-lg font-medium text-purple-800">Panxi está redactando tu panorama...</p>
              <p className="text-sm text-purple-500 mt-2">Generando descripción + revisión de seguridad</p>
            </CardContent>
          </Card>
        )}

        {/* PASO 3: PREVIEW */}
        {paso === 'preview' && (
          <div className="space-y-5">
            <Card className="border-2 border-teal-200 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Vista previa de tu panorama</span>
                  <Badge className="bg-white/20 text-white border-0">Pendiente</Badge>
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{actividad}</h2>
                  <p className="text-sm text-slate-500 mt-1">{lugar} · {fecha} {hora && `· ${hora}`}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold text-slate-500 uppercase">Descripción generada</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{descripcionGenerada}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <DollarSign className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Presupuesto</p>
                    <p className="text-sm font-medium text-slate-700">{presupuesto || 'No especificado'}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <UserCircle className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Compañía</p>
                    <p className="text-sm font-medium text-slate-700">{companiasPref || 'Indiferente'}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <Calendar className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Entrada</p>
                    <p className="text-sm font-medium text-slate-700">{entradaComprada === 'si' ? 'Ya comprada' : entradaComprada === 'no' ? 'Pendiente' : 'Gratis'}</p>
                  </div>
                </div>
                {modResult && (
                  <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                    modResult.aprobado ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {modResult.aprobado ? <><CheckCircle className="w-4 h-4" /> Contenido aprobado por moderación automática</> : <><AlertTriangle className="w-4 h-4" /> {modResult.motivo}</>}
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setPaso('formulario')} className="flex-1">Editar datos</Button>
              <Button onClick={publicar} disabled={modResult?.aprobado === false} className="flex-1 bg-teal-600 hover:bg-teal-700 gap-1">
                <Send className="w-4 h-4" /> Publicar panorama
              </Button>
            </div>
            {modResult?.aprobado === false && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <p className="text-sm text-red-700 font-medium">Tu descripción no pasó la revisión de seguridad.</p>
                  <p className="text-xs text-red-600 mt-1">{modResult.motivo}</p>
                  <p className="text-xs text-red-500 mt-2">Recuerda: Panoramix es para compañía de confianza, NO citas románticas ni encuentros.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* PASO 4: PUBLICADO */}
        {paso === 'publicado' && (
          <div className="space-y-5">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-green-800">¡Panorama publicado! 🎉</h2>
                <p className="text-sm text-green-600 mt-2">Ahora buscaremos compañía compatible para tu panorama.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-bold text-slate-900">{actividad}</h3>
                <p className="text-sm text-slate-600">{descripcionGenerada}</p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <Badge variant="outline"><MapPin className="w-3 h-3 mr-1" />{lugar}</Badge>
                  <Badge variant="outline"><Calendar className="w-3 h-3 mr-1" />{fecha} {hora}</Badge>
                  <Badge variant="outline"><DollarSign className="w-3 h-3 mr-1" />{presupuesto || 'Gratis'}</Badge>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => navigate('/mis-panoramas')} className="w-full bg-teal-600 hover:bg-teal-700 gap-1">
                <LayoutDashboard className="w-4 h-4" /> Ver mis panoramas
              </Button>
              <Button onClick={() => {
                setPaso('formulario')
                setActividad(''); setLugar(''); setFecha(''); setHora(''); setPresupuesto('')
                setDescripcionGenerada(''); setModResult(null)
              }} variant="outline" className="w-full gap-1">
                <Sparkles className="w-4 h-4" /> Crear otro
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
