import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  selected: null;
  @Output() trainingStart = new EventEmitter<void>();

  constructor(private trainingService: TrainingService) { }

  availableExercises: Exercise[];

  ngOnInit(): void {
    this.availableExercises = this.trainingService.getAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
