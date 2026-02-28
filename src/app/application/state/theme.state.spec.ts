import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Theme } from '../../domain/enums/theme.enum';
import { ThemeState } from './theme.state';

describe('ThemeState', () => {
  let state: ThemeState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    state = TestBed.inject(ThemeState);
  });

  it('should have LIGHT as default theme', () => {
    expect(state.theme()).toBe(Theme.LIGHT);
  });

  it('should set theme to DARK', () => {
    state.setTheme(Theme.DARK);
    expect(state.theme()).toBe(Theme.DARK);
  });

  it('should set theme to AUTO', () => {
    state.setTheme(Theme.AUTO);
    expect(state.theme()).toBe(Theme.AUTO);
  });

  it('should set theme back to LIGHT', () => {
    state.setTheme(Theme.DARK);
    state.setTheme(Theme.LIGHT);
    expect(state.theme()).toBe(Theme.LIGHT);
  });
});
