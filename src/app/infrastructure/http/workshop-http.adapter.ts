import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { ApiResponse } from '../../domain/models/api-response.model';
import type { Workshop } from '../../domain/models/workshop.model';
import { WorkshopPort } from '../../domain/ports/workshop.port';

/**
 * HTTP adapter for workshop operations.
 * Implements WorkshopPort using Angular HttpClient.
 *
 * URLs start with `/api` so the apiUrlInterceptor prepends the base URL.
 *
 * Registered in DI as: `{ provide: WorkshopPort, useClass: WorkshopHttpAdapter }`
 */
@Injectable()
export class WorkshopHttpAdapter extends WorkshopPort {
  private readonly http = inject(HttpClient);

  getAll(): Observable<ApiResponse<Workshop[]>> {
    return this.http.get<ApiResponse<Workshop[]>>('/api/Workshops');
  }
}
