/**
 * Configuración de Firebase — REEMPLAZA estos valores con los de tu proyecto
 * 
 * Para obtenerlos:
 * 1. Ve a https://console.firebase.google.com
 * 2. Crea un proyecto (o usa uno existente)
 * 3. Ve a Configuración del proyecto → General → Tus apps
 * 4. Crea una app Web → te dará el objeto firebaseConfig
 * 5. Ve a Configuración del proyecto → Cuentas de servicio → Base de datos
 * 6. Copia el projectId
 * 
 * También necesitas habilitar:
 * - Authentication → Método de inicio de sesión → Email/Contraseña
 * - Firestore Database → Crear base de datos (modo de prueba)
 */

export const firebaseConfig = {
  apiKey: 'REEMPLAZA_CON_TU_API_KEY',
  authDomain: 'REEMPLAZA.firebaseapp.com',
  projectId: 'REEMPLAZA',
  storageBucket: 'REEMPLAZA.appspot.com',
  messagingSenderId: 'REEMPLAZA',
  appId: 'REEMPLAZA'
}

// Helper: leer desde .env si existe (Vite)
export function getFirebaseConfig() {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig.appId,
  }
}

const cfg = getFirebaseConfig()
const BASE_AUTH_URL = 'https://identitytoolkit.googleapis.com/v1'
const BASE_FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/(default)/documents`

function isConfigured(): boolean {
  return cfg.apiKey !== 'REEMPLAZA_CON_TU_API_KEY' && cfg.projectId !== 'REEMPLAZA'
}

function checkConfig() {
  if (!isConfigured()) {
    throw new Error(
      'Firebase no está configurado. Reemplaza los valores en src/services/firebase.ts o ' +
      'configura las variables de entorno VITE_FIREBASE_* en Vercel.'
    )
  }
}

// ═══════════════════════════════════════════════════════════════
// AUTENTICACIÓN (Firebase Auth REST API)
// ═══════════════════════════════════════════════════════════════

export interface FirebaseUser {
  uid: string
  email: string
  idToken: string
  refreshToken: string
  displayName?: string
}

export async function registrarUsuario(email: string, password: string, displayName?: string): Promise<FirebaseUser> {
  checkConfig()
  const res = await fetch(`${BASE_AUTH_URL}/accounts:signUp?key=${cfg.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true, displayName })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || 'Error al registrar')
  return {
    uid: data.localId,
    email: data.email,
    idToken: data.idToken,
    refreshToken: data.refreshToken,
    displayName: data.displayName
  }
}

export async function loginUsuario(email: string, password: string): Promise<FirebaseUser> {
  checkConfig()
  const res = await fetch(`${BASE_AUTH_URL}/accounts:signInWithPassword?key=${cfg.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || 'Error al iniciar sesión')
  return {
    uid: data.localId,
    email: data.email,
    idToken: data.idToken,
    refreshToken: data.refreshToken,
    displayName: data.displayName
  }
}

export async function getUserData(idToken: string): Promise<FirebaseUser | null> {
  checkConfig()
  const res = await fetch(`${BASE_AUTH_URL}/accounts:lookup?key=${cfg.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken })
  })
  const data = await res.json()
  if (!res.ok || !data.users?.[0]) return null
  const u = data.users[0]
  return {
    uid: u.localId,
    email: u.email,
    idToken,
    refreshToken: '',
    displayName: u.displayName
  }
}

// ═══════════════════════════════════════════════════════════════
// FIRESTORE (Firestore REST API)
// ═══════════════════════════════════════════════════════════════

function authHeaders(idToken: string) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  }
}

function toFirestoreValue(value: unknown): { [key: string]: unknown } {
  if (value === null || value === undefined) return { nullValue: null }
  if (typeof value === 'string') return { stringValue: value }
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value }
  if (typeof value === 'boolean') return { booleanValue: value }
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toFirestoreValue) } }
  if (typeof value === 'object') {
    const fields: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      fields[k] = toFirestoreValue(v)
    }
    return { mapValue: { fields } }
  }
  return { stringValue: String(value) }
}

function fromFirestoreDoc(doc: any): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  if (!doc.fields) return result
  for (const [key, val] of Object.entries(doc.fields)) {
    result[key] = fromFirestoreValue(val as any)
  }
  return result
}

function fromFirestoreValue(val: any): unknown {
  if (val.stringValue !== undefined) return val.stringValue
  if (val.integerValue !== undefined) return parseInt(val.integerValue, 10)
  if (val.doubleValue !== undefined) return val.doubleValue
  if (val.booleanValue !== undefined) return val.booleanValue
  if (val.nullValue !== undefined) return null
  if (val.arrayValue?.values) return val.arrayValue.values.map(fromFirestoreValue)
  if (val.mapValue?.fields) return fromFirestoreDoc({ fields: val.mapValue.fields })
  if (val.timestampValue) return val.timestampValue
  return val
}

// Guardar documento (crear o actualizar)
export async function guardarDocumento(
  coleccion: string,
  documentId: string,
  data: Record<string, unknown>,
  idToken: string
): Promise<void> {
  checkConfig()
  const fields: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(data)) {
    fields[k] = toFirestoreValue(v)
  }
  await fetch(`${BASE_FIRESTORE_URL}/${coleccion}/${documentId}`, {
    method: 'PATCH',
    headers: authHeaders(idToken),
    body: JSON.stringify({ fields })
  })
}

// Obtener documento
export async function obtenerDocumento(
  coleccion: string,
  documentId: string,
  idToken: string
): Promise<Record<string, unknown> | null> {
  checkConfig()
  const res = await fetch(`${BASE_FIRESTORE_URL}/${coleccion}/${documentId}`, {
    headers: authHeaders(idToken)
  })
  if (res.status === 404) return null
  const doc = await res.json()
  if (doc.error) return null
  return fromFirestoreDoc(doc)
}

// Listar documentos de una colección (query simple)
export async function listarDocumentos(
  coleccion: string,
  idToken: string,
  limit: number = 20
): Promise<Array<{ id: string; data: Record<string, unknown> }>> {
  checkConfig()
  const res = await fetch(`${BASE_FIRESTORE_URL}/${coleccion}?pageSize=${limit}`, {
    headers: authHeaders(idToken)
  })
  const data = await res.json()
  if (!data.documents) return []
  return data.documents.map((doc: any) => ({
    id: doc.name.split('/').pop(),
    data: fromFirestoreDoc(doc)
  }))
}

// ═══════════════════════════════════════════════════════════════
// SERVICIOS ESPECÍFICOS DE PANORAMIX
// ═══════════════════════════════════════════════════════════════

export async function guardarPerfil(uid: string, perfil: Record<string, unknown>, idToken: string) {
  return guardarDocumento('perfiles', uid, { ...perfil, updatedAt: new Date().toISOString() }, idToken)
}

export async function obtenerPerfil(uid: string, idToken: string) {
  return obtenerDocumento('perfiles', uid, idToken)
}

export async function guardarPanorama(panoramaId: string, panorama: Record<string, unknown>, idToken: string) {
  return guardarDocumento('panoramas', panoramaId, { ...panorama, createdAt: new Date().toISOString() }, idToken)
}

export async function obtenerPanorama(panoramaId: string, idToken: string) {
  return obtenerDocumento('panoramas', panoramaId, idToken)
}

export async function listarPanoramas(idToken: string, limit?: number) {
  return listarDocumentos('panoramas', idToken, limit)
}

export async function guardarPerfilProfundo(uid: string, perfil: Record<string, unknown>, idToken: string) {
  return guardarDocumento('perfilesProfundos', uid, { ...perfil, updatedAt: new Date().toISOString() }, idToken)
}

export async function obtenerPerfilProfundo(uid: string, idToken: string) {
  return obtenerDocumento('perfilesProfundos', uid, idToken)
}

// Helper para generar ID único
export function generarId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
