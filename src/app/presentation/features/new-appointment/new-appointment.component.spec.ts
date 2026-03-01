import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';

import { AppointmentPort } from '../../../domain/ports/appointment.port';
import { WorkshopPort } from '../../../domain/ports/workshop.port';
import { StoragePort } from '../../../domain/ports/storage.port';
import { NewAppointmentComponent } from './new-appointment.component';

describe('NewAppointmentComponent', () => {
  let fixture: ComponentFixture<NewAppointmentComponent>;
  let component: NewAppointmentComponent;
  let router: Router;

  const mockAppointmentPort = {
    getAll: jest.fn().mockReturnValue(of({ success: true, data: [], errors: null })),
    create: jest.fn(),
  };

  const mockWorkshopPort = {
    getAll: jest.fn().mockReturnValue(of({ success: true, data: [], errors: null })),
  };

  const mockStoragePort = {
    get: jest.fn().mockReturnValue(null),
    set: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAppointmentComponent, TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: AppointmentPort, useValue: mockAppointmentPort },
        { provide: WorkshopPort, useValue: mockWorkshopPort },
        { provide: StoragePort, useValue: mockStoragePort },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at step 1', () => {
    expect(component['currentStep']()).toBe(1);
  });

  it('should have 3 total steps', () => {
    expect(component['totalSteps']).toBe(3);
  });

  it('should render navbar', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render progress bar', () => {
    const progressBar = fixture.nativeElement.querySelector('app-progress-bar');
    expect(progressBar).toBeTruthy();
  });

  it('should not advance to step 2 if step 1 is invalid', () => {
    component['nextStep']();
    expect(component['currentStep']()).toBe(1);
  });

  it('should advance to step 2 when step 1 is valid', () => {
    component['serviceForm'].controls.place_id.setValue(1);
    component['serviceForm'].controls.service_type.setValue('Mantenimiento');
    component['serviceForm'].controls.appointment_date.setValue('2026-03-15');
    component['serviceForm'].controls.appointment_time.setValue('10:00');

    component['nextStep']();
    expect(component['currentStep']()).toBe(2);
  });

  it('should go back to step 1 from step 2', () => {
    // Force step 2
    component['serviceForm'].controls.place_id.setValue(1);
    component['serviceForm'].controls.service_type.setValue('Mantenimiento');
    component['serviceForm'].controls.appointment_date.setValue('2026-03-15');
    component['serviceForm'].controls.appointment_time.setValue('10:00');
    component['nextStep']();
    expect(component['currentStep']()).toBe(2);

    component['previousStep']();
    expect(component['currentStep']()).toBe(1);
  });

  it('should not go below step 1', () => {
    component['previousStep']();
    expect(component['currentStep']()).toBe(1);
  });

  it('should cancel and navigate to appointments', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component['cancel']();
    expect(navigateSpy).toHaveBeenCalledWith(['/appointments']);
  });

  it('should not submit if forms are invalid', () => {
    component['onSubmit']();
    expect(mockAppointmentPort.create).not.toHaveBeenCalled();
  });

  it('should submit and navigate on success', () => {
    // Fill step 1
    component['serviceForm'].controls.place_id.setValue(1);
    component['serviceForm'].controls.service_type.setValue('Mantenimiento');
    component['serviceForm'].controls.appointment_date.setValue('2026-12-15');
    component['serviceForm'].controls.appointment_time.setValue('10:00');

    // Fill step 2
    component['contactForm'].controls.name.setValue('Juan Perez');
    component['contactForm'].controls.email.setValue('juan@email.com');
    component['contactForm'].controls.phone.setValue('+54 11 1234-5678');

    const mockResponse = {
      success: true,
      data: {
        id: 'new-1',
        place_id: 1,
        appointment_at: '2026-12-15T10:00:00Z',
        service_type: 'Mantenimiento',
        contact: { name: 'Juan Perez', email: 'juan@email.com', phone: '+54 11 1234-5678' },
        created_at: '2026-02-28T12:00:00Z',
      },
      errors: null,
    };
    mockAppointmentPort.create.mockReturnValue(of(mockResponse));
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component['onSubmit']();

    expect(component['submitting']()).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/appointment-success'], expect.any(Object));
  });

  it('should handle submit error', () => {
    // Fill forms
    component['serviceForm'].controls.place_id.setValue(1);
    component['serviceForm'].controls.service_type.setValue('Mantenimiento');
    component['serviceForm'].controls.appointment_date.setValue('2026-12-15');
    component['serviceForm'].controls.appointment_time.setValue('10:00');
    component['contactForm'].controls.name.setValue('Juan');
    component['contactForm'].controls.email.setValue('j@e.com');
    component['contactForm'].controls.phone.setValue('123');

    mockAppointmentPort.create.mockReturnValue(throwError(() => new Error('Server error')));

    component['onSubmit']();

    expect(component['submitting']()).toBe(false);
    expect(component['submitError']()).toBe('Server error');
  });

  it('should mark step as touched when trying to advance with invalid form', () => {
    const markSpy = jest.spyOn(component['serviceForm'], 'markAllAsTouched');
    component['nextStep']();
    expect(markSpy).toHaveBeenCalled();
  });
});
