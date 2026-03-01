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
  ServerCrash,
  CircleAlert,
  Lightbulb,
  RotateCcw,
  House,
} from 'lucide-angular';

import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ErrorIconComponent } from '../../shared/components/error-icon/error-icon.component';
import { ErrorDetailRowComponent } from '../../shared/components/error-detail-row/error-detail-row.component';
import { LoadingButtonComponent } from '../../shared/components/loading-button/loading-button.component';

/**
 * Error state passed via router state from the stepper.
 */
export interface AppointmentErrorState {
  readonly errorMessage: string;
  readonly errorCode?: string;
}

/**
 * Container component for the appointment error page.
 *
 * Displays:
 * - Simple navbar with back link
 * - Error icon with red gradient circle and X mark
 * - Title and subtitle
 * - Error detail card with code, message, and suggestions
 * - Action buttons: "Retry" and "Go Home"
 *
 * Receives error data via Router state (navigation extras).
 * If no state is available, shows a generic error message.
 */
@Component({
  selector: 'app-appointment-error',
  imports: [
    TranslatePipe,
    LucideAngularModule,
    NavbarComponent,
    ErrorIconComponent,
    ErrorDetailRowComponent,
    LoadingButtonComponent,
  ],
  templateUrl: './appointment-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentErrorComponent implements OnInit {
  private readonly router = inject(Router);

  /** Error state from router */
  protected readonly errorState = signal<AppointmentErrorState | null>(null);

  /** Lucide icons */
  protected readonly icons = {
    serverCrash: ServerCrash,
    circleAlert: CircleAlert,
    lightbulb: Lightbulb,
    retry: RotateCcw,
    home: House,
  };

  /** Error code display */
  protected readonly errorCode = computed(() => {
    return this.errorState()?.errorCode ?? 'HTTP 500 - Internal Server Error';
  });

  /** Error message display */
  protected readonly errorMessage = computed(() => {
    return this.errorState()?.errorMessage ?? 'El servidor no pudo procesar la solicitud.';
  });

  ngOnInit(): void {
    const historyState = history.state as { error?: AppointmentErrorState } | undefined;

    if (historyState?.error) {
      this.errorState.set(historyState.error);
    }
    // If no error state, we still show the page with generic defaults
  }

  /** Navigate back to the stepper to retry */
  protected retry(): void {
    void this.router.navigate(['/new-appointment']);
  }

  /** Navigate to appointments list (home) */
  protected goHome(): void {
    void this.router.navigate(['/appointments']);
  }
}
