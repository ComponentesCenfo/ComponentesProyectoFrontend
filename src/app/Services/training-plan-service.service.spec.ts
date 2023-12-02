import { TestBed } from '@angular/core/testing';

import { TrainingPlanServiceService } from './training-plan.service';

describe('TrainingPlanServiceService', () => {
  let service: TrainingPlanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingPlanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
