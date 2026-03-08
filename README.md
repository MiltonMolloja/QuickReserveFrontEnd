# QuickReserve Frontend

Angular 20 application for booking workshop appointments. Built with **Clean Architecture**, **Tailwind CSS v4**, **Zoneless Change Detection**, and full **i18n** support (ES/EN).

> Technical challenge for **Tecnom** - Consumes a .NET backend API.

> **Important**: The full project analysis document — covering architecture decisions, phase-by-phase implementation plan, UI/UX specifications, and technical constraints — is available here:
> **[QuickReserve Frontend Analysis](https://github.com/MiltonMolloja/QuickReserveFrontEnd/blob/master/docsDise%C3%B1o/QuickReserve-Frontend-Analisis.md)**

---

## Design Preview

### Light Theme

<p align="center">
  <img width="480" alt="Appointments List - Light" src="https://github.com/user-attachments/assets/3ee51fa5-d17a-443d-a6df-3a7e41e6aa6e" />
</p>

<p align="center">
  <img width="480" alt="New Appointment Step 1 - Light" src="https://github.com/user-attachments/assets/acf9bf48-10b2-403d-a932-ae779c0dcc9a" />
</p>

<p align="center">
  <img width="480" alt="New Appointment Step 2 - Light" src="https://github.com/user-attachments/assets/04216c38-47fb-4cfc-9417-4cf2c4c9b253" />
</p>

<p align="center">
  <img width="480" alt="New Appointment Step 3 - Light" src="https://github.com/user-attachments/assets/45c9c886-074c-4e53-a4f7-4801c4651047" />
</p>

<p align="center">
  <img width="480" alt="Appointment Success - Light" src="https://github.com/user-attachments/assets/2277db40-d5e5-408b-904c-e1fb6fbe7a62" />
</p>

<p align="center">
  <img width="480" alt="Appointment Error - Light" src="https://github.com/user-attachments/assets/e30c82b9-5850-43d7-92b7-7e0b2159ebcf" />
</p>

### Dark Theme

<p align="center">
  <img width="480" alt="Appointments List - Dark" src="https://github.com/user-attachments/assets/7b44a68e-5b3e-40d5-a8ce-72a0a1429a0e" />
</p>

<p align="center">
  <img width="480" alt="New Appointment Step 1 - Dark" src="https://github.com/user-attachments/assets/f6819c21-55fc-4b23-bb1c-52b5e7ac84a6" />
</p>

<p align="center">
  <img width="480" alt="New Appointment Step 2 - Dark" src="https://github.com/user-attachments/assets/45be09cf-139c-41b2-b08c-7b0e561a64c7" />
</p>

<p align="center">
  <img width="480" alt="New Appointment Step 3 - Dark" src="https://github.com/user-attachments/assets/9649c3f5-9760-4a16-b2ce-d8d21a6da546" />
</p>

<p align="center">
  <img width="480" alt="Appointment Success - Dark" src="https://github.com/user-attachments/assets/7ae63b15-a011-4f6c-920e-aba73112d22d" />
</p>

<p align="center">
  <img width="480" alt="Appointment Error - Dark" src="https://github.com/user-attachments/assets/d731e862-afcf-4f86-9bb0-034536e700f0" />
</p>

> **More designs** (mobile, components, date/time pickers): [Design Issue #1](https://github.com/MiltonMolloja/QuickReserveFrontEnd/issues/1)

---

## Tech Stack

| Category         | Technology                                     |
| ---------------- | ---------------------------------------------- |
| Framework        | Angular 20 (Standalone Components, Signals)    |
| Styling          | Tailwind CSS v4 (`@theme` directive)           |
| Icons            | Lucide Angular (tree-shakeable)                |
| i18n             | ngx-translate v17 (runtime language switching) |
| State Management | Angular Signals                                |
| HTTP             | Angular HttpClient + RxJS                      |
| Testing          | Jest 30 + jest-preset-angular                  |
| Linting          | ESLint 9 (flat config, strictTypeChecked)      |
| Formatting       | Prettier                                       |
| Git Hooks        | Husky + lint-staged                            |
| Documentation    | Compodoc                                       |
| Quality Gate     | SonarQube                                      |
| Change Detection | Zoneless (no Zone.js overhead)                 |

---

## Architecture

The project follows **Clean Architecture** with 4 layers and strict dependency inversion:

```
src/app/
├── domain/                    # Pure business logic (no framework deps)
│   ├── models/                # Appointment, Contact, Vehicle, Workshop, DTOs
│   ├── enums/                 # ServiceType, Theme
│   ├── ports/                 # Abstract classes (AppointmentPort, WorkshopPort, StoragePort)
│   └── validators/            # Pure validation functions
│
├── application/               # Use cases & state (depends only on domain)
│   ├── use-cases/             # GetAppointments, CreateAppointment, FilterAppointments, GetWorkshops
│   ├── state/                 # Signal-based stores (AppointmentsState, WorkshopsState, ThemeState)
│   └── mappers/               # API DTO <-> Domain model mappers (snake_case <-> camelCase)
│
├── infrastructure/            # External implementations (depends on domain + application)
│   ├── http/                  # HTTP adapters implementing ports, interceptors (apiUrl, error)
│   ├── storage/               # LocalStorageAdapter implementing StoragePort
│   ├── theme/                 # ThemeAdapter (dark mode via class strategy)
│   └── i18n/                  # ngx-translate configuration
│
└── presentation/              # UI layer (depends on application)
    ├── shared/                # Reusable components (Navbar, StatCard, LoadingButton, etc.)
    │   ├── components/        # 10 shared components
    │   └── types/             # LucideIconData type workaround
    └── features/              # Feature pages (lazy-loaded)
        ├── appointments/      # List page with filters, stats, @defer grid
        ├── new-appointment/   # 3-step stepper (Service, Contact, Vehicle)
        ├── appointment-success/ # Confirmation page with summary
        └── appointment-error/ # Error page with details and suggestions
```

### Design Patterns

- **Container-Presentational**: Smart components inject use cases, dumb components receive data via `input()`
- **Ports & Adapters**: Domain defines abstract ports, infrastructure provides concrete implementations
- **Signal-based State**: Reactive state management without RxJS subscriptions for UI state
- **Mapper Pattern**: Clean separation between API DTOs (snake_case) and domain models (camelCase)

---

## Prerequisites

- **Node.js** >= 22.x
- **npm** >= 10.x
- **Angular CLI** >= 20.x (`npm install -g @angular/cli`)

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/MiltonMolloja/QuickReserveFrontEnd.git
cd QuickReserveFrontEnd

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Backend API

The app expects a .NET backend running at the URL configured in `src/environments/environment.ts`. The `apiUrlInterceptor` prepends this base URL to all API requests.

### Docker

Run the frontend in a container with **Nginx** serving the production build:

```bash
# Build the image
docker build -t quick-reserve-frontend .

# Run the container (backend on host machine)
docker run -d -p 4200:80 quick-reserve-frontend

# Run with custom backend URL
docker run -d -p 4200:80 -e API_URL=http://my-backend:5000 quick-reserve-frontend
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

| Variable  | Default                            | Description          |
| --------- | ---------------------------------- | -------------------- |
| `API_URL` | `http://host.docker.internal:5000` | Backend API base URL |

> The image uses a **multi-stage build** (Node 22 → Nginx Alpine) resulting in a ~30 MB final image. Nginx handles gzip compression, static asset caching, SPA routing fallback, and reverse proxy to the backend API.

---

## Available Scripts

| Script                  | Command                       | Description                               |
| ----------------------- | ----------------------------- | ----------------------------------------- |
| `npm start`             | `ng serve`                    | Start dev server at localhost:4200        |
| `npm run build`         | `ng build`                    | Production build to `dist/`               |
| `npm test`              | `jest`                        | Run all unit tests                        |
| `npm run test:watch`    | `jest --watch`                | Run tests in watch mode                   |
| `npm run test:coverage` | `jest --coverage`             | Run tests with coverage report            |
| `npm run lint`          | `eslint "src/**/*.{ts,html}"` | Lint TypeScript and HTML files            |
| `npm run lint:fix`      | `eslint ... --fix`            | Auto-fix lint errors                      |
| `npm run format`        | `prettier --write ...`        | Format all source files                   |
| `npm run format:check`  | `prettier --check ...`        | Check formatting without changes          |
| `npm run docs:generate` | `compodoc ...`                | Generate documentation in `docs/`         |
| `npm run docs:serve`    | `compodoc ... -s -o`          | Generate and serve docs at localhost:8080 |
| `npm run sonar`         | `sonar-scanner`               | Run SonarQube analysis                    |
| `npm run sonar:full`    | `test:coverage && sonar`      | Run tests + SonarQube analysis            |

---

## Quality Metrics

| Metric     | Value      | Threshold |
| ---------- | ---------- | --------- |
| Statements | 98.07%     | >= 80%    |
| Branches   | 83.94%     | >= 80%    |
| Functions  | 100%       | >= 80%    |
| Lines      | 97.88%     | >= 80%    |
| ESLint     | 2 warnings | 0         |
| Tests      | 455/455    | All pass  |
| Build      | 0 warnings | 0         |
| Bundle     | 79.19 KB   | < 500 KB  |

---

## Features

- **Appointments List**: View all appointments with real-time search, workshop/service/date filters, and statistics cards
- **New Appointment**: 3-step stepper with reactive form validation (Service > Contact > Vehicle)
- **Success Page**: Confirmation with appointment summary and navigation actions
- **Error Page**: Detailed error information with error code, message, and suggestions
- **Dark Mode**: Toggle between light/dark themes, persisted in localStorage
- **i18n**: Switch between Spanish and English at runtime (no rebuild needed)
- **Responsive Design**: Mobile-first layout with adaptive grid (1 -> 2 -> 3 columns)
- **Accessibility**: ARIA labels, keyboard navigation, focus management, semantic HTML
- **Error Handling**: Centralized error interceptor + loading/error states in UI
- **Lazy Loading**: Routes and `@defer` blocks for optimal initial load
- **Custom Date Picker**: Calendar popover with month navigation, today button, and clear option
- **Time Slot Picker**: Visual grid with available/selected/disabled states and dynamic slot availability
- **Form Validation**: Email regex, phone pattern, Argentine license plates (old + Mercosur), vehicle year range

---

## Documentation

Full API documentation is generated with **Compodoc** and committed to the repository:

- **Online**: [View Documentation](https://github.com/MiltonMolloja/QuickReserveFrontEnd/blob/master/docs/index.html)
- **Local**: Run `npm run docs:serve` to browse at `http://localhost:8080`

```bash
# Generate static docs
npm run docs:generate

# Generate and open in browser
npm run docs:serve
```

---

## Project Structure Highlights

### TypeScript Configuration

- `strict: true` with `noUncheckedIndexedAccess`
- `strictTemplates` in Angular compiler options
- `ChangeDetectionStrategy.OnPush` on all components

### ESLint Configuration

- Flat config (`eslint.config.js`)
- `strictTypeChecked` from typescript-eslint
- Angular ESLint with template accessibility rules
- Prettier integration via `eslint-config-prettier`

### Testing

- **Jest 30** with `jest-preset-angular` (no Karma/browser needed)
- Coverage thresholds enforced at 80% (statements, branches, functions, lines)
- Barrel files (`index.ts`) excluded from coverage metrics

### Git Hooks

- **Husky** pre-commit hook runs `lint-staged`
- `lint-staged` runs ESLint fix + Prettier on staged `.ts` and `.html` files

---

## Design Decisions

| ID    | Decision                           | Rationale                                               |
| ----- | ---------------------------------- | ------------------------------------------------------- |
| ND-01 | Tailwind CSS (no Angular Material) | Custom design faithful to Pencil mockups                |
| ND-02 | Signals over RxJS for local state  | Modern Angular; RxJS only for HTTP via HttpClient       |
| ND-03 | Custom stepper with Signals        | Demonstrates framework mastery without third-party deps |
| ND-10 | Jest over Karma/Jasmine            | Faster, better DX, no browser required                  |
| ND-12 | ngx-translate over Angular i18n    | Runtime language switching without rebuild              |
| ND-20 | Zoneless Change Detection          | Production-ready in Angular 20, eliminates Zone.js      |
| ND-23 | Tailwind v4 `@theme` directive     | CSS-first config, design tokens as custom properties    |

See the full list of 26 design decisions in the project analysis document.

---

## License

This project is part of a technical challenge and is not licensed for public use.
