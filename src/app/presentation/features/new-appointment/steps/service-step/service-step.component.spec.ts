import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import type { Workshop } from '../../../../../domain/models/workshop.model';
import { ServiceStepComponent } from './service-step.component';

const WORKSHOPS: Workshop[] = [
  {
    id: 1,
    name: 'Taller Central',
    address: 'Av. Siempreviva 742',
    email: 'a@a.com',
    whatsapp: '111',
  },
  { id: 2, name: 'Taller Norte', address: 'Calle Falsa 123', email: 'b@b.com', whatsapp: '222' },
];

const SERVICE_TYPES = [
  { value: 'Mantenimiento', label: 'Mantenimiento' },
  { value: 'Reparacion', label: 'Reparación' },
];

function createServiceForm(): FormGroup {
  return new FormGroup({
    place_id: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    service_type: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    appointment_date: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    appointment_time: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}

describe('ServiceStepComponent', () => {
  let fixture: ComponentFixture<ServiceStepComponent>;
  let component: ServiceStepComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceStepComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceStepComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', createServiceForm());
    fixture.componentRef.setInput('workshops', WORKSHOPS);
    fixture.componentRef.setInput('serviceTypes', SERVICE_TYPES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render step title', () => {
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3).toBeTruthy();
  });

  it('should render workshop select', () => {
    const select = fixture.nativeElement.querySelector('#workshop');
    expect(select).toBeTruthy();
  });

  it('should render workshop options', () => {
    const options = fixture.nativeElement.querySelectorAll('#workshop option');
    // default disabled + 2 workshops
    expect(options.length).toBe(3);
  });

  it('should render service type select', () => {
    const select = fixture.nativeElement.querySelector('#service-type');
    expect(select).toBeTruthy();
  });

  it('should render date picker component', () => {
    const picker = fixture.nativeElement.querySelector('app-date-picker');
    expect(picker).toBeTruthy();
  });

  it('should render time slot picker', () => {
    const picker = fixture.nativeElement.querySelector('app-time-slot-picker');
    expect(picker).toBeTruthy();
  });

  it('should update form control when time slot is selected', () => {
    const form = component.formGroup();
    // Open the time picker dropdown first
    const toggleBtn = fixture.nativeElement.querySelector(
      'app-time-slot-picker button[aria-haspopup="listbox"]',
    ) as HTMLButtonElement;
    toggleBtn.click();
    fixture.detectChanges();

    const slotButton = fixture.nativeElement.querySelector(
      'app-time-slot-picker button[aria-label="10:00"]',
    ) as HTMLButtonElement;
    slotButton.click();
    fixture.detectChanges();

    expect(form.controls.appointment_time.value).toBe('10:00');
    expect(form.controls.appointment_time.touched).toBe(true);
  });

  it('should update form control when date is selected', () => {
    const form = component.formGroup();
    component['onDateSelected']('2026-03-15');

    expect(form.controls.appointment_date.value).toBe('2026-03-15');
    expect(form.controls.appointment_date.touched).toBe(true);
  });

  it('should set min date to today', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(component['minDate']).toBe(today);
  });

  it('should return null for selectedWorkshop when no workshop selected', () => {
    expect(component['selectedWorkshop']()).toBeNull();
  });

  it('should return selected workshop info', () => {
    const form = createServiceForm();
    form.controls['place_id']!.setValue(1);
    fixture.componentRef.setInput('formGroup', form);
    fixture.detectChanges();

    expect(component['selectedWorkshop']()?.name).toBe('Taller Central');
  });

  it('should show workshop info box when workshop is selected', () => {
    const form = createServiceForm();
    form.controls['place_id']!.setValue(1);
    fixture.componentRef.setInput('formGroup', form);
    fixture.detectChanges();

    const infoBox = fixture.nativeElement.querySelector('.rounded-lg.bg-bg-light');
    expect(infoBox).toBeTruthy();
    expect(infoBox.textContent).toContain('Taller Central');
  });
});
