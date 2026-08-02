import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Users, Shield, MapPin, Calendar, Heart, Star, Zap, Check,
  Music, Dog, Coffee, Ticket, AlertTriangle, MessageCircle, ChevronRight,
  LogOut, User
} from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'concierto' | 'perro' | 'cafe'>('concierto')
  const { user, login, register, logout, error: authError } = useAuth()

  // Form login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginOpen, setLoginOpen] = useState(false)

  // Form registro
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regNombre, setRegNombre] = useState('')
  const [regOpen, setRegOpen] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(loginEmail, loginPassword)
      setLoginOpen(false)
      setLoginEmail('')
      setLoginPassword('')
    } catch {}
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(regEmail, regPassword, regNombre)
      setRegOpen(false)
      setRegEmail('')
      setRegPassword('')
      setRegNombre('')
    } catch {}
  }

  const panoramas = {
    concierto: {
      icon: <Ticket className="w-5 h-5" />,
      title: 'Concierto de Chayanne',
      user: 'María, 42 años',
      location: 'Movistar Arena, Santiago Centro',
      date: 'Sábado 4 de agosto, 21:00 hrs',
      budget: '$50.000 (entrada)',
      verb: 'Bailar y cantar',
      match: '87% compatibilidad'
    },
    perro: {
      icon: <Dog className="w-5 h-5" />,
      title: 'Paseo de perros',
      user: 'Juan, 35 años',
      location: 'Parque Bustamante, Ñuñoa',
      date: 'Todos los martes, 20:00 hrs',
      budget: 'Gratis',
      verb: 'Conversar y distraerse',
      match: '92% compatibilidad'
    },
    cafe: {
      icon: <Coffee className="w-5 h-5" />,
      title: 'Cerveza y música en Sala Portugal',
      user: 'Ana, 29 años',
      location: 'Sala Portugal, Recoleta',
      date: 'Viernes 9 de agosto, 22:00 hrs',
      budget: '$25.000 (cover)',
      verb: 'Bailar y conversar',
      match: '78% compatibilidad'
    }
  }

  const panorama = panoramas[activeTab]

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Panoramix</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#como-funciona" className="hover:text-teal-600 transition">Cómo funciona</a>
            <a href="#seguridad" className="hover:text-teal-600 transition">Seguridad</a>
            <a href="#precios" className="hover:text-teal-600 transition">Precios</a>
            <Link to="/eventos-rm" className="hover:text-teal-600 transition">Eventos RM</Link>
            <Link to="/perfil" className="hover:text-teal-600 transition">Mi Perfil</Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm text-slate-700">
                  <User className="w-4 h-4 text-teal-600" />
                  <span className="hidden sm:inline">{user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="text-slate-500 gap-1">
                  <LogOut className="w-3.5 h-3.5" /> Salir
                </Button>
              </div>
            ) : (
              <>
                <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">Ingresar</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Bienvenido a Panoramix</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4 py-4">
                      <Input
                        placeholder="Correo electrónico"
                        type="email"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Contraseña"
                        type="password"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        required
                      />
                      {authError && (
                        <p className="text-xs text-red-600">{authError}</p>
                      )}
                      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">Ingresar</Button>
                      <p className="text-xs text-center text-slate-500">
                        ¿No tienes cuenta?{' '}
                        <button type="button" className="text-teal-600 underline" onClick={() => { setLoginOpen(false); setRegOpen(true) }}>
                          Regístrate
                        </button>
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
                <Dialog open={regOpen} onOpenChange={setRegOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">Registrarse</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Crear cuenta en Panoramix</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleRegister} className="space-y-4 py-4">
                      <Input
                        placeholder="Nombre"
                        value={regNombre}
                        onChange={e => setRegNombre(e.target.value)}
                      />
                      <Input
                        placeholder="Correo electrónico"
                        type="email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Contraseña (mín. 6 caracteres)"
                        type="password"
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      {authError && (
                        <p className="text-xs text-red-600">{authError}</p>
                      )}
                      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">Crear cuenta</Button>
                      <p className="text-xs text-slate-500 text-center">
                        Al registrarte aceptas nuestros Términos y Política de Privacidad
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-teal-100/40 to-transparent rounded-bl-[120px]" />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 font-medium px-3 py-1">
                No es app de citas
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                No busques pareja.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                  Busca compañía.
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                ¿Compraste entradas para un concierto pero no tienes con quién ir?
                ¿Quieres pasear al perro pero te da pereza solo?
                Encuentra acompañantes de confianza para vivir experiencias juntos.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/crear-panorama">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-base px-8">
                    Crear mi primer panorama <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-base px-6">
                  Ver cómo funciona
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">
                      {['M','J','A','P'][i-1]}
                    </div>
                  ))}
                </div>
                <span>+200 personas ya encontraron compañía</span>
              </div>
            </div>
            <div className="relative">
              {/* MOCKUP CARD */}
              <Card className="shadow-2xl border-0 overflow-hidden max-w-sm mx-auto">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Match encontrado</span>
                    <Badge className="bg-white/20 text-white border-0">{panorama.match}</Badge>
                  </div>
                </div>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-teal-700 font-bold text-lg">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{panorama.user}</p>
                      <div className="flex items-center gap-1 text-amber-500">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                        <span className="text-xs text-slate-500 ml-1">12 panoramas</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      {panorama.icon}
                      <span className="font-medium">{panorama.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {panorama.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {panorama.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Zap className="w-4 h-4 text-slate-400" />
                      {panorama.verb}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">Aceptar</Button>
                    <Button size="sm" variant="outline" className="flex-1">Ver perfil</Button>
                  </div>
                </CardContent>
              </Card>
              {/* Tabs debajo de la card */}
              <div className="flex justify-center gap-2 mt-4">
                {(['concierto', 'perro', 'cafe'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      activeTab === t ? 'bg-teal-600 text-white' : 'bg-white text-slate-500 border shadow-sm'
                    }`}
                  >
                    {t === 'concierto' ? '🎵 Concierto' : t === 'perro' ? '🐕 Paseo' : '🍺 Salida'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-slate-100 text-slate-700 mb-4">Simple y rápido</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">¿Cómo funciona Panoramix?</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">Tres pasos para encontrar compañía y vivir experiencias sin preocupaciones.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                icon: <Calendar className="w-6 h-6 text-white" />,
                title: 'Crea tu panorama',
                desc: 'Describe qué quieres hacer, dónde, cuándo y qué tipo de compañía buscas. Desde un concierto hasta pasear al perro.'
              },
              {
                step: '2',
                icon: <Users className="w-6 h-6 text-white" />,
                title: 'Encuentra matches',
                desc: 'Nuestro algoritmo busca personas compatibles por ubicación, presupuesto, intereses y disponibilidad.'
              },
              {
                step: '3',
                icon: <MessageCircle className="w-6 h-6 text-white" />,
                title: 'Coordina y disfruta',
                desc: 'Chatea, acuerdan los detalles, llegan por separado al lugar público y evalúan la experiencia después.'
              }
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="bg-gradient-to-br from-slate-50 to-white border rounded-2xl p-8 hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-5 shadow-lg shadow-teal-200">
                    {item.icon}
                  </div>
                  <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 group-hover:text-teal-50 transition">{item.step}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EJEMPLOS DE PANORAMAS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-700 mb-4">Para todo tipo de actividades</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">¿Qué panorama quieres hacer?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Music className="w-6 h-6" />, title: 'Conciertos', desc: 'Encuentra compañía para tu artista favorito', color: 'from-rose-400 to-orange-400' },
              { icon: <Dog className="w-6 h-6" />, title: 'Paseo de mascotas', desc: 'Compañía para sacar al perro o gato', color: 'from-emerald-400 to-teal-400' },
              { icon: <Coffee className="w-6 h-6" />, title: 'Bares y cafés', desc: 'Una cerveza, un café, buena conversación', color: 'from-amber-400 to-yellow-400' },
              { icon: <Ticket className="w-6 h-6" />, title: 'Eventos y más', desc: 'Cine, trekking, ferias, deportes...', color: 'from-violet-400 to-purple-400' },
            ].map(cat => (
              <Card key={cat.title} className="border-0 shadow-sm hover:shadow-md transition group cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{cat.title}</h3>
                  <p className="text-sm text-slate-500">{cat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEGURIDAD */}
      <section id="seguridad" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-red-100 text-red-700 mb-4">Prioridad absoluta</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tu seguridad, nuestra misión</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Sabemos que salir con alguien que no conoces requiere confianza. Por eso Panoramix fue diseñado 
                con múltiples capas de seguridad desde el primer día.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-teal-600" />, title: 'Validación de identidad', desc: 'Foto de cédula + selfie obligatorios para crear panoramas.' },
                  { icon: <AlertTriangle className="w-5 h-5 text-red-500" />, title: 'Botón SOS', desc: 'Un toque y tus 2 contactos de seguridad reciben tu ubicación por SMS/WhatsApp.' },
                  { icon: <MapPin className="w-5 h-5 text-teal-600" />, title: 'Geofence inteligente', desc: 'Alerta automática si sales del área del panorama antes de tiempo.' },
                  { icon: <Star className="w-5 h-5 text-amber-500" />, title: 'Sistema de reputación', desc: 'Evaluaciones reales. Sin reputación, no hay match.' },
                  { icon: <Heart className="w-5 h-5 text-rose-500" />, title: 'Lugar público siempre', desc: 'Checklist obligatorio: llegar por separado, avisar a tu contacto, lugar público.' },
                ].map(f => (
                  <div key={f.title} className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-teal-50/50 transition">
                    <div className="mt-0.5">{f.icon}</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{f.title}</h4>
                      <p className="text-sm text-slate-600">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl rotate-3" />
              <Card className="relative shadow-xl border-0">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Contacto de seguridad</span>
                    <Badge className="bg-green-100 text-green-700">Verificado</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">L</div>
                      <div>
                        <p className="font-medium text-slate-900">Lucía (hermana)</p>
                        <p className="text-sm text-slate-500">+56 9 1234 5678</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold">P</div>
                      <div>
                        <p className="font-medium text-slate-900">Pedro (amigo)</p>
                        <p className="text-sm text-slate-500">+56 9 8765 4321</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button className="w-full bg-red-500 hover:bg-red-600 gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      BOTÓN SOS
                    </Button>
                    <p className="text-xs text-slate-500 text-center mt-2">Mantén presionado 3 segundos para activar</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* METODOLOGÍA DE PERFIL */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="bg-white/10 text-white mb-4">Diferencia clave</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">No preguntamos qué te gustaría hacer</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            La mayoría de apps te hace marcar "me gusta el trekking" aunque nunca has ido.
            Nosotros preguntamos qué <strong>hiciste</strong> el último fin de semana.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Card className="bg-white/10 border-white/10 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm text-slate-400 mb-2">❌ Otras apps</p>
                <p className="text-lg">"Marca tus intereses: trekking, cine, música, deportes..."</p>
                <p className="text-sm text-slate-400 mt-2">Resultado: deseos, no realidades</p>
              </CardContent>
            </Card>
            <Card className="bg-teal-500/20 border-teal-400/30 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm text-teal-300 mb-2">✅ Panoramix</p>
                <p className="text-lg">"¿Qué hiciste el último sábado que disfrutaste?"</p>
                <p className="text-sm text-teal-200 mt-2">Resultado: comportamiento real, matches verdaderos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-slate-100 text-slate-700 mb-4">Empieza gratis</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Elige tu plan</h2>
            <p className="text-slate-600 mt-3">Empieza gratis y upgrade cuando quieras más libertad.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900">Free</h3>
                <p className="text-3xl font-bold text-slate-900 mt-2">$0 <span className="text-base font-normal text-slate-500">/mes</span></p>
                <p className="text-sm text-slate-500 mt-1">Para probar y empezar</p>
                <Separator className="my-5" />
                <ul className="space-y-3">
                  {[
                    '1 panorama activo a la vez',
                    '3 matches por mes',
                    'Perfil básico',
                    'Chat con matches',
                    'Botón SOS',
                    'Publicidad display'
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-teal-600" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-6">Registrarse gratis</Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-teal-500 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-teal-600 text-white px-3">Más popular</Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900">Plus</h3>
                <p className="text-3xl font-bold text-teal-600 mt-2">$4.990 <span className="text-base font-normal text-slate-500">/mes</span></p>
                <p className="text-sm text-slate-500 mt-1">Para quienes salen seguido</p>
                <Separator className="my-5" />
                <ul className="space-y-3">
                  {[
                    'Panoramas ilimitados',
                    'Matches ilimitados',
                    'Sin publicidad',
                    'Filtros avanzados',
                    'Ver quién vio tu panorama',
                    'Destacar panoramas',
                    'Badge Plus (más confianza)'
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-teal-600" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-teal-600 hover:bg-teal-700">Empezar Plus</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Panoramix</span>
              </div>
              <p className="text-sm">Encuentra compañía para vivir experiencias. No es app de citas.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-white transition">Seguridad</a></li>
                <li><a href="#" className="hover:text-white transition">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-white transition">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">No es app de citas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>hola@panoramix.cl</li>
                <li>Santiago, Chile</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Interno</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/modelo-negocio" className="hover:text-white transition">Resumen Modelo de Negocio</Link></li>
                <li><Link to="/eventos-rm" className="hover:text-white transition">Eventos RM</Link></li>
                <li><Link to="/perfil" className="hover:text-white transition">Mi Perfil</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="bg-slate-800" />
          <p className="text-xs text-center mt-8">© 2025 Panoramix. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
