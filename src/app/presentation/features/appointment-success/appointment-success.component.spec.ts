import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { StoragePort } from '../../../domain/ports/storage.port';
import { WorkshopsState } from '../../../application/state/workshops.state';
import { AppointmentSuccessComponent } from './appointment-success.component';

const MOCK_APPOINTMENT = {
  placeId: 1,
  appointmentAt: '2026-03-15T10:00:00',
  serviceType: 'Mantenimiento',
  contact: { name: 'Juan Perez', email: 'juan@email.com', phone: '+54 11 1234-5678' },
};

describe('AppointmentSuccessComponent', () => {
  let fixture: ComponentFixture<AppointmentSuccessComponent>;
  let component: AppointmentSuccessComponent;
  let router: Router;
  let workshopsState: WorkshopsState;

  const mockStoragePort = {
    get: jest.fn().mockReturnValue(null),
    set: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    // Set history state before creating component
    window.history.replaceState({ appointment: MOCK_APPOINTMENT }, '');

    await TestBed.configureTestingModule({
      imports: [AppointmentSuccessComponent, TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: StoragePort, useValue: mockStoragePort },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    workshopsState = TestBed.inject(WorkshopsState);

    fixture = TestBed.createComponent(AppointmentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    window.history.replaceState({}, '');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load appointment from history state', () => {
    expect(component['appointment']()).toBeTruthy();
    expect(component['appointment']()?.serviceType).toBe('Mantenimiento');
  });

  it('should render navbar with simple variant', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render success icon', () => {
    const icon = fixture.nativeElement.querySelector('app-success-icon');
    expect(icon).toBeTruthy();
  });

  it('should render summary rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('app-summary-row');
    expect(rows.length).toBeGreaterThanOrEqual(6);
  });

  it('should render action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('app-loading-button');
    expect(buttons.length).toBe(2);
  });

  it('should compute contact display', () => {
    expect(component['contactDisplay']()).toBe('Juan Perez · juan@email.com');
  });

  it('should compute formatted date', () => {
    expect(component['formattedDate']()).toBeTruthy();
  });

  it('should compute formatted time', () => {
    expect(component['formattedTime']()).toBeTruthy();
  });

  it('should return null for vehicle display when no vehicle', () => {
    expect(component['vehicleDisplay']()).toBeNull();
  });

  it('should compute vehicle display when vehicle is present', () => {
    component['appointment'].set({
      ...MOCK_APPOINTMENT,
      vehicle: { make: 'Toyota', model: 'Corolla', year: 2023, licensePlate: 'AB 123 CD' },
    });
    expect(component['vehicleDisplay']()).toBe('Toyota Corolla 2023 AB 123 CD');
  });

  it('should resolve workshop name from state', () => {
    workshopsState.setWorkshops([
      { id: 1, name: 'Taller Central', address: '', email: '', phone: '' },
    ]);
    expect(component['workshopName']()).toBe('Taller Central');
  });

  it('should fallback to Taller # when workshop not found', () => {
    expect(component['workshopName']()).toBe('Taller #1');
  });

  it('should navigate to new-appointment on createAnother', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component['createAnother']();
    expect(navigateSpy).toHaveBeenCalledWith(['/new-appointment']);
  });

  it('should navigate to appointments on viewAppointments', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component['viewAppointments']();
    expect(navigateSpy).toHaveBeenCalledWith(['/appointments']);
  });

  it('should redirect when no appointment data is available', () => {
    window.history.replaceState({}, '');
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    // Create a new fixture without appointment state
    const newFixture = TestBed.createComponent(AppointmentSuccessComponent);
    newFixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/appointments']);
  });

  it('should return empty strings for computed values when no appointment', () => {
    component['appointment'].set(null);
    expect(component['workshopName']()).toBe('');
    expect(component['formattedDate']()).toBe('');
    expect(component['formattedTime']()).toBe('');
    expect(component['contactDisplay']()).toBe('');
  });
});
