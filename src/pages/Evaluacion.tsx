import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { demoGuardarEvaluacion, demoObtenerPanorama, demoCalcularReputacion } from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  Users, ChevronLeft, Star, CheckCircle, AlertTriangle,
  ThumbsUp, ThumbsDown, Clock, MessageCircle
} from 'lucide-react'

export default function Evaluacion() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const panoramaId = searchParams.get('panorama') || ''
  const matchUserId = searchParams.get('match') || ''
  const matchName = searchParams.get('nombre') || 'Tu compañero/a'

  const panorama = panoramaId ? demoObtenerPanorama(panoramaId) : null

  const [estrellas, setEstrellas] = useState(0)
  const [comentario, setComentario] = useState('')
  const [cumplio, setCumplio] = useState<boolean | null>(null)
  const [llegoATiempo, setLlegoATiempo] = useState<boolean | null>(null)
  const [volveria, setVolveria] = useState<boolean | null>(null)
  const [enviado, setEnviado] = useState(false)

  const handleEnviar = () => {
    if (!user || !panoramaId || !matchUserId || estrellas === 0) return

    demoGuardarEvaluacion({
      panoramaId,
      evaluadorUid: user.uid,
      evaluadoUid: matchUserId,
      evaluadoNombre: matchName,
      estrellas,
      comentario,
      cumplioPanorama: cumplio ?? true,
      llegoATiempo: llegoATiempo ?? true,
      volveriaAJuntarse: volveria ?? true,
    })
    setEnviado(true)
  }

  if (enviado) {
    const reputacion = user ? demoCalcularReputacion(matchUserId) : { promedio: 0, total: 0 }
    return (
      <div className="min-h-screen bg-slate-50">
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
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-green-800">¡Evaluación enviada!</h2>
              <p className="text-sm text-green-600 mt-2">
                Gracias por tu feedback. {matchName} ahora tiene una reputación de {reputacion.promedio}⭐ ({reputacion.total} evaluaciones).
              </p>
              <div className="mt-6 flex gap-3 justify-center">
                <Link to="/mis-panoramas">
                  <Button className="bg-teal-600 hover:bg-teal-700">Volver a mis panoramas</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
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
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/mis-panoramas">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-slate-500">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Evaluar experiencia</h1>
          <p className="text-slate-500">Tu evaluación ayuda a mantener la comunidad segura y confiable.</p>
        </div>

        {/* INFO DEL PANORAMA */}
        {panorama && (
          <Card className="mb-6 border-teal-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-teal-700 font-bold">
                  {matchName[0]}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{matchName}</p>
                  <p className="text-xs text-slate-500">{panorama.actividad} · {panorama.lugar}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-5 space-y-6">
            {/* ESTRELLAS */}
            <div>
              <label className="font-medium text-slate-900 block mb-2">¿Cómo fue la experiencia?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    onClick={() => setEstrellas(s)}
                    className="transition hover:scale-110"
                  >
                    <Star className={`w-8 h-8 ${s <= estrellas ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {estrellas === 0 ? 'Selecciona una calificación' :
                 estrellas === 1 ? 'Mala experiencia' :
                 estrellas === 2 ? 'Regular' :
                 estrellas === 3 ? 'Buena' :
                 estrellas === 4 ? 'Muy buena' : 'Excelente'}
              </p>
            </div>

            {/* PREGUNTAS SÍ/NO */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-2">¿Se realizó el panorama como acordaron?</label>
                <div className="flex gap-2">
                  <button onClick={() => setCumplio(true)} className={`flex-1 p-3 rounded-lg border text-sm flex items-center justify-center gap-1 transition ${cumplio === true ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 hover:border-slate-300'}`}>
                    <ThumbsUp className="w-4 h-4" /> Sí
                  </button>
                  <button onClick={() => setCumplio(false)} className={`flex-1 p-3 rounded-lg border text-sm flex items-center justify-center gap-1 transition ${cumplio === false ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 hover:border-slate-300'}`}>
                    <ThumbsDown className="w-4 h-4" /> No
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-2">¿Llegó a tiempo al lugar de encuentro?</label>
                <div className="flex gap-2">
                  <button onClick={() => setLlegoATiempo(true)} className={`flex-1 p-3 rounded-lg border text-sm flex items-center justify-center gap-1 transition ${llegoATiempo === true ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 hover:border-slate-300'}`}>
                    <Clock className="w-4 h-4" /> Sí, a tiempo
                  </button>
                  <button onClick={() => setLlegoATiempo(false)} className={`flex-1 p-3 rounded-lg border text-sm flex items-center justify-center gap-1 transition ${llegoATiempo === false ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 hover:border-slate-300'}`}>
                    <AlertTriangle className="w-4 h-4" /> No
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-2">¿Volverías a juntarte con esta persona?</label>
                <div className="flex gap-2">
                  <button onClick={() => setVolveria(true)} className={`flex-1 p-3 rounded-lg border text-sm flex items-center justify-center gap-1 transition ${volveria === true ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 hover:border-slate-300'}`}>
                    <ThumbsUp className="w-4 h-4" /> Sí
                  </button>
                  <button onClick={() => setVolveria(false)} className={`flex-1 p-3 rounded-lg border text-sm flex items-center justify-center gap-1 transition ${volveria === false ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 hover:border-slate-300'}`}>
                    <ThumbsDown className="w-4 h-4" /> No
                  </button>
                </div>
              </div>
            </div>

            {/* COMENTARIO */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2 flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-teal-500" /> Comentario (opcional)
              </label>
              <Textarea
                placeholder="¿Algo que quieras compartir sobre la experiencia?"
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                rows={3}
              />
            </div>

            {/* BOTÓN ENVIAR */}
            <Button
              onClick={handleEnviar}
              disabled={estrellas === 0}
              className="w-full bg-teal-600 hover:bg-teal-700 gap-1"
              size="lg"
            >
              <CheckCircle className="w-4 h-4" /> Enviar evaluación
            </Button>

            {estrellas === 0 && (
              <p className="text-xs text-amber-600 text-center">Selecciona al menos una calificación con estrellas para enviar.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
