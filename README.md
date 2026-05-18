# Budgets - Digital Budget Generator

🌐 [Español](README.es.md)

A SPA built with **Angular 21** to generate digital service budgets (SEO, Ads, Web).

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Development server
pnpm start
# → http://localhost:4200

# Production build
pnpm build

# Run tests
pnpm test
```

## 🏗️ Architecture

```
src/app/
├── app.ts                     # Root shell + isHome() signal + RouterOutlet
├── app.html                   # Conditional template (home vs routed pages)
├── app.routes.ts              # Routes (lazy-loaded /budget/:id)
│
├── core/                      # Singleton services (business logic)
│   ├── config/
│   │   └── services.types.ts      # Types for service configuration
│   └── services/
│       ├── budget-factory.service.ts    # Budget factory + unique ID generation
│       ├── budget-history.service.ts    # localStorage persistence
│       ├── selection.service.ts         # Service selection state
│       ├── services-config.service.ts   # services.json loader
│       ├── pdf.service.ts               # PDF generation with jsPDF
│       └── share.service.ts             # Web Share API + clipboard
│
├── features/                  # Independent business modules
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
├── shared/                    # Reusable components
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
│   ├── icons/                 # 8 SVG icons as strings
│   │
│   └── utils/                 # Pure functions
│       ├── budget-filter.utils.ts    # Budget filtering
│       ├── budget-sort.utils.ts      # Budget sorting
│       └── budget.utils.ts           # Sub-cost formatting
│
└── models/                    # TypeScript interfaces
    └── budget.model.ts

public/
└── services.json              # Externalized service configuration
```

## 🛠️ Tech Stack

| Category        | Technology                               |
| --------------- | ---------------------------------------- |
| Framework       | Angular 21.2.0                           |
| State           | Signals (`signal`, `computed`, `effect`) |
| Input/Output    | `input()`, `output()` signals            |
| Control Flow    | `@if`, `@for`, `@empty`                  |
| Styling         | Tailwind CSS v4                          |
| Forms           | Reactive Forms                           |
| Routing         | Angular Router (lazy-loaded)             |
| Package Manager | pnpm                                     |
| Testing         | Vitest + jsdom                           |
| PDF             | jsPDF (lazy-loaded)                      |
| Formatting      | Prettier + prettier-plugin-tailwindcss   |

## 📊 Features

- **Service selector**: SEO (€300), Ads (€400), Web (€500 + configuration)
- **Web configuration**: Pages (1-10) and languages (1-5) with steppers
- **Real-time pricing**: Reactive updates with signals
- **Client form**: Reactive validation with error messages
- **History**: Search (name/email/phone), sorting (date/price/name), empty state
- **Budget detail**: Unique URL `/budget/:id` with full breakdown
- **PDF export**: Dynamic generation with jsPDF
- **Sharing**: Web Share API + clipboard fallback
- **Responsive**: Mobile-first with Tailwind
- **Accessible**: WCAG AA, focus-visible, aria-labels, role="checkbox", aria-pressed, keyboard navigation

## 🧪 Tests

**63 tests passing** across 12 spec files (54 unit + 9 integration).

```bash
pnpm test          # watch mode
pnpm test -- --run # single run
```

## 📋 Commands

| Command                        | Description            |
| ------------------------------ | ---------------------- |
| `pnpm start`                   | Development server     |
| `pnpm build`                   | Production build       |
| `pnpm watch`                   | Dev build with watch   |
| `pnpm test`                    | Tests in watch mode    |
| `pnpm test -- --run`           | Tests single run       |
| `ng generate component <name>` | Generate new component |

## ⚙️ Configuration

Services are externalized in `public/services.json` — no hardcoded labels. Any change to names, prices, or sub-costs is reflected automatically.

---

**Version:** 1.0.0  
**Angular:** 21.2.0  
**Package Manager:** pnpm  
**Tests:** 63/63 passing
