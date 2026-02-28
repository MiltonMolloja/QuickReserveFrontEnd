/**
 * Standard API response wrapper.
 * All backend endpoints return data wrapped in this structure.
 *
 * @typeParam T - The type of the data payload
 *
 * @example
 * ```typescript
 * // Success response
 * const success: ApiResponse<Workshop[]> = {
 *   success: true,
 *   data: [{ id: 1, name: 'Taller Central', ... }],
 *   errors: null,
 * };
 *
 * // Error response
 * const error: ApiResponse<null> = {
 *   success: false,
 *   data: null,
 *   errors: ['El campo email es requerido'],
 * };
 * ```
 */
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data: T | null;
  readonly errors: string[] | null;
}
