import type { CreateAppointmentDto } from '../../domain/models/create-appointment.dto';
import {
  appointmentFromApi,
  appointmentListFromApi,
  appointmentToApi,
  type AppointmentApiDto,
} from './appointment.mapper';

const API_DTO: AppointmentApiDto = {
  id: 'abc-123',
  place_id: 1,
  appointment_at: '2026-03-15T10:00:00Z',
  service_type: 'Mantenimiento',
  contact: {
    name: 'Juan Perez',
    email: 'juan@email.com',
    whatsapp: '+54 11 1234-5678',
  },
  vehicle: {
    make: 'Toyota',
    model: 'Corolla',
    year: 2023,
    license_plate: 'AB 123 CD',
  },
  created_at: '2026-02-28T12:00:00Z',
};

const API_DTO_NO_VEHICLE: AppointmentApiDto = {
  id: 'def-456',
  place_id: 2,
  appointment_at: '2026-04-01T14:00:00Z',
  service_type: 'Reparacion',
  contact: {
    name: 'Maria Lopez',
    email: 'maria@email.com',
    whatsapp: '+54 11 9876-5432',
  },
  created_at: '2026-02-28T13:00:00Z',
};

describe('AppointmentMapper', () => {
  describe('appointmentFromApi', () => {
    it('should map snake_case API DTO to camelCase domain model', () => {
      const result = appointmentFromApi(API_DTO);

      expect(result.id).toBe('abc-123');
      expect(result.placeId).toBe(1);
      expect(result.appointmentAt).toBe('2026-03-15T10:00:00Z');
      expect(result.serviceType).toBe('Mantenimiento');
      expect(result.createdAt).toBe('2026-02-28T12:00:00Z');
    });

    it('should map contact correctly', () => {
      const result = appointmentFromApi(API_DTO);

      expect(result.contact.name).toBe('Juan Perez');
      expect(result.contact.email).toBe('juan@email.com');
      expect(result.contact.whatsapp).toBe('+54 11 1234-5678');
    });

    it('should map vehicle with license_plate to licensePlate', () => {
      const result = appointmentFromApi(API_DTO);

      expect(result.vehicle).toBeDefined();
      expect(result.vehicle?.make).toBe('Toyota');
      expect(result.vehicle?.model).toBe('Corolla');
      expect(result.vehicle?.year).toBe(2023);
      expect(result.vehicle?.licensePlate).toBe('AB 123 CD');
    });

    it('should set vehicle to undefined when not present', () => {
      const result = appointmentFromApi(API_DTO_NO_VEHICLE);

      expect(result.vehicle).toBeUndefined();
    });
  });

  describe('appointmentListFromApi', () => {
    it('should map an array of API DTOs', () => {
      const result = appointmentListFromApi([API_DTO, API_DTO_NO_VEHICLE]);

      expect(result).toHaveLength(2);
      expect(result[0]?.id).toBe('abc-123');
      expect(result[1]?.id).toBe('def-456');
    });

    it('should return empty array for empty input', () => {
      const result = appointmentListFromApi([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('appointmentToApi', () => {
    it('should map camelCase domain DTO to snake_case API format', () => {
      const dto: CreateAppointmentDto = {
        placeId: 1,
        appointmentAt: '2026-03-15T10:00:00Z',
        serviceType: 'Mantenimiento',
        contact: {
          name: 'Juan Perez',
          email: 'juan@email.com',
          whatsapp: '+54 11 1234-5678',
        },
      };

      const result = appointmentToApi(dto);

      expect(result.place_id).toBe(1);
      expect(result.appointment_at).toBe('2026-03-15T10:00:00Z');
      expect(result.service_type).toBe('Mantenimiento');
      expect(result.contact.name).toBe('Juan Perez');
    });

    it('should map vehicle licensePlate to license_plate', () => {
      const dto: CreateAppointmentDto = {
        placeId: 1,
        appointmentAt: '2026-03-15T10:00:00Z',
        serviceType: 'Mantenimiento',
        contact: { name: 'Juan', email: 'j@e.com', whatsapp: '123' },
        vehicle: { make: 'Toyota', licensePlate: 'AB 123 CD' },
      };

      const result = appointmentToApi(dto);

      expect(result.vehicle).toBeDefined();
      expect(result.vehicle?.license_plate).toBe('AB 123 CD');
      expect(result.vehicle?.make).toBe('Toyota');
    });

    it('should set vehicle to undefined when not present', () => {
      const dto: CreateAppointmentDto = {
        placeId: 1,
        appointmentAt: '2026-03-15T10:00:00Z',
        serviceType: 'Mantenimiento',
        contact: { name: 'Juan', email: 'j@e.com', whatsapp: '123' },
      };

      const result = appointmentToApi(dto);

      expect(result.vehicle).toBeUndefined();
    });
  });
});
