import type { CreateAppointmentDto } from '../models/create-appointment.dto';
import {
  validateAppointment,
  validateContactStep,
  validateServiceStep,
} from './appointment.validator';

/**
 * Creates a valid CreateAppointmentDto for testing.
 * Uses a future date to ensure date validation passes.
 */
function createValidDto(): CreateAppointmentDto {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  return {
    placeId: 1,
    appointmentAt: futureDate.toISOString(),
    serviceType: 'Mantenimiento',
    contact: {
      name: 'Juan Perez',
      email: 'juan@email.com',
      whatsapp: '+54 11 1234-5678',
    },
  };
}

describe('validateAppointment', () => {
  it('should return no errors for a valid appointment', () => {
    const result = validateAppointment(createValidDto());
    expect(result).toHaveLength(0);
  });

  it('should return no errors when optional vehicle is provided', () => {
    const dto: CreateAppointmentDto = {
      ...createValidDto(),
      vehicle: {
        make: 'Toyota',
        model: 'Corolla',
        year: 2023,
        licensePlate: 'AB 123 CD',
      },
    };
    const result = validateAppointment(dto);
    expect(result).toHaveLength(0);
  });

  it('should return all errors for an empty object', () => {
    const result = validateAppointment({});
    expect(result).toHaveLength(6);

    const fields = result.map((e) => e.field);
    expect(fields).toContain('placeId');
    expect(fields).toContain('serviceType');
    expect(fields).toContain('appointmentAt');
    expect(fields).toContain('contact.name');
    expect(fields).toContain('contact.email');
    expect(fields).toContain('contact.whatsapp');
  });

  describe('placeId validation', () => {
    it('should return error when placeId is 0', () => {
      const dto = { ...createValidDto(), placeId: 0 };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'placeId')).toBe(true);
    });

    it('should return error when placeId is negative', () => {
      const dto = { ...createValidDto(), placeId: -1 };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'placeId')).toBe(true);
    });

    it('should pass when placeId is a positive number', () => {
      const dto = { ...createValidDto(), placeId: 5 };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'placeId')).toBe(false);
    });
  });

  describe('serviceType validation', () => {
    it('should return error when serviceType is empty', () => {
      const dto = { ...createValidDto(), serviceType: '' };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'serviceType')).toBe(true);
    });

    it('should return error when serviceType is whitespace only', () => {
      const dto = { ...createValidDto(), serviceType: '   ' };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'serviceType')).toBe(true);
    });

    it('should pass when serviceType is a valid string', () => {
      const dto = { ...createValidDto(), serviceType: 'Reparacion' };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'serviceType')).toBe(false);
    });
  });

  describe('appointmentAt validation', () => {
    it('should return error when appointmentAt is empty', () => {
      const dto = { ...createValidDto(), appointmentAt: '' };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'appointmentAt')).toBe(true);
    });

    it('should return error when appointmentAt is in the past', () => {
      const pastDate = new Date('2020-01-01T10:00:00Z');
      const dto = { ...createValidDto(), appointmentAt: pastDate.toISOString() };
      const result = validateAppointment(dto);
      const error = result.find((e) => e.field === 'appointmentAt');
      expect(error).toBeDefined();
      expect(error?.message).toBe('La fecha debe ser futura');
    });

    it('should pass when appointmentAt is in the future', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const dto = { ...createValidDto(), appointmentAt: futureDate.toISOString() };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'appointmentAt')).toBe(false);
    });
  });

  describe('contact.name validation', () => {
    it('should return error when name is missing', () => {
      const dto = {
        ...createValidDto(),
        contact: { ...createValidDto().contact, name: '' },
      };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'contact.name')).toBe(true);
    });

    it('should return error when name is whitespace only', () => {
      const dto = {
        ...createValidDto(),
        contact: { ...createValidDto().contact, name: '   ' },
      };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'contact.name')).toBe(true);
    });
  });

  describe('contact.email validation', () => {
    it('should return error when email is missing', () => {
      const dto = {
        ...createValidDto(),
        contact: { ...createValidDto().contact, email: '' },
      };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'contact.email')).toBe(true);
    });

    it('should return error for invalid email format', () => {
      const dto = {
        ...createValidDto(),
        contact: { ...createValidDto().contact, email: 'not-an-email' },
      };
      const result = validateAppointment(dto);
      const error = result.find((e) => e.field === 'contact.email');
      expect(error).toBeDefined();
      expect(error?.message).toBe('El formato del email no es valido');
    });

    it('should return error for email without domain', () => {
      const dto = {
        ...createValidDto(),
        contact: { ...createValidDto().contact, email: 'user@' },
      };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'contact.email')).toBe(true);
    });

    it('should pass for valid email', () => {
      const dto = {
        ...createValidDto(),
        contact: { ...createValidDto().contact, email: 'test@example.com' },
      };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'contact.email')).toBe(false);
    });
  });

  describe('contact.whatsapp validation', () => {
    it('should return error when whatsapp is missing', () => {
      const dto = {
        ...createValidDto(),
        contact: { ...createValidDto().contact, whatsapp: '' },
      };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'contact.whatsapp')).toBe(true);
    });

    it('should return error when whatsapp is whitespace only', () => {
      const dto = {
        ...createValidDto(),
        contact: { ...createValidDto().contact, whatsapp: '   ' },
      };
      const result = validateAppointment(dto);
      expect(result.some((e) => e.field === 'contact.whatsapp')).toBe(true);
    });
  });
});

describe('validateServiceStep', () => {
  it('should return no errors for valid step 1 data', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);

    const result = validateServiceStep({
      placeId: 1,
      serviceType: 'Mantenimiento',
      appointmentAt: futureDate.toISOString(),
    });
    expect(result).toHaveLength(0);
  });

  it('should return all errors for empty step 1 data', () => {
    const result = validateServiceStep({});
    expect(result).toHaveLength(3);

    const fields = result.map((e) => e.field);
    expect(fields).toContain('placeId');
    expect(fields).toContain('serviceType');
    expect(fields).toContain('appointmentAt');
  });

  it('should validate only step 1 fields (no contact fields)', () => {
    const result = validateServiceStep({});
    const fields = result.map((e) => e.field);
    expect(fields).not.toContain('contact.name');
    expect(fields).not.toContain('contact.email');
    expect(fields).not.toContain('contact.whatsapp');
  });
});

describe('validateContactStep', () => {
  it('should return no errors for valid contact data', () => {
    const result = validateContactStep({
      name: 'Juan Perez',
      email: 'juan@email.com',
      whatsapp: '+54 11 1234-5678',
    });
    expect(result).toHaveLength(0);
  });

  it('should return all errors for undefined contact', () => {
    const result = validateContactStep(undefined);
    expect(result).toHaveLength(3);

    const fields = result.map((e) => e.field);
    expect(fields).toContain('contact.name');
    expect(fields).toContain('contact.email');
    expect(fields).toContain('contact.whatsapp');
  });

  it('should return all errors for empty contact', () => {
    const result = validateContactStep({});
    expect(result).toHaveLength(3);
  });

  it('should validate email format', () => {
    const result = validateContactStep({
      name: 'Juan',
      email: 'invalid-email',
      whatsapp: '+54 11 1234-5678',
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.field).toBe('contact.email');
    expect(result[0]?.message).toBe('El formato del email no es valido');
  });

  it('should reject email without TLD (e.g. user@domain)', () => {
    const result = validateContactStep({
      name: 'Juan',
      email: 'user@domain',
      whatsapp: '+54 11 1234-5678',
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.field).toBe('contact.email');
  });

  it('should validate whatsapp format', () => {
    const result = validateContactStep({
      name: 'Juan',
      email: 'juan@email.com',
      whatsapp: 'abc',
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.field).toBe('contact.whatsapp');
    expect(result[0]?.message).toBe('El formato del telefono no es valido');
  });

  it('should accept valid whatsapp formats', () => {
    const validNumbers = ['+54 11 1234-5678', '1234567890', '+1-555-123-4567'];
    for (const whatsapp of validNumbers) {
      const result = validateContactStep({
        name: 'Juan',
        email: 'juan@email.com',
        whatsapp,
      });
      expect(result).toHaveLength(0);
    }
  });

  it('should validate only contact fields (no service fields)', () => {
    const result = validateContactStep({});
    const fields = result.map((e) => e.field);
    expect(fields).not.toContain('placeId');
    expect(fields).not.toContain('serviceType');
    expect(fields).not.toContain('appointmentAt');
  });
});
