import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { VehicleStepComponent } from './vehicle-step.component';

function createVehicleForm(): FormGroup {
  return new FormGroup({
    make: new FormControl<string>('', { nonNullable: true }),
    model: new FormControl<string>('', { nonNullable: true }),
    year: new FormControl<number | null>(null),
    license_plate: new FormControl<string>('', { nonNullable: true }),
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
});
