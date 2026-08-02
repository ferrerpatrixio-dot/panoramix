import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, ChevronLeft, MessageCircle, Clock, DollarSign, 
  Target, AlertTriangle, CheckCircle, ArrowDown,
  GitBranch, Zap, Brain
} from 'lucide-react'

export default function MapaOnboarding() {
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
            <Link to="/chat-onboarding" className="hover:text-teal-600 transition">Chat con Panxi</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-slate-500">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </Link>

        <div className="mb-8">
          <Badge className="bg-purple-100 text-purple-700 mb-2">USO INTERNO</Badge>
          <h1 className="text-3xl font-bold text-slate-900">Mapa de Onboarding Conversacional</h1>
          <p className="text-slate-500 mt-1">Flujo de Panxi: máximo 8 turnos, control de tokens, datos mínimos garantizados.</p>
        </div>

        {/* KPIs de Control */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Card className="bg-white border-l-4 border-l-teal-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-teal-600 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Máximo</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">8 turnos</p>
              <p className="text-xs text-slate-500">4 user + 4 Panxi</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Costo/user</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">~$0.02</p>
              <p className="text-xs text-slate-500">GPT-4o-mini</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Meta</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">≥5 datos</p>
              <p className="text-xs text-slate-500">de 7 mínimos</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-600 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Corte</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">Turno 8</p>
              <p className="text-xs text-slate-500">forzoso</p>
            </CardContent>
          </Card>
        </div>

        {/* FLUJO PRINCIPAL */}
        <div className="space-y-4">
          
          {/* TURNO 0 */}
          <FlujoCard 
            turno={0}
            quien="Panxi"
            tipo="apertura"
            mensaje="¡Hola! Soy Panxi 🌟 Cuéntame, ¿qué hiciste el último sábado que tuviste libre?"
            objetivo="Activar memoria real del usuario (no deseos, comportamiento)"
            tokens="~150"
          />
          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>

          {/* TURNO 1 */}
          <FlujoCard 
            turno={1}
            quien="Usuario"
            tipo="usuario"
            mensaje="[Describe su sábado — detecta ramificación]"
            objetivo="Detectar ramificación A/B/C/D según actividad mencionada"
            tokens="—"
          />
          
          {/* RAMAS */}
          <div className="grid md:grid-cols-4 gap-2 mb-2">
            <RamaCard label="Rama A" color="bg-rose-50 border-rose-200 text-rose-700" icon={<Zap className="w-3 h-3" />} desc="Eventos sociales" />
            <RamaCard label="Rama B" color="bg-blue-50 border-blue-200 text-blue-700" icon={<Brain className="w-3 h-3" />} desc="Introvertido/Casero" />
            <RamaCard label="Rama C" color="bg-emerald-50 border-emerald-200 text-emerald-700" icon={<Target className="w-3 h-3" />} desc="Outdoor/Activo" />
            <RamaCard label="Rama D" color="bg-amber-50 border-amber-200 text-amber-700" icon={<Users className="w-3 h-3" />} desc="Social cercano" />
          </div>
          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>

          {/* TURNO 2 */}
          <FlujoCard 
            turno={2}
            quien="Panxi"
            tipo="profundiza"
            mensaje="Profundiza en 1-2 ejes detectados de la rama correspondiente"
            objetivo="Confirmar hipótesis + detectar nivel de sociabilidad"
            tokens="~200"
          />
          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>

          {/* TURNO 3 */}
          <FlujoCard 
            turno={3}
            quien="Usuario"
            tipo="usuario"
            mensaje="[Responde — revela más datos]"
            objetivo="Extraer: sociabilidad, horario, presupuesto implícito"
            tokens="—"
          />
          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>

          {/* TURNO 4 */}
          <FlujoCard 
            turno={4}
            quien="Panxi"
            tipo="cruce"
            mensaje="Detecta qué datos faltan y pregunta estratégicamente"
            objetivo="Rellenar gaps: presupuesto, horario, comuna, dealbreakers"
            tokens="~180"
          />
          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>

          {/* TURNO 5 */}
          <FlujoCard 
            turno={5}
            quien="Usuario"
            tipo="usuario"
            mensaje="[Responde — últimos datos clave]"
            objetivo="Completar checklist de datos mínimos"
            tokens="—"
          />
          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>

          {/* TURNO 6 */}
          <FlujoCard 
            turno={6}
            quien="Panxi"
            tipo="ultima"
            mensaje="Última pregunta estratégica + anticipa cierre"
            objetivo="Obtener dato faltante o confirmar preferencias"
            tokens="~150"
          />
          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>

          {/* TURNO 7 */}
          <FlujoCard 
            turno={7}
            quien="Usuario"
            tipo="usuario"
            mensaje="[Última respuesta]"
            objetivo="Cualquier dato adicional antes del cierre"
            tokens="—"
          />
          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>

          {/* TURNO 8 - CIERRE */}
          <Card className="border-2 border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">8</div>
                <div>
                  <Badge className="bg-purple-100 text-purple-700">CIERRE FORZOSO</Badge>
                  <p className="font-semibold text-slate-900">Panxi genera perfil</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 ml-[52px]">
                "¡Gracias por compartir! Ya tengo una buena idea de tu estilo. Déjame armar tu perfil..."
              </p>
              <div className="ml-[52px] mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white rounded text-xs text-purple-700 border border-purple-200">Llama a GPT con historial completo</span>
                <span className="px-2 py-1 bg-white rounded text-xs text-purple-700 border border-purple-200">Extrae: estilo, intereses, presupuesto, comunas</span>
                <span className="px-2 py-1 bg-white rounded text-xs text-purple-700 border border-purple-200">Muestra perfil para confirmar/editar</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CHECKLIST DE DATOS */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            Checklist de Datos Mínimos
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { dato: 'Estilo de vida', detect: 'Qué hace los fines de semana', prio: 'Alta', ok: true },
              { dato: 'Intereses temáticos', detect: 'Música, deporte, arte, gastronomía', prio: 'Alta', ok: true },
              { dato: 'Nivel de sociabilidad', detect: 'Solo vs grupo, inicia vs espera', prio: 'Alta', ok: true },
              { dato: 'Presupuesto implícito', detect: 'Cuánto gasta en salidas', prio: 'Media', ok: false },
              { dato: 'Horario preferido', detect: 'Día, tarde, noche, finde', prio: 'Media', ok: false },
              { dato: 'Comuna/zona', detect: 'Dónde vive o se mueve', prio: 'Media', ok: false },
              { dato: 'Dealbreakers', detect: 'Panorama que NUNCA haría', prio: 'Baja', ok: false },
            ].map(item => (
              <div key={item.dato} className={`flex items-center gap-3 p-3 rounded-lg border ${item.ok ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.ok ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {item.ok ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs">?</span>}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{item.dato}</p>
                  <p className="text-xs text-slate-500">{item.detect}</p>
                </div>
                <Badge className={item.prio === 'Alta' ? 'bg-red-100 text-red-700' : item.prio === 'Media' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}>
                  {item.prio}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* ANTI WASTE */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Estrategias Anti-Token-Waste
          </h2>
          <div className="space-y-3">
            {[
              { titulo: 'Usuario Tacaño de Datos', desc: 'Si responde <5 palabras 3 veces → cambio a modo múltiple choice', icon: <GitBranch className="w-4 h-4 text-amber-600" /> },
              { titulo: 'Charlatanería Infinita', desc: 'Si escribe >100 palabras → GPT resume y salta al siguiente dato', icon: <MessageCircle className="w-4 h-4 text-amber-600" /> },
              { titulo: 'Cierre Forzoso Turno 8', desc: 'Independiente de lo que falte, Panxi cierra y arma perfil', icon: <Target className="w-4 h-4 text-amber-600" /> },
              { titulo: 'Historial Truncado', desc: 'Solo últimos 6 mensajes en prompt. Anteriores resumidos en 1 línea.', icon: <Clock className="w-4 h-4 text-amber-600" /> },
              { titulo: 'Fallback Sin LLM', desc: 'Si ambas API keys fallan → muestra formulario rápido de 5 botones', icon: <Zap className="w-4 h-4 text-amber-600" /> },
            ].map(s => (
              <Card key={s.titulo} className="bg-white border-amber-200">
                <CardContent className="p-4 flex items-start gap-3">
                  {s.icon}
                  <div>
                    <p className="font-medium text-slate-900">{s.titulo}</p>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link to="/chat-onboarding">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 gap-2">
              <MessageCircle className="w-4 h-4" />
              Probar Chat con Panxi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function FlujoCard({ turno, quien, tipo, mensaje, objetivo, tokens }: {
  turno: number
  quien: string
  tipo: 'apertura' | 'profundiza' | 'cruce' | 'ultima' | 'usuario'
  mensaje: string
  objetivo: string
  tokens: string
}) {
  const colores = {
    apertura: 'bg-teal-50 border-teal-200',
    profundiza: 'bg-blue-50 border-blue-200',
    cruce: 'bg-amber-50 border-amber-200',
    ultima: 'bg-orange-50 border-orange-200',
    usuario: 'bg-white border-slate-200',
  }

  const badgeColores = {
    apertura: 'bg-teal-100 text-teal-700',
    profundiza: 'bg-blue-100 text-blue-700',
    cruce: 'bg-amber-100 text-amber-700',
    ultima: 'bg-orange-100 text-orange-700',
    usuario: 'bg-slate-100 text-slate-600',
  }

  return (
    <Card className={`${colores[tipo]} border`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            quien === 'Panxi' ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' : 'bg-teal-100 text-teal-700'
          }`}>
            {turno}
          </div>
          <div className="flex items-center gap-2">
            <Badge className={badgeColores[tipo]}>
              {quien === 'Panxi' ? '🤖 Panxi' : '👤 Usuario'}
            </Badge>
            {tokens !== '—' && (
              <span className="text-xs text-slate-400">~{tokens} tokens</span>
            )}
          </div>
        </div>
        <p className="text-sm text-slate-700 ml-11">{mensaje}</p>
        <p className="text-xs text-slate-400 ml-11 mt-1">🎯 {objetivo}</p>
      </CardContent>
    </Card>
  )
}

function RamaCard({ label, color, icon, desc }: { label: string; color: string; icon: React.ReactNode; desc: string }) {
  return (
    <div className={`${color} border rounded-lg p-2 text-center`}>
      <div className="flex items-center justify-center gap-1 mb-1">
        {icon}
        <span className="text-xs font-bold">{label}</span>
      </div>
      <p className="text-xs opacity-80">{desc}</p>
    </div>
  )
}
