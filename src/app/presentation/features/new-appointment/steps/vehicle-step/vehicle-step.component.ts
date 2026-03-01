import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type FormControl, type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, Car } from 'lucide-angular';

/**
 * Presentational component for Step 3 of the appointment stepper.
 *
 * Displays form fields for (all optional - RF-02.8):
 * - Make (marca)
 * - Model (modelo)
 * - Year (año)
 * - License Plate (patente)
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

  /** Lucide icons */
  protected readonly carIcon = Car;
}
