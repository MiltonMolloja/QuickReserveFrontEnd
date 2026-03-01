import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { SuccessIconComponent } from './success-icon.component';

describe('SuccessIconComponent', () => {
  let fixture: ComponentFixture<SuccessIconComponent>;
  let component: SuccessIconComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessIconComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the success circle with aria-hidden', () => {
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

  it('should render lucide check icon', () => {
    const icon = fixture.nativeElement.querySelector('lucide-angular');
    expect(icon).toBeTruthy();
  });
});
