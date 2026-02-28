import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Container component for the new appointment stepper.
 * Placeholder — full implementation in Fase 7.
 */
@Component({
  selector: 'app-new-appointment',
  template: '<p>New Appointment works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAppointmentComponent {
  protected readonly pageTitle = 'new-appointment';
}
