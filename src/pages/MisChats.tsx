import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { demoObtenerResumenChats, demoContarMensajesNoLeidos } from '@/services/demoBackend'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import NotificacionesBadge from '@/components/NotificacionesBadge'
import {
  Users, MessageCircle, ChevronRight, Search, Inbox,
  MessageSquare, Clock, Filter
} from 'lucide-react'

export default function MisChats() {
  const { user } = useAuth()
  const [chats, setChats] = useState<any[]>([])
  const [filtro, setFiltro] = useState<'todos' | 'noleidos'>('todos')
  const [busqueda, setBusqueda] = useState('')
  const [totalNoLeidos, setTotalNoLeidos] = useState(0)

  const cargarChats = () => {
    if (!user) return
    const resumen = demoObtenerResumenChats(user.uid)
    setChats(resumen)
    setTotalNoLeidos(demoContarMensajesNoLeidos(user.uid))
  }

  useEffect(() => {
    cargarChats()
    // Actualizar cada 3 segundos
    const interval = setInterval(cargarChats, 3000)
    return () => clearInterval(interval)
  }, [user])

  const chatsFiltrados = chats
    .filter(c => {
      if (filtro === 'noleidos') return c.noLeidos > 0
      return true
    })
    .filter(c => {
      if (!busqueda) return true
      const q = busqueda.toLowerCase()
      return (
        c.otroNombre.toLowerCase().includes(q) ||
        c.actividad.toLowerCase().includes(q)
      )
    })

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-sm">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-700">Inicia sesión para ver tus chats</h3>
            <Link to="/">
              <Button className="mt-4 bg-teal-600 hover:bg-teal-700">Ir al inicio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Panoramix</span>
          </Link>
          <div className="flex items-center gap-3">
            <NotificacionesBadge />
            <Link to="/feed">
              <Button variant="ghost" size="sm">Feed</Button>
            </Link>
            <Link to="/mis-panoramas">
              <Button variant="ghost" size="sm">Mis Panoramas</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* TÍTULO */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Inbox className="w-6 h-6 text-teal-600" />
              Mis Chats
              {totalNoLeidos > 0 && (
                <Badge className="bg-red-500 text-white">{totalNoLeidos}</Badge>
              )}
            </h1>
            <p className="text-sm text-slate-500">
              {chats.length} conversación{chats.length !== 1 ? 'es' : ''} activa{chats.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* FILTROS Y BÚSQUEDA */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Buscar por nombre o actividad..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={filtro === 'todos' ? 'default' : 'outline'}
              onClick={() => setFiltro('todos')}
              className={filtro === 'todos' ? 'bg-teal-600 hover:bg-teal-700' : ''}
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1" /> Todos
            </Button>
            <Button
              size="sm"
              variant={filtro === 'noleidos' ? 'default' : 'outline'}
              onClick={() => setFiltro('noleidos')}
              className={filtro === 'noleidos' ? 'bg-teal-600 hover:bg-teal-700' : ''}
            >
              <Filter className="w-3.5 h-3.5 mr-1" />
              No leídos
              {totalNoLeidos > 0 && (
                <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">{totalNoLeidos}</span>
              )}
            </Button>
          </div>
        </div>

        {/* LISTA DE CHATS */}
        {chatsFiltrados.length === 0 ? (
          <Card className="bg-slate-50 border-dashed">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-700">
                {filtro === 'noleidos' ? 'No hay mensajes sin leer' : 'Aún no tienes chats activos'}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {filtro === 'noleidos'
                  ? 'Todos tus mensajes están leídos.'
                  : 'Cuando alguien acepte tu panorama o tú aceptes uno, aparecerá aquí.'}
              </p>
              <Link to="/feed" className="inline-block mt-4">
                <Button variant="outline">Explorar panoramas</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {chatsFiltrados.map(chat => (
              <Link
                key={chat.panoramaId}
                to={`/chat/${chat.panoramaId}/${chat.matchUserId}`}
                className="block"
              >
                <Card className={`hover:shadow-md transition cursor-pointer ${
                  chat.noLeidos > 0 ? 'border-teal-300 bg-teal-50/30' : 'border-slate-200'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
                        chat.noLeidos > 0
                          ? 'bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {chat.otroNombre[0]}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900 truncate">{chat.otroNombre}</p>
                          {chat.noLeidos > 0 && (
                            <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0 shrink-0">
                              {chat.noLeidos}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 truncate">
                          {chat.actividad}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {chat.ultimoMensaje || 'Aún no hay mensajes'}
                        </p>
                      </div>

                      {/* Hora y flecha */}
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(chat.ultimoAt).toLocaleDateString('es-CL', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </p>
                        <ChevronRight className={`w-4 h-4 mt-1 ml-auto ${
                          chat.noLeidos > 0 ? 'text-teal-600' : 'text-slate-300'
                        }`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
