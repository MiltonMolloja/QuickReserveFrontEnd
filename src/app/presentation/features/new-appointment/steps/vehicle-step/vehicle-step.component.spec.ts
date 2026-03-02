import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
  LICENSE_PLATE_REGEX,
  VEHICLE_YEAR_MAX,
  VEHICLE_YEAR_MIN,
} from '../../../../../domain/validators/appointment.validator';
import { VehicleStepComponent } from './vehicle-step.component';

function createVehicleForm(): FormGroup {
  return new FormGroup({
    make: new FormControl<string>('', { nonNullable: true }),
    model: new FormControl<string>('', { nonNullable: true }),
    year: new FormControl<number | null>(null, {
      validators: [Validators.min(VEHICLE_YEAR_MIN), Validators.max(VEHICLE_YEAR_MAX)],
    }),
    license_plate: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.pattern(LICENSE_PLATE_REGEX)],
    }),
  });
}

describe('VehicleStepComponent', () => {
  let fixture: ComponentFixture<VehicleStepComponent>;
  let component: VehicleStepComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleStepComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleStepComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', createVehicleForm());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render step title', () => {
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3).toBeTruthy();
  });

  it('should render info note', () => {
    const infoNote = fixture.nativeElement.querySelector('.bg-info-bg');
    expect(infoNote).toBeTruthy();
  });

  it('should render make input', () => {
    const input = fixture.nativeElement.querySelector('#vehicle-make');
    expect(input).toBeTruthy();
    expect(input.type).toBe('text');
  });

  it('should render model input', () => {
    const input = fixture.nativeElement.querySelector('#vehicle-model');
    expect(input).toBeTruthy();
    expect(input.type).toBe('text');
  });

  it('should render year input', () => {
    const input = fixture.nativeElement.querySelector('#vehicle-year');
    expect(input).toBeTruthy();
    expect(input.type).toBe('number');
  });

  it('should render license plate input', () => {
    const input = fixture.nativeElement.querySelector('#vehicle-plate');
    expect(input).toBeTruthy();
    expect(input.type).toBe('text');
  });

  it('should have all fields as optional (no required markers)', () => {
    const requiredMarkers = fixture.nativeElement.querySelectorAll('.text-danger');
    expect(requiredMarkers.length).toBe(0);
  });

  it('should bind form values correctly', () => {
    const form = component.formGroup();
    form.controls['make'].setValue('Toyota');
    form.controls['model'].setValue('Corolla');
    fixture.detectChanges();

    const makeInput = fixture.nativeElement.querySelector('#vehicle-make') as HTMLInputElement;
    expect(makeInput.value).toBe('Toyota');
  });

  // --- Year validation ---

  it('should accept valid year within range', () => {
    const form = component.formGroup();
    form.controls['year'].setValue(2020);
    expect(form.controls['year'].valid).toBe(true);
  });

  it('should reject year below minimum (1960)', () => {
    const form = component.formGroup();
    form.controls['year'].setValue(1950);
    expect(form.controls['year'].invalid).toBe(true);
    expect(form.controls['year'].hasError('min')).toBe(true);
  });

  it('should reject year above maximum (currentYear+1)', () => {
    const form = component.formGroup();
    form.controls['year'].setValue(VEHICLE_YEAR_MAX + 1);
    expect(form.controls['year'].invalid).toBe(true);
    expect(form.controls['year'].hasError('max')).toBe(true);
  });

  it('should show year error message when invalid', () => {
    const form = component.formGroup();
    form.controls['year'].setValue(1900);
    form.controls['year'].markAsDirty();
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('p.text-xs.text-danger');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should accept year at boundaries (1960 and max)', () => {
    const form = component.formGroup();
    form.controls['year'].setValue(1960);
    expect(form.controls['year'].valid).toBe(true);

    form.controls['year'].setValue(VEHICLE_YEAR_MAX);
    expect(form.controls['year'].valid).toBe(true);
  });

  // --- License plate validation ---

  it('should accept old format plate (ABC 123)', () => {
    const form = component.formGroup();
    form.controls['license_plate'].setValue('ABC 123');
    expect(form.controls['license_plate'].valid).toBe(true);
  });

  it('should accept old format plate without space (ABC123)', () => {
    const form = component.formGroup();
    form.controls['license_plate'].setValue('ABC123');
    expect(form.controls['license_plate'].valid).toBe(true);
  });

  it('should accept Mercosur format plate (AB 123 CD)', () => {
    const form = component.formGroup();
    form.controls['license_plate'].setValue('AB 123 CD');
    expect(form.controls['license_plate'].valid).toBe(true);
  });

  it('should accept Mercosur format plate without spaces (AB123CD)', () => {
    const form = component.formGroup();
    form.controls['license_plate'].setValue('AB123CD');
    expect(form.controls['license_plate'].valid).toBe(true);
  });

  it('should reject invalid plate format', () => {
    const form = component.formGroup();
    form.controls['license_plate'].setValue('asddsadsasdasdasda');
    expect(form.controls['license_plate'].invalid).toBe(true);
    expect(form.controls['license_plate'].hasError('pattern')).toBe(true);
  });

  it('should show plate error message when invalid', () => {
    const form = component.formGroup();
    form.controls['license_plate'].setValue('INVALID');
    form.controls['license_plate'].markAsDirty();
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('p.text-xs.text-danger');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should accept empty plate (field is optional)', () => {
    const form = component.formGroup();
    form.controls['license_plate'].setValue('');
    expect(form.controls['license_plate'].valid).toBe(true);
  });

  it('should accept null year (field is optional)', () => {
    const form = component.formGroup();
    form.controls['year'].setValue(null);
    expect(form.controls['year'].valid).toBe(true);
  });
});
