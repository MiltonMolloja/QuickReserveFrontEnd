import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ErrorIconComponent } from './error-icon.component';

describe('ErrorIconComponent', () => {
  let fixture: ComponentFixture<ErrorIconComponent>;
  let component: ErrorIconComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorIconComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the error circle with aria-hidden', () => {
    const circle = fixture.nativeElement.querySelector('[aria-hidden="true"]');
    expect(circle).toBeTruthy();
  });

  it('should have gradient background classes', () => {
    const circle = fixture.nativeElement.querySelector('.bg-gradient-to-br');
    expect(circle).toBeTruthy();
  });

  it('should have scale-in animation class', () => {
    const circle = fixture.nativeElement.querySelector('.animate-scale-in');
    expect(circle).toBeTruthy();
  });

  it('should render lucide X icon', () => {
    const icon = fixture.nativeElement.querySelector('lucide-angular');
    expect(icon).toBeTruthy();
  });

  it('should use danger color classes (from-danger)', () => {
    const circle = fixture.nativeElement.querySelector('.from-danger');
    expect(circle).toBeTruthy();
  });
});
