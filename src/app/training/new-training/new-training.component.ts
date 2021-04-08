import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  selected: null;
  @Output() trainingStart = new EventEmitter<void>();
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  availableExercises: Exercise[];

  ngOnInit(): void {
    
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.availableExercises = exercises;
    });
    
    this.trainingService.fetchAvailableExercises();

  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
