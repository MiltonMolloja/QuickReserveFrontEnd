import { HttpRequest, HttpErrorResponse, type HttpEvent } from '@angular/common/http';
import { of, throwError, type Observable } from 'rxjs';

import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  const req = new HttpRequest('GET', '/api/test');

  it('should pass through successful responses', (done) => {
    const mockResponse = { body: 'ok' } as unknown as HttpEvent<unknown>;
    const next = (): Observable<HttpEvent<unknown>> => of(mockResponse);

    errorInterceptor(req, next).subscribe({
      next: (response) => {
        expect(response).toBe(mockResponse);
        done();
      },
    });
  });

  it('should log connection error for status 0 and re-throw', (done) => {
    const error = new HttpErrorResponse({ status: 0, statusText: 'Unknown', url: '/api/test' });
    const next = (): Observable<HttpEvent<unknown>> => throwError(() => error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    errorInterceptor(req, next).subscribe({
      error: (err: HttpErrorResponse) => {
        expect(consoleSpy).toHaveBeenCalledWith('Connection error:', err.message);
        expect(err.status).toBe(0);
        consoleSpy.mockRestore();
        done();
      },
    });
  });

  it('should log client error for status 400-499 and re-throw', (done) => {
    const error = new HttpErrorResponse({ status: 404, statusText: 'Not Found', url: '/api/test' });
    const next = (): Observable<HttpEvent<unknown>> => throwError(() => error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    errorInterceptor(req, next).subscribe({
      error: (err: HttpErrorResponse) => {
        expect(consoleSpy).toHaveBeenCalledWith('Client error:', 404, err.message);
        expect(err.status).toBe(404);
        consoleSpy.mockRestore();
        done();
      },
    });
  });

  it('should log client error for status 400', (done) => {
    const error = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      url: '/api/test',
    });
    const next = (): Observable<HttpEvent<unknown>> => throwError(() => error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    errorInterceptor(req, next).subscribe({
      error: (err: HttpErrorResponse) => {
        expect(consoleSpy).toHaveBeenCalledWith('Client error:', 400, err.message);
        consoleSpy.mockRestore();
        done();
      },
    });
  });

  it('should log server error for status 500+ and re-throw', (done) => {
    const error = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
      url: '/api/test',
    });
    const next = (): Observable<HttpEvent<unknown>> => throwError(() => error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    errorInterceptor(req, next).subscribe({
      error: (err: HttpErrorResponse) => {
        expect(consoleSpy).toHaveBeenCalledWith('Server error:', 500, err.message);
        expect(err.status).toBe(500);
        consoleSpy.mockRestore();
        done();
      },
    });
  });

  it('should log server error for status 503', (done) => {
    const error = new HttpErrorResponse({
      status: 503,
      statusText: 'Service Unavailable',
      url: '/api/test',
    });
    const next = (): Observable<HttpEvent<unknown>> => throwError(() => error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    errorInterceptor(req, next).subscribe({
      error: (err: HttpErrorResponse) => {
        expect(consoleSpy).toHaveBeenCalledWith('Server error:', 503, err.message);
        consoleSpy.mockRestore();
        done();
      },
    });
  });

  it('should re-throw the original error', (done) => {
    const error = new HttpErrorResponse({
      status: 422,
      statusText: 'Unprocessable',
      url: '/api/test',
    });
    const next = (): Observable<HttpEvent<unknown>> => throwError(() => error);
    jest.spyOn(console, 'error').mockImplementation();

    errorInterceptor(req, next).subscribe({
      error: (err: HttpErrorResponse) => {
        expect(err).toBe(error);
        jest.restoreAllMocks();
        done();
      },
    });
  });
});
