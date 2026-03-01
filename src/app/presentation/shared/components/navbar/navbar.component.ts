import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule, Wrench, Globe, Sun, Moon, Monitor } from 'lucide-angular';

import { Theme } from '../../../../domain/enums/theme.enum';
import { ThemeState } from '../../../../application/state/theme.state';

/** Theme cycle order: light → dark → auto → light */
const THEME_CYCLE: readonly Theme[] = [Theme.LIGHT, Theme.DARK, Theme.AUTO];

/**
 * Shared navbar component used across all pages.
 *
 * Supports two variants:
 * - **full** (default): Logo + title + subtitle + nav controls via ng-content.
 *   On mobile (< sm) shows compact inline controls (lang toggle + theme icon toggle).
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
  };

  /** Current language code for compact mobile selector */
  protected readonly currentLang = signal(this.translate.getCurrentLang() || 'es');

  /** Current theme signal for compact mobile selector */
  protected readonly currentTheme = this.themeState.theme;

  /** Icon map for each theme */
  private readonly themeIconMap = {
    [Theme.LIGHT]: Sun,
    [Theme.DARK]: Moon,
    [Theme.AUTO]: Monitor,
  } as const;

  /** Computed icon for the current theme */
  protected readonly currentThemeIcon = computed(() => this.themeIconMap[this.currentTheme()]);

  /** Toggle language between ES/EN (compact mobile control) */
  protected toggleLanguage(): void {
    const next = this.currentLang() === 'es' ? 'en' : 'es';
    this.translate.use(next);
    this.currentLang.set(next);
    document.documentElement.lang = next;
  }

  /** Cycle theme: light → dark → auto → light (compact mobile control) */
  protected cycleTheme(): void {
    const currentIndex = THEME_CYCLE.indexOf(this.currentTheme());
    const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
    const nextTheme = THEME_CYCLE[nextIndex] ?? Theme.LIGHT;
    this.themeState.setTheme(nextTheme);
  }
}
