import { Injectable, signal } from '@angular/core';

import type { Workshop } from '../../domain/models/workshop.model';

/**
 * Signal-based state management for workshops.
 * Singleton service that holds the reactive state for the workshops feature.
 *
 * Workshops are loaded once and cached — they rarely change.
 */
@Injectable({ providedIn: 'root' })
export class WorkshopsState {
  /** Private writable signals */
  private readonly _workshops = signal<Workshop[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  /** Public readonly signals for components */
  readonly workshops = this._workshops.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  /** State mutation methods (called by use cases only) */

  setWorkshops(workshops: Workshop[]): void {
    this._workshops.set(workshops);
  }

  setLoading(loading: boolean): void {
    this._loading.set(loading);
  }

  setError(error: string | null): void {
    this._error.set(error);
  }
}
