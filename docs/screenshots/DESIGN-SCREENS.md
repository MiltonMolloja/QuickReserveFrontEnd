# QuickReserve - Design Screens Reference

> Screenshots from `ReserveDiseño.pen` - Pencil design file
> Generated: 2026-03-02

## Screen Inventory (18 frames)

### Desktop - Light Theme

| # | Screen | Node ID | Size |
|---|--------|---------|------|
| 1 | Appointments List - Light | `6p4dr` | 1440x900 |
| 2 | New Appointment Step 1 (Service) - Light | `jp7Io` | 1440x900 |
| 3 | New Appointment Step 2 (Contact) - Light | `T4JC3` | 1440x900 |
| 4 | New Appointment Step 3 (Vehicle) - Light | `2c8Cv` | 1440x900 |
| 5 | Appointment Success - Light | `nDk9U` | 1440x900 |
| 6 | Appointment Error - Light | `oBLbv` | 1440x900 |

### Desktop - Dark Theme

| # | Screen | Node ID | Size |
|---|--------|---------|------|
| 7 | Appointments List - Dark | `LnX7t` | 1440x900 |
| 8 | New Appointment Step 1 (Service) - Dark | `OwRb4` | 1440x900 |
| 9 | New Appointment Step 2 (Contact) - Dark | `BCceE` | 1440x900 |
| 10 | New Appointment Step 3 (Vehicle) - Dark | `5xZNZ` | 1440x900 |
| 11 | Appointment Success - Dark | `hSjNi` | 1440x900 |
| 12 | Appointment Error - Dark | `5D2ic` | 1440x900 |

### Mobile

| # | Screen | Node ID | Size |
|---|--------|---------|------|
| 13 | Appointments List - Mobile Light | `qgvWC` | 375x812 |
| 14 | Appointments List - Mobile Dark | `l8dGb` | 375x812 |

### Component Designs

| # | Component | Node ID | Size |
|---|-----------|---------|------|
| 15 | Time Picker - Light | `kkpRM` | 480x580 |
| 16 | Time Picker - Dark | `gUulT` | 480x580 |
| 17 | Date Picker - Light | `kt1cz` | 420x620 |
| 18 | Date Picker - Dark | `XWa9D` | 420x620 |

## Screen Descriptions

### 1. Appointments List (Desktop)
- **Navbar**: Logo "Sistema de Turnos", language selector (ES), dark mode toggle, "+ Nuevo Turno" button
- **Stats Bar**: 3 stat cards (Total de Turnos: 12, Turnos Hoy: 3, Ocupacion Talleres: 75%)
- **Filters**: Search input, Workshop dropdown, Service dropdown, Date picker
- **Cards Grid**: 3-column grid of appointment cards showing service type, workshop, date/time, contact info, vehicle info

### 2. New Appointment - Step 1 (Service Info)
- **Progress Bar**: Step 1 of 3 highlighted
- **Form**: Workshop selector (with address preview), Service type dropdown, Date picker, Time picker
- **Actions**: Cancel link, "Siguiente" (Next) button

### 3. New Appointment - Step 2 (Contact Info)
- **Progress Bar**: Step 2 of 3 highlighted
- **Form**: Full name, Email, Phone/WhatsApp
- **Actions**: "Anterior" (Back) link, "Siguiente" (Next) button

### 4. New Appointment - Step 3 (Vehicle Info)
- **Progress Bar**: Step 3 of 3 highlighted
- **Info Banner**: "La informacion del vehiculo es opcional..."
- **Form**: Brand, Model, Year, License Plate (2 columns)
- **Actions**: "Anterior" (Back) link, "Crear Turno" (Create Appointment) button

### 5. Appointment Success
- **Success Icon**: Green checkmark circle
- **Title**: "Turno Creado Exitosamente!"
- **Summary Card**: Service, Workshop, Date, Time, Contact, Vehicle rows
- **Actions**: "+ Crear otro turno", "Ver Turnos" button

### 6. Appointment Error
- **Error Icon**: Red X circle
- **Title**: "Error al Crear el Turno"
- **Error Details Card**: Error code (HTTP 500), Message, Suggestions list
- **Actions**: "Reintentar" link, "Volver al Inicio" button

### 7-12. Dark Theme Variants
Same layouts as 1-6 with dark color scheme (`#0f1117` background)

### 13-14. Mobile Variants
- Responsive single-column layout (375px width)
- Stacked stat cards
- Full-width filters
- Single-column appointment cards

### 15-16. Time Picker Component
- Input field with clock icon
- Helper text: "Selecciona un horario disponible (09:00 - 17:00)"
- 3-column grid of time slots (09:00 - 17:00)
- States: Available (outline), Selected (filled primary), Disabled (grayed out)
- Legend: Disponible / Seleccionado / No disponible

### 17-18. Date Picker Component
- Input field with calendar icon and chevron
- Calendar grid: Month/Year header, navigation arrows, weekday headers, date cells
- States: Today (filled primary), Available, Past dates (dimmed)
- "Hoy" (Today) quick-select button
