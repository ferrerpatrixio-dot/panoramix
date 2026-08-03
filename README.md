# Panoramix — Contexto del Proyecto

> Documento maestro para traspaso de contexto entre LLM.  
> **Última actualización:** 2026-08-02  
> **Versión:** v1.0-demo

---

## 1. Qué es Panoramix

**Panoramix** es una plataforma web (y futura app móvil) que conecta a personas que quieren hacer actividades juntas —pero **no buscan pareja, citas ni encuentros casuales**.

> *"No busques pareja. Busca compañía."*

### Ejemplos de uso
- Carla compró entradas para Chayanne pero está sola y le da susto ir sola → crea un "panorama" y encuentra compañía compatible.
- Andrés, separado de 45 años, quiere compañía para pasear al perro en el Parque Bicentenario.
- Valentina quiere ir a bailar salsa a Sala Portugal pero sus amigas no pueden.

### Diferenciador clave
No preguntamos qué te gustaría hacer (como Tinder), preguntamos **qué hiciste el último fin de semana** — comportamiento real, no deseos.

---

## 2. Estado Actual (Demo / Fase 0)

| Área | Estado |
|---|---|
| Frontend web | ✅ Funcionando en Vercel |
| Backend | ✅ Simulado con localStorage (modo demo) |
| Auth | ✅ Registro/login con email/pass en localStorage |
| Perfiles | ✅ Básico + Profundo + Chat onboarding con IA |
| Panoramas | ✅ Crear, listar, matches simulados |
| Admin | ✅ Consola protegida por admin@panoramix.com |
| SOS | ✅ Botón flotante + contactos de emergencia |
| Evaluaciones | ✅ Post-panorama con reputación |
| Términos | ✅ Página de T&C + políticas de uso |
| Seed data | ✅ 29 usuarios, 14 panoramas, evaluaciones |
| SEO/GEO | ⚠️ Pendiente implementación real |
| Monetización | ⚠️ Solo plan free simulado |
| App móvil | ⚠️ No iniciado |

### URL Producción
```
https://panoramix-landing.vercel.app
```

### Repo GitHub
```
https://github.com/ferrerpatrixio-dot/panoramix
```

---

## 3. Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + TypeScript |
| Estilos | Tailwind CSS 3 + shadcn/ui |
| Routing | react-router v7 |
| Build | Vite 7 |
| Deploy | Vercel |
| Backend (demo) | localStorage (simulación) |
| Backend (futuro) | Firebase (Auth + Firestore) |
| IA / Chat | OpenAI API (GPT-4) con dual-key fallback |
| Gráficos | recharts (si aplica) |

---

## 4. Arquitectura Demo (Fase 0)

```
┌─────────────────────────────────────────┐
│  React App (Vite)                       │
│  ├─ AuthContext → demoBackend.ts        │
│  ├─ Perfil → demoBackend.ts             │
│  ├─ Panoramas → demoBackend.ts          │
│  └─ ChatOnboarding → openai.ts          │
├─────────────────────────────────────────┤
│  localStorage ("base de datos" demo)    │
│  ├─ demo_users                          │
│  ├─ demo_session                        │
│  ├─ demo_perfiles                       │
│  ├─ demo_perfiles_profundos             │
│  ├─ demo_panoramas                      │
│  ├─ demo_contactos                      │
│  ├─ demo_evaluaciones                   │
│  └─ demo_reclamos                       │
└─────────────────────────────────────────┘
```

**Nota:** Todo el backend está en `src/services/demoBackend.ts`. Cuando se migre a producción real, ese archivo se reemplaza por llamadas a Firebase/API.

---

## 5. Usuario Admin

Para acceder a la consola de administración:

| Campo | Valor |
|---|---|
| Email | `admin@panoramix.com` |
| Password | `2024` |
| URL | `/admin` |

El botón "Reset Demo" (esquina inferior izquierda) solo aparece cuando estás logueado como admin.

---

## 6. Flujo Principal de la App

```
1. Home (landing) → Registro/Login
2. Chat Onboarding (Panxi) → Extrae perfil vía IA
3. Perfil Básico → Preguntas de comportamiento
4. Perfil Profundo → Hábitos, estado emocional, temas
5. Contactos SOS → 2 contactos de emergencia (obligatorio)
6. Crear Panorama → Qué, dónde, cuándo, presupuesto
7. Mis Panoramas → Ver matches, aceptar/rechazar
8. Post-panorama → Evaluar al compañero (reputación)
9. Admin → Gestión de usuarios, evaluaciones, reclamos
```

---

## 7. Datos de Prueba (Seed)

Al cargar la app por primera vez, se ejecuta `demoSeedIfEmpty()` en `main.tsx`.

**Usuarios precargados:** 29 (28 + admin)  
**Panoramas precargados:** 14  
**Evaluaciones:** 3 (2 positivas + 1 negativa)  
**Reclamos:** 1 (pendiente en bandeja admin)

Para resetear: botón "Reset Demo" (solo admin) o borrar localStorage.

---

## 8. Reglas de Negocio Clave

1. **NO es app de citas** — esto está en el copy, T&C y onboarding.
2. **Lugar público siempre** — el sistema recomienda puntos de encuentro públicos.
3. **Llegar por separado** — cada uno va solo al punto de encuentro.
4. **Validación de identidad** — en producción, foto de cédula + selfie.
5. **Botón SOS** — 2 contactos obligatorios, envía alerta.
6. **Reputación** — evaluaciones post-panorama, sin reputación no hay match.
7. **Contacto de emergencia obligatorio** — sin ellos no se puede crear panorama.
8. **Admin puede desactivar usuarios** — por malas evaluaciones o reclamos.
9. **Match por compatibilidad** — no por apariencia física.
10. **Plan free con límites** — 1 panorama activo, 3 matches/mes.

---

## 9. Próximos Pasos Prioritarios (Fase 1)

| # | Tarea | Prioridad |
|---|---|---|
| 1 | Migrar backend de localStorage a Firebase | 🔴 Alta |
| 2 | Implementar plan Plus ($4.990/mes) | 🔴 Alta |
| 3 | Agregar geolocalización real en matches | 🟡 Media |
| 4 | Integrar validación de identidad (proveedor externo) | 🟡 Media |
| 5 | Botón SOS funcional (SMS/WhatsApp real) | 🟡 Media |
| 6 | SEO y GEO (Google My Business, ads) | 🟡 Media |
| 7 | App móvil (React Native o PWA) | 🟢 Baja |
| 8 | Cron de eventos (scraping de productoras) | 🟢 Baja |
| 9 | Dashboard de analytics para admin | 🟢 Baja |

---

## 10. Contacto del Proyecto

| Rol | Valor |
|---|---|
| Email general | hola@panoramix.cl |
| Email legal | legal@panoramix.cl |
| Admin login | admin@panoramix.com / 2024 |
| Repo | https://github.com/ferrerpatrixio-dot/panoramix |
| Producción | https://panoramix-landing.vercel.app |

---

*Este documento debe actualizarse cada vez que se agregue una funcionalidad significativa o se cambie la arquitectura.*
