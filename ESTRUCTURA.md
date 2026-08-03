# ESTRUCTURA DE ARCHIVOS — Panoramix

> Mapa completo del proyecto para que cualquier LLM sepa dónde está todo.  
> **Actualizado:** 2026-08-02

---

## Árbol de Directorios

```
prototipo-web/panoramix-landing/
├── public/                    # Assets estáticos (favicon, imágenes)
├── src/
│   ├── components/            # Componentes React
│   │   ├── ui/               # shadcn/ui — 50+ componentes base
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ... (todos los de shadcn)
│   │   ├── AdminRoute.tsx     # Guard de ruta /admin (solo admin)
│   │   ├── DemoResetButton.tsx # Botón flotante reset (solo admin)
│   │   └── SosButton.tsx      # Botón SOS flotante (toda la app)
│   │
│   ├── contexts/              # Contextos de React
│   │   └── AuthContext.tsx    # Auth global + flag isAdmin
│   │
│   ├── hooks/                 # Custom hooks
│   │   └── use-mobile.ts      # Detecta si es móvil
│   │
│   ├── lib/                   # Utilidades
│   │   └── utils.ts           # cn() de Tailwind + helpers
│   │
│   ├── pages/                 # Páginas/rutas de la app
│   │   ├── Home.tsx           # Landing principal
│   │   ├── BusinessModel.tsx  # Resumen modelo de negocio (interno)
│   │   ├── ChatOnboarding.tsx # Demo chat con Panxi (IA)
│   │   ├── MapaOnboarding.tsx # Mapa visual del flujo de onboarding
│   │   ├── Perfil.tsx         # Perfil básico (comportamiento)
│   │   ├── PerfilProfundo.tsx # Perfil profundo (hábitos, estado emocional)
│   │   ├── CrearPanorama.tsx  # Formulario para crear panorama
│   │   ├── MisPanoramas.tsx   # Dashboard de panoramas del usuario
│   │   ├── Evaluacion.tsx     # Formulario post-panorama (reputación)
│   │   ├── EventosRM.tsx      # Eventos en Santiago (productoras)
│   │   ├── Admin.tsx          # Consola de administración
│   │   └── Terminos.tsx       # Términos, condiciones y políticas
│   │
│   ├── services/              # Lógica de negocio / APIs
│   │   ├── demoBackend.ts     # Backend simulado (localStorage)
│   │   ├── demoSeed.ts        # Datos de prueba (28 usuarios + admin)
│   │   ├── firebase.ts        # Config Firebase (no activo en demo)
│   │   └── openai.ts          # Integración OpenAI (chat Panxi)
│   │
│   ├── App.tsx                # Router principal + layout global
│   ├── main.tsx               # Entry point (monta React + ejecuta seed)
│   ├── App.css                # Estilos globales (mínimos)
│   └── index.css              # Tailwind + CSS variables
│
├── index.html                 # HTML entry point
├── vite.config.ts             # Config de Vite (paths @/)
├── tsconfig.json              # TypeScript
├── tailwind.config.ts         # Config de Tailwind
├── components.json            # Config de shadcn/ui
├── package.json               # Dependencias
├── vercel.json                # Config de deploy en Vercel
│
├── README.md                  # Contexto general del proyecto
├── CHANGELOG.md               # Historial de cambios
├── TODO.md                    # Estado de pendientes
└── MODELO_NEGOCIO.md          # Documento interno de monetización
```

---

## Descripción de Archivos Clave

### `src/services/demoBackend.ts`
**El "backend" completo en modo demo.**  
Contiene:
- Tipos: `DemoUser`, `DemoPerfil`, `DemoPanorama`, `DemoMatch`, `DemoEvaluacion`, `DemoReclamo`
- Funciones de auth: `demoRegistrar`, `demoLogin`, `demoGetSession`, `demoLogout`
- CRUD de perfiles, panoramas, contactos, evaluaciones, reclamos
- Funciones de admin: `demoListarUsuarios`, `demoDesactivarUsuario`, etc.

> ⚠️ **IMPORTANTE:** Cuando se migre a Firebase, este archivo se reemplaza por llamadas a la API real. Las páginas NO deben depender de la implementación localStorage.

### `src/services/demoSeed.ts`
Carga 29 usuarios, 14 panoramas, 3 evaluaciones y 1 reclamo al localStorage.  
Se ejecuta automáticamente en `main.tsx` si no existe la flag `demo_seeded_v2`.

### `src/contexts/AuthContext.tsx`
Provee:
- `user`: DemoUser | null
- `isAdmin`: boolean (true si email === 'admin@panoramix.com')
- `login`, `register`, `logout`

### `src/App.tsx`
Router con todas las rutas. Protege `/admin` con `<AdminRoute>`.

### `src/components/AdminRoute.tsx`
Redirect a `/` si el usuario no es admin.

### `src/components/DemoResetButton.tsx`
Solo renderiza si `isAdmin === true`. Al tocar dos veces, limpia localStorage y recarga.

### `src/services/openai.ts`
Integración con OpenAI para el chat onboarding (Panxi).  
Usa **dual-key fallback** (toma la primera key que funcione).

---

## Convenciones de Código

| Regla | Descripción |
|---|---|
| **Alias `@/`** | Todo import usa `@/` que apunta a `src/` (configurado en `vite.config.ts` y `tsconfig.json`) |
| **shadcn/ui** | Componentes UI van en `src/components/ui/`. No editar directamente a menos que sea necesario. |
| **Páginas** | Cada ruta tiene su archivo en `src/pages/`. El nombre coincide con la ruta. |
| **Servicios** | Lógica de negocio va en `src/services/`. Nunca en componentes. |
| **Estilos** | Tailwind + variables CSS. No usar CSS modules ni styled-components. |

---

*Actualizar este archivo si se agrega un nuevo directorio o se mueve algo importante.*
