import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, CalendarClock, Calendar, Activity, Plus } from 'lucide-angular';

import { AppointmentsState } from '../../../application/state/appointments.state';
import { WorkshopsState } from '../../../application/state/workshops.state';
import { GetAppointmentsUseCase } from '../../../application/use-cases/get-appointments.use-case';
import { GetWorkshopsUseCase } from '../../../application/use-cases/get-workshops.use-case';
import { FilterAppointmentsUseCase } from '../../../application/use-cases/filter-appointments.use-case';
import { SERVICE_TYPE_OPTIONS } from '../../../domain/enums/service-type.enum';
import { ThemeAdapter } from '../../../infrastructure/theme/theme.adapter';

import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { LanguageSelectorComponent } from '../../shared/components/language-selector/language-selector.component';
import { ThemeSelectorComponent } from '../../shared/components/theme-selector/theme-selector.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';
import { FiltersBarComponent } from './components/filters-bar/filters-bar.component';

/**
 * Container (smart) component for the appointments list page.
 *
 * Responsibilities:
 * - Fetches appointments and workshops on init via use cases
 * - Provides state signals to presentational children
 * - Handles filter events from FiltersBarComponent
 * - Computes stats (total, today, occupancy) via signals
 * - Resolves workshop data for each appointment card
 *
 * Pattern: Container-Presentational (AP-06)
 */
@Component({
  selector: 'app-appointments',
  imports: [
    RouterLink,
    TranslatePipe,
    LucideAngularModule,
    NavbarComponent,
    LanguageSelectorComponent,
    ThemeSelectorComponent,
    StatCardComponent,
    AppointmentCardComponent,
    FiltersBarComponent,
  ],
  templateUrl: './appointments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsComponent implements OnInit {
  // --- Injected services ---
  private readonly getAppointments = inject(GetAppointmentsUseCase);
  private readonly getWorkshops = inject(GetWorkshopsUseCase);
  private readonly _themeAdapter = inject(ThemeAdapter);

  // --- Public state for template ---
  protected readonly appointmentsState = inject(AppointmentsState);
  protected readonly workshopsState = inject(WorkshopsState);
  protected readonly filterUseCase = inject(FilterAppointmentsUseCase);

  /** Service type options for the filter dropdown */
  protected readonly serviceTypeOptions = SERVICE_TYPE_OPTIONS;

  /** Lucide icons for stats */
  protected readonly icons = {
    calendarClock: CalendarClock,
    calendar: Calendar,
    activity: Activity,
    plus: Plus,
  };

  /** Workshop map for quick lookup by id */
  protected readonly workshopMap = computed(() => {
    const map = new Map<number, (typeof workshops)[number]>();
    const workshops = this.workshopsState.workshops();
    for (const ws of workshops) {
      map.set(ws.id, ws);
    }
    return map;
  });

  /** Occupancy: unique workshops with appointments / total workshops */
  protected readonly occupancy = computed(() => {
    const workshops = this.workshopsState.workshops();
    if (workshops.length === 0) {
      return '0%';
    }
    const appointments = this.appointmentsState.appointments();
    const uniqueWorkshopIds = new Set(appointments.map((a) => a.placeId));
    const percentage = Math.round((uniqueWorkshopIds.size / workshops.length) * 100);
    return `${percentage.toString()}%`;
  });

  /** Whether any filter is currently active */
  protected readonly hasActiveFilters = computed(() => {
    const f = this.filterUseCase.filters();
    return f.search.trim() !== '' || f.workshopId !== null || f.serviceType !== '' || f.date !== '';
  });

  ngOnInit(): void {
    this.getAppointments.execute();
    this.getWorkshops.execute();
  }

  // --- Filter event handlers ---

  protected onSearch(term: string): void {
    this.filterUseCase.updateFilters({ search: term });
  }

  protected onWorkshopFilter(workshopId: string): void {
    this.filterUseCase.updateFilters({
      workshopId: workshopId ? Number(workshopId) : null,
    });
  }

  protected onServiceFilter(serviceType: string): void {
    this.filterUseCase.updateFilters({ serviceType });
  }

  protected onDateFilter(date: string): void {
    this.filterUseCase.updateFilters({ date });
  }

  protected onClearFilters(): void {
    this.filterUseCase.clearFilters();
  }
}
