import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { chatOnboarding, extractProfileFromChat, testOpenAIConnection, type PerfilExtraido } from '@/services/openai'
import { Users, Send, Bot, User, AlertCircle, CheckCircle, Loader2, Clock, RotateCcw, ArrowRight } from 'lucide-react'

interface Mensaje {
  role: 'user' | 'assistant'
  content: string
}

const MAX_TURNOS = 8

export default function ChatOnboarding() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy Panxi 🌟 Cuéntame, ¿qué hiciste el último sábado que tuviste libre?',
    },
  ])
  const [input, setInput] = useState('')
  const [cargando, setCargando] = useState(false)
  const [conexionOk, setConexionOk] = useState<boolean | null>(null)
  const [turno, setTurno] = useState(0)
  const [fase, setFase] = useState<'apertura' | 'profundiza' | 'cruce' | 'cierre' | 'extraccion' | 'finalizado'>('apertura')
  const [perfilDetectado, setPerfilDetectado] = useState<PerfilExtraido | null>(null)
  const [procesandoPerfil, setProcesandoPerfil] = useState(false)
  const [chatFinalizado, setChatFinalizado] = useState(false)
  const [falloOpenAI, setFalloOpenAI] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  // Test de conexión al cargar
  useEffect(() => {
    testOpenAIConnection().then(r => setConexionOk(r.ok))
  }, [])

  // Determinar fase según turno
  const getPhase = useCallback((t: number): 'apertura' | 'profundiza' | 'cruce' | 'cierre' => {
    if (t <= 2) return 'apertura'
    if (t <= 5) return 'profundiza'
    if (t <= 7) return 'cruce'
    return 'cierre'
  }, [])

  const enviar = async () => {
    if (!input.trim() || cargando || chatFinalizado) return

    const texto = input.trim()
    setInput('')

    const nuevoTurno = turno + 1
    const nuevaLista = [...mensajes, { role: 'user' as const, content: texto }]
    setMensajes(nuevaLista)
    setTurno(nuevoTurno)
    setCargando(true)

    // CIERRE FORZOSO: Turno 8 = última respuesta del usuario
    if (nuevoTurno >= MAX_TURNOS) {
      setFase('cierre')
      setChatFinalizado(true)
      setMensajes(prev => [...prev, {
        role: 'assistant',
        content: '¡Gracias por compartir! Ya tengo una buena idea de tu estilo. Déjame armar tu perfil... ⏳'
      }])
      setCargando(false)
      generarPerfil(nuevaLista)
      return
    }

    // Actualizar fase
    const nextPhase = getPhase(nuevoTurno)
    setFase(nextPhase)

    abortRef.current = new AbortController()

    try {
      const respuesta = await chatOnboarding(nuevaLista, nextPhase, {
        signal: abortRef.current.signal
      })
      setMensajes(prev => [...prev, { role: 'assistant', content: respuesta }])
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setFalloOpenAI(true)
        setMensajes(prev => [...prev, {
          role: 'assistant',
          content: 'Ups, tuve un problema técnico. Puedes continuar con el formulario rápido abajo 👇'
        }])
      }
    } finally {
      setCargando(false)
      abortRef.current = null
    }
  }

  const generarPerfil = async (historial: Mensaje[]) => {
    setProcesandoPerfil(true)
    setFase('extraccion')

    try {
      const perfil = await extractProfileFromChat(historial)
      setPerfilDetectado(perfil)
      setFase('finalizado')
    } catch (err) {
      // Fallback: perfil genérico
      setPerfilDetectado({
        estilo_de_vida: 'Social moderado, a definir con más conversación',
        intereses: ['Por definir'],
        nivel_sociabilidad: 'moderado',
        presupuesto_estimado: 'no detectado',
        horario_preferido: 'no detectado',
        tipo_compania: 'indiferente',
        dealbreakers: [],
        comentario_compatibility: 'Completa tu perfil detallado para mejores matches.',
      })
      setFase('finalizado')
    } finally {
      setProcesandoPerfil(false)
    }
  }

  const reiniciar = () => {
    setMensajes([{
      role: 'assistant',
      content: '¡Hola! Soy Panxi 🌟 Cuéntame, ¿qué hiciste el último sábado que tuviste libre?',
    }])
    setTurno(0)
    setFase('apertura')
    setPerfilDetectado(null)
    setChatFinalizado(false)
    setFalloOpenAI(false)
    setInput('')
  }

  const progreso = Math.min((turno / MAX_TURNOS) * 100, 100)

  // Detección de respuesta tacaña (<5 palabras 2 veces seguidas)
  const ultimasUserMsgs = mensajes.filter(m => m.role === 'user').slice(-2)
  const respuestaTacana = ultimasUserMsgs.length === 2 &&
    ultimasUserMsgs.every(m => m.content.trim().split(/\s+/).length < 5)

  // Fase actual para badge
  const faseLabels: Record<string, string> = {
    apertura: '🌟 Apertura',
    profundiza: '🔍 Profundizando',
    cruce: '🎯 Últimos datos',
    cierre: '🔒 Cierre',
    extraccion: '⚙️ Analizando perfil...',
    finalizado: '✅ Perfil listo',
  }

  const faseColores: Record<string, string> = {
    apertura: 'bg-teal-100 text-teal-700',
    profundiza: 'bg-blue-100 text-blue-700',
    cruce: 'bg-amber-100 text-amber-700',
    cierre: 'bg-purple-100 text-purple-700',
    extraccion: 'bg-slate-100 text-slate-700',
    finalizado: 'bg-green-100 text-green-700',
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
            <Link to="/mapa-onboarding" className="hover:text-teal-600 transition">Mapa del flujo</Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* HEADER */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Conoce a Panxi 🤖</h1>
              <p className="text-slate-500 text-sm">Conversa un rato y descubriré tu perfil ideal.</p>
            </div>
            <Badge className={faseColores[fase] || 'bg-slate-100'}>
              {faseLabels[fase] || fase}
            </Badge>
          </div>

          {/* Barra de progreso */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Turno {turno} de {MAX_TURNOS}</span>
              <span>{Math.round(progreso)}%</span>
            </div>
            <Progress value={progreso} className="h-2" />
          </div>

          {conexionOk === false && (
            <div className="mt-2 flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-lg text-xs">
              <AlertCircle className="w-4 h-4" />
              No se pudo conectar con OpenAI. El chat usará respuestas predefinidas.
            </div>
          )}
          {conexionOk === true && (
            <div className="mt-2 flex items-center gap-2 text-green-700 bg-green-50 px-3 py-2 rounded-lg text-xs">
              <CheckCircle className="w-4 h-4" />
              Conexión activa (dual key con fallback). Máx 8 turnos.
            </div>
          )}

          {/* Alerta respuesta tacaña */}
          {respuestaTacana && !chatFinalizado && (
            <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
              💡 Parece que respondes muy corto. ¡Cuéntame un poco más para poder ayudarte mejor!
            </div>
          )}
        </div>

        {/* CHAT */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mensajes.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    m.role === 'user'
                      ? 'bg-teal-100'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    {m.role === 'user' ? (
                      <User className="w-4 h-4 text-teal-700" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {cargando && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* INPUT AREA */}
            {!chatFinalizado && !perfilDetectado && (
              <div className="p-4 border-t bg-white">
                {/* Fallback si OpenAI falló */}
                {falloOpenAI ? (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 text-center">
                      Como tuvimos un problema, elige una opción rápida:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Soy muy social', 'Social moderado', 'Más reservado', 'Prefiero estar solo'].map(o => (
                        <Button
                          key={o}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setMensajes(prev => [...prev, { role: 'user', content: o }])
                            setTurno(t => t + 1)
                          }}
                          className="text-xs"
                        >
                          {o}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && enviar()}
                      placeholder={turno >= 7 ? 'Última respuesta...' : 'Escribe tu mensaje...'}
                      disabled={cargando}
                      className="flex-1"
                    />
                    <Button
                      onClick={enviar}
                      disabled={cargando || !input.trim()}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Botón reiniciar */}
            {chatFinalizado && perfilDetectado && (
              <div className="p-4 border-t bg-white">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reiniciar}
                  className="w-full gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Volver a empezar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PERFIL EXTRAÍDO */}
        {perfilDetectado && (
          <Card className="mt-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-teal-800">🎯 Tu perfil detectado</h3>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-500 w-28 shrink-0">Estilo:</span>
                  <span className="text-slate-800 font-medium">{perfilDetectado.estilo_de_vida}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 w-28 shrink-0">Intereses:</span>
                  <div className="flex flex-wrap gap-1">
                    {perfilDetectado.intereses.map(i => (
                      <Badge key={i} variant="outline" className="text-xs bg-white">{i}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 w-28 shrink-0">Sociabilidad:</span>
                  <Badge className={
                    perfilDetectado.nivel_sociabilidad === 'alto' ? 'bg-green-100 text-green-700' :
                    perfilDetectado.nivel_sociabilidad === 'bajo' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }>
                    {perfilDetectado.nivel_sociabilidad}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 w-28 shrink-0">Presupuesto:</span>
                  <span className="text-slate-800">{perfilDetectado.presupuesto_estimado}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 w-28 shrink-0">Horario:</span>
                  <span className="text-slate-800">{perfilDetectado.horario_preferido}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 w-28 shrink-0">Compañía:</span>
                  <span className="text-slate-800">{perfilDetectado.tipo_compania}</span>
                </div>
                {perfilDetectado.dealbreakers.length > 0 && (
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-28 shrink-0">Nunca haría:</span>
                    <span className="text-slate-800">{perfilDetectado.dealbreakers.join(', ')}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-white/70 rounded-lg">
                <p className="text-sm text-teal-700 font-medium">{perfilDetectado.comentario_compatibility}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <Link to="/perfil" className="flex-1">
                  <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 gap-1">
                    Completar perfil detallado <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
                <Link to="/perfil-profundo" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full border-teal-300 text-teal-700">
                    Perfil profundo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analizando perfil */}
        {procesandoPerfil && (
          <Card className="mt-4 bg-purple-50 border-purple-200">
            <CardContent className="p-5 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-800 font-medium">Panxi está analizando tu conversación...</p>
              <p className="text-xs text-purple-500 mt-1">Esto toma unos segundos</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
