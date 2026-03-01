import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

import type { ApiResponse } from '../../domain/models/api-response.model';
import type { Appointment } from '../../domain/models/appointment.model';
import type { CreateAppointmentDto } from '../../domain/models/create-appointment.dto';
import { AppointmentHttpAdapter } from './appointment-http.adapter';

describe('AppointmentHttpAdapter', () => {
  let adapter: AppointmentHttpAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        AppointmentHttpAdapter,
      ],
    });
    adapter = TestBed.inject(AppointmentHttpAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAll', () => {
    it('should send GET request to /api/Appointments', () => {
      const mockResponse: ApiResponse<Appointment[]> = {
        success: true,
        data: [],
        errors: null,
      };

      adapter.getAll().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('/api/Appointments');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return appointments data on success', () => {
      const mockAppointment = {
        id: 'abc-123',
        placeId: 1,
        appointmentAt: '2026-03-15T10:00:00Z',
        serviceType: 'Mantenimiento',
        contact: { name: 'Juan', email: 'juan@email.com', phone: '123' },
        createdAt: '2026-02-28T12:00:00Z',
      };
      const mockResponse: ApiResponse<Appointment[]> = {
        success: true,
        data: [mockAppointment],
        errors: null,
      };

      adapter.getAll().subscribe((response) => {
        expect(response.success).toBe(true);
        expect(response.data).toHaveLength(1);
      });

      const req = httpMock.expectOne('/api/Appointments');
      req.flush(mockResponse);
    });
  });

  describe('create', () => {
    it('should send POST request to /api/Appointments with data', () => {
      const dto: CreateAppointmentDto = {
        placeId: 1,
        appointmentAt: '2026-03-15T10:00:00Z',
        serviceType: 'Mantenimiento',
        contact: { name: 'Juan', email: 'juan@email.com', phone: '123' },
      };
      const mockResponse: ApiResponse<Appointment> = {
        success: true,
        data: {
          id: 'new-1',
          placeId: 1,
          appointmentAt: '2026-03-15T10:00:00Z',
          serviceType: 'Mantenimiento',
          contact: { name: 'Juan', email: 'juan@email.com', phone: '123' },
          createdAt: '2026-02-28T12:00:00Z',
        },
        errors: null,
      };

      adapter.create(dto).subscribe((response) => {
        expect(response.success).toBe(true);
        expect(response.data?.id).toBe('new-1');
      });

      const req = httpMock.expectOne('/api/Appointments');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(dto);
      req.flush(mockResponse);
    });
  });
});
