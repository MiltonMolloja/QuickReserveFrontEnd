import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Stepper progress bar component.
 *
 * Displays a horizontal bar divided into segments representing steps.
 * Active/completed segments are filled with the primary color,
 * pending segments show a gray/dark background.
 *
 * @example
 * ```html
 * <app-progress-bar [totalSteps]="3" [currentStep]="2" />
 * ```
 */
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  /** Total number of steps */
  readonly totalSteps = input<number>(3);

  /** Current active step (1-based) */
  readonly currentStep = input<number>(1);

  /** Array of step indices for @for iteration */
  protected readonly steps = computed(() =>
    Array.from({ length: this.totalSteps() }, (_, i) => i + 1),
  );
}
