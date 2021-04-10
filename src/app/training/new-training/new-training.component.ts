import { getIsLoading } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { UIService } from './../../shared/ui.service';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { State } from 'src/app/app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  selected: null;
  @Output() trainingStart = new EventEmitter<void>();
  exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;

  loadingSubs: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<State>) { }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  availableExercises: Exercise[];

  ngOnInit(): void {

    this.isLoading$ = this.store.select(getIsLoading);
    
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.availableExercises = exercises;
    });
    
    this.fetchExercises();

  }
  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
