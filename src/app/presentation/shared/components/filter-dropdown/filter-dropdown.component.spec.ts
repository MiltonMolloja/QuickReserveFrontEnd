import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MapPin } from 'lucide-angular';

import { FilterDropdownComponent } from './filter-dropdown.component';

describe('FilterDropdownComponent', () => {
  let fixture: ComponentFixture<FilterDropdownComponent>;
  let component: FilterDropdownComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterDropdownComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', MapPin);
    fixture.componentRef.setInput('label', 'Taller');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render select with aria-label', () => {
    const select = fixture.nativeElement.querySelector('select');
    expect(select).toBeTruthy();
    expect(select.getAttribute('aria-label')).toBe('Taller');
  });

  it('should render default option with label', () => {
    const defaultOption = fixture.nativeElement.querySelector('option[value=""]');
    expect(defaultOption.textContent.trim()).toBe('Taller');
  });

  it('should render provided options', () => {
    fixture.componentRef.setInput('options', [
      { value: '1', label: 'Taller A' },
      { value: '2', label: 'Taller B' },
    ]);
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options.length).toBe(3); // default + 2
    expect(options[1].textContent.trim()).toBe('Taller A');
    expect(options[2].textContent.trim()).toBe('Taller B');
  });

  it('should emit filterChange on select change', () => {
    fixture.componentRef.setInput('options', [{ value: '1', label: 'Taller A' }]);
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.filterChange, 'emit');
    const select = fixture.nativeElement.querySelector('select');

    select.value = '1';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith('1');
  });

  it('should emit empty string when default option is selected', () => {
    const emitSpy = jest.spyOn(component.filterChange, 'emit');
    const select = fixture.nativeElement.querySelector('select');

    select.value = '';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith('');
  });

  it('should default options to empty array', () => {
    expect(component.options()).toEqual([]);
  });
});
