import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import type { Appointment } from '../../domain/models/appointment.model';
import { AppointmentsState } from './appointments.state';

function createAppointment(overrides: Partial<Appointment> = {}): Appointment {
  return {
    id: 'test-1',
    placeId: 1,
    appointmentAt: '2026-03-15T10:00:00Z',
    serviceType: 'Mantenimiento',
    contact: { name: 'Juan', email: 'juan@email.com', whatsapp: '123' },
    createdAt: '2026-02-28T12:00:00Z',
    ...overrides,
  };
}

describe('AppointmentsState', () => {
  let state: AppointmentsState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    state = TestBed.inject(AppointmentsState);
  });

  it('should have empty initial state', () => {
    expect(state.appointments()).toEqual([]);
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeNull();
    expect(state.total()).toBe(0);
    expect(state.todayCount()).toBe(0);
  });

  describe('setAppointments', () => {
    it('should set appointments and update total', () => {
      const appointments = [createAppointment(), createAppointment({ id: 'test-2' })];

      state.setAppointments(appointments);

      expect(state.appointments()).toHaveLength(2);
      expect(state.total()).toBe(2);
    });
  });

  describe('addAppointment', () => {
    it('should add an appointment to the list', () => {
      state.setAppointments([createAppointment()]);

      state.addAppointment(createAppointment({ id: 'test-2' }));

      expect(state.appointments()).toHaveLength(2);
      expect(state.total()).toBe(2);
    });
  });

  describe('todayCount', () => {
    it('should count appointments for today', () => {
      const today = new Date().toISOString();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      state.setAppointments([
        createAppointment({ id: '1', appointmentAt: today }),
        createAppointment({ id: '2', appointmentAt: today }),
        createAppointment({ id: '3', appointmentAt: tomorrow.toISOString() }),
      ]);

      expect(state.todayCount()).toBe(2);
    });
  });

  describe('loading', () => {
    it('should set loading state', () => {
      state.setLoading(true);
      expect(state.loading()).toBe(true);

      state.setLoading(false);
      expect(state.loading()).toBe(false);
    });
  });

  describe('error', () => {
    it('should set error state', () => {
      state.setError('Something went wrong');
      expect(state.error()).toBe('Something went wrong');

      state.setError(null);
      expect(state.error()).toBeNull();
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      state.setAppointments([createAppointment()]);
      state.setLoading(true);
      state.setError('error');

      state.reset();

      expect(state.appointments()).toEqual([]);
      expect(state.loading()).toBe(false);
      expect(state.error()).toBeNull();
    });
  });
});
