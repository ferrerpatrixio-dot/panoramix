# CHANGELOG — Panoramix

> Registro de cambios ordenado cronológicamente.  
> Formato: `v{MAJOR}.{MINOR}-{fase}`

---

## v0.1-demo — Landing inicial
- Landing page con hero, features, precios, footer
- Sección "Cómo funciona" con 3 pasos
- Mockup de card de match interactivo

## v0.2-demo — Auth + Perfil básico
- Registro/login simulado con localStorage
- Página de perfil básico (comportamiento, gustos, comunas)
- Página de perfil profundo (hábitos discretos, estado emocional)
- Chat onboarding con OpenAI (Panxi) para extraer perfil
- Botón SOS flotante con contactos de emergencia

## v0.3-demo — Panoramas + Matches
- Crear panorama con formulario completo
- Mis Panoramas (dashboard con matches simulados)
- Matches con compatibilidad porcentual
- Aceptar/rechazar match
- Seed data con 8 usuarios y 4 panoramas

## v0.4-demo — Evaluaciones + Admin
- Evaluación post-panorama (1-5 estrellas)
- Sistema de reputación por usuario
- Consola de administrador (/admin)
- Términos y condiciones + políticas de uso
- Página de eventos en RM (productoras)

## v0.5-demo — Seed expandido + Seguridad
- **+20 perfiles adicionales** (total: 29 usuarios)
- **+10 panoramas adicionales** (total: 14)
- Admin protegido: solo `admin@panoramix.com`
- Botón "Reset Demo" solo visible para admin
- Enlace "Conoce a Panxi" en navbar y footer
- Ruta /admin protegida con AdminRoute

---

## Próximas versiones planificadas

### v0.6-demo — Onboarding mejorado
- [ ] Demo funcional del chat onboarding (actualmente usa API keys)
- [ ] Página de "Mapa del onboarding" interactiva
- [ ] Wizard paso a paso para nuevos usuarios

### v1.0-beta — Firebase real
- [ ] Migrar localStorage → Firebase Auth + Firestore
- [ ] Imágenes de perfil (avatar)
- [ ] Chat real entre matches
- [ ] Notificaciones push

### v1.1-beta — Monetización
- [ ] Stripe para plan Plus ($4.990/mes)
- [ ] Límites free funcionales (1 panorama, 3 matches)
- [ ] Badge Plus en perfil

### v1.2-beta — Seguridad avanzada
- [ ] Validación de identidad (integración proveedor)
- [ ] Botón SOS real (SMS/Twilio)
- [ ] Geofence + alerta de salida de zona

---

*Cada commit en GitHub debe referenciar la versión correspondiente.*
