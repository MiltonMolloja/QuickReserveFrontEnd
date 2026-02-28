/**
 * Represents a validation error for a specific field.
 * Used by domain validators to return structured error information.
 *
 * @example
 * ```typescript
 * const error: ValidationError = {
 *   field: 'contact.email',
 *   message: 'El formato del email no es valido',
 * };
 * ```
 */
export interface ValidationError {
  readonly field: string;
  readonly message: string;
}
