import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import type { Appointment } from '../../domain/models/appointment.model';
import { AppointmentsState } from '../state/appointments.state';
import { FilterAppointmentsUseCase } from './filter-appointments.use-case';

function createAppointment(overrides: Partial<Appointment> = {}): Appointment {
  return {
    id: 'test-1',
    placeId: 1,
    appointmentAt: '2026-03-15T10:00:00Z',
    serviceType: 'Mantenimiento',
    contact: { name: 'Juan Perez', email: 'juan@email.com', whatsapp: '123' },
    createdAt: '2026-02-28T12:00:00Z',
    ...overrides,
  };
}

describe('FilterAppointmentsUseCase', () => {
  let useCase: FilterAppointmentsUseCase;
  let state: AppointmentsState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    useCase = TestBed.inject(FilterAppointmentsUseCase);
    state = TestBed.inject(AppointmentsState);

    // Seed with test data
    state.setAppointments([
      createAppointment({ id: '1', placeId: 1, serviceType: 'Mantenimiento', contact: { name: 'Juan Perez', email: 'juan@email.com', whatsapp: '123' } }),
      createAppointment({ id: '2', placeId: 2, serviceType: 'Reparacion', contact: { name: 'Maria Lopez', email: 'maria@email.com', whatsapp: '456' } }),
      createAppointment({ id: '3', placeId: 1, serviceType: 'Diagnostico', appointmentAt: '2026-04-01T14:00:00Z', contact: { name: 'Carlos Garcia', email: 'carlos@email.com', whatsapp: '789' } }),
    ]);
  });

  it('should return all appointments when no filters are set', () => {
    expect(useCase.filteredAppointments()).toHaveLength(3);
    expect(useCase.filteredCount()).toBe(3);
  });

  describe('search filter', () => {
    it('should filter by name (case-insensitive)', () => {
      useCase.updateFilters({ search: 'juan' });
      expect(useCase.filteredAppointments()).toHaveLength(1);
      expect(useCase.filteredAppointments()[0]?.id).toBe('1');
    });

    it('should filter by email', () => {
      useCase.updateFilters({ search: 'maria@' });
      expect(useCase.filteredAppointments()).toHaveLength(1);
      expect(useCase.filteredAppointments()[0]?.id).toBe('2');
    });

    it('should return empty when no match', () => {
      useCase.updateFilters({ search: 'nonexistent' });
      expect(useCase.filteredAppointments()).toHaveLength(0);
    });
  });

  describe('workshop filter', () => {
    it('should filter by workshopId', () => {
      useCase.updateFilters({ workshopId: 1 });
      expect(useCase.filteredAppointments()).toHaveLength(2);
    });

    it('should show all when workshopId is null', () => {
      useCase.updateFilters({ workshopId: null });
      expect(useCase.filteredAppointments()).toHaveLength(3);
    });
  });

  describe('service type filter', () => {
    it('should filter by service type (case-insensitive)', () => {
      useCase.updateFilters({ serviceType: 'reparacion' });
      expect(useCase.filteredAppointments()).toHaveLength(1);
      expect(useCase.filteredAppointments()[0]?.id).toBe('2');
    });
  });

  describe('date filter', () => {
    it('should filter by date', () => {
      useCase.updateFilters({ date: '2026-03-15' });
      expect(useCase.filteredAppointments()).toHaveLength(2);
    });

    it('should filter by different date', () => {
      useCase.updateFilters({ date: '2026-04-01' });
      expect(useCase.filteredAppointments()).toHaveLength(1);
      expect(useCase.filteredAppointments()[0]?.id).toBe('3');
    });
  });

  describe('combined filters', () => {
    it('should apply multiple filters together', () => {
      useCase.updateFilters({ workshopId: 1, serviceType: 'mantenimiento' });
      expect(useCase.filteredAppointments()).toHaveLength(1);
      expect(useCase.filteredAppointments()[0]?.id).toBe('1');
    });
  });

  describe('clearFilters', () => {
    it('should reset all filters and show all appointments', () => {
      useCase.updateFilters({ search: 'juan', workshopId: 1 });
      expect(useCase.filteredAppointments()).toHaveLength(1);

      useCase.clearFilters();
      expect(useCase.filteredAppointments()).toHaveLength(3);
      expect(useCase.filters().search).toBe('');
      expect(useCase.filters().workshopId).toBeNull();
    });
  });
});
