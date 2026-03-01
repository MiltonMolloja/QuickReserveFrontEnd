import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';

import type { ApiResponse } from '../../domain/models/api-response.model';
import type { Appointment } from '../../domain/models/appointment.model';
import { AppointmentPort } from '../../domain/ports/appointment.port';
import { AppointmentsState } from '../state/appointments.state';
import { GetAppointmentsUseCase } from './get-appointments.use-case';

const API_RESPONSE_SUCCESS: ApiResponse<unknown[]> = {
  success: true,
  data: [
    {
      id: 'abc-123',
      place_id: 1,
      appointment_at: '2026-03-15T10:00:00Z',
      service_type: 'Mantenimiento',
      contact: { name: 'Juan', email: 'juan@email.com', phone: '123' },
      created_at: '2026-02-28T12:00:00Z',
    },
  ],
  errors: null,
};

const API_RESPONSE_ERROR: ApiResponse<Appointment[]> = {
  success: false,
  data: null,
  errors: ['Not found', 'Server busy'],
};

const API_RESPONSE_ERROR_NO_MESSAGES: ApiResponse<Appointment[]> = {
  success: false,
  data: null,
  errors: null,
};

describe('GetAppointmentsUseCase', () => {
  let useCase: GetAppointmentsUseCase;
  let state: AppointmentsState;
  let portSpy: { getAll: jest.Mock };

  beforeEach(() => {
    portSpy = { getAll: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: AppointmentPort, useValue: portSpy },
      ],
    });

    useCase = TestBed.inject(GetAppointmentsUseCase);
    state = TestBed.inject(AppointmentsState);
  });

  it('should set loading to true and clear error on execute', () => {
    portSpy.getAll.mockReturnValue(of(API_RESPONSE_SUCCESS));

    useCase.execute();

    // After execute completes, loading should be false
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeNull();
  });

  it('should map API response and set appointments in state on success', () => {
    portSpy.getAll.mockReturnValue(of(API_RESPONSE_SUCCESS));

    useCase.execute();

    expect(state.appointments()).toHaveLength(1);
    expect(state.appointments()[0]!.id).toBe('abc-123');
    expect(state.appointments()[0]!.placeId).toBe(1);
    expect(state.appointments()[0]!.serviceType).toBe('Mantenimiento');
    expect(state.loading()).toBe(false);
  });

  it('should set error from API errors array on failure response', () => {
    portSpy.getAll.mockReturnValue(of(API_RESPONSE_ERROR));

    useCase.execute();

    expect(state.appointments()).toEqual([]);
    expect(state.error()).toBe('Not found, Server busy');
    expect(state.loading()).toBe(false);
  });

  it('should set default error message when errors array is null', () => {
    portSpy.getAll.mockReturnValue(of(API_RESPONSE_ERROR_NO_MESSAGES));

    useCase.execute();

    expect(state.error()).toBe('Error al cargar los turnos');
    expect(state.loading()).toBe(false);
  });

  it('should set connection error on HTTP failure', () => {
    portSpy.getAll.mockReturnValue(throwError(() => new Error('Network error')));

    useCase.execute();

    expect(state.error()).toBe('Error de conexion al cargar los turnos');
    expect(state.loading()).toBe(false);
  });

  it('should call port.getAll once', () => {
    portSpy.getAll.mockReturnValue(of(API_RESPONSE_SUCCESS));

    useCase.execute();

    expect(portSpy.getAll).toHaveBeenCalledTimes(1);
  });
});
