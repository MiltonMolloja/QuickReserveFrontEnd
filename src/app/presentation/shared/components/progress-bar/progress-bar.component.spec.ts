import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let fixture: ComponentFixture<ProgressBarComponent>;
  let component: ProgressBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render progressbar role', () => {
    const bar = fixture.nativeElement.querySelector('[role="progressbar"]');
    expect(bar).toBeTruthy();
  });

  it('should default to 3 total steps', () => {
    expect(component.totalSteps()).toBe(3);
    const segments = fixture.nativeElement.querySelectorAll('.rounded-full');
    expect(segments.length).toBe(3);
  });

  it('should default to step 1', () => {
    expect(component.currentStep()).toBe(1);
  });

  it('should set aria attributes correctly', () => {
    const bar = fixture.nativeElement.querySelector('[role="progressbar"]');
    expect(bar.getAttribute('aria-valuenow')).toBe('1');
    expect(bar.getAttribute('aria-valuemin')).toBe('1');
    expect(bar.getAttribute('aria-valuemax')).toBe('3');
  });

  it('should highlight active steps with bg-primary', () => {
    fixture.componentRef.setInput('currentStep', 2);
    fixture.detectChanges();

    const segments = fixture.nativeElement.querySelectorAll('.rounded-full');
    expect(segments[0].classList.contains('bg-primary')).toBe(true);
    expect(segments[1].classList.contains('bg-primary')).toBe(true);
    expect(segments[2].classList.contains('bg-primary')).toBe(false);
  });

  it('should render custom number of steps', () => {
    fixture.componentRef.setInput('totalSteps', 5);
    fixture.detectChanges();

    const segments = fixture.nativeElement.querySelectorAll('.rounded-full');
    expect(segments.length).toBe(5);
  });
});
