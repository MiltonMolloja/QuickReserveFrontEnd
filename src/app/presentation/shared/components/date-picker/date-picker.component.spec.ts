import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
  let fixture: ComponentFixture<DatePickerComponent>;
  let component: DatePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Input display ---

  it('should render the date input button', () => {
    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]');
    expect(btn).toBeTruthy();
  });

  it('should show placeholder when no date is selected', () => {
    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]');
    // No selected date → placeholder text (translate key shown as-is in test)
    expect(btn.textContent).toBeTruthy();
  });

  it('should show formatted date when selectedDate is set', () => {
    fixture.componentRef.setInput('selectedDate', '2026-03-02');
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]');
    expect(btn.textContent).toContain('02');
    expect(btn.textContent).toContain('Mar');
    expect(btn.textContent).toContain('2026');
  });

  it('should set aria-expanded to false when calendar is closed', () => {
    const btn = fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  // --- Calendar toggle ---

  it('should open calendar dropdown on button click', () => {
    const btn = fixture.nativeElement.querySelector(
      'button[aria-haspopup="dialog"]',
    ) as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
  });

  it('should set aria-expanded to true when calendar is open', () => {
    const btn = fixture.nativeElement.querySelector(
      'button[aria-haspopup="dialog"]',
    ) as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();

    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close calendar on second click', () => {
    const btn = fixture.nativeElement.querySelector(
      'button[aria-haspopup="dialog"]',
    ) as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    btn.click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeFalsy();
  });

  it('should not show calendar dropdown initially', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeFalsy();
  });

  // --- Weekday headers ---

  it('should render 5 weekday headers (Mon-Fri)', () => {
    // Open calendar
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('.grid-cols-5 span');
    expect(headers.length).toBe(5);
    const labels = Array.from<HTMLElement>(headers).map((h) => h.textContent?.trim());
    expect(labels).toEqual(['Lu', 'Ma', 'Mi', 'Ju', 'Vi']);
  });

  // --- Calendar grid ---

  it('should render day buttons in 5-column grid', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const grid = fixture.nativeElement.querySelector('[role="grid"]');
    expect(grid).toBeTruthy();
    expect(grid.classList.contains('grid-cols-5')).toBe(true);
  });

  it('should render day buttons with gridcell role', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('button[role="gridcell"]');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('should only contain weekdays (no Sat/Sun) in calendar', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('button[role="gridcell"]');
    for (const cell of Array.from<HTMLButtonElement>(cells)) {
      const dateStr = cell.getAttribute('aria-label') ?? '';
      // Parse YYYY-MM-DD manually to avoid UTC timezone issues
      const parts = dateStr.split('-');
      const y = Number(parts[0]);
      const m = Number(parts[1]) - 1;
      const d = Number(parts[2]);
      const date = new Date(y, m, d);
      const dayOfWeek = date.getDay();
      // 0=Sun, 6=Sat — neither should appear
      expect(dayOfWeek).not.toBe(0);
      expect(dayOfWeek).not.toBe(6);
    }
  });

  it('should have weeks of exactly 5 days each', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const weeks = component['calendarWeeks']();
    for (const week of weeks) {
      expect(week.length).toBe(5);
    }
  });

  // --- Day selection ---

  it('should emit dateSelected when a day is clicked', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.dateSelected, 'emit');
    const cells = fixture.nativeElement.querySelectorAll('button[role="gridcell"]:not([disabled])');
    const firstEnabled = cells[0] as HTMLButtonElement;
    firstEnabled.click();

    expect(emitSpy).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/));
  });

  it('should close calendar after selecting a day', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('button[role="gridcell"]:not([disabled])');
    (cells[0] as HTMLButtonElement).click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeFalsy();
  });

  it('should mark selected day with aria-selected true', () => {
    fixture.componentRef.setInput('selectedDate', '2026-03-02');
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const selected = fixture.nativeElement.querySelector('button[aria-selected="true"]');
    expect(selected).toBeTruthy();
    expect(selected.getAttribute('aria-label')).toBe('2026-03-02');
  });

  // --- Disabled days (minDate) ---

  it('should disable days before minDate', () => {
    fixture.componentRef.setInput('minDate', '2026-03-15');
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    // Navigate to March 2026
    component['displayMonth'].set(2); // March
    component['displayYear'].set(2026);
    fixture.detectChanges();

    const day2 = fixture.nativeElement.querySelector('button[aria-label="2026-03-02"]');
    if (day2) {
      expect(day2.disabled).toBe(true);
    }
  });

  it('should not emit dateSelected for disabled day', () => {
    fixture.componentRef.setInput('minDate', '2026-03-15');
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    component['displayMonth'].set(2);
    component['displayYear'].set(2026);
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.dateSelected, 'emit');
    const day2 = fixture.nativeElement.querySelector(
      'button[aria-label="2026-03-02"]',
    ) as HTMLButtonElement | null;
    day2?.click();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  // --- Month navigation ---

  it('should navigate to next month', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const initialMonth = component['displayMonth']();
    component['nextMonth']();
    fixture.detectChanges();

    if (initialMonth === 11) {
      expect(component['displayMonth']()).toBe(0);
    } else {
      expect(component['displayMonth']()).toBe(initialMonth + 1);
    }
  });

  it('should navigate to previous month', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const initialMonth = component['displayMonth']();
    component['prevMonth']();
    fixture.detectChanges();

    if (initialMonth === 0) {
      expect(component['displayMonth']()).toBe(11);
    } else {
      expect(component['displayMonth']()).toBe(initialMonth - 1);
    }
  });

  it('should wrap year forward when navigating past December', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    component['displayMonth'].set(11);
    const year = component['displayYear']();
    component['nextMonth']();

    expect(component['displayMonth']()).toBe(0);
    expect(component['displayYear']()).toBe(year + 1);
  });

  it('should wrap year backward when navigating before January', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    component['displayMonth'].set(0);
    const year = component['displayYear']();
    component['prevMonth']();

    expect(component['displayMonth']()).toBe(11);
    expect(component['displayYear']()).toBe(year - 1);
  });

  it('should render prev/next navigation buttons', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const prevBtn = fixture.nativeElement.querySelector('[aria-label="DATE_PICKER.PREV_MONTH"]');
    const nextBtn = fixture.nativeElement.querySelector('[aria-label="DATE_PICKER.NEXT_MONTH"]');
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
  });

  // --- Month/Year label ---

  it('should display month and year label', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const label = component['monthYearLabel']();
    expect(label).toMatch(/\w+ \d{4}/);
  });

  // --- Today button ---

  it('should render Today button in calendar', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('[role="dialog"] button');
    const todayBtn = Array.from<HTMLButtonElement>(buttons).find((b) =>
      b.textContent?.includes('DATE_PICKER.TODAY'),
    );
    expect(todayBtn).toBeTruthy();
  });

  it('should emit today date and close calendar on Today click when today is a weekday', () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    // Skip test if today is weekend
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return;
    }

    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.dateSelected, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('[role="dialog"] button');
    const todayBtn = Array.from<HTMLButtonElement>(buttons).find((b) =>
      b.textContent?.includes('DATE_PICKER.TODAY'),
    );
    todayBtn?.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(component['todayISO']);
    expect(component['isOpen']()).toBe(false);
  });

  // --- Clear button ---

  it('should not show Clear button when showClear is false (default)', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('[role="dialog"] button');
    const clearBtn = Array.from<HTMLButtonElement>(buttons).find((b) =>
      b.textContent?.includes('DATE_PICKER.CLEAR'),
    );
    expect(clearBtn).toBeFalsy();
  });

  it('should show Clear button when showClear is true', () => {
    fixture.componentRef.setInput('showClear', true);
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('[role="dialog"] button');
    const clearBtn = Array.from<HTMLButtonElement>(buttons).find((b) =>
      b.textContent?.includes('DATE_PICKER.CLEAR'),
    );
    expect(clearBtn).toBeTruthy();
  });

  it('should disable Clear button when no date is selected', () => {
    fixture.componentRef.setInput('showClear', true);
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('[role="dialog"] button');
    const clearBtn = Array.from<HTMLButtonElement>(buttons).find((b) =>
      b.textContent?.includes('DATE_PICKER.CLEAR'),
    );
    expect(clearBtn?.disabled).toBe(true);
  });

  it('should emit dateCleared and close calendar on Clear click', () => {
    fixture.componentRef.setInput('showClear', true);
    fixture.componentRef.setInput('selectedDate', '2026-03-15');
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.dateCleared, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('[role="dialog"] button');
    const clearBtn = Array.from<HTMLButtonElement>(buttons).find((b) =>
      b.textContent?.includes('DATE_PICKER.CLEAR'),
    );
    clearBtn?.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
    expect(component['isOpen']()).toBe(false);
  });

  // --- Navigate to selected date's month on open ---

  it('should navigate to selected date month when opening calendar', () => {
    fixture.componentRef.setInput('selectedDate', '2027-06-15');
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    expect(component['displayMonth']()).toBe(5); // June = 5
    expect(component['displayYear']()).toBe(2027);
  });

  // --- Display value formatting ---

  it('should format display value as DD Mon YYYY', () => {
    fixture.componentRef.setInput('selectedDate', '2026-01-15');
    fixture.detectChanges();

    const value = component['displayValue']();
    expect(value).toBe('15 Ene 2026');
  });

  it('should return empty display value when no date selected', () => {
    expect(component['displayValue']()).toBe('');
  });

  // --- selectDay with disabled day ---

  it('should not emit or close when selectDay is called with disabled day', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.dateSelected, 'emit');
    component['selectDay']({
      day: 1,
      date: '2020-01-01',
      isCurrentMonth: true,
      isDisabled: true,
      isToday: false,
    });

    expect(emitSpy).not.toHaveBeenCalled();
    expect(component['isOpen']()).toBe(true);
  });

  // --- goToToday when disabled ---

  it('should not emit when goToToday is called and today is disabled', () => {
    // Set minDate far in the future to ensure today is disabled
    fixture.componentRef.setInput('minDate', '2099-12-31');
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.dateSelected, 'emit');
    component['goToToday']();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  // --- Calendar icon ---

  it('should render calendar icon in input button', () => {
    const icon = fixture.nativeElement.querySelector(
      'button[aria-haspopup="dialog"] lucide-angular',
    );
    expect(icon).toBeTruthy();
  });

  // --- Chevron rotation ---

  it('should apply rotate-180 class to chevron when calendar is open', () => {
    (
      fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const chevrons = fixture.nativeElement.querySelectorAll(
      'button[aria-haspopup="dialog"] lucide-angular',
    );
    const chevronDown = chevrons[1]; // second icon is the chevron-down
    expect(chevronDown.classList.contains('rotate-180')).toBe(true);
  });
});
