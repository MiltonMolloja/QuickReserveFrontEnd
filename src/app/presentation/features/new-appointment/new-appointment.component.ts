import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, Check, ArrowLeft } from 'lucide-angular';

import type { CreateAppointmentDto } from '../../../domain/models/create-appointment.dto';
import { SERVICE_TYPE_OPTIONS } from '../../../domain/enums/service-type.enum';
import { WorkshopsState } from '../../../application/state/workshops.state';
import { AppointmentsState } from '../../../application/state/appointments.state';
import { GetWorkshopsUseCase } from '../../../application/use-cases/get-workshops.use-case';
import { CreateAppointmentUseCase } from '../../../application/use-cases/create-appointment.use-case';

import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { LoadingButtonComponent } from '../../shared/components/loading-button/loading-button.component';

import { ServiceStepComponent } from './steps/service-step/service-step.component';
import { ContactStepComponent } from './steps/contact-step/contact-step.component';
import { VehicleStepComponent } from './steps/vehicle-step/vehicle-step.component';

/**
 * Container (smart) component for the new appointment stepper.
 *
 * Manages:
 * - Multi-step form with 3 FormGroups (service, contact, vehicle)
 * - Stepper navigation (next, previous, cancel)
 * - Form validation per step (RN-01, RN-02)
 * - Workshop data fetching via GetWorkshopsUseCase
 * - Submission via CreateAppointmentUseCase
 * - Redirect to success page on completion
 *
 * Pattern: Container-Presentational (AP-06)
 */
@Component({
  selector: 'app-new-appointment',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    LucideAngularModule,
    NavbarComponent,
    ProgressBarComponent,
    LoadingButtonComponent,
    ServiceStepComponent,
    ContactStepComponent,
    VehicleStepComponent,
  ],
  templateUrl: './new-appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAppointmentComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly getWorkshops = inject(GetWorkshopsUseCase);
  private readonly createAppointment = inject(CreateAppointmentUseCase);

  protected readonly workshopsState = inject(WorkshopsState);
  protected readonly appointmentsState = inject(AppointmentsState);

  /** Current step (1-based) */
  protected readonly currentStep = signal(1);

  /** Total steps */
  protected readonly totalSteps = 3;

  /** Whether the form is being submitted */
  protected readonly submitting = signal(false);

  /** Submission error message */
  protected readonly submitError = signal<string | null>(null);

  /** Service type options */
  protected readonly serviceTypeOptions = SERVICE_TYPE_OPTIONS;

  /** Lucide icons */
  protected readonly checkIcon = Check;
  protected readonly arrowLeftIcon = ArrowLeft;

  // --- Reactive Form (multi-group) ---

  /** Step 1: Service info */
  protected readonly serviceForm = new FormGroup({
    place_id: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    service_type: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    appointment_date: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    appointment_time: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  /** Step 2: Contact info */
  protected readonly contactForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  /** Step 3: Vehicle info (all optional) */
  protected readonly vehicleForm = new FormGroup({
    make: new FormControl<string>('', { nonNullable: true }),
    model: new FormControl<string>('', { nonNullable: true }),
    year: new FormControl<number | null>(null),
    license_plate: new FormControl<string>('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.getWorkshops.execute();
  }

  // --- Stepper navigation ---

  /** Go to next step (validates current step first) */
  protected nextStep(): void {
    if (!this.isCurrentStepValid()) {
      this.markCurrentStepAsTouched();
      return;
    }
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update((s) => s + 1);
    }
  }

  /** Go to previous step */
  protected previousStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
    }
  }

  /** Cancel and go back to appointments list */
  protected cancel(): void {
    void this.router.navigate(['/appointments']);
  }

  /** Check if current step form is valid */
  private isCurrentStepValid(): boolean {
    switch (this.currentStep()) {
      case 1:
        return this.serviceForm.valid;
      case 2:
        return this.contactForm.valid;
      case 3:
        return true; // Vehicle is all optional
      default:
        return false;
    }
  }

  /** Mark all controls in current step as touched (to show validation errors) */
  private markCurrentStepAsTouched(): void {
    switch (this.currentStep()) {
      case 1:
        this.serviceForm.markAllAsTouched();
        break;
      case 2:
        this.contactForm.markAllAsTouched();
        break;
    }
  }

  // --- Submit ---

  /** Submit the appointment form */
  protected onSubmit(): void {
    if (!this.serviceForm.valid || !this.contactForm.valid) {
      return;
    }

    this.submitting.set(true);
    this.submitError.set(null);

    const dto = this.buildDto();

    this.createAppointment.execute(dto).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigate(['/appointment-success'], {
          state: { appointment: dto },
        });
      },
      error: (err: unknown) => {
        this.submitting.set(false);
        const message = err instanceof Error ? err.message : 'Error al crear el turno';
        this.submitError.set(message);
      },
    });
  }

  /** Build the CreateAppointmentDto from form values */
  private buildDto(): CreateAppointmentDto {
    const service = this.serviceForm.getRawValue();
    const contact = this.contactForm.getRawValue();
    const vehicle = this.vehicleForm.getRawValue();

    // Combine date + time into ISO string
    const appointmentAt = `${service.appointment_date}T${service.appointment_time}:00`;

    // Build vehicle only if at least one field has a value
    const hasVehicle =
      vehicle.make.length > 0 ||
      vehicle.model.length > 0 ||
      vehicle.year !== null ||
      vehicle.license_plate.length > 0;

    return {
      placeId: service.place_id,
      appointmentAt,
      serviceType: service.service_type,
      contact: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      },
      vehicle: hasVehicle
        ? {
            make: vehicle.make.length > 0 ? vehicle.make : undefined,
            model: vehicle.model.length > 0 ? vehicle.model : undefined,
            year: vehicle.year ?? undefined,
            licensePlate: vehicle.license_plate.length > 0 ? vehicle.license_plate : undefined,
          }
        : undefined,
    };
  }
}
