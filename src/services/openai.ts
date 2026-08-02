/**
 * Servicio OpenAI con Fallback Dual
 * 
 * Si la API key primaria falla (rate limit, quota, auth error),
 * automáticamente intenta con la secundaria.
 * 
 * Las keys se leen de variables de entorno:
 * - VITE_OPENAI_API_KEY_PRIMARY
 * - VITE_OPENAI_API_KEY_SECONDARY
 */

const PRIMARY_KEY = import.meta.env.VITE_OPENAI_API_KEY_PRIMARY || ''
const SECONDARY_KEY = import.meta.env.VITE_OPENAI_API_KEY_SECONDARY || ''
const DEFAULT_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'
const EMBEDDING_MODEL = import.meta.env.VITE_OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small'

// Determina si un error HTTP amerita fallback a la segunda key
function shouldFallback(status: number, errorText: string): boolean {
  const fallbackStatuses = [401, 429, 500, 502, 503, 529]
  const fallbackKeywords = [
    'rate limit', 'quota', 'insufficient_quota', 'billing',
    'invalid_api_key', 'authentication', 'overloaded', 'server error'
  ]
  const lower = errorText.toLowerCase()
  return fallbackStatuses.includes(status) ||
    fallbackKeywords.some(kw => lower.includes(kw))
}

/**
 * Realiza una llamada fetch a la API de OpenAI con fallback automático.
 */
async function openAIFetch(
  endpoint: string,
  body: object,
  options: { signal?: AbortSignal } = {}
): Promise<any> {
  const url = `https://api.openai.com/v1${endpoint}`
  const headers = (key: string) => ({
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
  })

  // --- Intento con PRIMARY KEY ---
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: headers(PRIMARY_KEY),
      body: JSON.stringify(body),
      signal: options.signal,
    })

    if (res.ok) return await res.json()

    const errorText = await res.text()

    // Si no amerita fallback, lanza error directo
    if (!shouldFallback(res.status, errorText)) {
      throw new Error(`OpenAI error [${res.status}]: ${errorText}`)
    }

    console.warn('[OpenAI] Primary key falló, intentando con secondary...')
  } catch (err: any) {
    // AbortSignal no amerita fallback
    if (err.name === 'AbortError') throw err
    if (!shouldFallback(0, err.message)) throw err
    console.warn('[OpenAI] Primary key falló (network), intentando con secondary...')
  }

  // --- Intento con SECONDARY KEY ---
  if (!SECONDARY_KEY) {
    throw new Error('[OpenAI] Secondary key no configurada y primary falló.')
  }

  const res2 = await fetch(url, {
    method: 'POST',
    headers: headers(SECONDARY_KEY),
    body: JSON.stringify(body),
    signal: options.signal,
  })

  if (!res2.ok) {
    const errorText2 = await res2.text()
    throw new Error(`OpenAI error (secondary) [${res2.status}]: ${errorText2}`)
  }

  return await res2.json()
}

// ═══════════════════════════════════════════════════════════════
// 1. EMBEDDINGS — Para matching semántico de perfiles/panoramas
// ═══════════════════════════════════════════════════════════════

export async function generateEmbedding(text: string): Promise<number[]> {
  const data = await openAIFetch('/embeddings', {
    model: EMBEDDING_MODEL,
    input: text,
  })
  return data.data[0].embedding
}

/**
 * Calcula similitud coseno entre dos vectores de embedding.
 * Resultado: 0 a 1 (1 = idénticos)
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

// ═══════════════════════════════════════════════════════════════
// 2. CLASIFICACIÓN DE EVENTOS — Auto-categoriza eventos scrapeados
// ═══════════════════════════════════════════════════════════════

const CATEGORIAS_EVENTO = [
  'concierto', 'teatro', 'stand-up', 'festival', 'deporte',
  'arte / museo', 'gastronomía', 'feria / expo', 'outdoor / trekking',
  'baile / fiesta', 'cine', 'otro'
]

export interface ClasificacionEvento {
  categoria: string
  artista?: string
  lugar: string
  precio_estimado_clp?: number
  comuna_sugerida?: string
  tags: string[]
  publico_objetivo: string
}

export async function clasificarEvento(
  titulo: string,
  descripcion: string
): Promise<ClasificacionEvento> {
  const prompt = `Clasifica este evento en Chile. Responde SOLO un JSON válido (sin markdown):

Título: "${titulo}"
Descripción: "${descripcion}"

Categorías posibles: ${CATEGORIAS_EVENTO.join(', ')}

Devuelve exactamente este formato:
{
  "categoria": "una de las categorías",
  "artista": "nombre del artista/banda/grupo si aplica, o null",
  "lugar": "nombre del venue/lugar",
  "precio_estimado_clp": número o null,
  "comuna_sugerida": "comuna de Santiago si se infiere, o null",
  "tags": ["tag1", "tag2", "tag3"],
  "publico_objetivo": "descripción breve del público ideal"
}`

  const data = await openAIFetch('/chat/completions', {
    model: DEFAULT_MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
  })

  const raw = data.choices[0].message.content.trim()
  // Eliminar posible markdown ```json ... ```
  const jsonStr = raw.replace(/^```json\s*|\s*```$/g, '').trim()
  return JSON.parse(jsonStr)
}

// ═══════════════════════════════════════════════════════════════
// 3. CHATBOT DE ONBOARDING — Conversación para detectar perfil
// ═══════════════════════════════════════════════════════════════

const SYSTEM_ONBOARDING = `Eres "Panxi", el asistente de onboarding de Panoramix (app para encontrar compañía de confianza para panoramas, NO citas románticas).

Tu trabajo es conversar amigablemente con el usuario para entender su estilo de vida, intereses y preferencias sociales.

REGLAS:
- NO hagas preguntas directas tipo formulario. Conversa naturalmente.
- Detecta: qué hace en su tiempo libre, qué música le gusta, si es social o reservado, su presupuesto típico, si tiene mascota, etc.
- NO menciones que estás haciendo un perfil. Solo conversa.
- Cuando tengas suficiente información, di amablemente que ya puede comenzar a usar Panoramix.
- Sé cálido/a pero profesional. Usa chileno coloquial pero respetuoso.
- Máximo 2 preguntas por mensaje. No seas interrogatorio.`

export async function chatOnboarding(
  mensajes: { role: 'user' | 'assistant'; content: string }[],
  options?: { signal?: AbortSignal }
): Promise<string> {
  const data = await openAIFetch('/chat/completions', {
    model: DEFAULT_MODEL,
    messages: [
      { role: 'system', content: SYSTEM_ONBOARDING },
      ...mensajes,
    ],
    temperature: 0.8,
    max_tokens: 500,
  }, options)

  return data.choices[0].message.content.trim()
}

// ═══════════════════════════════════════════════════════════════
// 4. MODERACIÓN DE CONTENIDO — Detecta intenciones inapropiadas
// ═══════════════════════════════════════════════════════════════

export interface ModeracionResult {
  aprobado: boolean
  motivo?: string
  severidad: 'bajo' | 'medio' | 'alto'
  categoria: 'citas_romanticas' | 'encuentros_sexuales' | 'spam' | 'seguro' | 'dudoso'
}

export async function moderarContenido(texto: string): Promise<ModeracionResult> {
  const prompt = `Evalúa si este texto es apropiado para Panoramix, una app de COMPAÑÍA SOCIAL (no citas románticas, no sexo).

Texto: "${texto}"

Responde SOLO un JSON válido:
{
  "aprobado": true/false,
  "motivo": "explicación breve o null",
  "severidad": "bajo" | "medio" | "alto",
  "categoria": "citas_romanticas" | "encuentros_sexuales" | "spam" | "seguro" | "dudoso"
}

REGLAS DE rechazo:
- "busco pareja", "quiero conocer al amor de mi vida", "algo serio" → citas_romanticas
- Cualquier insinuación sexual, "pasarla rico de otra manera", "diversión extra" → encuentros_sexuales
- "promociono mi producto", links sospechosos → spam
- Descripción normal de un panorama → seguro`

  const data = await openAIFetch('/chat/completions', {
    model: DEFAULT_MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.1,
  })

  const raw = data.choices[0].message.content.trim()
  const jsonStr = raw.replace(/^```json\s*|\s*```$/g, '').trim()
  return JSON.parse(jsonStr)
}

// ═══════════════════════════════════════════════════════════════
// 5. GENERACIÓN DE DESCRIPCIONES — Ayuda a redactar panoramas
// ═══════════════════════════════════════════════════════════════

export async function generarDescripcionPanorama(
  actividad: string,
  lugar: string,
  fecha: string,
  presupuesto?: string,
  tono: 'casual' | 'formal' | 'divertido' = 'casual'
): Promise<string> {
  const tonos: Record<string, string> = {
    casual: 'tono coloquial y amigable, como hablando con un amigo',
    formal: 'tono respetuoso y claro',
    divertido: 'tono con humor y entusiasmo',
  }

  const prompt = `Redacta una descripción atractiva para un panorama en Panoramix.

Datos:
- Actividad: ${actividad}
- Lugar: ${lugar}
- Fecha/hora: ${fecha}
- Presupuesto: ${presupuesto || 'no especificado'}
- Tono deseado: ${tonos[tono]}

REGLAS:
- Sé claro sobre qué se va a hacer, dónde y cuándo.
- Menciona si la entrada ya está comprada o si falta comprar.
- NO suene a cita romántica. Es compañía para una actividad.
- Máximo 150 palabras.
- Incluye un emoji apropiado.`

  const data = await openAIFetch('/chat/completions', {
    model: DEFAULT_MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 300,
  })

  return data.choices[0].message.content.trim()
}

// ═══════════════════════════════════════════════════════════════
// DEMO / UTILIDAD: Verificar que al menos una key funciona
// ═══════════════════════════════════════════════════════════════

export async function testOpenAIConnection(): Promise<{ ok: boolean; keyUsada: 'primary' | 'secondary' | 'ninguna'; error?: string }> {
  // Intenta una llamada dummy con primary
  try {
    await openAIFetch('/chat/completions', {
      model: DEFAULT_MODEL,
      messages: [{ role: 'user', content: 'Responde solo: OK' }],
      max_tokens: 5,
    })
    return { ok: true, keyUsada: 'primary' }
  } catch (err: any) {
    // Si llegó aqui, secondary también falló (porque openAIFetch ya hizo fallback)
    return { ok: false, keyUsada: 'ninguna', error: err.message }
  }
}
