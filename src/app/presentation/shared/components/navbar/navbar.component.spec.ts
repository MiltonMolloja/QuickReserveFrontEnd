import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, Component, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NavbarComponent } from './navbar.component';

@Component({
  template: `<app-navbar [variant]="variant()"
    ><span class="projected">Projected Content</span></app-navbar
  >`,
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

  it('should project content in full variant', () => {
    const projected = fixture.nativeElement.querySelector('.projected');
    expect(projected).toBeTruthy();
    expect(projected.textContent).toContain('Projected Content');
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
});
