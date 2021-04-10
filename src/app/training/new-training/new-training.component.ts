import { getAvailableExercises } from './../training.reducer';
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
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();
  isLoading$: Observable<boolean>;
  availableExercises$: Observable<Exercise[]>;


  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }


  ngOnInit(): void {

    this.isLoading$ = this.store.select(getIsLoading);
    this.availableExercises$ = this.store.select(getAvailableExercises);
    this.fetchExercises();

  }
  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
