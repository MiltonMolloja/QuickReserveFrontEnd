import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ServerCrash } from 'lucide-angular';

import { ErrorDetailRowComponent } from './error-detail-row.component';

describe('ErrorDetailRowComponent', () => {
  let fixture: ComponentFixture<ErrorDetailRowComponent>;
  let component: ErrorDetailRowComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorDetailRowComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorDetailRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', ServerCrash);
    fixture.componentRef.setInput('label', 'Error Code');
    fixture.componentRef.setInput('value', 'HTTP 500');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label text', () => {
    const label = fixture.nativeElement.textContent;
    expect(label).toContain('Error Code');
  });

  it('should render the value text', () => {
    const value = fixture.nativeElement.textContent;
    expect(value).toContain('HTTP 500');
  });

  it('should render lucide icon', () => {
    const icon = fixture.nativeElement.querySelector('lucide-angular');
    expect(icon).toBeTruthy();
  });

  it('should render danger icon box with bg-danger-bg class', () => {
    const iconBox = fixture.nativeElement.querySelector('.bg-danger-bg');
    expect(iconBox).toBeTruthy();
  });

  it('should show divider by default', () => {
    const divider = fixture.nativeElement.querySelector('.border-b');
    expect(divider).toBeTruthy();
  });

  it('should hide divider when showDivider is false', () => {
    fixture.componentRef.setInput('showDivider', false);
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('.border-b');
    expect(divider).toBeFalsy();
  });

  it('should apply danger text color when dangerValue is true', () => {
    fixture.componentRef.setInput('dangerValue', true);
    fixture.detectChanges();
    const valueEl = fixture.nativeElement.querySelector('.text-danger');
    expect(valueEl).toBeTruthy();
  });

  it('should render extra lines when provided', () => {
    fixture.componentRef.setInput('extraLines', ['Line 1', 'Line 2']);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Line 1');
    expect(text).toContain('Line 2');
  });

  it('should not render extra lines when empty', () => {
    fixture.componentRef.setInput('extraLines', []);
    fixture.detectChanges();
    // Only label + value should be present, no extra spans
    const spans = fixture.nativeElement.querySelectorAll('.text-\\[13px\\]');
    // 1 for label only (no extra lines)
    expect(spans.length).toBe(1);
  });
});
