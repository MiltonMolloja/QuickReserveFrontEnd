import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { ApiResponse } from '../../domain/models/api-response.model';
import type { Appointment } from '../../domain/models/appointment.model';
import type { CreateAppointmentDto } from '../../domain/models/create-appointment.dto';
import { AppointmentPort } from '../../domain/ports/appointment.port';

/**
 * HTTP adapter for appointment operations.
 * Implements AppointmentPort using Angular HttpClient.
 *
 * URLs start with `/api` so the apiUrlInterceptor prepends the base URL.
 * The error interceptor handles HTTP errors centrally.
 *
 * Registered in DI as: `{ provide: AppointmentPort, useClass: AppointmentHttpAdapter }`
 */
@Injectable()
export class AppointmentHttpAdapter extends AppointmentPort {
  private readonly http = inject(HttpClient);

  getAll(): Observable<ApiResponse<Appointment[]>> {
    return this.http.get<ApiResponse<Appointment[]>>('/api/Appointments');
  }

  create(data: CreateAppointmentDto): Observable<ApiResponse<Appointment>> {
    return this.http.post<ApiResponse<Appointment>>('/api/Appointments', data);
  }
}
