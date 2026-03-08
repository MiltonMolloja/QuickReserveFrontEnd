import { HttpRequest, type HttpEvent } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RuntimeConfigService } from './runtime-config.service';
import { apiUrlInterceptor } from './api-url.interceptor';

const MOCK_API_URL = 'http://test-api:5000';

describe('apiUrlInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RuntimeConfigService,
          useValue: { apiBaseUrl: MOCK_API_URL } as RuntimeConfigService,
        },
      ],
    });
  });

  it('should prepend apiBaseUrl for requests starting with /api', (done) => {
    const req = new HttpRequest('GET', '/api/Appointments');

    TestBed.runInInjectionContext(() => {
      apiUrlInterceptor(req, (forwarded) => {
        expect(forwarded.url).toBe(`${MOCK_API_URL}/api/Appointments`);
        done();
        return of(forwarded as unknown as HttpEvent<unknown>);
      });
    });
  });

  it('should not modify requests that do not start with /api', (done) => {
    const req = new HttpRequest('GET', 'https://external.com/data');

    TestBed.runInInjectionContext(() => {
      apiUrlInterceptor(req, (forwarded) => {
        expect(forwarded.url).toBe('https://external.com/data');
        done();
        return of(forwarded as unknown as HttpEvent<unknown>);
      });
    });
  });

  it('should pass through the original request method', (done) => {
    const req = new HttpRequest('POST', '/api/Appointments', { data: 1 });

    TestBed.runInInjectionContext(() => {
      apiUrlInterceptor(req, (forwarded) => {
        expect(forwarded.method).toBe('POST');
        expect(forwarded.url).toBe(`${MOCK_API_URL}/api/Appointments`);
        done();
        return of(forwarded as unknown as HttpEvent<unknown>);
      });
    });
  });

  it('should handle /api at the root path', (done) => {
    const req = new HttpRequest('GET', '/api');

    TestBed.runInInjectionContext(() => {
      apiUrlInterceptor(req, (forwarded) => {
        expect(forwarded.url).toBe(`${MOCK_API_URL}/api`);
        done();
        return of(forwarded as unknown as HttpEvent<unknown>);
      });
    });
  });

  it('should not modify relative paths without /api prefix', (done) => {
    const req = new HttpRequest('GET', '/other/endpoint');

    TestBed.runInInjectionContext(() => {
      apiUrlInterceptor(req, (forwarded) => {
        expect(forwarded.url).toBe('/other/endpoint');
        done();
        return of(forwarded as unknown as HttpEvent<unknown>);
      });
    });
  });
});
