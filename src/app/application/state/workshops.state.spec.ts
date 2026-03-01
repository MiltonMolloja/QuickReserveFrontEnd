import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import type { Workshop } from '../../domain/models/workshop.model';
import { WorkshopsState } from './workshops.state';

const MOCK_WORKSHOPS: Workshop[] = [
  { id: 1, name: 'Taller Central', address: 'Av. Corrientes 1234', email: 'a@b.com', phone: '123' },
  { id: 2, name: 'Taller Norte', address: 'Av. Libertador 5678', email: 'c@d.com', phone: '456' },
];

describe('WorkshopsState', () => {
  let state: WorkshopsState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    state = TestBed.inject(WorkshopsState);
  });

  it('should have empty initial state', () => {
    expect(state.workshops()).toEqual([]);
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeNull();
  });

  it('should set workshops', () => {
    state.setWorkshops(MOCK_WORKSHOPS);

    expect(state.workshops()).toHaveLength(2);
    expect(state.workshops()[0]?.name).toBe('Taller Central');
  });

  it('should set loading state', () => {
    state.setLoading(true);
    expect(state.loading()).toBe(true);
  });

  it('should set error state', () => {
    state.setError('Connection error');
    expect(state.error()).toBe('Connection error');
  });
});
