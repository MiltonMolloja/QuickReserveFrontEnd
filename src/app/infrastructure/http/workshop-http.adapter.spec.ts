import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

import type { ApiResponse } from '../../domain/models/api-response.model';
import type { Workshop } from '../../domain/models/workshop.model';
import { WorkshopHttpAdapter } from './workshop-http.adapter';

describe('WorkshopHttpAdapter', () => {
  let adapter: WorkshopHttpAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        WorkshopHttpAdapter,
      ],
    });
    adapter = TestBed.inject(WorkshopHttpAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAll', () => {
    it('should send GET request to /api/Workshops', () => {
      const mockResponse: ApiResponse<Workshop[]> = {
        success: true,
        data: [],
        errors: null,
      };

      adapter.getAll().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('/api/Workshops');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return workshops data on success', () => {
      const mockWorkshop: Workshop = {
        id: 1,
        name: 'Taller Central',
        address: 'Av. Siempreviva 742',
        email: 'taller@email.com',
        phone: '+54 11 1234-5678',
      };
      const mockResponse: ApiResponse<Workshop[]> = {
        success: true,
        data: [mockWorkshop],
        errors: null,
      };

      adapter.getAll().subscribe((response) => {
        expect(response.success).toBe(true);
        expect(response.data).toHaveLength(1);
        expect(response.data![0]!.name).toBe('Taller Central');
      });

      const req = httpMock.expectOne('/api/Workshops');
      req.flush(mockResponse);
    });
  });
});
