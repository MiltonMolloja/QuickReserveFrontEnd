import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Theme } from '../../domain/enums/theme.enum';
import { StoragePort } from '../../domain/ports/storage.port';
import { ThemeState } from '../../application/state/theme.state';
import { ThemeAdapter } from './theme.adapter';

class MockStoragePort extends StoragePort {
  private store = new Map<string, unknown>();

  get(key: string): unknown {
    return this.store.get(key) ?? null;
  }

  set(key: string, value: unknown): void {
    this.store.set(key, value);
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  /** Helper to pre-seed storage for tests */
  seed(key: string, value: unknown): void {
    this.store.set(key, value);
  }
}

describe('ThemeAdapter', () => {
  let themeState: ThemeState;
  let storage: MockStoragePort;

  function createAdapter(): ThemeAdapter {
    return TestBed.inject(ThemeAdapter);
  }

  beforeEach(() => {
    document.documentElement.classList.remove('dark');

    storage = new MockStoragePort();

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), { provide: StoragePort, useValue: storage }],
    });

    themeState = TestBed.inject(ThemeState);
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('should be created', () => {
    const adapter = createAdapter();
    expect(adapter).toBeTruthy();
  });

  it('should default to LIGHT theme when no persisted value', () => {
    createAdapter();
    expect(themeState.theme()).toBe(Theme.LIGHT);
  });

  it('should load persisted DARK theme from storage', () => {
    storage.seed('quickreserve-theme', Theme.DARK);
    createAdapter();
    expect(themeState.theme()).toBe(Theme.DARK);
  });

  it('should load persisted LIGHT theme from storage', () => {
    storage.seed('quickreserve-theme', Theme.LIGHT);
    createAdapter();
    expect(themeState.theme()).toBe(Theme.LIGHT);
  });

  it('should load persisted AUTO theme from storage', () => {
    storage.seed('quickreserve-theme', Theme.AUTO);
    createAdapter();
    expect(themeState.theme()).toBe(Theme.AUTO);
  });

  it('should ignore invalid persisted values', () => {
    storage.seed('quickreserve-theme', 'invalid-theme');
    createAdapter();
    expect(themeState.theme()).toBe(Theme.LIGHT);
  });

  it('should add dark class to documentElement for DARK theme', () => {
    storage.seed('quickreserve-theme', Theme.DARK);
    createAdapter();
    // Effect runs synchronously in zoneless
    TestBed.flushEffects();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should remove dark class for LIGHT theme', () => {
    document.documentElement.classList.add('dark');
    storage.seed('quickreserve-theme', Theme.LIGHT);
    createAdapter();
    TestBed.flushEffects();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should persist theme changes to storage', () => {
    createAdapter();
    themeState.setTheme(Theme.DARK);
    TestBed.flushEffects();
    expect(storage.get('quickreserve-theme')).toBe(Theme.DARK);
  });

  it('should resolve AUTO theme based on prefers-color-scheme', () => {
    // Mock matchMedia to return dark preference
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest
      .fn()
      .mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;

    storage.seed('quickreserve-theme', Theme.AUTO);
    createAdapter();
    TestBed.flushEffects();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    window.matchMedia = originalMatchMedia;
  });

  it('should resolve AUTO theme as light when system prefers light', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest
      .fn()
      .mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;

    storage.seed('quickreserve-theme', Theme.AUTO);
    createAdapter();
    TestBed.flushEffects();
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    window.matchMedia = originalMatchMedia;
  });
});
