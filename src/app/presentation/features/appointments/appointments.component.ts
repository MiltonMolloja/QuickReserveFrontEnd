import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Container component for the appointments list page.
 * Placeholder — full implementation in Fase 6.
 */
@Component({
  selector: 'app-appointments',
  template: '<p>Appointments works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsComponent {
  protected readonly pageTitle = 'appointments';
}
