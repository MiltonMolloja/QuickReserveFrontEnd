import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let fixture: ComponentFixture<SearchInputComponent>;
  let component: SearchInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with aria-label', () => {
    const input = fixture.nativeElement.querySelector('input[aria-label="Search"]');
    expect(input).toBeTruthy();
  });

  it('should apply placeholder text', () => {
    fixture.componentRef.setInput('placeholder', 'Buscar...');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Buscar...');
  });

  it('should emit searchChange on input', () => {
    const emitSpy = jest.spyOn(component.searchChange, 'emit');
    const input = fixture.nativeElement.querySelector('input');

    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith('test');
  });

  it('should emit empty string when input is cleared', () => {
    const emitSpy = jest.spyOn(component.searchChange, 'emit');
    const input = fixture.nativeElement.querySelector('input');

    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith('');
  });

  it('should default placeholder to empty string', () => {
    expect(component.placeholder()).toBe('');
  });
});
