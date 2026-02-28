import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Container component for the appointment success page.
 * Placeholder — full implementation in Fase 8.
 */
@Component({
  selector: 'app-appointment-success',
  template: '<p>Appointment Success works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentSuccessComponent {
  protected readonly pageTitle = 'appointment-success';
}
