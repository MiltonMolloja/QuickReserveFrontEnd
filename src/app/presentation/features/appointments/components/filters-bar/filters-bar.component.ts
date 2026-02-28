import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, MapPin, Wrench, Calendar, X } from 'lucide-angular';

import type { Workshop } from '../../../../../domain/models/workshop.model';
import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';
import { FilterDropdownComponent } from '../../../../shared/components/filter-dropdown/filter-dropdown.component';
import { LoadingButtonComponent } from '../../../../shared/components/loading-button/loading-button.component';

/**
 * Presentational component for the appointments filter bar.
 *
 * Displays:
 * - Search input (by name or email)
 * - Workshop dropdown filter
 * - Service type dropdown filter
 * - Date filter
 * - Clear filters button (danger variant)
 *
 * All filtering is client-side (RN-07). This component only emits
 * filter change events — the container handles the logic.
 *
 * @example
 * ```html
 * <app-filters-bar
 *   [workshops]="workshops()"
 *   [serviceTypes]="serviceTypeOptions"
 *   (searchChange)="onSearch($event)"
 *   (workshopChange)="onWorkshopFilter($event)"
 *   (serviceChange)="onServiceFilter($event)"
 *   (dateChange)="onDateFilter($event)"
 *   (clearFilters)="onClearFilters()"
 * />
 * ```
 */
@Component({
  selector: 'app-filters-bar',
  imports: [
    TranslatePipe,
    LucideAngularModule,
    SearchInputComponent,
    FilterDropdownComponent,
    LoadingButtonComponent,
  ],
  templateUrl: './filters-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersBarComponent {
  /** Available workshops for the dropdown */
  readonly workshops = input<readonly Workshop[]>([]);

  /** Available service types for the dropdown */
  readonly serviceTypes = input<readonly { readonly value: string; readonly label: string }[]>([]);

  /** Whether any filter is active (to show/hide clear button) */
  readonly hasActiveFilters = input<boolean>(false);

  /** Filter change events */
  readonly searchChange = output<string>();
  readonly workshopChange = output<string>();
  readonly serviceChange = output<string>();
  readonly dateChange = output<string>();
  readonly clearFilters = output<void>();

  /** Lucide icons */
  protected readonly icons = {
    mapPin: MapPin,
    wrench: Wrench,
    calendar: Calendar,
    x: X,
  };

  /** Workshop options mapped for FilterDropdownComponent */
  protected workshopOptions(): readonly { readonly value: string; readonly label: string }[] {
    return this.workshops().map((w) => ({ value: w.id.toString(), label: w.name }));
  }
}
