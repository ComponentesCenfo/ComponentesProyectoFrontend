export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
}

export interface ExerciseCriteria {
  id: number;
  repetitions: number;
  series: number;
  exercise: Exercise;
}

export interface Client {
  id: number;
  firstName: string; 
  lastName: string;
}

export interface TrainingPlan {
  trainingPlan_id: number;
  creationDate: string;
  startDate: string;
  endDate: string;
  client: Client; 
  trainer: any;
  exerciseCriterias: ExerciseCriteria[];
}

  