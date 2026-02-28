/**
 * Vehicle information for an appointment.
 * All fields are optional as per RF-02.8.
 * Maps to the backend Vehicle DTO.
 *
 * @example
 * ```typescript
 * const vehicle: Vehicle = {
 *   make: 'Toyota',
 *   model: 'Corolla',
 *   year: 2023,
 *   licensePlate: 'AB 123 CD',
 * };
 * ```
 */
export interface Vehicle {
  readonly make?: string;
  readonly model?: string;
  readonly year?: number;
  readonly licensePlate?: string;
}
