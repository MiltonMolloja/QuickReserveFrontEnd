import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, Wrench } from 'lucide-angular';

/**
 * Shared navbar component used across all pages.
 *
 * Supports two variants:
 * - **full** (default): Logo + title + subtitle + nav controls via ng-content
 * - **simple**: Logo + title + "Back to home" link (used in success page)
 *
 * Dark mode is handled via Tailwind `dark:` classes.
 *
 * @example
 * ```html
 * <!-- Full navbar with controls -->
 * <app-navbar>
 *   <app-language-selector />
 *   <app-theme-selector />
 *   <button>Nuevo Turno</button>
 * </app-navbar>
 *
 * <!-- Simple navbar -->
 * <app-navbar variant="simple" />
 * ```
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe, LucideAngularModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  /** Navbar variant: 'full' shows nav controls, 'simple' shows back link */
  readonly variant = input<'full' | 'simple'>('full');

  /** Lucide icons used in template */
  protected readonly wrenchIcon = Wrench;
}
