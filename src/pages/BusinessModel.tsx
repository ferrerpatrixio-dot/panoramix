import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Users, DollarSign, Target, TrendingUp, Shield, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router'

export default function BusinessModel() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Panoramix</span>
          </div>
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            Uso INTERNO
          </Badge>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-10">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-slate-500">
              <ChevronLeft className="w-4 h-4 mr-1" /> Volver al sitio
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Resumen del Modelo de Negocio
          </h1>
          <p className="text-slate-500">Documento confidencial para discusión con socios e inversionistas</p>
        </div>

        {/* PROPUESTA DE VALOR */}
        <Card className="mb-6 border-l-4 border-l-teal-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">Propuesta de Valor Única</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              <strong>"No busques pareja. Busca compañía para vivir experiencias."</strong>
            </p>
            <p className="text-slate-600 mt-2">
              Panoramix es la única plataforma diseñada exclusivamente para encontrar acompañantes de confianza para actividades específicas, con énfasis en seguridad, compatibilidad real (no deseos) y comunidad. No es para citas románticas ni encuentros casuales.
            </p>
          </CardContent>
        </Card>

        {/* PÚBLICO OBJETIVO */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">Público Objetivo</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <Badge className="bg-rose-100 text-rose-700 mb-2">Primario</Badge>
                <p className="font-semibold text-slate-900">Adultos solos por circunstancia</p>
                <p className="text-sm text-slate-600 mt-1">Separados/divorciados (35-55), viudos de tercera edad (60+), solteros cuyos amigos no comparten gustos</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <Badge className="bg-blue-100 text-blue-700 mb-2">Secundario</Badge>
                <p className="font-semibold text-slate-900">Jóvenes profesionales</p>
                <p className="text-sm text-slate-600 mt-1">25-35 años, recién llegados a una ciudad, amigos ocupados, quieren hacer actividades específicas</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <Badge className="bg-purple-100 text-purple-700 mb-2">Terciario</Badge>
                <p className="font-semibold text-slate-900">Nómadas digitales</p>
                <p className="text-sm text-slate-600 mt-1">Personas que viajan solas y quieren compañía para excursiones, cenas, eventos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MODELO DE INGRESOS */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">Modelo de Ingresos (Freemium)</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-slate-900">Plan Free</h3>
                <p className="text-2xl font-bold text-slate-900">$0</p>
                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                  <li>• 1 panorama activo</li>
                  <li>• 3 matches/mes</li>
                  <li>• Perfil básico</li>
                  <li>• Publicidad display</li>
                </ul>
              </div>
              <div className="border-2 border-teal-500 rounded-lg p-4 bg-teal-50/30">
                <h3 className="font-bold text-slate-900">Plan Plus</h3>
                <p className="text-2xl font-bold text-teal-600">$4.990<span className="text-sm text-slate-500 font-normal">/mes</span></p>
                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                  <li>• Panoramas ilimitados</li>
                  <li>• Matches ilimitados</li>
                  <li>• Sin publicidad</li>
                  <li>• Filtros avanzados</li>
                  <li>• Destacar panorama</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-slate-900">Plan Pro (futuro)</h3>
                <p className="text-2xl font-bold text-slate-900">$9.990<span className="text-sm text-slate-500 font-normal">/mes</span></p>
                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                  <li>• Todo lo anterior</li>
                  <li>• Asistencia prioritaria</li>
                  <li>• Eventos exclusivos</li>
                </ul>
              </div>
            </div>

            <Separator className="my-4" />

            <h3 className="font-semibold text-slate-900 mb-2">Ingresos adicionales (Fase 2+)</h3>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-900">Publicidad segmentada</p>
                <p className="text-slate-600">Eventos patrocinados según perfil</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-900">Afiliados</p>
                <p className="text-slate-600">Comisión por venta de entradas (Passline, Ticketmaster)</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-900">Partnerships</p>
                <p className="text-slate-600">Descuentos en restaurantes/bares asociados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ESTRATEGIA DE CRECIMIENTO */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">Estrategia de Crecimiento</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge className="bg-green-100 text-green-700 mt-0.5 shrink-0">1</Badge>
                <div>
                  <p className="font-medium text-slate-900">SEO / GEO Orgánico (Free)</p>
                  <p className="text-sm text-slate-600">Landing pages por categoría y comuna, blog de contenido, Schema.org Event markup, Google My Business</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-700 mt-0.5 shrink-0">2</Badge>
                <div>
                  <p className="font-medium text-slate-900">Google Ads + Meta Ads</p>
                  <p className="text-sm text-slate-600">Keywords: "con quién ir a [evento]", "acompañante para concierto", remarketing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-purple-100 text-purple-700 mt-0.5 shrink-0">3</Badge>
                <div>
                  <p className="font-medium text-slate-900">Viralidad Orgánica</p>
                  <p className="text-sm text-slate-600">Botón "Compartir panorama" en WhatsApp/IG, invitar amigos = créditos Plus</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-amber-100 text-amber-700 mt-0.5 shrink-0">4</Badge>
                <div>
                  <p className="font-medium text-slate-900">Partnerships Estratégicos</p>
                  <p className="text-sm text-slate-600">Widget en Passline.cl: "¿Buscar compañía para este evento?", cupones con restaurantes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-rose-100 text-rose-700 mt-0.5 shrink-0">5</Badge>
                <div>
                  <p className="font-medium text-slate-900">Community-Led Growth</p>
                  <p className="text-sm text-slate-600">Grupos por comuna/interés, embajadores locales, contenido UGC</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PROYECCIÓN FINANCIERA */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">Proyección Financiera Simplificada</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold text-slate-900">Métrica</th>
                    <th className="text-right py-2 px-3 font-semibold text-slate-900">Fase 1 (6 meses)</th>
                    <th className="text-right py-2 px-3 font-semibold text-slate-900">Fase 2 (12 meses)</th>
                    <th className="text-right py-2 px-3 font-semibold text-slate-900">Fase 3 (24 meses)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3">Usuarios registrados</td>
                    <td className="text-right py-2 px-3">1.000</td>
                    <td className="text-right py-2 px-3">10.000</td>
                    <td className="text-right py-2 px-3">100.000</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3">MAU (activos mensuales)</td>
                    <td className="text-right py-2 px-3">200</td>
                    <td className="text-right py-2 px-3">2.000</td>
                    <td className="text-right py-2 px-3">20.000</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3">Usuarios Plus</td>
                    <td className="text-right py-2 px-3">50 (5%)</td>
                    <td className="text-right py-2 px-3">400 (4%)</td>
                    <td className="text-right py-2 px-3">2.000 (2%)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3">Ingreso mensual</td>
                    <td className="text-right py-2 px-3 font-medium text-teal-600">~$250K</td>
                    <td className="text-right py-2 px-3 font-medium text-teal-600">~$3M</td>
                    <td className="text-right py-2 px-3 font-medium text-teal-600">~$15M+</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3">Costos operativos/mes</td>
                    <td className="text-right py-2 px-3">~$1.7M</td>
                    <td className="text-right py-2 px-3">~$4.8M</td>
                    <td className="text-right py-2 px-3">~$8M</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">Estado</td>
                    <td className="text-right py-2 px-3 text-red-600 font-medium">Inversión</td>
                    <td className="text-right py-2 px-3 text-amber-600 font-medium">Cerca del equilibrio</td>
                    <td className="text-right py-2 px-3 text-green-600 font-medium">Rentable</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3">*Cifras en pesos chilenos (CLP). Proyecciones sujetas a validación de mercado en Fase 0.</p>
          </CardContent>
        </Card>

        {/* SEGURIDAD COMO DIFERENCIADOR */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">Seguridad como Diferenciador</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-slate-900">✅ Validación de identidad (Fase 1+)</p>
                <p className="font-medium text-slate-900">✅ Botón SOS con geolocalización</p>
                <p className="font-medium text-slate-900">✅ 2 contactos de seguridad obligatorios</p>
                <p className="font-medium text-slate-900">✅ Geofence inteligente por panorama</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-slate-900">✅ Sistema de reputación post-panorama</p>
                <p className="font-medium text-slate-900">✅ Perfil progresivo (no se muestra todo)</p>
                <p className="font-medium text-slate-900">✅ Chat reportable y bloqueable</p>
                <p className="font-medium text-slate-900">✅ Lugar público siempre</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* VENTAJA COMPETITIVA */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Ventaja Competitiva vs. Alternativas</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold">Competidor</th>
                    <th className="text-left py-2 px-3 font-semibold">Enfoque</th>
                    <th className="text-left py-2 px-3 font-semibold text-teal-700">Diferencia Panoramix</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3 font-medium">Tinder / Bumble</td>
                    <td className="py-2 px-3">Citas / romance</td>
                    <td className="py-2 px-3 text-teal-700">NO buscamos pareja ni sexo</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3 font-medium">Bumble BFF</td>
                    <td className="py-2 px-3">Amistades generales</td>
                    <td className="py-2 px-3 text-teal-700">Actividades específicas 1:1, no amistad general</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3 font-medium">Meetup</td>
                    <td className="py-2 px-3">Grupos y eventos</td>
                    <td className="py-2 px-3 text-teal-700">Matching inteligente 1:1 con seguridad</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3 font-medium">Couchsurfing</td>
                    <td className="py-2 px-3">Turismo / encuentros</td>
                    <td className="py-2 px-3 text-teal-700">Validación ID, SOS, reputación verificada</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Grupos Facebook</td>
                    <td className="py-2 px-3">Comunidades</td>
                    <td className="py-2 px-3 text-teal-700">Matching, chat seguro, reputación, SOS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* PRÓXIMOS PASOS */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Próximos Pasos Inmediatos</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <Badge className="bg-slate-100 text-slate-700 shrink-0">Sem 1-2</Badge>
                <p className="text-slate-700">Validar nombre y dominio (<code>panoramix.cl</code>), registrar redes sociales</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-slate-100 text-slate-700 shrink-0">Sem 2-3</Badge>
                <p className="text-slate-700">Diseñar flujo de onboarding y perfil (metodología conductual clave)</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-slate-100 text-slate-700 shrink-0">Sem 3-4</Badge>
                <p className="text-slate-700">Construir MVP Fase 0 (Firebase + React básico)</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-slate-100 text-slate-700 shrink-0">Sem 4-6</Badge>
                <p className="text-slate-700">Lanzar beta cerrada (50 usuarios, Santiago centro/ñuñoa/providencia)</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-slate-100 text-slate-700 shrink-0">Sem 6-8</Badge>
                <p className="text-slate-700">Medir, iterar, decidir si pasa a Fase 1 o pivotear</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/">
            <Button variant="outline" size="lg">
              <ChevronLeft className="w-4 h-4 mr-1" /> Volver al sitio principal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
