import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AppointmentPort } from '../../../domain/ports/appointment.port';
import { WorkshopPort } from '../../../domain/ports/workshop.port';
import { StoragePort } from '../../../domain/ports/storage.port';
import { AppointmentsState } from '../../../application/state/appointments.state';
import { WorkshopsState } from '../../../application/state/workshops.state';
import { AppointmentsComponent } from './appointments.component';

describe('AppointmentsComponent', () => {
  let fixture: ComponentFixture<AppointmentsComponent>;
  let component: AppointmentsComponent;
  let appointmentsState: AppointmentsState;
  let workshopsState: WorkshopsState;

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
      imports: [AppointmentsComponent, TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: AppointmentPort, useValue: mockAppointmentPort },
        { provide: WorkshopPort, useValue: mockWorkshopPort },
        { provide: StoragePort, useValue: mockStoragePort },
      ],
    }).compileComponents();

    appointmentsState = TestBed.inject(AppointmentsState);
    workshopsState = TestBed.inject(WorkshopsState);

    fixture = TestBed.createComponent(AppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render stat cards', () => {
    const statCards = fixture.nativeElement.querySelectorAll('app-stat-card');
    expect(statCards.length).toBe(3);
  });

  it('should render filters bar', () => {
    const filtersBar = fixture.nativeElement.querySelector('app-filters-bar');
    expect(filtersBar).toBeTruthy();
  });

  it('should call getAppointments on init', () => {
    expect(mockAppointmentPort.getAll).toHaveBeenCalled();
  });

  it('should call getWorkshops on init', () => {
    expect(mockWorkshopPort.getAll).toHaveBeenCalled();
  });

  it('should compute occupancy as 0% when no workshops', () => {
    expect(component['occupancy']()).toBe('0%');
  });

  it('should compute occupancy correctly', () => {
    workshopsState.setWorkshops([
      { id: 1, name: 'A', address: '', email: '', whatsapp: '' },
      { id: 2, name: 'B', address: '', email: '', whatsapp: '' },
    ]);
    appointmentsState.setAppointments([
      {
        id: '1',
        placeId: 1,
        appointmentAt: '2026-03-15T10:00:00Z',
        serviceType: 'Mantenimiento',
        contact: { name: 'Juan', email: 'j@e.com', whatsapp: '123' },
        createdAt: '2026-02-28T12:00:00Z',
      },
    ]);

    expect(component['occupancy']()).toBe('50%');
  });

  it('should compute workshopMap', () => {
    workshopsState.setWorkshops([{ id: 1, name: 'Taller A', address: '', email: '', whatsapp: '' }]);

    const map = component['workshopMap']();
    expect(map.get(1)?.name).toBe('Taller A');
  });

  it('should handle search filter', () => {
    component['onSearch']('test');
    expect(component['filterUseCase'].filters().search).toBe('test');
  });

  it('should handle workshop filter', () => {
    component['onWorkshopFilter']('1');
    expect(component['filterUseCase'].filters().workshopId).toBe(1);
  });

  it('should handle workshop filter with empty value', () => {
    component['onWorkshopFilter']('');
    expect(component['filterUseCase'].filters().workshopId).toBeNull();
  });

  it('should handle service filter', () => {
    component['onServiceFilter']('Mantenimiento');
    expect(component['filterUseCase'].filters().serviceType).toBe('Mantenimiento');
  });

  it('should handle date filter', () => {
    component['onDateFilter']('2026-03-15');
    expect(component['filterUseCase'].filters().date).toBe('2026-03-15');
  });

  it('should clear filters', () => {
    component['onSearch']('test');
    component['onClearFilters']();
    expect(component['filterUseCase'].filters().search).toBe('');
  });

  it('should detect active filters', () => {
    expect(component['hasActiveFilters']()).toBe(false);
    component['onSearch']('test');
    expect(component['hasActiveFilters']()).toBe(true);
  });
});
