import { computed, inject, Injectable, signal } from '@angular/core';

import type { Appointment } from '../../domain/models/appointment.model';
import { AppointmentsState } from '../state/appointments.state';

/**
 * Filter criteria for appointments.
 * All fields are optional — empty/null means "no filter".
 */
export interface AppointmentFilters {
  readonly search: string;
  readonly workshopId: number | null;
  readonly serviceType: string;
  readonly date: string;
}

/** Default empty filters */
const EMPTY_FILTERS: AppointmentFilters = {
  search: '',
  workshopId: null,
  serviceType: '',
  date: '',
};

/**
 * Use case: Filter appointments client-side.
 * Uses signals for reactive filtering — components read `filteredAppointments()`
 * and it automatically updates when filters or appointments change.
 *
 * Filtering is client-side because the data volume is low (ND-09).
 */
@Injectable({ providedIn: 'root' })
export class FilterAppointmentsUseCase {
  private readonly appointmentsState = inject(AppointmentsState);

  /** Current filter values (writable) */
  private readonly _filters = signal<AppointmentFilters>(EMPTY_FILTERS);

  /** Public readonly filters signal */
  readonly filters = this._filters.asReadonly();

  /** Computed: filtered appointments based on current filters */
  readonly filteredAppointments = computed<Appointment[]>(() => {
    const appointments = this.appointmentsState.appointments();
    const filters = this._filters();

    return appointments.filter((appointment) => {
      // Search filter: matches name or email (case-insensitive)
      if (filters.search.trim()) {
        const searchLower = filters.search.toLowerCase();
        const matchesName = appointment.contact.name.toLowerCase().includes(searchLower);
        const matchesEmail = appointment.contact.email.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesEmail) {
          return false;
        }
      }

      // Workshop filter
      if (filters.workshopId !== null && appointment.placeId !== filters.workshopId) {
        return false;
      }

      // Service type filter
      if (
        filters.serviceType.trim() &&
        appointment.serviceType.toLowerCase() !== filters.serviceType.toLowerCase()
      ) {
        return false;
      }

      // Date filter: matches appointment date (ignoring time)
      if (filters.date.trim()) {
        const appointmentDate = new Date(appointment.appointmentAt).toISOString().split('T')[0];
        if (appointmentDate !== filters.date) {
          return false;
        }
      }

      return true;
    });
  });

  /** Computed: count of filtered results */
  readonly filteredCount = computed(() => this.filteredAppointments().length);

  /** Update filters (partial update supported) */
  updateFilters(partial: Partial<AppointmentFilters>): void {
    this._filters.update((current) => ({ ...current, ...partial }));
  }

  /** Reset all filters to empty */
  clearFilters(): void {
    this._filters.set(EMPTY_FILTERS);
  }
}
