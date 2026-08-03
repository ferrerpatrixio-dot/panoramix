# TODO — Estado de Pendientes

> Lista de tareas pendientes, en progreso y completadas.  
> **Actualizado:** 2026-08-02

---

## ✅ Completado (Done)

- [x] Crear servicio backend-demo con localStorage (`demoBackend.ts`)
- [x] Actualizar AuthContext para modo demo
- [x] Actualizar Perfil para guardar en demo
- [x] Actualizar PerfilProfundo para guardar en demo
- [x] Crear página Mis Panoramas (dashboard)
- [x] Actualizar CrearPanorama para guardar en demo
- [x] Build y deploy modo demo en Vercel
- [x] Crear página Eventos en RM con productoras
- [x] Agregar botón SOS con contacto de emergencia
- [x] Crear evaluación post-panorama (reputación)
- [x] Build y deploy con nuevas features
- [x] Crear consola de administrador (/admin)
- [x] Crear términos y condiciones + políticas de uso
- [x] Fix imports duplicados Admin.tsx y redeploy
- [x] Crear seed data con casos de uso reales (8 usuarios)
- [x] Agregar botón visible para resetear datos de demo
- [x] Proteger /admin solo para admin@panoramix.com
- [x] Mostrar enlace admin condicional en navbar/footer
- [x] Conectar demo chat onboarding desde home
- [x] Agregar ~20 perfiles extra al seed (total 29 usuarios)
- [x] Generar documentación de proyecto para traspaso entre LLM

---

## 🚧 En Progreso (In Progress)

- [ ] Nada en este momento

---

## 📋 Pendiente (Pending)

### Alta Prioridad
- [ ] Migrar backend de localStorage a Firebase (Auth + Firestore)
- [ ] Implementar plan Plus con límites reales ($4.990/mes)
- [ ] Agregar avatares/fotos de perfil
- [ ] Chat real entre matches (no simulado)
- [ ] Integrar OpenAI con keys reales (dual-key fallback ya está)

### Media Prioridad
- [ ] Geolocalización real para matches por proximidad
- [ ] Integrar validación de identidad (proveedor externo)
- [ ] Botón SOS funcional (Twilio SMS/WhatsApp)
- [ ] SEO: meta tags, sitemap, robots.txt
- [ ] Google Ads / Meta Ads (pixels de tracking)
- [ ] Cron de scraping de eventos desde productoras (Passline, Puntoticket, etc.)
- [ ] Notificaciones push / email
- [ ] Dashboard de analytics para admin

### Baja Prioridad
- [ ] App móvil (React Native o PWA)
- [ ] Modo oscuro / temas
- [ ] Internacionalización (i18n)
- [ ] Test unitarios y E2E
- [ ] CI/CD automatizado (GitHub Actions)

---

## 🐛 Bugs Conocidos

- [ ] Chat onboarding puede fallar si las API keys de OpenAI expiran
- [ ] Seed data se carga solo en navegador nuevo (localStorage limpio)
- [ ] Los matches son simulados aleatoriamente, no basados en compatibilidad real
- [ ] No hay persistencia de sesión entre navegadores
- [ ] La app no funciona offline

---

*Mover ítems de Pending → In Progress → Done según avance.*
