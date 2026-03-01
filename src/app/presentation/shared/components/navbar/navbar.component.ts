import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule, Wrench, Globe, Sun, Moon, Monitor } from 'lucide-angular';

import { Theme } from '../../../../domain/enums/theme.enum';
import { ThemeState } from '../../../../application/state/theme.state';

/**
 * Shared navbar component used across all pages.
 *
 * Supports two variants:
 * - **full** (default): Logo + title + subtitle + nav controls via ng-content.
 *   On mobile (< sm) shows compact inline controls (lang toggle + theme pill group).
 *   On desktop (≥ sm) shows projected content via ng-content slots.
 * - **simple**: Logo + title + "Back to home" link (used in success/error pages)
 *
 * Dark mode is handled via Tailwind `dark:` classes.
 *
 * @example
 * ```html
 * <!-- Full navbar with controls -->
 * <app-navbar>
 *   <app-language-selector navIcons />
 *   <app-theme-selector navIcons />
 *   <a navAction routerLink="/new-appointment">Nuevo Turno</a>
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
  private readonly translate = inject(TranslateService);
  private readonly themeState = inject(ThemeState);

  /** Navbar variant: 'full' shows nav controls, 'simple' shows back link */
  readonly variant = input<'full' | 'simple'>('full');

  /** Lucide icons used in template */
  protected readonly icons = {
    wrench: Wrench,
    globe: Globe,
    sun: Sun,
    moon: Moon,
    monitor: Monitor,
  };

  /** Current language code for compact mobile selector */
  protected readonly currentLang = signal(this.translate.getCurrentLang() || 'es');

  /** Current theme signal for compact mobile selector */
  protected readonly currentTheme = this.themeState.theme;

  /** Theme enum reference for template */
  protected readonly Theme = Theme;

  /** Compact theme options for mobile pill group */
  protected readonly themeOptions = [
    { theme: Theme.LIGHT, icon: Sun, label: 'Light' },
    { theme: Theme.DARK, icon: Moon, label: 'Dark' },
    { theme: Theme.AUTO, icon: Monitor, label: 'Auto' },
  ] as const;

  /** Toggle language between ES/EN (compact mobile control) */
  protected toggleLanguage(): void {
    const next = this.currentLang() === 'es' ? 'en' : 'es';
    this.translate.use(next);
    this.currentLang.set(next);
    document.documentElement.lang = next;
  }

  /** Set theme (compact mobile control) */
  protected setTheme(theme: Theme): void {
    this.themeState.setTheme(theme);
  }
}
