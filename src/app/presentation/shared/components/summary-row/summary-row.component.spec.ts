import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Wrench } from 'lucide-angular';

import { SummaryRowComponent } from './summary-row.component';

describe('SummaryRowComponent', () => {
  let fixture: ComponentFixture<SummaryRowComponent>;
  let component: SummaryRowComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryRowComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', Wrench);
    fixture.componentRef.setInput('label', 'Servicio');
    fixture.componentRef.setInput('value', 'Mantenimiento');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    const label = fixture.nativeElement.querySelector('.text-text-secondary');
    expect(label.textContent.trim()).toBe('Servicio');
  });

  it('should display the value', () => {
    const value = fixture.nativeElement.querySelector('.font-medium');
    expect(value.textContent.trim()).toBe('Mantenimiento');
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

  it('should render lucide icon', () => {
    const icon = fixture.nativeElement.querySelector('lucide-angular');
    expect(icon).toBeTruthy();
  });

  it('should default showDivider to true', () => {
    expect(component.showDivider()).toBe(true);
  });
});
