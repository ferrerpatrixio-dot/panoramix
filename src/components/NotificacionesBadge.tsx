import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import {
  demoObtenerNotificaciones, demoMarcarNotificacionLeida,
  demoMarcarTodasNotificacionesLeidas, type DemoNotificacion,
} from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Bell, Heart, CheckCircle, MessageCircle, Clock, AlertCircle,
  ChevronRight, Eye
} from 'lucide-react'

const ICONOS_TIPO: Record<DemoNotificacion['tipo'], React.ReactNode> = {
  interes_panorama: <Heart className="w-4 h-4 text-rose-500" />,
  seleccionado_companero: <CheckCircle className="w-4 h-4 text-teal-600" />,
  nuevo_mensaje: <MessageCircle className="w-4 h-4 text-blue-500" />,
  recordatorio: <Clock className="w-4 h-4 text-amber-500" />,
  sistema: <AlertCircle className="w-4 h-4 text-slate-500" />,
}

const COLORES_TIPO: Record<DemoNotificacion['tipo'], string> = {
  interes_panorama: 'bg-rose-50 text-rose-700 border-rose-100',
  seleccionado_companero: 'bg-teal-50 text-teal-700 border-teal-100',
  nuevo_mensaje: 'bg-blue-50 text-blue-700 border-blue-100',
  recordatorio: 'bg-amber-50 text-amber-700 border-amber-100',
  sistema: 'bg-slate-50 text-slate-700 border-slate-100',
}

export default function NotificacionesBadge() {
  const { user } = useAuth()
  const [notifs, setNotifs] = useState<DemoNotificacion[]>([])
  const [open, setOpen] = useState(false)

  const refresh = useCallback(() => {
    if (!user) return
    setNotifs(demoObtenerNotificaciones(user.uid))
  }, [user])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, 5000)
    return () => clearInterval(id)
  }, [refresh])

  if (!user) return null

  const noLeidas = notifs.filter(n => !n.leido)
  const count = noLeidas.length

  const handleMarcarLeida = (id: string) => {
    demoMarcarNotificacionLeida(id)
    refresh()
  }

  const handleMarcarTodas = () => {
    demoMarcarTodasNotificacionesLeidas(user.uid)
    refresh()
  }

  const linkParaNotif = (n: DemoNotificacion): string => {
    if (n.panoramaId && n.matchUserId) return `/chat/${n.panoramaId}/${n.matchUserId}`
    if (n.panoramaId) return `/mis-panoramas`
    return '/feed'
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative gap-1.5 text-slate-600 hover:text-teal-600">
          <Bell className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">Notificaciones</span>
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1">
              {count > 9 ? '9+' : count}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="p-3 border-b bg-slate-50 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">Notificaciones</p>
            <p className="text-xs text-slate-500">
              {count === 0 ? 'No tienes notificaciones nuevas' : `${count} sin leer`}
            </p>
          </div>
          {count > 0 && (
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-slate-500" onClick={handleMarcarTodas}>
              <Eye className="w-3 h-3" /> Marcar todas
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifs.length === 0 ? (
            <div className="p-6 text-center">
              <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Todo al día</p>
              <p className="text-xs text-slate-400">Cuando pase algo importante aparecerá aquí</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifs.map(n => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 p-3 transition ${n.leido ? 'opacity-60' : 'bg-white hover:bg-slate-50'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${COLORES_TIPO[n.tipo].split(' ')[0]}`}>
                    {ICONOS_TIPO[n.tipo]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{n.titulo}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{n.mensaje}</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {new Date(n.createdAt).toLocaleString('es-CL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    {!n.leido && (
                      <button
                        onClick={() => handleMarcarLeida(n.id)}
                        className="w-2.5 h-2.5 rounded-full bg-teal-500 hover:bg-teal-600"
                        title="Marcar como leída"
                      />
                    )}
                    {n.panoramaId && (
                      <Link
                        to={linkParaNotif(n)}
                        onClick={() => setOpen(false)}
                        className="text-slate-300 hover:text-teal-600"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
