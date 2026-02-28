import type { Observable } from 'rxjs';

import type { ApiResponse } from '../models/api-response.model';
import type { Appointment } from '../models/appointment.model';
import type { CreateAppointmentDto } from '../models/create-appointment.dto';

/**
 * Abstract port for appointment operations.
 * Defines the contract that infrastructure adapters must implement.
 *
 * Following Hexagonal Architecture: Domain defines the port,
 * Infrastructure provides the adapter (e.g., HttpClient implementation).
 *
 * Registered in DI as: `{ provide: AppointmentPort, useClass: AppointmentHttpAdapter }`
 */
export abstract class AppointmentPort {
  abstract getAll(): Observable<ApiResponse<Appointment[]>>;
  abstract create(data: CreateAppointmentDto): Observable<ApiResponse<Appointment>>;
}
