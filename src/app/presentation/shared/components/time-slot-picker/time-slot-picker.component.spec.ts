import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TimeSlotPickerComponent } from './time-slot-picker.component';

describe('TimeSlotPickerComponent', () => {
  let fixture: ComponentFixture<TimeSlotPickerComponent>;
  let component: TimeSlotPickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSlotPickerComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSlotPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 9 time slots by default (09:00 to 17:00)', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons.length).toBe(9);
  });

  it('should display time slots in 24h format', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons[0].textContent.trim()).toBe('09:00');
    expect(buttons[8].textContent.trim()).toBe('17:00');
  });

  it('should render all hours from 09:00 to 17:00', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    const times = Array.from<HTMLButtonElement>(buttons).map((b) => b.textContent?.trim());
    expect(times).toEqual([
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ]);
  });

  it('should render radiogroup with aria-label', () => {
    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group).toBeTruthy();
  });

  it('should show placeholder when no time is selected', () => {
    const display = fixture.nativeElement.querySelector('.rounded-lg span');
    expect(display).toBeTruthy();
  });

  it('should show selected time in display', () => {
    fixture.componentRef.setInput('selectedTime', '10:00');
    fixture.detectChanges();

    const display = fixture.nativeElement.querySelector('.rounded-lg span');
    expect(display.textContent.trim()).toBe('10:00');
  });

  it('should mark selected slot with aria-checked true', () => {
    fixture.componentRef.setInput('selectedTime', '10:00');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    const slot10 = buttons[1]; // 10:00 is index 1
    expect(slot10.getAttribute('aria-checked')).toBe('true');
  });

  it('should mark non-selected slots with aria-checked false', () => {
    fixture.componentRef.setInput('selectedTime', '10:00');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons[0].getAttribute('aria-checked')).toBe('false'); // 09:00
    expect(buttons[2].getAttribute('aria-checked')).toBe('false'); // 11:00
  });

  it('should emit timeSelected on slot click', () => {
    const emitSpy = jest.spyOn(component.timeSelected, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');

    (buttons[3] as HTMLButtonElement).click(); // 12:00
    expect(emitSpy).toHaveBeenCalledWith('12:00');
  });

  it('should disable slots in disabledSlots list', () => {
    fixture.componentRef.setInput('disabledSlots', ['17:00']);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    const slot17 = buttons[8]; // 17:00 is last
    expect(slot17.disabled).toBe(true);
    expect(slot17.getAttribute('aria-disabled')).toBe('true');
  });

  it('should not emit timeSelected for disabled slot click', () => {
    fixture.componentRef.setInput('disabledSlots', ['17:00']);
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.timeSelected, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');

    (buttons[8] as HTMLButtonElement).click(); // 17:00 disabled
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should support custom start and end hours', () => {
    fixture.componentRef.setInput('startHour', 8);
    fixture.componentRef.setInput('endHour', 12);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons.length).toBe(5); // 08, 09, 10, 11, 12
    expect(buttons[0].textContent.trim()).toBe('08:00');
    expect(buttons[4].textContent.trim()).toBe('12:00');
  });

  it('should render timer icon in display', () => {
    const icon = fixture.nativeElement.querySelector('.rounded-lg lucide-angular');
    expect(icon).toBeTruthy();
  });

  it('should apply primary border when time is selected', () => {
    fixture.componentRef.setInput('selectedTime', '10:00');
    fixture.detectChanges();

    const display = fixture.nativeElement.querySelector('.rounded-lg.border-primary');
    expect(display).toBeTruthy();
  });
});
