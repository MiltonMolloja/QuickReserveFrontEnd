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

  /** Helper: open the dropdown */
  function openDropdown(): void {
    const toggle = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]',
    ) as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Toggle button ---

  it('should render toggle button', () => {
    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="listbox"]');
    expect(btn).toBeTruthy();
  });

  it('should not show slots dropdown initially', () => {
    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group).toBeFalsy();
  });

  it('should set aria-expanded to false initially', () => {
    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="listbox"]');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('should open dropdown on toggle click', () => {
    openDropdown();
    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group).toBeTruthy();
  });

  it('should set aria-expanded to true when open', () => {
    openDropdown();
    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="listbox"]');
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close dropdown on second toggle click', () => {
    openDropdown();
    openDropdown();
    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group).toBeFalsy();
  });

  it('should apply rotate-180 to chevron when open', () => {
    openDropdown();
    const chevrons = fixture.nativeElement.querySelectorAll(
      'button[aria-haspopup="listbox"] lucide-angular',
    );
    const chevron = chevrons[1]; // second icon is chevron-down
    expect(chevron.classList.contains('rotate-180')).toBe(true);
  });

  // --- Display ---

  it('should show placeholder when no time is selected', () => {
    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="listbox"]');
    expect(btn.textContent).toBeTruthy();
  });

  it('should show selected time in display', () => {
    fixture.componentRef.setInput('selectedTime', '10:00');
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="listbox"]');
    expect(btn.textContent).toContain('10:00');
  });

  it('should apply primary border when time is selected', () => {
    fixture.componentRef.setInput('selectedTime', '10:00');
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="listbox"]');
    expect(btn.className).toContain('border-primary');
  });

  it('should render timer icon in toggle button', () => {
    const icon = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"] lucide-angular',
    );
    expect(icon).toBeTruthy();
  });

  // --- Slots grid (requires open dropdown) ---

  it('should render 9 time slots by default (09:00 to 17:00)', () => {
    openDropdown();
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons.length).toBe(9);
  });

  it('should display time slots in 24h format', () => {
    openDropdown();
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons[0].textContent.trim()).toBe('09:00');
    expect(buttons[8].textContent.trim()).toBe('17:00');
  });

  it('should render all hours from 09:00 to 17:00', () => {
    openDropdown();
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
    openDropdown();
    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group).toBeTruthy();
  });

  it('should render hint text in dropdown', () => {
    openDropdown();
    const hint = fixture.nativeElement.querySelector('.text-xs');
    expect(hint).toBeTruthy();
  });

  it('should mark selected slot with aria-checked true', () => {
    fixture.componentRef.setInput('selectedTime', '10:00');
    fixture.detectChanges();
    openDropdown();

    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    const slot10 = buttons[1]; // 10:00 is index 1
    expect(slot10.getAttribute('aria-checked')).toBe('true');
  });

  it('should mark non-selected slots with aria-checked false', () => {
    fixture.componentRef.setInput('selectedTime', '10:00');
    fixture.detectChanges();
    openDropdown();

    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons[0].getAttribute('aria-checked')).toBe('false'); // 09:00
    expect(buttons[2].getAttribute('aria-checked')).toBe('false'); // 11:00
  });

  // --- Selection ---

  it('should emit timeSelected on slot click', () => {
    openDropdown();
    const emitSpy = jest.spyOn(component.timeSelected, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');

    (buttons[3] as HTMLButtonElement).click(); // 12:00
    expect(emitSpy).toHaveBeenCalledWith('12:00');
  });

  it('should close dropdown after selecting a slot', () => {
    openDropdown();
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    (buttons[3] as HTMLButtonElement).click();
    fixture.detectChanges();

    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group).toBeFalsy();
  });

  // --- Disabled slots ---

  it('should disable slots in disabledSlots list', () => {
    fixture.componentRef.setInput('disabledSlots', ['17:00']);
    fixture.detectChanges();
    openDropdown();

    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    const slot17 = buttons[8]; // 17:00 is last
    expect(slot17.disabled).toBe(true);
    expect(slot17.getAttribute('aria-disabled')).toBe('true');
  });

  it('should not emit timeSelected for disabled slot click', () => {
    fixture.componentRef.setInput('disabledSlots', ['17:00']);
    fixture.detectChanges();
    openDropdown();

    const emitSpy = jest.spyOn(component.timeSelected, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');

    (buttons[8] as HTMLButtonElement).click(); // 17:00 disabled
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should not close dropdown when clicking disabled slot', () => {
    fixture.componentRef.setInput('disabledSlots', ['17:00']);
    fixture.detectChanges();
    openDropdown();

    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    (buttons[8] as HTMLButtonElement).click();
    fixture.detectChanges();

    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group).toBeTruthy();
  });

  // --- Custom hours ---

  it('should support custom start and end hours', () => {
    fixture.componentRef.setInput('startHour', 8);
    fixture.componentRef.setInput('endHour', 12);
    fixture.detectChanges();
    openDropdown();

    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons.length).toBe(5); // 08, 09, 10, 11, 12
    expect(buttons[0].textContent.trim()).toBe('08:00');
    expect(buttons[4].textContent.trim()).toBe('12:00');
  });
});
