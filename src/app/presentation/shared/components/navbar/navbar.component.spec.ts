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
    <span navAction class="projected-action">Action Button</span>
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

  it('should project action button in full variant', () => {
    const action = fixture.nativeElement.querySelector('.projected-action');
    expect(action).toBeTruthy();
    expect(action.textContent).toContain('Action Button');
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

    it('should render compact theme pill group with radiogroup role', () => {
      const group = fixture.nativeElement.querySelector('.sm\\:hidden [role="radiogroup"]');
      expect(group).toBeTruthy();
      expect(group.getAttribute('aria-label')).toBe('Theme selector');
    });

    it('should render 3 compact theme buttons', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.sm\\:hidden [role="radio"]');
      expect(buttons.length).toBe(3);
    });

    it('should have Light, Dark, Auto labels on compact theme buttons', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.sm\\:hidden [role="radio"]');
      expect(buttons[0].getAttribute('aria-label')).toBe('Light');
      expect(buttons[1].getAttribute('aria-label')).toBe('Dark');
      expect(buttons[2].getAttribute('aria-label')).toBe('Auto');
    });

    it('should mark LIGHT as checked by default in compact theme', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.sm\\:hidden [role="radio"]');
      expect(buttons[0].getAttribute('aria-checked')).toBe('true');
      expect(buttons[1].getAttribute('aria-checked')).toBe('false');
    });

    it('should switch theme on compact button click', () => {
      const themeState = TestBed.inject(ThemeState);
      const buttons = fixture.nativeElement.querySelectorAll('.sm\\:hidden [role="radio"]');
      (buttons[1] as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(themeState.theme()).toBe(Theme.DARK);
      expect(buttons[1].getAttribute('aria-checked')).toBe('true');
    });

    it('should switch to AUTO theme on compact button click', () => {
      const themeState = TestBed.inject(ThemeState);
      const buttons = fixture.nativeElement.querySelectorAll('.sm\\:hidden [role="radio"]');
      (buttons[2] as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(themeState.theme()).toBe(Theme.AUTO);
    });

    it('should not render compact controls in simple variant', () => {
      host.variant.set('simple');
      fixture.detectChanges();

      const langBtn = fixture.nativeElement.querySelector('button[aria-label="Toggle language"]');
      expect(langBtn).toBeFalsy();

      const themeGroup = fixture.nativeElement.querySelector('.sm\\:hidden [role="radiogroup"]');
      expect(themeGroup).toBeFalsy();
    });

    it('should update document lang attribute on language toggle', () => {
      const langBtn = fixture.nativeElement.querySelector(
        'button[aria-label="Toggle language"]',
      ) as HTMLButtonElement;
      langBtn.click();
      fixture.detectChanges();

      expect(document.documentElement.lang).toBe('en');

      // Toggle back
      langBtn.click();
      fixture.detectChanges();

      expect(document.documentElement.lang).toBe('es');
    });
  });
});
