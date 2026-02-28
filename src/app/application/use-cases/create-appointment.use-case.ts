import { inject, Injectable } from '@angular/core';
import { type Observable, map, tap } from 'rxjs';

import type { Appointment } from '../../domain/models/appointment.model';
import type { CreateAppointmentDto } from '../../domain/models/create-appointment.dto';
import type { ValidationError } from '../../domain/models/validation-error.model';
import { AppointmentPort } from '../../domain/ports/appointment.port';
import { validateAppointment } from '../../domain/validators/appointment.validator';
import { appointmentFromApi, appointmentToApi, type AppointmentApiDto } from '../mappers/appointment.mapper';
import { AppointmentsState } from '../state/appointments.state';

/**
 * Custom error class for domain validation failures.
 * Wraps an array of ValidationError for structured error handling.
 */
export class AppointmentValidationError extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super(errors.map((e) => e.message).join(', '));
    this.name = 'AppointmentValidationError';
  }
}

/**
 * Use case: Create a new appointment.
 * Orchestrates: Validate -> Map -> Port -> Map -> State.
 *
 * - Validates the DTO using domain validators
 * - Maps domain DTO to API format (camelCase -> snake_case)
 * - Calls AppointmentPort.create()
 * - Maps the response back to domain model
 * - Adds the new appointment to state
 */
@Injectable({ providedIn: 'root' })
export class CreateAppointmentUseCase {
  private readonly port = inject(AppointmentPort);
  private readonly state = inject(AppointmentsState);

  /**
   * Executes the use case: validates, creates, and updates state.
   *
   * @param data - The appointment data to create
   * @returns Observable<Appointment> on success
   * @throws AppointmentValidationError if validation fails (synchronous)
   */
  execute(data: CreateAppointmentDto): Observable<Appointment> {
    // Step 1: Domain validation (synchronous)
    const errors: ValidationError[] = validateAppointment(data);
    if (errors.length > 0) {
      throw new AppointmentValidationError(errors);
    }

    // Step 2: Set loading state
    this.state.setLoading(true);
    this.state.setError(null);

    // Step 3: Map to API format and call port
    const apiDto = appointmentToApi(data);

    return this.port.create(apiDto as unknown as CreateAppointmentDto).pipe(
      map((response) => {
        if (response.success && response.data) {
          return appointmentFromApi(response.data as unknown as AppointmentApiDto);
        }
        throw new Error(response.errors?.join(', ') ?? 'Error al crear el turno');
      }),
      tap({
        next: (appointment) => {
          this.state.addAppointment(appointment);
          this.state.setLoading(false);
        },
        error: () => {
          this.state.setLoading(false);
        },
      }),
    );
  }
}
