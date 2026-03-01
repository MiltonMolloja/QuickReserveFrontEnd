import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';

import type { ApiResponse } from '../../domain/models/api-response.model';
import type { Workshop } from '../../domain/models/workshop.model';
import { WorkshopPort } from '../../domain/ports/workshop.port';
import { WorkshopsState } from '../state/workshops.state';
import { GetWorkshopsUseCase } from './get-workshops.use-case';

const API_RESPONSE_SUCCESS: ApiResponse<unknown[]> = {
  success: true,
  data: [
    {
      id: 1,
      name: 'Taller Central',
      address: 'Av. Siempreviva 742',
      email: 'taller@email.com',
      whatsapp: '+54 11 1234-5678',
    },
  ],
  errors: null,
};

const API_RESPONSE_ERROR: ApiResponse<Workshop[]> = {
  success: false,
  data: null,
  errors: ['Service unavailable'],
};

const API_RESPONSE_ERROR_NO_MESSAGES: ApiResponse<Workshop[]> = {
  success: false,
  data: null,
  errors: null,
};

describe('GetWorkshopsUseCase', () => {
  let useCase: GetWorkshopsUseCase;
  let state: WorkshopsState;
  let portSpy: { getAll: jest.Mock };

  beforeEach(() => {
    portSpy = { getAll: jest.fn() };

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), { provide: WorkshopPort, useValue: portSpy }],
    });

    useCase = TestBed.inject(GetWorkshopsUseCase);
    state = TestBed.inject(WorkshopsState);
  });

  it('should map API response and set workshops in state on success', () => {
    portSpy.getAll.mockReturnValue(of(API_RESPONSE_SUCCESS));

    useCase.execute();

    expect(state.workshops()).toHaveLength(1);
    expect(state.workshops()[0]!.name).toBe('Taller Central');
    expect(state.workshops()[0]!.id).toBe(1);
    expect(state.loading()).toBe(false);
  });

  it('should set error from API errors array on failure response', () => {
    portSpy.getAll.mockReturnValue(of(API_RESPONSE_ERROR));

    useCase.execute();

    expect(state.workshops()).toEqual([]);
    expect(state.error()).toBe('Service unavailable');
    expect(state.loading()).toBe(false);
  });

  it('should set default error message when errors array is null', () => {
    portSpy.getAll.mockReturnValue(of(API_RESPONSE_ERROR_NO_MESSAGES));

    useCase.execute();

    expect(state.error()).toBe('Error al cargar los talleres');
    expect(state.loading()).toBe(false);
  });

  it('should set connection error on HTTP failure', () => {
    portSpy.getAll.mockReturnValue(throwError(() => new Error('Network error')));

    useCase.execute();

    expect(state.error()).toBe('Error de conexion al cargar los talleres');
    expect(state.loading()).toBe(false);
  });

  it('should skip fetch if workshops are already loaded', () => {
    state.setWorkshops([
      { id: 1, name: 'Existing', address: 'Addr', email: 'e@e.com', whatsapp: '123' },
    ]);

    useCase.execute();

    expect(portSpy.getAll).not.toHaveBeenCalled();
  });

  it('should call port.getAll when workshops are empty', () => {
    portSpy.getAll.mockReturnValue(of(API_RESPONSE_SUCCESS));

    useCase.execute();

    expect(portSpy.getAll).toHaveBeenCalledTimes(1);
  });
});
