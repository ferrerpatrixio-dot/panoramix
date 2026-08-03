import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { demoContarMensajesNoLeidos, demoObtenerResumenChats } from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Bell, MessageCircle, ChevronRight } from 'lucide-react'

export default function NotificacionesBadge() {
  const { user } = useAuth()
  const [count, setCount] = useState(0)
  const [chats, setChats] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const refresh = useCallback(() => {
    if (!user) return
    setCount(demoContarMensajesNoLeidos(user.uid))
    setChats(demoObtenerResumenChats(user.uid).filter(c => c.noLeidos > 0))
  }, [user])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, 3000)
    return () => clearInterval(id)
  }, [refresh])

  if (!user) return null

  const chatsConNotificacion = chats

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
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b bg-slate-50">
          <p className="text-sm font-semibold text-slate-800">Notificaciones</p>
          <p className="text-xs text-slate-500">
            {count === 0 ? 'No tienes mensajes nuevos' : `${count} mensaje${count !== 1 ? 's' : ''} sin leer`}
          </p>
        </div>
        <div className="max-h-72 overflow-y-auto">
          {chatsConNotificacion.length === 0 ? (
            <div className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Todo al día</p>
              <p className="text-xs text-slate-400">Cuando tengas mensajes nuevos aparecerán aquí</p>
            </div>
          ) : (
            <div className="divide-y">
              {chatsConNotificacion.map(c => (
                <Link
                  key={c.panoramaId}
                  to={`/chat/${c.panoramaId}/${c.matchUserId}`}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 p-3 hover:bg-slate-50 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-teal-700 font-bold text-xs shrink-0 mt-0.5">
                    {c.otroNombre[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-900 truncate">{c.otroNombre}</p>
                      <Badge className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0 shrink-0">{c.noLeidos}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{c.actividad}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{c.ultimoMensaje}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-2" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
