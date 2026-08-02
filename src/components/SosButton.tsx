import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { demoObtenerContactos } from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { AlertTriangle, Phone, X, MessageCircle } from 'lucide-react'

export default function SosButton() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [presionando, setPresionando] = useState(false)
  const [activado, setActivado] = useState(false)

  const contactos = user ? demoObtenerContactos(user.uid) : []

  const handlePressStart = () => {
    setPresionando(true)
    setTimeout(() => {
      setPresionando(false)
      setActivado(true)
      setOpen(true)
    }, 1500)
  }

  const handlePressEnd = () => {
    setPresionando(false)
  }

  return (
    <>
      {/* BOTÓN FLOTANTE SOS */}
      <button
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          presionando
            ? 'bg-red-700 scale-110 ring-4 ring-red-300'
            : activado
            ? 'bg-red-600 animate-pulse'
            : 'bg-red-500 hover:bg-red-600'
        }`}
        title="Mantén presionado para activar SOS"
      >
        <AlertTriangle className="w-6 h-6 text-white" />
      </button>

      {/* MODAL SOS */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" /> Alerta de Emergencia Activada
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-sm text-red-700 font-medium">
                🚨 Se ha activado tu alerta de emergencia
              </p>
              <p className="text-xs text-red-500 mt-1">
                En producción, esto enviaría SMS/WhatsApp a tus contactos de seguridad con tu ubicación exacta.
              </p>
            </div>

            {contactos.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Tus contactos de seguridad:</p>
                {contactos.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{c.nombre}</p>
                      <p className="text-xs text-slate-500">{c.relacion} · {c.telefono}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0" asChild>
                        <a href={`tel:${c.telefono}`}><Phone className="w-3.5 h-3.5" /></a>
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0" asChild>
                        <a href={`https://wa.me/${c.telefono.replace(/\D/g, '')}?text=¡Emergencia! Necesito que me llames o vengas a buscarme.`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-700">No tienes contactos de emergencia configurados.</p>
                <p className="text-xs text-amber-500 mt-1">Ve a Mi Perfil para agregarlos.</p>
              </div>
            )}

            <div className="pt-2">
              <Button onClick={() => { setOpen(false); setActivado(false) }} variant="outline" className="w-full gap-1">
                <X className="w-4 h-4" /> Cerrar alerta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
