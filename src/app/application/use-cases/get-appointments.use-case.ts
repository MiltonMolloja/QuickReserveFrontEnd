import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import type { Appointment } from '../../domain/models/appointment.model';
import { AppointmentPort } from '../../domain/ports/appointment.port';
import { appointmentListFromApi, type AppointmentApiDto } from '../mappers/appointment.mapper';
import { AppointmentsState } from '../state/appointments.state';

/**
 * Use case: Get all appointments from the API.
 * Orchestrates the flow: Port -> Mapper -> State.
 *
 * - Calls AppointmentPort.getAll() to fetch raw data
 * - Maps API DTOs (snake_case) to domain models (camelCase)
 * - Updates AppointmentsState with the result
 * - Handles loading and error states
 */
@Injectable({ providedIn: 'root' })
export class GetAppointmentsUseCase {
  private readonly port = inject(AppointmentPort);
  private readonly state = inject(AppointmentsState);

  /**
   * Executes the use case: fetches all appointments and updates state.
   * Components should subscribe to this observable to trigger the fetch.
   */
  execute(): void {
    this.state.setLoading(true);
    this.state.setError(null);

    this.port
      .getAll()
      .pipe(
        tap({
          next: (response) => {
            if (response.success && response.data) {
              const appointments: Appointment[] = appointmentListFromApi(
                response.data as unknown as AppointmentApiDto[],
              );
              this.state.setAppointments(appointments);
            } else {
              this.state.setError(response.errors?.join(', ') ?? 'Error al cargar los turnos');
            }
            this.state.setLoading(false);
          },
          error: () => {
            this.state.setError('Error de conexion al cargar los turnos');
            this.state.setLoading(false);
          },
        }),
      )
      .subscribe();
  }
}
