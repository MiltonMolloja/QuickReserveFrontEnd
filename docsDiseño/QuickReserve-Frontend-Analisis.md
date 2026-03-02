# QuickReserve Frontend - Plan de Proyecto

> **Challenge Tecnico Tecnom** - Full-Stack DEV (Angular + .NET)
> Fecha: 2026-02-27
> Version: 5.0 (Clean Architecture + Shift-Left Quality + Dark Mode Full + Zoneless)

---

## Resumen del Challenge

Desarrollar una aplicacion Full-Stack que permita la **reserva y visualizacion de turnos en talleres**, replicando un caso de uso real del producto "Boxes" de Tecnom.

**Enfoque de este documento:** Frontend en Angular

---

## 1. Analisis de Requisitos Funcionales

### RF-01: Listado de Turnos (Pantalla Principal)

| ID      | Requisito                                                                 | Prioridad |
| ------- | ------------------------------------------------------------------------- | --------- |
| RF-01.1 | Mostrar un listado de turnos creados consumiendo `GET /api/Appointments`  | Alta      |
| RF-01.2 | Incluir informacion principal: servicio, fecha, hora                      | Alta      |
| RF-01.3 | Mostrar datos del taller (cuando existe), contacto y vehiculo (opcional)  | Alta      |
| RF-01.4 | Cards sin badge de estado - solo titulo del servicio en el header         | Alta      |
| RF-01.5 | Estadisticas resumen: Total de Turnos, Turnos Hoy, Ocupacion Talleres    | Media     |
| RF-01.6 | Barra de busqueda por nombre, email (client-side)                        | Media     |
| RF-01.7 | Filtros por: Taller, Servicio, Fecha (dropdowns, client-side)            | Media     |
| RF-01.8 | Boton Limpiar filtros (rojo)                                             | Baja      |

### RF-02: Creacion de Nuevo Turno (Stepper 3 Pasos)

| ID      | Requisito                                                                 | Prioridad |
| ------- | ------------------------------------------------------------------------- | --------- |
| RF-02.1 | Paso 1 - Taller (select, obligatorio, desde `GET /api/Workshops`)        | Alta      |
| RF-02.2 | Paso 1 - Tipo de Servicio (select, obligatorio)                          | Alta      |
| RF-02.3 | Paso 1 - Fecha (date picker, obligatorio, no pasada)                     | Alta      |
| RF-02.4 | Paso 1 - Hora (time picker, obligatorio)                                 | Alta      |
| RF-02.5 | Paso 2 - Nombre Completo (obligatorio)                                   | Alta      |
| RF-02.6 | Paso 2 - Email (obligatorio, formato valido)                             | Alta      |
| RF-02.7 | Paso 2 - Telefono (obligatorio)                                          | Alta      |
| RF-02.8 | Paso 3 - Marca, Modelo, Ano, Patente (todos opcionales)                  | Media     |
| RF-02.9 | Nota informativa: "La informacion del vehiculo es opcional"              | Baja      |
| RF-02.10| Enviar datos via `POST /api/Appointments`                                | Alta      |

### RF-03: Pantalla de Confirmacion (Turno Creado)

| ID      | Requisito                                                                 | Prioridad |
| ------- | ------------------------------------------------------------------------- | --------- |
| RF-03.1 | Navbar simplificado: logo + titulo + link "Volver al inicio"             | Alta      |
| RF-03.2 | Icono check grande con gradiente verde y shadow                          | Media     |
| RF-03.3 | Titulo "Turno Creado Exitosamente!" + subtitulo descriptivo              | Alta      |
| RF-03.4 | Summary Card con 6 filas: servicio, taller, fecha, hora, contacto, vehiculo | Alta   |
| RF-03.5 | Boton "Crear otro turno" (outline) - redirige a /new-appointment         | Alta      |
| RF-03.6 | Boton "Ver Turnos" (solid) - redirige a /appointments                    | Alta      |

### RF-04: Dark Mode (Completo - Todas las pantallas)

| ID      | Requisito                                                                 | Prioridad |
| ------- | ------------------------------------------------------------------------- | --------- |
| RF-04.1 | Variante dark mode del Listado de Turnos                                 | Media     |
| RF-04.2 | Variante dark mode del Stepper Paso 1 (Servicio)                         | Media     |
| RF-04.3 | Variante dark mode del Stepper Paso 2 (Contacto)                         | Media     |
| RF-04.4 | Variante dark mode del Stepper Paso 3 (Vehiculo)                         | Media     |
| RF-04.5 | Variante dark mode de la pantalla Turno Creado (Success)                  | Media     |
| RF-04.6 | Theme selector en navbar: Light / Dark / Auto                            | Media     |
| RF-04.7 | Persistir preferencia de tema en localStorage                            | Baja      |

### RF-05: Navegacion y UX

| ID      | Requisito                                                                 | Prioridad |
| ------- | ------------------------------------------------------------------------- | --------- |
| RF-05.1 | Boton "Nuevo Turno" en el navbar                                         | Alta      |
| RF-05.2 | Progress bar de 3 pasos en el stepper                                    | Alta      |
| RF-05.3 | Botones Anterior / Siguiente / Cancelar en el stepper                    | Alta      |
| RF-05.4 | Boton final "Crear Turno" con icono check                                | Alta      |
| RF-05.5 | Selector de idioma (ES/EN) en navbar                                     | Media     |
| RF-05.6 | Theme toggle (Light / Dark / Auto) en navbar                             | Media     |

---

## 2. Requisitos No Funcionales

| ID     | Requisito                                                                 | Categoria      |
| ------ | ------------------------------------------------------------------------- | -------------- |
| RNF-01 | Angular v19+ con standalone components (sin NgModules)                    | Framework      |
| RNF-02 | TypeScript strict mode                                                    | Calidad        |
| RNF-03 | Tailwind CSS v4 (utility-first, zero-runtime)                             | Estilos        |
| RNF-04 | Clean Architecture: domain/, application/, infrastructure/, presentation/ | Arquitectura   |
| RNF-05 | Patron Container-Presentational (smart vs dumb components)                | Arquitectura   |
| RNF-06 | Signals para state management local                                       | State          |
| RNF-07 | Reactive Forms con validaciones                                           | Forms          |
| RNF-08 | Lazy loading de rutas                                                     | Performance    |
| RNF-09 | @defer blocks para lazy loading de componentes pesados                    | Performance    |
| RNF-10 | Jest como testing framework (reemplaza Karma/Jasmine)                     | Testing        |
| RNF-11 | Cobertura de tests >= 80%                                                 | Testing        |
| RNF-12 | ESLint + angular-eslint (flat config v9+, strictTypeChecked)              | Calidad        |
| RNF-13 | Prettier para formateo consistente                                        | Calidad        |
| RNF-14 | Husky + lint-staged (pre-commit hooks)                                    | Calidad        |
| RNF-15 | SonarQube (Docker) para analisis estatico post-commit                     | Calidad        |
| RNF-16 | Compodoc para documentacion automatica                                    | Documentacion  |
| RNF-17 | ngx-translate para internacionalizacion runtime (ES/EN)                   | i18n           |
| RNF-18 | Responsive design (mobile-first)                                          | UX             |
| RNF-19 | Accesibilidad WCAG AA                                                     | Accesibilidad  |
| RNF-20 | CORS habilitado contra backend localhost:5000                             | Seguridad      |
| RNF-21 | Zoneless Change Detection (`provideZonelessChangeDetection()`)            | Performance    |
| RNF-22 | TypeScript strict tsconfig (strictNullChecks, noImplicitAny, etc.)        | Calidad        |
| RNF-23 | Error handling strategy: interceptor global + error state signals         | Resiliencia    |
| RNF-24 | Tailwind @theme directive con custom design tokens del diseno             | Estilos        |

---

## 3. Reglas de Negocio (Frontend)

| ID    | Regla                                                                                    | Tipo       |
| ----- | ---------------------------------------------------------------------------------------- | ---------- |
| RN-01 | No se puede avanzar al paso 2 sin completar taller, servicio, fecha y hora               | Validacion |
| RN-02 | No se puede avanzar al paso 3 sin completar nombre, email y telefono                     | Validacion |
| RN-03 | El email debe tener formato valido                                                       | Validacion |
| RN-04 | La fecha no debe ser pasada                                                              | Validacion |
| RN-05 | El taller debe ser uno activo del listado de `GET /api/Workshops`                        | Validacion |
| RN-06 | Los campos del vehiculo (paso 3) son todos opcionales                                    | Validacion |
| RN-07 | Los filtros del listado operan client-side sobre la lista ya cargada en memoria           | Filtrado   |
| RN-08 | Las estadisticas (total, hoy, ocupacion) se calculan con computed signals                | Calculo    |

---

## 4. Stack Tecnologico

| Area               | Tecnologia                                                             |
| ------------------ | ---------------------------------------------------------------------- |
| **Framework**      | Angular v19+ (standalone, Signals, @defer, Zoneless)                    |
| **Lenguaje**       | TypeScript 5.6+ (strict mode completo + strictTemplates)                |
| **Estilos**        | Tailwind CSS v4 + PostCSS (@theme directive, CSS-first config)          |
| **Build Tool**     | Vite (integrado en Angular 19+ via @angular/build)                     |
| **State**          | Angular Signals (signal, computed, effect)                              |
| **Forms**          | Reactive Forms (FormGroup, FormControl, Validators)                    |
| **HTTP**           | HttpClient + Interceptors                                              |
| **i18n**           | ngx-translate v16+ (runtime language switch)                           |
| **Icons**          | lucide-angular (Lucide Icons)                                          |
| **Testing**        | Jest + jest-preset-angular + @angular-builders/jest                     |
| **Linting**        | ESLint v9+ flat config + angular-eslint + typescript-eslint strict      |
| **Formatting**     | Prettier                                                               |
| **Git Hooks**      | Husky + lint-staged (pre-commit)                                       |
| **Calidad**        | SonarQube Community (Docker) + sonarqube-scanner                       |
| **Documentacion**  | Compodoc                                                               |
| **Arquitectura**   | Clean Architecture (Domain, Application, Infrastructure, Presentation) |

---

## 5. Angular - Mejores Practicas (v19/v20)

### 5.1 Componentes

| ID    | Practica                                                                  |
| ----- | ------------------------------------------------------------------------- |
| AP-01 | Standalone components (default en v19+, NO usar NgModules)                |
| AP-02 | NO poner `standalone: true` en el decorador (es default desde v19+)       |
| AP-03 | `ChangeDetectionStrategy.OnPush` en todos los componentes                 |
| AP-04 | `input()` y `output()` functions en lugar de decoradores @Input/@Output   |
| AP-05 | Componentes pequenos con responsabilidad unica                            |
| AP-06 | Patron Container-Presentational (smart vs dumb components)                |

### 5.2 State Management

| ID    | Practica                                                                  |
| ----- | ------------------------------------------------------------------------- |
| AP-07 | Signals para estado local del componente                                  |
| AP-08 | `computed()` para estado derivado                                         |
| AP-09 | NO usar `mutate` en signals, usar `update` o `set`                        |
| AP-20 | `effect()` para side effects reactivos (logging, sync con localStorage)   |
| AP-21 | `linkedSignal()` para signals derivados con escritura (production-ready)  |

### 5.3 Templates

| ID    | Practica                                                                  |
| ----- | ------------------------------------------------------------------------- |
| AP-10 | Control flow nativo: `@if`, `@for`, `@switch` (NO *ngIf, *ngFor)         |
| AP-11 | Class bindings en lugar de ngClass                                        |
| AP-12 | Style bindings en lugar de ngStyle                                        |
| AP-13 | Templates simples sin logica compleja                                     |
| AP-14 | `@defer` blocks para lazy loading de componentes pesados                  |

### 5.4 Forms, Servicios y Routing

| ID    | Practica                                                                  |
| ----- | ------------------------------------------------------------------------- |
| AP-15 | Reactive Forms (NO Template-driven)                                       |
| AP-16 | `ReactiveFormsModule` importado en cada componente que lo use             |
| AP-17 | `providedIn: 'root'` para servicios singleton                             |
| AP-18 | `inject()` function en lugar de inyeccion por constructor                 |
| AP-19 | Lazy loading para feature routes                                          |

### 5.5 Performance y Change Detection

| ID    | Practica                                                                  |
| ----- | ------------------------------------------------------------------------- |
| AP-22 | `provideZonelessChangeDetection()` - sin Zone.js para mejor performance   |
| AP-23 | `resource()` / `httpResource()` para data fetching reactivo (experimental)|
| AP-24 | `trackBy` equivalente con `@for (item of items; track item.id)`           |
| AP-25 | Evitar function calls en templates - usar `computed()` signals            |
| AP-26 | `@defer` blocks con `on viewport` / `on idle` para lazy rendering        |

### 5.6 TypeScript Strict Mode

| ID    | Practica                                                                  |
| ----- | ------------------------------------------------------------------------- |
| AP-27 | `strict: true` en tsconfig.json (habilita todas las strict flags)         |
| AP-28 | `strictTemplates: true` en angularCompilerOptions                         |
| AP-29 | `noPropertyAccessFromIndexSignature: true`                                |
| AP-30 | `noUncheckedIndexedAccess: true` - arrays/maps siempre pueden ser undefined|
| AP-31 | `forceConsistentCasingInFileNames: true`                                  |

---

## 6. Configuracion de Tooling

### 6.1 Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

**.postcssrc.json:**
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

**styles.css:**
```css
@import "tailwindcss";

/* Dark mode via class strategy (Tailwind v4) */
@custom-variant dark (&:where(.dark, .dark *));

/* Custom design tokens del diseno Pencil.dev */
@theme {
  /* Colores primarios */
  --color-primary: #4F46E5;
  --color-primary-gradient: #7C3AED;
  --color-success: #10B981;
  --color-success-light: #34D399;
  --color-danger: #EF4444;
  --color-amber: #F59E0B;

  /* Light mode */
  --color-bg-light: #F3F4F8;
  --color-card-light: #FFFFFF;
  --color-border-light: #E5E7EB;
  --color-text-title: #1A1A2E;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  --color-info-bg: #EEF2FF;

  /* Dark mode */
  --color-bg-dark: #0F1117;
  --color-card-dark: #1A1D2E;
  --color-border-dark: #2A2D3E;
  --color-text-dark-title: #F1F5F9;
  --color-text-dark-secondary: #94A3B8;
  --color-text-dark-tertiary: #CBD5E1;
  --color-text-dark-muted: #64748B;
  --color-theme-bg: #252838;
  --color-indigo-dark: #2D2455;
  --color-stat-amber: #2E2A1A;
  --color-stat-green: #1A2E1F;

  /* Tipografia */
  --font-sans: "Inter", sans-serif;
}
```

> **NOTA Tailwind v4:** Ya no se usa `tailwind.config.js`. La configuracion es CSS-first
> con `@theme` directive. `@custom-variant dark` reemplaza `darkMode: 'class'` de v3.

### 6.2 Jest - Testing Framework

```bash
npm install --save-dev jest @angular-builders/jest @types/jest jest-preset-angular
```

**jest.config.ts:**
```typescript
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets/index.js';

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/*.routes.ts',
    '!src/app/app.config.ts',
    '!src/main.ts',
    '!src/environments/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
} satisfies Config;
```

> **NOTA:** `setupFilesAfterEnv` (NO `setupFilesAfterSetup`) es la propiedad correcta de Jest.
> `createCjsPreset()` es la forma moderna de jest-preset-angular (v14+).

**Testing de @defer blocks:**
```typescript
TestBed.configureTestingModule({ deferBlockBehavior: DeferBlockBehavior.Manual });
const fixture = TestBed.createComponent(MyComponent);
const deferBlock = (await fixture.getDeferBlocks())[0];
await deferBlock.render(DeferBlockState.Complete);
```

### 6.3 ngx-translate - Internacionalizacion (i18n)

```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```

**app.config.ts:**
```typescript
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

const httpLoaderFactory = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'es'
    })
  ],
};
```

**Archivos:** `src/assets/i18n/es.json` y `src/assets/i18n/en.json`

**Uso en templates:**
```html
<h1>{{ 'APPOINTMENTS.TITLE' | translate }}</h1>
```

### 6.4 ESLint + angular-eslint + typescript-eslint (Flat Config v9+ - Estricto)

Configuracion estricta que garantiza codigo limpio, type-safe y mantenible.
ESLint atrapa problemas en **tiempo de desarrollo** (IDE + pre-commit hook).

#### Estrategia de reglas

| Capa               | Preset                                    | Que cubre                                              |
| ------------------ | ----------------------------------------- | ------------------------------------------------------ |
| **ESLint core**    | `eslint.configs.recommended`              | Errores JS basicos, variables no usadas                |
| **TypeScript**     | `tseslint.configs.strictTypeChecked`      | Type safety estricto, no-any, no-unsafe-*, promises    |
| **TypeScript style** | `tseslint.configs.stylisticTypeChecked` | Consistencia de tipos, optional chain, nullish coalescing |
| **Angular TS**     | `angular.configs.tsRecommended`           | Reglas Angular: lifecycle, selectors, standalone        |
| **Angular HTML**   | `angular.configs.templateRecommended`     | Templates: banana-in-box, eqeqeq, async pipes          |
| **Angular A11y**   | `angular.configs.templateAccessibility`   | Accesibilidad: alt-text, click+keyboard, labels         |

```bash
ng add @angular-eslint/schematics
npm install --save-dev eslint-config-prettier
```

**eslint.config.js:**
```javascript
// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  // ============================================
  // TYPESCRIPT FILES (.ts)
  // ============================================
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      // ---- Angular: Selectores ----
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],

      // ---- Angular: Mejores practicas ----
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',

      // ---- TypeScript: Type Safety ----
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',

      // ---- TypeScript: Consistencia y estilo ----
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/prefer-for-of': 'error',

      // ---- TypeScript: Variables y imports ----
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      // ---- TypeScript: Naming conventions ----
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'interface', format: ['PascalCase'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'enum', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
        { selector: 'class', format: ['PascalCase'] },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
      ],

      // ---- ESLint core: Codigo limpio ----
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-template-curly-in-string': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  // ============================================
  // HTML TEMPLATE FILES (.html)
  // ============================================
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // ---- Templates: Errores comunes ----
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',

      // ---- Templates: Accesibilidad (WCAG AA) ----
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'error',
      '@angular-eslint/template/mouse-events-have-key-events': 'error',
      '@angular-eslint/template/no-autofocus': 'warn',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/label-has-associated-control': 'error',
      '@angular-eslint/template/valid-aria': 'error',
      '@angular-eslint/template/role-has-required-aria': 'error',
      '@angular-eslint/template/table-scope': 'error',
      '@angular-eslint/template/elements-content': 'error',
      '@angular-eslint/template/interactive-supports-focus': 'error',
    },
  },

  // ============================================
  // PRETTIER: Desactivar reglas que conflictuan con Prettier
  // ============================================
  prettierConfig,

  // ============================================
  // IGNORAR archivos que no necesitan lint
  // ============================================
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      '.angular/**',
      'docs/**',
      '*.config.js',
      '*.config.ts',
      'setup-jest.ts',
    ],
  }
);
```

#### Que garantiza esta configuracion

| Categoria          | Reglas clave                                              | Impacto                                   |
| ------------------ | --------------------------------------------------------- | ----------------------------------------- |
| **Type Safety**    | no-explicit-any, no-unsafe-*, no-floating-promises        | Elimina `any` y operaciones inseguras     |
| **Codigo limpio**  | no-unused-vars, prefer-const, no-console, eqeqeq         | Sin variables muertas, sin console.log    |
| **Consistencia**   | naming-convention, consistent-type-imports, prefer-readonly | Nombres uniformes, imports tipados       |
| **Angular**        | prefer-standalone, use-lifecycle-interface, no-empty-lifecycle | Componentes modernos y correctos      |
| **Accesibilidad**  | alt-text, click+key events, label-has-control, valid-aria | WCAG AA compliance en templates           |
| **Promesas**       | no-floating-promises, no-misused-promises, await-thenable | Manejo correcto de async/await            |

### 6.5 Prettier

```bash
npm install --save-dev prettier eslint-config-prettier
```

**.prettierrc:**
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**.prettierignore:**
```
dist
coverage
node_modules
.angular
```

### 6.6 Husky + lint-staged (Pre-commit Hooks)

```bash
npm install --save-dev husky lint-staged
npx husky init
```

**.husky/pre-commit:**
```bash
npx lint-staged
```

**package.json (lint-staged config):**
```json
{
  "lint-staged": {
    "*.{ts,html}": ["eslint --fix", "prettier --write"],
    "*.{json,css,scss,md}": ["prettier --write"]
  }
}
```

### 6.7 Compodoc - Documentacion Automatica

```bash
npm install --save-dev @compodoc/compodoc
```

**.compodocrc.json:**
```json
{
  "name": "QuickReserve Frontend",
  "hideGenerator": true,
  "disablePrivate": true,
  "disableInternal": true,
  "disableLifeCycleHooks": false,
  "customFavicon": "",
  "coverageTest": 70,
  "coverageTestThresholdFail": true
}
```

### 6.8 SonarQube - Analisis Estatico de Codigo (Complemento de ESLint)

SonarQube cubre lo que ESLint **no puede**: complejidad cognitiva, duplicacion de codigo,
security hotspots, y metricas de cobertura agregadas. Juntos forman una estrategia completa.

#### ESLint vs SonarQube: Que cubre cada uno

| Aspecto                      | ESLint (dev-time)          | SonarQube (post-commit)                   |
| ---------------------------- | -------------------------- | ----------------------------------------- |
| **Cuando corre**             | IDE + pre-commit hook      | Despues de push / manual                  |
| **Type safety**              | strictTypeChecked           | No tiene type-checking                    |
| **Angular rules**            | angular-eslint              | Reglas Angular propias (S7648, S7655)     |
| **Code smells**              | Parcial (naming, unused)   | Completo (complejidad, duplicados)        |
| **Complejidad cognitiva**    | No                         | Metrica clave de mantenibilidad           |
| **Duplicacion de codigo**    | No                         | Detecta bloques duplicados cross-file     |
| **Security hotspots**        | No                         | Detecta patrones inseguros (XSS)          |
| **Coverage agregado**        | No                         | Dashboard con metricas por archivo        |
| **Autofix**                  | --fix en muchas reglas      | Solo reporta                              |
| **Quality Gate**             | No                         | Pass/Fail con umbrales configurables      |

#### Setup con Docker

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:community
```

```bash
npm install --save-dev sonarqube-scanner
```

#### sonar-project.properties

```properties
# Identificacion
sonar.projectKey=quick-reserve-frontend
sonar.projectName=QuickReserve Frontend
sonar.projectVersion=1.0.0

# Server
sonar.host.url=http://localhost:9000

# Fuentes y exclusiones
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts
sonar.exclusions=\
  **/node_modules/**,\
  **/dist/**,\
  **/coverage/**,\
  **/*.spec.ts,\
  **/assets/**,\
  **/environments/**,\
  **/setup-jest.ts,\
  **/*.config.ts,\
  **/*.config.js

# TypeScript
sonar.typescript.tsconfigPaths=tsconfig.json,tsconfig.app.json

# Cobertura (Jest genera LCOV)
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Duplicacion
sonar.cpd.exclusions=**/*.spec.ts,**/test/**
sonar.cpd.typescript.minimumTokens=50
sonar.cpd.typescript.minimumLines=6

# Encoding
sonar.sourceEncoding=UTF-8
```

#### Reglas SonarQube clave para Angular/TypeScript

| Regla                    | ID    | Que detecta                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| Standalone architecture  | S7648 | Components/Directives/Pipes deben ser standalone     |
| Lifecycle interfaces     | S7655 | Clases Angular deben implementar interfaces lifecycle |
| Lifecycle context        | S7641 | Lifecycle methods en contexto correcto               |
| PipeTransform            | S7656 | Pipes deben implementar PipeTransform                |
| No inputs metadata       | S7650 | No usar "inputs" metadata, usar decoradores          |
| No input alias           | S7649 | Input bindings no deben tener alias                  |
| No output alias          | S7653 | Output bindings no deben tener alias                 |
| No output "on" prefix    | S7652 | Outputs no deben llamarse "on*"                      |
| No DOM event names       | S7651 | Outputs no deben usar nombres de eventos DOM         |
| Empty lifecycle          | S7647 | Lifecycle methods vacios deben eliminarse             |
| Cognitive complexity     | S3776 | Funciones con complejidad cognitiva > 15             |
| Duplicated blocks        | S1145 | Bloques de codigo duplicados entre archivos          |
| Unused imports           | S1128 | Imports no utilizados                                |
| Dead code                | S1186 | Funciones vacias / codigo muerto                     |

#### Quality Gate (Sonar way - Clean as You Code)

| Metrica                      | Condicion                  | Justificacion                     |
| ---------------------------- | -------------------------- | --------------------------------- |
| **Issues**                   | 0 nuevos (blocker/critical)| No introducir problemas graves    |
| **Coverage**                 | >= 80% en codigo nuevo     | Tests obligatorios                |
| **Duplicated Lines**         | <= 3% en codigo nuevo      | Evitar copy-paste                 |
| **Reliability Rating**       | A (0 bugs)                 | Sin bugs en codigo nuevo          |
| **Security Rating**          | A (0 vulnerabilidades)     | Sin vulnerabilidades nuevas       |
| **Maintainability Rating**   | A                          | Deuda tecnica controlada          |
| **Security Hotspots Reviewed** | 100%                     | Todos los hotspots revisados      |
| **Cognitive Complexity**     | <= 15 por funcion          | Funciones simples y legibles      |

#### Flujo completo de calidad de codigo

```
Desarrollo -> ESLint (IDE autofix) -> Pre-commit (lint-staged) -> Push -> SonarQube -> Quality Gate
     |              |                        |                              |              |
  Escribir    Errores de tipo,         Formateo +              Complejidad,    Pass/Fail
  codigo      naming, Angular          lint automatico         duplicados,     con metricas
              rules en tiempo real                             security,       agregadas
                                                               coverage
```

### 6.9 TypeScript Strict Config

**tsconfig.json (opciones estrictas):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "forceConsistentCasingInFileNames": true,
    "exactOptionalPropertyTypes": true,
    "useUnknownInCatchVariables": true
  },
  "angularCompilerOptions": {
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

> **NOTA:** `strict: true` habilita la mayoria, pero `noUncheckedIndexedAccess`,
> `noPropertyAccessFromIndexSignature` y `exactOptionalPropertyTypes` se agregan
> explicitamente porque NO estan incluidos en `strict: true`.

### 6.10 Zoneless Change Detection

Angular 20 trae Zoneless como **production-ready**. Elimina Zone.js para mejor performance.

**app.config.ts:**
```typescript
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // ... otros providers
  ],
};
```

**Beneficios:**
- Elimina el overhead de Zone.js (~15KB menos en bundle)
- Change detection mas predecible (solo cuando signals cambian)
- Mejor performance en aplicaciones con muchos componentes
- Compatible con Signals (se complementan naturalmente)

**Testing con Zoneless:**
```typescript
TestBed.configureTestingModule({
  providers: [provideZonelessChangeDetection()]
});
const fixture = TestBed.createComponent(MyComponent);
await fixture.whenStable(); // En lugar de fixture.detectChanges()
```

### 6.11 Error Handling Strategy

Estrategia centralizada de manejo de errores HTTP:

```typescript
// infrastructure/http/error.interceptor.ts
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        // Error de red / backend no disponible
        console.error('Error de conexion:', error.message);
      } else if (error.status === 400) {
        // Errores de validacion del backend
        const apiError = error.error as ApiResponse<null>;
        console.error('Validacion:', apiError?.errors);
      } else if (error.status >= 500) {
        // Error del servidor
        console.error('Error del servidor:', error.status);
      }
      return throwError(() => error);
    })
  );
};
```

**Patron de error state en signals:**
```typescript
// Cada state tiene: loading, error, data
readonly loading = signal(false);
readonly error = signal<string | null>(null);
readonly data = signal<T[]>([]);

// Los componentes reaccionan con @if
// @if (state.loading()) { <spinner /> }
// @if (state.error(); as error) { <error-message [message]="error" /> }
// @if (state.data().length > 0) { <list /> }
```

### 6.12 Vite (Build Tool)

Angular 19+ usa Vite como build tool por defecto via @angular/build (esbuild + Vite).
- No requiere configuracion adicional - viene integrado en `ng new`
- HMR (Hot Module Replacement) ultra rapido
- Build de produccion optimizado con esbuild

---

## 7. API Backend (ya implementada)

### 7.1 Endpoints

| Metodo | Ruta               | Descripcion              | Status Codes |
| ------ | ------------------ | ------------------------ | ------------ |
| GET    | /api/Appointments  | Listar todos los turnos  | 200          |
| POST   | /api/Appointments  | Crear nuevo turno        | 201, 400     |
| GET    | /api/Workshops     | Listar talleres activos  | 200, 503     |

**Base URL:** `http://localhost:5000`

### 7.2 Modelos de Datos (DTOs)

#### CreateAppointmentRequest
```typescript
interface CreateAppointmentRequest {
  place_id: number;
  appointment_at: string;
  service_type: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  vehicle?: {
    make?: string;
    model?: string;
    year?: number;
    license_plate?: string;
  };
}
```

#### AppointmentResponse
```typescript
interface AppointmentResponse {
  id: string;
  place_id: number;
  appointment_at: string;
  service_type: string;
  contact: { name: string; email: string; phone: string; };
  vehicle?: { make?: string; model?: string; year?: number; license_plate?: string; };
  created_at: string;
}
```

#### WorkshopResponse
```typescript
interface WorkshopResponse {
  id: number;
  name: string;
  address: string;
  email: string;
  whatsapp: string;
}
```

#### ApiResponse (envoltorio estandar)
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  errors: string[] | null;
}
```

---

## 8. Analisis del Diseno (Pencil.dev - 10 pantallas: 5 Light + 5 Dark)

> **10 pantallas diseñadas en Pencil.dev:**
>
> | #  | Pantalla                    | Modo  | Seccion |
> | -- | --------------------------- | ----- | ------- |
> | 1  | Listado de Turnos           | Light | 8.1     |
> | 2  | Stepper Paso 1 (Servicio)   | Light | 8.2     |
> | 3  | Stepper Paso 2 (Contacto)   | Light | 8.2     |
> | 4  | Stepper Paso 3 (Vehiculo)   | Light | 8.2     |
> | 5  | Turno Creado (Success)      | Light | 8.3     |
> | 6  | Listado de Turnos           | Dark  | 8.4     |
> | 7  | Stepper Paso 1 (Servicio)   | Dark  | 8.5     |
> | 8  | Stepper Paso 2 (Contacto)   | Dark  | 8.5     |
> | 9  | Stepper Paso 3 (Vehiculo)   | Dark  | 8.5     |
> | 10 | Turno Creado (Success)      | Dark  | 8.6     |

### 8.1 Pantalla 1 - Listado de Turnos (1280x960)

#### Estructura

- **Navbar** superior blanco con:
  - Logo (icono wrench con gradiente indigo/violeta) + titulo + subtitulo
  - Nav Controls: Language Selector, Theme Selector, Boton Nuevo Turno
- **Stats Row** con 3 tarjetas: Total de Turnos, Turnos Hoy, Ocupacion Talleres
- **Seccion de Turnos** con:
  - Header "Turnos Agendados" + contador
  - Filters Row: search, taller, servicio, fecha, limpiar
  - Grid de cards (3 columnas, 2 filas)
  - Cards: tipo servicio (header sin badge), taller (opcional), fecha/hora, contacto, vehiculo (opcional)

#### Paleta de Colores (Light Mode)

| Color            | Hex       | Uso                                    |
| ---------------- | --------- | -------------------------------------- |
| Primario         | #4F46E5   | Botones, links, progress bar (indigo)  |
| Gradiente        | #7C3AED   | Gradiente secundario (violet-600)      |
| Titulo oscuro    | #1A1A2E   | Texto titulo                           |
| Texto secundario | #6B7280   | Texto gray-500                         |
| Texto terciario  | #9CA3AF   | Texto gray-400                         |
| Background       | #F3F4F8   | Fondo general                          |
| Cards            | #FFFFFF   | Fondo cards y navbar                   |
| Bordes           | #E5E7EB   | Bordes gray-200                        |
| Info note        | #EEF2FF   | Background nota informativa (indigo-50)|
| Confirmado       | #10B981   | Verde (emerald-500)                    |
| Amber            | #F59E0B   | Icono stat Turnos Hoy                  |
| Orange bg        | #FFF7ED   | Background stat Turnos Hoy             |
| Green bg         | #F0FDF4   | Background stat Ocupacion              |
| Danger           | #EF4444   | Boton limpiar filtros (red-500)        |
| Text dark        | #374151   | Texto filtros (gray-700)               |

#### Paleta de Colores (Dark Mode - Completa, 10 pantallas)

| Color            | Hex       | Uso                                    |
| ---------------- | --------- | -------------------------------------- |
| Background       | #0F1117   | Fondo principal                        |
| Cards/Navbar     | #1A1D2E   | Fondo cards, navbar, inputs, botones outline |
| Bordes           | #2A2D3E   | Bordes cards, inputs, dividers, progress bar inactivo |
| Titulo           | #F1F5F9   | Texto titulo (slate-100)               |
| Subtitulo        | #94A3B8   | Texto secundario (slate-400)           |
| Texto            | #CBD5E1   | Texto terciario, labels, botones outline (slate-300) |
| Texto muted      | #64748B   | Subtitulos stepper, placeholders (slate-500) |
| Theme bg         | #252838   | Background theme selector, taller info box |
| Indigo dark      | #2D2455   | Stat bg, icon circles, info note bg    |
| Stat amber       | #2E2A1A   | Background stat amber                  |
| Stat green       | #1A2E1F   | Background stat green                  |
| Input focused    | #4F46E5   | Stroke input activo (2px)              |
| Danger           | #EF4444   | Asteriscos required (red-500)          |
| Success gradient | #10B981 -> #34D399 | Circulo check (135deg)        |
| Success shadow   | #10B98140 | Shadow del circulo check               |
| Btn secondary    | #4F46E5   | Stroke boton "Crear otro turno" (1.5px)|

#### Tipografia

| Elemento   | Tamano | Weight | Font  |
| ---------- | ------ | ------ | ----- |
| Titulos    | 28px   | 800    | Inter |
| Subtitulos | 14px   | 400-600| Inter |
| Body       | 13-14px| 400-500| Inter |

### 8.2 Pantallas 2-4 - Flujo de Creacion Light (960px ancho)

- Header: Volver al inicio + titulo "Nuevo Turno" + subtitulo "Paso X de 3"
- Progress bar de 3 segmentos (indigo activo, gray pendiente)
- Card blanca con borde gray-200, corner radius 16px, padding 32px
- Paso 1-2: Botones "Cancelar/Anterior" (outline) | "Siguiente" (indigo solid)
- Paso 3: Botones "Anterior" (outline) | "Crear Turno" con icono check (indigo solid)

### 8.3 Pantalla 5 - Turno Creado Light (960x900)

- **Navbar simplificado**: logo (40px) + titulo (18px, weight 700) | link "Volver al inicio" (indigo)
- **Success Section**: circulo verde (88px) con gradiente + check blanco (44px)
- **Titulo**: "Turno Creado Exitosamente!" (26px, weight 800)
- **Summary Card** (560px): 6 filas con icono + label + valor
- **Action Buttons**: "Crear otro turno" (outline) + "Ver Turnos" (solid)

### 8.4 Pantalla 1 Dark - Listado de Turnos Dark Mode

Misma estructura que la pantalla light (8.1) con la paleta dark mode documentada en 8.1.
Los colores especificos se encuentran en la tabla "Paleta de Colores (Dark Mode)" de la seccion 8.1.

Diferencias clave respecto a light:

- **Background**: `#0F1117` en lugar de `#F3F4F8`
- **Cards/Navbar**: `#1A1D2E` en lugar de `#FFFFFF`
- **Bordes**: `#2A2D3E` en lugar de `#E5E7EB`
- **Stats backgrounds**: Tonos oscuros (`#2D2455`, `#2E2A1A`, `#1A2E1F`) en lugar de pasteles claros
- **Theme selector**: Background `#252838` con opciones sun/moon/monitor
- **Textos**: Escala slate invertida (100/300/400) en lugar de gray (500/700/800)

### 8.5 Pantallas 2-4 Dark - Flujo de Creacion Dark Mode

Misma estructura que las pantallas light (8.2) con los siguientes cambios de color:

#### Estructura Dark Mode del Stepper

- **Background general**: `#0F1117` (fondo oscuro principal)
- **Header**: Fondo `#0F1117`, titulo `#F1F5F9`, subtitulo `#64748B` (slate-500)
- **Link "Volver al inicio"**: `#4F46E5` (indigo, mismo que light)
- **Progress bar**: Segmento activo `#4F46E5`, segmentos inactivos `#2A2D3E`
- **Form Card**: Fondo `#1A1D2E`, borde `#2A2D3E` (1px), corner radius 16px, padding 32px
- **Card header icon bg**: `#2D2455` (indigo oscuro), 44px, corner radius 12px
- **Card header subtitle**: `#64748B` (slate-500)

#### Inputs Dark Mode

| Elemento              | Fill      | Stroke         | Texto     |
| --------------------- | --------- | -------------- | --------- |
| Input normal          | #1A1D2E   | #2A2D3E (1px)  | #CBD5E1   |
| Input focused/active  | #1A1D2E   | #4F46E5 (2px)  | #F1F5F9   |
| Label                 | -         | -              | #CBD5E1   |
| Label asterisco       | -         | -              | #EF4444   |
| Placeholder           | -         | -              | #64748B   |
| Taller info box       | #252838   | -              | #94A3B8   |

#### Botones Dark Mode del Stepper

| Boton              | Fill      | Stroke         | Texto     |
| ------------------ | --------- | -------------- | --------- |
| Cancelar/Anterior  | #1A1D2E   | #2A2D3E (1px)  | #CBD5E1   |
| Siguiente          | #4F46E5   | -              | #FFFFFF   |
| Crear Turno        | #4F46E5   | -              | #FFFFFF   |

#### Info Note (Paso 3 Dark)

- Background: `#2D2455` (indigo oscuro)
- Texto: `#4F46E5` (indigo-600)
- Icono: emoji 💡
- Corner radius: 10px, padding 14px 16px

### 8.6 Pantalla 5 Dark - Turno Creado Dark Mode

Misma estructura que la pantalla light (8.3) con los siguientes cambios de color:

#### Estructura Dark Mode del Success

- **Background general**: `#0F1117`
- **Navbar**: Fondo `#1A1D2E`, titulo `#F1F5F9` (18px, weight 700)
- **Link "Volver al inicio"**: `#4F46E5` (indigo)
- **Success circle**: Gradiente `#10B981 -> #34D399` (135deg), shadow `#10B98140` blur 24px offset-y 8px
- **Check icon**: `#FFFFFF`, 44px dentro de circulo 88px
- **Titulo**: `#F1F5F9` (26px, weight 800)
- **Subtitulo**: `#94A3B8` (slate-400)

#### Summary Card Dark

| Elemento           | Color     | Detalle                          |
| ------------------ | --------- | -------------------------------- |
| Card background    | #1A1D2E   | Corner radius 16px               |
| Card border        | #2A2D3E   | 1px                              |
| Titulo "Resumen"   | #F1F5F9   | Weight 600                       |
| Icon backgrounds   | #2D2455   | Circulos indigo oscuro           |
| Icons              | #4F46E5   | Lucide icons                     |
| Labels             | #94A3B8   | Slate-400                        |
| Values             | #F1F5F9   | Slate-100                        |
| Dividers           | #2A2D3E   | Separadores entre filas          |

#### Botones Dark Mode del Success

| Boton              | Fill      | Stroke              | Texto     | Icono     |
| ------------------ | --------- | -------------------- | --------- | --------- |
| Crear otro turno   | #1A1D2E   | #4F46E5 (1.5px)     | #4F46E5   | plus      |
| Ver Turnos         | #4F46E5   | -                    | #FFFFFF   | list      |

### 8.7 Iconografia

| Contexto          | Iconos (Lucide)                                              |
| ----------------- | ------------------------------------------------------------ |
| Generales         | arrow-left, plus, check, wrench, calendar, calendar-clock, activity |
| Navbar            | globe, chevron-down, sun, moon, monitor                      |
| Filtros           | search, map-pin, wrench, calendar, x                         |
| Cards             | map-pin, calendar, clock-3, user, mail, phone, car           |
| Success           | check (grande en circulo verde)                              |
| Action buttons    | plus (crear otro turno), list (ver turnos)                   |

---

## 9. Arquitectura: Clean Architecture Full

### 9.0 Por que Clean Architecture en el Frontend

El backend ya implementa **Clean Architecture + DDD + CQRS** (ver QuickReserve-Backend-Plan.md).
Aplicar la misma filosofia en el frontend da coherencia full-stack y demuestra vision arquitectonica.

#### Regla de Dependencias

```
Presentation -> Application -> Domain <- Infrastructure
```

- **Domain** NO importa nada de Angular (modelos puros, interfaces, validadores)
- **Application** solo depende de Domain (use cases, mappers, state)
- **Infrastructure** implementa los ports de Domain (HttpClient, localStorage)
- **Presentation** consume Application y Domain (componentes, routing)

#### Mapeo Backend <-> Frontend

| Capa Backend (.NET)          | Capa Frontend (Angular)  | Contenido                                    |
| ---------------------------- | ------------------------ | -------------------------------------------- |
| QuickReserve.Domain          | domain/                  | Modelos puros, enums, ports, validators      |
| QuickReserve.Application     | application/             | Use cases, mappers, state (signals)          |
| QuickReserve.Infrastructure  | infrastructure/          | HttpClient adapters, localStorage, i18n      |
| QuickReserve.API             | presentation/            | Componentes, routing, layouts, pipes         |

#### Ventajas concretas

| Ventaja                      | Impacto                                                    |
| ---------------------------- | ---------------------------------------------------------- |
| Coherencia full-stack        | Mismo patron en backend y frontend                         |
| Testabilidad                 | Use cases testeables con Jest sin HttpClient               |
| Reemplazabilidad             | Cambiar HttpClient por fetch sin tocar logica              |
| DDD en frontend              | Modelos de dominio puros sin decoradores Angular           |
| Inversion de dependencias    | Ports abstractos en domain, adapters en infrastructure     |
| Documentacion con Compodoc   | Las capas generan documentacion estructurada               |

### 9.1 Estructura de Carpetas

```
src/
  app/
    domain/                                # Capa Domain (SIN dependencias Angular)
      models/
        appointment.model.ts
        contact.model.ts
        vehicle.model.ts
        workshop.model.ts
        api-response.model.ts
        create-appointment.dto.ts
      enums/
        service-type.enum.ts
        theme.enum.ts
      ports/
        appointment.port.ts
        workshop.port.ts
        storage.port.ts
      validators/
        appointment.validator.ts

    application/                           # Capa Application (orquestacion)
      use-cases/
        create-appointment.use-case.ts
        get-appointments.use-case.ts
        get-workshops.use-case.ts
        filter-appointments.use-case.ts
      mappers/
        appointment.mapper.ts
        workshop.mapper.ts
      state/
        appointments.state.ts
        workshops.state.ts
        theme.state.ts

    infrastructure/                        # Capa Infrastructure (implementaciones)
      http/
        appointment-http.adapter.ts
        workshop-http.adapter.ts
        api-url.interceptor.ts
        error.interceptor.ts
      storage/
        local-storage.adapter.ts
      i18n/
        translate.config.ts
      theme/
        theme.adapter.ts

    presentation/                          # Capa Presentacion (UI Angular)
      shared/
        components/
          navbar/
          stat-card/
          progress-bar/
          loading-button/
          search-input/
          filter-dropdown/
          theme-selector/
          language-selector/
          success-icon/
          summary-row/
        pipes/
          date-format.pipe.ts

      features/
        appointments/
          appointments.component.ts
          appointments.component.html
          appointments.routes.ts
          components/
            appointment-card/
            filters-bar/

        new-appointment/
          new-appointment.component.ts
          new-appointment.component.html
          new-appointment.routes.ts
          steps/
            service-step/
            contact-step/
            vehicle-step/

        appointment-success/
          appointment-success.component.ts
          appointment-success.component.html
          appointment-success.routes.ts

      layouts/
        main-layout.component.ts

    app.component.ts
    app.config.ts
    app.routes.ts

  assets/
    i18n/
      es.json
      en.json

  environments/
    environment.ts
    environment.prod.ts

  styles.css
  setup-jest.ts

# Archivos raiz
.postcssrc.json
eslint.config.js
.prettierrc
.prettierignore
jest.config.ts
.compodocrc.json
sonar-project.properties
.husky/
  pre-commit
```

### 9.2 Capa Domain - Codigo de Referencia

#### Ports (Interfaces abstractas)

```typescript
// domain/ports/appointment.port.ts
export abstract class AppointmentPort {
  abstract getAll(): Observable<ApiResponse<Appointment[]>>;
  abstract create(data: CreateAppointmentDto): Observable<ApiResponse<Appointment>>;
}

// domain/ports/workshop.port.ts
export abstract class WorkshopPort {
  abstract getAll(): Observable<ApiResponse<Workshop[]>>;
}

// domain/ports/storage.port.ts
export abstract class StoragePort {
  abstract get<T>(key: string): T | null;
  abstract set<T>(key: string, value: T): void;
  abstract remove(key: string): void;
}
```

#### Validators (Logica pura)

```typescript
// domain/validators/appointment.validator.ts
export function validateAppointment(data: Partial<CreateAppointmentDto>): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!data.place_id || data.place_id <= 0)
    errors.push({ field: 'place_id', message: 'Debe seleccionar un taller' });
  if (!data.service_type?.trim())
    errors.push({ field: 'service_type', message: 'El tipo de servicio es requerido' });
  if (!data.appointment_at)
    errors.push({ field: 'appointment_at', message: 'La fecha es requerida' });
  else if (new Date(data.appointment_at) <= new Date())
    errors.push({ field: 'appointment_at', message: 'La fecha debe ser futura' });
  if (!data.contact?.name?.trim())
    errors.push({ field: 'contact.name', message: 'El nombre es requerido' });
  if (!data.contact?.email?.trim())
    errors.push({ field: 'contact.email', message: 'El email es requerido' });
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email))
    errors.push({ field: 'contact.email', message: 'El formato del email no es valido' });
  if (!data.contact?.phone?.trim())
    errors.push({ field: 'contact.phone', message: 'El telefono es requerido' });
  return errors;
}
```

### 9.3 Capa Application - Codigo de Referencia

#### Use Cases

```typescript
// application/use-cases/create-appointment.use-case.ts
@Injectable({ providedIn: 'root' })
export class CreateAppointmentUseCase {
  private port = inject(AppointmentPort);
  private state = inject(AppointmentsState);

  execute(data: CreateAppointmentDto) {
    const errors = validateAppointment(data);
    if (errors.length > 0) { throw errors; }
    this.state.setLoading(true);
    return this.port.create(data);
  }
}
```

#### State Management (Signals)

```typescript
// application/state/appointments.state.ts
@Injectable({ providedIn: 'root' })
export class AppointmentsState {
  private _appointments = signal<Appointment[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly appointments = this._appointments.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly total = computed(() => this._appointments().length);
  readonly todayCount = computed(() =>
    this._appointments().filter(a => {
      const today = new Date();
      const apptDate = new Date(a.appointment_at);
      return apptDate.toDateString() === today.toDateString();
    }).length
  );

  setAppointments(appointments: Appointment[]) { this._appointments.set(appointments); }
  addAppointment(appointment: Appointment) { this._appointments.update(list => [...list, appointment]); }
  setLoading(loading: boolean) { this._loading.set(loading); }
  setError(error: string | null) { this._error.set(error); }
}
```

### 9.4 Capa Infrastructure - Codigo de Referencia

```typescript
// infrastructure/http/appointment-http.adapter.ts
@Injectable()
export class AppointmentHttpAdapter extends AppointmentPort {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponse<Appointment[]>> {
    return this.http.get<ApiResponse<Appointment[]>>('/api/Appointments');
  }

  create(data: CreateAppointmentDto): Observable<ApiResponse<Appointment>> {
    return this.http.post<ApiResponse<Appointment>>('/api/Appointments', data);
  }
}
```

### 9.5 DI Registration (app.config.ts)

```typescript
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular Core
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiUrlInterceptor, errorInterceptor])),

    // i18n
    provideTranslateService({ /* ... */ }),

    // Clean Architecture: Port -> Adapter bindings
    { provide: AppointmentPort, useClass: AppointmentHttpAdapter },
    { provide: WorkshopPort, useClass: WorkshopHttpAdapter },
    { provide: StoragePort, useClass: LocalStorageAdapter },
  ],
};
```

### 9.6 Routing (Lazy Loading)

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
  { path: 'appointments', loadChildren: () => import('./presentation/features/appointments/appointments.routes') },
  { path: 'new-appointment', loadChildren: () => import('./presentation/features/new-appointment/new-appointment.routes') },
  { path: 'appointment-success/:id', loadChildren: () => import('./presentation/features/appointment-success/appointment-success.routes') },
];
```

### 9.7 Formulario Multi-Paso

```typescript
form = new FormGroup({
  service: new FormGroup({
    place_id: new FormControl(0, Validators.required),
    service_type: new FormControl('', Validators.required),
    appointment_date: new FormControl('', Validators.required),
    appointment_time: new FormControl('', Validators.required),
  }),
  contact: new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  }),
  vehicle: new FormGroup({
    make: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl<number | null>(null),
    license_plate: new FormControl(''),
  })
});
```

---

## 10. Componentes del Diseno a Componentes Angular

| ID   | Componente Diseno        | Componente Angular              | Tipo                    |
| ---- | ------------------------ | ------------------------------- | ----------------------- |
| C-01 | Navbar                   | NavbarComponent                 | Shared / Presentational |
| C-02 | Language Selector        | LanguageSelectorComponent       | Shared / Presentational |
| C-03 | Theme Selector           | ThemeSelectorComponent          | Shared / Presentational |
| C-04 | Stat Card (x3)           | StatCardComponent               | Shared / Presentational |
| C-05 | Search Input             | SearchInputComponent            | Shared / Presentational |
| C-06 | Filter Dropdown          | FilterDropdownComponent         | Shared / Presentational |
| C-07 | Progress Bar             | ProgressBarComponent            | Shared / Presentational |
| C-08 | Loading Button           | LoadingButtonComponent          | Shared / Presentational |
| C-09 | Success Icon             | SuccessIconComponent            | Shared / Presentational |
| C-10 | Summary Row              | SummaryRowComponent             | Shared / Presentational |
| C-11 | Filters Bar              | FiltersBarComponent             | Feature / Presentational|
| C-12 | Appointment Card         | AppointmentCardComponent        | Feature / Presentational|
| C-13 | Service Form (Paso 1)    | ServiceStepComponent            | Feature / Presentational|
| C-14 | Contact Form (Paso 2)    | ContactStepComponent            | Feature / Presentational|
| C-15 | Vehicle Form (Paso 3)    | VehicleStepComponent            | Feature / Presentational|
| C-16 | Listado de Turnos        | AppointmentsComponent           | Feature / Container     |
| C-17 | Stepper Nuevo Turno      | NewAppointmentComponent         | Feature / Container     |
| C-18 | Turno Creado             | AppointmentSuccessComponent     | Feature / Container     |

---

## 11. Criterios de Evaluacion de Tecnom

| Criterio                               | Como lo cumplimos                                                |
| -------------------------------------- | ---------------------------------------------------------------- |
| Interfaz clara, usable y mantenible    | Diseno en Pencil, Tailwind CSS, patron container-presentational  |
| Codigo limpio y bien estructurado      | Clean Architecture, standalone components, signals               |
| Consumo de datos dinamicos             | HttpClient + Signals, manejo de loading/error states             |
| Manejo de errores                      | ApiResponse wrapper, mensajes claros, interceptors               |
| Documentacion                          | Comentarios en decisiones clave, README, Compodoc                |
| Calidad de codigo                      | SonarQube Quality Gate passed, coverage >= 80%, ESLint estricto  |

---

## 12. Plan de Trabajo - 10 Fases (Shift-Left Quality)

> **Principio Shift-Left:** La calidad se integra desde el inicio, no al final.
> ESLint, SonarQube y herramientas de calidad se configuran en la Fase 1.

### Fase 1 - Setup + Infraestructura de Calidad (Fundacion)

| Item | Descripcion                                                              |
| ---- | ------------------------------------------------------------------------ |
| 1.1  | Crear proyecto Angular con `ng new quick-reserve --style=css --routing --ssr=false` |
| 1.2  | Instalar y configurar Tailwind CSS v4 + PostCSS + @theme tokens          |
| 1.3  | Configurar Jest (`createCjsPreset()` + `setupFilesAfterEnv`) + setup-jest.ts |
| 1.4  | Configurar ESLint + angular-eslint (flat config v9+ estricto) + eslint-config-prettier |
| 1.5  | Configurar Prettier + .prettierrc + .prettierignore                      |
| 1.6  | Configurar Husky + lint-staged (pre-commit hooks)                        |
| 1.7  | Configurar Compodoc + .compodocrc.json                                   |
| 1.8  | Instalar y configurar ngx-translate (ES/EN)                              |
| 1.9  | Crear estructura de carpetas Clean Architecture                          |
| 1.10 | Configurar environments (API base URL localhost:5000)                     |
| 1.11 | **Configurar SonarQube** (Docker + sonar-project.properties + scripts)   |
| 1.12 | **Ejecutar primer analisis SonarQube** (baseline con 0 codigo)           |
| 1.13 | Inicializar repositorio Git + primer commit                              |
| 1.14 | **Configurar tsconfig.json strict** (noUncheckedIndexedAccess, strictTemplates) |
| 1.15 | **Habilitar Zoneless Change Detection** (`provideZonelessChangeDetection()`) |
| 1.16 | **Configurar error interceptor** centralizado                            |

**Prioridad:** Alta
**Entregable:** Proyecto compilable con infraestructura de calidad funcionando

---

### Fase 2 - Capa Domain (Modelos puros, Ports, Validators)

| Item | Descripcion                                                              |
| ---- | ------------------------------------------------------------------------ |
| 2.1  | Modelos puros: appointment, contact, vehicle, workshop, api-response     |
| 2.2  | DTO: create-appointment.dto.ts                                           |
| 2.3  | Enums: service-type.enum.ts, theme.enum.ts                               |
| 2.4  | Ports abstractos: AppointmentPort, WorkshopPort, StoragePort             |
| 2.5  | Validators puros: appointment.validator.ts (sin dependencias Angular)    |
| 2.6  | **Tests unitarios de validators** (Jest - funciones puras)               |
| 2.7  | Ejecutar analisis SonarQube                                              |

**Prioridad:** Alta
**Entregable:** Dominio completo con tests

---

### Fase 3 - Capa Application (Use Cases + State)

| Item | Descripcion                                                              |
| ---- | ------------------------------------------------------------------------ |
| 3.1  | AppointmentsState (signal-based: appointments, loading, error, computed) |
| 3.2  | WorkshopsState (signal-based: workshops, loading)                        |
| 3.3  | ThemeState (signal-based: theme preference)                              |
| 3.4  | Use cases: GetAppointmentsUseCase, CreateAppointmentUseCase             |
| 3.5  | Use cases: GetWorkshopsUseCase, FilterAppointmentsUseCase               |
| 3.6  | Mappers: AppointmentMapper, WorkshopMapper (domain <-> DTO)             |
| 3.7  | **Tests unitarios de use cases** (mockear ports con Jest)                |
| 3.8  | Ejecutar analisis SonarQube                                              |

**Prioridad:** Alta
**Entregable:** Capa de aplicacion completa con tests

---

### Fase 4 - Capa Infrastructure (Adapters + Config)

| Item | Descripcion                                                              |
| ---- | ------------------------------------------------------------------------ |
| 4.1  | AppointmentHttpAdapter (implementa AppointmentPort via HttpClient)       |
| 4.2  | WorkshopHttpAdapter (implementa WorkshopPort via HttpClient)             |
| 4.3  | LocalStorageAdapter (implementa StoragePort)                             |
| 4.4  | apiUrlInterceptor (interceptor para base URL)                            |
| 4.5  | errorInterceptor (manejo centralizado de errores HTTP)                   |
| 4.6  | translate.config.ts (configuracion ngx-translate)                        |
| 4.7  | theme.adapter.ts (manipulacion DOM para dark mode class)                 |
| 4.8  | Archivos de traduccion: es.json, en.json                                 |
| 4.9  | Configurar DI en app.config.ts (Port -> Adapter bindings + Zoneless)     |
| 4.10 | Configurar routing con lazy loading en app.routes.ts                     |
| 4.11 | Ejecutar analisis SonarQube                                              |

**Prioridad:** Alta
**Entregable:** Infraestructura completa

---

### Fase 5 - Presentation: Shared Components

| Item | Descripcion                                                              |
| ---- | ------------------------------------------------------------------------ |
| 5.1  | NavbarComponent (logo, titulo, nav controls slot)                        |
| 5.2  | LanguageSelectorComponent (globe icon, ES/EN dropdown)                   |
| 5.3  | ThemeSelectorComponent (sun/moon/monitor toggle)                         |
| 5.4  | StatCardComponent (icono, label, valor, color configurable)              |
| 5.5  | ProgressBarComponent (3 pasos, activo/pendiente)                         |
| 5.6  | SearchInputComponent (icono search, placeholder, output evento)          |
| 5.7  | FilterDropdownComponent (icono, label, opciones, output evento)          |
| 5.8  | LoadingButtonComponent (texto, loading state, disabled)                  |
| 5.9  | SuccessIconComponent (circulo verde con check animado)                   |
| 5.10 | SummaryRowComponent (icono, label, valor, divider)                       |

**Prioridad:** Alta
**Entregable:** Componentes shared reutilizables

---

### Fase 6 - Feature: Listado de Turnos

| Item | Descripcion                                                              |
| ---- | ------------------------------------------------------------------------ |
| 6.1  | AppointmentsComponent (container/smart - inyecta use cases y state)      |
| 6.2  | AppointmentCardComponent (presentational/dumb - input: appointment)      |
| 6.3  | FiltersBarComponent (presentational - inputs: workshops, services)       |
| 6.4  | Conectar container con GetAppointmentsUseCase + AppointmentsState        |
| 6.5  | Implementar busqueda y filtros via FilterAppointmentsUseCase             |
| 6.6  | Stats row con computed signals (total, todayCount, occupancy)            |
| 6.7  | @defer blocks para lazy loading del grid de cards                        |

**Prioridad:** Alta
**Entregable:** Pantalla de listado funcional

---

### Fase 7 - Feature: Nuevo Turno (Stepper)

| Item | Descripcion                                                              |
| ---- | ------------------------------------------------------------------------ |
| 7.1  | NewAppointmentComponent (container/smart - stepper state + form)         |
| 7.2  | ServiceStepComponent (presentational - Paso 1)                           |
| 7.3  | ContactStepComponent (presentational - Paso 2)                           |
| 7.4  | VehicleStepComponent (presentational - Paso 3)                           |
| 7.5  | Reactive Form multi-grupo con validaciones                               |
| 7.6  | Conectar con GetWorkshopsUseCase para dropdown de talleres               |
| 7.7  | Submit via CreateAppointmentUseCase + redireccion a success              |

**Prioridad:** Alta
**Entregable:** Flujo de creacion de turno completo

---

### Fase 8 - Feature: Turno Creado (Success) + Dark Mode + i18n

| Item | Descripcion                                                              |
| ---- | ------------------------------------------------------------------------ |
| 8.1  | AppointmentSuccessComponent (container - datos del turno creado)         |
| 8.2  | Resumen con SummaryRowComponent (6 filas)                                |
| 8.3  | Botones "Crear otro turno" y "Ver Turnos"                                |
| 8.4  | ThemeState con signal + persistencia via StoragePort                      |
| 8.5  | Configurar Tailwind dark mode (class strategy)                           |
| 8.6  | Aplicar clases dark: a todos los componentes                             |
| 8.7  | Custom colors en Tailwind para paleta dark                               |
| 8.8  | Completar archivos de traduccion es.json y en.json                       |
| 8.9  | Verificar language selector con cambio runtime                           |

**Prioridad:** Alta
**Entregable:** Success page + dark mode + i18n funcionales

---

### Fase 9 - Cobertura y Calidad Final

| Item | Descripcion                                                              |
| ---- | ------------------------------------------------------------------------ |
| 9.1  | Tests unitarios: domain validators, use cases, state, mappers            |
| 9.2  | Tests de componentes: shared components con TestBed                      |
| 9.3  | Tests de integracion: features con HttpClientTestingModule               |
| 9.4  | Ejecutar `npm run sonar:full` - analisis completo con coverage           |
| 9.5  | Revisar y corregir issues de SonarQube                                   |
| 9.6  | Verificar Quality Gate: coverage >= 80%, duplicados <= 3%, ratings A     |

**Prioridad:** Alta
**Entregable:** Codigo con calidad verificada

---

### Fase 10 - Validacion Final y Entrega

| Item  | Descripcion                                                             |
| ----- | ----------------------------------------------------------------------- |
| 10.1  | Manejo de errores y estados de carga (loading spinners, error messages) |
| 10.2  | Responsive design (mobile-first: grid-cols-1 -> grid-cols-3)           |
| 10.3  | Accesibilidad (ARIA labels, keyboard navigation, focus management)     |
| 10.4  | `ng build` sin warnings                                                |
| 10.5  | `npm run test` todos pasan                                             |
| 10.6  | SonarQube Quality Gate: PASSED                                         |
| 10.7  | Generar documentacion con Compodoc                                     |
| 10.8  | README con instrucciones de setup, arquitectura, scripts               |
| 10.9  | Subir a GitHub (compartir con alainico1, matiasguazzaroni, mngobbi)    |

**Prioridad:** Alta
**Entregable:** Proyecto listo para evaluacion

---

## 13. Dependencias entre Fases

```
┌─────────────────────────────────────────────────────────────────┐
│  FASE 1: Setup + ESLint + SonarQube (Fundacion de Calidad)      │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 2: Domain + Tests Domain                                   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 3: Application + Tests Application                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 4: Infrastructure                                          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 5: Shared Components                                       │
└─────────────────────────┬───────────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
┌───────────────────────┐   ┌───────────────────────┐
│  FASE 6: Listado      │   │  FASE 7: Stepper      │
└───────────┬───────────┘   └───────────┬───────────┘
            │                           │
            └─────────────┬─────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 8: Success + Dark Mode + i18n                              │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 9: Cobertura + Calidad Final                               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 10: Validacion Final + Entrega                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 14. Dependencias del Proyecto

```json
{
  "dependencies": {
    "@angular/core": "^19.x",
    "@angular/forms": "^19.x",
    "@angular/router": "^19.x",
    "@angular/common": "^19.x",
    "@angular/platform-browser": "^19.x",
    "rxjs": "^7.x",
    "lucide-angular": "latest",
    "@ngx-translate/core": "^16.x",
    "@ngx-translate/http-loader": "^16.x"
  },
  "devDependencies": {
    "tailwindcss": "^4.x",
    "@tailwindcss/postcss": "latest",
    "postcss": "latest",
    "jest": "latest",
    "@angular-builders/jest": "latest",
    "@types/jest": "latest",
    "jest-preset-angular": "latest",
    "angular-eslint": "latest",
    "@eslint/js": "latest",
    "typescript-eslint": "latest",
    "prettier": "latest",
    "eslint-config-prettier": "latest",
    "husky": "latest",
    "lint-staged": "latest",
    "@compodoc/compodoc": "latest",
    "sonarqube-scanner": "latest"
  },
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "ng lint",
    "lint:fix": "ng lint --fix",
    "format": "prettier --write \"src/**/*.{ts,html,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,css,json}\"",
    "docs:generate": "compodoc -p tsconfig.json -d docs --theme material",
    "docs:serve": "compodoc -p tsconfig.json -d docs --theme material -s -o",
    "sonar": "sonar-scanner",
    "sonar:full": "npm run test:coverage && npm run sonar",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,html}": ["eslint --fix", "prettier --write"],
    "*.{json,css,scss,md}": ["prettier --write"]
  }
}
```

---

## 15. Repositorio GitHub

Compartir acceso a:
- `alainico1`
- `matiasguazzaroni`
- `mngobbi`

---

## 16. Checklist de Entrega

- [ ] Codigo fuente en GitHub (publico o privado con acceso)
- [ ] README.md con instrucciones de ejecucion
- [ ] `ng build` sin warnings
- [ ] `npm run test` todos pasan con coverage >= 80%
- [ ] ESLint: 0 errores (strictTypeChecked + angular-eslint + a11y)
- [ ] SonarQube Quality Gate: PASSED
- [ ] TypeScript strict mode completo (tsconfig strict + angularCompilerOptions)
- [ ] Zoneless Change Detection habilitado
- [ ] Responsive design funcional (mobile-first)
- [ ] Dark mode funcional (10 pantallas: 5 light + 5 dark)
- [ ] i18n (ES/EN) funcional con cambio runtime
- [ ] Error handling: interceptor + error states en signals
- [ ] Documentacion Compodoc generada
- [ ] Accesibilidad WCAG AA (ARIA labels, keyboard nav, focus management)

---

## 17. Notas y Decisiones de Diseno

| ID   | Decision                                                                 | Justificacion                                                    |
| ---- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| ND-01 | No se usa Angular Material                                              | Tailwind CSS para diseno custom fiel al mockup de Pencil         |
| ND-02 | Signals sobre RxJS para estado local                                    | Angular moderno. RxJS solo para HTTP via HttpClient              |
| ND-03 | Stepper custom con signals                                              | Muestra dominio del framework sin depender de terceros           |
| ND-04 | Almacenamiento en memoria (backend)                                     | El frontend solo consume la API                                  |
| ND-05 | Lucide Icons (lucide-angular)                                           | Coincide con los iconos del diseno en Pencil                     |
| ND-06 | Sin autenticacion                                                       | El challenge no requiere auth en frontend                        |
| ND-07 | Dark Mode nativo con Tailwind class strategy                            | ThemeService + localStorage, sin librerias externas              |
| ND-08 | Pantalla de confirmacion con botones de accion                          | "Crear otro turno" + "Ver Turnos" mejora UX post-creacion       |
| ND-09 | Filtros client-side                                                     | Volumen bajo de datos (turnos en memoria)                        |
| ND-10 | Jest sobre Karma/Jasmine                                                | Mas rapido, mejor DX, no requiere browser                        |
| ND-11 | @defer blocks para lazy loading                                         | Mejora tiempo de carga, demuestra features modernas Angular      |
| ND-12 | ngx-translate sobre Angular i18n                                        | Cambio de idioma en runtime sin rebuild                          |
| ND-13 | ESLint flat config estricto (strictTypeChecked)                         | La config mas estricta de typescript-eslint + WCAG AA            |
| ND-14 | Husky + lint-staged                                                     | Ningun codigo mal formateado llega al repositorio                |
| ND-15 | Compodoc                                                                | Documentacion automatica del proyecto Angular                    |
| ND-16 | ESLint + SonarQube = Estrategia completa de calidad                     | ESLint dev-time + SonarQube post-commit = cobertura total        |
| ND-17 | Clean Architecture Full en Frontend                                     | Coherencia full-stack con backend .NET, inversion de dependencias|
| ND-18 | Cards sin badge de estado                                               | Backend no devuelve campo de estado en el DTO                    |
| ND-19 | Cards con datos opcionales                                              | AppointmentCardComponent maneja campos con @if condicional       |
| ND-20 | Zoneless Change Detection                                               | Production-ready en Angular 20, elimina Zone.js overhead         |
| ND-21 | TypeScript strict completo (noUncheckedIndexedAccess, etc.)             | Maximo type safety, previene errores en runtime                  |
| ND-22 | Error interceptor centralizado                                          | Manejo uniforme de errores HTTP en toda la app                   |
| ND-23 | Tailwind v4 @theme directive (CSS-first config)                         | Sin tailwind.config.js, design tokens como CSS custom properties |
| ND-24 | eslint-config-prettier en flat config                                   | Evita conflictos entre reglas de ESLint y Prettier               |
| ND-25 | `effect()` para sync de theme con localStorage                          | Side effect reactivo, se ejecuta cuando el signal de theme cambia|
| ND-26 | `createCjsPreset()` para Jest config                                    | Forma moderna de jest-preset-angular v14+, reemplaza `preset:`   |

---

Documento generado el 27/02/2026 - Actualizado 28/02/2026 v5.0 (Zoneless + tsconfig strict + @theme + error handling + jest fix)
Proyecto: QuickReserve - Challenge Tecnom
Autor: Milton

---

## Tags

#QuickReserve #Frontend #Angular #CleanArchitecture #Challenge #Tecnom #SonarQube #ESLint #TailwindCSS #ShiftLeft #Zoneless #StrictTypeScript
