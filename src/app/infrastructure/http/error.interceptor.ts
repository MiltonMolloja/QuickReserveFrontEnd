import { type HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        console.error('Connection error:', error.message);
      } else if (error.status >= 400 && error.status < 500) {
        console.error('Client error:', error.status, error.message);
      } else if (error.status >= 500) {
        console.error('Server error:', error.status, error.message);
      }
      return throwError(() => error);
    }),
  );
};
