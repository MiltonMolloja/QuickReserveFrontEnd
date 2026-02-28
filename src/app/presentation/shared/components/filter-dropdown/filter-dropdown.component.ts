import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import type { LucideIconData } from '../../types/icon.type';

/**
 * Filter dropdown (select) component with an icon prefix.
 *
 * Used in the appointments list page for filtering by workshop, service, or date.
 * All filtering is client-side (RN-07).
 *
 * @example
 * ```html
 * <app-filter-dropdown
 *   [icon]="mapPinIcon"
 *   [label]="'Taller'"
 *   [options]="workshopOptions"
 *   (filterChange)="onWorkshopFilter($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-filter-dropdown',
  imports: [LucideAngularModule],
  templateUrl: './filter-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDropdownComponent {
  /** Lucide icon to display before the select */
  readonly icon = input.required<LucideIconData>();

  /** Label / default option text (e.g., "Taller") */
  readonly label = input.required<string>();

  /** Options for the dropdown */
  readonly options = input<readonly { readonly value: string; readonly label: string }[]>([]);

  /** Current selected value (for external reset) */
  readonly value = input<string>('');

  /** Emits the selected value on change */
  readonly filterChange = output<string>();

  /** Handle select change */
  protected onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterChange.emit(target.value);
  }
}
