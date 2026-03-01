import { TranslateService } from '@ngx-translate/core';

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
