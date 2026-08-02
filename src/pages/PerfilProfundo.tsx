import { useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Users, ChevronLeft, Save, Star, Wine, Cigarette, HeartPulse,
  MessageCircle, Volume2, Ear, Activity, ShieldCheck
} from 'lucide-react'

export default function PerfilProfundo() {
  const [paso, setPaso] = useState(1)
  const [guardado, setGuardado] = useState(false)

  // Bloque A: Hábitos (discretos)
  const [tragoFavorito, setTragoFavorito] = useState('')
  const [marcaCigarro, setMarcaCigarro] = useState('')

  // Bloque B: Estado emocional
  const [estadoAnimo, setEstadoAnimo] = useState('')
  const [momentoReciente, setMomentoReciente] = useState('')

  // Bloque C: Dinámica social
  const [energiaSocial, setEnergiaSocial] = useState('')
  const [rolConversacion, setRolConversacion] = useState('')
  const [inquietoPasivo, setInquietoPasivo] = useState('')

  // Bloque D: Temas de conversación
  const [temasGusta, setTemasGusta] = useState<string[]>([])
  const [temasNoGusta, setTemasNoGusta] = useState<string[]>([])
  const [temaFavorito, setTemaFavorito] = useState('')
  const [temaTabu, setTemaTabu] = useState('')

  const totalPasos = 4

  const tragos = [
    { id: 'no_consumo', label: 'No consumo alcohol', tipo: 'abstemio' },
    { id: 'cerveza', label: 'Cerveza (artesanal, lager, etc.)', tipo: 'cerveza' },
    { id: 'vino', label: 'Vino (tinto, blanco, espumante)', tipo: 'vino' },
    { id: 'cocktail', label: 'Cocktails / Tragos preparados (mojito, piña colada...)', tipo: 'cocktail' },
    { id: 'destilados', label: 'Destilados (pisco, ron, whisky, vodka...)', tipo: 'destilados' },
    { id: 'otro', label: 'Otro / Depende de la ocasión', tipo: 'variado' },
  ]

  const marcasCigarro = [
    { id: 'no_fumador', label: 'No soy fumador/a', tipo: 'no_fuma' },
    { id: 'marlboro', label: 'Marlboro / Lucky Strike / Camel', tipo: 'rubios' },
    { id: 'kent', label: 'Kent / Belmont / Dunhill', tipo: 'premium' },
    { id: 'mentolados', label: 'Mentolados / Cápsula', tipo: 'mentol' },
    { id: 'tabaco', label: 'Tabaco de pipa / liar', tipo: 'artesanal' },
    { id: 'vapeo', label: 'Vapeo / IQOS', tipo: 'alternativas' },
    { id: 'social', label: 'Solo social / de vez en cuando', tipo: 'social' },
  ]

  const estadosAnimo = [
    { id: 'muy_bien', label: 'He tenido momentos muy felices recientemente', emoji: '😊' },
    { id: 'estable', label: 'Estoy estable, nada extraordinario', emoji: '😐' },
    { id: 'dificil', label: 'He pasado por una pena o momento difícil', emoji: '😔' },
    { id: 'mixto', label: 'Un poco de todo, la vida es así', emoji: '🎭' },
  ]

  const energias = [
    { id: 'inquieto', label: 'Inquieto/a — me gusta estar en movimiento', desc: 'Prefiero caminar, explorar, hacer cosas' },
    { id: 'pasivo', label: 'Pasivo/a — me gusta observar y disfrutar el momento', desc: 'Prefiero sentarme, conversar tranquilo, tomarme mi tiempo' },
    { id: 'mixto', label: 'Depende del día y del plan', desc: 'A veces inquieto, a veces relajado' },
  ]

  const rolesConversacion = [
    { id: 'habla_mas', label: 'Hablo más que escucho', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'escucha_mas', label: 'Escucho más que hablo', icon: <Ear className="w-4 h-4" /> },
    { id: 'equilibrado', label: 'Equilibrado — adapto según la persona', icon: <Activity className="w-4 h-4" /> },
    { id: 'callado', label: 'Prefiero el silencio cómodo', icon: <MessageCircle className="w-4 h-4" /> },
  ]

  const temasOpciones = [
    'Música', 'Cine / Series', 'Deportes', 'Viajes', 'Comida / Restaurantes',
    'Tecnología', 'Política', 'Religión', 'Familia', 'Trabajo',
    'Hogar / Decoración', 'Mascotas', 'Libros', 'Arte / Cultura',
    'Actualidad / Noticias', 'Humor / Memes', 'Negocios / Emprendimiento',
    'Salud / Bienestar', 'Espiritualidad', 'Ciencia'
  ]

  const toggleTema = (tema: string, tipo: 'gusta' | 'nogusta') => {
    if (tipo === 'gusta') {
      setTemasGusta(prev => prev.includes(tema) ? prev.filter(x => x !== tema) : [...prev, tema])
      setTemasNoGusta(prev => prev.filter(x => x !== tema))
    } else {
      setTemasNoGusta(prev => prev.includes(tema) ? prev.filter(x => x !== tema) : [...prev, tema])
      setTemasGusta(prev => prev.filter(x => x !== tema))
    }
  }

  const handleGuardar = () => {
    setGuardado(true)
    setTimeout(() => setGuardado(false), 3000)
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
            <Link to="/perfil-profundo" className="text-teal-600">Perfil Profundo</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <Link to="/perfil">
            <Button variant="ghost" size="sm" className="mb-2 -ml-2 text-slate-500">
              <ChevronLeft className="w-4 h-4 mr-1" /> Volver a perfil básico
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Tu perfil profundo</h1>
          <p className="text-slate-500">Preguntas discretas para encontrar compatibilidad real, no solo coincidencias.</p>

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
              <Star className="w-4 h-4" /> Perfil profundo guardado correctamente
            </CardContent>
          </Card>
        )}

        {/* PASO 1: HÁBITOS (DISCRETOS) */}
        {paso === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-teal-100 text-teal-700">Paso 1</Badge>
              <h2 className="text-lg font-bold text-slate-900">Estilo de vida (discreto)</h2>
            </div>
            <p className="text-sm text-slate-500">
              Estas preguntas están diseñadas para no ser invasivas. Respondelas con honestidad — nos ayudan a emparejarte con alguien compatible.
            </p>

            {/* Alcohol */}
            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-1 flex items-center gap-2">
                    <Wine className="w-4 h-4 text-amber-600" />
                    ¿Cuál es tu trago favorito cuando sales?
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    No juzgamos. Solo queremos emparejarte con alguien que tenga hábitos similares.
                  </p>
                  <div className="space-y-2">
                    {tragos.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTragoFavorito(t.id)}
                        className={`w-full p-3 rounded-lg border text-sm transition text-left ${
                          tragoFavorito === t.id
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {tragoFavorito && (
                    <p className="text-xs text-slate-400 mt-2">
                      Tipo detectado: <span className="font-medium text-slate-600">{tragos.find(t => t.id === tragoFavorito)?.tipo}</span>
                    </p>
                  )}
                </div>

                <div className="border-t pt-5">
                  <label className="font-medium text-slate-900 block mb-1 flex items-center gap-2">
                    <Cigarette className="w-4 h-4 text-slate-500" />
                    Si fumas, ¿qué marca o tipo prefieres?
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    Si no fumas, simplemente selecciona "No soy fumador/a".
                  </p>
                  <div className="space-y-2">
                    {marcasCigarro.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setMarcaCigarro(m.id)}
                        className={`w-full p-3 rounded-lg border text-sm transition text-left ${
                          marcaCigarro === m.id
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                  {marcaCigarro && (
                    <p className="text-xs text-slate-400 mt-2">
                      Perfil: <span className="font-medium text-slate-600">{marcasCigarro.find(m => m.id === marcaCigarro)?.tipo.replace('_', ' ')}</span>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 2: ESTADO EMOCIONAL */}
        {paso === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-teal-100 text-teal-700">Paso 2</Badge>
              <h2 className="text-lg font-bold text-slate-900">Estado emocional y energía</h2>
            </div>

            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-1 flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-rose-500" />
                    En los últimos 3 meses, ¿cómo describirías tu estado emocional?
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    Esto nos ayuda a no emparejarte con alguien en una etapa muy distinta a la tuya.
                  </p>
                  <div className="space-y-2">
                    {estadosAnimo.map(e => (
                      <button
                        key={e.id}
                        onClick={() => setEstadoAnimo(e.id)}
                        className={`w-full p-3 rounded-lg border text-sm transition text-left flex items-center gap-3 ${
                          estadoAnimo === e.id
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-lg">{e.emoji}</span>
                        <span>{e.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-5">
                  <label className="font-medium text-slate-900 block mb-1">
                    Cuéntanos algo breve sobre ese momento (opcional)
                  </label>
                  <p className="text-xs text-slate-400 mb-2">
                    Puede ser algo feliz, un logro, una pérdida, un cambio... lo que te sientas cómodo compartiendo.
                  </p>
                  <Textarea
                    placeholder="Ej: Me gradué de la universidad y estoy muy emocionado por empezar una nueva etapa... / Perdí a mi mascota después de 12 años y ha sido difícil..."
                    value={momentoReciente}
                    onChange={e => setMomentoReciente(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 3: DINÁMICA SOCIAL */}
        {paso === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-teal-100 text-teal-700">Paso 3</Badge>
              <h2 className="text-lg font-bold text-slate-900">Dinámica social</h2>
            </div>

            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-2">
                    ¿Te consideras una persona inquieta o pasiva?
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    Esto define si te emparejamos con alguien que quiera recorrer todo el evento o alguien que prefiera quedarse en un lugar tranquilo.
                  </p>
                  <div className="space-y-2">
                    {energias.map(e => (
                      <button
                        key={e.id}
                        onClick={() => setInquietoPasivo(e.id)}
                        className={`w-full p-3 rounded-lg border text-sm transition text-left ${
                          inquietoPasivo === e.id
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-medium">{e.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{e.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-5">
                  <label className="font-medium text-slate-900 block mb-2">
                    En una conversación, ¿tú eres más de hablar o de escuchar?
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    Un buen match suele ser complementario: alguien que escucha con alguien que habla, o dos equilibrados.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {rolesConversacion.map(r => (
                      <button
                        key={r.id}
                        onClick={() => setRolConversacion(r.id)}
                        className={`p-3 rounded-lg border text-sm transition text-left flex items-center gap-2 ${
                          rolConversacion === r.id
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {r.icon}
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-5">
                  <label className="font-medium text-slate-900 block mb-2">
                    ¿Qué tan social eres en general?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Muy social — conozco gente nueva fácil', 'Social moderado — depende del ambiente', 'Reservado/a — cuesta abrirme al principio', 'Introvertido/a — prefiero pocos y buenos'].map(o => (
                      <button
                        key={o}
                        onClick={() => setEnergiaSocial(o)}
                        className={`p-3 rounded-lg border text-sm transition text-left ${
                          energiaSocial === o
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PASO 4: TEMAS DE CONVERSACIÓN */}
        {paso === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-teal-100 text-teal-700">Paso 4</Badge>
              <h2 className="text-lg font-bold text-slate-900">Temas de conversación</h2>
            </div>
            <p className="text-sm text-slate-500">
              Marca los temas que <strong>te gustan</strong> hablar (verde) y los que <strong>prefieres evitar</strong> (rojo). Los demás quedan neutros.
            </p>

            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <label className="font-medium text-slate-900 block mb-3">
                    Selecciona tus preferencias de conversación
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {temasOpciones.map(tema => {
                      const esGusta = temasGusta.includes(tema)
                      const esNoGusta = temasNoGusta.includes(tema)
                      return (
                        <div key={tema} className="flex items-center gap-1">
                          <button
                            onClick={() => toggleTema(tema, 'gusta')}
                            className={`px-3 py-1.5 rounded-l-full border text-xs transition ${
                              esGusta
                                ? 'bg-green-50 border-green-300 text-green-700'
                                : 'border-slate-200 text-slate-400 hover:border-green-300'
                            }`}
                          >
                            ✓
                          </button>
                          <span className={`px-2 py-1.5 text-xs border-y transition ${
                            esGusta ? 'bg-green-50 border-green-300 text-green-700 font-medium' :
                            esNoGusta ? 'bg-red-50 border-red-300 text-red-700 font-medium' :
                            'bg-white border-slate-200 text-slate-600'
                          }`}>
                            {tema}
                          </span>
                          <button
                            onClick={() => toggleTema(tema, 'nogusta')}
                            className={`px-3 py-1.5 rounded-r-full border text-xs transition ${
                              esNoGusta
                                ? 'bg-red-50 border-red-300 text-red-700'
                                : 'border-slate-200 text-slate-400 hover:border-red-300'
                            }`}
                          >
                            ✕
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t pt-5">
                  <label className="font-medium text-slate-900 block mb-1">
                    ¿Hay un tema en particular del que podrías hablar horas?
                  </label>
                  <Textarea
                    placeholder="Ej: Podría hablar horas de música chilena de los 90, o de rutas de trekking en el Cajón del Maipo..."
                    value={temaFavorito}
                    onChange={e => setTemaFavorito(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-900 block mb-1">
                    ¿Hay algún tema que consideres tabú o incómodo en una primera salida?
                  </label>
                  <Textarea
                    placeholder="Ej: Prefiero no hablar de política o religión hasta conocer mejor a la persona..."
                    value={temaTabu}
                    onChange={e => setTemaTabu(e.target.value)}
                  />
                </div>

                {/* Resumen visual */}
                {(temasGusta.length > 0 || temasNoGusta.length > 0) && (
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-slate-700">Tu mapa de conversación:</p>
                    {temasGusta.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-green-600 font-medium">Te gusta:</span>
                        {temasGusta.map(t => (
                          <span key={t} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">{t}</span>
                        ))}
                      </div>
                    )}
                    {temasNoGusta.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-red-600 font-medium">Evitas:</span>
                        {temasNoGusta.map(t => (
                          <span key={t} className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Disclaimer seguridad */}
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Privacidad garantizada</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Esta información es confidencial. Los otros usuarios no ven tus respuestas directamente — 
                    solo usamos estos datos para calcular compatibilidad. Nunca mostramos si fumas, 
                    tomas, o tu estado emocional en tu perfil público.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* BOTONES NAVEGACIÓN */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setPaso(p => Math.max(1, p - 1))}
            disabled={paso === 1}
          >
            Anterior
          </Button>

          <div className="flex gap-2">
            {paso < totalPasos ? (
              <Button onClick={() => setPaso(p => Math.min(totalPasos, p + 1))} className="bg-teal-600 hover:bg-teal-700">
                Siguiente
              </Button>
            ) : (
              <Button onClick={handleGuardar} className="bg-teal-600 hover:bg-teal-700 gap-1">
                <Save className="w-4 h-4" /> Guardar perfil profundo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
