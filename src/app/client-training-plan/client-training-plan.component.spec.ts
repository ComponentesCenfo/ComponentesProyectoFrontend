import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTrainingPlanComponent } from './client-training-plan.component';

describe('ClientTrainingPlanComponent', () => {
  let component: ClientTrainingPlanComponent;
  let fixture: ComponentFixture<ClientTrainingPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientTrainingPlanComponent]
    });
    fixture = TestBed.createComponent(ClientTrainingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
