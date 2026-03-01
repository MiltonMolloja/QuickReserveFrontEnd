import { HttpRequest, type HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { apiUrlInterceptor } from './api-url.interceptor';

describe('apiUrlInterceptor', () => {
  it('should prepend apiBaseUrl for requests starting with /api', (done) => {
    const req = new HttpRequest('GET', '/api/Appointments');

    apiUrlInterceptor(req, (forwarded) => {
      expect(forwarded.url).toBe(`${environment.apiBaseUrl}/api/Appointments`);
      done();
      return of(forwarded as unknown as HttpEvent<unknown>);
    });
  });

  it('should not modify requests that do not start with /api', (done) => {
    const req = new HttpRequest('GET', 'https://external.com/data');

    apiUrlInterceptor(req, (forwarded) => {
      expect(forwarded.url).toBe('https://external.com/data');
      done();
      return of(forwarded as unknown as HttpEvent<unknown>);
    });
  });

  it('should pass through the original request method', (done) => {
    const req = new HttpRequest('POST', '/api/Appointments', { data: 1 });

    apiUrlInterceptor(req, (forwarded) => {
      expect(forwarded.method).toBe('POST');
      expect(forwarded.url).toBe(`${environment.apiBaseUrl}/api/Appointments`);
      done();
      return of(forwarded as unknown as HttpEvent<unknown>);
    });
  });

  it('should handle /api at the root path', (done) => {
    const req = new HttpRequest('GET', '/api');

    apiUrlInterceptor(req, (forwarded) => {
      expect(forwarded.url).toBe(`${environment.apiBaseUrl}/api`);
      done();
      return of(forwarded as unknown as HttpEvent<unknown>);
    });
  });

  it('should not modify relative paths without /api prefix', (done) => {
    const req = new HttpRequest('GET', '/other/endpoint');

    apiUrlInterceptor(req, (forwarded) => {
      expect(forwarded.url).toBe('/other/endpoint');
      done();
      return of(forwarded as unknown as HttpEvent<unknown>);
    });
  });
});
