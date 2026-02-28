import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule, Sun, Moon, Monitor } from 'lucide-angular';

import { Theme } from '../../../../domain/enums/theme.enum';
import { ThemeState } from '../../../../application/state/theme.state';

/**
 * Theme selector toggle component (Light / Dark / Auto).
 *
 * Displays three icon buttons (sun, moon, monitor) in a pill-shaped container.
 * The active theme gets a highlighted background.
 * Uses ThemeState signal for reactivity and ThemeAdapter (injected at root)
 * handles DOM manipulation and localStorage persistence (ND-25).
 *
 * @example
 * ```html
 * <app-theme-selector />
 * ```
 */
@Component({
  selector: 'app-theme-selector',
  imports: [LucideAngularModule],
  templateUrl: './theme-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent {
  private readonly themeState = inject(ThemeState);

  /** Current theme signal (readonly) */
  protected readonly currentTheme = this.themeState.theme;

  /** Theme enum reference for template */
  protected readonly Theme = Theme;

  /** Theme options with their icons */
  protected readonly themeOptions = [
    { theme: Theme.LIGHT, icon: Sun, label: 'Light' },
    { theme: Theme.DARK, icon: Moon, label: 'Dark' },
    { theme: Theme.AUTO, icon: Monitor, label: 'Auto' },
  ] as const;

  /** Set the active theme */
  protected setTheme(theme: Theme): void {
    this.themeState.setTheme(theme);
  }
}
