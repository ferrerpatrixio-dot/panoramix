# Mapa Conceptual — Onboarding Panoramix
## Objetivo: Capturar perfil completo en 5-7 minutos sin conversación infinita

---

## FLUJO DE REGISTRO (5 ETAPAS)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  1. DATOS BASE  │───▶│ 2. VIDA COTIDIANA│───▶│ 3. PREFERENCIAS │
│  (30 seg)       │    │  (2 min)         │    │  (2 min)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
┌─────────────────┐    ┌─────────────────┐             │
│ 5. VALIDACIÓN   │◀───│ 4. SEGURIDAD    │◀────────────┘
│    (1 min)      │    │    (1 min)      │
└─────────────────┘    └─────────────────┘
```

---

## ETAPA 1: DATOS BASE (Obligatorio — 30 seg)

| Campo | Tipo | Validación |
|-------|------|------------|
| Email | text | único, formato |
| Password | password | 8+ chars, 1 mayúscula |
| Nombre visible | text | 2-30 chars |
| Fecha nacimiento | date | mayor de 18 |
| Género | select | M/F/Otro/Prefiero no decir |
| Foto perfil | upload | opcional, blur hasta match |

> **Token-saver**: No preguntar "¿cómo te gusta que te llamen?". Usar el nombre del email como default.

---

## ETAPA 2: VIDA COTIDIANA (Pilar del matching — 2 min)

**Metodología**: Preguntar QUÉ HACE, no qué le gustaría hacer.

### 2A. Rutina laboral (selección múltiple)
- "Mi trabajo es:"
  - [ ] Presencial fijo
  - [ ] Híbrido (días flex)
  - [ ] Remoto 100%
  - [ ] Turnos rotativos
  - [ ] Freelance / independiente
  - [ ] Estudiante
  - [ ] Jubilado/a

### 2B. Fin de semana típico (máx 3 opciones)
- "El sábado pasado estuve:"
  - [ ] En casa descansando
  - [ ] Con familia / pareja
  - [ ] Con amigos (salida/casa)
  - [ ] Haciendo deporte
  - [ ] En un evento cultural
  - [ ] Trabajando / estudiando
  - [ ] Al aire libre (parque, playa, cerro)
  - [ ] No recuerdo / variado

### 2C. Después del trabajo (máx 2)
- "Hoy después del trabajo probablemente:"
  - [ ] Me quedo en casa
  - [ ] Salgo a comer/tomar algo
  - [ ] Hago ejercicio
  - [ ] Veo series/películas
  - [ ] Encuentro con amigos
  - [ ] Estudio / trabajo extra

> **Clave para matching**: Estas 3 respuestas definen el "ritmo de vida" para emparejar con compatibles.

---

## ETAPA 3: PREFERENCIAS DE PANORAMA (2 min)

### 3A. Qué NUNCA haría (filtro negativo clave)
- "Marcá todo lo que NO harías ni con buena compañía:"
  - [ ] Ir a un bar solo
  - [ ] Concierto de reggaeton/urbano
  - [ ] Trekking / actividad física intensa
  - [ ] Ir a comer solo/a
  - [ ] Evento familiar / baby shower
  - [ ] Ir a bailar
  - [ ] Ir al cine
  - [ ] Ir a un partido de fútbol
  - [ ] Actividad religiosa
  - [ ] Ir de compras

> **Lógica de match**: Si ambos NO marcaron algo, es candidato de panorama compartido.

### 3B. Presupuesto mensual para salidas
- "En salidas/eventos gasto aprox:"
  - [ ] $0 (gratuitos solo)
  - [ ] $10.000 - $30.000
  - [ ] $30.000 - $60.000
  - [ ] $60.000 - $100.000
  - [ ] $100.000+ (no miro precio)

### 3C. Compañía preferida
- "Para un panorama busco:"
  - [ ] Compañía femenina
  - [ ] Compañía masculina
  - [ ] Me es indiferente

### 3D. Horario preferido
- "Suelo estar disponible:"
  - [ ] Mañanas (08-13h)
  - [ ] Almuerzo (13-16h)
  - [ ] Tardes (16-20h)
  - [ ] Noches (20-00h)
  - [ ] Madrugada (00-04h)
  - [ ] Fines de semana
  - [ ] Días de semana

---

## ETAPA 4: SEGURIDAD (Obligatorio — 1 min)

| Campo | Tipo | Nota |
|-------|------|------|
| Contacto emergencia 1 | nombre + teléfono | SMS de verificación |
| Contacto emergencia 2 | nombre + teléfono | opcional |
| Relación contacto | select | familiar/amigo/pareja |

> **Validación**: Enviar SMS de prueba al contacto: "[Nombre] te registró como contacto de seguridad en Panoramix."

---

## ETAPA 5: VALIDACIÓN DE IDENTIDAD (1 min)

**Opciones (proveedor externo)**:
1. **RUT Chile** — validación contra Servel/Registro Civil
2. **Cédula foto + selfie** — reconocimiento facial básico
3. **Email verificado + teléfono** — nivel básico (plan free)

| Plan | Nivel validación | Badge |
|------|------------------|-------|
| Free | Email + teléfono | ⚪ Gris |
| Plus | RUT validado | 🟡 Amarillo |
| Pro | Foto + selfie | 🟢 Verde |

---

## PERFIL PROFUNDO (Post-onboarding, opcional)

Preguntas que NO van en el registro inicial para no abrumar:

### Hábitos sociales (discretas)
- "¿Qué tomás cuando salís?" → detecta alcohol/socialización
- "¿Fumás?" → con opción "No, y prefiero no estar cerca de humo"
- "¿Hablás más de lo que escuchás o viceversa?"
- "¿Te energizan las multitudes o te agotan?"

### Temas de conversación
- "¿De qué podés hablar horas?" (libre)
- "¿Qué tema preferís evitar?" (libre)
- "¿Te gusta discutir de política/religión?" → Sí / Solo con conocidos / No

---

## SISTEMA DE TAGS (Para matching automático)

Cada usuario recibe tags calculados del onboarding:

| Tag | Origen | Uso en match |
|-----|--------|--------------|
| `ritmo: tranquilo` / `ritmo: activo` | 2B + 2C | Match con mismo ritmo |
| `presupuesto: X` | 3B | Filtrar panoramas por rango |
| `horario: noches` | 3D | Priorizar panoramas en ese horario |
| `evita: X,Y,Z` | 3A | Excluir panoramas de esas categorías |
| `validado: nivel` | Etapa 5 | Confianza / visibilidad |

---

## OPTIMIZACIÓN DE TOKENS

### Lo que NO preguntamos (ahorro de tokens):
- ❌ "¿Cuáles son tus hobbies?" → muy abierto, respuestas genéricas
- ❌ "¿Qué música te gusta?" → no predice comportamiento
- ❌ "¿Eres extrovertido?" → auto-percepción sesgada

### Lo que SÍ preguntamos (comportamiento real):
- ✅ "¿Qué hiciste el último sábado?" → comportamiento real
- ✅ "¿Qué NO harías?" → límites claros para matching
- ✅ "¿A qué hora salís?" → disponibilidad real

---

## DASHBOARD POST-REGISTRO

Al completar el onboarding, el usuario ve:

```
┌─────────────────────────────────────┐
│  ¡Bienvenido/a, [Nombre]!           │
│  Tu perfil está un 70% completo     │
│                                     │
│  [Completar perfil profundo] →      │
│  [Ver panoramas disponibles] →      │
│  [Crear mi primer panorama] →       │
└─────────────────────────────────────┘
```

> **Regla**: El usuario puede crear/ver panoramas con el 70% base. El perfil profundo mejora el matching pero no bloquea.

---

## IMPLEMENTACIÓN TÉCNICA

- **Frontend**: Formulario multipaso con progress bar (5 pasos)
- **Validación**: Cliente + servidor en cada paso
- **Backend**: Guardar parcialmente después de cada etapa (por si abandona)
- **Analytics**: Trackear dónde abandonan para optimizar

---

*Documento v1.0 — Panoramix Onboarding*
