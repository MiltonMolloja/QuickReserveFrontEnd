import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import type { LucideIconData } from '../../types/icon.type';

/**
 * Summary row component for the appointment success page.
 *
 * Displays a single row with an icon, label, and value.
 * Optionally shows a bottom divider between rows.
 *
 * @example
 * ```html
 * <app-summary-row
 *   [icon]="wrenchIcon"
 *   [label]="'Servicio'"
 *   [value]="'Mantenimiento'"
 *   [showDivider]="true"
 * />
 * ```
 */
@Component({
  selector: 'app-summary-row',
  imports: [LucideAngularModule],
  templateUrl: './summary-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryRowComponent {
  /** Lucide icon for the row */
  readonly icon = input.required<LucideIconData>();

  /** Label text (e.g., "Servicio") */
  readonly label = input.required<string>();

  /** Value text (e.g., "Mantenimiento") */
  readonly value = input.required<string>();

  /** Whether to show a divider below this row */
  readonly showDivider = input<boolean>(true);
}
