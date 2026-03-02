import { inject, Injectable } from '@angular/core';

import type { Appointment } from '../../domain/models/appointment.model';
import { AppointmentsState } from '../state/appointments.state';

/**
 * Use case: Get occupied time slots for a given workshop and date.
 *
 * Compares the existing appointments against the selected workshop (placeId)
 * and date to determine which hourly slots are already taken.
 * Assumes one appointment per workshop per time slot.
 *
 * @example
 * ```typescript
 * const occupied = useCase.execute(1, '2026-03-15');
 * // Returns: ['10:00', '14:00'] — those slots are taken
 * ```
 */
@Injectable({ providedIn: 'root' })
export class GetOccupiedSlotsUseCase {
  private readonly state = inject(AppointmentsState);

  /**
   * Returns an array of occupied time strings (e.g., ['10:00', '14:00'])
   * for the given workshop and date.
   *
   * @param placeId - The workshop ID to filter by
   * @param date - The date in YYYY-MM-DD format to filter by
   * @returns Array of occupied time slot strings in HH:00 format
   */
  execute(placeId: number, date: string): readonly string[] {
    if (!placeId || !date) {
      return [];
    }

    const appointments = this.state.appointments();
    return this.getOccupiedSlots(appointments, placeId, date);
  }

  /**
   * Pure function to extract occupied slots from appointments.
   * Exported for testability without state dependency.
   */
  getOccupiedSlots(
    appointments: readonly Appointment[],
    placeId: number,
    date: string,
  ): readonly string[] {
    return appointments
      .filter((a) => a.placeId === placeId && a.appointmentAt.startsWith(date))
      .map((a) => {
        const timePart = a.appointmentAt.split('T')[1] ?? '';
        const [hours] = timePart.split(':');
        return `${hours ?? '00'}:00`;
      });
  }
}
