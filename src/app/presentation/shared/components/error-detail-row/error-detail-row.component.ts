import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import type { LucideIconData } from '../../types/icon.type';

/**
 * Error detail row component for the appointment error page.
 *
 * Displays a single row with a danger-colored icon, label, and value.
 * Optionally shows a bottom divider between rows.
 * The value can be multi-line (e.g., suggestion lists).
 *
 * @example
 * ```html
 * <app-error-detail-row
 *   [icon]="serverCrashIcon"
 *   [label]="'Código de Error'"
 *   [value]="'HTTP 500'"
 *   [showDivider]="true"
 *   [dangerValue]="true"
 * />
 * ```
 */
@Component({
  selector: 'app-error-detail-row',
  imports: [LucideAngularModule],
  templateUrl: './error-detail-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDetailRowComponent {
  /** Lucide icon for the row */
  readonly icon = input.required<LucideIconData>();

  /** Label text (e.g., "Código de Error") */
  readonly label = input.required<string>();

  /** Primary value text */
  readonly value = input.required<string>();

  /** Optional additional lines (e.g., suggestion bullet points) */
  readonly extraLines = input<string[]>([]);

  /** Whether the value text should be styled in danger color */
  readonly dangerValue = input<boolean>(false);

  /** Whether to show a divider below this row */
  readonly showDivider = input<boolean>(true);
}
