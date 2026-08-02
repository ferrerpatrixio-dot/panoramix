/**
 * SEED DATA — Carga datos de prueba realistas en localStorage
 * para que el demo se vea como una app con usuarios activos.
 *
 * Escenarios:
 * 1. Carla (34) tiene entrada para Chayanne → match con Diego (28)
 * 2. Valentina (31) quiere ir a Sala Portugal → match con Javier
 * 3. Andrés (45, separado) pasea perro en Parque Bicentenario → match con Camila
 * 4. Panorama completado de trekking con evaluación mixta
 */

import {
  demoRegistrar,
  demoLogin,
  demoGuardarPerfil,
  demoGuardarPerfilProfundo,
  demoGuardarContactos,
  demoCrearPanorama,
  demoActualizarMatch,
  demoGuardarEvaluacion,
  demoGuardarReclamo,
  demoCerrarPanorama,
} from './demoBackend'

let seedLog: string[] = []

function log(msg: string) {
  seedLog.push(msg)
  console.log('[SEED]', msg)
}

export function getSeedLog() {
  return seedLog
}

export function demoSeedIfEmpty() {
  const alreadySeeded = localStorage.getItem('demo_seeded_v1')
  if (alreadySeeded) {
    console.log('[SEED] Datos ya precargados. Saltando.')
    return
  }
  seedLog = []
  ejecutarSeed()
  localStorage.setItem('demo_seeded_v1', 'true')
  log('✅ Seed completado. Recarga la página para ver los datos.')
}

export function demoResetAndSeed() {
  localStorage.removeItem('demo_seeded_v1')
  // Limpiar todo excepto quizás la sesión actual si se quiere
  const keys = [
    'demo_users', 'demo_session', 'demo_perfiles', 'demo_perfiles_profundos',
    'demo_panoramas', 'demo_contactos', 'demo_evaluaciones', 'demo_reclamos',
  ]
  keys.forEach(k => localStorage.removeItem(k))
  seedLog = []
  ejecutarSeed()
  localStorage.setItem('demo_seeded_v1', 'true')
}

function ejecutarSeed() {
  log('=== PANORAMIX DEMO SEED v1 ===')

  // ═══════════════════════════════════════════════════════════════
  // USUARIOS
  // ═══════════════════════════════════════════════════════════════

  const carla = demoRegistrar('carla.morales@ejemplo.cl', 'demo123', 'Carla Morales')
  const diego = demoRegistrar('diego.rivera@ejemplo.cl', 'demo123', 'Diego Rivera')
  const valentina = demoRegistrar('valentina.soto@ejemplo.cl', 'demo123', 'Valentina Soto')
  const javier = demoRegistrar('javier.torres@ejemplo.cl', 'demo123', 'Javier Torres')
  const andres = demoRegistrar('andres.guzman@ejemplo.cl', 'demo123', 'Andrés Guzmán')
  const camila = demoRegistrar('camila.rios@ejemplo.cl', 'demo123', 'Camila Ríos')
  const francisca = demoRegistrar('fran.vega@ejemplo.cl', 'demo123', 'Francisca Vega')
  const rodrigo = demoRegistrar('rodrigo.munoz@ejemplo.cl', 'demo123', 'Rodrigo Muñoz')

  log(`👤 Creados 8 usuarios de prueba`)

  // ═══════════════════════════════════════════════════════════════
  // CONTACTOS DE EMERGENCIA
  // ═══════════════════════════════════════════════════════════════

  demoGuardarContactos(carla.uid, [
    { nombre: 'Mamá Rosa', telefono: '+56991234567', relacion: 'Familiar' },
    { nombre: 'Amiga Daniela', telefono: '+56992345678', relacion: 'Amiga' },
  ])

  demoGuardarContactos(diego.uid, [
    { nombre: 'Hermano Felipe', telefono: '+56993456789', relacion: 'Familiar' },
  ])

  demoGuardarContactos(valentina.uid, [
    { nombre: 'Papá Luis', telefono: '+56994567890', relacion: 'Familiar' },
    { nombre: 'Compañera Pia', telefono: '+56995678901', relacion: 'Amiga' },
  ])

  log('📱 Contactos de emergencia asignados')

  // ═══════════════════════════════════════════════════════════════
  // PERFILES BÁSICOS
  // ═══════════════════════════════════════════════════════════════

  demoGuardarPerfil(carla.uid, {
    ultimoSabado: 'Fui a tomar café con una amiga y después vimos una serie en casa.',
    ultimoFindeDisfrutado: 'Fui a un concierto de salsa en el Parque O’Higgins. Fue increíble.',
    despuesTrabajo: 'Generalmente hago yoga o veo alguna serie. A veces salgo a cenar.',
    frecuenciaSocial: '2-3 veces por semana',
    ultimoEvento: 'Concierto de Marc Anthony el año pasado.',
    artistas: 'Chayanne, Marc Anthony, Shakira, Romeo Santos',
    peliculaSerie: 'Me encantan las series de Netflix tipo "La Casa de Papel" y películas románticas.',
    deporte: 'Hago yoga los lunes y miércoles. No veo mucho deporte en TV.',
    naturaleza: 'Me gusta ir al Cerro San Cristóbal a caminar los domingos.',
    mascota: 'Tengo una perrita french poodle llamada Luna.',
    horarioPreferido: 'Fines de semana, después de las 19h',
    lugaresFrecuentes: 'Barrio Lastarria, Parque Bicentenario, Mall Costanera Center',
    categoriasSel: ['Conciertos', 'Bares / Cervecerías', 'Caminatas / Trekking'],
    llegarEvento: 'Prefiero ir en Uber o Didi para no preocuparme del estacionamiento.',
    conversar: 'Soy extrovertida, me gusta conversar de todo.',
    temasEntusiasman: 'Música, viajes, series, comida, mascotas',
    temasEvitar: 'Política, religión, economía',
    silencios: 'Puedo estar en silencio, pero prefiero el ambiente animado.',
    rol: 'Me gusta proponer y también seguir. Soy flexible.',
    comunasSel: ['Las Condes', 'Providencia', 'Ñuñoa', 'Santiago Centro'],
    disponibilidad: ['Viernes noche', 'Sábado', 'Domingo'],
    presupuesto: '30.000 - 60.000 CLP',
    companiasPref: 'me_es_indistinto',
    nuncaHaria: 'No iría a un evento de reggaetón ni a un after sin conocer bien al lugar.',
    transporte: 'Uber / Didi',
  })

  demoGuardarPerfil(diego.uid, {
    ultimoSabado: 'Jugué fútbol con los amigos y después fuimos a una cervecería.',
    ultimoFindeDisfrutado: 'Concierto de Los Bunkers en el Movistar Arena.',
    despuesTrabajo: 'Gimnasio o salgo a correr por el Parque Forestal.',
    frecuenciaSocial: '3-4 veces por semana',
    ultimoEvento: 'Concierto de Chayanne hace 3 años en Viña.',
    artistas: 'Chayanne, Los Bunkers, Chancho en Piedra, Café Tacvba',
    peliculaSerie: 'Fanático de Star Wars y Breaking Bad.',
    deporte: 'Juego fútbol todos los sábados y hago running.',
    naturaleza: 'Me encanta el trekking. He hecho la W en Torres del Paine.',
    mascota: 'No tengo mascota pero me encantan los perros.',
    horarioPreferido: 'Viernes y sábado noche',
    lugaresFrecuentes: 'Barrio Bellavista, Cervecerías de Providencia, Estadio Nacional',
    categoriasSel: ['Conciertos', 'Bares / Cervecerías', 'Deportes'],
    llegarEvento: 'Metro o bicicleta si es cerca.',
    conversar: 'Extrovertido, me gusta conversar de música y deportes.',
    temasEntusiasman: 'Música chilena, fútbol, cerveza artesanal, viajes',
    temasEvitar: 'Religión, política',
    silencios: 'No me molesta el silencio, pero prefiero ambientes con música.',
    rol: 'Me gusta proponer actividades.',
    comunasSel: ['Providencia', 'Ñuñoa', 'Santiago Centro', 'Las Condes'],
    disponibilidad: ['Viernes noche', 'Sábado', 'Domingo'],
    presupuesto: '20.000 - 50.000 CLP',
    companiasPref: 'me_es_indistinto',
    nuncaHaria: 'No iría a un karaoke. Lo siento, no es lo mío.',
    transporte: 'Metro / Bici',
  })

  demoGuardarPerfil(valentina.uid, {
    ultimoSabado: 'Salí con amigas a una cervecería en Barrio Italia y después bailamos salsa.',
    ultimoFindeDisfrutado: 'Fui a un festival de cerveza artesanal en el Parque Inés de Suárez.',
    despuesTrabajo: 'Tomo un café con amigos o voy al gimnasio.',
    frecuenciaSocial: '4-5 veces por semana',
    ultimoEvento: 'Fiesta de Año Nuevo en Valparaíso.',
    artistas: 'Mon Laferte, Los Prisioneros, Gondwana',
    peliculaSerie: 'Me gustan los documentales y las comedias.',
    deporte: 'Hago spinning y pilates.',
    naturaleza: 'Me gusta ir a la playa, no tanto la montaña.',
    mascota: 'No tengo mascota.',
    horarioPreferido: 'Jueves, viernes y sábado noche',
    lugaresFrecuentes: 'Barrio Italia, Plaza Ñuñoa, Sala de baile',
    categoriasSel: ['Bares / Cervecerías', 'Baile / Salsa', 'Eventos sociales'],
    llegarEvento: 'Uber o taxi compartido.',
    conversar: 'Soy muy conversadora, me río mucho.',
    temasEntusiasman: 'Baile, cerveza artesanal, viajes, gastronomía',
    temasEvitar: 'Política, economía',
    silencios: 'Prefiero ambientes animados.',
    rol: 'Me gusta seguir el flow del grupo.',
    comunasSel: ['Ñuñoa', 'Providencia', 'La Reina'],
    disponibilidad: ['Jueves noche', 'Viernes noche', 'Sábado'],
    presupuesto: '15.000 - 40.000 CLP',
    companiasPref: 'femenina',
    nuncaHaria: 'No iría sola a un camping.',
    transporte: 'Uber / Taxi',
  })

  demoGuardarPerfil(javier.uid, {
    ultimoSabado: 'Fui a una feria de emprendedores y después a tomar cervezas.',
    ultimoFindeDisfrutado: 'Asado con amigos en la casa de mi primo.',
    despuesTrabajo: 'Voy al gym o juego videojuegos.',
    frecuenciaSocial: '2-3 veces por semana',
    artistas: 'Los Bunkers, Chayanne, Bad Bunny',
    peliculaSerie: 'Stranger Things, series de Marvel.',
    deporte: 'Fútbol y gym.',
    mascota: 'Tengo un gato llamado Milo.',
    horarioPreferido: 'Viernes y sábado noche',
    categoriasSel: ['Bares / Cervecerías', 'Conciertos', 'Eventos sociales'],
    conversar: 'Más bien introvertido al principio, pero me abro después.',
    comunasSel: ['Ñuñoa', 'Providencia'],
    disponibilidad: ['Viernes noche', 'Sábado'],
    presupuesto: '20.000 - 40.000 CLP',
    companiasPref: 'me_es_indistinto',
    transporte: 'Metro',
  })

  demoGuardarPerfil(andres.uid, {
    ultimoSabado: 'Llevé a mi hijo al fútbol y después paseé al perro.',
    ultimoFindeDisfrutado: 'Día de campo en la casa de mi hermana en Pirque.',
    despuesTrabajo: 'Paseo al perro o hago ejercicio en casa.',
    frecuenciaSocial: '1-2 veces por semana',
    artistas: 'Los Fabulosos Cadillacs, Soda Stereo',
    peliculaSerie: 'Películas de acción y thrillers.',
    deporte: 'Corro y hago ciclismo los fines de semana.',
    naturaleza: 'Me encanta el trekking y los parques.',
    mascota: 'Tengo un labrador llamado Max. Lo saco todos los días.',
    horarioPreferido: 'Mañanas de sábado y domingo',
    lugaresFrecuentes: 'Parque Bicentenario, Cerro San Cristóbal, Costanera Norte',
    categoriasSel: ['Caminatas / Trekking', 'Parques', 'Deportes'],
    llegarEvento: 'Auto propio.',
    conversar: 'Prefiero conversaciones profundas a charlas superficiales.',
    temasEntusiasman: 'Viajes, historia, naturaleza, crianza de hijos',
    temasEvitar: 'Chismes, política partidaria',
    silencios: 'Me gusta el silencio de la naturaleza.',
    rol: 'Prefiero seguir, pero puedo organizar si es necesario.',
    comunasSel: ['Vitacura', 'Las Condes', 'Lo Barnechea'],
    disponibilidad: ['Sábado mañana', 'Domingo mañana'],
    presupuesto: 'Sin presupuesto (gratis)',
    companiasPref: 'me_es_indistinto',
    nuncaHaria: 'No iría a un antro. No es mi ambiente.',
    transporte: 'Auto propio',
  })

  demoGuardarPerfil(camila.uid, {
    ultimoSabado: 'Fui a un mercado orgánico y después paseé a mis dos perros.',
    ultimoFindeDisfrutado: 'Trekking en el cerro Manquehue con un grupo de amigas.',
    despuesTrabajo: 'Paseo a mis perros o hago yoga.',
    frecuenciaSocial: '2-3 veces por semana',
    artistas: 'Natalia Lafourcade, Jorge Drexler',
    peliculaSerie: 'Documentales de naturaleza y películas independientes.',
    deporte: 'Yoga y trekking.',
    mascota: 'Tengo dos perras rescatadas: Luna y Sol.',
    horarioPreferido: 'Mañanas de fin de semana',
    categoriasSel: ['Caminatas / Trekking', 'Parques', 'Yoga / Meditación'],
    conversar: 'Soy tranquila, escucho más de lo que hablo.',
    comunasSel: ['Vitacura', 'Las Condes', 'Lo Barnechea'],
    disponibilidad: ['Sábado mañana', 'Domingo mañana'],
    presupuesto: 'Sin presupuesto (gratis)',
    companiasPref: 'femenina',
    transporte: 'Auto propio / Uber',
  })

  log('📝 Perfiles básicos completados')

  // ═══════════════════════════════════════════════════════════════
  // PERFILES PROFUNDOS
  // ═══════════════════════════════════════════════════════════════

  demoGuardarPerfilProfundo(carla.uid, {
    tragoFavorito: 'Mojito o pisco sour',
    marcaCigarro: 'No soy fumador',
    estadoAnimo: 'Generalmente contenta y con energía.',
    momentoReciente: 'En los últimos 3 meses disfruté mucho un viaje a Valparaíso con amigas.',
    energiaSocial: 'Extrovertida',
    rolConversacion: 'Hablo más de lo que escucho, pero intento equilibrar.',
    inquietoPasivo: 'Muy inquieta, siempre quiero hacer algo.',
    temasGusta: ['Música', 'Viajes', 'Series', 'Comida', 'Mascotas'],
    temasNoGusta: ['Política', 'Religión', 'Economía'],
    temaFavorito: 'Música en vivo y viajes por Chile',
    temaTabu: 'No me gusta hablar de salarios ni de política.',
    deporteHaceConversa: 'Converso de deporte pero no lo practico mucho.',
    conversaReligionPolitica: 'Prefiero evitar ambos temas.',
  })

  demoGuardarPerfilProfundo(diego.uid, {
    tragoFavorito: 'Cerveza artesanal IPA',
    marcaCigarro: 'No soy fumador',
    estadoAnimo: 'Bien, estable. Nada de bajones recientes.',
    momentoReciente: 'Disfruté mucho el trekking que hice con amigos a la laguna del Morado.',
    energiaSocial: 'Extrovertido',
    rolConversacion: 'Hablo y escucho por igual.',
    inquietoPasivo: 'Inquieto, me gusta estar en movimiento.',
    temasGusta: ['Música chilena', 'Fútbol', 'Trekking', 'Cerveza artesanal'],
    temasNoGusta: ['Religión', 'Política'],
    temaFavorito: 'Conciertos y música en vivo',
    temaTabu: 'No hablo de religión.',
    deporteHaceConversa: 'Hago deporte y también converso de él.',
    conversaReligionPolitica: 'No me gusta hablar de religión. De política solo lo básico.',
  })

  demoGuardarPerfilProfundo(valentina.uid, {
    tragoFavorito: 'Gin tonic o cerveza rubia',
    marcaCigarro: 'No soy fumador',
    estadoAnimo: 'Muy bien, últimamente muy feliz con mi nuevo trabajo.',
    momentoReciente: 'Me encantó un taller de salsa que tomé hace un mes.',
    energiaSocial: 'Extrovertida',
    rolConversacion: 'Hablo más que escucho, soy energética.',
    inquietoPasivo: 'Muy inquieta, no me quedo quieta.',
    temasGusta: ['Baile', 'Cerveza artesanal', 'Viajes', 'Gastronomía'],
    temasNoGusta: ['Política', 'Economía'],
    temaFavorito: 'Baile y salidas nocturnas',
    temaTabu: 'No me gusta hablar de ex parejas.',
    deporteHaceConversa: 'Hago spinning pero no converso mucho de deporte.',
    conversaReligionPolitica: 'Evito ambos temas.',
  })

  demoGuardarPerfilProfundo(javier.uid, {
    tragoFavorito: 'Cerveza stout o whisky',
    marcaCigarro: 'Lucky Strike',
    estadoAnimo: 'Estable, nada destacable.',
    momentoReciente: 'Disfruté un asado con amigos el mes pasado.',
    energiaSocial: 'Introvertido al principio',
    rolConversacion: 'Escucho más de lo que hablo.',
    inquietoPasivo: 'Más bien pasivo, me gusta el chill.',
    temasGusta: ['Videojuegos', 'Música', 'Emprendimiento', 'Asados'],
    temasNoGusta: ['Chismes', 'Política'],
    temaFavorito: 'Startups y música',
    temaTabu: 'No me gusta hablar de dinero.',
    deporteHaceConversa: 'Hago gym pero no es tema de conversación.',
    conversaReligionPolitica: 'No me interesa la religión. Política solo si es necesario.',
  })

  demoGuardarPerfilProfundo(andres.uid, {
    tragoFavorito: 'Vino tinto o cerveza rubia',
    marcaCigarro: 'No soy fumador',
    estadoAnimo: 'Bien, aunque a veces echo de menos compañía para salir.',
    momentoReciente: 'Sufrí la pérdida de mi suegro hace 2 meses. Ha sido difícil pero estoy saliendo adelante.',
    energiaSocial: 'Ambivertido',
    rolConversacion: 'Escucho más de lo que hablo. Me gustan las conversaciones profundas.',
    inquietoPasivo: 'Equilibrado. Disfruto la calma y también la actividad.',
    temasGusta: ['Historia', 'Naturaleza', 'Viajes', 'Crianza', 'Perros'],
    temasNoGusta: ['Chismes', 'Política partidaria', 'Religión'],
    temaFavorito: 'Trekking y viajes familiares',
    temaTabu: 'No me gusta hablar de mi separación con desconocidos.',
    deporteHaceConversa: 'Hago ciclismo y converso de ello.',
    conversaReligionPolitica: 'No me interesa hablar de religión. Política solo en contextos apropiados.',
  })

  demoGuardarPerfilProfundo(camila.uid, {
    tragoFavorito: 'No consumo alcohol',
    marcaCigarro: 'No soy fumador',
    estadoAnimo: 'Muy bien, tranquila y en paz.',
    momentoReciente: 'Disfruté mucho adoptar a mi segunda perrita hace 2 meses.',
    energiaSocial: 'Introvertida',
    rolConversacion: 'Escucho mucho más de lo que hablo.',
    inquietoPasivo: 'Muy tranquila, me gusta la calma.',
    temasGusta: ['Naturaleza', 'Yoga', 'Perros', 'Alimentación saludable'],
    temasNoGusta: ['Política', 'Chismes', 'Religión'],
    temaFavorito: 'Bienestar animal y trekking',
    temaTabu: 'No hablo de política ni religión.',
    deporteHaceConversa: 'Hago yoga y trekking. Me gusta conversar de eso.',
    conversaReligionPolitica: 'Evito ambos temas completamente.',
  })

  log('📝 Perfiles profundos completados')

  // ═══════════════════════════════════════════════════════════════
  // PANORAMAS
  // ═══════════════════════════════════════════════════════════════

  // Carla quiere ir a ver a Chayanne
  const panoChayanne = demoCrearPanorama(carla.uid, {
    actividad: 'Concierto de Chayanne',
    lugar: 'Movistar Arena, Santiago Centro',
    fecha: '2026-08-15',
    hora: '21:00',
    presupuesto: 'Entrada $50.000 - $80.000 en Ticketmaster',
    companiasPref: 'me_es_indistinto',
    entradaComprada: 'Sí, tengo entrada en piso (categoría Oro)',
    descripcionGenerada: 'Carla quiere ir a ver a Chayanne el sábado 15 de agosto a las 21:00 en Movistar Arena. Ya tiene entrada comprada en piso (Oro). Busca alguien que también tenga entrada en la misma zona o quiera ir juntos/a encontrarse afuera.',
  })

  // Valentina quiere ir a Sala Portugal
  const panoPortugal = demoCrearPanorama(valentina.uid, {
    actividad: 'Salir a bailar y tomar cerveza',
    lugar: 'Sala Portugal, Ñuñoa',
    fecha: '2026-08-08',
    hora: '22:00',
    presupuesto: '$25.000 (cover + consumiciones)',
    companiasPref: 'femenina',
    entradaComprada: 'No necesita, cover en puerta',
    descripcionGenerada: 'Valentina quiere ir a Sala Portugal el viernes 8 de agosto a las 22:00 para bailar salsa/tomar cerveza. Presupuesto $25.000. Busca compañía femenina.',
  })

  // Andrés quiere pasear al perro
  const panoPerro = demoCrearPanorama(andres.uid, {
    actividad: 'Pasear al perro',
    lugar: 'Parque Bicentenario, Vitacura',
    fecha: '2026-08-09',
    hora: '07:30',
    presupuesto: 'Sin presupuesto (gratis)',
    companiasPref: 'me_es_indistinto',
    entradaComprada: 'No aplica',
    descripcionGenerada: 'Andrés quiere compañía para pasear a su labrador Max el domingo 9 de agosto a las 07:30 en Parque Bicentenario. Ideal si también tienes perro. Sin costo.',
  })

  // Francisca quiere hacer trekking (para ejemplo de evaluación completada)
  const panoTrekking = demoCrearPanorama(francisca.uid, {
    actividad: 'Trekking al Cerro San Cristóbal',
    lugar: 'Cerro San Cristóbal, Providencia',
    fecha: '2026-07-20',
    hora: '07:00',
    presupuesto: 'Sin presupuesto (gratis)',
    companiasPref: 'me_es_indistinto',
    entradaComprada: 'No aplica',
    descripcionGenerada: 'Francisca quiere hacer trekking el domingo 20 de julio a las 07:00 en Cerro San Cristóbal.',
  })

  log(`🎯 Creados 4 panoramas de prueba`)

  // ═══════════════════════════════════════════════════════════════
  // MATCHES MANUALES (sobrescribir los simulados para tener control)
  // ═══════════════════════════════════════════════════════════════

  // Carla → Diego acepta
  demoActualizarMatch(panoChayanne.id, panoChayanne.matches[0].matchUserId, 'aceptado')

  // Valentina → Javier acepta
  demoActualizarMatch(panoPortugal.id, panoPortugal.matches[0].matchUserId, 'aceptado')

  // Andrés → Camila acepta
  demoActualizarMatch(panoPerro.id, panoPerro.matches[0].matchUserId, 'aceptado')

  // Francisca → Rodrigo rechaza
  demoActualizarMatch(panoTrekking.id, panoTrekking.matches[0].matchUserId, 'rechazado')

  log('🤝 Matches simulados actualizados')

  // ═══════════════════════════════════════════════════════════════
  // PANORAMA COMPLETADO (para evaluaciones)
  // ═══════════════════════════════════════════════════════════════

  demoCerrarPanorama(panoChayanne.id)
  demoCerrarPanorama(panoTrekking.id)

  log('✅ Panoramas cerrados (completados)')

  // ═══════════════════════════════════════════════════════════════
  // EVALUACIONES
  // ═══════════════════════════════════════════════════════════════

  // Evaluación positiva: Diego evalúa a Carla (el concierto fue bueno)
  demoGuardarEvaluacion({
    panoramaId: panoChayanne.id,
    evaluadorUid: diego.uid,
    evaluadoUid: carla.uid,
    evaluadoNombre: 'Carla Morales',
    estrellas: 5,
    comentario: '¡Excelente compañía! Carla llegó puntual, es súper simpática y cantamos todos los temas juntos. Volvería a juntarme sin dudar.',
    cumplioPanorama: true,
    llegoATiempo: true,
    volveriaAJuntarse: true,
  })

  // Carla evalúa a Diego
  demoGuardarEvaluacion({
    panoramaId: panoChayanne.id,
    evaluadorUid: carla.uid,
    evaluadoUid: diego.uid,
    evaluadoNombre: 'Diego Rivera',
    estrellas: 5,
    comentario: 'Diego fue un gran acompañante. Respetuoso, divertido y con buena onda. 100% recomendado.',
    cumplioPanorama: true,
    llegoATiempo: true,
    volveriaAJuntarse: true,
  })

  // Evaluación negativa: Rodrigo evalúa a Francisca (el trekking no salió bien)
  demoGuardarEvaluacion({
    panoramaId: panoTrekking.id,
    evaluadorUid: rodrigo.uid,
    evaluadoUid: francisca.uid,
    evaluadoNombre: 'Francisca Vega',
    estrellas: 1,
    comentario: 'No llegó al punto de encuentro y no avisó. Esperé 45 minutos y tuve que irme solo. Mala experiencia.',
    cumplioPanorama: false,
    llegoATiempo: false,
    volveriaAJuntarse: false,
  })

  log('⭐ Evaluaciones guardadas (2 positivas, 1 negativa)')

  // ═══════════════════════════════════════════════════════════════
  // RECLAMO
  // ═══════════════════════════════════════════════════════════════

  demoGuardarReclamo({
    tipo: 'evaluacion_negativa',
    uidAfectado: francisca.uid,
    nombreAfectado: 'Francisca Vega',
    uidReportero: rodrigo.uid,
    descripcion: 'El usuario no llegó al panorama y no avisó. Solicito revisión.',
    estrellas: 1,
    estado: 'pendiente',
  })

  log('🚨 Reclamo guardado en bandeja admin')

  // ═══════════════════════════════════════════════════════════════
  // FIN
  // ═══════════════════════════════════════════════════════════════
  log('=== SEED FINALIZADO ===')
}
