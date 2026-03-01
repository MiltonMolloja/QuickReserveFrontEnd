import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LucideAngularModule, Globe, ChevronDown } from 'lucide-angular';

/**
 * Language selector dropdown component.
 *
 * Displays a globe icon with the current language code (ES/EN).
 * Clicking toggles a dropdown to switch between available languages.
 * Uses ngx-translate for runtime language switching (ND-12).
 *
 * @example
 * ```html
 * <app-language-selector />
 * ```
 */
@Component({
  selector: 'app-language-selector',
  imports: [LucideAngularModule],
  templateUrl: './language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  private readonly translate = inject(TranslateService);

  /** Whether the dropdown is open */
  protected readonly isOpen = signal(false);

  /** Current language code */
  protected readonly currentLang = signal(this.translate.getCurrentLang() || 'es');

  /** Available languages */
  protected readonly languages: readonly { readonly code: string; readonly label: string }[] = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
  ];

  /** Lucide icons */
  protected readonly globeIcon = Globe;
  protected readonly chevronDownIcon = ChevronDown;

  /** Toggle dropdown visibility */
  protected toggleDropdown(): void {
    this.isOpen.update((open) => !open);
  }

  /** Close dropdown */
  protected closeDropdown(): void {
    this.isOpen.set(false);
  }

  /** Switch language, update document lang attribute, and close dropdown */
  protected selectLanguage(code: string): void {
    this.translate.use(code);
    this.currentLang.set(code);
    document.documentElement.lang = code;
    this.closeDropdown();
  }
}
