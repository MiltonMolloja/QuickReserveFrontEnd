import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import type { LucideIconData } from '../../types/icon.type';

/**
 * Stat card component for displaying summary statistics.
 *
 * Used in the appointments list page to show:
 * - Total Appointments
 * - Today's Appointments
 * - Workshop Occupancy
 *
 * Each card has a configurable icon, label, value, and color scheme.
 *
 * @example
 * ```html
 * <app-stat-card
 *   [icon]="calendarIcon"
 *   [label]="'Total de Turnos'"
 *   [value]="'24'"
 *   iconColorClass="text-primary"
 *   iconBgClass="bg-info-bg dark:bg-indigo-dark"
 * />
 * ```
 */
@Component({
  selector: 'app-stat-card',
  imports: [LucideAngularModule],
  templateUrl: './stat-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  /** Lucide icon data to display */
  readonly icon = input.required<LucideIconData>();

  /** Label text (e.g., "Total de Turnos") */
  readonly label = input.required<string>();

  /** Value to display (e.g., "24") */
  readonly value = input.required<string>();

  /** CSS class for icon text color (e.g., "text-primary") */
  readonly iconColorClass = input<string>('text-primary');

  /** CSS class for icon background (e.g., "bg-info-bg dark:bg-indigo-dark") */
  readonly iconBgClass = input<string>('bg-info-bg dark:bg-indigo-dark');
}
