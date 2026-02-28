import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';

/**
 * Search input component with a search icon.
 *
 * Emits the search term on each input event for real-time filtering.
 * Used in the appointments list page for client-side search (RN-07).
 *
 * @example
 * ```html
 * <app-search-input
 *   [placeholder]="'Buscar por nombre o email...'"
 *   (searchChange)="onSearch($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-search-input',
  imports: [LucideAngularModule],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  /** Placeholder text for the input */
  readonly placeholder = input<string>('');

  /** Emits the current search term on each keystroke */
  readonly searchChange = output<string>();

  /** Lucide search icon */
  protected readonly searchIcon = Search;

  /** Handle input event */
  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchChange.emit(target.value);
  }
}
