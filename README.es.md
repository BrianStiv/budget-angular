# Budgets - Generador Digital de Presupuestos

🌐 [English](README.md)

Aplicación SPA en **Angular 21** para generar presupuestos de servicios digitales (SEO, Ads, Web).

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm start
# → http://localhost:4200

# Build de producción
pnpm build

# Ejecutar tests
pnpm test
```

## 🏗️ Arquitectura

```
src/app/
├── app.ts                     # Root shell + señal isHome() + RouterOutlet
├── app.html                   # Template condicional (home vs rutas)
├── app.routes.ts              # Rutas (lazy-loaded /budget/:id)
│
├── core/                      # Servicios singleton (lógica de negocio)
│   ├── config/
│   │   └── services.types.ts      # Tipos para la configuración
│   └── services/
│       ├── budget-factory.service.ts    # Fábrica de Budgets + ID único
│       ├── budget-history.service.ts    # Persistencia localStorage
│       ├── selection.service.ts         # Estado de selección de servicios
│       ├── services-config.service.ts   # Carga de services.json
│       ├── pdf.service.ts               # Generación PDF con jsPDF
│       └── share.service.ts             # Web Share API + clipboard
│
├── features/                  # Módulos de negocio independientes
│   ├── budget-builder/
│   │   ├── banner/
│   │   │   ├── banner.component.ts
│   │   │   └── banner.component.html
│   │   └── service-card/
│   │       ├── service-card.component.ts
│   │       └── service-card.component.html
│   │
│   ├── budget-detail/
│   │   ├── budget-detail.component.ts
│   │   └── budget-detail.component.html
│   │
│   ├── client-submission/
│   │   └── client-form/
│   │       ├── client-form.component.ts
│   │       └── client-form.component.html
│   │
│   └── budget-history/
│       ├── budget-history.component.ts
│       └── budget-history.component.html
│
├── shared/                    # Componentes reutilizables
│   ├── components/
│   │   ├── svg-icon/
│   │   │   └── svg-icon.component.ts
│   │   ├── total-display/
│   │   │   ├── total-display.component.ts
│   │   │   └── total-display.component.html
│   │   ├── number-stepper/
│   │   │   ├── number-stepper.component.ts
│   │   │   └── number-stepper.component.html
│   │   └── sort-button/
│   │       ├── sort-button.component.ts
│   │       └── sort-button.component.html
│   │
│   ├── icons/                 # 8 iconos SVG como strings
│   │
│   └── utils/                 # Funciones puras
│       ├── budget-filter.utils.ts    # Filtrado de presupuestos
│       ├── budget-sort.utils.ts      # Ordenación de presupuestos
│       └── budget.utils.ts           # Formato de sub-costos
│
└── models/                    # Interfaces TypeScript
    └── budget.model.ts

public/
└── services.json              # Configuración externalizada de servicios
```

## 🛠️ Stack Tecnológico

| Categoría        | Tecnología                               |
| ---------------- | ---------------------------------------- |
| Framework        | Angular 21.2.0                           |
| Estado           | Signals (`signal`, `computed`, `effect`) |
| Input/Output     | `input()`, `output()` signals            |
| Control de Flujo | `@if`, `@for`, `@empty`                  |
| Estilos          | Tailwind CSS v4                          |
| Formularios      | Reactive Forms                           |
| Routing          | Angular Router (lazy-loaded)             |
| Package Manager  | pnpm                                     |
| Testing          | Vitest + jsdom                           |
| PDF              | jsPDF (carga diferida)                   |
| Formateo         | Prettier + prettier-plugin-tailwindcss   |

## 📊 Funcionalidades

- **Selector de servicios**: SEO (300€), Ads (400€), Web (500€ + configuración)
- **Configuración Web**: Páginas (1-10) e idiomas (1-5) con steppers
- **Precio en tiempo real**: Actualización reactiva con signals
- **Formulario de cliente**: Validación reactiva con mensajes de error
- **Historial**: Búsqueda (nombre/email/teléfono), ordenación (fecha/importe/nombre), estado vacío
- **Detalle de presupuesto**: URL única `/budget/:id` con desglose completo
- **Exportar PDF**: Generación dinámica con jsPDF
- **Compartir**: Web Share API + fallback clipboard
- **Responsive**: Mobile-first con Tailwind
- **Accesible**: WCAG AA, focus-visible, aria-labels, role="checkbox", aria-pressed, navegación por teclado

## 🧪 Tests

**63 tests passing** en 12 archivos spec (54 unitarios + 9 integración).

```bash
pnpm test          # modo watch
pnpm test -- --run # ejecución única
```

## 📋 Comandos

| Comando                        | Descripción              |
| ------------------------------ | ------------------------ |
| `pnpm start`                   | Servidor de desarrollo   |
| `pnpm build`                   | Build de producción      |
| `pnpm watch`                   | Dev build con watch      |
| `pnpm test`                    | Tests en modo watch      |
| `pnpm test -- --run`           | Tests una sola vez       |
| `ng generate component <name>` | Generar nuevo componente |

## ⚙️ Configuración

Los servicios se configuran de forma externalizada en `public/services.json`. No hay etiquetas hardcodeadas — cualquier cambio de nombre, precio o sub-costos se refleja automáticamente.

---

**Versión:** 1.0.0  
**Angular:** 21.2.0  
**Package Manager:** pnpm  
**Tests:** 63/63 passing
