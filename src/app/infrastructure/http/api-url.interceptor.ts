import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { RuntimeConfigService } from './runtime-config.service';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/api')) {
    const config = inject(RuntimeConfigService);
    const apiReq = req.clone({
      url: `${config.apiBaseUrl}${req.url}`,
    });
    return next(apiReq);
  }
  return next(req);
};
