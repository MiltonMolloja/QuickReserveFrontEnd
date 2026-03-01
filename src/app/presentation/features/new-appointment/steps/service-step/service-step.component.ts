import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { type FormControl, type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, Mail, Phone, Wrench } from 'lucide-angular';

import type { Workshop } from '../../../../../domain/models/workshop.model';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';
import { TimeSlotPickerComponent } from '../../../../shared/components/time-slot-picker/time-slot-picker.component';

/**
 * Presentational component for Step 1 of the appointment stepper.
 *
 * Displays form fields for:
 * - Workshop (select, required) - RF-02.1
 * - Service Type (select, required) - RF-02.2
 * - Date (date picker, required, not past) - RF-02.3
 * - Time (time slot picker, required, 09:00-17:00) - RF-02.4
 *
 * Receives the FormGroup from the container and workshops list.
 * Shows selected workshop info box when a workshop is selected.
 */
@Component({
  selector: 'app-service-step',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    LucideAngularModule,
    TimeSlotPickerComponent,
    DatePickerComponent,
  ],
  templateUrl: './service-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceStepComponent {
  /** Form group for step 1 (passed from container) */
  readonly formGroup = input.required<
    FormGroup<{
      place_id: FormControl<number>;
      service_type: FormControl<string>;
      appointment_date: FormControl<string>;
      appointment_time: FormControl<string>;
    }>
  >();

  /** Available workshops */
  readonly workshops = input.required<readonly Workshop[]>();

  /** Available service types */
  readonly serviceTypes =
    input.required<readonly { readonly value: string; readonly label: string }[]>();

  /** Lucide icons */
  protected readonly wrenchIcon = Wrench;
  protected readonly mailIcon = Mail;
  protected readonly whatsappIcon = Phone;

  /** Minimum date (today) for the date picker - prevents past dates (RN-04) */
  protected readonly minDate = new Date().toISOString().split('T')[0] ?? '';

  /** Disabled time slots (e.g., last hour of the day) */
  protected readonly disabledTimeSlots: readonly string[] = ['17:00'];

  /** Tracks the selected workshop id as a signal (FormControl.value is not reactive in computed) */
  protected readonly selectedPlaceId = signal(0);

  /** Sync signal with form value when formGroup input changes (e.g., navigating back to step 1) */
  private readonly syncPlaceId = effect(() => {
    this.selectedPlaceId.set(this.formGroup().controls.place_id.value);
  });

  /** Selected workshop info — reacts to selectedPlaceId signal changes */
  protected readonly selectedWorkshop = computed(() => {
    const placeId = this.selectedPlaceId();
    if (!placeId) {
      return null;
    }
    return this.workshops().find((w) => w.id === placeId) ?? null;
  });

  /** Handle workshop selection — syncs signal with form control */
  protected onWorkshopChange(): void {
    this.selectedPlaceId.set(this.formGroup().controls.place_id.value);
  }

  /** Handle date selection — updates the form control */
  protected onDateSelected(date: string): void {
    this.formGroup().controls.appointment_date.setValue(date);
    this.formGroup().controls.appointment_date.markAsTouched();
  }

  /** Handle time slot selection — updates the form control */
  protected onTimeSelected(time: string): void {
    this.formGroup().controls.appointment_time.setValue(time);
    this.formGroup().controls.appointment_time.markAsTouched();
  }
}
