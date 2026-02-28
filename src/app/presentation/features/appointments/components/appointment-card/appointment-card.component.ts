import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  LucideAngularModule,
  MapPin,
  Calendar,
  Clock3,
  User,
  Mail,
  Phone,
  Car,
} from 'lucide-angular';

import type { Appointment } from '../../../../../domain/models/appointment.model';
import type { Workshop } from '../../../../../domain/models/workshop.model';

/**
 * Presentational component for displaying a single appointment card.
 *
 * Shows:
 * - Service type as header title (RF-01.4: no badge, just title)
 * - Workshop info (name + address) when available (RF-01.3)
 * - Date and time
 * - Contact info (name, email, phone)
 * - Vehicle info when available (optional, RF-01.3)
 *
 * @example
 * ```html
 * <app-appointment-card
 *   [appointment]="appointment"
 *   [workshop]="workshop"
 * />
 * ```
 */
@Component({
  selector: 'app-appointment-card',
  imports: [LucideAngularModule],
  templateUrl: './appointment-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentCardComponent {
  /** The appointment data to display */
  readonly appointment = input.required<Appointment>();

  /** Optional workshop data (resolved from placeId) */
  readonly workshop = input<Workshop | undefined>(undefined);

  /** Lucide icons */
  protected readonly icons = {
    mapPin: MapPin,
    calendar: Calendar,
    clock: Clock3,
    user: User,
    mail: Mail,
    phone: Phone,
    car: Car,
  };

  /** Formatted date (e.g., "15 Mar 2026") */
  protected readonly formattedDate = computed(() => {
    const date = new Date(this.appointment().appointmentAt);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  });

  /** Formatted time (e.g., "10:00") */
  protected readonly formattedTime = computed(() => {
    const date = new Date(this.appointment().appointmentAt);
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  });

  /** Vehicle display string (e.g., "Toyota Corolla 2023 - AB123CD") */
  protected readonly vehicleDisplay = computed(() => {
    const vehicle = this.appointment().vehicle;
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
}
