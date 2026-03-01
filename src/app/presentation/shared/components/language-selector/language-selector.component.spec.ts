import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LanguageSelectorComponent } from './language-selector.component';

describe('LanguageSelectorComponent', () => {
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let component: LanguageSelectorComponent;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('es');
    translateService.use('es');

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render toggle button with aria attributes', () => {
    const button = fixture.nativeElement.querySelector('button[aria-haspopup="listbox"]');
    expect(button).toBeTruthy();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('should display current language code', () => {
    const span = fixture.nativeElement.querySelector('button span');
    expect(span.textContent.trim().toLowerCase()).toContain('es');
  });

  it('should toggle dropdown on button click', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const dropdown = fixture.nativeElement.querySelector('ul[role="listbox"]');
    expect(dropdown).toBeTruthy();

    // Click backdrop to close
    const backdrop = fixture.nativeElement.querySelector('.fixed.inset-0');
    backdrop.click();
    fixture.detectChanges();

    const closedDropdown = fixture.nativeElement.querySelector('ul[role="listbox"]');
    expect(closedDropdown).toBeFalsy();
  });

  it('should render language options when open', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('li[role="option"]');
    expect(options.length).toBe(2);
  });

  it('should switch language on option click', () => {
    const useSpy = jest.spyOn(translateService, 'use');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('li[role="option"]');
    // Click EN option (second)
    options[1].click();
    fixture.detectChanges();

    expect(useSpy).toHaveBeenCalledWith('en');
  });

  it('should close dropdown after selecting language', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('li[role="option"]');
    options[1].click();
    fixture.detectChanges();

    const dropdown = fixture.nativeElement.querySelector('ul[role="listbox"]');
    expect(dropdown).toBeFalsy();
  });

  it('should mark current language as selected', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('li[role="option"]');
    const esOption = options[0];
    expect(esOption.getAttribute('aria-selected')).toBe('true');
  });
});
