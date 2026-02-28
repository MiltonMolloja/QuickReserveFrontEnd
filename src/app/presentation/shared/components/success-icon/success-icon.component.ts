import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, Check } from 'lucide-angular';

/**
 * Success icon component with animated green gradient circle and check mark.
 *
 * Used in the appointment success page (RF-03.2).
 * Features:
 * - 88px circle with gradient from success to success-light (135deg)
 * - Green shadow glow effect
 * - White check icon (44px)
 * - Subtle scale-in animation on render
 *
 * @example
 * ```html
 * <app-success-icon />
 * ```
 */
@Component({
  selector: 'app-success-icon',
  imports: [LucideAngularModule],
  templateUrl: './success-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessIconComponent {
  /** Lucide check icon */
  protected readonly checkIcon = Check;
}
