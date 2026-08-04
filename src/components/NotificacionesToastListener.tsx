import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'
import { demoObtenerNotificaciones, type DemoNotificacion } from '@/services/demoBackend'

const seenIds = new Set<string>()

export default function NotificacionesToastListener() {
  const { user } = useAuth()
  const prevNotifsRef = useRef<DemoNotificacion[]>([])

  useEffect(() => {
    if (!user) {
      seenIds.clear()
      return
    }

    // Precargar IDs existentes para no mostrar toasts de notificaciones viejas
    const existing = demoObtenerNotificaciones(user.uid)
    existing.forEach(n => seenIds.add(n.id))
    prevNotifsRef.current = existing

    const interval = setInterval(() => {
      const notifs = demoObtenerNotificaciones(user.uid)
      const nuevas = notifs.filter(n => !seenIds.has(n.id) && !n.leido)

      nuevas.forEach(n => {
        seenIds.add(n.id)
        toast(n.titulo, {
          description: n.mensaje,
          duration: 6000,
          action: n.panoramaId
            ? {
                label: 'Ver',
                onClick: () => {
                  window.location.href = n.matchUserId
                    ? `#/chat/${n.panoramaId}/${n.matchUserId}`
                    : `#/mis-panoramas`
                },
              }
            : undefined,
        })
      })

      prevNotifsRef.current = notifs
    }, 4000)

    return () => clearInterval(interval)
  }, [user])

  return null
}
