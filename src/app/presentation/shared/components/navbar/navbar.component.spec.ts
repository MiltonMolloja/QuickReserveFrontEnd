import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, Component, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Theme } from '../../../../domain/enums/theme.enum';
import { ThemeState } from '../../../../application/state/theme.state';
import { NavbarComponent } from './navbar.component';

@Component({
  template: `<app-navbar [variant]="variant()">
    <span navIcons class="projected-icons">Icon Controls</span>
    <span navAction class="projected-action">Desktop Action</span>
    <span navActionMobile class="projected-action-mobile">Mobile Action</span>
  </app-navbar>`,
  imports: [NavbarComponent],
})
class TestHostComponent {
  variant = signal<'full' | 'simple'>('full');
}

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render nav element with navigation role', () => {
    const nav = fixture.nativeElement.querySelector('nav[role="navigation"]');
    expect(nav).toBeTruthy();
  });

  it('should display app title', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
  });

  it('should project icon controls in full variant', () => {
    const icons = fixture.nativeElement.querySelector('.projected-icons');
    expect(icons).toBeTruthy();
    expect(icons.textContent).toContain('Icon Controls');
  });

  it('should project desktop action in full variant', () => {
    const action = fixture.nativeElement.querySelector('.projected-action');
    expect(action).toBeTruthy();
    expect(action.textContent).toContain('Desktop Action');
  });

  it('should project mobile action in full variant', () => {
    const action = fixture.nativeElement.querySelector('.projected-action-mobile');
    expect(action).toBeTruthy();
    expect(action.textContent).toContain('Mobile Action');
  });

  it('should show subtitle in full variant', () => {
    const subtitle = fixture.nativeElement.querySelector('p');
    expect(subtitle).toBeTruthy();
  });

  it('should show back link in simple variant', () => {
    host.variant.set('simple');
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a[href="/appointments"]');
    expect(link).toBeTruthy();
  });

  it('should not show subtitle in simple variant', () => {
    host.variant.set('simple');
    fixture.detectChanges();

    const subtitle = fixture.nativeElement.querySelector('p.text-xs');
    expect(subtitle).toBeFalsy();
  });

  it('should default variant to full', () => {
    const directFixture = TestBed.createComponent(NavbarComponent);
    directFixture.detectChanges();
    expect(directFixture.componentInstance.variant()).toBe('full');
  });

  describe('compact mobile controls', () => {
    it('should render compact language toggle button', () => {
      const langBtn = fixture.nativeElement.querySelector('button[aria-label="Toggle language"]');
      expect(langBtn).toBeTruthy();
    });

    it('should display current language code in compact toggle', () => {
      const langSpan = fixture.nativeElement.querySelector(
        'button[aria-label="Toggle language"] span',
      );
      expect(langSpan.textContent.trim().toLowerCase()).toContain('es');
    });

    it('should toggle language on compact button click', () => {
      const translateService = TestBed.inject(TranslateService);
      const useSpy = jest.spyOn(translateService, 'use');

      const langBtn = fixture.nativeElement.querySelector(
        'button[aria-label="Toggle language"]',
      ) as HTMLButtonElement;
      langBtn.click();
      fixture.detectChanges();

      expect(useSpy).toHaveBeenCalledWith('en');

      const langSpan = fixture.nativeElement.querySelector(
        'button[aria-label="Toggle language"] span',
      );
      expect(langSpan.textContent.trim().toLowerCase()).toContain('en');
    });

    it('should toggle language back to ES on second click', () => {
      const langBtn = fixture.nativeElement.querySelector(
        'button[aria-label="Toggle language"]',
      ) as HTMLButtonElement;
      langBtn.click();
      fixture.detectChanges();
      langBtn.click();
      fixture.detectChanges();

      const langSpan = fixture.nativeElement.querySelector(
        'button[aria-label="Toggle language"] span',
      );
      expect(langSpan.textContent.trim().toLowerCase()).toContain('es');
    });

    it('should update document lang attribute on language toggle', () => {
      const langBtn = fixture.nativeElement.querySelector(
        'button[aria-label="Toggle language"]',
      ) as HTMLButtonElement;
      langBtn.click();
      fixture.detectChanges();

      expect(document.documentElement.lang).toBe('en');

      langBtn.click();
      fixture.detectChanges();

      expect(document.documentElement.lang).toBe('es');
    });

    it('should render compact theme toggle button', () => {
      const themeBtn = fixture.nativeElement.querySelector('button[aria-label^="Theme:"]');
      expect(themeBtn).toBeTruthy();
    });

    it('should show current theme in aria-label', () => {
      const themeBtn = fixture.nativeElement.querySelector('button[aria-label^="Theme:"]');
      expect(themeBtn.getAttribute('aria-label')).toBe('Theme: light');
    });

    it('should cycle theme light → dark on click', () => {
      const themeState = TestBed.inject(ThemeState);
      const themeBtn = fixture.nativeElement.querySelector(
        'button[aria-label^="Theme:"]',
      ) as HTMLButtonElement;

      themeBtn.click();
      fixture.detectChanges();

      expect(themeState.theme()).toBe(Theme.DARK);
      expect(themeBtn.getAttribute('aria-label')).toBe('Theme: dark');
    });

    it('should cycle theme dark → auto on second click', () => {
      const themeState = TestBed.inject(ThemeState);
      const themeBtn = fixture.nativeElement.querySelector(
        'button[aria-label^="Theme:"]',
      ) as HTMLButtonElement;

      themeBtn.click(); // light → dark
      fixture.detectChanges();
      themeBtn.click(); // dark → auto
      fixture.detectChanges();

      expect(themeState.theme()).toBe(Theme.AUTO);
      expect(themeBtn.getAttribute('aria-label')).toBe('Theme: auto');
    });

    it('should cycle theme auto → light on third click', () => {
      const themeState = TestBed.inject(ThemeState);
      const themeBtn = fixture.nativeElement.querySelector(
        'button[aria-label^="Theme:"]',
      ) as HTMLButtonElement;

      themeBtn.click(); // light → dark
      fixture.detectChanges();
      themeBtn.click(); // dark → auto
      fixture.detectChanges();
      themeBtn.click(); // auto → light
      fixture.detectChanges();

      expect(themeState.theme()).toBe(Theme.LIGHT);
      expect(themeBtn.getAttribute('aria-label')).toBe('Theme: light');
    });

    it('should not render compact controls in simple variant', () => {
      host.variant.set('simple');
      fixture.detectChanges();

      const langBtn = fixture.nativeElement.querySelector('button[aria-label="Toggle language"]');
      expect(langBtn).toBeFalsy();

      const themeBtn = fixture.nativeElement.querySelector('button[aria-label^="Theme:"]');
      expect(themeBtn).toBeFalsy();
    });
  });
});
