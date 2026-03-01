import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type FormControl, type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, User } from 'lucide-angular';

/**
 * Presentational component for Step 2 of the appointment stepper.
 *
 * Displays form fields for:
 * - Full Name (required) - RF-02.5
 * - Email (required, valid format) - RF-02.6
 * - Phone (required) - RF-02.7
 *
 * Receives the FormGroup from the container.
 */
@Component({
  selector: 'app-contact-step',
  imports: [ReactiveFormsModule, TranslatePipe, LucideAngularModule],
  templateUrl: './contact-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactStepComponent {
  /** Form group for step 2 (passed from container) */
  readonly formGroup = input.required<
    FormGroup<{
      name: FormControl<string>;
      email: FormControl<string>;
      phone: FormControl<string>;
    }>
  >();

  /** Lucide icons */
  protected readonly userIcon = User;
}
