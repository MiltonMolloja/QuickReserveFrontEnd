import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeAdapter } from './infrastructure/theme/theme.adapter';

/**
 * Root application component.
 *
 * Injects ThemeAdapter at the root level to ensure dark mode
 * is initialized on first render (loads persisted theme from
 * localStorage and applies the 'dark' class to <html>).
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = 'QuickReserve';

  /**
   * ThemeAdapter is injected here to trigger its constructor,
   * which loads the persisted theme and sets up the reactive effect.
   * The underscore prefix indicates it's intentionally unused directly.
   */
  private readonly _themeAdapter = inject(ThemeAdapter);
}
