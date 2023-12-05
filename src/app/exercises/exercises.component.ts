import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ExercisesService } from '../Services/exercises.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: any[] = [];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  selectedExercise: any = null;

  constructor(private exercisesService: ExercisesService) { }

  ngOnInit(): void {
    this.loadAllExercises();
  }

  loadAllExercises(): void {
    this.exercisesService.getAllExercises().subscribe(
      (data) => {
        this.exercises = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error loading the exercises.',
        });
      }
    );
  }

  addExercise(exercise: any): void {
    this.exercisesService.createExercise(exercise).subscribe(
      (newExercise) => {
        this.exercises.push(newExercise);
        Swal.fire(
          'Success!',
          'Exercise added successfully.',
          'success'
        );
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error adding the exercise.',
        });
      }
    );
  }

  updateExercise(id: number, exercise: any): void {
    this.exercisesService.editExercise(id, exercise).subscribe(
      (updatedExercise) => {
        const index = this.exercises.findIndex(e => e.id === id);
        if (index !== -1) {
          this.exercises[index] = updatedExercise;
        }
        Swal.fire(
          'Updated!',
          'Exercise updated successfully.',
          'success'
        );
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error updating the exercise.',
        });
      }
    );
  }

  deleteExercise(id: number): void {
    this.exercisesService.deleteExercise(id).subscribe(
      () => {
        this.exercises = this.exercises.filter(e => e.id !== id);
        Swal.fire(
          'Deleted!',
          'Exercise deleted successfully.',
          'success'
        );
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error deleting the exercise.',
        });
      }
    );
  }
  showAddExerciseForm(): void {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  showEditExerciseForm(exercise: any): void {
    this.selectedExercise = exercise;
    this.showEditForm = true;
    this.showAddForm = false;
  }
  hideExerciseForm(): void {
    this.showAddForm = false;
    this.showEditForm = false;
  }
}
