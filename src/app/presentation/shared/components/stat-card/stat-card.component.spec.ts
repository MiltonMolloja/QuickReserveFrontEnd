import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, Component } from '@angular/core';
import { Calendar } from 'lucide-angular';

import { StatCardComponent } from './stat-card.component';

@Component({
  template: `
    <app-stat-card
      [icon]="icon"
      [label]="label"
      [value]="value"
      [iconColorClass]="iconColor"
      [iconBgClass]="iconBg"
    />
  `,
  imports: [StatCardComponent],
})
class TestHostComponent {
  icon = Calendar;
  label = 'Total Turnos';
  value = '24';
  iconColor = 'text-primary';
  iconBg = 'bg-info-bg';
}

describe('StatCardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.nativeElement.querySelector('app-stat-card')).toBeTruthy();
  });

  it('should display the label', () => {
    const label = fixture.nativeElement.querySelector('p.text-xs');
    expect(label.textContent.trim()).toBe('Total Turnos');
  });

  it('should display the value', () => {
    const value = fixture.nativeElement.querySelector('p.text-xl');
    expect(value.textContent.trim()).toBe('24');
  });

  it('should apply icon background class', () => {
    const iconContainer = fixture.nativeElement.querySelector('.rounded-xl.flex.h-10');
    expect(iconContainer.classList.contains('bg-info-bg')).toBe(true);
  });

  it('should use default icon classes when not provided', () => {
    const directFixture = TestBed.createComponent(StatCardComponent);
    directFixture.componentRef.setInput('icon', Calendar);
    directFixture.componentRef.setInput('label', 'Test');
    directFixture.componentRef.setInput('value', '0');
    directFixture.detectChanges();

    expect(directFixture.componentInstance.iconColorClass()).toBe('text-primary');
    expect(directFixture.componentInstance.iconBgClass()).toBe('bg-info-bg dark:bg-indigo-dark');
  });
});
