/**
 * Contact information for an appointment.
 * Maps to the backend Contact DTO.
 *
 * @example
 * ```typescript
 * const contact: Contact = {
 *   name: 'Juan Perez',
 *   email: 'juan@email.com',
 *   whatsapp: '+54 11 1234-5678',
 * };
 * ```
 */
export interface Contact {
  readonly name: string;
  readonly email: string;
  readonly whatsapp: string;
}
