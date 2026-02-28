import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import type { Workshop } from '../../domain/models/workshop.model';
import { WorkshopPort } from '../../domain/ports/workshop.port';
import { workshopListFromApi, type WorkshopApiDto } from '../mappers/workshop.mapper';
import { WorkshopsState } from '../state/workshops.state';

/**
 * Use case: Get all workshops from the API.
 * Orchestrates the flow: Port -> Mapper -> State.
 *
 * Workshops are loaded once and cached in state.
 */
@Injectable({ providedIn: 'root' })
export class GetWorkshopsUseCase {
  private readonly port = inject(WorkshopPort);
  private readonly state = inject(WorkshopsState);

  /**
   * Executes the use case: fetches all workshops and updates state.
   * Only fetches if workshops haven't been loaded yet.
   */
  execute(): void {
    // Skip if already loaded
    if (this.state.workshops().length > 0) {
      return;
    }

    this.state.setLoading(true);
    this.state.setError(null);

    this.port
      .getAll()
      .pipe(
        tap({
          next: (response) => {
            if (response.success && response.data) {
              const workshops: Workshop[] = workshopListFromApi(
                response.data as unknown as WorkshopApiDto[],
              );
              this.state.setWorkshops(workshops);
            } else {
              this.state.setError(
                response.errors?.join(', ') ?? 'Error al cargar los talleres',
              );
            }
            this.state.setLoading(false);
          },
          error: () => {
            this.state.setError('Error de conexion al cargar los talleres');
            this.state.setLoading(false);
          },
        }),
      )
      .subscribe();
  }
}
