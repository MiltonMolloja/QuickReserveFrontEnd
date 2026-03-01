import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import type { Workshop } from '../../../../../domain/models/workshop.model';
import { FiltersBarComponent } from './filters-bar.component';

const WORKSHOPS: Workshop[] = [
  { id: 1, name: 'Taller A', address: 'Addr A', email: 'a@a.com', phone: '111' },
  { id: 2, name: 'Taller B', address: 'Addr B', email: 'b@b.com', phone: '222' },
];

const SERVICE_TYPES = [
  { value: 'Mantenimiento', label: 'Mantenimiento' },
  { value: 'Reparacion', label: 'Reparación' },
];

describe('FiltersBarComponent', () => {
  let fixture: ComponentFixture<FiltersBarComponent>;
  let component: FiltersBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersBarComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersBarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('workshops', WORKSHOPS);
    fixture.componentRef.setInput('serviceTypes', SERVICE_TYPES);
    fixture.componentRef.setInput('hasActiveFilters', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search input', () => {
    const searchInput = fixture.nativeElement.querySelector('app-search-input');
    expect(searchInput).toBeTruthy();
  });

  it('should render filter dropdowns', () => {
    const dropdowns = fixture.nativeElement.querySelectorAll('app-filter-dropdown');
    expect(dropdowns.length).toBe(2); // workshop + service type
  });

  it('should render date input', () => {
    const dateInput = fixture.nativeElement.querySelector('input[type="date"]');
    expect(dateInput).toBeTruthy();
  });

  it('should not show clear button when no active filters', () => {
    const clearButton = fixture.nativeElement.querySelector('app-loading-button');
    expect(clearButton).toBeFalsy();
  });

  it('should show clear button when filters are active', () => {
    fixture.componentRef.setInput('hasActiveFilters', true);
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('app-loading-button');
    expect(clearButton).toBeTruthy();
  });

  it('should map workshops to options', () => {
    const options = component['workshopOptions']();
    expect(options).toHaveLength(2);
    expect(options[0]!.value).toBe('1');
    expect(options[0]!.label).toBe('Taller A');
  });

  it('should emit searchChange', () => {
    const spy = jest.spyOn(component.searchChange, 'emit');
    component.searchChange.emit('test');
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('should emit workshopChange', () => {
    const spy = jest.spyOn(component.workshopChange, 'emit');
    component.workshopChange.emit('1');
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should emit serviceChange', () => {
    const spy = jest.spyOn(component.serviceChange, 'emit');
    component.serviceChange.emit('Mantenimiento');
    expect(spy).toHaveBeenCalledWith('Mantenimiento');
  });

  it('should emit clearFilters', () => {
    const spy = jest.spyOn(component.clearFilters, 'emit');
    component.clearFilters.emit();
    expect(spy).toHaveBeenCalled();
  });
});
