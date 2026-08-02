import { useState, useMemo, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Users, MapPin, Calendar, Search, Music, Ticket, Theater,
  Wine, Palette, Bike, ChevronRight, Filter, Star, MapPinned
} from 'lucide-react'

interface Evento {
  id: string
  titulo: string
  artista: string
  fecha: string
  hora: string
  lugar: string
  comuna: string
  direccion: string
  precioDesde: number
  precioHasta: number
  categoria: string
  imagen: string
  productora: 'Passline' | 'Ticketmaster' | 'Puntoticket'
  urlProductora: string
  disponibilidad: 'Disponible' | 'Últimas entradas' | 'Agotado'
}

const eventosRM: Evento[] = [
  {
    id: '1', titulo: 'Chayanne - Bailemos Otra Vez Tour', artista: 'Chayanne',
    fecha: '2026-08-15', hora: '21:00', lugar: 'Movistar Arena', comuna: 'Santiago Centro',
    direccion: 'Tupper 2057', precioDesde: 45000, precioHasta: 180000,
    categoria: 'Concierto', imagen: '🎤', productora: 'Ticketmaster', urlProductora: 'https://ticketmaster.cl',
    disponibilidad: 'Disponible'
  },
  {
    id: '2', titulo: 'Lollapalooza Chile 2026', artista: 'Varios artistas',
    fecha: '2026-03-20', hora: '12:00', lugar: 'Parque Bicentenario Cerrillos', comuna: 'Cerrillos',
    direccion: 'Avenida Pedro Aguirre Cerda', precioDesde: 85000, precioHasta: 350000,
    categoria: 'Festival', imagen: '🎸', productora: 'Puntoticket', urlProductora: 'https://puntoticket.com',
    disponibilidad: 'Últimas entradas'
  },
  {
    id: '3', titulo: 'Stand Up: Felipe Avello', artista: 'Felipe Avello',
    fecha: '2026-08-22', hora: '20:30', lugar: 'Teatro Caupolicán', comuna: 'Santiago Centro',
    direccion: 'San Diego 850', precioDesde: 25000, precioHasta: 55000,
    categoria: 'Teatro/Comedia', imagen: '🎭', productora: 'Passline', urlProductora: 'https://passline.cl',
    disponibilidad: 'Disponible'
  },
  {
    id: '4', titulo: 'Ricardo Arjona - Blanco y Negro', artista: 'Ricardo Arjona',
    fecha: '2026-09-05', hora: '21:00', lugar: 'Movistar Arena', comuna: 'Santiago Centro',
    direccion: 'Tupper 2057', precioDesde: 55000, precioHasta: 220000,
    categoria: 'Concierto', imagen: '🎹', productora: 'Ticketmaster', urlProductora: 'https://ticketmaster.cl',
    disponibilidad: 'Disponible'
  },
  {
    id: '5', titulo: 'Feria de las Pulgas de Franklin', artista: 'Varios expositores',
    fecha: '2026-08-10', hora: '10:00', lugar: 'Plaza Franklin', comuna: 'San Miguel',
    direccion: 'Plaza Franklin s/n', precioDesde: 0, precioHasta: 0,
    categoria: 'Feria', imagen: '🛍️', productora: 'Passline', urlProductora: 'https://passline.cl',
    disponibilidad: 'Disponible'
  },
  {
    id: '6', titulo: 'Trekking Nocturno Cerro San Cristóbal', artista: 'Guía externo',
    fecha: '2026-08-12', hora: '19:00', lugar: 'Cerro San Cristóbal', comuna: 'Providencia',
    direccion: 'Entrada Pedro de Valdivia', precioDesde: 0, precioHasta: 5000,
    categoria: 'Outdoor', imagen: '🏔️', productora: 'Passline', urlProductora: 'https://passline.cl',
    disponibilidad: 'Disponible'
  },
  {
    id: '7', titulo: 'Los Bunkers - Concierto Acústico', artista: 'Los Bunkers',
    fecha: '2026-08-28', hora: '20:00', lugar: 'Teatro Coliseo', comuna: 'Santiago Centro',
    direccion: 'Natániel Cox 65', precioDesde: 35000, precioHasta: 75000,
    categoria: 'Concierto', imagen: '🎸', productora: 'Passline', urlProductora: 'https://passline.cl',
    disponibilidad: 'Últimas entradas'
  },
  {
    id: '8', titulo: 'Cine al Aire Libre - Parque Bustamante', artista: 'Varias películas',
    fecha: '2026-08-14', hora: '19:30', lugar: 'Parque Bustamante', comuna: 'Ñuñoa',
    direccion: 'Ramón Carnicer / Irarrázaval', precioDesde: 0, precioHasta: 0,
    categoria: 'Cine', imagen: '🎬', productora: 'Passline', urlProductora: 'https://passline.cl',
    disponibilidad: 'Disponible'
  },
  {
    id: '9', titulo: 'Wine Tasting - Viña Concha y Toro', artista: 'Sommelier invitado',
    fecha: '2026-08-20', hora: '18:00', lugar: 'Viña Concha y Toro', comuna: 'Pirque',
    direccion: 'Ruta 68, km 12', precioDesde: 25000, precioHasta: 45000,
    categoria: 'Gastronomía', imagen: '🍷', productora: 'Puntoticket', urlProductora: 'https://puntoticket.com',
    disponibilidad: 'Disponible'
  },
  {
    id: '10', titulo: 'Mon Laferte - Tour 2026', artista: 'Mon Laferte',
    fecha: '2026-09-12', hora: '21:00', lugar: 'Movistar Arena', comuna: 'Santiago Centro',
    direccion: 'Tupper 2057', precioDesde: 40000, precioHasta: 150000,
    categoria: 'Concierto', imagen: '🎤', productora: 'Ticketmaster', urlProductora: 'https://ticketmaster.cl',
    disponibilidad: 'Disponible'
  },
  {
    id: '11', titulo: 'Exposición Frida Kahlo Inmersiva', artista: 'Exposición',
    fecha: '2026-08-30', hora: '10:00', lugar: 'Centro Cultural La Moneda', comuna: 'Santiago Centro',
    direccion: 'Teatinos 280', precioDesde: 12000, precioHasta: 18000,
    categoria: 'Arte', imagen: '🎨', productora: 'Puntoticket', urlProductora: 'https://puntoticket.com',
    disponibilidad: 'Disponible'
  },
  {
    id: '12', titulo: 'Cicletada Familiar - Ñuñoa', artista: 'Municipalidad de Ñuñoa',
    fecha: '2026-08-17', hora: '09:00', lugar: 'Plaza Ñuñoa', comuna: 'Ñuñoa',
    direccion: 'Plaza Ñuñoa s/n', precioDesde: 0, precioHasta: 0,
    categoria: 'Deporte', imagen: '🚴', productora: 'Passline', urlProductora: 'https://passline.cl',
    disponibilidad: 'Disponible'
  },
]

const categorias = ['Todas', 'Concierto', 'Festival', 'Teatro/Comedia', 'Outdoor', 'Cine', 'Gastronomía', 'Arte', 'Deporte', 'Feria']
const comunas = ['Todas', 'Santiago Centro', 'Ñuñoa', 'Providencia', 'San Miguel', 'Cerrillos', 'Pirque', 'Las Condes', 'Recoleta', 'La Florida']

const catIcon: Record<string, ReactNode> = {
  'Concierto': <Music className="w-4 h-4" />,
  'Festival': <Music className="w-4 h-4" />,
  'Teatro/Comedia': <Theater className="w-4 h-4" />,
  'Outdoor': <MapPinned className="w-4 h-4" />,
  'Cine': <Ticket className="w-4 h-4" />,
  'Gastronomía': <Wine className="w-4 h-4" />,
  'Arte': <Palette className="w-4 h-4" />,
  'Deporte': <Bike className="w-4 h-4" />,
  'Feria': <Star className="w-4 h-4" />,
}

export default function EventosRM() {
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')
  const [filtroComuna, setFiltroComuna] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const eventosFiltrados = useMemo(() => {
    return eventosRM.filter(e => {
      if (filtroCategoria !== 'Todas' && e.categoria !== filtroCategoria) return false
      if (filtroComuna !== 'Todas' && e.comuna !== filtroComuna) return false
      if (busqueda && !e.titulo.toLowerCase().includes(busqueda.toLowerCase()) && !e.artista.toLowerCase().includes(busqueda.toLowerCase())) return false
      return true
    }).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
  }, [filtroCategoria, filtroComuna, busqueda])

  const formatearFecha = (fechaStr: string) => {
    const date = new Date(fechaStr + 'T00:00:00')
    return date.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Panoramix</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-teal-600 transition">Inicio</Link>
            <Link to="/eventos-rm" className="text-teal-600">Eventos RM</Link>
            <Link to="/perfil" className="hover:text-teal-600 transition">Mi Perfil</Link>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-white/20 text-white border-0">Actualizado diariamente</Badge>
            <Badge className="bg-white/20 text-white border-0">{eventosRM.length} eventos</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Principales Eventos en RM</h1>
          <p className="text-teal-100">Encuentra un evento cerca de ti y busca compañía para ir. Datos de Passline, Ticketmaster y Puntoticket.</p>

          {/* BARRA DE BÚSQUEDA */}
          <div className="mt-6 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar artista, evento o lugar..."
                className="pl-10 bg-white text-slate-900 border-0"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/20 bg-transparent"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
            >
              <Filter className="w-4 h-4 mr-1" /> Filtros
            </Button>
          </div>

          {/* FILTROS EXPANDIBLES */}
          {mostrarFiltros && (
            <div className="mt-4 p-4 bg-white/10 rounded-xl backdrop-blur">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-teal-100 mb-1 block">Categoría</label>
                  <div className="flex flex-wrap gap-2">
                    {categorias.map(c => (
                      <button
                        key={c}
                        onClick={() => setFiltroCategoria(c)}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          filtroCategoria === c
                            ? 'bg-white text-teal-700 font-medium'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-teal-100 mb-1 block">Comuna</label>
                  <div className="flex flex-wrap gap-2">
                    {comunas.map(c => (
                      <button
                        key={c}
                        onClick={() => setFiltroComuna(c)}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          filtroComuna === c
                            ? 'bg-white text-teal-700 font-medium'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LISTADO DE EVENTOS */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600">
            Mostrando <strong>{eventosFiltrados.length}</strong> eventos
            {filtroCategoria !== 'Todas' && <> en <Badge variant="outline">{filtroCategoria}</Badge></>}
            {filtroComuna !== 'Todas' && <> en <Badge variant="outline">{filtroComuna}</Badge></>}
          </p>
          <Link to="/perfil">
            <Button size="sm" variant="outline">Configurar mis intereses</Button>
          </Link>
        </div>

        {eventosFiltrados.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-slate-500">No se encontraron eventos con esos filtros.</p>
            <Button variant="outline" className="mt-3" onClick={() => { setFiltroCategoria('Todas'); setFiltroComuna('Todas'); setBusqueda('') }}>
              Limpiar filtros
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {eventosFiltrados.map(evento => (
              <Card key={evento.id} className="overflow-hidden hover:shadow-lg transition border-0 shadow-sm group">
                {/* HEADER CARD */}
                <div className={`h-2 ${
                  evento.productora === 'Ticketmaster' ? 'bg-blue-500' :
                  evento.productora === 'Puntoticket' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <CardContent className="p-5 space-y-4">
                  {/* CATEGORIA + PRODUCTORA */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {catIcon[evento.categoria] || <Star className="w-3 h-3" />}
                      {evento.categoria}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">{evento.productora}</span>
                  </div>

                  {/* INFO */}
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-teal-600 transition">{evento.titulo}</h3>
                    <p className="text-sm text-slate-500">{evento.artista}</p>
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4 text-teal-500" />
                      <span className="capitalize">{formatearFecha(evento.fecha)} · {evento.hora} hrs</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-teal-500" />
                      <span>{evento.lugar}, {evento.comuna}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Ticket className="w-4 h-4 text-teal-500" />
                      <span>
                        {evento.precioDesde === 0 ? 'Gratis' : `Desde $${evento.precioDesde.toLocaleString('es-CL')}`}
                        {evento.precioHasta > evento.precioDesde && ` - $${evento.precioHasta.toLocaleString('es-CL')}`}
                      </span>
                    </div>
                  </div>

                  {/* DISPONIBILIDAD */}
                  <div>
                    <Badge className={
                      evento.disponibilidad === 'Disponible' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                      evento.disponibilidad === 'Últimas entradas' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                      'bg-red-100 text-red-700 hover:bg-red-100'
                    }>
                      {evento.disponibilidad}
                    </Badge>
                  </div>

                  <Separator />

                  {/* ACCIONES */}
                  <div className="flex gap-2">
                    <Link to="/" className="flex-1">
                      <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 gap-1">
                        <Users className="w-4 h-4" />
                        Buscar compañía
                      </Button>
                    </Link>
                    <a href={evento.urlProductora} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">
                        Ver entradas <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* GEO INFO */}
      <section className="bg-white py-12 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MapPinned className="w-8 h-8 text-teal-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">¿Usas la app móvil?</h2>
          <p className="text-slate-600 mb-4">
            Activa la geolocalización para descubrir eventos automáticamente según tu ubicación en tiempo real.
            Te avisaremos cuando haya un evento cerca de ti que coincida con tus intereses.
          </p>
          <Link to="/perfil">
            <Button variant="outline">Configurar mi ubicación e intereses</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
