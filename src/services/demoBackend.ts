/**
 * Backend Demo — Simula Firebase usando solo localStorage
 */

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

export interface DemoContactoEmergencia {
  nombre: string
  telefono: string
  relacion: string
}

export interface DemoEvaluacion {
  id: string
  panoramaId: string
  evaluadorUid: string
  evaluadoUid: string
  evaluadoNombre: string
  estrellas: number
  comentario: string
  cumplioPanorama: boolean
  llegoATiempo: boolean
  volveriaAJuntarse: boolean
  createdAt: string
}

export interface DemoReclamo {
  id: string
  tipo: 'evaluacion_negativa' | 'reporte_usuario' | 'descargo'
  uidAfectado: string
  nombreAfectado: string
  uidReportero?: string
  descripcion: string
  estrellas?: number
  evaluacionId?: string
  estado: 'pendiente' | 'revisado' | 'cerrado'
  respuestaAdmin?: string
  createdAt: string
}

export interface DemoMensajeChat {
  id: string
  matchKey: string        // panoramaId_matchUserId
  remitenteUid: string    // uid del que envía
  remitenteNombre: string
  contenido: string
  tipo: 'texto' | 'sistema'
  leido: boolean
  createdAt: string
}

export interface DemoUser {
  uid: string
  email: string
  displayName?: string
  createdAt: string
  activo?: boolean
}

export interface DemoPerfil {
  uid: string
  ultimoSabado?: string
  ultimoFindeDisfrutado?: string
  despuesTrabajo?: string
  frecuenciaSocial?: string
  ultimoEvento?: string
  artistas?: string
  peliculaSerie?: string
  deporte?: string
  naturaleza?: string
  mascota?: string
  horarioPreferido?: string
  lugaresFrecuentes?: string
  categoriasSel?: string[]
  llegarEvento?: string
  conversar?: string
  temasEntusiasman?: string
  temasEvitar?: string
  silencios?: string
  rol?: string
  comunasSel?: string[]
  disponibilidad?: string[]
  presupuesto?: string
  companiasPref?: string
  nuncaHaria?: string
  transporte?: string
  updatedAt?: string
}

export interface DemoPerfilProfundo {
  tragoFavorito?: string
  marcaCigarro?: string
  estadoAnimo?: string
  momentoReciente?: string
  energiaSocial?: string
  rolConversacion?: string
  inquietoPasivo?: string
  temasGusta?: string[]
  temasNoGusta?: string[]
  temaFavorito?: string
  temaTabu?: string
  deporteHaceConversa?: string
  conversaReligionPolitica?: string
  updatedAt?: string
}

export interface DemoPanorama {
  id: string
  uid: string
  actividad: string
  lugar: string
  fecha: string
  hora?: string
  presupuesto?: string
  companiasPref?: string
  entradaComprada?: string
  descripcionGenerada?: string
  estado: 'activo' | 'cerrado' | 'completado' | 'no_disponible'
  matches: DemoMatch[]
  interesados: DemoInteresado[]
  seleccionadoId?: string
  createdAt: string
}

export interface DemoInteresado {
  uid: string
  nombre: string
  compatibilidad: number
  createdAt: string
}

export interface DemoMatch {
  matchUserId: string
  matchUserName: string
  estado: 'pendiente' | 'aceptado' | 'rechazado'
  compatibilidad: number
  createdAt: string
}

// ═══════════════════════════════════════════════════════════════
// KEYS
// ═══════════════════════════════════════════════════════════════

const USERS_KEY = 'demo_users'
const SESSION_KEY = 'demo_session'
const PERFILES_KEY = 'demo_perfiles'
const PERFILES_PROFUNDOS_KEY = 'demo_perfiles_profundos'
const PANORAMAS_KEY = 'demo_panoramas'
const CONTACTOS_KEY = 'demo_contactos'
const EVALUACIONES_KEY = 'demo_evaluaciones'
const RECLAMOS_KEY = 'demo_reclamos'
const CHAT_KEY = 'demo_chat'

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data))
}

function generarId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// ═══════════════════════════════════════════════════════════════
// AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════

export function demoRegistrar(email: string, password: string, displayName?: string): DemoUser {
  const users = load<Record<string, { email: string; password: string; displayName?: string; createdAt: string }>>(USERS_KEY, {})
  if (Object.values(users).some(u => u.email === email)) {
    throw new Error('Este correo ya está registrado')
  }
  const uid = generarId()
  users[uid] = { email, password, displayName: displayName || email.split('@')[0], createdAt: new Date().toISOString() }
  save(USERS_KEY, users)
  const user: DemoUser = { uid, email, displayName: displayName || email.split('@')[0], createdAt: users[uid].createdAt }
  save(SESSION_KEY, user)
  return user
}

export function demoLogin(email: string, password: string): DemoUser {
  const users = load<Record<string, { email: string; password: string; displayName?: string; createdAt: string }>>(USERS_KEY, {})
  const entry = Object.entries(users).find(([, u]) => u.email === email && u.password === password)
  if (!entry) throw new Error('Correo o contraseña incorrectos')
  const [uid, u] = entry
  const user: DemoUser = { uid, email: u.email, displayName: u.displayName, createdAt: u.createdAt }
  save(SESSION_KEY, user)
  return user
}

export function demoGetSession(): DemoUser | null {
  return load<DemoUser | null>(SESSION_KEY, null)
}

export function demoLogout() {
  localStorage.removeItem(SESSION_KEY)
}

// ═══════════════════════════════════════════════════════════════
// CONTACTOS DE EMERGENCIA
// ═══════════════════════════════════════════════════════════════

export function demoGuardarContactos(uid: string, contactos: DemoContactoEmergencia[]) {
  const all = load<Record<string, DemoContactoEmergencia[]>>(CONTACTOS_KEY, {})
  all[uid] = contactos
  save(CONTACTOS_KEY, all)
}

export function demoObtenerContactos(uid: string): DemoContactoEmergencia[] {
  const all = load<Record<string, DemoContactoEmergencia[]>>(CONTACTOS_KEY, {})
  return all[uid] || []
}

// ═══════════════════════════════════════════════════════════════
// PERFILES
// ═══════════════════════════════════════════════════════════════

export function demoGuardarPerfil(uid: string, perfil: Partial<DemoPerfil>) {
  const perfiles = load<Record<string, DemoPerfil>>(PERFILES_KEY, {})
  perfiles[uid] = { ...perfiles[uid], ...perfil, uid, updatedAt: new Date().toISOString() }
  save(PERFILES_KEY, perfiles)
}

export function demoObtenerPerfil(uid: string): DemoPerfil | null {
  const perfiles = load<Record<string, DemoPerfil>>(PERFILES_KEY, {})
  return perfiles[uid] || null
}

// ═══════════════════════════════════════════════════════════════
// PERFILES PROFUNDOS
// ═══════════════════════════════════════════════════════════════

export function demoGuardarPerfilProfundo(uid: string, perfil: Partial<DemoPerfilProfundo>) {
  const perfiles = load<Record<string, DemoPerfilProfundo>>(PERFILES_PROFUNDOS_KEY, {})
  perfiles[uid] = { ...perfiles[uid], ...perfil, updatedAt: new Date().toISOString() }
  save(PERFILES_PROFUNDOS_KEY, perfiles)
}

export function demoObtenerPerfilProfundo(uid: string): DemoPerfilProfundo | null {
  const perfiles = load<Record<string, DemoPerfilProfundo>>(PERFILES_PROFUNDOS_KEY, {})
  return perfiles[uid] || null
}

// ═══════════════════════════════════════════════════════════════
// PANORAMAS
// ═══════════════════════════════════════════════════════════════

export function demoCrearPanorama(uid: string, data: Omit<DemoPanorama, 'id' | 'uid' | 'matches' | 'interesados' | 'createdAt' | 'estado'>): DemoPanorama {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  const id = generarId()
  const matches = generarMatchesSimulados(data)
  const panorama: DemoPanorama = {
    ...data as any,
    id,
    uid,
    estado: 'activo',
    matches,
    interesados: [],
    createdAt: new Date().toISOString(),
  }
  panoramas[id] = panorama
  save(PANORAMAS_KEY, panoramas)
  return panorama
}

export function demoObtenerPanoramasUsuario(uid: string): DemoPanorama[] {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  return Object.values(panoramas).filter(p => p.uid === uid).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function demoObtenerPanorama(id: string): DemoPanorama | null {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  return panoramas[id] || null
}

export function demoActualizarMatch(panoramaId: string, matchUserId: string, estado: DemoMatch['estado']) {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  const p = panoramas[panoramaId]
  if (!p) return
  const m = p.matches.find(x => x.matchUserId === matchUserId)
  if (m) m.estado = estado
  save(PANORAMAS_KEY, panoramas)
}

export function demoCerrarPanorama(id: string) {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  if (panoramas[id]) {
    panoramas[id].estado = 'cerrado'
    save(PANORAMAS_KEY, panoramas)
  }
}

export function demoEliminarPanorama(id: string) {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  delete panoramas[id]
  save(PANORAMAS_KEY, panoramas)
}

function generarMatchesSimulados(_data: any): DemoMatch[] {
  const nombres = ['Carla', 'Diego', 'Valentina', 'Andrés', 'Francisca', 'Javier', 'Camila', 'Rodrigo']
  const numMatches = Math.floor(Math.random() * 3) + 1
  const shuffled = nombres.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, numMatches).map((nombre, i) => ({
    matchUserId: generarId(),
    matchUserName: nombre,
    estado: 'pendiente',
    compatibilidad: Math.floor(Math.random() * 30) + 65,
    createdAt: new Date(Date.now() - i * 60000).toISOString(),
  }))
}

// ═══════════════════════════════════════════════════════════════
// FEED PERSONALIZADO — Descubrir panoramas de otros
// ═══════════════════════════════════════════════════════════════

export function demoObtenerFeedPersonalizado(uid: string): DemoPanorama[] {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  const perfil = demoObtenerPerfil(uid)
  const todos = Object.values(panoramas)
    .filter(p => p.uid !== uid && p.estado === 'activo')

  // Ordenar por "compatibilidad" simulada: si el panorama coincide con intereses del perfil
  const conScore = todos.map(p => {
    let score = 50 // base
    if (perfil) {
      // Coincidencia de categorías
      if (perfil.categoriasSel && p.actividad) {
        const actLower = p.actividad.toLowerCase()
        const matchCat = perfil.categoriasSel.some(c => actLower.includes(c.toLowerCase()))
        if (matchCat) score += 20
      }
      // Coincidencia de comuna
      if (perfil.comunasSel && p.lugar) {
        const matchComuna = perfil.comunasSel.some(c => p.lugar.toLowerCase().includes(c.toLowerCase()))
        if (matchComuna) score += 15
      }
      // Coincidencia de compañía preferida
      if (perfil.companiasPref && p.companiasPref) {
        if (perfil.companiasPref === p.companiasPref || p.companiasPref === 'Me es indiferente') {
          score += 10
        }
      }
    }
    // Si ya expresó interés, bajar prioridad (para no mostrarlo arriba)
    const yaInteresado = p.interesados?.some(i => i.uid === uid)
    if (yaInteresado) score -= 30
    return { p, score }
  })

  return conScore
    .sort((a, b) => b.score - a.score)
    .map(x => x.p)
}

export function demoExpresarInteres(panoramaId: string, uid: string, nombre: string): boolean {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  const p = panoramas[panoramaId]
  if (!p || p.estado !== 'activo') return false
  if (p.interesados.some(i => i.uid === uid)) return false // ya interesado
  const perfil = demoObtenerPerfil(uid)
  // Calcular compatibilidad simulada
  let compat = 65
  if (perfil) {
    if (perfil.categoriasSel && p.actividad) {
      const actLower = p.actividad.toLowerCase()
      if (perfil.categoriasSel.some(c => actLower.includes(c.toLowerCase()))) compat += 15
    }
    if (perfil.comunasSel && p.lugar) {
      if (perfil.comunasSel.some(c => p.lugar.toLowerCase().includes(c.toLowerCase()))) compat += 10
    }
  }
  compat = Math.min(98, compat + Math.floor(Math.random() * 10))
  p.interesados.push({ uid, nombre, compatibilidad: compat, createdAt: new Date().toISOString() })
  save(PANORAMAS_KEY, panoramas)
  return true
}

export function demoObtenerInteresados(panoramaId: string): DemoInteresado[] {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  const p = panoramas[panoramaId]
  return p ? p.interesados : []
}

export function demoSeleccionarCompanero(panoramaId: string, uidSeleccionado: string): boolean {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  const p = panoramas[panoramaId]
  if (!p || p.estado !== 'activo') return false
  if (!p.interesados.some(i => i.uid === uidSeleccionado)) return false
  p.seleccionadoId = uidSeleccionado
  p.estado = 'no_disponible'
  // Crear match para el seleccionado
  const seleccionado = p.interesados.find(i => i.uid === uidSeleccionado)
  if (seleccionado) {
    p.matches.push({
      matchUserId: uidSeleccionado,
      matchUserName: seleccionado.nombre,
      estado: 'aceptado',
      compatibilidad: seleccionado.compatibilidad,
      createdAt: new Date().toISOString(),
    })
  }
  save(PANORAMAS_KEY, panoramas)
  return true
}

export function demoObtenerPanoramasConInteres(uid: string): DemoPanorama[] {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  return Object.values(panoramas)
    .filter(p => p.interesados.some(i => i.uid === uid))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// ═══════════════════════════════════════════════════════════════
// EVALUACIONES
// ═══════════════════════════════════════════════════════════════

export function demoGuardarEvaluacion(evaluacion: Omit<DemoEvaluacion, 'id' | 'createdAt'>): DemoEvaluacion {
  const all = load<Record<string, DemoEvaluacion>>(EVALUACIONES_KEY, {})
  const id = generarId()
  const nueva: DemoEvaluacion = { ...evaluacion, id, createdAt: new Date().toISOString() }
  all[id] = nueva
  save(EVALUACIONES_KEY, all)
  return nueva
}

export function demoObtenerEvaluacionesUsuario(uid: string): DemoEvaluacion[] {
  const all = load<Record<string, DemoEvaluacion>>(EVALUACIONES_KEY, {})
  return Object.values(all)
    .filter(e => e.evaluadoUid === uid || e.evaluadorUid === uid)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function demoObtenerEvaluacionesRecibidas(uid: string): DemoEvaluacion[] {
  const all = load<Record<string, DemoEvaluacion>>(EVALUACIONES_KEY, {})
  return Object.values(all)
    .filter(e => e.evaluadoUid === uid)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function demoCalcularReputacion(uid: string): { promedio: number; total: number } {
  const evals = demoObtenerEvaluacionesRecibidas(uid)
  if (evals.length === 0) return { promedio: 0, total: 0 }
  const sum = evals.reduce((acc, e) => acc + e.estrellas, 0)
  return { promedio: Math.round((sum / evals.length) * 10) / 10, total: evals.length }
}

// ═══════════════════════════════════════════════════════════════
// ADMIN
// ═══════════════════════════════════════════════════════════════

export function demoListarUsuarios(): DemoUser[] {
  const users = load<Record<string, { email: string; password: string; displayName?: string; createdAt: string; activo?: boolean }>>(USERS_KEY, {})
  return Object.entries(users).map(([uid, u]) => ({
    uid,
    email: u.email,
    displayName: u.displayName,
    createdAt: u.createdAt,
    activo: u.activo !== false,
  }))
}

export function demoObtenerUsuario(uid: string): DemoUser | null {
  const users = load<Record<string, { email: string; password: string; displayName?: string; createdAt: string; activo?: boolean }>>(USERS_KEY, {})
  const u = users[uid]
  if (!u) return null
  return { uid, email: u.email, displayName: u.displayName, createdAt: u.createdAt, activo: u.activo !== false }
}

export function demoDesactivarUsuario(uid: string) {
  const users = load<Record<string, { email: string; password: string; displayName?: string; createdAt: string; activo?: boolean }>>(USERS_KEY, {})
  if (users[uid]) {
    users[uid].activo = false
    save(USERS_KEY, users)
  }
}

export function demoActivarUsuario(uid: string) {
  const users = load<Record<string, { email: string; password: string; displayName?: string; createdAt: string; activo?: boolean }>>(USERS_KEY, {})
  if (users[uid]) {
    users[uid].activo = true
    save(USERS_KEY, users)
  }
}

export function demoObtenerTodasEvaluaciones(): DemoEvaluacion[] {
  const all = load<Record<string, DemoEvaluacion>>(EVALUACIONES_KEY, {})
  return Object.values(all).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function demoObtenerEvaluacionesNegativas(): DemoEvaluacion[] {
  return demoObtenerTodasEvaluaciones().filter(e => e.estrellas <= 2)
}

export function demoGuardarReclamo(reclamo: Omit<DemoReclamo, 'id' | 'createdAt'>): DemoReclamo {
  const all = load<Record<string, DemoReclamo>>(RECLAMOS_KEY, {})
  const id = generarId()
  const nuevo: DemoReclamo = { ...reclamo, id, createdAt: new Date().toISOString() }
  all[id] = nuevo
  save(RECLAMOS_KEY, all)
  return nuevo
}

export function demoObtenerReclamos(): DemoReclamo[] {
  const all = load<Record<string, DemoReclamo>>(RECLAMOS_KEY, {})
  return Object.values(all).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function demoResponderReclamo(id: string, respuesta: string) {
  const all = load<Record<string, DemoReclamo>>(RECLAMOS_KEY, {})
  if (all[id]) {
    all[id].respuestaAdmin = respuesta
    all[id].estado = 'revisado'
    save(RECLAMOS_KEY, all)
  }
}

// ═══════════════════════════════════════════════════════════════
// CHAT 1:1 ENTRE MATCHED USERS
// ═══════════════════════════════════════════════════════════════

function chatKey(panoramaId: string, matchUserId: string): string {
  return `${panoramaId}_${matchUserId}`
}

export function demoGuardarMensaje(
  panoramaId: string,
  matchUserId: string,
  remitenteUid: string,
  remitenteNombre: string,
  contenido: string,
  tipo: DemoMensajeChat['tipo'] = 'texto'
): DemoMensajeChat {
  const all = load<Record<string, DemoMensajeChat[]>>(CHAT_KEY, {})
  const key = chatKey(panoramaId, matchUserId)
  if (!all[key]) all[key] = []
  const msg: DemoMensajeChat = {
    id: generarId(),
    matchKey: key,
    remitenteUid,
    remitenteNombre,
    contenido,
    tipo,
    leido: false,
    createdAt: new Date().toISOString(),
  }
  all[key].push(msg)
  save(CHAT_KEY, all)
  return msg
}

export function demoObtenerMensajes(panoramaId: string, matchUserId: string): DemoMensajeChat[] {
  const all = load<Record<string, DemoMensajeChat[]>>(CHAT_KEY, {})
  const key = chatKey(panoramaId, matchUserId)
  return (all[key] || []).sort((a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
}

export function demoMarcarLeido(panoramaId: string, matchUserId: string, uidLector: string) {
  const all = load<Record<string, DemoMensajeChat[]>>(CHAT_KEY, {})
  const key = chatKey(panoramaId, matchUserId)
  if (!all[key]) return
  all[key] = all[key].map(m =>
    m.remitenteUid !== uidLector ? { ...m, leido: true } : m
  )
  save(CHAT_KEY, all)
}

export function demoContarMensajesNoLeidos(uid: string): number {
  const all = load<Record<string, DemoMensajeChat[]>>(CHAT_KEY, {})
  let count = 0
  for (const msgs of Object.values(all)) {
    for (const msg of msgs) {
      if (msg.remitenteUid !== uid && !msg.leido) count++
    }
  }
  return count
}

export function demoObtenerResumenChats(uid: string): { panoramaId: string; matchUserId: string; actividad: string; otroNombre: string; noLeidos: number; ultimoMensaje: string; ultimoAt: string }[] {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  const allChats = load<Record<string, DemoMensajeChat[]>>(CHAT_KEY, {})
  const resumen: any[] = []

  for (const p of Object.values(panoramas)) {
    const soyDueño = p.uid === uid
    const soySeleccionado = p.seleccionadoId === uid
    if (!soyDueño && !soySeleccionado) continue

    const seleccionadoId = p.seleccionadoId
    if (!seleccionadoId) continue

    const key = chatKey(p.id, seleccionadoId)
    const msgs = allChats[key] || []
    const noLeidos = msgs.filter(m => m.remitenteUid !== uid && !m.leido).length
    const ultimo = msgs[msgs.length - 1]

    let otroNombre = ''
    if (soyDueño) {
      const match = p.matches.find(m => m.matchUserId === seleccionadoId)
      otroNombre = match?.matchUserName || 'Compañero'
    } else {
      const dueño = demoObtenerUsuario(p.uid)
      otroNombre = dueño?.displayName || dueño?.email || 'Creador'
    }

    resumen.push({
      panoramaId: p.id,
      matchUserId: seleccionadoId,
      actividad: p.actividad,
      otroNombre,
      noLeidos,
      ultimoMensaje: ultimo?.contenido || '',
      ultimoAt: ultimo?.createdAt || p.createdAt,
    })
  }

  return resumen.sort((a, b) => new Date(b.ultimoAt).getTime() - new Date(a.ultimoAt).getTime())
}

// ═══════════════════════════════════════════════════════════════
// RESET (para testing)
// ═══════════════════════════════════════════════════════════════

export function demoResetAll() {
  localStorage.removeItem(USERS_KEY)
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(PERFILES_KEY)
  localStorage.removeItem(PERFILES_PROFUNDOS_KEY)
  localStorage.removeItem(PANORAMAS_KEY)
  localStorage.removeItem(CONTACTOS_KEY)
  localStorage.removeItem(EVALUACIONES_KEY)
  localStorage.removeItem(RECLAMOS_KEY)
  localStorage.removeItem(CHAT_KEY)
}
