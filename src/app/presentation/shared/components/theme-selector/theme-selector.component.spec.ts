import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Theme } from '../../../../domain/enums/theme.enum';
import { ThemeState } from '../../../../application/state/theme.state';
import { ThemeSelectorComponent } from './theme-selector.component';

describe('ThemeSelectorComponent', () => {
  let fixture: ComponentFixture<ThemeSelectorComponent>;
  let component: ThemeSelectorComponent;
  let themeState: ThemeState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSelectorComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    themeState = TestBed.inject(ThemeState);
    fixture = TestBed.createComponent(ThemeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render radiogroup container', () => {
    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group).toBeTruthy();
    expect(group.getAttribute('aria-label')).toBe('Theme selector');
  });

  it('should render 3 theme buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons.length).toBe(3);
  });

  it('should have Light, Dark, Auto labels', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons[0].getAttribute('aria-label')).toBe('Light');
    expect(buttons[1].getAttribute('aria-label')).toBe('Dark');
    expect(buttons[2].getAttribute('aria-label')).toBe('Auto');
  });

  it('should mark LIGHT as checked by default', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    expect(buttons[0].getAttribute('aria-checked')).toBe('true');
    expect(buttons[1].getAttribute('aria-checked')).toBe('false');
  });

  it('should switch theme on button click', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    buttons[1].click(); // Click Dark
    fixture.detectChanges();

    expect(themeState.theme()).toBe(Theme.DARK);
    expect(buttons[1].getAttribute('aria-checked')).toBe('true');
  });

  it('should switch to AUTO theme', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="radio"]');
    buttons[2].click(); // Click Auto
    fixture.detectChanges();

    expect(themeState.theme()).toBe(Theme.AUTO);
  });
});
