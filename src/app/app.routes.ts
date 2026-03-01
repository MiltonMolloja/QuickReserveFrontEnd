import type { Routes } from '@angular/router';

/**
 * Application routes with lazy loading.
 * Each feature module is loaded on demand for optimal bundle splitting.
 *
 * Route structure:
 * - /appointments          -> Listado de turnos (default)
 * - /new-appointment       -> Stepper de creacion (3 pasos)
 * - /appointment-success   -> Pantalla de confirmacion
 * - /appointment-error     -> Pantalla de error al crear turno
 */
export const routes: Routes = [
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./presentation/features/appointments/appointments.component').then(
        (m) => m.AppointmentsComponent,
      ),
  },
  {
    path: 'new-appointment',
    loadComponent: () =>
      import('./presentation/features/new-appointment/new-appointment.component').then(
        (m) => m.NewAppointmentComponent,
      ),
  },
  {
    path: 'appointment-success',
    loadComponent: () =>
      import('./presentation/features/appointment-success/appointment-success.component').then(
        (m) => m.AppointmentSuccessComponent,
      ),
  },
  {
    path: 'appointment-error',
    loadComponent: () =>
      import('./presentation/features/appointment-error/appointment-error.component').then(
        (m) => m.AppointmentErrorComponent,
      ),
  },
  { path: '**', redirectTo: 'appointments' },
];
