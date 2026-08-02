/**
 * SEED DATA — Carga datos de prueba realistas en localStorage
 * para que el demo se vea como una app con usuarios activos.
 *
 * Escenarios:
 * 1. Carla (34) tiene entrada para Chayanne → match con Diego (28)
 * 2. Valentina (31) quiere ir a Sala Portugal → match con Javier
 * 3. Andrés (45, separado) pasea perro en Parque Bicentenario → match con Camila
 * 4. Panorama completado de trekking con evaluación mixta
 * + 20 usuarios adicionales para demo poblado
 */

import {
  demoRegistrar,
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
  const alreadySeeded = localStorage.getItem('demo_seeded_v2')
  if (alreadySeeded) {
    console.log('[SEED] Datos ya precargados. Saltando.')
    return
  }
  seedLog = []
  ejecutarSeed()
  localStorage.setItem('demo_seeded_v2', 'true')
  log('✅ Seed completado. Recarga la página para ver los datos.')
}

export function demoResetAndSeed() {
  localStorage.removeItem('demo_seeded_v2')
  const keys = [
    'demo_users', 'demo_session', 'demo_perfiles', 'demo_perfiles_profundos',
    'demo_panoramas', 'demo_contactos', 'demo_evaluaciones', 'demo_reclamos',
  ]
  keys.forEach(k => localStorage.removeItem(k))
  seedLog = []
  ejecutarSeed()
  localStorage.setItem('demo_seeded_v2', 'true')
}

function ejecutarSeed() {
  log('=== PANORAMIX DEMO SEED v2 ===')

  // ═══════════════════════════════════════════════════════════════
  // USUARIOS ORIGINALES (8)
  // ═══════════════════════════════════════════════════════════════

  const carla = demoRegistrar('carla.morales@ejemplo.cl', 'demo123', 'Carla Morales')
  const diego = demoRegistrar('diego.rivera@ejemplo.cl', 'demo123', 'Diego Rivera')
  const valentina = demoRegistrar('valentina.soto@ejemplo.cl', 'demo123', 'Valentina Soto')
  const javier = demoRegistrar('javier.torres@ejemplo.cl', 'demo123', 'Javier Torres')
  const andres = demoRegistrar('andres.guzman@ejemplo.cl', 'demo123', 'Andrés Guzmán')
  const camila = demoRegistrar('camila.rios@ejemplo.cl', 'demo123', 'Camila Ríos')
  const francisca = demoRegistrar('fran.vega@ejemplo.cl', 'demo123', 'Francisca Vega')
  const rodrigo = demoRegistrar('rodrigo.munoz@ejemplo.cl', 'demo123', 'Rodrigo Muñoz')

  // ═══════════════════════════════════════════════════════════════
  // USUARIOS EXTRA (20)
  // ═══════════════════════════════════════════════════════════════

  const marta = demoRegistrar('marta.lopez@ejemplo.cl', 'demo123', 'Marta López')
  const pedro = demoRegistrar('pedro.sanchez@ejemplo.cl', 'demo123', 'Pedro Sánchez')
  const laura = demoRegistrar('laura.fernandez@ejemplo.cl', 'demo123', 'Laura Fernández')
  const bruno = demoRegistrar('bruno.castillo@ejemplo.cl', 'demo123', 'Bruno Castillo')
  const danae = demoRegistrar('danae.ruiz@ejemplo.cl', 'demo123', 'Danae Ruiz')
  const esteban = demoRegistrar('esteban.morales@ejemplo.cl', 'demo123', 'Esteban Morales')
  const gloria = demoRegistrar('gloria.vega@ejemplo.cl', 'demo123', 'Gloria Vega')
  const hugo = demoRegistrar('hugo.araya@ejemplo.cl', 'demo123', 'Hugo Araya')
  const irene = demoRegistrar('irene.paredes@ejemplo.cl', 'demo123', 'Irene Paredes')
  const juancruz = demoRegistrar('juan.cruz@ejemplo.cl', 'demo123', 'Juan Cruz')
  const karla = demoRegistrar('karla.mendoza@ejemplo.cl', 'demo123', 'Karla Mendoza')
  const leo = demoRegistrar('leo.bustamante@ejemplo.cl', 'demo123', 'Leo Bustamante')
  const monica = demoRegistrar('monica.soto@ejemplo.cl', 'demo123', 'Mónica Soto')
  const nicolas = demoRegistrar('nicolas.vidal@ejemplo.cl', 'demo123', 'Nicolás Vidal')
  const olivia = demoRegistrar('olivia.reyes@ejemplo.cl', 'demo123', 'Olivia Reyes')
  const pablo = demoRegistrar('pablo.herrera@ejemplo.cl', 'demo123', 'Pablo Herrera')
  const renata = demoRegistrar('renata.cruz@ejemplo.cl', 'demo123', 'Renata Cruz')
  const sergio = demoRegistrar('sergio.vega@ejemplo.cl', 'demo123', 'Sergio Vega')
  const tatiana = demoRegistrar('tatiana.lira@ejemplo.cl', 'demo123', 'Tatiana Lira')
  const vicente = demoRegistrar('vicente.palma@ejemplo.cl', 'demo123', 'Vicente Palma')
  const admin = demoRegistrar('admin@panoramix.com', '2024', 'Administrador')

  log(`👤 Creados 29 usuarios de prueba (incluye admin)`)

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
  demoGuardarContactos(marta.uid, [
    { nombre: 'Hija Carla', telefono: '+56991112233', relacion: 'Familiar' },
  ])
  demoGuardarContactos(pedro.uid, [
    { nombre: 'Amigo Roberto', telefono: '+56992223344', relacion: 'Amigo' },
  ])
  demoGuardarContactos(laura.uid, [
    { nombre: 'Hermana Ana', telefono: '+56993334455', relacion: 'Familiar' },
    { nombre: 'Amigo Tomás', telefono: '+56994445566', relacion: 'Amigo' },
  ])
  demoGuardarContactos(bruno.uid, [
    { nombre: 'Ex cuñado Marco', telefono: '+56995556677', relacion: 'Familiar' },
  ])
  demoGuardarContactos(admin.uid, [
    { nombre: 'Soporte Técnico', telefono: '+56999998888', relacion: 'Trabajo' },
  ])

  log('📱 Contactos de emergencia asignados')

  // ═══════════════════════════════════════════════════════════════
  // PERFILES BÁSICOS — ORIGINALES (6 completos)
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

  // ═══════════════════════════════════════════════════════════════
  // PERFILES BÁSICOS — EXTRA (20 resumidos para no saturar)
  // ═══════════════════════════════════════════════════════════════

  const perfilesExtra: Record<string, any> = {
    [marta.uid]: {
      ultimoSabado: 'Fui al teatro con mi hija a ver una obra chilena.',
      ultimoFindeDisfrutado: 'Almuerzo familiar en casa de mi hermana.',
      despuesTrabajo: 'Leo o veo una película.',
      frecuenciaSocial: '1 vez por semana',
      artistas: 'Luis Jara, Cecilia, boleros de toda la vida',
      peliculaSerie: 'Novelas históricas y dramas.',
      deporte: 'Caminatas suaves.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Tardes de sábado',
      categoriasSel: ['Teatro', 'Cine', 'Caminatas / Trekking'],
      comunasSel: ['Las Condes', 'Providencia', 'Ñuñoa'],
      disponibilidad: ['Sábado tarde', 'Domingo'],
      presupuesto: '20.000 - 40.000 CLP',
      companiasPref: 'femenina',
      transporte: 'Auto propio / Uber',
    },
    [pedro.uid]: {
      ultimoSabado: 'Salí a caminar al Cerro San Cristóbal con un grupo de jubilados.',
      ultimoFindeDisfrutado: 'Asado con los nietos.',
      despuesTrabajo: 'Me jubilé, así que hago lo que quiero.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Los Jaivas, Inti-Illimani, Violeta Parra',
      peliculaSerie: 'Documentales de historia de Chile.',
      deporte: 'Caminatas y natación.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Mañanas',
      categoriasSel: ['Caminatas / Trekking', 'Teatro', 'Eventos culturales'],
      comunasSel: ['Providencia', 'Santiago Centro', 'Las Condes'],
      disponibilidad: ['Lunes', 'Miércoles', 'Viernes'],
      presupuesto: 'Sin presupuesto (gratis)',
      companiasPref: 'me_es_indistinto',
      transporte: 'Metro / Bus',
    },
    [laura.uid]: {
      ultimoSabado: 'Fui a un concierto indie en un bar de Bellavista.',
      ultimoFindeDisfrutado: 'Festival de cine en el GAM.',
      despuesTrabajo: 'Escucho música o salgo a tomar algo.',
      frecuenciaSocial: '3-4 veces por semana',
      artistas: 'Gepe, Javiera Mena, Pedropiedra, Alex Anwandter',
      peliculaSerie: 'Cine independiente y series extranjeras.',
      deporte: 'Bicicleta los domingos.',
      mascota: 'Tengo un perro rescatado llamado Copi.',
      horarioPreferido: 'Viernes y sábado noche',
      categoriasSel: ['Conciertos', 'Cine', 'Bares / Cervecerías'],
      comunasSel: ['Providencia', 'Santiago Centro', 'Ñuñoa'],
      disponibilidad: ['Viernes noche', 'Sábado', 'Domingo'],
      presupuesto: '15.000 - 35.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Bici / Metro',
    },
    [bruno.uid]: {
      ultimoSabado: 'Cata de cervezas artesanales en un pub de Barrio Italia.',
      ultimoFindeDisfrutado: 'Asado con amigos en Rancagua.',
      despuesTrabajo: 'Voy al gym o a tomar una cerveza.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Los Tres, Chancho en Piedra, La Pozze Latina',
      peliculaSerie: 'Series de Netflix y documentales de crímenes.',
      deporte: 'Gym y fútbol con amigos.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Viernes y sábado noche',
      categoriasSel: ['Bares / Cervecerías', 'Asados / Parrillas', 'Deportes'],
      comunasSel: ['Ñuñoa', 'La Reina', 'Providencia'],
      disponibilidad: ['Viernes noche', 'Sábado'],
      presupuesto: '20.000 - 50.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Auto propio / Uber',
    },
    [danae.uid]: {
      ultimoSabado: 'Salí de fiesta con compañeras de la U.',
      ultimoFindeDisfrutado: 'Picnic en el Parque Forestal.',
      despuesTrabajo: 'Estudio o veo series.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Bad Bunny, Karol G, Feid, Young Cister',
      peliculaSerie: 'Anime, series de HBO, reality shows.',
      deporte: 'Voy al gym de vez en cuando.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Viernes y sábado noche',
      categoriasSel: ['Bares / Cervecerías', 'Eventos sociales', 'Baile / Salsa'],
      comunasSel: ['Santiago Centro', 'Ñuñoa', 'Providencia'],
      disponibilidad: ['Viernes noche', 'Sábado'],
      presupuesto: '10.000 - 25.000 CLP',
      companiasPref: 'femenina',
      transporte: 'Metro / Uber',
    },
    [esteban.uid]: {
      ultimoSabado: 'Jugué tenis con un amigo y después fuimos a almorzar.',
      ultimoFindeDisfrutado: 'Partido de la U en el estadio.',
      despuesTrabajo: 'Voy al gym o salgo a correr.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Los Prisioneros, Los Bunkers, Depeche Mode',
      peliculaSerie: 'Películas de acción y series policiales.',
      deporte: 'Tenis, running, gym.',
      mascota: 'Tengo un perro labrador.',
      horarioPreferido: 'Sábado y domingo',
      categoriasSel: ['Deportes', 'Conciertos', 'Bares / Cervecerías'],
      comunasSel: ['Las Condes', 'Vitacura', 'Lo Barnechea'],
      disponibilidad: ['Sábado', 'Domingo'],
      presupuesto: '30.000 - 60.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Auto propio',
    },
    [gloria.uid]: {
      ultimoSabado: 'Fui al cine a ver una película española.',
      ultimoFindeDisfrutado: 'Obra de teatro en el Teatro Nacional.',
      despuesTrabajo: 'Cocino o leo.',
      frecuenciaSocial: '1-2 veces por semana',
      artistas: 'Joaquín Sabina, Joan Manuel Serrat, Ana Belén',
      peliculaSerie: 'Cine europeo, teatro filmado, novelas.',
      deporte: 'Yoga y pilates.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Tardes de fin de semana',
      categoriasSel: ['Teatro', 'Cine', 'Eventos culturales'],
      comunasSel: ['Providencia', 'Las Condes', 'Santiago Centro'],
      disponibilidad: ['Sábado tarde', 'Domingo'],
      presupuesto: '20.000 - 40.000 CLP',
      companiasPref: 'femenina',
      transporte: 'Uber / Taxi',
    },
    [hugo.uid]: {
      ultimoSabado: 'Fui a la cancha a ver a la U y después al bar.',
      ultimoFindeDisfrutado: 'Partido de tenis con amigos.',
      despuesTrabajo: 'Veo deportes o juego FIFA.',
      frecuenciaSocial: '3-4 veces por semana',
      artistas: 'Los Jaivas, Los Bunkers, Los Tres',
      peliculaSerie: 'Documentales de deportes, series de acción.',
      deporte: 'Fútbol, tenis, running.',
      mascota: 'Tengo un perro bulldog francés.',
      horarioPreferido: 'Viernes y sábado',
      categoriasSel: ['Deportes', 'Bares / Cervecerías', 'Asados / Parrillas'],
      comunasSel: ['Ñuñoa', 'Providencia', 'Las Condes'],
      disponibilidad: ['Viernes noche', 'Sábado', 'Domingo'],
      presupuesto: '20.000 - 50.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Auto propio / Metro',
    },
    [irene.uid]: {
      ultimoSabado: 'Clase de yoga en el parque y café con amigas.',
      ultimoFindeDisfrutado: 'Retiro de yoga en Olmué.',
      despuesTrabajo: 'Yoga, meditación o lectura.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Natalia Lafourcade, Jorge Drexler, Silvio Rodríguez',
      peliculaSerie: 'Documentales de bienestar, películas independientes.',
      deporte: 'Yoga, pilates, caminatas.',
      mascota: 'Tengo un gato rescatado.',
      horarioPreferido: 'Mañanas de fin de semana',
      categoriasSel: ['Yoga / Meditación', 'Cafés', 'Caminatas / Trekking'],
      comunasSel: ['Providencia', 'Ñuñoa', 'Las Condes'],
      disponibilidad: ['Sábado mañana', 'Domingo mañana'],
      presupuesto: '10.000 - 25.000 CLP',
      companiasPref: 'femenina',
      transporte: 'Metro / Bici',
    },
    [juancruz.uid]: {
      ultimoSabado: 'Salí en bicicleta por la costanera.',
      ultimoFindeDisfrutado: 'Ciclismo en el Cajón del Maipo.',
      despuesTrabajo: 'Voy al gym o salgo a andar en bici.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Los Prisioneros, Los Tres, Soda Stereo',
      peliculaSerie: 'Documentales de deportes extremos.',
      deporte: 'Ciclismo, running, gym.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Mañanas de fin de semana',
      categoriasSel: ['Deportes', 'Caminatas / Trekking', 'Bares / Cervecerías'],
      comunasSel: ['Las Condes', 'Vitacura', 'Providencia'],
      disponibilidad: ['Sábado mañana', 'Domingo'],
      presupuesto: '20.000 - 40.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Bicicleta / Auto',
    },
    [karla.uid]: {
      ultimoSabado: 'Fiesta electrónica en un club de Santiago.',
      ultimoFindeDisfrutado: 'Festival Lollapalooza.',
      despuesTrabajo: 'Escucho música o salgo a bailar.',
      frecuenciaSocial: '3-4 veces por semana',
      artistas: 'Dimitri Vegas, Skrillex, Calvin Harris, Bizarrap',
      peliculaSerie: 'Series de ciencia ficción y anime.',
      deporte: 'Voy al gym y hago spinning.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Viernes y sábado noche',
      categoriasSel: ['Conciertos', 'Baile / Salsa', 'Eventos sociales'],
      comunasSel: ['Santiago Centro', 'Providencia', 'Ñuñoa'],
      disponibilidad: ['Viernes noche', 'Sábado'],
      presupuesto: '20.000 - 50.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Uber / Taxi',
    },
    [leo.uid]: {
      ultimoSabado: 'Llevé a mi hijo al parque y después al cine.',
      ultimoFindeDisfrutado: 'Día de playa en Cartagena con mi hijo.',
      despuesTrabajo: 'Juego con mi hijo o veo series.',
      frecuenciaSocial: '1-2 veces por semana',
      artistas: 'Los Bunkers, Chancho en Piedra, Gepe',
      peliculaSerie: 'Películas animadas y comedias.',
      deporte: 'Fútbol con amigos los sábados.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Fines de semana',
      categoriasSel: ['Cine', 'Parques', 'Deportes'],
      comunasSel: ['Las Condes', 'Vitacura', 'La Reina'],
      disponibilidad: ['Sábado', 'Domingo'],
      presupuesto: '20.000 - 40.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Auto propio',
    },
    [monica.uid]: {
      ultimoSabado: 'Caminata en el cerro Manquehue con amigas.',
      ultimoFindeDisfrutado: 'Almuerzo en una viña del valle de Casablanca.',
      despuesTrabajo: 'Cocino o hago manualidades.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Cecilia, Violeta Parra, Inti-Illimani',
      peliculaSerie: 'Novelas históricas y documentales.',
      deporte: 'Caminatas y natación.',
      mascota: 'Tengo dos perros.',
      horarioPreferido: 'Mañanas de fin de semana',
      categoriasSel: ['Caminatas / Trekking', 'Eventos culturales', 'Gastronomía'],
      comunasSel: ['Las Condes', 'Lo Barnechea', 'Vitacura'],
      disponibilidad: ['Sábado mañana', 'Domingo'],
      presupuesto: '30.000 - 60.000 CLP',
      companiasPref: 'femenina',
      transporte: 'Auto propio / Uber',
    },
    [nicolas.uid]: {
      ultimoSabado: 'Gym y después bar con amigos.',
      ultimoFindeDisfrutado: 'Asado en la casa de un amigo.',
      despuesTrabajo: 'Voy al gym o juego videojuegos.',
      frecuenciaSocial: '3-4 veces por semana',
      artistas: 'Bad Bunny, Feid, Myke Towers, Pailita',
      peliculaSerie: 'Series de Marvel, anime, documentales.',
      deporte: 'Gym, fútbol, running.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Viernes y sábado noche',
      categoriasSel: ['Gym / Fitness', 'Bares / Cervecerías', 'Eventos sociales'],
      comunasSel: ['Ñuñoa', 'Providencia', 'Santiago Centro'],
      disponibilidad: ['Viernes noche', 'Sábado'],
      presupuesto: '15.000 - 35.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Metro / Uber',
    },
    [olivia.uid]: {
      ultimoSabado: 'Cata de vinos en una viña de Maipo.',
      ultimoFindeDisfrutado: 'Cena de autor en un restaurante nuevo.',
      despuesTrabajo: 'Cocino experimentando recetas nuevas.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Jorge Drexler, Beirut, Bon Iver',
      peliculaSerie: 'Cine independiente, series europeas.',
      deporte: 'Yoga y caminatas.',
      mascota: 'Tengo un gato.',
      horarioPreferido: 'Viernes y sábado noche',
      categoriasSel: ['Gastronomía', 'Catas de vino', 'Cine'],
      comunasSel: ['Providencia', 'Las Condes', 'Vitacura'],
      disponibilidad: ['Viernes noche', 'Sábado', 'Domingo'],
      presupuesto: '40.000 - 80.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Uber / Auto',
    },
    [pablo.uid]: {
      ultimoSabado: 'Trekking en el Cajón del Maipo.',
      ultimoFindeDisfrutado: 'Camping en la cordillera con amigos.',
      despuesTrabajo: 'Veo documentales de naturaleza.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Los Jaivas, Los Bunkers, Los Tres',
      peliculaSerie: 'Documentales de naturaleza y aventura.',
      deporte: 'Trekking, ciclismo, escalada.',
      mascota: 'Tengo un perro.',
      horarioPreferido: 'Mañanas de fin de semana',
      categoriasSel: ['Caminatas / Trekking', 'Camping', 'Deportes'],
      comunasSel: ['Las Condes', 'Lo Barnechea', 'Vitacura'],
      disponibilidad: ['Sábado mañana', 'Domingo'],
      presupuesto: '20.000 - 50.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Auto propio',
    },
    [renata.uid]: {
      ultimoSabado: 'Brunch en un café de Barrio Italia con amigas.',
      ultimoFindeDisfrutado: 'Paseo en bicicleta por la costanera con mi perro.',
      despuesTrabajo: 'Paseo al perro o veo series.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Mon Laferte, Natalia Lafourcade, Girl Ultra',
      peliculaSerie: 'Comedias románticas, series de Netflix.',
      deporte: 'Yoga, caminatas.',
      mascota: 'Tengo un golden retriever.',
      horarioPreferido: 'Mañanas de fin de semana',
      categoriasSel: ['Cafés', 'Parques', 'Caminatas / Trekking'],
      comunasSel: ['Ñuñoa', 'Providencia', 'La Reina'],
      disponibilidad: ['Sábado mañana', 'Domingo'],
      presupuesto: '15.000 - 35.000 CLP',
      companiasPref: 'femenina',
      transporte: 'Auto / Bici',
    },
    [sergio.uid]: {
      ultimoSabado: 'Concierto de rock en un bar de Bellavista.',
      ultimoFindeDisfrutado: 'Festival de rock en el Parque O’Higgins.',
      despuesTrabajo: 'Toco guitarra o salgo a tomar una cerveza.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Los Prisioneros, Los Tres, Lucybell, La Ley',
      peliculaSerie: 'Documentales de música, películas clásicas.',
      deporte: 'Fútbol con amigos.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Viernes y sábado noche',
      categoriasSel: ['Conciertos', 'Bares / Cervecerías', 'Deportes'],
      comunasSel: ['Providencia', 'Ñuñoa', 'Santiago Centro'],
      disponibilidad: ['Viernes noche', 'Sábado'],
      presupuesto: '20.000 - 50.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Metro / Uber',
    },
    [tatiana.uid]: {
      ultimoSabado: 'Clase de salsa y después cervezas con compañeros.',
      ultimoFindeDisfrutado: 'Festival de salsa en el Movistar Arena.',
      despuesTrabajo: 'Escucho música o practico baile.',
      frecuenciaSocial: '3-4 veces por semana',
      artistas: 'Marc Anthony, Romeo Santos, Grupo Niche, Gilberto Santa Rosa',
      peliculaSerie: 'Novelas colombianas, comedias.',
      deporte: 'Bailo salsa y bachata.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Jueves, viernes y sábado noche',
      categoriasSel: ['Baile / Salsa', 'Bares / Cervecerías', 'Eventos sociales'],
      comunasSel: ['Ñuñoa', 'Providencia', 'Santiago Centro'],
      disponibilidad: ['Jueves noche', 'Viernes noche', 'Sábado'],
      presupuesto: '15.000 - 35.000 CLP',
      companiasPref: 'femenina',
      transporte: 'Uber / Taxi',
    },
    [vicente.uid]: {
      ultimoSabado: 'Partido de golf en el club y después almuerzo.',
      ultimoFindeDisfrutado: 'Torneo de golf con amigos.',
      despuesTrabajo: 'Voy al club o leo.',
      frecuenciaSocial: '2-3 veces por semana',
      artistas: 'Luis Miguel, Julio Iglesias, Roberto Carlos',
      peliculaSerie: 'Documentales de historia, películas clásicas.',
      deporte: 'Golf, tenis.',
      mascota: 'No tengo mascota.',
      horarioPreferido: 'Mañanas de fin de semana',
      categoriasSel: ['Deportes', 'Gastronomía', 'Eventos culturales'],
      comunasSel: ['Las Condes', 'Vitacura', 'Lo Barnechea'],
      disponibilidad: ['Sábado mañana', 'Domingo'],
      presupuesto: '50.000 - 100.000 CLP',
      companiasPref: 'me_es_indistinto',
      transporte: 'Auto propio',
    },
  }

  Object.entries(perfilesExtra).forEach(([uid, perfil]) => {
    demoGuardarPerfil(uid, perfil)
  })

  log('📝 Perfiles básicos completados (28 usuarios + admin)')

  // ═══════════════════════════════════════════════════════════════
  // PERFILES PROFUNDOS — ORIGINALES (6)
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

  // Perfiles profundos extra (algunos representativos)
  demoGuardarPerfilProfundo(marta.uid, {
    tragoFavorito: 'Vino tinto',
    marcaCigarro: 'No soy fumador',
    estadoAnimo: 'Bien, disfrutando de mi nueva etapa.',
    momentoReciente: 'Mi hija se casó hace un mes y fue una fiesta hermosa.',
    energiaSocial: 'Ambivertida',
    rolConversacion: 'Escucho más de lo que hablo.',
    inquietoPasivo: 'Tranquila, me gusta la calma.',
    temasGusta: ['Teatro', 'Familia', 'Historia', 'Viajes'],
    temasNoGusta: ['Tecnología', 'Política'],
    temaFavorito: 'Teatro chileno contemporáneo',
    temaTabu: 'No me gusta hablar de enfermedades.',
    deporteHaceConversa: 'No hago ni converso de deporte.',
    conversaReligionPolitica: 'Evito ambos temas.',
  })

  demoGuardarPerfilProfundo(laura.uid, {
    tragoFavorito: 'Cerveza artesanal',
    marcaCigarro: 'No soy fumador',
    estadoAnimo: 'Muy bien, creativa y con energía.',
    momentoReciente: 'Lancé mi propio emprendimiento de diseño hace 2 meses.',
    energiaSocial: 'Extrovertida',
    rolConversacion: 'Hablo y escucho por igual.',
    inquietoPasivo: 'Inquieta, me gusta estar en movimiento.',
    temasGusta: ['Música', 'Diseño', 'Cine', 'Bicicleta'],
    temasNoGusta: ['Religión', 'Política'],
    temaFavorito: 'Música indie chilena y diseño',
    temaTabu: 'No me gusta hablar de plata.',
    deporteHaceConversa: 'Hago ciclismo y converso de ello.',
    conversaReligionPolitica: 'No me interesa la religión.',
  })

  demoGuardarPerfilProfundo(tatiana.uid, {
    tragoFavorito: 'Cerveza',
    marcaCigarro: 'No soy fumador',
    estadoAnimo: 'Feliz, la salsa me llena de energía.',
    momentoReciente: 'Gané un concurso de baile de salsa en mi academia.',
    energiaSocial: 'Extrovertida',
    rolConversacion: 'Hablo más que escucho.',
    inquietoPasivo: 'Muy inquieta, siempre bailando.',
    temasGusta: ['Baile', 'Música latina', 'Viajes', 'Comida'],
    temasNoGusta: ['Política', 'Economía'],
    temaFavorito: 'Salsa, bachata y timba cubana',
    temaTabu: 'No hablo de ex parejas.',
    deporteHaceConversa: 'Bailo, eso es mi deporte.',
    conversaReligionPolitica: 'Evito ambos.',
  })

  demoGuardarPerfilProfundo(pablo.uid, {
    tragoFavorito: 'Cerveza artesanal',
    marcaCigarro: 'No soy fumador',
    estadoAnimo: 'Bien, siempre con energía para la montaña.',
    momentoReciente: 'Hice la travesía de Torres del Paine en 5 días.',
    energiaSocial: 'Extrovertido',
    rolConversacion: 'Hablo y escucho por igual.',
    inquietoPasivo: 'Muy inquieto, me gusta la aventura.',
    temasGusta: ['Trekking', 'Montaña', 'Camping', 'Fotografía'],
    temasNoGusta: ['Política', 'Chismes'],
    temaFavorito: 'Trekking en la Patagonia',
    temaTabu: 'No me gusta hablar de trabajo en la montaña.',
    deporteHaceConversa: 'Hago trekking, ciclismo y escalada.',
    conversaReligionPolitica: 'No me interesan.',
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

  // Panoramas extra
  demoCrearPanorama(laura.uid, {
    actividad: 'Concierto indie en vivo',
    lugar: 'Bar La Cucaracha, Bellavista',
    fecha: '2026-08-12',
    hora: '21:00',
    presupuesto: '$15.000 (entrada + cerveza)',
    companiasPref: 'me_es_indistinto',
    entradaComprada: 'No necesita',
    descripcionGenerada: 'Laura quiere ir a un concierto indie el martes 12 de agosto en Bellavista. Busca compañía para compartir cerveza y buena música.',
  })

  demoCrearPanorama(danae.uid, {
    actividad: 'Fiesta electrónica',
    lugar: 'Club La Feria, Santiago Centro',
    fecha: '2026-08-16',
    hora: '23:00',
    presupuesto: '$20.000 (cover)',
    companiasPref: 'femenina',
    entradaComprada: 'No necesita',
    descripcionGenerada: 'Danae quiere ir a una fiesta electrónica el sábado 16 de agosto. Busca compañía femenina para bailar toda la noche.',
  })

  demoCrearPanorama(esteban.uid, {
    actividad: 'Partido de tenis y cerveza después',
    lugar: 'Canchas Parque Bustamante, Ñuñoa',
    fecha: '2026-08-10',
    hora: '10:00',
    presupuesto: '$10.000 (cancha + cervezas)',
    companiasPref: 'me_es_indistinto',
    entradaComprada: 'No aplica',
    descripcionGenerada: 'Esteban busca compañía para jugar tenis el domingo 10 de agosto y tomar cervezas después.',
  })

  demoCrearPanorama(gloria.uid, {
    actividad: 'Obra de teatro',
    lugar: 'Teatro Nacional Chileno, Santiago Centro',
    fecha: '2026-08-14',
    hora: '20:00',
    presupuesto: '$25.000 (entrada)',
    companiasPref: 'femenina',
    entradaComprada: 'No aún',
    descripcionGenerada: 'Gloria quiere ir a ver una obra de teatro el jueves 14 de agosto. Busca compañía femenina para ir juntas.',
  })

  demoCrearPanorama(irene.uid, {
    actividad: 'Yoga en el parque',
    lugar: 'Parque Forestal, Santiago Centro',
    fecha: '2026-08-11',
    hora: '08:00',
    presupuesto: 'Sin presupuesto (gratis)',
    companiasPref: 'femenina',
    entradaComprada: 'No aplica',
    descripcionGenerada: 'Irene busca compañía para yoga en el parque el lunes 11 de agosto. Trae tu mat y buena onda.',
  })

  demoCrearPanorama(tatiana.uid, {
    actividad: 'Clase de salsa y cerveza',
    lugar: 'Sala de Baile, Ñuñoa',
    fecha: '2026-08-13',
    hora: '21:00',
    presupuesto: '$15.000 (clase + cerveza)',
    companiasPref: 'femenina',
    entradaComprada: 'No aún',
    descripcionGenerada: 'Tatiana quiere ir a clase de salsa el miércoles 13 de agosto. Busca compañía femenina para bailar y tomar cerveza después.',
  })

  demoCrearPanorama(pablo.uid, {
    actividad: 'Trekking al Morado',
    lugar: 'Cajón del Maipo',
    fecha: '2026-08-17',
    hora: '06:00',
    presupuesto: '$15.000 (transporte + colación)',
    companiasPref: 'me_es_indistinto',
    entradaComprada: 'No aplica',
    descripcionGenerada: 'Pablo busca compañía para trekking al Morado el domingo 17 de agosto. Experiencia intermedia.',
  })

  demoCrearPanorama(renata.uid, {
    actividad: 'Brunch y paseo de perros',
    lugar: 'Barrio Italia, Ñuñoa',
    fecha: '2026-08-10',
    hora: '11:00',
    presupuesto: '$20.000 (brunch)',
    companiasPref: 'femenina',
    entradaComprada: 'No aplica',
    descripcionGenerada: 'Renata busca compañía femenina para brunch en Barrio Italia y pasear a sus perros después.',
  })

  log(`🎯 Creados 14 panoramas de prueba`)

  // ═══════════════════════════════════════════════════════════════
  // MATCHES MANUALES
  // ═══════════════════════════════════════════════════════════════

  demoActualizarMatch(panoChayanne.id, panoChayanne.matches[0].matchUserId, 'aceptado')
  demoActualizarMatch(panoPortugal.id, panoPortugal.matches[0].matchUserId, 'aceptado')
  demoActualizarMatch(panoPerro.id, panoPerro.matches[0].matchUserId, 'aceptado')
  demoActualizarMatch(panoTrekking.id, panoTrekking.matches[0].matchUserId, 'rechazado')

  log('🤝 Matches simulados actualizados')

  // ═══════════════════════════════════════════════════════════════
  // PANORAMAS CERRADOS
  // ═══════════════════════════════════════════════════════════════

  demoCerrarPanorama(panoChayanne.id)
  demoCerrarPanorama(panoTrekking.id)

  log('✅ Panoramas cerrados (completados)')

  // ═══════════════════════════════════════════════════════════════
  // EVALUACIONES
  // ═══════════════════════════════════════════════════════════════

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
