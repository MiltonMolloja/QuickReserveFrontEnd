import type { CreateAppointmentDto } from '../models/create-appointment.dto';
import type { ValidationError } from '../models/validation-error.model';

/** Regex pattern for email validation (requires TLD, e.g. user@domain.com) */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Regex pattern for phone/whatsapp validation (digits, +, spaces, dashes, min 6 chars) */
export const PHONE_REGEX = /^\+?[\d\s-]{6,}$/;

/**
 * Validates a CreateAppointmentDto and returns an array of validation errors.
 * This is a pure function with no Angular dependencies — core domain logic.
 *
 * Validates:
 * - placeId: must be a positive number (workshop selection)
 * - serviceType: must be a non-empty string
 * - appointmentAt: must be a non-empty string representing a future date
 * - contact.name: must be a non-empty string
 * - contact.email: must be a valid email format
 * - contact.whatsapp: must be a non-empty string
 *
 * Vehicle fields are optional and not validated (RF-02.8).
 *
 * @param data - Partial DTO to validate (allows incomplete data for step-by-step validation)
 * @returns Array of validation errors (empty array means valid)
 *
 * @example
 * ```typescript
 * const errors = validateAppointment({});
 * // Returns 6 errors: placeId, serviceType, appointmentAt, name, email, whatsapp
 *
 * const errors = validateAppointment(validDto);
 * // Returns [] (empty = valid)
 * ```
 */
export function validateAppointment(data: Partial<CreateAppointmentDto>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Step 1: Service information
  if (!data.placeId || data.placeId <= 0) {
    errors.push({ field: 'placeId', message: 'Debe seleccionar un taller' });
  }

  if (!data.serviceType?.trim()) {
    errors.push({ field: 'serviceType', message: 'El tipo de servicio es requerido' });
  }

  if (!data.appointmentAt) {
    errors.push({ field: 'appointmentAt', message: 'La fecha y hora son requeridas' });
  } else if (new Date(data.appointmentAt) <= new Date()) {
    errors.push({ field: 'appointmentAt', message: 'La fecha debe ser futura' });
  }

  // Step 2: Contact information
  const contact = data.contact;
  if (!contact?.name.trim()) {
    errors.push({ field: 'contact.name', message: 'El nombre es requerido' });
  }

  if (!contact?.email.trim()) {
    errors.push({ field: 'contact.email', message: 'El email es requerido' });
  } else if (!EMAIL_REGEX.test(contact.email)) {
    errors.push({ field: 'contact.email', message: 'El formato del email no es valido' });
  }

  if (!contact?.whatsapp.trim()) {
    errors.push({ field: 'contact.whatsapp', message: 'El telefono es requerido' });
  } else if (!PHONE_REGEX.test(contact.whatsapp)) {
    errors.push({ field: 'contact.whatsapp', message: 'El formato del telefono no es valido' });
  }

  return errors;
}

/**
 * Validates only Step 1 fields (service information).
 * Used for step-by-step validation in the stepper form.
 *
 * @param data - Partial DTO with step 1 fields
 * @returns Array of validation errors for step 1 fields only
 */
export function validateServiceStep(
  data: Partial<Pick<CreateAppointmentDto, 'placeId' | 'serviceType' | 'appointmentAt'>>,
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.placeId || data.placeId <= 0) {
    errors.push({ field: 'placeId', message: 'Debe seleccionar un taller' });
  }

  if (!data.serviceType?.trim()) {
    errors.push({ field: 'serviceType', message: 'El tipo de servicio es requerido' });
  }

  if (!data.appointmentAt) {
    errors.push({ field: 'appointmentAt', message: 'La fecha y hora son requeridas' });
  } else if (new Date(data.appointmentAt) <= new Date()) {
    errors.push({ field: 'appointmentAt', message: 'La fecha debe ser futura' });
  }

  return errors;
}

/**
 * Validates only Step 2 fields (contact information).
 * Used for step-by-step validation in the stepper form.
 *
 * @param data - Contact fields to validate
 * @returns Array of validation errors for step 2 fields only
 */
export function validateContactStep(
  data: Partial<CreateAppointmentDto['contact']> | undefined,
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data?.name?.trim()) {
    errors.push({ field: 'contact.name', message: 'El nombre es requerido' });
  }

  if (!data?.email?.trim()) {
    errors.push({ field: 'contact.email', message: 'El email es requerido' });
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.push({ field: 'contact.email', message: 'El formato del email no es valido' });
  }

  if (!data?.whatsapp?.trim()) {
    errors.push({ field: 'contact.whatsapp', message: 'El telefono es requerido' });
  } else if (!PHONE_REGEX.test(data.whatsapp)) {
    errors.push({ field: 'contact.whatsapp', message: 'El formato del telefono no es valido' });
  }

  return errors;
}
