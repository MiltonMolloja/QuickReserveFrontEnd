import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EMAIL_REGEX, PHONE_REGEX } from '../../../../../domain/validators/appointment.validator';
import { ContactStepComponent } from './contact-step.component';

function createContactForm(): FormGroup {
  return new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(EMAIL_REGEX)],
    }),
    whatsapp: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(PHONE_REGEX)],
    }),
  });
}

describe('ContactStepComponent', () => {
  let fixture: ComponentFixture<ContactStepComponent>;
  let component: ContactStepComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactStepComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactStepComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', createContactForm());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render step title', () => {
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3).toBeTruthy();
  });

  it('should render name input', () => {
    const input = fixture.nativeElement.querySelector('#contact-name');
    expect(input).toBeTruthy();
    expect(input.type).toBe('text');
  });

  it('should render email input', () => {
    const input = fixture.nativeElement.querySelector('#contact-email');
    expect(input).toBeTruthy();
    expect(input.type).toBe('email');
  });

  it('should render whatsapp input', () => {
    const input = fixture.nativeElement.querySelector('#contact-whatsapp');
    expect(input).toBeTruthy();
    expect(input.type).toBe('tel');
  });

  it('should show required error for name when touched and empty', () => {
    const form = component.formGroup();
    form.controls['name'].markAsTouched();
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.text-danger');
    expect(error).toBeTruthy();
  });

  it('should show required error for email when touched and empty', () => {
    const form = component.formGroup();
    form.controls['email'].markAsTouched();
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('.text-danger');
    const hasRequiredError = Array.from(errors).some((el: any) => el.classList.contains('text-xs'));
    expect(hasRequiredError).toBe(true);
  });

  it('should show required error for whatsapp when touched and empty', () => {
    const form = component.formGroup();
    form.controls['whatsapp'].markAsTouched();
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('p.text-xs.text-danger');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not show errors when form is valid', () => {
    const form = component.formGroup();
    form.controls['name'].setValue('Juan');
    form.controls['email'].setValue('juan@email.com');
    form.controls['whatsapp'].setValue('+54 11 1234-5678');
    form.markAllAsTouched();
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('p.text-xs.text-danger');
    expect(errors.length).toBe(0);
  });

  it('should show email format error for email without TLD', () => {
    const form = component.formGroup();
    form.controls['email'].setValue('user@domain');
    form.controls['email'].markAsTouched();
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('p.text-xs.text-danger');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should accept valid email with TLD', () => {
    const form = component.formGroup();
    form.controls['email'].setValue('user@domain.com');
    form.controls['email'].markAsTouched();
    fixture.detectChanges();

    const emailErrors = Array.from<HTMLElement>(
      fixture.nativeElement.querySelectorAll('p.text-xs.text-danger'),
    ).filter((el) => el.textContent?.includes('VALIDATION.EMAIL_INVALID'));
    expect(emailErrors.length).toBe(0);
  });

  it('should show phone format error for invalid whatsapp', () => {
    const form = component.formGroup();
    form.controls['whatsapp'].setValue('abc');
    form.controls['whatsapp'].markAsTouched();
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('p.text-xs.text-danger');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should accept valid whatsapp number', () => {
    const form = component.formGroup();
    form.controls['whatsapp'].setValue('+54 11 1234-5678');
    form.controls['whatsapp'].markAsTouched();
    fixture.detectChanges();

    const phoneErrors = Array.from<HTMLElement>(
      fixture.nativeElement.querySelectorAll('p.text-xs.text-danger'),
    ).filter((el) => el.textContent?.includes('VALIDATION.PHONE_INVALID'));
    expect(phoneErrors.length).toBe(0);
  });
});
