import type { Contact } from './contact.model';
import type { Vehicle } from './vehicle.model';

/**
 * Appointment (turno) entity.
 * Maps to the backend AppointmentResponse DTO.
 * Core domain model representing a workshop appointment.
 *
 * @example
 * ```typescript
 * const appointment: Appointment = {
 *   id: 'abc-123',
 *   placeId: 1,
 *   appointmentAt: '2026-03-15T10:00:00Z',
 *   serviceType: 'MANTENIMIENTO',
 *   contact: { name: 'Juan', email: 'juan@email.com', whatsapp: '1234' },
 *   createdAt: '2026-02-28T12:00:00Z',
 * };
 * ```
 */
export interface Appointment {
  readonly id: string;
  readonly placeId: number;
  readonly appointmentAt: string;
  readonly serviceType: string;
  readonly contact: Contact;
  readonly vehicle?: Vehicle;
  readonly createdAt: string;
}
