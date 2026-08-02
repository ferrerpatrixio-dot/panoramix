import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Users, ChevronLeft, Shield, AlertTriangle, Ban, CheckCircle } from 'lucide-react'

export default function Terminos() {
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
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-slate-500">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Términos, Condiciones y Políticas de Uso</h1>
          <p className="text-slate-500 mt-2">Última actualización: 2 de agosto de 2026</p>
        </div>

        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-red-800">Importante: Panoramix NO es una app de citas</p>
              <p className="text-sm text-red-600 mt-1">
                Esta plataforma está diseñada exclusivamente para encontrar compañía en actividades sociales, eventos y panoramas. 
                Cualquier uso con fines románticos, sexuales o de encuentros casuales está estrictamente prohibido.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* SECCIÓN 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" /> 1. Naturaleza del servicio
            </h2>
            <div className="space-y-2 text-slate-600 leading-relaxed">
              <p>Panoramix es una plataforma de conexión social para personas que buscan compañía en actividades específicas: conciertos, eventos, trekking, paseos de mascotas, visitas a bares, entre otros.</p>
              <p><strong>No es una aplicación de citas románticas, ni de encuentros casuales, ni de búsqueda de pareja.</strong></p>
              <p>La plataforma facilita el contacto inicial; el desarrollo de la actividad y cualquier interacción posterior es responsabilidad exclusiva de los usuarios.</p>
            </div>
          </section>

          <Separator />

          {/* SECCIÓN 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" /> 2. Requisitos de registro y validación
            </h2>
            <div className="space-y-2 text-slate-600 leading-relaxed">
              <p>Para utilizar Panoramix debes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Ser mayor de 18 años.</li>
                <li>Proporcionar información veraz en tu perfil.</li>
                <li>Completar el proceso de validación de identidad (fotografía de cédula de identidad + selfie en tiempo real).</li>
                <li>Registrar al menos un contacto de emergencia.</li>
                <li>Aceptar los presentes términos y condiciones.</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* SECCIÓN 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Ban className="w-5 h-5 text-red-600" /> 3. Conductas prohibidas (causan cierre inmediato de cuenta)
            </h2>
            <div className="bg-white border rounded-xl p-5 space-y-3">
              <p className="text-sm text-slate-500 mb-3">Las siguientes conductas resultarán en la desactivación inmediata de la cuenta sin previo aviso:</p>
              
              {[
                { titulo: 'Solicitar o insinuar encuentros románticos o sexuales', desc: 'Cualquier mensaje, descripción de panorama o comunicación con fines de cita romántica, encuentro sexual o buscar pareja está terminantemente prohibido.' },
                { titulo: 'No presentarse a un panorama sin avisar', desc: 'Aceptar un match y no asistir al panorama sin comunicación previa con la otra parte es una falta grave.' },
                { titulo: 'Comportamiento agresivo, intimidante o acosador', desc: 'Cualquier forma de acoso, intimidación, discriminación o lenguaje violento hacia otro usuario.' },
                { titulo: 'Proporcionar información falsa', desc: 'Mentir en el perfil, usar fotos de otra persona, falsificar datos de identidad.' },
                { titulo: 'Solicitar dinero o bienes a otros usuarios', desc: 'Pedir préstamos, entradas, pagos o cualquier tipo de compensación económica.' },
                { titulo: 'Usar la plataforma para actividades ilegales', desc: 'Venta de drogas, estafas, o cualquier actividad contraria a la ley chilena.' },
                { titulo: 'Crear múltiples cuentas', desc: 'Un usuario solo puede tener una cuenta activa.' },
                { titulo: 'Publicar contenido ofensivo o inapropiado', desc: 'Descripciones de panorama con lenguaje obsceno, discriminatorio o que promueva conductas riesgosas.' },
                { titulo: 'Compartir información privada de terceros', desc: 'Publicar datos personales, fotos o información de otros usuarios sin consentimiento.' },
                { titulo: 'Evadir la validación de identidad', desc: 'Intentar usar la plataforma sin completar el proceso de verificación requerido.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="font-medium text-slate-900">{item.titulo}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* SECCIÓN 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" /> 4. Sistema de reputación y evaluaciones
            </h2>
            <div className="space-y-2 text-slate-600 leading-relaxed">
              <p>Después de cada panorama completado, ambas partes deben evaluarse mutuamente.</p>
              <p>Las evaluaciones incluyen una calificación de 1 a 5 estrellas y preguntas sobre puntualidad, cumplimiento y disposición a repetir.</p>
              <p><strong>Las evaluaciones de 1 o 2 estrellas generan automáticamente una alerta en la consola de administración</strong> para revisión y posible contacto con las partes.</p>
              <p>Un usuario con promedio inferior a 3.0 estrellas y más de 3 evaluaciones negativas podrá ser desactivado temporal o permanentemente.</p>
            </div>
          </section>

          <Separator />

          {/* SECCIÓN 5 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" /> 5. Reclamos y descargos
            </h2>
            <div className="space-y-2 text-slate-600 leading-relaxed">
              <p>Si recibes una evaluación negativa que consideras injusta, tienes derecho a presentar un descargo dentro de los 7 días siguientes.</p>
              <p>El equipo de Panoramix revisará el caso, analizará el historial de ambas partes y emitirá una decisión que puede incluir:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Mantener la evaluación.</li>
                <li>Anular la evaluación si se demuestra que fue maliciosa.</li>
                <li>Desactivar la cuenta del usuario que incurrió en conducta indebida.</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* SECCIÓN 6 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" /> 6. Seguridad y responsabilidad
            </h2>
            <div className="space-y-2 text-slate-600 leading-relaxed">
              <p>Panoramix recomienda enfáticamente:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Acordar siempre un lugar público y concurrido para el encuentro.</li>
                <li>Llegar por separado al lugar de encuentro.</li>
                <li>Informar a tu contacto de emergencia sobre el panorama (hora, lugar, persona).</li>
                <li>Usar el botón SOS si te sientes en riesgo.</li>
                <li>No compartir información personal sensible (dirección exacta, lugar de trabajo) en la primera salida.</li>
              </ul>
              <p className="text-sm text-slate-500 mt-3">
                <strong>Panoramix no se hace responsable</strong> de incidentes que ocurran durante los panoramas. 
                Somos una plataforma de conexión, no una empresa de seguridad ni de organización de eventos.
              </p>
            </div>
          </section>

          <Separator />

          {/* SECCIÓN 7 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" /> 7. Privacidad de datos
            </h2>
            <div className="space-y-2 text-slate-600 leading-relaxed">
              <p>Tu información personal se almacena de forma segura y no se comparte con terceros con fines comerciales.</p>
              <p>La validación de identidad (cédula + selfie) se utiliza exclusivamente para verificar que eres quien dices ser. Estos documentos no son visibles para otros usuarios.</p>
              <p>Los datos de contacto de emergencia solo se utilizan cuando activas el botón SOS.</p>
            </div>
          </section>

          <Separator />

          {/* SECCIÓN 8 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" /> 8. Modificaciones y terminación
            </h2>
            <div className="space-y-2 text-slate-600 leading-relaxed">
              <p>Panoramix se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor 7 días después de su publicación.</p>
              <p>La plataforma puede suspender o cerrar cuentas que violen estas normas, sin derecho a reembolso de suscripciones pagadas.</p>
              <p>El usuario puede eliminar su cuenta en cualquier momento desde la configuración de perfil.</p>
            </div>
          </section>

          <Separator />

          {/* CONTACTO */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Contacto</h2>
            <p className="text-slate-600">
              Para reclamos, descargos o consultas sobre estos términos, escríbenos a{' '}
              <a href="mailto:legal@panoramix.cl" className="text-teal-600 underline">legal@panoramix.cl</a>
            </p>
          </section>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="gap-1">
              <ChevronLeft className="w-4 h-4" /> Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
