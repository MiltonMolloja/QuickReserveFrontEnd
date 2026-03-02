import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
} from 'lucide-angular';

/** Represents a single day cell in the calendar grid */
export interface CalendarDay {
  /** Day number (1-31) */
  readonly day: number;
  /** Full ISO date string (YYYY-MM-DD) */
  readonly date: string;
  /** Whether this day belongs to the current displayed month */
  readonly isCurrentMonth: boolean;
  /** Whether this day is before minDate (disabled) */
  readonly isDisabled: boolean;
  /** Whether this day is today */
  readonly isToday: boolean;
}

/** Business days per week (Mon-Fri) */
const BUSINESS_DAYS = 5;

/** Saturday index (0=Mon in our system) */
const SATURDAY_INDEX = 5;

/** Sunday index (0=Mon in our system) */
const SUNDAY_INDEX = 6;

/**
 * Date picker component with a custom calendar dropdown.
 *
 * Displays a readonly input that toggles a calendar dropdown on click.
 * The calendar shows a full month grid with navigation, prevents past dates,
 * and supports a "Today" shortcut button.
 *
 * @example
 * ```html
 * <app-date-picker
 *   [selectedDate]="formControl.value"
 *   [minDate]="todayISO"
 *   (dateSelected)="onDateChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-date-picker',
  imports: [TranslatePipe, LucideAngularModule],
  templateUrl: './date-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  /** Currently selected date in YYYY-MM-DD format */
  readonly selectedDate = input<string>('');

  /** Minimum selectable date in YYYY-MM-DD format (dates before this are disabled) */
  readonly minDate = input<string>('');

  /** Whether to show the label above the input (default: true) */
  readonly showLabel = input<boolean>(true);

  /** Whether the field is in an invalid state (shows danger border) */
  readonly invalid = input<boolean>(false);

  /** Emits the selected date string in YYYY-MM-DD format */
  readonly dateSelected = output<string>();

  /** Emits when the selected date is cleared */
  readonly dateCleared = output<void>();

  /** Lucide icons */
  protected readonly calendarIcon = CalendarDays;
  protected readonly chevronDownIcon = ChevronDown;
  protected readonly chevronLeftIcon = ChevronLeft;
  protected readonly chevronRightIcon = ChevronRight;

  /** Whether the calendar dropdown is open */
  protected readonly isOpen = signal(false);

  /** Currently displayed month (0-11) */
  protected readonly displayMonth = signal(new Date().getMonth());

  /** Currently displayed year */
  protected readonly displayYear = signal(new Date().getFullYear());

  /** Weekday labels (Monday-Friday only, no weekends) */
  protected readonly weekdays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'] as const;

  /** Month names for display */
  private readonly monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ] as const;

  /** Formatted display label for the month/year header */
  protected readonly monthYearLabel = computed(() => {
    const monthName = this.monthNames[this.displayMonth()] ?? '';
    return `${monthName} ${String(this.displayYear())}`;
  });

  /** Formatted display value for the input field */
  protected readonly displayValue = computed(() => {
    const date = this.selectedDate();
    if (!date) {
      return '';
    }
    return this.formatDisplayDate(date);
  });

  /** Today's date in YYYY-MM-DD format */
  protected readonly todayISO = this.toISO(new Date());

  /** Whether the "Today" button should be disabled (past date or weekend) */
  protected readonly isTodayDisabled = computed(() => {
    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7;
    // Disable if today is Saturday or Sunday
    if (dayOfWeek === SATURDAY_INDEX || dayOfWeek === SUNDAY_INDEX) {
      return true;
    }
    const min = this.minDate();
    if (!min) {
      return false;
    }
    return this.todayISO < min;
  });

  /** Calendar grid: array of weeks, each containing 5 CalendarDay objects (Mon-Fri only) */
  protected readonly calendarWeeks = computed<CalendarDay[][]>(() => {
    const month = this.displayMonth();
    const year = this.displayYear();
    const min = this.minDate();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // getDay() returns 0=Sun; convert to Mon=0 system
    const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

    // If month starts on a weekday (Mon=0..Fri=4), fill previous weekdays
    // If month starts on Sat(5) or Sun(6), no padding needed
    const startOffset = firstDayOfWeek < BUSINESS_DAYS ? firstDayOfWeek : 0;

    const days: CalendarDay[] = [];

    // Previous month's trailing weekdays to fill the first week
    if (startOffset > 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = new Date(year, month, 0).getDate();
      for (let i = startOffset - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const date = this.buildISO(prevYear, prevMonth, day);
        days.push({
          day,
          date,
          isCurrentMonth: false,
          isDisabled: !!min && date < min,
          isToday: date === this.todayISO,
        });
      }
    }

    // Current month days — only weekdays (skip Sat & Sun)
    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = (new Date(year, month, d).getDay() + 6) % 7;
      if (dayOfWeek === SATURDAY_INDEX || dayOfWeek === SUNDAY_INDEX) {
        continue;
      }
      const date = this.buildISO(year, month, d);
      days.push({
        day: d,
        date,
        isCurrentMonth: true,
        isDisabled: !!min && date < min,
        isToday: date === this.todayISO,
      });
    }

    // Next month's leading weekdays to fill the last week
    const remaining = days.length % BUSINESS_DAYS;
    if (remaining > 0) {
      const toFill = BUSINESS_DAYS - remaining;
      let nextDay = 1;
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      let filled = 0;
      while (filled < toFill) {
        const dayOfWeek = (new Date(nextYear, nextMonth, nextDay).getDay() + 6) % 7;
        if (dayOfWeek !== SATURDAY_INDEX && dayOfWeek !== SUNDAY_INDEX) {
          const date = this.buildISO(nextYear, nextMonth, nextDay);
          days.push({
            day: nextDay,
            date,
            isCurrentMonth: false,
            isDisabled: !!min && date < min,
            isToday: date === this.todayISO,
          });
          filled++;
        }
        nextDay++;
      }
    }

    // Split into weeks of 5 (business days)
    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < days.length; i += BUSINESS_DAYS) {
      weeks.push(days.slice(i, i + BUSINESS_DAYS));
    }
    return weeks;
  });

  /** Toggle calendar dropdown */
  protected toggleCalendar(): void {
    const wasOpen = this.isOpen();
    this.isOpen.set(!wasOpen);

    // When opening, navigate to the selected date's month if available
    if (!wasOpen && this.selectedDate()) {
      const [yearStr, monthStr] = this.selectedDate().split('-');
      const year = Number(yearStr);
      const month = Number(monthStr) - 1;
      if (!isNaN(year) && !isNaN(month)) {
        this.displayYear.set(year);
        this.displayMonth.set(month);
      }
    }
  }

  /** Navigate to previous month */
  protected prevMonth(): void {
    if (this.displayMonth() === 0) {
      this.displayMonth.set(11);
      this.displayYear.update((y) => y - 1);
    } else {
      this.displayMonth.update((m) => m - 1);
    }
  }

  /** Navigate to next month */
  protected nextMonth(): void {
    if (this.displayMonth() === 11) {
      this.displayMonth.set(0);
      this.displayYear.update((y) => y + 1);
    } else {
      this.displayMonth.update((m) => m + 1);
    }
  }

  /** Select a day */
  protected selectDay(day: CalendarDay): void {
    if (day.isDisabled) {
      return;
    }
    this.dateSelected.emit(day.date);
    this.isOpen.set(false);
  }

  /** Clear the selected date */
  protected clearDate(): void {
    this.dateCleared.emit();
    this.isOpen.set(false);
  }

  /** Navigate to today and select it */
  protected goToToday(): void {
    if (this.isTodayDisabled()) {
      return;
    }
    const today = new Date();
    this.displayMonth.set(today.getMonth());
    this.displayYear.set(today.getFullYear());
    this.dateSelected.emit(this.todayISO);
    this.isOpen.set(false);
  }

  /** Build ISO date string from year, month (0-based), day */
  private buildISO(year: number, month: number, day: number): string {
    const m = (month + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${String(year)}-${m}-${d}`;
  }

  /** Convert Date to ISO date string */
  private toISO(date: Date): string {
    return this.buildISO(date.getFullYear(), date.getMonth(), date.getDate());
  }

  /** Format YYYY-MM-DD to "DD Mon YYYY" display format */
  private formatDisplayDate(isoDate: string): string {
    const parts = isoDate.split('-');
    const yearStr = parts[0] ?? '';
    const monthStr = parts[1] ?? '';
    const dayStr = parts[2] ?? '';
    const monthIndex = Number(monthStr) - 1;
    const shortMonths = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ] as const;
    const monthLabel = shortMonths[monthIndex] ?? monthStr;
    return `${dayStr} ${monthLabel} ${yearStr}`;
  }
}
