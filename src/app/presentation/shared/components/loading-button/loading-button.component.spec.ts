import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Check } from 'lucide-angular';

import { LoadingButtonComponent } from './loading-button.component';

describe('LoadingButtonComponent', () => {
  let fixture: ComponentFixture<LoadingButtonComponent>;
  let component: LoadingButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingButtonComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Submit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label text', () => {
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent.trim()).toBe('Submit');
  });

  it('should emit buttonClick on click', () => {
    const emitSpy = jest.spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not emit when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should not emit when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should show spinner when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('svg.animate-spin');
    expect(spinner).toBeTruthy();
  });

  it('should disable button when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should disable button when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should render icon when provided and not loading', () => {
    fixture.componentRef.setInput('icon', Check);
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('lucide-angular');
    expect(icon).toBeTruthy();
  });

  it('should default to button type', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('button');
  });

  it('should support submit type', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('submit');
  });

  it('should default variant to solid', () => {
    expect(component.variant()).toBe('solid');
  });

  it('should apply solid variant classes', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('bg-primary')).toBe(true);
  });
});
