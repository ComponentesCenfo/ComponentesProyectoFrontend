import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageClientComponent } from './landing-page-client.component';

describe('LandingPageComponent', () => {
  let component: LandingPageClientComponent;
  let fixture: ComponentFixture<LandingPageClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageClientComponent]
    });
    fixture = TestBed.createComponent(LandingPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
