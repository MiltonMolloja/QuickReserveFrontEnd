import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type FormControl, type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, Car } from 'lucide-angular';

import {
  VEHICLE_YEAR_MIN,
  VEHICLE_YEAR_MAX,
} from '../../../../../domain/validators/appointment.validator';

/**
 * Presentational component for Step 3 of the appointment stepper.
 *
 * Displays form fields for (all optional - RF-02.8):
 * - Make (marca)
 * - Model (modelo)
 * - Year (año) — validated: 1960 to currentYear+1
 * - License Plate (patente) — validated: Argentine format (ABC 123 or AB 123 CD)
 *
 * Includes an info note: "Vehicle information is optional" (RF-02.9).
 * Receives the FormGroup from the container.
 */
@Component({
  selector: 'app-vehicle-step',
  imports: [ReactiveFormsModule, TranslatePipe, LucideAngularModule],
  templateUrl: './vehicle-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleStepComponent {
  /** Form group for step 3 (passed from container) */
  readonly formGroup = input.required<
    FormGroup<{
      make: FormControl<string>;
      model: FormControl<string>;
      year: FormControl<number | null>;
      license_plate: FormControl<string>;
    }>
  >();

  /** Year range constants for the template */
  protected readonly yearMin = VEHICLE_YEAR_MIN;
  protected readonly yearMax = VEHICLE_YEAR_MAX;

  /** Lucide icons */
  protected readonly carIcon = Car;
}
