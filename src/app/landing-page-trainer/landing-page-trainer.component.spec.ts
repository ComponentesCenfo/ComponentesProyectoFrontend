import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTrainerComponent } from './landing-page-trainer.component';

describe('LandingPageTrainerComponent', () => {
  let component: LandingPageTrainerComponent;
  let fixture: ComponentFixture<LandingPageTrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageTrainerComponent]
    });
    fixture = TestBed.createComponent(LandingPageTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
