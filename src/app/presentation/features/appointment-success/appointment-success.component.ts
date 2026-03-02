import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideAngularModule,
  Wrench,
  MapPin,
  Calendar,
  Clock3,
  User,
  Car,
  Plus,
  List,
} from 'lucide-angular';

import type { CreateAppointmentDto } from '../../../domain/models/create-appointment.dto';
import { WorkshopsState } from '../../../application/state/workshops.state';

import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SuccessIconComponent } from '../../shared/components/success-icon/success-icon.component';
import { SummaryRowComponent } from '../../shared/components/summary-row/summary-row.component';
import { LoadingButtonComponent } from '../../shared/components/loading-button/loading-button.component';

/**
 * Container component for the appointment success/confirmation page.
 *
 * Displays:
 * - Simple navbar with back link (RF-03.1)
 * - Success icon with green gradient circle (RF-03.2)
 * - Title and subtitle (RF-03.3)
 * - Summary card with 6 rows (RF-03.4)
 * - Action buttons: "Create another" and "View appointments" (RF-03.5, RF-03.6)
 *
 * Receives appointment data via Router state (navigation extras).
 * If no state is available, redirects back to appointments.
 */
@Component({
  selector: 'app-appointment-success',
  imports: [
    TranslatePipe,
    LucideAngularModule,
    NavbarComponent,
    SuccessIconComponent,
    SummaryRowComponent,
    LoadingButtonComponent,
  ],
  templateUrl: './appointment-success.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentSuccessComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly workshopsState = inject(WorkshopsState);

  /** Appointment data from router state */
  protected readonly appointment = signal<CreateAppointmentDto | null>(null);

  /** Lucide icons for summary rows */
  protected readonly icons = {
    wrench: Wrench,
    mapPin: MapPin,
    calendar: Calendar,
    clock: Clock3,
    user: User,
    car: Car,
    plus: Plus,
    list: List,
  };

  /** Resolved workshop name */
  protected readonly workshopName = computed(() => {
    const appt = this.appointment();
    if (!appt) {
      return '';
    }
    const ws = this.workshopsState.workshops().find((w) => w.id === appt.placeId);
    return ws?.name ?? `Taller #${appt.placeId.toString()}`;
  });

  /** Formatted date */
  protected readonly formattedDate = computed(() => {
    const appt = this.appointment();
    if (!appt) {
      return '';
    }
    const date = new Date(appt.appointmentAt);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });

  /** Formatted time */
  protected readonly formattedTime = computed(() => {
    const appt = this.appointment();
    if (!appt) {
      return '';
    }
    const date = new Date(appt.appointmentAt);
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  });

  /** Contact display string */
  protected readonly contactDisplay = computed(() => {
    const appt = this.appointment();
    if (!appt) {
      return '';
    }
    return `${appt.contact.name} · ${appt.contact.email} · ${appt.contact.whatsapp}`;
  });

  /** Vehicle display string */
  protected readonly vehicleDisplay = computed(() => {
    const vehicle = this.appointment()?.vehicle;
    if (!vehicle) {
      return null;
    }
    const parts = [
      vehicle.make,
      vehicle.model,
      vehicle.year?.toString(),
      vehicle.licensePlate,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : null;
  });

  ngOnInit(): void {
    // Read appointment data from router navigation state or history state
    const historyState = history.state as { appointment?: CreateAppointmentDto } | undefined;

    if (historyState?.appointment) {
      this.appointment.set(historyState.appointment);
    } else {
      // No data available, redirect to appointments
      void this.router.navigate(['/appointments']);
    }
  }

  /** Navigate to create another appointment */
  protected createAnother(): void {
    void this.router.navigate(['/new-appointment']);
  }

  /** Navigate to appointments list */
  protected viewAppointments(): void {
    void this.router.navigate(['/appointments']);
  }
}
