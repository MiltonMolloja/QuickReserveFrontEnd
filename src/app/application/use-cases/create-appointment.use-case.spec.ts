import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';

import type { ApiResponse } from '../../domain/models/api-response.model';
import type { Appointment } from '../../domain/models/appointment.model';
import type { CreateAppointmentDto } from '../../domain/models/create-appointment.dto';
import { AppointmentPort } from '../../domain/ports/appointment.port';
import { AppointmentsState } from '../state/appointments.state';
import {
  CreateAppointmentUseCase,
  AppointmentValidationError,
} from './create-appointment.use-case';

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
      phone: '+54 11 1234-5678',
    },
  };
}

const API_RESPONSE_SUCCESS: ApiResponse<unknown> = {
  success: true,
  data: {
    id: 'new-1',
    place_id: 1,
    appointment_at: '2026-03-15T10:00:00Z',
    service_type: 'Mantenimiento',
    contact: { name: 'Juan Perez', email: 'juan@email.com', phone: '+54 11 1234-5678' },
    created_at: '2026-02-28T12:00:00Z',
  },
  errors: null,
};

const API_RESPONSE_ERROR: ApiResponse<Appointment> = {
  success: false,
  data: null,
  errors: ['Duplicate appointment'],
};

const API_RESPONSE_ERROR_NO_MESSAGES: ApiResponse<Appointment> = {
  success: false,
  data: null,
  errors: null,
};

describe('CreateAppointmentUseCase', () => {
  let useCase: CreateAppointmentUseCase;
  let state: AppointmentsState;
  let portSpy: { create: jest.Mock; getAll: jest.Mock };

  beforeEach(() => {
    portSpy = { create: jest.fn(), getAll: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: AppointmentPort, useValue: portSpy },
      ],
    });

    useCase = TestBed.inject(CreateAppointmentUseCase);
    state = TestBed.inject(AppointmentsState);
  });

  describe('validation', () => {
    it('should throw AppointmentValidationError for invalid data', () => {
      const invalidDto = {} as CreateAppointmentDto;

      expect(() => useCase.execute(invalidDto)).toThrow(AppointmentValidationError);
    });

    it('should include validation errors in the thrown error', () => {
      const invalidDto = {} as CreateAppointmentDto;

      try {
        useCase.execute(invalidDto);
        fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(AppointmentValidationError);
        expect((error as AppointmentValidationError).errors.length).toBeGreaterThan(0);
      }
    });

    it('should not call port.create for invalid data', () => {
      const invalidDto = {} as CreateAppointmentDto;

      try {
        useCase.execute(invalidDto);
      } catch {
        // expected
      }

      expect(portSpy.create).not.toHaveBeenCalled();
    });
  });

  describe('successful creation', () => {
    it('should return mapped appointment on success', (done) => {
      portSpy.create.mockReturnValue(of(API_RESPONSE_SUCCESS));

      useCase.execute(createValidDto()).subscribe({
        next: (appointment) => {
          expect(appointment.id).toBe('new-1');
          expect(appointment.placeId).toBe(1);
          expect(appointment.serviceType).toBe('Mantenimiento');
          done();
        },
      });
    });

    it('should add appointment to state on success', (done) => {
      portSpy.create.mockReturnValue(of(API_RESPONSE_SUCCESS));

      useCase.execute(createValidDto()).subscribe({
        next: () => {
          expect(state.appointments()).toHaveLength(1);
          expect(state.appointments()[0]!.id).toBe('new-1');
          done();
        },
      });
    });

    it('should set loading to false after success', (done) => {
      portSpy.create.mockReturnValue(of(API_RESPONSE_SUCCESS));

      useCase.execute(createValidDto()).subscribe({
        next: () => {
          expect(state.loading()).toBe(false);
          done();
        },
      });
    });
  });

  describe('API error response', () => {
    it('should throw error with API error messages', (done) => {
      portSpy.create.mockReturnValue(of(API_RESPONSE_ERROR));

      useCase.execute(createValidDto()).subscribe({
        error: (err: Error) => {
          expect(err.message).toBe('Duplicate appointment');
          done();
        },
      });
    });

    it('should throw default error when errors array is null', (done) => {
      portSpy.create.mockReturnValue(of(API_RESPONSE_ERROR_NO_MESSAGES));

      useCase.execute(createValidDto()).subscribe({
        error: (err: Error) => {
          expect(err.message).toBe('Error al crear el turno');
          done();
        },
      });
    });
  });

  describe('HTTP failure', () => {
    it('should set loading to false on HTTP error', (done) => {
      portSpy.create.mockReturnValue(throwError(() => new Error('Network error')));

      useCase.execute(createValidDto()).subscribe({
        error: () => {
          expect(state.loading()).toBe(false);
          done();
        },
      });
    });
  });

  describe('AppointmentValidationError', () => {
    it('should have correct name property', () => {
      const error = new AppointmentValidationError([{ field: 'placeId', message: 'Required' }]);
      expect(error.name).toBe('AppointmentValidationError');
    });

    it('should join error messages', () => {
      const error = new AppointmentValidationError([
        { field: 'placeId', message: 'Required' },
        { field: 'serviceType', message: 'Missing' },
      ]);
      expect(error.message).toBe('Required, Missing');
    });
  });
});
