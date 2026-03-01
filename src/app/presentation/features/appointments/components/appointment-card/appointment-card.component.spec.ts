import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import type { Appointment } from '../../../../../domain/models/appointment.model';
import type { Workshop } from '../../../../../domain/models/workshop.model';
import { AppointmentCardComponent } from './appointment-card.component';

function createAppointment(overrides: Partial<Appointment> = {}): Appointment {
  return {
    id: 'test-1',
    placeId: 1,
    appointmentAt: '2026-03-15T10:00:00Z',
    serviceType: 'Mantenimiento',
    contact: { name: 'Juan Perez', email: 'juan@email.com', phone: '+54 11 1234-5678' },
    createdAt: '2026-02-28T12:00:00Z',
    ...overrides,
  };
}

const WORKSHOP: Workshop = {
  id: 1,
  name: 'Taller Central',
  address: 'Av. Siempreviva 742',
  email: 'taller@email.com',
  whatsapp: '+54 11 9999-0000',
};

describe('AppointmentCardComponent', () => {
  let fixture: ComponentFixture<AppointmentCardComponent>;
  let component: AppointmentCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentCardComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('appointment', createAppointment());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display service type as title', () => {
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent.trim()).toBe('Mantenimiento');
  });

  it('should display contact name', () => {
    const el = fixture.nativeElement;
    expect(el.textContent).toContain('Juan Perez');
  });

  it('should display contact email', () => {
    const el = fixture.nativeElement;
    expect(el.textContent).toContain('juan@email.com');
  });

  it('should display contact phone', () => {
    const el = fixture.nativeElement;
    expect(el.textContent).toContain('+54 11 1234-5678');
  });

  it('should display formatted date', () => {
    expect(component['formattedDate']()).toBeTruthy();
  });

  it('should display formatted time', () => {
    expect(component['formattedTime']()).toBeTruthy();
  });

  it('should not display workshop info when not provided', () => {
    const workshopSection = fixture.nativeElement.querySelectorAll('.text-xs');
    // No workshop address should be shown
    const hasAddress = Array.from(workshopSection).some((el: any) =>
      el.textContent.includes('Av. Siempreviva'),
    );
    expect(hasAddress).toBe(false);
  });

  it('should display workshop info when provided', () => {
    fixture.componentRef.setInput('workshop', WORKSHOP);
    fixture.detectChanges();

    const el = fixture.nativeElement;
    expect(el.textContent).toContain('Taller Central');
    expect(el.textContent).toContain('Av. Siempreviva 742');
  });

  it('should not display vehicle info when not present', () => {
    expect(component['vehicleDisplay']()).toBeNull();
  });

  it('should display vehicle info when present', () => {
    fixture.componentRef.setInput(
      'appointment',
      createAppointment({
        vehicle: { make: 'Toyota', model: 'Corolla', year: 2023, licensePlate: 'AB 123 CD' },
      }),
    );
    fixture.detectChanges();

    expect(component['vehicleDisplay']()).toBe('Toyota Corolla 2023 AB 123 CD');
    expect(fixture.nativeElement.textContent).toContain('Toyota Corolla');
  });

  it('should return null for vehicle with no fields', () => {
    fixture.componentRef.setInput('appointment', createAppointment({ vehicle: {} }));
    fixture.detectChanges();

    expect(component['vehicleDisplay']()).toBeNull();
  });
});
