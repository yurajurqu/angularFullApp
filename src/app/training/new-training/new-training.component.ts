import { TrainingService } from './../training.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();

  constructor(private trainingService: TrainingService) { }

  availableExercises: Exercise[];
  // foods = [
  //   {
  //     value:'crunches', viewValue:'Crunches'
  //   },
  //   {
  //     value:'touch-toes', viewValue:'Touch toes'
  //   },
  //   {
  //     value:'side-lunges', viewValue:'Side lunges'
  //   },
  //   {
  //     value:'burpees', viewValue:'Burpees'
  //   },
  // ]
  ngOnInit(): void {
    this.availableExercises = this.trainingService.getAvailableExercises();
  }
  onStartTraining() {
    this.trainingStart.emit();
  }

}
