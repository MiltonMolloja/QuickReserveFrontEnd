import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, Timer } from 'lucide-angular';

/** Represents a single time slot with availability */
export interface TimeSlot {
  readonly time: string;
  readonly disabled: boolean;
}

/** Default business hours: 09:00 to 17:00 */
const DEFAULT_START_HOUR = 9;
const DEFAULT_END_HOUR = 17;

/**
 * Time slot picker component for selecting appointment hours.
 *
 * Displays a grid of hourly time slots (format 24h) from 09:00 to 17:00.
 * Supports three visual states:
 * - **Available**: Default slot, clickable
 * - **Selected**: Highlighted with primary color
 * - **Disabled**: Greyed out, not clickable
 *
 * @example
 * ```html
 * <app-time-slot-picker
 *   [selectedTime]="formControl.value"
 *   [disabledSlots]="['17:00']"
 *   (timeSelected)="onTimeChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-time-slot-picker',
  imports: [TranslatePipe, LucideAngularModule],
  templateUrl: './time-slot-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeSlotPickerComponent {
  /** Currently selected time value (e.g., "10:00") */
  readonly selectedTime = input<string>('');

  /** List of disabled time strings (e.g., ["17:00"]) */
  readonly disabledSlots = input<readonly string[]>([]);

  /** Start hour (inclusive, default 9) */
  readonly startHour = input<number>(DEFAULT_START_HOUR);

  /** End hour (inclusive, default 17) */
  readonly endHour = input<number>(DEFAULT_END_HOUR);

  /** Emits the selected time string (e.g., "10:00") */
  readonly timeSelected = output<string>();

  /** Lucide timer icon */
  protected readonly timerIcon = Timer;

  /** Generate time slots from startHour to endHour */
  protected readonly slots = computed<TimeSlot[]>(() => {
    const disabled = new Set(this.disabledSlots());
    const result: TimeSlot[] = [];
    for (let h = this.startHour(); h <= this.endHour(); h++) {
      const time = `${h.toString().padStart(2, '0')}:00`;
      result.push({ time, disabled: disabled.has(time) });
    }
    return result;
  });

  /** Handle slot click */
  protected selectSlot(slot: TimeSlot): void {
    if (!slot.disabled) {
      this.timeSelected.emit(slot.time);
    }
  }
}
