/**
 * Workshop (taller) entity.
 * Maps to the backend WorkshopResponse DTO.
 *
 * @example
 * ```typescript
 * const workshop: Workshop = {
 *   id: 1,
 *   name: 'Taller Central',
 *   address: 'Av. Corrientes 1234',
 *   email: 'taller@email.com',
 *   whatsapp: '+54 11 9876-5432',
 * };
 * ```
 */
export interface Workshop {
  readonly id: number;
  readonly name: string;
  readonly address: string;
  readonly email: string;
  readonly whatsapp: string;
}

/** Maximum number of appointments a workshop can handle per day */
export const MAX_DAILY_APPOINTMENTS_PER_WORKSHOP = 9;
