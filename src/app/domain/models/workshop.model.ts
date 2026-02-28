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
