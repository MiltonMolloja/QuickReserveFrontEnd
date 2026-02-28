import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import type { LucideIconData } from '../../types/icon.type';

/**
 * Button component with loading state and optional icon.
 *
 * Supports two visual variants:
 * - **solid** (default): Primary background with white text
 * - **outline**: Transparent background with border
 *
 * Shows a spinner when loading, disabling the button.
 *
 * @example
 * ```html
 * <!-- Solid button with icon -->
 * <app-loading-button
 *   [label]="'Crear Turno'"
 *   [icon]="checkIcon"
 *   [loading]="isSubmitting()"
 *   (buttonClick)="onSubmit()"
 * />
 *
 * <!-- Outline button -->
 * <app-loading-button
 *   [label]="'Cancelar'"
 *   variant="outline"
 *   (buttonClick)="onCancel()"
 * />
 * ```
 */
@Component({
  selector: 'app-loading-button',
  imports: [LucideAngularModule],
  templateUrl: './loading-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonComponent {
  /** Button label text */
  readonly label = input.required<string>();

  /** Visual variant */
  readonly variant = input<'solid' | 'outline' | 'danger'>('solid');

  /** Optional Lucide icon to display before the label */
  readonly icon = input<LucideIconData | null>(null);

  /** Whether the button is in loading state */
  readonly loading = input<boolean>(false);

  /** Whether the button is disabled */
  readonly disabled = input<boolean>(false);

  /** Button type attribute */
  readonly type = input<'button' | 'submit'>('button');

  /** Emits when the button is clicked */
  readonly buttonClick = output<void>();

  /** Handle click */
  protected onClick(): void {
    if (!this.loading() && !this.disabled()) {
      this.buttonClick.emit();
    }
  }
}
