import { computed, Injectable, signal } from '@angular/core';

import type { Appointment } from '../../domain/models/appointment.model';

/**
 * Signal-based state management for appointments.
 * Singleton service that holds the reactive state for the appointments feature.
 *
 * Exposes readonly signals for components and writable methods for use cases.
 * Follows the pattern: private writable signals + public readonly signals + computed.
 */
@Injectable({ providedIn: 'root' })
export class AppointmentsState {
  /** Private writable signals */
  private readonly _appointments = signal<Appointment[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  /** Public readonly signals for components */
  readonly appointments = this._appointments.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  /** Computed signals for derived state */
  readonly total = computed(() => this._appointments().length);

  readonly todayCount = computed(() => {
    const today = new Date().toDateString();
    return this._appointments().filter((a) => new Date(a.appointmentAt).toDateString() === today)
      .length;
  });

  /** State mutation methods (called by use cases only) */

  setAppointments(appointments: Appointment[]): void {
    this._appointments.set(appointments);
  }

  addAppointment(appointment: Appointment): void {
    this._appointments.update((list) => [...list, appointment]);
  }

  setLoading(loading: boolean): void {
    this._loading.set(loading);
  }

  setError(error: string | null): void {
    this._error.set(error);
  }

  /** Reset state to initial values */
  reset(): void {
    this._appointments.set([]);
    this._loading.set(false);
    this._error.set(null);
  }
}
