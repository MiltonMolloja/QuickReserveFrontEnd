import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { StoragePort } from '../../../domain/ports/storage.port';
import { AppointmentErrorComponent } from './appointment-error.component';

const MOCK_ERROR_STATE = {
  errorMessage: 'Connection refused',
  errorCode: 'HTTP 503 - Service Unavailable',
};

describe('AppointmentErrorComponent', () => {
  let fixture: ComponentFixture<AppointmentErrorComponent>;
  let component: AppointmentErrorComponent;
  let router: Router;

  const mockStoragePort = {
    get: jest.fn().mockReturnValue(null),
    set: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    window.history.replaceState({ error: MOCK_ERROR_STATE }, '');

    await TestBed.configureTestingModule({
      imports: [AppointmentErrorComponent, TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: StoragePort, useValue: mockStoragePort },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppointmentErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    window.history.replaceState({}, '');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load error state from history state', () => {
    expect(component['errorState']()).toBeTruthy();
    expect(component['errorState']()?.errorMessage).toBe('Connection refused');
  });

  it('should render navbar with simple variant', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render error icon', () => {
    const icon = fixture.nativeElement.querySelector('app-error-icon');
    expect(icon).toBeTruthy();
  });

  it('should render error detail rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('app-error-detail-row');
    expect(rows.length).toBe(3);
  });

  it('should render action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('app-loading-button');
    expect(buttons.length).toBe(2);
  });

  it('should compute error code from state', () => {
    expect(component['errorCode']()).toBe('HTTP 503 - Service Unavailable');
  });

  it('should compute error message from state', () => {
    expect(component['errorMessage']()).toBe('Connection refused');
  });

  it('should use default error code when no state', () => {
    component['errorState'].set(null);
    expect(component['errorCode']()).toBe('HTTP 500 - Internal Server Error');
  });

  it('should use default error message when no state', () => {
    component['errorState'].set(null);
    expect(component['errorMessage']()).toBe('El servidor no pudo procesar la solicitud.');
  });

  it('should navigate to new-appointment on retry', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component['retry']();
    expect(navigateSpy).toHaveBeenCalledWith(['/new-appointment']);
  });

  it('should navigate to appointments on goHome', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component['goHome']();
    expect(navigateSpy).toHaveBeenCalledWith(['/appointments']);
  });

  it('should show generic defaults when no error state in history', () => {
    window.history.replaceState({}, '');
    const newFixture = TestBed.createComponent(AppointmentErrorComponent);
    newFixture.detectChanges();
    const newComponent = newFixture.componentInstance;
    expect(newComponent['errorState']()).toBeNull();
    expect(newComponent['errorCode']()).toBe('HTTP 500 - Internal Server Error');
  });

  it('should render error title heading', () => {
    const heading = fixture.nativeElement.querySelector('#error-title');
    expect(heading).toBeTruthy();
  });

  it('should have main element with aria-labelledby', () => {
    const main = fixture.nativeElement.querySelector('main[aria-labelledby="error-title"]');
    expect(main).toBeTruthy();
  });
});
