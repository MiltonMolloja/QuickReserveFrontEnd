import { HttpClient } from '@angular/common/http';
import type { Provider } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Factory function for creating the TranslateHttpLoader.
 * ngx-translate v17 uses zero-argument constructor.
 */
const httpLoaderFactory = (): TranslateHttpLoader => new TranslateHttpLoader();

/**
 * Provides the ngx-translate configuration for the application.
 * Loads translation files from /assets/i18n/{lang}.json.
 *
 * Usage in app.config.ts:
 * ```typescript
 * provideTranslateService({
 *   loader: {
 *     provide: TranslateLoader,
 *     useFactory: httpLoaderFactory,
 *     deps: [HttpClient],
 *   },
 *   defaultLanguage: 'es',
 * })
 * ```
 */
export const TRANSLATE_PROVIDERS: Provider[] = [
  {
    provide: TranslateLoader,
    useFactory: httpLoaderFactory,
    deps: [HttpClient],
  },
];

/** Default language for the application */
export const DEFAULT_LANGUAGE = 'es';

/** Available languages */
export const AVAILABLE_LANGUAGES: readonly string[] = ['es', 'en'] as const;

/**
 * Initializes the translation service with the default language.
 * Call this in a component or service that runs on app startup.
 */
export function initializeTranslation(translateService: TranslateService): void {
  translateService.setFallbackLang(DEFAULT_LANGUAGE);
  translateService.use(DEFAULT_LANGUAGE);
}
