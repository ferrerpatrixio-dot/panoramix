import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { chatOnboarding, testOpenAIConnection } from '@/services/openai'
import { Users, Send, Bot, User, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface Mensaje {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatOnboarding() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy Panxi 🌟 Cuéntame, ¿qué te gusta hacer cuando tienes tiempo libre? No hay respuestas correctas ni incorrectas.',
    },
  ])
  const [input, setInput] = useState('')
  const [cargando, setCargando] = useState(false)
  const [conexionOk, setConexionOk] = useState<boolean | null>(null)
  const [procesandoPerfil, setProcesandoPerfil] = useState(false)
  const [perfilDetectado, setPerfilDetectado] = useState<any>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  // Test de conexión al cargar
  useEffect(() => {
    testOpenAIConnection().then(r => setConexionOk(r.ok))
  }, [])

  const enviar = async () => {
    if (!input.trim() || cargando) return

    const texto = input.trim()
    setInput('')
    setMensajes(prev => [...prev, { role: 'user', content: texto }])
    setCargando(true)

    abortRef.current = new AbortController()

    try {
      const respuesta = await chatOnboarding(
        [...mensajes, { role: 'user', content: texto }],
        { signal: abortRef.current.signal }
      )
      setMensajes(prev => [...prev, { role: 'assistant', content: respuesta }])
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMensajes(prev => [
          ...prev,
          { role: 'assistant', content: 'Ups, tuve un problema técnico. ¿Podemos intentar de nuevo?' },
        ])
      }
    } finally {
      setCargando(false)
      abortRef.current = null
    }
  }

  const finalizarOnboarding = () => {
    setProcesandoPerfil(true)
    // Simula extracción de perfil (en producción se haría con GPT)
    setTimeout(() => {
      setPerfilDetectado({
        estilo: 'Social moderado, preferencia por planes culturales',
        intereses: ['Música', 'Cine', 'Paseos'],
        presupuesto: '$15.000 - $30.000',
        comunas: ['Ñuñoa', 'Providencia'],
        compatibilidad: 'Alto con personas que disfrutan eventos culturales',
      })
      setProcesandoPerfil(false)
    }, 2000)
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
            <Link to="/eventos-rm" className="hover:text-teal-600 transition">Eventos RM</Link>
            <Link to="/perfil" className="hover:text-teal-600 transition">Mi Perfil</Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Conoce a Panxi 🤖</h1>
          <p className="text-slate-500 text-sm">Tu asistente para descubrir qué tipo de compañía te conviene.</p>

          {conexionOk === false && (
            <div className="mt-2 flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-lg text-xs">
              <AlertCircle className="w-4 h-4" />
              No se pudo conectar con OpenAI. Verifica las API keys en configuración.
            </div>
          )}
          {conexionOk === true && (
            <div className="mt-2 flex items-center gap-2 text-green-700 bg-green-50 px-3 py-2 rounded-lg text-xs">
              <CheckCircle className="w-4 h-4" />
              Conexión con OpenAI activa (dual key con fallback).
            </div>
          )}
        </div>

        {/* Chat */}
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

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && enviar()}
                  placeholder="Escribe tu mensaje..."
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

              {/* Botón finalizar */}
              {mensajes.length > 4 && !perfilDetectado && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={finalizarOnboarding}
                  disabled={procesandoPerfil}
                  className="mt-3 w-full border-teal-300 text-teal-700"
                >
                  {procesandoPerfil ? (
                    <><Loader2 className="w-3 h-3 animate-spin mr-1" /> Analizando tu perfil...</>
                  ) : (
                    '✨ Ya conversamos suficiente — generar mi perfil'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resultado del perfil */}
        {perfilDetectado && (
          <Card className="mt-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardContent className="p-5">
              <h3 className="font-bold text-teal-800 mb-3">🎯 Tu perfil detectado</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Estilo:</strong> {perfilDetectado.estilo}</p>
                <p><strong>Intereses:</strong> {perfilDetectado.intereses.join(', ')}</p>
                <p><strong>Presupuesto:</strong> {perfilDetectado.presupuesto}</p>
                <p><strong>Comunas:</strong> {perfilDetectado.comunas.join(', ')}</p>
                <p className="text-teal-600 font-medium mt-2">{perfilDetectado.compatibilidad}</p>
              </div>
              <Link to="/perfil">
                <Button size="sm" className="mt-4 bg-teal-600 hover:bg-teal-700">
                  Completar perfil detallado →
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
