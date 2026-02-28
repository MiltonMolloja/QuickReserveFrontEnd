import type { Contact } from './contact.model';
import type { Vehicle } from './vehicle.model';

/**
 * DTO for creating a new appointment.
 * Maps to the backend CreateAppointmentRequest.
 *
 * Note: Field names use snake_case to match the backend API contract.
 * The mapper layer handles camelCase <-> snake_case conversion.
 *
 * @example
 * ```typescript
 * const dto: CreateAppointmentDto = {
 *   placeId: 1,
 *   appointmentAt: '2026-03-15T10:00:00Z',
 *   serviceType: 'MANTENIMIENTO',
 *   contact: { name: 'Juan', email: 'juan@email.com', phone: '1234' },
 * };
 * ```
 */
export interface CreateAppointmentDto {
  readonly placeId: number;
  readonly appointmentAt: string;
  readonly serviceType: string;
  readonly contact: Contact;
  readonly vehicle?: Vehicle;
}
