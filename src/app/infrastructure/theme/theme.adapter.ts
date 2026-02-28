import { effect, inject, Injectable } from '@angular/core';

import { Theme } from '../../domain/enums/theme.enum';
import { StoragePort } from '../../domain/ports/storage.port';
import { ThemeState } from '../../application/state/theme.state';

/** LocalStorage key for persisting theme preference */
const THEME_STORAGE_KEY = 'quickreserve-theme';

/**
 * Theme adapter that bridges ThemeState with DOM and localStorage.
 *
 * Responsibilities:
 * - Reads persisted theme from localStorage on init
 * - Adds/removes 'dark' class on document.documentElement
 * - Resolves 'auto' theme based on system preference (prefers-color-scheme)
 * - Persists theme changes to localStorage via effect()
 *
 * This adapter is the only place that touches the DOM for theming.
 * Following ND-25: effect() for sync of theme with localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeAdapter {
  private readonly storage = inject(StoragePort);
  private readonly themeState = inject(ThemeState);

  constructor() {
    // Load persisted theme on init
    this.loadPersistedTheme();

    // Reactive effect: sync theme changes to DOM and localStorage
    effect(() => {
      const theme = this.themeState.theme();
      this.applyTheme(theme);
      this.storage.set(THEME_STORAGE_KEY, theme);
    });
  }

  /**
   * Loads the persisted theme from localStorage and sets it in state.
   * Falls back to LIGHT if no persisted value exists.
   */
  private loadPersistedTheme(): void {
    const stored = this.storage.get(THEME_STORAGE_KEY);
    if (stored === Theme.DARK || stored === Theme.LIGHT || stored === Theme.AUTO) {
      this.themeState.setTheme(stored);
    }
  }

  /**
   * Applies the theme to the DOM by toggling the 'dark' class.
   * Resolves AUTO theme using the system's prefers-color-scheme media query.
   */
  private applyTheme(theme: Theme): void {
    const isDark =
      theme === Theme.DARK ||
      (theme === Theme.AUTO && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
