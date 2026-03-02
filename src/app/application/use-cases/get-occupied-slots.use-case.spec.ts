import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import type { Appointment } from '../../domain/models/appointment.model';
import { AppointmentsState } from '../state/appointments.state';
import { GetOccupiedSlotsUseCase } from './get-occupied-slots.use-case';

function createAppointment(placeId: number, appointmentAt: string): Appointment {
  return {
    id: `test-${String(placeId)}-${appointmentAt}`,
    placeId,
    appointmentAt,
    serviceType: 'Mantenimiento',
    contact: { name: 'Test', email: 'test@test.com', whatsapp: '123' },
    createdAt: '2026-01-01T00:00:00Z',
  };
}

describe('GetOccupiedSlotsUseCase', () => {
  let useCase: GetOccupiedSlotsUseCase;
  let state: AppointmentsState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    useCase = TestBed.inject(GetOccupiedSlotsUseCase);
    state = TestBed.inject(AppointmentsState);
  });

  it('should return empty array when placeId is 0', () => {
    expect(useCase.execute(0, '2026-03-15')).toEqual([]);
  });

  it('should return empty array when date is empty', () => {
    expect(useCase.execute(1, '')).toEqual([]);
  });

  it('should return empty array when no appointments exist', () => {
    expect(useCase.execute(1, '2026-03-15')).toEqual([]);
  });

  it('should return occupied slots for matching workshop and date', () => {
    state.setAppointments([
      createAppointment(1, '2026-03-15T10:00:00'),
      createAppointment(1, '2026-03-15T14:00:00'),
    ]);

    const result = useCase.execute(1, '2026-03-15');
    expect(result).toEqual(['10:00', '14:00']);
  });

  it('should not include appointments from different workshops', () => {
    state.setAppointments([
      createAppointment(1, '2026-03-15T10:00:00'),
      createAppointment(2, '2026-03-15T14:00:00'),
    ]);

    const result = useCase.execute(1, '2026-03-15');
    expect(result).toEqual(['10:00']);
  });

  it('should not include appointments from different dates', () => {
    state.setAppointments([
      createAppointment(1, '2026-03-15T10:00:00'),
      createAppointment(1, '2026-03-16T14:00:00'),
    ]);

    const result = useCase.execute(1, '2026-03-15');
    expect(result).toEqual(['10:00']);
  });

  it('should handle appointments with Z timezone suffix', () => {
    state.setAppointments([createAppointment(1, '2026-03-15T09:00:00Z')]);

    const result = useCase.execute(1, '2026-03-15');
    expect(result).toEqual(['09:00']);
  });

  it('should return all slots when fully booked', () => {
    const hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17'];
    state.setAppointments(hours.map((h) => createAppointment(1, `2026-03-15T${h}:00:00`)));

    const result = useCase.execute(1, '2026-03-15');
    expect(result).toHaveLength(9);
    expect(result).toContain('09:00');
    expect(result).toContain('17:00');
  });

  describe('getOccupiedSlots (pure function)', () => {
    it('should extract occupied slots from appointments array', () => {
      const appointments = [
        createAppointment(1, '2026-03-15T10:00:00'),
        createAppointment(1, '2026-03-15T15:00:00'),
        createAppointment(2, '2026-03-15T11:00:00'),
      ];

      const result = useCase.getOccupiedSlots(appointments, 1, '2026-03-15');
      expect(result).toEqual(['10:00', '15:00']);
    });
  });
});
