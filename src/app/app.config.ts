import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { AppointmentPort } from './domain/ports/appointment.port';
import { WorkshopPort } from './domain/ports/workshop.port';
import { StoragePort } from './domain/ports/storage.port';
import { AppointmentHttpAdapter } from './infrastructure/http/appointment-http.adapter';
import { WorkshopHttpAdapter } from './infrastructure/http/workshop-http.adapter';
import { LocalStorageAdapter } from './infrastructure/storage/local-storage.adapter';
import { apiUrlInterceptor } from './infrastructure/http/api-url.interceptor';
import { errorInterceptor } from './infrastructure/http/error.interceptor';

const httpLoaderFactory = (): TranslateHttpLoader => new TranslateHttpLoader();

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular Core
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiUrlInterceptor, errorInterceptor])),

    // i18n (ngx-translate)
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'es',
    }),

    // Clean Architecture: Port -> Adapter bindings
    { provide: AppointmentPort, useClass: AppointmentHttpAdapter },
    { provide: WorkshopPort, useClass: WorkshopHttpAdapter },
    { provide: StoragePort, useClass: LocalStorageAdapter },
  ],
};
