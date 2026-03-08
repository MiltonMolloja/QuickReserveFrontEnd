import {
  APP_INITIALIZER,
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { AppointmentPort } from './domain/ports/appointment.port';
import { WorkshopPort } from './domain/ports/workshop.port';
import { StoragePort } from './domain/ports/storage.port';
import { AppointmentHttpAdapter } from './infrastructure/http/appointment-http.adapter';
import { WorkshopHttpAdapter } from './infrastructure/http/workshop-http.adapter';
import { LocalStorageAdapter } from './infrastructure/storage/local-storage.adapter';
import { apiUrlInterceptor } from './infrastructure/http/api-url.interceptor';
import { errorInterceptor } from './infrastructure/http/error.interceptor';
import { RuntimeConfigService } from './infrastructure/http/runtime-config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular Core
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiUrlInterceptor, errorInterceptor])),

    // Runtime config: load /assets/config.json before app starts
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: RuntimeConfigService) => () => configService.load(),
      deps: [RuntimeConfigService],
      multi: true,
    },

    // i18n (ngx-translate v17)
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/assets/i18n/' }),
      fallbackLang: 'es',
    }),

    // Clean Architecture: Port -> Adapter bindings
    { provide: AppointmentPort, useClass: AppointmentHttpAdapter },
    { provide: WorkshopPort, useClass: WorkshopHttpAdapter },
    { provide: StoragePort, useClass: LocalStorageAdapter },
  ],
};
