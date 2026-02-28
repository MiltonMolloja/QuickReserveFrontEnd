import type { Observable } from 'rxjs';

import type { ApiResponse } from '../models/api-response.model';
import type { Workshop } from '../models/workshop.model';

/**
 * Abstract port for workshop operations.
 * Defines the contract that infrastructure adapters must implement.
 *
 * Following Hexagonal Architecture: Domain defines the port,
 * Infrastructure provides the adapter (e.g., HttpClient implementation).
 *
 * Registered in DI as: `{ provide: WorkshopPort, useClass: WorkshopHttpAdapter }`
 */
export abstract class WorkshopPort {
  abstract getAll(): Observable<ApiResponse<Workshop[]>>;
}
