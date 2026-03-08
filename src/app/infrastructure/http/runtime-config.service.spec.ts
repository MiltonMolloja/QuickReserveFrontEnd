import { RuntimeConfigService } from './runtime-config.service';
import { environment } from '../../../environments/environment';

describe('RuntimeConfigService', () => {
  let service: RuntimeConfigService;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    service = new RuntimeConfigService();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('should default to environment.apiBaseUrl', () => {
    expect(service.apiBaseUrl).toBe(environment.apiBaseUrl);
  });

  it('should load apiBaseUrl from config.json', async () => {
    const mockConfig = { apiBaseUrl: 'http://production-api:5000' };
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockConfig),
    } as unknown as Response);

    await service.load();

    expect(service.apiBaseUrl).toBe('http://production-api:5000');
    expect(globalThis.fetch).toHaveBeenCalledWith('/assets/config.json');
  });

  it('should keep defaults when config.json is not found', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as unknown as Response);

    await service.load();

    expect(service.apiBaseUrl).toBe(environment.apiBaseUrl);
  });

  it('should keep defaults when fetch throws', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    await service.load();

    expect(service.apiBaseUrl).toBe(environment.apiBaseUrl);
  });

  it('should keep defaults when config.json has no apiBaseUrl', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as unknown as Response);

    await service.load();

    expect(service.apiBaseUrl).toBe(environment.apiBaseUrl);
  });
});
