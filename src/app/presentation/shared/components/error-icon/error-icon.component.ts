import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

/**
 * Error icon component with animated red gradient circle and X mark.
 *
 * Used in the appointment error page.
 * Features:
 * - 88px circle with gradient from danger to danger-light (135deg)
 * - Red shadow glow effect
 * - White X icon (44px)
 * - Subtle scale-in animation on render
 *
 * @example
 * ```html
 * <app-error-icon />
 * ```
 */
@Component({
  selector: 'app-error-icon',
  imports: [LucideAngularModule],
  templateUrl: './error-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorIconComponent {
  /** Lucide X icon */
  protected readonly xIcon = X;
}
