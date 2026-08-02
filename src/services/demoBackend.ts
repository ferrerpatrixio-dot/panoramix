/**
 * Backend Demo — Simula Firebase usando solo localStorage
 * 
 * Todo funciona 100% en el navegador. No necesita servidor ni Firebase.
 * Perfecto para validar la idea con usuarios reales sin costo.
 * 
 * Cuando quieras migrar a Firebase real, reemplaza este archivo
 * por las llamadas reales a src/services/firebase.ts
 */

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

export interface DemoUser {
  uid: string
  email: string
  displayName?: string
  createdAt: string
}

export interface DemoPerfil {
  uid: string
  // Bloque A: Comportamiento
  ultimoSabado?: string
  ultimoFindeDisfrutado?: string
  despuesTrabajo?: string
  frecuenciaSocial?: string
  ultimoEvento?: string
  // Bloque B: Intereses
  artistas?: string
  peliculaSerie?: string
  deporte?: string
  naturaleza?: string
  mascota?: string
  horarioPreferido?: string
  lugaresFrecuentes?: string
  categoriasSel?: string[]
  // Bloque C: Personalidad
  llegarEvento?: string
  conversar?: string
  temasEntusiasman?: string
  temasEvitar?: string
  silencios?: string
  rol?: string
  // Bloque D: Logística
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
  estado: 'activo' | 'cerrado' | 'completado'
  matches: DemoMatch[]
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
  if (!entry) {
    throw new Error('Correo o contraseña incorrectos')
  }
  
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

export function demoCrearPanorama(uid: string, data: Omit<DemoPanorama, 'id' | 'uid' | 'matches' | 'createdAt' | 'estado'>): DemoPanorama {
  const panoramas = load<Record<string, DemoPanorama>>(PANORAMAS_KEY, {})
  const id = generarId()
  
  // Generar matches simulados con "otros usuarios"
  const matches = generarMatchesSimulados(data)
  
  const panorama: DemoPanorama = {
    ...data as any,
    id,
    uid,
    estado: 'activo',
    matches,
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

// Generar matches simulados para demo
function generarMatchesSimulados(data: any): DemoMatch[] {
  const nombres = ['Carla', 'Diego', 'Valentina', 'Andrés', 'Francisca', 'Javier', 'Camila', 'Rodrigo']
  const numMatches = Math.floor(Math.random() * 3) + 1 // 1-3 matches
  const shuffled = nombres.sort(() => Math.random() - 0.5)
  
  return shuffled.slice(0, numMatches).map((nombre, i) => ({
    matchUserId: generarId(),
    matchUserName: nombre,
    estado: 'pendiente',
    compatibilidad: Math.floor(Math.random() * 30) + 65, // 65-95%
    createdAt: new Date(Date.now() - i * 60000).toISOString(),
  }))
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
}
