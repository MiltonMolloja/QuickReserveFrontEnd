import { Injectable, signal } from '@angular/core';

import { Theme } from '../../domain/enums/theme.enum';

/**
 * Signal-based state management for theme preference.
 * Singleton service that holds the current theme (Light/Dark/Auto).
 *
 * The actual DOM manipulation (adding/removing 'dark' class) is handled
 * by the ThemeAdapter in the infrastructure layer.
 * This state only holds the preference value.
 */
@Injectable({ providedIn: 'root' })
export class ThemeState {
  /** Private writable signal */
  private readonly _theme = signal<Theme>(Theme.LIGHT);

  /** Public readonly signal for components */
  readonly theme = this._theme.asReadonly();

  /** Set the theme preference */
  setTheme(theme: Theme): void {
    this._theme.set(theme);
  }
}
